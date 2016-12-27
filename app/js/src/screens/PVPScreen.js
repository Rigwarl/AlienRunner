import screensManager from '../managers/screensManager';
import serverManager from '../managers/serverManager';
import dataManager from '../managers/dataManager';
import Background from '../display/Background';
import Hero from '../display/Hero';
import Spike from '../display/Spike';

const GROUND_HEIGHT = 82;
const START_SPEED = 5;

export default class MainScreen extends createjs.Container {
  constructor(width, height) {
    super();

    serverManager.get('pvp0', 1).then(r => this.init(r));

    this.width = width;
    this.height = height;

    this.speed = START_SPEED;
    this.started = false;

    dataManager.gameType = 'pvp';
    dataManager.pvp.win = false;
  }
  init(record) {
    this.record = record;
    dataManager.pvp.enemy = record.user;

    if (dataManager.user.id === record.user.id) {
      record.user.name = 'Призрачный птиц';
    }

    this.spikeIndex = 0;
    this.step = 0;
    this.distance = 0;
    this.started = true;

    this.createBg();
    this.createSpikes();
    this.createHud();

    this.enemy = this.createHero(0);
    this.hero = this.createHero(1);

    this.bindEvents();
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
  createHero(pos) {
    const hero = new Hero(dataManager.heroType);
    hero.x = this.width / 2 - 180 * pos;
    hero.y = 190;
    this.addChild(hero);

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

    if (this.record.spikes[this.spikeIndex]) {
      spike.scaleY = this.record.spikes[this.spikeIndex];
      this.spikeIndex += 1;

      if (spike.scaleY > 0) {
        spike.y = this.height - GROUND_HEIGHT;
      } else {
        spike.y = 0;
      }
    } else {
      spike.scaleY = 0.7 + (Math.random() * 0.45);
      if (Math.random() > 0.5) {
        spike.y = this.height - GROUND_HEIGHT;
      } else {
        spike.y = 0;
        spike.scaleY = -spike.scaleY;
      }
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
    this.hero.flap();
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
        this.speed += 0.02;
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
        dataManager.pvp.win = true;
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
    if (this.record.actions[this.step]) {
      this.enemy.flap();
    }
  }
  destroy() {
    window.removeEventListener('keydown', this.onKeyDown);
  }
}
