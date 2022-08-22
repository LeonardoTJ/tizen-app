function handleKeys(event) {
  const key = event.keyCode;

  switch (key) {
    case UP_ARROW_BUTTON:
      console.log(`[key] ${key} - arriba`);
      //navigate(KEY_UP);
      break;
    case DOWN_ARROW_BUTTON:
      console.log(`[key] ${key} - abajo`);
      //navigate(KEY_DOWN);
      break;
    case RETURN_BUTTON:
      console.log(`[key] ${key} - atras`);
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
  SpatialNavigation.add({
    selector: 'a, input',
    enterTo: 'default-element',
    defaultElement: '.default-element',
    rememberSource: true
  });
  SpatialNavigation.makeFocusable();
  SpatialNavigation.focus();

  document.addEventListener('keydown', handleKeys);
}

const RETURN_BUTTON = 10009,
  ENTER_BUTTON = 13,
  LEFT_ARROW_BUTTON = 37,
  UP_ARROW_BUTTON = 38,
  RIGHT_ARROW_BUTTON = 39,
  DOWN_ARROW_BUTTON = 40;

initNavigation();