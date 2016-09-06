import screensManager from './managers/screensManager';
import assetsManager from './managers/assetsManager';

const stage = new createjs.Stage('game-stage');

screensManager.init(stage);
assetsManager.load(() => {
  screensManager.change('StartScreen');
  createjs.Sound.play('back', { loop: -1, volume: 0.3 });
});

