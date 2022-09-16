const keys = {
  RETURN_BUTTON: 10009,
  ENTER_BUTTON: 13,
  LEFT_ARROW_BUTTON: 37,
  UP_ARROW_BUTTON: 38,
  RIGHT_ARROW_BUTTON: 39,
  DOWN_ARROW_BUTTON: 40,
};
let currentKeyHandler;

function handleKeys(event) {
  const key = event.keyCode;

  switch (key) {
    case keys.UP_ARROW_BUTTON:
      console.log(`[key] ${key} - up`);
      break;
    case keys.DOWN_ARROW_BUTTON:
      console.log(`[key] ${key} - down`);
      break;
    case keys.RETURN_BUTTON:
      console.log(`[key] ${key} - return`);
      break;
    case keys.ENTER_BUTTON:
      console.log(`[key] ${key} - enter`);
      event.target.click();
      break;
    default:
      console.log(`[key] ${key} - not handled`);
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
  // SpatialNavigation.makeFocusable();
  // SpatialNavigation.focus();
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