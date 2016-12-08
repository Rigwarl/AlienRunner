import screensManager from '../managers/screensManager';
import dataManager from '../managers/dataManager';
import Background from '../display/Background';
import Hero from '../display/Hero';
import Spike from '../display/Spike';
import ShadowOverlay from '../display/ShadowOverlay';

const SPEED = 300;
const GROUND_HEIGHT = 82;

export default class MainScreen extends createjs.Container {
  constructor(width, height) {
    super();

    this.width = width;
    this.height = height;

    this.distance = 0;
    this.shadowOverlay = new ShadowOverlay(this.width, this.height);

    this.createBg();
    this.createSpikes();
    this.createHero();
    this.createHud();

    this.pause('Press space to flap, esc to pause');
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
  createHero() {
    this.hero = new Hero(dataManager.heroType);
    this.hero.x = this.width / 2;
    this.hero.y = 200;
    this.addChild(this.hero);
  }
  createHud() {
    this.hudDistance = new createjs.Text('0 m', '25px CarterOne', '#000');
    this.hudDistance.x = 20;
    this.hudDistance.y = 15;
    this.addChild(this.hudDistance);
  }
  resetSpike(spike) {
    spike.reset();
    spike.x += this.width + spike.bounds.width;
    if (Math.random() > 0.5) {
      spike.y = this.height - GROUND_HEIGHT;
      spike.rotation = 0;
    } else {
      spike.y = 0;
      spike.rotation = 180;
    }
  }
  pause(text) {
    this.paused = true;
    this.shadowOverlay.setText(text);
    this.addChild(this.shadowOverlay);
  }
  bindEvents() {
    this.onKeyDown = (e) => {
      switch (e.keyCode) {
        case 32:
          this.handleAction();
          break;
        case 27:
          this.togglePause();
          break;
      }
    };
    this.onTouchStart = (e) => {
      e.preventDefault();
      this.handleAction();
    };

    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('touchstart', this.onTouchStart);
  }
  handleAction() {
    if (this.paused) {
      this.togglePause();
    } else {
      this.hero.flap();
    }
  }
  togglePause() {
    if (this.paused) {
      this.paused = false;
      this.removeChild(this.shadowOverlay);
    } else {
      this.pause('Press space or esc to unpause');
    }
  }
  moveWorld(time) {
    const path = SPEED * time;
    if (this.hero.dead) {
      this.hero.x += path * 0.5;
    } else {
      this.moveSpikes(path);
      this.bgSky.move(path * 0.1);
      this.bgMountain.move(path * 0.3);
      this.bgGround.move(path);

      this.distance += path;
      dataManager.score = Math.floor(this.distance / 25);
      this.hudDistance.text = `${dataManager.score} m`;
    }
  }
  moveSpikes(path) {
    for (const spike of this.spikes) {
      spike.x -= path;
      if (spike.x < -spike.bounds.width / 2) {
        this.resetSpike(spike);
      }
      if (ndgmr.checkPixelCollision(this.hero, spike)) {
        this.hero.die();
      }
    }
  }
  moveHero(time) {
    this.hero.move(time);
    if (this.hero.y < 0) {
      this.hero.vY = 0;
      this.hero.y = 0;
    } else if (this.hero.y > this.height + this.hero.bounds.height / 2) {
      dataManager.maxScore = Math.max(dataManager.maxScore, dataManager.score);
      screensManager.change('EndScreen');
    } else if (this.hero.y > this.height - (GROUND_HEIGHT + this.hero.bounds.height / 2)) {
      this.hero.die();
    }
  }
  tick(e) {
    const sec = e.delta * 0.001;
    if (this.paused || sec > 0.3) {
      return;
    }
    this.moveWorld(sec);
    this.moveHero(sec);
  }
  destroy() {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('touchstart', this.onTouchStart);
  }
}
