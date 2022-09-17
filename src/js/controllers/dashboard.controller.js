import dashboardView from '../../views/dashboard.html';
import nav from '../nav.js';
import '../../style/dashboard.css';

export default () => {
  const containerDiv = document.createElement('div');
  containerDiv.innerHTML = dashboardView;

  nav.reset(); // reset components navigation

  // make login elements focusable
  nav.registerSection('menu', {
    selector: '.menu .menu-item',
    // defaultElement: '#email-field',
    rememberSource: true
  });

  nav.makeFocusable();

  const playerBtn = containerDiv.querySelector('#player-btn');
  playerBtn.addEventListener('click', () => {
    window.location.replace('#player');
  });

  const galleryBtn = containerDiv.querySelector('#gallery-btn');
  galleryBtn.addEventListener('click', () => {
    window.location.replace('#gallery');
  });

  return containerDiv;
}