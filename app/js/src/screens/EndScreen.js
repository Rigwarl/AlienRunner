import assetsManager from '../managers/assetsManager';
import screensManager from '../managers/screensManager';
import serverManager from '../managers/serverManager';
import dataManager from '../managers/dataManager';
import soundManager from '../managers/soundManager';
import IconBtn from '../display/IconBtn';
import Btn from '../display/Btn';

export default class EndScreen extends createjs.Container {
  constructor(width) {
    super();

    this.bg = new createjs.Bitmap(assetsManager.getResult('start'));
    this.score = new createjs.Text(`Score: ${dataManager.score} m\n\nBest score: ${dataManager.maxScore} m`, '40px CarterOne', '#000');
    this.score.x = width / 2;
    this.score.textAlign = 'center';
    this.score.y = 110;

    if (dataManager.score > dataManager.maxScore) {
      dataManager.maxScore = dataManager.score;
      serverManager.set('maxScore', dataManager.maxScore);
      this.score.text = `New Best Score: ${dataManager.maxScore} m`;
      this.score.y += 50;
    }

    this.replayBtn = new Btn('Restart');
    // this.menuBtn = new Btn('Menu', 'orange');
    this.replayBtn.x = width / 2;
    // this.menuBtn.y = 470;
    this.replayBtn.y = 380;

    this.addChild(this.bg, this.score, this.replayBtn);

    const soundBtn = new IconBtn(soundManager.isEnabled() ? 'sound' : 'soundOff');
    soundBtn.x = width - soundBtn.getBounds().width / 2 - 25;
    soundBtn.y = soundBtn.getBounds().height / 2 + 20;
    this.addChild(soundBtn);

    soundBtn.addEventListener('click', () => {
      soundManager.toggle();
      soundBtn.changeLabel(soundManager.isEnabled() ? 'sound' : 'soundOff');
      serverManager.set('sound', soundManager.isEnabled());
    });

    this.bindEvents();
  }
  bindEvents() {
    this.replayBtn.addEventListener('click', () => screensManager.change('MainScreen'));
    // this.menuBtn.addEventListener('click', () => screensManager.change('StartScreen'));

    this.onKeyDown = e => {
      if (e.keyCode === 32) {
        screensManager.change('MainScreen');
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', this.onKeyDown);
  }
  destroy() {
    window.removeEventListener('keydown', this.onKeyDown);
  }
}
