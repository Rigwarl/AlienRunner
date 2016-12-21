import assetsManager from '../managers/assetsManager';
import dataManager from '../managers/dataManager';
import Gui from '../display/Gui';

export default class RatingScreen extends createjs.Container {
  constructor(width) {
    super();

    this.width = width;

    this.bg = new createjs.Bitmap(assetsManager.getResult('start'));
    this.gui = new Gui(width);

    this.title = new createjs.Text('Рейтинг', '35px Guerilla', '#000');
    this.title.textAlign = 'center';
    this.title.x = this.width / 2;
    this.title.y = 35;

    this.addChild(this.bg, this.gui, this.title);

    this.showRating();
  }
  showRating() {
    let winner = false;

    dataManager.ratingTable.forEach((el, i) => {
      const text = new createjs.Text(`${i + 1} ${el.name} ${el.score}`, '25px Guerilla', '#000');
      text.y = 120 + i * 40;
      text.x = 120;
      this.addChild(text);

      if (el.id === dataManager.user.id) {
        winner = true;
        text.color = '#7ECE2E';
      }
    });

    if (!winner) {
      const text = new createjs.Text(`- ${dataManager.user.name} ${dataManager.maxScore}`, '25px Guerilla', '#7ECE2E');
      text.y = 120 + dataManager.ratingTable.length * 40;
      text.x = 120;
      this.addChild(text);
    }
  }
}
