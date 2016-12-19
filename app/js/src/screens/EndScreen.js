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
    this.score = new createjs.Text(`Результат: ${dataManager.score} м\n\nРекорд: ${dataManager.maxScore} м`, '40px Guerilla', '#000');
    this.score.textAlign = 'center';
    this.score.x = width / 2;
    this.score.y = 125;

    this.replayBtn = new Btn('Еще раз');
    this.replayBtn.x = width / 2;
    this.replayBtn.y = 450;

    this.shareBtn = new Btn('Поделиться', 'orange');
    this.shareBtn.x = width / 2;
    this.shareBtn.y = 350;
    this.shareBtn.addEventListener('click', () => serverManager.share(dataManager.score));

    this.addChild(this.bg, this.score, this.replayBtn, this.shareBtn);

    if (dataManager.score > dataManager.maxScore) {
      dataManager.maxScore = dataManager.score;
      serverManager.set('maxScore', dataManager.maxScore);
      this.score.text = `Новый рекорд: ${dataManager.maxScore} м!`;
      this.score.y += 35;
    }

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
