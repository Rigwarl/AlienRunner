export default class Spike extends createjs.Bitmap {
  constructor(queue) {
    super(queue.getResult('spike'));

    this.bounds = this.getBounds();
    this.regX = this.bounds.width / 2;
    this.regY = this.bounds.height;
  }
  reset() {
    this.scaleY = 0.7 + (Math.random() * 0.5);
  }
}
