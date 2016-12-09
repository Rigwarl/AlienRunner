import screensManager from './managers/screensManager';
import assetsManager from './managers/assetsManager';
import soundManager from './managers/soundManager';

const stage = new createjs.Stage('game-stage');

screensManager.init(stage);
assetsManager.load(() => {
  soundManager.init(true);
  screensManager.change('StartScreen');

  if (createjs.Touch.isSupported()) {
    createjs.Touch.enable(stage, true);
  } else {
    stage.enableMouseOver(20);
  }

  if (window !== window.parent) {
    window.addEventListener('click', () => window.focus());
  }
});
