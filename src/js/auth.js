const validateAuth = function (auth) {
  // document.querySelector('body').style.display = 'none';
  // go to login if not authenticated
  if (auth !== '1') {
    window.location.replace('#login');
    return;
  }
  // document.querySelector('body').style.display = 'flex';
  // go to dashboard if authenticated
  if (window.location.hash !== '#' || window.location.hash !== '#dashboard') {
    window.location.hash = '#dashboard';
  }
}

export default () => {
  const localAuth = localStorage.getItem('user');
  validateAuth(localAuth);
};