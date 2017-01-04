import randomInt from 'random-int';
import screensManager from '../managers/screensManager';
import dataManager from '../managers/dataManager';
import Background from '../display/Background';
import Hero from '../display/Hero';
import Spike from '../display/Spike';
import ShadowOverlay from '../display/ShadowOverlay';

const GROUND_HEIGHT = 80;
const START_SPEED = 5;

export default class MainScreen extends createjs.Container {
  constructor(width, height) {
    super();

    this.width = width;
    this.height = height;

    this.speed = START_SPEED;
    this.step = 0;
    this.distance = 0;
    this.shadowOverlay = new ShadowOverlay(this.width, this.height);

    dataManager.gameType = 'single';
    dataManager.actions = {};
    dataManager.spikes = [];
    dataManager.pos = 0;

    this.createBg();
    this.createSpikes();
    this.createHero();
    this.createHud();

    this.pause('Пробел - взмах крыльями, esc - пауза');
    this.bindEvents();

    this.title = new createjs.Text('', '65px Guerilla', '#fff');
    this.title.textAlign = 'center';
    this.title.textBaseline = 'middle';
    this.title.x = width / 2;
    this.title.y = 225;
    this.addChild(this.title);

    switch (randomInt(2, 2)) {
      case 0:
        dataManager.gameMode = 'reverseVer';
        this.title.text = 'Переворот!';
        this.title.y = height - this.title.y;
        this.hudDistance.y = height - this.hudDistance.y;
        this.hudDistance.color = '#fff';
        this.y = this.shadowOverlay.y = height;
        this.scaleY = this.shadowOverlay.scaleY = this.title.scaleY = this.hudDistance.scaleY = -1;
        break;
      case 1:
        dataManager.gameMode = 'reverseHor';
        this.title.text = 'Встречный ветер!';
        this.title.x = width - this.title.x;
        this.hudDistance.x = width - this.hudDistance.x;
        this.x = this.shadowOverlay.x = width;
        this.scaleX = this.hero.scaleX = this.shadowOverlay.scaleX = this.title.scaleX = this.hudDistance.scaleX = -1;
        break;
      default:
        dataManager.gameMode = 'normal';
        break;
    }
    console.log(dataManager.gameMode);
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
  createHero() {
    this.hero = new Hero(dataManager.heroType);
    this.hero.x = this.width / 2;
    this.hero.y = 190;
    this.addChild(this.hero);
  }
  createHud() {
    this.hudDistance = new createjs.Text('0 м', '25px Guerilla', '#000');
    this.hudDistance.x = 20;
    this.hudDistance.y = 15;
    this.addChild(this.hudDistance);
  }
  resetSpike(spike) {
    spike.scaleY = +(0.7 + Math.random() * 0.45).toFixed(2);
    spike.x += this.width + spike.bounds.width;
    if (Math.random() > 0.5) {
      spike.y = this.height - GROUND_HEIGHT;
    } else {
      spike.y = 0;
      spike.scaleY = -spike.scaleY;
    }
    dataManager.spikes.push(spike.scaleY);
  }
  pause(text) {
    this.paused = true;
    this.shadowOverlay.setText(text);
    this.addChild(this.shadowOverlay);
  }
  bindEvents() {
    this.addEventListener('click', () => this.handleAction());
    this.onKeyDown = e => {
      switch (e.keyCode) {
        case 32:
          this.handleAction();
          e.preventDefault();
          break;
        case 27:
          this.togglePause();
          break;
      }
    };

    window.addEventListener('keydown', this.onKeyDown);
  }
  handleAction() {
    if (this.paused) {
      if (this.title) {
        this.removeChild(this.title);
        this.title = null;
      }
      this.togglePause();
    } else {
      this.hero.flap();
      dataManager.actions[this.step] = 1;
    }
  }
  togglePause() {
    if (this.paused) {
      this.paused = false;
      this.removeChild(this.shadowOverlay);
    } else {
      this.pause('Нажмите пробел или esc');
    }
  }
  moveWorld() {
    if (this.hero.dead) {
      this.hero.x += this.speed * 0.5;
    } else {
      this.moveSpikes(this.speed);
      this.bgSky.move(this.speed * 0.1);
      this.bgMountain.move(this.speed * 0.3);
      this.bgGround.move(this.speed);

      this.distance += this.speed;
      dataManager.score = Math.floor(this.distance / 25);
      this.hudDistance.text = `${dataManager.score} м`;
    }
  }
  moveSpikes() {
    this.spikes.forEach(spike => {
      spike.x -= this.speed;
      if (spike.x < -spike.bounds.width / 2) {
        this.resetSpike(spike);
        this.speed += 0.04;
      }
      if (ndgmr.checkPixelCollision(this.hero, spike)) {
        this.hero.die();
      }
    });
  }
  moveHero() {
    this.hero.move();
    if (this.hero.y < 0) {
      this.hero.vY = 0;
      this.hero.y = 0;
    } else if (this.hero.y > this.height + this.hero.bounds.height / 2) {
      screensManager.change('EndScreen');
    } else if (this.hero.y > this.height - (GROUND_HEIGHT + this.hero.bounds.height / 2)) {
      this.hero.die();
    }
  }
  tick() {
    if (this.paused) {
      return;
    }
    this.moveWorld();
    this.moveHero();
    this.step += 1;
  }
  destroy() {
    window.removeEventListener('keydown', this.onKeyDown);
  }
}
