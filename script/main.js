window.addEventListener("load", init);

function init() {
  let form = document.forms['register'];
  form.addEventListener('submit', validationForm, false);
  form.cpf.addEventListener('blur', validationCPF, false);
  form.email.addEventListener('blur', validationEmail, false);
}

function addClassError(field) {
  field.classList.add('error');
}

function removeClassError(field) {
  field.classList.remove('error');
}

function validateEmail(email) {
  let regex = /^[a-zA-Z][a-zA-Z0-9\_\-\.]+@[a-zA-Z]{3,}\.[a-zA-Z]{3}(\.[a-zA-Z]{2})?$/;
  return regex.test(email);
}

function validationEmail() {
  let field = document.forms['register'].email;
  let inputEmail = field.value;

  if (inputEmail == null || inputEmail == '' || validateEmail(inputEmail) == false) {
    console.log("add class erro input email");
    addClassError(field);
    return false;
  }
  removeClassError(field);
  return true;
}

function validateCPF(cpf) {
  let regex = /^\d{3}\d{3}\d{3}\d{2}$/;
  return regex.test(cpf);
}

function validationCPF() {
  let field = document.forms['register'].cpf;
  let inputCPF = field.value;

  if (inputCPF == null || inputCPF == '' || validateCPF(inputCPF) == false) {
    console.log("add class erro input cpf");
    addClassError(field);
    return false;
  }
  removeClassError(field);
  return true;
}

function validationForm(event) {
  console.log("validationForm");

  validationCPF();
  validationEmail();

  event.preventDefault();
}