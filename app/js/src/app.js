import screensManager from './managers/screensManager';
import assetsManager from './managers/assetsManager';
import IconBtn from './display/IconBtn';

const stage = new createjs.Stage('game-stage');

screensManager.init(stage);
assetsManager.load(() => {
  screensManager.change('StartScreen');
  createjs.Sound.play('back', { loop: -1, volume: 0.3 });
  if (createjs.Touch.isSupported()) {
    createjs.Touch.enable(stage, true);
  } else {
    stage.enableMouseOver(20);
  }

  const soundBtn = new IconBtn('sound');
  soundBtn.x = stage.canvas.width - soundBtn.getBounds().width / 2 - 25;
  soundBtn.y = soundBtn.getBounds().height / 2 + 20;
  stage.addChild(soundBtn);
});
