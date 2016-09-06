import assetsManager from '../managers/assetsManager';
import screensManager from '../managers/screensManager';
import dataManager from '../managers/dataManager';
import Hero from '../display/Hero';

export default class StartScreen extends createjs.Container {
  constructor(width, height) {
    super();

    this.width = width;
    this.height = height;

    this.bg = new createjs.Bitmap(assetsManager.getResult('start'));
    this.title = new createjs.Text('Choose your avatar', '55px Arial', '#000');
    this.subtitle = new createjs.Text('Hit space for start', '30px Arial', '#000');
    this.title.textAlign = this.subtitle.textAlign = 'center';
    this.title.x = this.subtitle.x = this.width / 2;
    this.title.y = 120;
    this.subtitle.y = height - 120;

    this.createHeroes();
    this.addChild(this.bg, this.title, ...this.heroes);

    this.bindEvents();
  }
  createHeroes() {
    this.heroes = [
      new Hero('bird'),
      new Hero('monster'),
      new Hero('chicken'),
    ];
    this.heroes.forEach((hero, i) => {
      hero.y = 35 + this.height / 2;
      hero.x = (i + 1) * this.width / (this.heroes.length + 1);
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

    if (!dataManager.heroType) {
      this.addChild(this.subtitle);
    }

    dataManager.heroType = hero.type;
  }
  bindEvents() {
    this.onKeyDown = e => {
      if (e.keyCode === 32 && dataManager.heroType) {
        screensManager.change('MainScreen');
      }
    };
    this.onTouchStart = () => {
      if (dataManager.heroType) {
        screensManager.change('MainScreen');
      }
    };
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('touchstart', this.onTouchStart);
  }
  destroy() {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('touchstart', this.onTouchStart);
  }
}
