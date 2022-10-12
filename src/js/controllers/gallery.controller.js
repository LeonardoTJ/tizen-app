import galleryView from '../../views/gallery.html';
import nav from '../nav.js';
import '../../style/gallery.css';

let currentRotation = 0;
let displayWidth = 0;
let displayHeight = 0;

export default () => {
  const containerDiv = document.createElement('div');
  containerDiv.classList.add('gallery');
  containerDiv.innerHTML = galleryView;

  // get display resolution
  tizen.systeminfo.getPropertyValue('DISPLAY', function (result) {
    console.log(`[display] width: ${result.resolutionWidth}|${result.resolutionHeight}`);
    displayWidth = result.resolutionWidth;
    displayHeight = result.resolutionHeight;
  });

  function handleGalleryKeys(event) {
    const code = event.keyCode;
    let key = '';

    switch (code) {
      case nav.keys.RETURN_BUTTON:
        key = 'return';
        if (controls.classList.contains('active')) {  // popup view
          if (currentImg.naturalHeight > displayHeight) {
            currentImg.style.width = '';
          }

          currentImg.style.src = '';
          currentImg.style.transform = '';
          currentRotation = 0;
          imagePopup.classList.remove('active');
          controls.classList.remove('active');
          nav.disableSection('controls');
          nav.enableSection('images');
          nav.focus('images');
        } else {
          if (imagePopup.classList.contains('active')) {  // fullscreen
            if (currentImg.naturalHeight > displayHeight) {
              currentImg.style.width = '75%';
            } else {
              currentImg.style.width = '';
            }

            controls.classList.add('active');
            nav.enableSection('controls');
            nav.focus('controls');
          } else {                                        // main view
            window.location.replace('#dashboard');
          }
        }
        break;
      default:
        key = 'not handled';
    }
    console.log(`[gallery] ${code} - ${key}`);
  }

  function fillGallery() {
    let images = require.context('../../assets/', false, /\.(png|jpg|jpeg|gif)$/);
    images.keys().map(images).forEach((image, index) => {
      const imageInput = document.createElement('input');
      imageInput.setAttribute('type', 'image');
      imageInput.setAttribute('src', image);
      imageInput.setAttribute('role', 'button');
      imageInput.setAttribute('aria-label', `Image ${index + 1} thumbnail`);
      galleryGrid.appendChild(imageInput);
    });
  }

  nav.registerKeyHandler(handleGalleryKeys);

  const controls = containerDiv.querySelector('.buttons-container');
  const rotateLeftBtn = containerDiv.querySelector('.rotate-left-btn');
  const fullscreenBtn = containerDiv.querySelector('.fullscreen-btn');
  const rotateRightBtn = containerDiv.querySelector('.rotate-right-btn');
  const galleryGrid = containerDiv.querySelector('.gallery-grid');
  const imagePopup = containerDiv.querySelector('.image-popup');
  const currentImg = containerDiv.querySelector('.image-popup img');

  fillGallery(galleryGrid);

  containerDiv.querySelectorAll('.gallery-grid input').forEach(image => image.addEventListener('click', () => {
    currentImg.src = image.src;
    console.log(`[img] width: ${currentImg.naturalWidth}|${currentImg.naturalHeight}`);
    if (currentImg.naturalHeight > displayHeight) {
      currentImg.style.width = '75%';
    }

    imagePopup.classList.add('active');
    controls.classList.add('active');

    nav.disableSection('images');
    nav.enableSection('controls');
    nav.focus('controls');
  }));

  rotateLeftBtn.addEventListener('click', () => {
    currentRotation -= 90;
    currentImg.style.transform = `rotate(${currentRotation}deg)`;
  });

  rotateRightBtn.addEventListener('click', () => {
    currentRotation += 90;
    currentImg.style.transform = `rotate(${currentRotation}deg)`;
  });

  fullscreenBtn.addEventListener('click', () => {
    currentImg.style.width = '100%';

    controls.classList.remove('active');
    nav.disableSection('images');
    nav.disableSection('controls');
  });

  nav.reset();
  nav.registerSection('images', {
    selector: '.gallery-grid input',
  });
  nav.registerSection('controls', {
    selector: '.buttons-container button',
  });

  nav.disableSection('controls');
  nav.makeFocusable();
  nav.focus('images');

  return containerDiv;
}