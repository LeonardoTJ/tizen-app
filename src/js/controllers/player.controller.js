import playerView from '../../views/player.html';
import nav from '../nav.js';
import '../../style/player.css';

// stream url
const url = 'https://files.catbox.moe/9tz8kv.mp4';  // dan dan

// video duration formatter
const formatter = Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});

// timeout ID
let timeout = '';

// playtime
let currentPlaytime;

export default () => {
  const containerDiv = document.createElement('div');
  containerDiv.classList.add('frame-container', 'active');
  containerDiv.innerHTML = playerView;

  nav.reset(); // reset components navigation

  // UI
  const playPauseBtn = containerDiv.querySelector('.play-pause-btn');
  const ffBtn = containerDiv.querySelector('.ff-btn');
  const rwBtn = containerDiv.querySelector('.rw-btn');
  const currentTimeElement = containerDiv.querySelector('.current-time');
  const totalTimeElement = containerDiv.querySelector('.total-time');
  const progressBarContainer = containerDiv.querySelector('.progress-bar-container');
  const progressBar = containerDiv.querySelector('.progress-bar');
  const loadingIcon = containerDiv.querySelector('.loading-icon-container');
  const voiceTag = document.querySelector('#tts-tag');

  // open a media file
  webapis.avplay.open(url);

  // define event handlers
  const listener = {
    // Media data buffering has started
    onbufferingstart: function () {
      console.log("Buffering start.");
      loadingIcon.style.display = 'flex';
    },
    // Media data buffering progress percentage
    onbufferingprogress: function (percent) {
      console.log("Buffering progress data : " + percent);
      if (percent === 25) {
        webapis.avplay.play();
      }
    },
    //Media data buffering has completed
    onbufferingcomplete: function () {
      console.log("Buffering complete.");
      loadingIcon.style.display = 'none';
    },
    // Media playback has completed
    onstreamcompleted: function () {
      console.log("Stream Completed");
      progressBar.value = Math.floor(webapis.avplay.getDuration() / 1000);
      webapis.avplay.stop();

    },
    // Current playback time in the PLAYING state, in milliseconds
    oncurrentplaytime: function (currentMillis) {
      currentPlaytime = formatTime(currentMillis);
      if (currentPlaytime.hours) {
        currentTimeElement.textContent = `${currentPlaytime.hours}:${currentPlaytime.minutes}:${currentPlaytime.seconds}`;
      } else {
        currentTimeElement.textContent = `${currentPlaytime.minutes}:${currentPlaytime.seconds}`;
      }
      console.log(`Current time millis: ${currentMillis} |  ${currentTimeElement.textContent}`);
      progressBar.value = Math.floor(currentMillis / 1000);
    },
    // An error has ocurred during media playback
    onerror: function (eventType) {
      console.log("event type error : " + eventType);
    },
    // Some other event is received by the player
    onevent: function (eventType, eventData) {
      console.log("event type: " + eventType + ", data: " + eventData);
    },
    // Subtitle text has changed
    onsubtitlechange: function (duration, text, data3, data4) {
      console.log("subtitleText: " + text);
    },
    // DRM information is detected by the player
    ondrmevent: function (drmEvent, drmData) {
      console.log("DRM callback: " + drmEvent + ", data: " + drmData);
    }
  };

  webapis.avplay.setListener(listener);

  // set media display area
  webapis.avplay.setDisplayRect(0, 0, 1920, 1080);

  // set keymaps
  tizen.tvinputdevice.registerKeyBatch(['MediaPlayPause', 'MediaPause', 'MediaPlay', 'MediaStop']);

  nav.registerKeyHandler(handleUIKey);

  // add custom spatial-nav event listener to progress bar to handle seeking
  progressBarContainer.addEventListener('click', toggleSeekMode);

  // multitasking callbacks
  function restoreSuccessCallback() {
    console.log('State restored successfully');
  }

  function restoreErrorCallback() {
    console.log('Failed to restore state');
  }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      console.log("App Hidden, saving state...");
      webapis.avplay.suspend();
    } else {
      console.log("App Reopened, restoring state...");
      webapis.avplay.restoreAsync(url, 0, false, restoreSuccessCallback, restoreErrorCallback);
    }
  });

  // UI controls fade 
  function handleUIFade() {
    // if (timeout) return timeout;
    clearTimeout(timeout);

    return setTimeout(() => {
      if (webapis.avplay.getState() === 'PLAYING') {
        containerDiv.classList.remove('active', 'seeking');
      }
    }, 5000);
  }

  // main UI key listener
  function handleUIKey(e) {
    containerDiv.classList.add('active');
    timeout = handleUIFade();
    switch (e.keyCode) {
      case nav.keys.PLAY_PAUSE_BUTTON: // PLAYPAUSE button
        console.log(`[player][${e.keyCode}] PLAYPAUSE`);
        togglePlay();
        break;
      // case nav.keys.ENTER_BUTTON:    // ENTER button
      //   console.log(`[${e.keyCode}] ENTER`);
      //   break;
      case nav.keys.PLAY_BUTTON:   // PLAY button
        console.log(`[player][${e.keyCode}] PLAY`);
        if (webapis.avplay.getState() === 'IDLE') {
          webapis.avplay.prepareAsync(prepareSuccessCallback, prepareErrorCallback);
          loadingIcon.style.display = 'flex';
        } else if (webapis.avplay.getState() === 'PAUSED') {
          webapis.avplay.play();
          containerDiv.classList.remove('paused');
          timeout = handleUIFade();
        }
        break;
      case nav.keys.PAUSE_BUTTON:    // PAUSE button
        console.log(`[player][${e.keyCode}] PAUSE`);
        if (webapis.avplay.getState() === 'PLAYING') {
          webapis.avplay.pause();
          clearTimeout(timeout);
          containerDiv.classList.add('active', 'paused');
        }
        break;
      case nav.keys.STOP_BUTTON: // STOP button
        console.log(`[player][${e.keyCode}] STOP`);
        if (webapis.avplay.getState() === 'PLAYING' || webapis.avplay.getState() === 'PAUSED') {
          webapis.avplay.stop();
        }
        break;
      case nav.keys.RETURN_BUTTON: // RETURN button
        console.log(`[player][${e.keyCode}] RETURN`);
        tizen.tvinputdevice.unregisterKeyBatch(['MediaPlayPause', 'MediaPause', 'MediaPlay', 'MediaStop']);
        webapis.avplay.stop();
        webapis.avplay.close();

        window.location.replace('#dashboard');
        break;
      default:
        console.log(`[player][${e.key} - ${e.keyCode}] not supported`);
        break;
    }
  }

  // handle progress bar UI interaction 
  function handleProgressBarKey(e) {
    switch (e.keyCode) {
      case nav.keys.LEFT_ARROW_BUTTON:  // LEFT button
        console.log('Seek backward');
        webapis.avplay.jumpBackward(5000, seekBackwardSuccessCallback, seekErrorCallback);
        break;
      case nav.keys.RIGHT_ARROW_BUTTON:  // RIGHT button
        console.log('Seek forward');
        webapis.avplay.jumpForward(5000, seekForwardSuccessCallback, seekErrorCallback);
        break;
      case nav.keys.RETURN_BUTTON: // RETURN button
        toggleSeekMode();
        break;
      default:
        console.log(`[${e.keyCode}] Not supported in progressBar`);
    }
  }

  // util functions
  function togglePlay() {
    if (webapis.avplay.getState() === 'PLAYING') {
      webapis.avplay.pause();
      containerDiv.classList.add('active', 'paused');
      clearTimeout(timeout);
    } else if (webapis.avplay.getState() === 'IDLE') {
      webapis.avplay.prepareAsync(prepareSuccessCallback, prepareErrorCallback);
      loadingIcon.style.display = 'flex';
    } else {
      webapis.avplay.play();
      containerDiv.classList.remove('paused');
      timeout = handleUIFade()
    }
  }

  function toggleSeekMode() {
    containerDiv.classList.toggle('seeking');
    if (containerDiv.classList.contains('seeking')) {
      console.log('Seek mode');
      clearTimeout(timeout);
      nav.registerKeyHandler(handleProgressBarKey);
      nav.disableSection('main');
    } else {
      console.log('UI mode');
      nav.registerKeyHandler(handleUIKey);
      nav.enableSection('main');
      timeout = handleUIFade();
    }
  }

  function formatTime(duration) {
    duration /= 1000;
    let seconds = Math.floor(duration % 60);
    let minutes = Math.floor((duration / 60) % 60);
    let hours = Math.floor(duration / 3600);

    if (hours === 0) {
      seconds = formatter.format(seconds);
      return { minutes, seconds };
    } else {
      minutes = formatter.format(minutes);
      seconds = formatter.format(seconds);
      // return `${hours}:${minutes}:${seconds}`;
      return { hours, minutes, seconds };
    }
  }

  //Media seek during playback
  function seekForwardSuccessCallback() {
    console.log('Media forward seek successful');
    voiceTag.innerHTML = `Jump forward 5 seconds`;
    loadingIcon.style.display = 'none';
  }

  function seekBackwardSuccessCallback() {
    console.log('Media backwardseek successful');
    voiceTag.innerHTML = `Jump backward 5 seconds`;
    loadingIcon.style.display = 'none';
  }

  function seekErrorCallback() {
    console.log('Media seek failed');
    loadingIcon.style.display = 'none';
  }

  playPauseBtn.addEventListener('click', togglePlay);
  ffBtn.addEventListener('click', () => {
    console.log('Forward Button');
    webapis.avplay.jumpForward(5000, seekForwardSuccessCallback, seekErrorCallback);
  });
  rwBtn.addEventListener('click', () => {
    console.log('Backward Button');
    webapis.avplay.jumpBackward(5000, seekBackwardSuccessCallback, seekErrorCallback);
  });

  webapis.avplay.setTimeoutForBuffering(3);

  // prepare media for playback asynchronously
  const prepareSuccessCallback = function () {
    console.log('The media has finished preparing');
    console.log(webapis.avplay.getCurrentStreamInfo());
    timeout = handleUIFade();
    let { hours, minutes, seconds } = formatTime(webapis.avplay.getDuration());
    if (hours) {
      totalTimeElement.textContent = `${hours}:${minutes}:${seconds}`;
    } else {
      totalTimeElement.textContent = `${minutes}:${seconds}`;
    }
    console.log(`Total time millis: ${webapis.avplay.getDuration()} | Total time string: ${totalTimeElement.textContent}`);
    progressBar.max = Math.floor(webapis.avplay.getDuration() / 1000);
  }
  const prepareErrorCallback = function () {
    console.log('The media has failed to prepare');
  }

  // when AVPlay starts preparing, onbufferingstart event handler is invoked, and instance enters READY state
  webapis.avplay.prepareAsync(prepareSuccessCallback, prepareErrorCallback);

  // make player elements focusable
  nav.registerSection('main', {
    selector: 'button'
  });
  nav.registerSection('progressBar', {
    selector: '.controls .progress-bar-container'
  });

  nav.makeFocusable();
  nav.focus();

  return containerDiv;
};