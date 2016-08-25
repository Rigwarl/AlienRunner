const app = {
  init() {
    this.queue = new createjs.LoadQueue();
    createjs.Sound.alternateExtensions = ['ogg'];
    this.queue.installPlugin(createjs.Sound);
    this.queue.addEventListener('complete', () => this.start());
    this.queue.loadManifest([
      { id: 'char', src: 'img/monster-sprite.png' },
      { id: 'spike', src: 'img/spike.png' },
      { id: 'back', src: 'sound/background.mp3' },
      { id: 'flap', src: 'sound/flap.mp3' },
      { id: 'loose', src: 'sound/loose.mp3' },
    ]);
    this.stage = new createjs.Stage('game-stage');
  },
  start() {
    this.stage.canvas.classList.remove('loading');
    this.createBg();
    this.createLevel();
    this.createBird();
    this.bindEvents();
    this.createHud();
    this.createShadow();
    this.speed = 5;
    this.dead = false;
    this.flag = false;

    this.stage.update();
    this.stage.enableMouseOver(20);
    createjs.Sound.play('back', { loop: -1, volume: 0.4 });
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

    const showShadow = e => {
      if (e.keyCode === 32) {
        this.stage.removeChild(this.shadow, this.shadowText);
        this.paused = false;
      }
      window.removeEventListener('keyup', showShadow);
    };
    window.addEventListener('keyup', showShadow);
  },
  createHud() {
    this.hudDist = new createjs.Text('Distance: 0', '25px Arial', '#000');
    this.hudDist.x = 15;
    this.hudDist.y = 15;
    this.stage.addChild(this.hudDist);
  },
  createBird() {
    const ss = new createjs.SpriteSheet({
      images: [this.queue.getResult('char')],
      frames: { width: 100, height: 78 },
      animations: {
        fly: [0],
        flap: [1, 3, 'fly'],
        dead: [4],
      },
    });
    this.hero = new createjs.Sprite(ss, 'fly');
    this.hero.x = this.stage.canvas.width / 2;
    this.hero.regX = this.hero.getBounds().width / 2;
    this.hero.y = 200;
    this.hero.a = 0.2;
    this.hero.vY = 0;
    this.stage.addChild(this.hero);
  },
  createBg() {
    this.bgPos = {
      sky: 0,
      mountain: 0,
      ground: 0,
    };
  },
  moveBg() {
    if (this.dead) {
      return;
    }
    this.bgPos.sky -= this.speed * 0.1;
    this.bgPos.mountain -= this.speed * 0.4;
    this.bgPos.ground -= this.speed;
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
  },
  handleAction() {
    if (this.dead) {
      return;
    }
    createjs.Sound.play('flap', { volume: 0.8 });
    this.hero.gotoAndPlay('flap');
    this.hero.vY -= 7;
    this.hero.vY = Math.max(this.hero.vY, -7);
  },
  moveHero() {
    this.hero.vY += this.hero.a;
    this.hero.y += this.hero.vY;
    if (this.hero.y < -25) {
      this.hero.vY = 0;
      this.hero.y = -25;
    }
    if (this.hero.y > 460 && !this.dead) {
      this.dead = true;
      this.hero.rotation = 20;
      this.hero.gotoAndStop('dead');
      createjs.Sound.play('loose');
    }
  },
  createLevel() {
    this.level = new createjs.Container();
    this.stage.addChild(this.level);
    this.distance = 0;
    this.obstacles = new Set();
  },
  processLevel() {
    if (this.dead) {
      return;
    }
    if (!(this.distance % 450)) {
      const obstacle = new createjs.Bitmap(this.queue.getResult('spike'));
      obstacle.x = this.stage.canvas.width + obstacle.getBounds().width;
      obstacle.regX = obstacle.getBounds().width / 2;
      obstacle.regY = obstacle.getBounds().height;
      obstacle.scaleY = (Math.random() + Math.random()) * 0.6;
      if (obstacle.scaleY < 0.5) {
        obstacle.scaleY += 0.5;
      }

      if (Math.random() > 0.5) {
        obstacle.y = this.stage.canvas.height - 81;
      } else {
        obstacle.rotation = 180;
      }
      this.obstacles.add(obstacle);
      this.level.addChild(obstacle);
    }
    for (const item of this.obstacles) {
      item.x -= this.speed;
      if (item.x < -300) {
        this.obstacles.delete(item);
        this.level.removeChild(item);
      }
      if (ndgmr.checkPixelCollision(this.hero, item)) {
        this.dead = true;
        this.hero.rotation = 30;
        this.hero.gotoAndStop('dead');
        createjs.Sound.play('loose');
        return;
      }
    }
    this.distance += this.speed;
    this.hudDist.text = `Distance: ${Math.floor(this.distance / 20)} m`;
  },
  reset() {
    this.hero.y = 200;
    this.hero.vY = 0;
    this.hero.rotation = 0;
    this.hero.gotoAndStop('fly');
    this.dead = false;
    this.distance = 0;
    this.obstacles.clear();
    this.level.removeAllChildren();
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

    const reset = e => {
      if (e.keyCode === 32) {
        this.reset();
      }
      window.removeEventListener('keyup', reset);
    };
    window.addEventListener('keyup', reset);
  },
  onTick() {
    if (this.paused) {
      return;
    } else if (this.dead && !this.flag && this.hero.y > (this.stage.canvas.height + 100)) {
      this.createResetShadow();
    }
    this.moveBg();
    this.moveHero();
    this.processLevel();
    this.stage.update();
  },
};

app.init();
