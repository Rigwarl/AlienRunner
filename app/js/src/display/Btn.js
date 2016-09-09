import assetsManager from '../managers/assetsManager';

export default class Btn extends createjs.Container {
  constructor(text) {
    super();

    const ss = new createjs.SpriteSheet({
      images: [assetsManager.getResult('btn')],
      frames: { width: 210, height: 69 },
      animations: {
        disable: 0,
        down: 1,
        out: 2,
        over: 3,
      },
    });
    this.enabled = true;
    this.bg = new createjs.Sprite(ss);
    this.bg.regX = this.bg.getBounds().width / 2;
    this.bg.regY = this.bg.getBounds().height / 2;

    this.helper = new createjs.ButtonHelper(this.bg);

    this.label = new createjs.Text(text, '30px CarterOne', '#fff');
    this.label.shadow = new createjs.Shadow('#000', 0, 1, 5);
    this.label.textAlign = 'center';
    this.label.textBaseline = 'middle';
    this.label.y = -2;

    this.addChild(this.bg, this.label);
  }
  disable() {
    this.bg.gotoAndStop('disable');
    this.enabled = false;
    this.helper.enabled = false;
  }
  enable() {
    this.bg.gotoAndStop('out');
    this.enabled = true;
    this.helper.enabled = true;
  }
}
