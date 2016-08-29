import Loader from './Loader';
import Hero from './Hero';
import Spike from './Spike';
import ShadowOverlay from './ShadowOverlay';

const queue = new Loader();
queue.addEventListener('complete', startGame);

let canvas;
let stage;
let spikes = [];
let shadowOverlay;
let hero;
let hudDistance;

const speed = 300;
let distance = 0;
let paused = false;

function startGame() {
  canvas = document.querySelector('#game-stage');
  stage = new createjs.Stage(canvas);

  createBg();
  createSpikes();
  createHero();
  createHud();
  bindEvents();

  createjs.Sound.play('back', { loop: -1, volume: 0.35 });
  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.addEventListener('tick', tick);
}

function createBg() {
  stage.canvas.classList.remove('loading');
}

function createSpikes() {
  for (let i = 0; i < 2; i++) {
    const spike = new Spike(queue);
    resetSpike(spike);
    spike.x += (canvas.width + spike.bounds.width) * i * 0.5;
    spikes.push(spike);
    stage.addChild(spike);
  }
}

function resetSpike(spike) {
  spike.reset();
  spike.x = canvas.width + (spike.bounds.width / 2);
  if (Math.random() > 0.5) {
    spike.y = canvas.height - 81;
    spike.rotation = 0;
  } else {
    spike.y = 0;
    spike.rotation = 180;
  }
}

function createHero() {
  hero = new Hero(queue);
  hero.x = canvas.width / 2;
  hero.y = 200;
  stage.addChild(hero);
}

function moveHero(time) {
  hero.move(time);
  if (hero.y < -20) {
    hero.vY = 0;
    hero.y = -20;
  } else if (hero.y > canvas.height + (hero.bounds.height / 2)) {
    endGame();
  } else if (hero.y > 460) {
    hero.die();
  }
}

function createHud() {
  hudDistance = new createjs.Text('Distance: 0 m', '25px Arial', '#000');
  hudDistance.x = 15;
  hudDistance.y = 15;
  stage.addChild(hudDistance);
}

function moveWorld(time) {
  if (hero.dead) {
    return;
  }
  for (const spike of spikes) {
    spike.x -= speed * time;
    if (spike.x < -spike.bounds.width / 2) {
      resetSpike(spike);
    }
    if (ndgmr.checkPixelCollision(hero, spike)) {
      hero.die();
    }
  }
  distance += speed * time;
  hudDistance.text = `${Math.floor(distance / 25)} m`;
}

function endGame() {
  paused = true;
  console.log('end');
}

function bindEvents() {
  window.addEventListener('keydown', () => hero.flap());
}

function tick(e) {
  if (paused) {
    return;
  }
  const sec = e.delta * 0.001;
  moveWorld(sec);
  moveHero(sec);
  stage.update();
}

const app = {
  init() {
    this.queue = new Loader();
    this.queue.addEventListener('complete', () => this.start());
    this.stage = new createjs.Stage('game-stage');
  },
  start() {
    this.createBg();
    this.createSpikes();
    this.createHero();
    this.bindEvents();
    this.createHud();
    this.createShadow();

    this.speed = 5;
    this.dead = false;
    this.flag = false;
    this.distance = 0;

    this.stage.update();
    this.stage.enableMouseOver(20);
    createjs.Sound.play('back', { loop: -1, volume: 0.35 });
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener('tick', e => this.onTick(e));
  },
  createShadow() {
    this.paused = true;
    this.shadowOverlay = new ShadowOverlay('Hit space to start and space to flap', this.stage.canvas);
    this.stage.addChild(this.shadowOverlay);

    const showShadow = () => {
      this.stage.removeChild(this.shadowOverlay);
      this.paused = false;
      window.removeEventListener('keyup', showShadow);
      window.removeEventListener('touchend', showShadow);
    };
    window.addEventListener('keyup', showShadow);
    window.addEventListener('touchend', showShadow);
  },
  createHud() {
    this.hudDist = new createjs.Text('Distance: 0', '25px Arial', '#000');
    this.hudDist.x = 15;
    this.hudDist.y = 15;
    this.stage.addChild(this.hudDist);
  },
  createHero() {
    this.hero = new Hero(this.queue);
    this.hero.x = this.stage.canvas.width / 2;
    this.hero.y = 200;
    this.stage.addChild(this.hero);
  },
  createBg() {
    this.stage.canvas.classList.remove('loading');
    this.bgPos = {
      sky: 0,
      mountain: 0,
      ground: 0,
    };
  },
  moveBg(delta) {
    if (this.dead) {
      return;
    }
    this.bgPos.sky -= this.speed * 0.1 * delta;
    this.bgPos.mountain -= this.speed * 0.4 * delta;
    this.bgPos.ground -= this.speed * delta;
    this.stage.canvas.style.backgroundPosition = `${this.bgPos.ground}px,
                                                  ${this.bgPos.mountain}px,
                                                  ${this.bgPos.sky}px`;
  },
  bindEvents() {
    window.addEventListener('keyup', () => {
      if (this.paused) {
        return;
      }
      this.handleAction();
    });
    window.addEventListener('touchend', () => {
      if (this.paused) {
        return;
      }
      this.handleAction();
    });
  },
  handleAction() {
    if (!this.dead) {
      this.hero.flap();
    }
  },
  moveHero(delta) {
    this.hero.move(delta);
    if (this.hero.y < -20) {
      this.hero.vY = 0;
      this.hero.y = -20;
    } else if (this.hero.y > 460 && !this.dead) {
      this.dead = true;
      this.hero.die();
    }
  },
  createSpikes() {
    this.spikes = [];
    for (let i = 0; i < 2; i++) {
      const spike = new Spike(this.queue);
      this.spikes.push(spike);
      this.stage.addChild(spike);
    }
    this.resetSpikes();
  },
  resetSpikes() {
    this.spikes.forEach((spike, i) => {
      spike.reset();
      spike.x += (this.stage.canvas.width + spike.bounds.width) * i * 0.5;
    });
  },
  moveSpikes(delta) {
    if (this.dead) {
      return;
    }
    for (const spike of this.spikes) {
      spike.x -= this.speed * delta;
      if (spike.x < -spike.bounds.width / 2) {
        spike.reset();
      }
      if (ndgmr.checkPixelCollision(this.hero, spike)) {
        this.dead = true;
        this.hero.die();
        return;
      }
    }
    this.distance += this.speed * delta;
    this.hudDist.text = `Distance: ${Math.floor(this.distance / 20)} m`;
  },
  reset() {
    this.hero.reset();
    this.hero.y = 200;
    this.resetSpikes();
    this.dead = false;
    this.distance = 0;
    this.stage.removeChild(this.shadowOverlay);
    this.paused = false;
    this.flag = false;
  },
  createResetShadow() {
    if (this.flag) {
      return;
    }
    this.flag = true;
    this.paused = true;
    this.shadowOverlay.setText('Hit space to restart');
    this.stage.addChild(this.shadowOverlay);
    this.stage.update();

    const reset = () => {
      this.reset();
      window.removeEventListener('keyup', reset);
      window.removeEventListener('touchend', reset);
    };
    window.addEventListener('keyup', reset);
    window.addEventListener('touchend', reset);
  },
  onTick(e) {
    if (this.paused) {
      return;
    } else if (this.hero.y > (this.stage.canvas.height + 100)) {
      this.createResetShadow();
    }
    const delta = e.delta / 16;
    this.moveBg(delta);
    this.moveHero(delta);
    this.moveSpikes(delta);
    this.stage.update();
  },
};
