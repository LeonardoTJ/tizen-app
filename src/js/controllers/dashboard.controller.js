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

  return containerDiv;
}