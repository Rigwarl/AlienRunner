import assetsManager from '../managers/assetsManager';
import soundManager from '../managers/soundManager';

const CONFIG = {
  G: 0.16,
  A: 7,
};

export default class Hero extends createjs.Sprite {
  constructor(type) {
    super(assetsManager.getSpriteSheet(type));

    this.type = type;
    this.bounds = this.getBounds();
    this.regX = this.bounds.width / 2;
    this.regY = this.bounds.height / 2;

    this.dead = false;
    this.vY = 0;
  }
  flap() {
    if (this.dead) {
      return;
    }
    this.vY = Math.max(this.vY - CONFIG.A, -CONFIG.A);
    this.gotoAndPlay('flap');
    soundManager.play('flap');
  }
  move() {
    this.vY += CONFIG.G;
    this.y += this.vY;
  }
  die() {
    if (this.dead) {
      return;
    }
    this.dead = true;
    this.rotation = 30;
    this.gotoAndStop('dead');
    soundManager.play('loose');
  }
}
