import notFoundView from '../../views/notFound.html';
import nav from '../nav.js';
import '../../style/notFound.css';

export default () => {
  const containerDiv = document.createElement('div');
  containerDiv.innerHTML = notFoundView;

  nav.reset(); // reset components navigation

  // make login elements focusable
  nav.registerSection('exitButton', {
    selector: '#back-btn',
    // defaultElement: '#email-field',
    rememberSource: true
  });

  nav.registerKeyHandler((event) => {
    const key = event.keyCode;

    switch (key) {
      case nav.keys.RETURN_BUTTON:
        window.location.replace('#dashboard');
        break;
    }
  });

  nav.makeFocusable();

  const backBtn = containerDiv.querySelector('#back-btn');
  backBtn.addEventListener('click', () => {
    window.location.replace('#dashboard');
  });

  return containerDiv;
};