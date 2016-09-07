import assetsManager from '../managers/assetsManager';
import screensManager from '../managers/screensManager';
import dataManager from '../managers/dataManager';
import Hero from '../display/Hero';
import Btn from '../display/Btn';

export default class StartScreen extends createjs.Container {
  constructor(width, height) {
    super();

    this.width = width;
    this.height = height;

    this.bg = new createjs.Bitmap(assetsManager.getResult('start'));
    this.title = new createjs.Text('Choose your avatar', '55px Arial', '#000');
    this.title.textAlign = 'center';
    this.title.x = this.width / 2;
    this.title.y = 110;

    this.startBtn = new Btn('Start');
    this.startBtn.x = width / 2;
    this.startBtn.y = 170 + this.height / 2;

    this.createHeroes();
    this.addChild(this.bg, this.title, ...this.heroes);

    this.startBtn.addEventListener('click', () => {
      if (dataManager.heroType) {
        screensManager.change('MainScreen');
      }
    });
  }
  createHeroes() {
    this.heroes = [
      new Hero('bird'),
      new Hero('monster'),
      new Hero('chicken'),
    ];
    this.heroes.forEach((hero, i) => {
      hero.y = 15 + this.height / 2;
      hero.x = (i + 1) * this.width / (this.heroes.length + 1);
      hero.cursor = 'pointer';
      hero.addEventListener('click', () => this.selectHero(hero));
      hero.cache(0, 0, hero.bounds.width, hero.bounds.height);
    });
    this.resetHeroes();
  }
  resetHeroes() {
    this.heroes.forEach(hero => {
      hero.filters = [new createjs.ColorFilter(0.6, 0.6, 0.6)];
      hero.updateCache();
      hero.scaleX = 0.85;
      hero.scaleY = 0.85;
    });
  }
  selectHero(hero) {
    this.resetHeroes();

    hero.filters = [];
    hero.updateCache();
    hero.scaleX = 1;
    hero.scaleY = 1;
    hero.flap();

    if (!this.startBtn.parent) {
      this.addChild(this.startBtn);
    }

    dataManager.heroType = hero.type;
  }
}
