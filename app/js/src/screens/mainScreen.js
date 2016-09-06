import Background from '../display/Background';
import Hero from '../display/Hero';
import Spike from '../display/Spike';
import ShadowOverlay from '../display/ShadowOverlay';

const SPEED = 300;
const GROUND_HEIGHT = 82;

export default class mainScreen extends createjs.Container {
  constructor(width, height) {
    super();

    this.width = width;
    this.height = height;

    this.distance = 0;
    this.paused = true;
    this.finished = true;

    this.bgSky = new Background('sky', this.width);
    this.bgMountain = new Background('mountain', this.width);
    this.bgGround = new Background('ground', this.width);
    this.bgSky.y = this.bgMountain.y = this.bgGround.y = this.height;
    this.addChild(this.bgSky, this.bgMountain, this.bgGround);

    this.hero = new Hero();
    this.spikes = [new Spike(), new Spike()];
    this.hudDistance = new createjs.Text('', '25px Arial', '#000');
    this.hudDistance.x = this.hudDistance.y = 15;
    this.shadowOverlay = new ShadowOverlay(this.width, this.height);
    this.addChild(...this.spikes, this.hero, this.hudDistance);

    this.reset();
    this.pause('Press space to flap, esc to pause');
    this.bindEvents();

    createjs.Sound.play('back', { loop: -1, volume: 0.35 });
  }
  reset() {
    this.hero.reset();
    this.hero.x = this.width / 2;
    this.hero.y = 200;

    this.spikes[0].x = -this.spikes[0].bounds.width / 2;
    this.spikes[1].x = (this.width - this.spikes[1].bounds.width) / 2;
    this.spikes.forEach(spike => this.resetSpike(spike));

    this.distance = 0;
    this.hudDistance.text = '0 m';
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
    this.onKeyDownWrap = e => this.onKeyDown(e);
    this.onTouchStartWrap = e => this.onTouchStart(e);

    window.addEventListener('keydown', this.onKeyDownWrap);
    window.addEventListener('touchstart', this.onTouchStartWrap);
  }
  onKeyDown(e) {
    switch (e.keyCode) {
      case 32:
        this.handleAction();
        break;
      case 27:
        this.togglePause();
        break;
    }
  }
  onTouchStart(e) {
    e.preventDefault();
    this.handleAction();
  }
  handleAction() {
    if (this.finished) {
      this.restart();
    } else {
      this.hero.flap();
    }
  }
  togglePause() {
    if (this.finished) {
      return;
    }
    if (this.paused) {
      this.paused = false;
      this.removeChild(this.shadowOverlay);
    } else {
      this.pause('Press esc to unpause');
    }
  }
  restart() {
    this.paused = false;
    this.finished = false;
    this.reset();
    this.removeChild(this.shadowOverlay);
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
      this.hudDistance.text = `${Math.floor(this.distance / 25)} m`;
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
      this.finished = true;
      this.pause('Press space to restart');
    } else if (this.hero.y > this.height - (GROUND_HEIGHT + this.hero.bounds.height / 2)) {
      this.hero.die();
    }
  }
  tick(e) {
    const sec = e.delta * 0.001;
    if (this.paused || sec * SPEED > this.width * 0.2) {
      return;
    }
    this.moveWorld(sec);
    this.moveHero(sec);
  }
  destroy() {
    window.removeEventListener('keydown', this.onKeyDownWrap);
    window.removeEventListener('touchstart', this.onTouchStartWrap);
  }
}
