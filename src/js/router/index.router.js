import { pages } from '../controllers/index.js';

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
    case 'player':
      return container.appendChild(pages.player());
    default:
      return container.appendChild(pages.notFound());
  }
}

export { router };