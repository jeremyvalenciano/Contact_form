//variables
const form = document.querySelector('.form'),
  sendBtn = document.querySelector('#sendBtn'),
  resetBtn = document.querySelector('#resetBtn'),
  issueForm = document.querySelector('#issue'),
  nameForm = document.querySelector('#name'),
  message = document.querySelector('#message'),
  emailForm = document.querySelector('#email');

eventListeners();

function eventListeners() {
  document.addEventListener('DOMContentLoaded', startApp);
  nameForm.addEventListener('blur', validateForm);
  issueForm.addEventListener('blur', validateForm);
  emailForm.addEventListener('blur', validateForm);
  message.addEventListener('blur', validateForm);
  form.addEventListener('submit', sendForm);
  resetBtn.addEventListener('click', resetForm);
}

//functions
function startApp() {
  sendBtn.disabled = true;
  sendBtn.style.cursor = 'not-allowed';
};

function checkErrors() {
  if (form.contains(document.querySelector('.error'))) {
    document.querySelector('.error').remove();
  }
}

function validateForm(e) {
  const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (e.target.value.length > 0) {
    checkErrors();
    e.target.classList.remove('error-styles');
    e.target.classList.add('succes-styles');

  } else {
    e.target.classList.remove('succes-styles');
    e.target.classList.add('error-styles');
    showError('All fields are required.');
  }
  if (e.target.type === 'email') {

    if (er.test(e.target.value)) {
      checkErrors();
    } else {
      showError('Invalid email address');
      e.target.classList.remove('succes-styles');
      e.target.classList.add('error-styles');
    }
  }
  if (e.target.type === 'textarea') {
    if (e.target.value.length > 20) {
      checkErrors();
      e.target.classList.add('succes-styles');
    } else {
      e.target.classList.remove('succes-styles');
      e.target.classList.add('error-styles');
      showError('The message must contain al least 20 characters.');
    }
  }
  if (er.test(emailForm.value) && nameForm.value !== '' && message.value !== '') {
    sendBtn.disabled = false;
    sendBtn.style.cursor = 'pointer';
  }
}
function showError(message) {
  const errorMessage = document.createElement('p');
  errorMessage.innerText = message;
  errorMessage.classList.add('field-required', 'error');
  const errors = document.querySelectorAll('.error');
  if (errors.length === 0) {
    form.insertBefore(errorMessage, document.querySelector('.buttons'));
  } else if (errors.length === 1) {
    document.querySelector('.error').remove();
    errorMessage.innerText = message;
    form.insertBefore(errorMessage, document.querySelector('.buttons'));
  }
}

//send Form event listener
function sendForm(e) {
  e.preventDefault();
  //select spinner
  const spinner = document.querySelector('.lds-roller');
  spinner.style.display = 'block';


  //show after 3 seconds
  setTimeout(() => {
    spinner.style.display = 'none';
    const mSucces = document.createElement('p');
    mSucces.textContent = 'message sent successfully';
    mSucces.classList.add('sent-styles');
    form.insertBefore(mSucces, spinner);
    setTimeout(() => {
      mSucces.remove();
      resetForm();
      deleteStyles();
    }, 5000)
  }, 3000);

}

function resetForm() {
  form.reset();
  startApp();
}

function deleteStyles() {
  const inputs = [nameForm, message, emailForm, issueForm];
  inputs.forEach((input) => {
    input.classList.remove('succes-styles');
  });
};