import { router } from './router/index.router.js';
import auth from './auth.js';
import nav from './nav.js';
import '../style.css';

auth();
nav.initNavigation();
router(window.location.hash);

window.addEventListener('hashchange', () => {
  router(window.location.hash);
});