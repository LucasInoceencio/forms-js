window.addEventListener("load", init);

function init() {
  let form = document.forms['register'];
  form.addEventListener('submit', validationForm, false);
  form.cpf.addEventListener('blur', validationCPF, false);
  form.email.addEventListener('blur', validationEmail, false);
  form.name.addEventListener('blur', validationName, false);
  form.personalPhone.addEventListener('blur', validationPhone, false);
  form.comercialPhone.addEventListener('blur', validationComercialPhone, false);
  form.birthDate.addEventListener('blur', validationAge, false);
  form.cep.addEventListener('blur', validationCEP, false)
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

function validationName() {
  let field = document.forms['register'].name;
  let inputName = field.value; 
  if(inputName == null || inputName == '' || inputName.length <= 2 || inputName.length > 30) {
    console.log("add class error input name");
    addClassError(field);
    return false;
  }
  removeClassError(field);
  return true;
}

function validationAge() {
  let field = document.forms['register'].birthDate;
  let inputAge = field.value;
  if(inputAge == null || inputAge == '') {
    console.log("add class erro input age");
    addClassError(field);
    return false;
  }
  removeClassError(field);
  return true;
}

function validatePhone(phone) {
  let regex = /\d{2}\d{4,5}\d{4}/g;
  return regex.test(phone);
}

function validationComercialPhone() {
  let field = document.forms['register'].comercialPhone;
  let inputPhone = field.value;
  if(inputPhone == null || inputPhone == '' || validatePhone(inputPhone) == false) {
    console.log("add class erro input comercial phone");
    addClassError(field);
    return false;
  }
  removeClassError(field);
  return true;
}

function validationPhone() {
  let field = document.forms['register'].personalPhone;
  let inputPhone = field.value;
  if(inputPhone == null || inputPhone == '' || validatePhone(inputPhone) == false) {
    console.log("add class erro input phone");
    addClassError(field);
    return false;
  }
  removeClassError(field);
  return true;
}

function validateCEP(cep) {
  let regex = /\d{8}/g;
  return regex.test(cep);
}

function validationCEP() {
  let field = document.forms['register'].cep;
  let inputCEP = field.value;
  if (inputCEP == null || inputCEP == '' || validateCEP(inputCEP) == false) {
    console.log("add class erro input cep")
    addClassError(field);
    return false;
  }
  removeClassError(field);
  retrieveCEP();
  return true;
}

function retrieveCEP() {
  let valueInputCEP = document.forms['register'].cep.value;
    fetch(`http://viacep.com.br/ws/${valueInputCEP}/json`)
    .then(response => {
      if (response.status != 200) {
        console.error("Erro ao buscar CEP no servidor!");
        return;
      }
      return response.json();
    })
    .then(data => {
      let fieldPublicPlace = document.forms['register'].publicPlace;
      let fieldCity = document.forms['register'].city;
      let fieldState = document.forms['register'].state;
      let fieldNeighborhood = document.forms['register'].neighborhood;
      fieldPublicPlace.value = data.logradouro;
      fieldCity.value = data.localidade;
      fieldState.value = data.uf;
      fieldNeighborhood.value = data.bairro;
    })
    .catch(error => {
      console.error(`Erro: ${error}`);
    })
}

function validationForm(event) {
  console.log("validationForm");
  validationCPF();
  validationEmail();
  validationAge();
  validationPhone();
  validationComercialPhone();
  validationName();
  validationCEP();

  event.preventDefault();
}