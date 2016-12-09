import assetsManager from '../managers/assetsManager';
import screensManager from '../managers/screensManager';
import dataManager from '../managers/dataManager';
import soundManager from '../managers/soundManager';
import IconBtn from '../display/IconBtn';
import Btn from '../display/Btn';

export default class EndScreen extends createjs.Container {
  constructor(width) {
    super();

    this.bg = new createjs.Bitmap(assetsManager.getResult('start'));
    this.score = new createjs.Text(`Score: ${dataManager.score}`, '40px CarterOne', '#000');
    this.maxScore = new createjs.Text(`Best score: ${dataManager.maxScore}`, '40px CarterOne', '#000');
    this.score.x = this.maxScore.x = width / 2;
    this.score.textAlign = this.maxScore.textAlign = 'center';
    this.score.y = 110;
    this.maxScore.y = 180;

    this.replayBtn = new Btn('Restart');
    // this.menuBtn = new Btn('Menu', 'orange');
    this.replayBtn.x = width / 2;
    // this.menuBtn.y = 470;
    this.replayBtn.y = 380;

    this.replayBtn.addEventListener('click', () => screensManager.change('MainScreen'));
    // this.menuBtn.addEventListener('click', () => screensManager.change('StartScreen'));

    this.addChild(this.bg, this.score, this.maxScore, this.replayBtn);

    const soundBtn = new IconBtn(soundManager.isEnabled() ? 'sound' : 'soundOff');
    soundBtn.x = width - soundBtn.getBounds().width / 2 - 25;
    soundBtn.y = soundBtn.getBounds().height / 2 + 20;
    this.addChild(soundBtn);

    soundBtn.addEventListener('click', () => {
      soundManager.toggle();
      soundBtn.changeLabel(soundManager.isEnabled() ? 'sound' : 'soundOff');
    });
  }
}
