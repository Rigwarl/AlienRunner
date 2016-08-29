export default class ShadowOverlay extends createjs.Container {
  constructor(text, width, height) {
    super();

    this.shadow = new createjs.Shape();
    this.shadow.graphics.beginFill('rgba(0,0,0,0.6)').drawRect(0, 0, width, height);

    this.shadowText = new createjs.Text(text, '25px Arial', '#fff');
    this.shadowText.y = height / 2;
    this.shadowText.x = width / 2;
    this.shadowText.textAlign = 'center';
    this.shadowText.textBaseline = 'middle';

    this.addChild(this.shadow, this.shadowText);
  }
}
