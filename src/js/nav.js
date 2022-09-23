const keys = {
  RETURN_BUTTON: 10009,
  ENTER_BUTTON: 13,
  LEFT_ARROW_BUTTON: 37,
  UP_ARROW_BUTTON: 38,
  RIGHT_ARROW_BUTTON: 39,
  DOWN_ARROW_BUTTON: 40,
  PLAY_BUTTON: 415,
  PAUSE_BUTTON: 19,
  PLAY_PAUSE_BUTTON: 10252,
  STOP_BUTTON: 413,
};
let currentKeyHandler;

function handleKeys(event) {
  const key = event.keyCode;

  switch (key) {
    case keys.UP_ARROW_BUTTON:
      console.log(`[nav] ${key} - up`);
      break;
    case keys.DOWN_ARROW_BUTTON:
      console.log(`[nav] ${key} - down`);
      break;
    case keys.RETURN_BUTTON:
      console.log(`[nav] ${key} - return`);
      break;
    case keys.ENTER_BUTTON:
      console.log(`[nav] ${key} - enter`);
      // event.target.click();
      break;
    default:
      console.log(`[nav] ${key} - not handled`);
  }
}

function initNavigation() {
  SpatialNavigation.init();
  document.addEventListener('keydown', handleKeys);
}

function reset() {
  SpatialNavigation.clear(); // reset state
}

function registerSection(id, config) {
  SpatialNavigation.add(id, config);
}

function registerKeyHandler(componentKeyHandler) {
  document.removeEventListener('keydown', currentKeyHandler);
  currentKeyHandler = componentKeyHandler;
  document.addEventListener('keydown', componentKeyHandler);
}

function enableSection(section) {
  SpatialNavigation.enable(section);
}

function disableSection(section) {
  SpatialNavigation.disable(section);
}


function makeFocusable(section) {
  if (!section)
    SpatialNavigation.makeFocusable();
  else
    SpatialNavigation.makeFocusable(section);
}

function focus(section) {
  SpatialNavigation.focus(section);
}

function exitApp() {
  tizen.application.getCurrentApplication().exit();
}

export default {
  keys,
  initNavigation,
  reset,
  exitApp,
  registerSection,
  registerKeyHandler,
  enableSection,
  disableSection,
  makeFocusable,
  focus,
};