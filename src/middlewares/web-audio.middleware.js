import { PRESS_KEY, RELEASE_KEY } from '../ducks/keyboard.duck';

const audioContext = new (AudioContext || webkitAudioContext)();

const oscillators = {};

const webAudioMiddleware = store => next => action => {
  switch (action.type) {
    case PRESS_KEY: {
      const { frequency } = action;

      const osc = audioContext.createOscillator();
      osc.frequency.value = frequency;
      osc.type = 'square';

      osc.start(0);
      osc.connect(audioContext.destination);

      oscillators[frequency] = osc;

      break;
    }
    case RELEASE_KEY: {
      const { frequency } = action;

      if (typeof oscillators[frequency] === 'undefined') {
        break;
      }

      oscillators[frequency].stop();
    }
  }

  return next(action);
}

export default webAudioMiddleware
