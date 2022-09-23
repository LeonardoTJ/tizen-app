import login from './login.controller.js';
import dashboard from './dashboard.controller.js';
import player from './player.controller.js';
import gallery from './gallery.controller.js';
import notFound from './notFound.controller.js';

const pages = {
  login,
  dashboard,
  player,
  gallery,
  notFound,
}

export { pages };