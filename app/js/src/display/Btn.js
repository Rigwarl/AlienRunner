export default class Btn extends createjs.Container {
  constructor(text) {
    super();

    this.bg = new createjs.Shape();
    this.bg.graphics.beginFill('#00ff00').drawRoundRect(-60, -30, 120, 60, 15);

    this.label = new createjs.Text(text, '40px Arial', '#000');
    this.label.textAlign = 'center';
    this.label.textBaseline = 'middle';
    this.cursor = 'pointer';

    this.addChild(this.bg, this.label);
  }
}
