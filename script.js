regexArr = [/*name*//^[a-ząćęłńóśżź ]+$/i, /*lastName*//^[a-ząćęłńóśżź\-]+$/i, /*email*//^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, /*password*//^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, /*secondPass*/ /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, /*birthDate*//[12][089][0-9][0-9]\/[01][0-9]\/[0-3][0-9]/, /*PESEL*//^\d{11}$/];

function submitMe(event) {
  for (var i = 0; i < 7; i++) {
    if(regexArr[i].test(document.getElementsByTagName("input")[i].value)) {
      document.getElementsByClassName("form-group")[i].classList.add("has-success");
      document.getElementsByClassName("form-group")[i].classList.remove("has-danger");
      document.getElementsByTagName("input")[i].classList.add("form-control-success");
      document.getElementsByTagName("input")[i].classList.remove("form-control-danger");
    } else {
      document.getElementsByClassName("form-group")[i].classList.remove("has-success");
      document.getElementsByClassName("form-group")[i].classList.add("has-danger");
      document.getElementsByTagName("input")[i].classList.remove("form-control-success");
      document.getElementsByTagName("input")[i].classList.add("form-control-danger");
    }
  }
  event.preventDefault();
}

document.getElementById("submitButton").addEventListener("click", submitMe);