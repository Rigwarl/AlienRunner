export default class Background extends createjs.Shape {
  constructor(name, queue, canvasWidth) {
    super();

    this.img = queue.getResult(name);
    const width = this.img.width + canvasWidth;

    this.graphics.beginBitmapFill(this.img, 'repeat-x').drawRect(0, 0, width, this.img.height);
    this.regY = this.img.height;
    this.cache(0, 0, width, this.img.height);
  }
  move(path) {
    this.x -= path;
    this.x %= this.img.width;
  }
}
