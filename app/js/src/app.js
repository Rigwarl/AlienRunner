import Loader from './Loader';
import Hero from './Hero';
import Spike from './Spike';
import ShadowOverlay from './ShadowOverlay';

const queue = new Loader();
queue.addEventListener('complete', startGame);

let canvas;
let stage;
let shadowOverlay;
let hero;
let spikes;
let hudDistance;

const bg = {
  sky: null,
  mountain: null,
  ground: null,
  skyImg: null,
  mountainImg: null,
  groundImg: null,
};

const speed = 300;
let distance = 0;

let paused = true;
let finished = true;

function startGame() {
  canvas = document.querySelector('#game-stage');
  stage = new createjs.Stage(canvas);

  canvas.classList.remove('loading');

  createBgLayer('sky');
  createBgLayer('mountain');
  createBgLayer('ground');

  hero = new Hero(queue);
  spikes = [new Spike(queue), new Spike(queue)];
  hudDistance = new createjs.Text('', '25px Arial', '#000');
  hudDistance.x = hudDistance.y = 15;
  shadowOverlay = new ShadowOverlay(canvas.width, canvas.height);

  stage.addChild(...spikes, hero, hudDistance);

  resetGame();
  pauseGame('Press space to flap, esc to pause');
  bindEvents();

  createjs.Sound.play('back', { loop: -1, volume: 0.35 });
  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.addEventListener('tick', tick);
}

function createBgLayer(name) {
  const img = queue.getResult(name);
  const num = Math.ceil(canvas.width / img.width);
  const width = (num * img.width) + Math.min(canvas.width, img.width);

  bg[name] = new createjs.Shape();
  bg[name].graphics.beginBitmapFill(img, 'repeat-x').drawRect(0, 0, width, img.height);
  bg[name].y = canvas.height;
  bg[name].regY = img.height;
  bg[name].cache(0, 0, width, img.height);

  bg[`${name}Img`] = img;
  stage.addChild(bg[name]);
}

function moveBgLayer(name, path) {
  bg[name].x -= path;
  bg[name].x %= bg[`${name}Img`].width;
}

function resetGame() {
  hero.reset();
  hero.x = canvas.width / 2;
  hero.y = 200;

  spikes.forEach((spike, i) => {
    resetSpike(spike);
    spike.x += (canvas.width + spike.bounds.width) * i * 0.5;
  });

  distance = 0;
  hudDistance.text = '0 m';
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

function moveHero(time) {
  hero.move(time);
  if (hero.y < 0) {
    hero.vY = 0;
    hero.y = 0;
  } else if (hero.y > canvas.height + (hero.bounds.height / 2)) {
    finished = true;
    pauseGame('Press space to restart');
  } else if (hero.y > 485) {
    hero.die();
  }
}

function pauseGame(text) {
  paused = true;
  shadowOverlay.setText(text);
  stage.addChild(shadowOverlay);
  stage.update();
}

function togglePause() {
  if (finished) {
    return;
  }
  if (paused) {
    paused = false;
    stage.removeChild(shadowOverlay);
  } else {
    pauseGame('Press esc to unpause');
  }
}

function moveWorld(time) {
  const path = speed * time;
  if (hero.dead) {
    hero.x += path * 0.5;
  } else {
    moveSpikes(path);
    moveBgLayer('sky', path * 0.1);
    moveBgLayer('mountain', path * 0.3);
    moveBgLayer('ground', path);
    distance += path;
    hudDistance.text = `${Math.floor(distance / 25)} m`;
  }
}

function moveSpikes(path) {
  for (const spike of spikes) {
    spike.x -= path;
    if (spike.x < -spike.bounds.width / 2) {
      resetSpike(spike);
    }
    if (ndgmr.checkPixelCollision(hero, spike)) {
      hero.die();
    }
  }
}

function restartGame() {
  paused = false;
  finished = false;
  resetGame();
  stage.removeChild(shadowOverlay);
}

function bindEvents() {
  window.addEventListener('keydown', e => {
    switch (e.keyCode) {
      case 32:
        handleAction();
        break;
      case 27:
        togglePause();
        break;
    }
  });
  window.addEventListener('touchstart', handleAction);
}

function handleAction() {
  if (finished) {
    restartGame();
  } else {
    hero.flap();
  }
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
