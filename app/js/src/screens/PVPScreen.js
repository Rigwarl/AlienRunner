import randomInt from 'random-int';
import screensManager from '../managers/screensManager';
import serverManager from '../managers/serverManager';
import dataManager from '../managers/dataManager';
import Background from '../display/Background';
import Hero from '../display/Hero';
import Spike from '../display/Spike';
import Btn from '../display/Btn';

const GROUND_HEIGHT = 82;
const START_SPEED = 5;

export default class MainScreen extends createjs.Container {
  constructor(width, height) {
    super();

    this.width = width;
    this.height = height;

    this.speed = START_SPEED;
    this.started = false;

    this.createBg();

    const watingText = new createjs.Text('Идет подбор соперника', '35px Guerilla', '#000');
    watingText.textAlign = 'center';
    watingText.x = width / 2;
    watingText.y = 170;

    const cancelBtn = new Btn('Отмена', 'orange');
    cancelBtn.x = width / 2;
    cancelBtn.y = 340;
    cancelBtn.addEventListener('click', () => screensManager.change('StartScreen'));

    this.addChild(watingText, cancelBtn);

    dataManager.pos = randomInt(1);
    const enemyRange = dataManager.fields.normal[1 - dataManager.pos];
    const enemyField = `pvp${randomInt(enemyRange[0], enemyRange[1])}`;

    Promise.all([
      serverManager.get(enemyField, 1).then(r => this.initData(r)),
      new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 500)),
    ]).then(() => {
      this.init();
      this.removeChild(watingText, cancelBtn);
    }).catch(e => {
      watingText.text = 'PVP временно недоступно :(';
      console.error(e);
    });

    this.bindEvents();
  }
  initData(record) {
    dataManager.gameType = 'pvp';
    dataManager.win = false;
    dataManager.actions = {};
    dataManager.spikes = record.spikes;
    dataManager.enemyActions = record.actions;
    dataManager.enemy = record.user;
    if (dataManager.user.id === record.user.id) {
      dataManager.enemy.name = 'Призрачный птиц';
    }
  }
  init() {
    this.spikeIndex = 0;
    this.step = 0;
    this.distance = 0;

    this.createSpikes();
    this.createHud();

    const counter = new createjs.Text(3, '125px Guerilla', '#000');
    counter.textAlign = 'center';
    counter.x = this.width / 2;
    counter.y = 310;

    this.addChild(counter);

    const interval = setInterval(() => {
      counter.text -= 1;
      if (counter.text < 0) {
        this.removeChild(counter);
        this.started = true;
        clearInterval(interval);
      }
    }, 1000);

    this.hero = this.createHero(dataManager.pos, dataManager.user.name);
    this.enemy = this.createHero(1 - dataManager.pos, dataManager.enemy.name);
    this.enemy.alpha = 0.5;
  }
  createBg() {
    this.bgSky = new Background('sky', this.width);
    this.bgMountain = new Background('mountain', this.width);
    this.bgGround = new Background('ground', this.width);
    this.bgSky.y = this.bgMountain.y = this.bgGround.y = this.height;
    this.addChild(this.bgSky, this.bgMountain, this.bgGround);
  }
  createSpikes() {
    this.spikes = [new Spike(), new Spike()];
    this.spikes[0].x = -this.spikes[0].bounds.width / 2;
    this.spikes[1].x = this.width / 2;
    this.spikes.forEach(spike => this.resetSpike(spike));
    this.addChild(...this.spikes);
  }
  createHero(pos, name) {
    const hero = new Hero(dataManager.heroType);
    hero.x = this.width / 2 - 180 * pos;
    hero.y = 190 - 50 * pos;

    const heroName = new createjs.Text(name, '25px Guerilla', '#000');
    heroName.textAlign = 'center';
    heroName.y = hero.y - 100;
    heroName.x = hero.x;
    this.addChild(hero, heroName);

    createjs.Tween.get(heroName).wait(2400).to({ alpha: 0 }, 800)
      .call(() => this.removeChild(heroName));

    return hero;
  }
  createHud() {
    this.hudDistance = new createjs.Text('0 м', '25px Guerilla', '#000');
    this.hudDistance.x = 20;
    this.hudDistance.y = 15;
    this.addChild(this.hudDistance);
  }
  resetSpike(spike) {
    spike.x += this.width + spike.bounds.width;

    if (dataManager.spikes[this.spikeIndex]) {
      spike.scaleY = dataManager.spikes[this.spikeIndex];
      this.spikeIndex += 1;

      if (spike.scaleY > 0) {
        spike.y = this.height - GROUND_HEIGHT;
      } else {
        spike.y = 0;
      }
    } else {
      spike.scaleY = 0.7 + Math.floor(Math.random() * 10) * 0.05;
      if (Math.random() > 0.5) {
        spike.y = this.height - GROUND_HEIGHT;
      } else {
        spike.y = 0;
        spike.scaleY = -spike.scaleY;
      }
      dataManager.spikes.push(spike.scaleY);
    }
  }
  bindEvents() {
    this.addEventListener('click', () => this.handleAction());
    this.onKeyDown = e => {
      this.handleAction();
      e.preventDefault();
    };

    window.addEventListener('keydown', this.onKeyDown);
  }
  handleAction() {
    if (!this.started) {
      return;
    }
    this.hero.flap();
    dataManager.actions[this.step] = 1;
  }
  moveWorld() {
    this.moveSpikes(this.speed);
    this.bgSky.move(this.speed * 0.1);
    this.bgMountain.move(this.speed * 0.3);
    this.bgGround.move(this.speed);

    this.distance += this.speed;
    dataManager.score = Math.floor(this.distance / 25);
    this.hudDistance.text = `${dataManager.score} м`;
  }
  moveSpikes() {
    this.spikes.forEach(spike => {
      spike.x -= this.speed;
      if (spike.x < -spike.bounds.width / 2) {
        this.resetSpike(spike);
        this.speed += 0.03;
      }
    });
  }
  moveHero(hero) {
    hero.move();
    if (hero.y < 0) {
      hero.vY = 0;
      hero.y = 0;
    } else if (hero.y > this.height + hero.bounds.height / 2) {
      if (hero === this.hero) {
        screensManager.change('EndScreen');
      } else {
        dataManager.win = true;
      }
    } else if (hero.y > this.height - (GROUND_HEIGHT + hero.bounds.height / 2)) {
      hero.die();
    }
    if (this.spikes.some(spike => ndgmr.checkPixelCollision(hero, spike))) {
      hero.die();
    }
  }
  tick() {
    if (!this.started) {
      return;
    }
    this.moveWorld();
    this.moveHero(this.hero);
    this.moveHero(this.enemy);

    this.step += 1;
    if (dataManager.enemyActions[this.step]) {
      this.enemy.flap();
    }
  }
  destroy() {
    window.removeEventListener('keydown', this.onKeyDown);
  }
}
