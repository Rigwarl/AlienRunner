import screensManager from './managers/screensManager';
import assetsManager from './managers/assetsManager';

const canvas = document.querySelector('#game-stage');
const stage = new createjs.Stage(canvas);

screensManager.init(stage);
assetsManager.load(() => screensManager.change('mainScreen'));
