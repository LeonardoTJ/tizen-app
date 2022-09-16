import { pages } from '../controllers/index';

const container = document.querySelector('.container');

const router = async (route) => {
  route = route.replace('#', '');
  container.innerHTML = '';


  switch (route) {
    case '':
    case '#':
    case 'login':
      return container.appendChild(pages.login());
    case 'dashboard':
      return container.appendChild(pages.dashboard());
    default:
      container.innerHTML = '<h1>404 not found</h1>';
  }
}

export { router };