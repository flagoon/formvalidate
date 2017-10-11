var regexArr = [
  /*0 - name*/
  /^[a-ząćęłńóśżź ]+$/i,
  /*1 - lastName*/
  /^[a-ząćęłńóśżź\-]+$/i,
  /*2 - email*/
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  /*3 - password*/
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  /*4 - secondPass*/
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  /*5 - birthDate*/
  /^[0-9]{4}\/[0-9]{2}\/[0-9]{2}$/,
  /*6 - PESEL*/
  /^\d{11}$/
];

function submitMe(event) {
  var inputTag = document.getElementsByTagName("input");
  var formGroupClass = document.getElementsByClassName("form-group");
  var errorArr = [];

  //this loop checks if all regex are correct. It doesn't check other stuff, like birth date or PESEL
  for (var i = 0; i < regexArr.length; i++) {
    event.preventDefault();
    if (regexArr[i].test(inputTag[i].value)) {
      formGroupClass[i].classList.add("has-success");
      formGroupClass[i].classList.remove("has-danger");
      inputTag[i].classList.add("form-control-success");
      inputTag[i].classList.remove("form-control-danger");
      errorArr[i] = 0;
    } else {
      formGroupClass[i].classList.remove("has-success");
      formGroupClass[i].classList.add("has-danger");
      inputTag[i].classList.remove("form-control-success");
      inputTag[i].classList.add("form-control-danger");
      errorArr[i] = 1;
      event.preventDefault();
    }
  }

  //if there are no errors in all regex, this happens
  if (!checkErrors(errorArr)) {

    //check if passwords are the same
    checkPassword(inputTag[3].value, inputTag[4].value);

    //check if birth date is correct (you can't be older than 130 and younger than 18, also date has to exists)
    checkBirthDate(inputTag[5].value);
  }
}

function checkBirthDate(birthDate) {

  //I split input into YYYY MM DD
  var birthArr = birthDate.split("/");

  //generate new date variable
  var thisDate = new Date();

  //array for keeping days in month
  var daysArr = [31,28,31,30,31,30,31,31,30,31,30,31];

  //error handler
  var errorPass = 0;

  //February days in leap years
  if ((birthArr[0] % 4) === 0) {
    daysArr[1] = 29;
  }

  //checking if days are correct
  if ((birthArr[2] < 1) || (birthArr[2] > daysArr[birthArr[1] - 1])) {
    errorPass = 1;
    document.getElementById("errorBirthDate").innerText = "Tego roku, w tym miesiącu nie było tylu dni!";
  }

  //check if month is correct (1-12)
  if ((birthArr[1] < 1) || (birthArr[1] > 12)) {
    errorPass = 1;
    document.getElementById("errorBirthDate").innerText = "Nie ma takiego miesiąca!";
  }
  
  //check if user is not too old/young
  if (((thisDate.getFullYear() - birthArr[0]) > 130) || (thisDate.getFullYear() - birthArr[0]) < 18) {
    errorPass = 1;
    if ((thisDate.getFullYear() - birthArr[0]) < 0) {
      document.getElementById("errorBirthDate").innerText = "Gratuluję, jeszcze się nie urodzileś!";
    } else {
      document.getElementById("errorBirthDate").innerText = "Nie możesz być starszy niż 130 lat, ani młodszy niż 18!";
    }
  }
  
  //show error text
  if (errorPass !== 0) {
    document.getElementById("errorScreen").classList.remove("hide-content");
    document.getElementById("errorBirthDate").classList.remove("hidden-xs-up");
    document.getElementsByClassName("form-group")[5].classList.toggle("has-success");
    document.getElementsByClassName("form-group")[5].classList.toggle("has-danger");
    document.getElementsByTagName("input")[5].classList.remove("form-control-success");
    document.getElementsByTagName("input")[5].classList.add("form-control-danger");
  }
}

//checks if passwords are the same. If not, it make input red and show the comment for error in popup.
function checkPassword(pass, spass) {
  if (pass !== spass) {
    
    //this part show error message and colors the input
    document.getElementById("errorScreen").classList.remove("hide-content");
    document.getElementById("errorPassTest").classList.remove("hidden-xs-up");
    document.getElementsByClassName("form-group")[4].classList.toggle("has-success");
    document.getElementsByClassName("form-group")[4].classList.toggle("has-danger");
    document.getElementsByTagName("input")[4].classList.remove("form-control-success");
    document.getElementsByTagName("input")[4].classList.add("form-control-danger");
  }
}

//this function checks if there are any errors in fields (regex wise)
function checkErrors(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 1) {
      return true;
    }
  }
  return false;
}


document.getElementById("submitButton").addEventListener("click", submitMe);