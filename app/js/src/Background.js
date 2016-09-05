export default class Background extends createjs.Container {
  constructor(queue, canvasWidth, canvasHeight) {
    super();

    this.sky = null;
    this.mountain = null;
    this.ground = null;
    this.skyImg = null;
    this.mountainImg = null;
    this.groundImg = null;

    this.createLayer('sky', queue, canvasWidth, canvasHeight);
    this.createLayer('mountain', queue, canvasWidth, canvasHeight);
    this.createLayer('ground', queue, canvasWidth, canvasHeight);
  }
  createLayer(name, queue, canvasWidth, canvasHeight) {
    const img = queue.getResult(name);
    const width = img.width + canvasWidth;

    this[name] = new createjs.Shape();
    this[name].graphics.beginBitmapFill(img, 'repeat-x').drawRect(0, 0, width, img.height);
    this[name].y = canvasHeight;
    this[name].regY = img.height;
    this[name].cache(0, 0, width, img.height);

    this[`${name}Img`] = img;
    this.addChild(this[name]);
  }
  move(path) {
    this.moveLayer('ground', path);
    this.moveLayer('mountain', path * 0.3);
    this.moveLayer('sky', path * 0.1);
  }
  moveLayer(name, path) {
    this[name].x -= path;
    this[name].x %= this[`${name}Img`].width;
  }
}
