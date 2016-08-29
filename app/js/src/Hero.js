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
    this.a = 0.2;
    this.reset();
  }
  reset() {
    this.rotation = 0;
    this.vY = 0;
    this.gotoAndStop('fly');
  }
  flap() {
    this.vY = Math.max(this.vY - 7, -7);
    this.gotoAndPlay('flap');
    createjs.Sound.play('flap');
  }
  move(delta) {
    this.y += ((this.a * delta * 0.5) + this.vY) * delta;
    this.vY += this.a * delta;
  }
  die() {
    this.rotation = 20;
    this.gotoAndStop('dead');
    createjs.Sound.play('loose');
  }
}
