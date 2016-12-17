import screensManager from './managers/screensManager';
import assetsManager from './managers/assetsManager';
import serverManager from './managers/serverManager';
import soundManager from './managers/soundManager';
import dataManager from './managers/dataManager';

const stage = new createjs.Stage('game-stage');
screensManager.init(stage);

let server = 'local';

if (window !== window.parent) {
  if (document.referrer.includes('://vk.com')) {
    server = 'vk';
  }
  // createjs stage click dosnt trigger window.focus
  window.addEventListener('click', () => window.focus());
}

Promise.all([
  assetsManager.init(),
  serverManager.init(server),
])
  .then(() => Promise.all([
    serverManager.get('maxScore')
      .then(r => dataManager.init(+r)),
    serverManager.get('sound')
      .then(
        // sound on by default and on server error
        r => soundManager.init(r === '' ? true : !!r),
        () => soundManager.init(true),
      ),
  ]))
  .then(() => screensManager.change('StartScreen'))
  .catch(e => console.error('init error, reload page', e));

if (createjs.Touch.isSupported()) {
  createjs.Touch.enable(stage, true);
} else {
  stage.enableMouseOver(20);
}
