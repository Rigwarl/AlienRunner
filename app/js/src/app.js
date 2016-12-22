import screensManager from './managers/screensManager';
import assetsManager from './managers/assetsManager';
import serverManager from './managers/serverManager';
import soundManager from './managers/soundManager';
import dataManager from './managers/dataManager';

Promise.all([
  assetsManager.init(),
  serverManager.init(),
])
  .then(() => Promise.all([
    serverManager.getUser().then(user => dataManager.set('user', {
      id: user.id,
      name: `${user.first_name} ${user.last_name}`,
      sex: user.sex,
    })),
    serverManager.get('maxScore').then(r => dataManager.set('maxScore', +r)),
    serverManager.get('sound').then(r => soundManager.init(r === '' ? true : !!r)),
  ]))
  .then(() => screensManager.change('StartScreen'))
  .catch(e => console.error('init error, reload page', e));

const stage = new createjs.Stage('game-stage');
screensManager.init(stage);

if (createjs.Touch.isSupported()) {
  createjs.Touch.enable(stage, true);
} else {
  stage.enableMouseOver(20);
}

if (window !== window.parent) {
  // createjs stage click dosnt trigger window.focus
  window.addEventListener('click', () => window.focus());
}
