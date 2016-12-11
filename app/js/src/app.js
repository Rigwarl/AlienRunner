import screensManager from './managers/screensManager';
import assetsManager from './managers/assetsManager';
import serverManager from './managers/serverManager';
import soundManager from './managers/soundManager';
import dataManager from './managers/dataManager';

const stage = new createjs.Stage('game-stage');
screensManager.init(stage);

let server = 'local';

if (window !== window.parent) {
  if (document.referrer.includes('vk.com')) {
    server = 'vk';
  }
  // createjs stage click dosnt trigger window.focus
  window.addEventListener('click', () => window.focus());
}

Promise.all([
  assetsManager.init(),
  serverManager.init(server)
    .then(() => serverManager.get('maxScore'))
    .then(r => dataManager.init(r || 0)),
]).then(() => serverManager.get('sound'))
  .then(r => soundManager.init(r || false))
  .then(() => screensManager.change('StartScreen'));

if (createjs.Touch.isSupported()) {
  createjs.Touch.enable(stage, true);
} else {
  stage.enableMouseOver(20);
}
