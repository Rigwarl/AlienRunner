export default class Spike extends createjs.Bitmap {
  constructor(queue) {
    super(queue.getResult('spike'));

    this.bounds = this.getBounds();
    this.regX = this.bounds.width / 2;
    this.regY = this.bounds.height;
  }
  reset() {
    this.scaleY = (Math.random() + Math.random()) * 0.6;
    if (this.scaleY < 0.5) {
      this.scaleY += 0.5;
    }
  }
}
