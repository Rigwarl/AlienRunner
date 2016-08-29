export default class Hero extends createjs.Sprite {
  constructor(queue) {
    const ss = new createjs.SpriteSheet({
      images: [queue.getResult('char')],
      frames: { width: 100, height: 78 },
      animations: {
        fly: [0],
        flap: [1, 3, 'fly'],
        dead: [4],
      },
    });
    super(ss);
    this.bounds = this.getBounds();
    this.regX = this.bounds.width / 2;
    this.regY = this.bounds.height / 2;
    this.a = 550;
    this.reset();
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
    this.vY = Math.max(this.vY - 375, -375);
    this.gotoAndPlay('flap');
    createjs.Sound.play('flap');
  }
  move(time) {
    this.y += ((this.a * time * 0.5) + this.vY) * time;
    this.vY += this.a * time;
  }
  die() {
    this.dead = true;
    this.rotation = 20;
    this.gotoAndStop('dead');
    createjs.Sound.play('loose');
  }
}
