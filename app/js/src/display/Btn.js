import assetsManager from '../managers/assetsManager';
import soundManager from '../managers/soundManager';

export default class Btn extends createjs.Container {
  constructor(label, color = 'green', type = 'btn') {
    super();

    this.color = color;
    this.enabled = true;

    this.createBg(type);
    this.createLabel(label);

    this.addEventListener('click', () =>
      this.enabled && soundManager.isEnabled() && createjs.Sound.play('flap'));
  }
  createBg(type) {
    this.bg = new createjs.Sprite(assetsManager.getSpriteSheet(type));
    this.bg.regX = this.bg.getBounds().width / 2;
    this.bg.regY = this.bg.getBounds().height / 2;
    this.helper = new createjs.ButtonHelper(this.bg, `${this.color}Out`, `${this.color}Over`, `${this.color}Down`);
    this.addChild(this.bg);
  }
  createLabel(label) {
    this.label = new createjs.Text(label, '30px CarterOne', '#fff');
    this.label.shadow = new createjs.Shadow('#000', 0, 1, 5);
    this.label.textAlign = 'center';
    this.label.textBaseline = 'middle';
    this.label.mouseEnabled = false;
    this.label.y = -2;

    // todo cache
    // now it cache before font load (
    // const h = this.label.getMeasuredHeight() + 6; // add 6 cos of shadow
    // const w = this.label.getMeasuredWidth() + 6;
    // this.label.cache(-w / 2, -h / 2, w, h);

    this.addChild(this.label);
  }
  disable() {
    this.bg.gotoAndStop('disable');
    this.enabled = false;
    this.mouseEnabled = false;
  }
  enable() {
    this.bg.gotoAndStop(`${this.color}Out`);
    this.enabled = true;
    this.mouseEnabled = true;
  }
}
