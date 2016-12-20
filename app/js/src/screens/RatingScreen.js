import assetsManager from '../managers/assetsManager';
import serverManager from '../managers/serverManager';
import dataManager from '../managers/dataManager';
import Gui from '../display/Gui';

export default class RatingScreen extends createjs.Container {
  constructor(width) {
    super();

    serverManager.loadRating().then(r => this.showRating(r));

    this.width = width;

    this.bg = new createjs.Bitmap(assetsManager.getResult('start'));
    this.gui = new Gui(width);

    this.title = new createjs.Text('Рейтинг (в разработке)', '35px Guerilla', '#000');
    this.title.textAlign = 'center';
    this.title.x = this.width / 2;
    this.title.y = 35;

    this.addChild(this.bg, this.gui, this.title);
  }
  showRating(r) {
    r.push({
      id: 'myID',
      name: 'ЙА!!!',
      score: dataManager.maxScore,
    });

    const index = r.sort((a, b) => b.score - a.score).findIndex(el => el.score === dataManager.maxScore);
    let start = index - 3;
    let end = index + 3;

    if (end >= r.length) {
      start = Math.max(r.length - 7, 0);
      end = r.length - 1;
    } else if (start < 0) {
      start = 0;
      end = Math.min(r.length, 6);
    }

    r.slice(start, end + 1).forEach((el, i) => {
      const text = new createjs.Text(`${el.name} ${el.score}м`, '20px Guerilla', '#000');
      text.y = 150 + i * 50;
      text.x = 100;
      this.addChild(text);
    });
  }
}
