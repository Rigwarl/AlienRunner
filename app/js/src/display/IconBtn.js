import assetsManager from '../managers/assetsManager';
import Btn from './Btn';

export default class IconBtn extends Btn {
  constructor(label, color = 'orange') {
    super(label, color, 'iconBtn');
  }
  createLabel(label) {
    this.label = new createjs.Sprite(assetsManager.getSpriteSheet('icon'), label);
    this.label.regX = this.label.getBounds().width / 2;
    this.label.regY = this.label.getBounds().height / 2;
    this.label.mouseEnabled = false;
    this.addChild(this.label);
  }
  changeLabel(label) {
    this.label.gotoAndStop(label);
  }
}
