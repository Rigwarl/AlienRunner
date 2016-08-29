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
    this.regX = this.getBounds().width / 2;
    this.a = 400;
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
    this.vY = Math.max(this.vY - 325, -325);
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
