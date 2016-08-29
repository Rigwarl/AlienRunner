import Loader from './Loader';
import Hero from './Hero';
import Spike from './Spike';

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
    this.shadow = new createjs.Shape();
    this.shadow.graphics
      .beginFill('rgba(0,0,0,0.6)')
      .drawRect(0, 0, this.stage.canvas.width, this.stage.canvas.height);
    this.shadowText = new createjs.Text('Hit space to start and space to flap', '25px Arial', '#fff');
    this.shadowText.y = this.stage.canvas.height / 2;
    this.shadowText.x = this.stage.canvas.width / 2;
    this.shadowText.textAlign = 'center';
    this.shadowText.textBaseline = 'middle';
    this.stage.addChild(this.shadow, this.shadowText);

    const showShadow = () => {
      this.stage.removeChild(this.shadow, this.shadowText);
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
    this.resetSpikes();
    this.dead = false;
    this.distance = 0;
    this.stage.removeChild(this.shadow, this.shadowText);
    this.paused = false;
    this.flag = false;
  },
  createResetShadow() {
    if (this.flag) {
      return;
    }
    this.flag = true;
    this.paused = true;
    this.shadowText.text = 'Hit space to restart';
    this.stage.addChild(this.shadow, this.shadowText);
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

app.init();
