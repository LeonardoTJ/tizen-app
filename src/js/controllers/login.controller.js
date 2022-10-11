import loginView from '../../views/login.html';
import nav from '../nav.js';
import { modal } from './exitModal.controller';
import '../../style/login.css';

export default () => {
  nav.reset();  // reset components navigation
  const containerDiv = document.createElement('div');
  containerDiv.classList = 'forms';
  containerDiv.innerHTML = loginView;
  containerDiv.appendChild(modal('main'));

  // input fields
  const form = containerDiv.querySelector('#login-form');
  const emailField = containerDiv.querySelector('#email-field');
  const passwordField = containerDiv.querySelector('#password-field');

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


  // make login elements focusable
  nav.registerSection('main', {
    selector: '#login-form input',
    // defaultElement: '#email-field',
    rememberSource: true
  });
  nav.makeFocusable('main');
  nav.focus('main');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    validateCredentials();
  });

  // nav.registerKeyHandler((event) => {
  //   const key = event.keyCode;

  //   switch (key) {
  //     case nav.keys.RETURN_BUTTON:
  //       toggleModal();
  //       break;
  //   }
  // });

  return containerDiv;
};

