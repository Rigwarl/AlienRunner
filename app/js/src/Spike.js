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
    this.x = this.stage.canvas.width + (this.bounds.width / 2);
    if (Math.random() > 0.5) {
      this.y = this.stage.canvas.height - 81;
      this.rotation = 0;
    } else {
      this.y = 0;
      this.rotation = 180;
    }
  }
}
