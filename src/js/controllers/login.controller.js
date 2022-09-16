// import { container } from 'webpack';
import loginView from '../../views/login.html';
import nav from '../nav.js';

export default () => {
  const containerDiv = document.createElement('div');
  containerDiv.classList = 'forms';
  containerDiv.innerHTML = loginView;

  // input fields
  const form = containerDiv.querySelector('#login-form');
  const emailField = containerDiv.querySelector('#email-field');
  const passwordField = containerDiv.querySelector('#password-field');

  // exit modal
  const modalExitBtn = containerDiv.querySelector('.modal_exit');
  const modalCancelBtn = containerDiv.querySelector('.modal_cancel');
  let exitModalActive = false;

  function toggleModal() {
    const modal = document.querySelector('.modal');
    modal.classList.toggle('modal-show');
    if (!exitModalActive) {
      nav.disableSection('main');
      nav.enableSection('modal');
      nav.focus('modal');
      exitModalActive = true;
    } else {
      nav.enableSection('main');
      nav.disableSection('modal');
      nav.focus('main');
      exitModalActive = false;
    }
  }

  // this would be backend functionality
  function isValidEmail(email) {
    // const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // return re.test(String(email).toLowerCase());
    return email === '1';
  }

  function isValidPassword(password) {
    return password === 'a';
  }

  function validateCredentials() {
    if (!isValidEmail(emailField.value)) {
      setErrorMessage(emailField, 'Please enter a valid email.');
      return;
    } else {
      setErrorMessage(emailField, '');
    }

    if (!isValidEmail(emailField.value) || !isValidPassword(passwordField.value)) {
      setErrorMessage(passwordField, 'Incorrect email or password.');
      return;
    } else {
      setErrorMessage(passwordField, '');
      localStorage.setItem('user', 1);
      form.submit();
    }
  }

  function setErrorMessage(field, message) {
    const messageField = field.parentElement.querySelector('.error-message');
    if (message) {
      messageField.innerText = message;
      field.classList.add('input-error');
    } else {
      messageField.innerText = '';
      field.classList.remove('input-error');
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    validateCredentials();
  });

  modalExitBtn.addEventListener('click', nav.exitApp);
  modalCancelBtn.addEventListener('click', toggleModal);

  nav.reset(); // reset components navigation

  // make login elements focusable
  nav.registerSection('main', {
    selector: '#login-form input',
    // defaultElement: '#email-field',
    rememberSource: true
  });
  // make exit modal elements focusable
  nav.registerSection('modal', {
    selector: '.modal input',
    enterTo: 'default-element',
    defaultElement: '.modal-exit',
    rememberSource: true
  });

  nav.registerKeyHandler((event) => {
    const key = event.keyCode;

    switch (key) {
      case nav.keys.RETURN_BUTTON:
        toggleModal();
        break;
    }
  });

  nav.makeFocusable();

  return containerDiv;
};

