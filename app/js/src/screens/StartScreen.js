export default class StartScreen extends createjs.Container {
  constructor(width, height) {
    super();

    this.text = new createjs.Text('Choose your avatar', '35px Arial', '#000');
    this.text.textAlign = 'center';
    this.text.x = width / 2;
    this.text.y = 150;
    this.addChild(this.text);
  }
}
