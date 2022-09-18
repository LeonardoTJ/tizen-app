import modalView from '../../views/exitModal.html';
import nav from '../nav.js';
import '../../style/exitModal.css';

let exitModalActive = false;
let currentSection;

function modal(section) {
  currentSection = section;
  const modalDiv = document.createElement('div');
  modalDiv.classList = 'modal';
  modalDiv.innerHTML = modalView;

  // exit modal
  const modalExitBtn = modalDiv.querySelector('.modal_exit');
  modalExitBtn.addEventListener('click', nav.exitApp);

  const modalCancelBtn = modalDiv.querySelector('.modal_cancel');
  modalCancelBtn.addEventListener('click', () => {
    toggleModal(currentSection);
  });

  // make exit modal elements focusable
  nav.registerSection('modal', {
    selector: '.modal input',
    enterTo: 'default-element',
    defaultElement: '.modal-exit',
    rememberSource: true
  });

  nav.registerKeyHandler((event) => {
    const key = event.keyCode;

    switch (key) {
      case nav.keys.RETURN_BUTTON:
        toggleModal();
        break;
    }
  });

  nav.disableSection('modal');
  // nav.makeFocusable();

  return modalDiv;
};

function toggleModal() {
  const modal = document.querySelector('.modal');
  modal.classList.toggle('modal-show');
  if (!exitModalActive) {
    nav.disableSection(currentSection);
    nav.enableSection('modal');
    nav.makeFocusable('modal');
    nav.focus('modal');
    exitModalActive = true;
  } else {
    nav.disableSection('modal');
    nav.enableSection(currentSection);
    nav.makeFocusable(currentSection);
    nav.focus(currentSection);
    exitModalActive = false;
  }
}

export { modal, toggleModal };