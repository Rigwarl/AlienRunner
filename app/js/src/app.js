import screensManager from './managers/screensManager';
import assetsManager from './managers/assetsManager';
import soundManager from './managers/soundManager';

const stage = new createjs.Stage('game-stage');

screensManager.init(stage);
assetsManager.load(() => {
  screensManager.change('StartScreen');
  soundManager.init(true);

  if (createjs.Touch.isSupported()) {
    createjs.Touch.enable(stage, true);
  } else {
    stage.enableMouseOver(20);
  }
});
