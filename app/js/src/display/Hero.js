import assetsManager from '../managers/assetsManager';

const CONFIG = {
  G: 550,
  A: 375,
};

export default class Hero extends createjs.Sprite {
  constructor(type) {
    super(assetsManager.getSpriteSheet(type));

    this.type = type;
    this.bounds = this.getBounds();
    this.regX = this.bounds.width / 2;
    this.regY = this.bounds.height / 2;
  }
  reset() {
    this.dead = false;
    this.rotation = 0;
    this.vY = 0;
    this.gotoAndStop('fly');
  }
  flap() {
    if (this.dead) {
      return;
    }
    this.vY = Math.max(this.vY - CONFIG.A, -CONFIG.A);
    this.gotoAndPlay('flap');
    createjs.Sound.play('flap');
  }
  move(time) {
    this.y += ((CONFIG.G * time * 0.5) + this.vY) * time;
    this.vY += CONFIG.G * time;
  }
  die() {
    if (this.dead) {
      return;
    }
    this.dead = true;
    this.rotation = 30;
    this.gotoAndStop('dead');
    createjs.Sound.play('loose');
  }
}
