import randomInt from 'random-int';
import screensManager from '../managers/screensManager';
import serverManager from '../managers/serverManager';
import dataManager from '../managers/dataManager';
import Background from '../display/Background';
import Hero from '../display/Hero';
import Spike from '../display/Spike';
import Btn from '../display/Btn';

const GROUND_HEIGHT = 80;
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

    const modes = {
      0: 'upsideDown',
      1: 'backward',
      2: 'fast',
      3: 'slow',
      4: 'earthquake',
      5: 'fog',
      6: 'normal',
      7: 'normal',
      8: 'normal',
      9: 'normal',
      10: 'normal',
    };
    dataManager.gameMode = modes[dataManager.maxScore > 50 ? randomInt(10) : 10];
    console.log(dataManager.gameMode);
    dataManager.pos = randomInt(1);

    const enemyRange = dataManager.fields[dataManager.gameMode][1 - dataManager.pos];
    const enemyField = `pvp${randomInt(enemyRange[0], enemyRange[1])}`;
    console.warn(enemyField);

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
    dataManager.spikes = [];
    dataManager.enemy = record.user;
    this.enemySpikes = record.spikes;
    this.enemyActions = record.actions;
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
        if (dataManager.gameMode === 'earthquake') {
          this.spikes.forEach(spike => spike.tween.setPaused(false));
        }
        this.removeChild(this.title, this.shadowText);
        clearInterval(interval);
      }
    }, 1000);

    this.hero = this.createHero(dataManager.pos, dataManager.user.name);
    this.enemy = this.createHero(1 - dataManager.pos, dataManager.enemy.name);
    this.enemy.alpha = 0.5;

    this.title = new createjs.Text('', '65px Guerilla', '#000');
    this.title.textAlign = 'center';
    this.title.textBaseline = 'middle';
    this.title.x = this.width / 2;
    this.title.y = 225;
    this.addChild(this.title);

    this.shadowText = new createjs.Text('', '30px Guerilla', '#000');
    this.shadowText.y = this.height / 2;
    this.shadowText.x = this.width / 2;
    this.shadowText.textAlign = 'center';
    this.shadowText.textBaseline = 'middle';
    this.addChild(this.shadowText);

    this.title.y += 55;
    this.shadowText.y += 40;
    counter.y += 50;

    switch (dataManager.gameMode) {
      case 'upsideDown':
        this.title.text = 'Вверх ногами!';
        this.shadowText.text = 'Мир перевернулся';
        this.hudDistance.y = this.height - this.hudDistance.y;
        this.hudDistance.color = '#fff';
        this.y = this.height;
        counter.y = 550;
        this.title.y += 85;
        this.shadowText.y -= 45;
        this.scaleY = counter.scaleY = this.shadowText.scaleY = this.title.scaleY = this.hudDistance.scaleY = -1;
        break;
      case 'backward':
        this.title.text = 'Ураган!';
        this.shadowText.text = 'Птицу сдувает назад';
        this.title.x = this.width - this.title.x;
        this.hudDistance.x = this.width - this.hudDistance.x;
        this.x = this.width;
        this.scaleX = counter.scaleX = this.hero.scaleX = this.enemy.scaleX = this.shadowText.scaleX = this.title.scaleX = this.hudDistance.scaleX = -1;
        break;
      case 'fast':
        this.title.text = 'Попутный ветер!';
        this.shadowText.text = 'Скорость полета повышена';
        this.speed += 2;
        this.spikeScale -= 0.25;
        break;
      case 'slow':
        this.title.text = 'Встречный ветер!';
        this.shadowText.text = 'Скорость полета снижена';
        this.speed -= 1;
        this.spikeScale += 0.075;
        break;
      case 'earthquake':
        this.title.text = 'Землетрясение!';
        this.shadowText.text = 'Колья раскачиваются';
        this.spikes.forEach((spike, i) => {
          spike.tween = createjs.Tween.get(spike, { loop: true, paused: true })
            .to({ skewX: 9 }, 900 + i * 100)
            .to({ skewX: -9 }, 1800 + i * 200)
            .to({ skewX: 0 }, 900 + i * 100);
        });
        break;
      case 'fog':
        this.title.text = 'Туман!';
        this.shadowText.text = 'Видимость снижена';
        this.speed -= 1.2;
        this.fog = new createjs.Shape();
        this.fog.graphics
          .beginRadialGradientFill(
            ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, .65)', 'rgba(255, 255, 255, .85)', 'rgba(255, 255, 255, .97)', '#fff'],
            [0, 0.5, 0.7, 0.9, 1], 0, 0, 0, 0, 0, 380)
          .drawRect(-this.width / 2, -this.height, this.width * 1.5, this.height * 2);
        this.fog.cache(-this.width / 2, -this.height, this.width * 1.5, this.height * 2);
        this.fog.x = this.hero.x;
        this.fog.y = this.hero.y;
        this.fog.addEventListener('tick', () => {
          if (!this.hero.dead) {
            this.fog.y = this.hero.y;
          }
        });
        this.addChild(this.fog, this.hudDistance, counter);
        break;
    }
    this.spikes.forEach(spike => this.resetSpike(spike));
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
    if (dataManager.gameMode === 'upsideDown') {
      heroName.scaleY = -1;
      heroName.y += 30;
    }
    if (dataManager.gameMode === 'backward') {
      heroName.scaleX = -1;
    }
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

    if (this.enemySpikes[this.spikeIndex]) {
      spike.scaleY = this.enemySpikes[this.spikeIndex];
      this.spikeIndex += 1;

      if (spike.scaleY > 0) {
        spike.y = this.height - GROUND_HEIGHT;
      } else {
        spike.y = 0;
      }
    } else {
      spike.scaleY = +(0.7 + Math.random() * 0.45).toFixed(2);
      if (Math.random() > 0.5) {
        spike.y = this.height - GROUND_HEIGHT;
      } else {
        spike.y = 0;
        spike.scaleY = -spike.scaleY;
      }
    }
    dataManager.spikes.push(spike.scaleY);
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
        this.speed += 0.04;
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
    if (this.enemyActions[this.step]) {
      this.enemy.flap();
    }
  }
  destroy() {
    window.removeEventListener('keydown', this.onKeyDown);
  }
}
