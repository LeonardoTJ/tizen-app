import dashboardView from '../../views/dashboard.html';
import nav from '../nav.js';
import { modal } from './exitModal.controller.js';
import '../../style/dashboard.css';

export default () => {
  nav.reset(); // reset components navigation
  const containerDiv = document.createElement('div');
  containerDiv.classList.add('dashboard');
  containerDiv.innerHTML = dashboardView;
  containerDiv.appendChild(modal('menu'));

  // make login elements focusable
  nav.registerSection('menu', {
    selector: '.menu input',
    defaultElement: '#player-btn',
    rememberSource: true
  });
  nav.makeFocusable('menu');
  nav.focus('menu');

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
