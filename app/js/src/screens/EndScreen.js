import assetsManager from '../managers/assetsManager';
import screensManager from '../managers/screensManager';
import serverManager from '../managers/serverManager';
import dataManager from '../managers/dataManager';
import Gui from '../display/Gui';
import Btn from '../display/Btn';

export default class EndScreen extends createjs.Container {
  constructor(width) {
    super();

    this.bg = new createjs.Bitmap(assetsManager.getResult('start'));
    this.gui = new Gui(width);

    this.score = new createjs.Text(`Результат: ${dataManager.score} м\n\nРекорд: ${dataManager.maxScore} м`, '40px Guerilla', '#000');
    this.score.textAlign = 'center';
    this.score.x = width / 2;
    this.score.y = 125;

    this.replayBtn = new Btn('Еще раз');
    this.replayBtn.x = width / 2;
    this.replayBtn.y = 350;

    this.shareBtn = new Btn('Поделиться', 'orange');
    this.shareBtn.x = width / 2;
    this.shareBtn.y = 450;
    this.shareBtn.addEventListener('click', () => serverManager.share(dataManager.score, dataManager.user.sex));

    this.addChild(this.bg, this.gui, this.score, this.replayBtn, this.shareBtn);


    if (dataManager.score > dataManager.maxScore) {
      dataManager.maxScore = dataManager.score;
      serverManager.set('maxScore', dataManager.maxScore);
      this.score.text = `Новый рекорд: ${dataManager.maxScore} м!`;
      this.score.y += 35;
    }

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
