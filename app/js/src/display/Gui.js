import screenManager from '../managers/screensManager';
import soundManager from '../managers/soundManager';
import serverManager from '../managers/serverManager';
import IconBtn from './IconBtn';

export default class Gui extends createjs.Container {
  constructor(width) {
    super();

    this.width = width;

    this.ratingBtn = new IconBtn('rating');
    this.ratingBtn.x = this.ratingBtn.getBounds().width / 2 + 25;
    this.ratingBtn.y = this.ratingBtn.getBounds().height / 2 + 20;

    this.soundBtn = new IconBtn(soundManager.isEnabled() ? 'sound' : 'soundOff');
    this.soundBtn.x = this.width - this.soundBtn.getBounds().width / 2 - 25;
    this.soundBtn.y = this.soundBtn.getBounds().height / 2 + 20;

    this.addChild(this.ratingBtn, this.soundBtn);

    this.soundBtn.addEventListener('click', () => {
      soundManager.toggle();
      this.soundBtn.changeLabel(soundManager.isEnabled() ? 'sound' : 'soundOff');
      serverManager.set('sound', soundManager.isEnabled());
    });

    this.ratingBtn.addEventListener('click', () => screenManager.change('RatingScreen'));
  }
}
