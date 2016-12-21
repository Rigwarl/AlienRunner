import screenManager from '../managers/screensManager';
import soundManager from '../managers/soundManager';
import serverManager from '../managers/serverManager';
import IconBtn from './IconBtn';

export default class Gui extends createjs.Container {
  constructor(width) {
    super();

    this.width = width;

    this.menuBtn = new IconBtn('menu');
    this.menuBtn.x = this.menuBtn.getBounds().width / 2 + 20;
    this.menuBtn.y = this.menuBtn.getBounds().height / 2 + 20;

    this.ratingBtn = new IconBtn('rating');
    this.ratingBtn.x = this.ratingBtn.getBounds().width * 3 / 2 + 40;
    this.ratingBtn.y = this.ratingBtn.getBounds().height / 2 + 20;

    this.soundBtn = new IconBtn(soundManager.isEnabled() ? 'sound' : 'soundOff');
    this.soundBtn.x = this.width - this.soundBtn.getBounds().width / 2 - 20;
    this.soundBtn.y = this.soundBtn.getBounds().height / 2 + 20;

    this.addChild(this.menuBtn, this.ratingBtn, this.soundBtn);

    this.soundBtn.addEventListener('click', () => {
      soundManager.toggle();
      this.soundBtn.changeLabel(soundManager.isEnabled() ? 'sound' : 'soundOff');
      serverManager.set('sound', soundManager.isEnabled());
    });

    this.menuBtn.addEventListener('click', () => screenManager.change('StartScreen'));
    this.ratingBtn.addEventListener('click', () => screenManager.change('RatingScreen'));
  }
}
