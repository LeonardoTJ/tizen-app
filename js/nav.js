function handleKeys(event) {
  const key = event.keyCode;

  switch (key) {
    case UP_ARROW_BUTTON:
      console.log(`[key] ${key} - arriba`);
      break;
    case DOWN_ARROW_BUTTON:
      console.log(`[key] ${key} - abajo`);
      break;
    case RETURN_BUTTON:
      console.log(`[key] ${key} - atras`);
      toggleModal();
      break;
    case ENTER_BUTTON:
      console.log(`[key] ${key} - seleccionar`);
      event.target.click();
      break;
    default:
      console.log(`[key] ${key} - no soportado`);
  }
}

function initNavigation() {
  SpatialNavigation.init();
  SpatialNavigation.add('main', {
    selector: '#login-form input',
    enterTo: 'last-focused',
    defaultElement: '#email-field',
    rememberSource: true
  });
  SpatialNavigation.add('modal', {
    selector: '.modal input',
    enterTo: 'default-element',
    defaultElement: '.modal-exit',
    rememberSource: true
  });
  SpatialNavigation.makeFocusable();
  SpatialNavigation.focus();

  document.addEventListener('keydown', handleKeys);
}

function toggleModal() {
  const modal = document.querySelector('.modal');
  modal.classList.toggle('modal-show');
  toggleFocusableButtons();
}

function toggleFocusableButtons() {
  if (!exitMenuActive) {
    SpatialNavigation.disable('main');
    SpatialNavigation.enable('modal');
    SpatialNavigation.focus('modal');
    exitMenuActive = true;
  } else {
    SpatialNavigation.enable('main');
    SpatialNavigation.disable('modal');
    SpatialNavigation.focus('main');
    exitMenuActive = false;
  }
}

function exitApp() {
  tizen.application.getCurrentApplication().exit();
}

const RETURN_BUTTON = 10009,
  ENTER_BUTTON = 13,
  LEFT_ARROW_BUTTON = 37,
  UP_ARROW_BUTTON = 38,
  RIGHT_ARROW_BUTTON = 39,
  DOWN_ARROW_BUTTON = 40;
const mainFields = document.querySelectorAll('.main-btn');
const modalFields = document.querySelectorAll('.modal-btn');
mainFields.forEach(field => field.classList.add('focusable'));
let exitMenuActive = false;

initNavigation();