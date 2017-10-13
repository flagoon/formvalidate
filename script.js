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

function hideMe() {
  var hider = document.getElementsByClassName("pointers");
  for (let i = 0; i < hider.length; i++) {
    hider[i].classList.add("hidden-xs-up");
  }
}

function submitMe(event) {
  hideMe();
  var inputTag = document.getElementsByTagName("input");
  var errorArr = [];

  //this loop checks if all regex are correct. It doesn't check other stuff, like birth date or PESEL
  for (var i = 0; i < regexArr.length; i++) {
    if (regexArr[i].test(inputTag[i].value)) {
      //function to change colors
      changeColors(i, true);
      errorArr[i] = 0;
    } else {
      changeColors(i, false);
      document.getElementById("errorScreen").classList.remove("hide-content");
      document.getElementsByClassName("pointers")[i].classList.remove("hidden-xs-up");
      errorArr[i] = 1;
      event.preventDefault();
    }
  }
  
  //check if passwords are the same
  if(!checkPassword(inputTag[3].value, inputTag[4].value)) {
    event.preventDefault();
  }

  //check if birth date is correct (you can't be older than 130 and younger than 10, also date has to exists)
  if(!checkBirthDate(inputTag[5].value)) {
    event.preventDefault();
  }

  //check if first 6 numbers of PESEL are corelated to birthDate
  if(!checkPESEL(inputTag[5].value, inputTag[6].value)) {
    event.preventDefault();
  }
}

function changeString(a) {
  if (a < 10) {
    return "0" + a.toString();
  } else {
    return a;
  }
}

function checkPESEL(birth, pesel) {
  var monthIncrease = 0;
  pesel = pesel.slice(0, 6);
  var newArr = birth.split("/");
  if (Number(newArr[0]) < 1900) {
    monthIncrease = 80;
  } else if (Number(newArr[0]) > 1999) {
    monthIncrease = 20;
  } else {
    monthIncrease = 0;
  }
  var monthString = Number(newArr[1]) + monthIncrease;
  var testBirth = newArr[0].slice(2) + changeString(monthString) + newArr[2];
  console.log(testBirth);
  if (!(testBirth === pesel)) {
    document.getElementById("errorScreen").classList.remove("hide-content");
    document.getElementById("errorPESEL").classList.remove("hidden-xs-up");
    changeColors(6, false);
    return false;
  }
  return true;
}

//check if birthDay is set correctly. You mustn't be older than 130 years, younger than 10. Also month and day should exist
function checkBirthDate(birthDate) {

  //I split input into YYYY MM DD
  var birthArr = birthDate.split("/");

  //generate new date variable
  var thisDate = new Date();

  //array for keeping days in month
  var daysArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

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
  if (((thisDate.getFullYear() - birthArr[0]) > 130) || (thisDate.getFullYear() - birthArr[0]) < 10) {
    errorPass = 1;
    if ((thisDate.getFullYear() - birthArr[0]) < 0) {
      document.getElementById("errorBirthDate").innerText = "Gratuluję, jeszcze się nie urodzileś!";
    } else {
      document.getElementById("errorBirthDate").innerText = "Nie możesz być starszy niż 130 lat, ani młodszy niż 10!";
    }
  }

  //show error text
  if (errorPass !== 0) {
    document.getElementById("errorScreen").classList.remove("hide-content");
    document.getElementById("errorBirthDate").classList.remove("hidden-xs-up");
    changeColors(5, false);
    return false;
  }
  return true;
}

//checks if passwords are the same. If not, it make input red and show the comment for error in popup.
function checkPassword(pass, spass) {
  if (pass !== spass) {

    //this part show error message and colors the input
    document.getElementById("errorScreen").classList.remove("hide-content");
    document.getElementById("errorPassTest").classList.remove("hidden-xs-up");
    changeColors(4, false);
    return false;
  }
  return true;
}

//function to change colors of valid/invalid inputs
function changeColors(x, bool) {
  var inputTag = document.getElementsByTagName("input");
  var formGroupClass = document.getElementsByClassName("form-group");
  if (bool) {
    formGroupClass[x].classList.add("has-success");
    formGroupClass[x].classList.remove("has-danger");
    inputTag[x].classList.add("form-control-success");
    inputTag[x].classList.remove("form-control-danger");
  } else {
    formGroupClass[x].classList.remove("has-success");
    formGroupClass[x].classList.add("has-danger");
    inputTag[x].classList.remove("form-control-success");
    inputTag[x].classList.add("form-control-danger");
  }
}

//this function checks if there are any errors in fields (regex wise)
// function checkErrors(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] === 1) {
//       return true;
//     }
//   }
//   return false;
// }


document.getElementById("submitButton").addEventListener("click", submitMe);
document.getElementById("errorScreen").addEventListener("click", function () {
  this.classList.add("hide-content");
});