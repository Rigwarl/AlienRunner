import serverManager from '../managers/serverManager';
import assetsManager from '../managers/assetsManager';
import screensManager from '../managers/screensManager';
import dataManager from '../managers/dataManager';
import Gui from '../display/Gui';
import Hero from '../display/Hero';
import Btn from '../display/Btn';

export default class StartScreen extends createjs.Container {
  constructor(width, height) {
    super();

    this.width = width;
    this.height = height;

    this.bg = new createjs.Bitmap(assetsManager.getResult('start'));
    this.gui = new Gui(width);

    this.startBtn = new Btn('Играть');
    this.startBtn.x = width / 2;
    this.startBtn.y = 320;

    this.pvpBtn = new Btn('PVP');
    this.pvpBtn.x = width / 2;
    this.pvpBtn.y = 410;

    this.inviteBtn = new Btn('Позвать бро', 'orange');
    this.inviteBtn.x = width / 2;
    this.inviteBtn.y = 500;

    this.hero = new Hero('monster');
    this.hero.x = width / 2;
    this.hero.y = 190;

    this.addChild(this.bg, this.gui, this.hero, this.startBtn, this.pvpBtn, this.inviteBtn);

    if (dataManager.maxScore) {
      this.score = new createjs.Text(`Рекорд: ${dataManager.maxScore} м`, '25px Guerilla', '#000');
      this.score.textAlign = 'center';
      this.score.x = this.width / 2;
      this.score.y = 40;
      this.addChild(this.score);
    }

    this.bindEvents();
  }
  // createHeroes() {
  //   this.heroes = [
  //     new Hero('bird'),
  //     new Hero('monster'),
  //     new Hero('chicken'),
  //   ];
  //   this.heroes.forEach((hero, i) => {
  //     hero.y = this.height / 2;
  //     hero.x = (i + 1) * this.width / (this.heroes.length + 1);
  //     hero.cursor = 'pointer';
  //     hero.addEventListener('click', () => this.selectHero(hero));
  //     hero.cache(0, 0, hero.bounds.width, hero.bounds.height);
  //   });
  //   this.heroFilter = new createjs.ColorFilter(0.6, 0.6, 0.6);
  //   this.resetHeroes();
  //   this.addChild(...this.heroes);
  // }
  // resetHeroes() {
  //   this.heroes.forEach(hero => {
  //     hero.filters = [this.heroFilter];
  //     hero.updateCache();
  //     hero.scaleX = 0.85;
  //     hero.scaleY = 0.85;
  //   });
  // }
  // selectHero(hero) {
  //   this.resetHeroes();

  //   hero.filters = [];
  //   hero.updateCache();
  //   hero.scaleX = 1;
  //   hero.scaleY = 1;
  //   hero.flap();

  //   if (!this.startBtn.enabled) {
  //     this.startBtn.enable();
  //   }

  //   dataManager.heroType = hero.type;
  // }
  bindEvents() {
    this.startBtn.addEventListener('click', () =>
      screensManager.change('MainScreen'));
    this.pvpBtn.addEventListener('click', () =>
      screensManager.change('PVPScreen'));
    this.inviteBtn.addEventListener('click', () =>
      serverManager.invite());

    this.onKeyDown = e => {
      if (e.keyCode === 32) {
        screensManager.change('MainScreen');
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', this.onKeyDown);
  }
  destroy() {
    window.removeEventListener('keydown', this.onKeyDown);
  }
}
