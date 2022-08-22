const validateAuth = function (auth) {
  document.querySelector('body').style.display = 'none';
  console.log(auth);
  // go to login if not authenticated
  if (auth !== '1') {
    window.location.replace('/');
    return;
  }
  document.querySelector('body').style.display = 'flex';
  console.log(window.location.pathname.split('/')[1].split('.')[0]);
  // go to dashboard if authenticated
  if (window.location.pathname.split('/')[1].split('.')[0] !== 'dashboard') {
    window.location.replace('/dashboard.html');
  }
}

const localAuth = localStorage.getItem('user');
validateAuth(localAuth);