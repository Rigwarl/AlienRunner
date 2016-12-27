import assetsManager from '../managers/assetsManager';

export default class Spike extends createjs.Bitmap {
  constructor() {
    super(assetsManager.getResult('spike'));

    this.bounds = this.getBounds();
    this.regX = this.bounds.width / 2;
    this.regY = this.bounds.height;
  }
}
