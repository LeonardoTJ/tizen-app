const form = document.querySelector('#login-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const emailField = document.querySelector('#email-field');
  const passwordField = document.querySelector('#password-field');

  if (!isValidEmail(emailField.value)) {
    setErrorMessage(emailField, 'Please enter a valid email.');
    return;
  } else {
    setErrorMessage(emailField, '');
  }

  if (!validateCredentials(emailField.value, passwordField.value)) {
    setErrorMessage(passwordField, 'Incorrect email or password.');
    return;
  } else {
    setErrorMessage(passwordField, '');
    localStorage.setItem('user', 1);
    form.submit();
  }
});

const isValidEmail = function (email) {
  // const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // return re.test(String(email).toLowerCase());
  return email === '1';
}

const validateCredentials = function (email, password) {
  if (email === '1' && password === 'a') {
    return true;
  }
  return false;
}

const setErrorMessage = function (field, message) {
  const messageField = field.parentElement.querySelector('.error-message');
  if (message) {
    messageField.innerText = message;
    field.classList.add('input-error');
  } else {
    messageField.innerText = '';
    field.classList.remove('input-error');
  }
}