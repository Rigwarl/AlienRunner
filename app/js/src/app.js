import Loader from './Loader';

const queue = new Loader();
queue.addEventListener('complete', startGame);
import Background from './display/Background';
import Hero from './display/Hero';
import Spike from './display/Spike';
import ShadowOverlay from './display/ShadowOverlay';

let canvas;
let stage;
let shadowOverlay;
let bgSky;
let bgMountain;
let bgGround;
let hero;
let spikes;
let hudDistance;

const groundHeight = 82;
const speed = 300;
let distance = 0;

let paused = true;
let finished = true;

function startGame() {
  canvas = document.querySelector('#game-stage');
  stage = new createjs.Stage(canvas);

  canvas.classList.remove('loading');

  bgSky = new Background('sky', queue, canvas.width);
  bgMountain = new Background('mountain', queue, canvas.width);
  bgGround = new Background('ground', queue, canvas.width);
  bgSky.y = bgMountain.y = bgGround.y = canvas.height;

  hero = new Hero(queue);
  spikes = [new Spike(queue), new Spike(queue)];
  hudDistance = new createjs.Text('', '25px Arial', '#000');
  hudDistance.x = hudDistance.y = 15;
  shadowOverlay = new ShadowOverlay(canvas.width, canvas.height);

  stage.addChild(bgSky, bgMountain, bgGround, ...spikes, hero, hudDistance);

  resetGame();
  pauseGame('Press space to flap, esc to pause');
  bindEvents();

  createjs.Sound.play('back', { loop: -1, volume: 0.35 });
  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.addEventListener('tick', tick);
}

function resetGame() {
  hero.reset();
  hero.x = canvas.width / 2;
  hero.y = 200;

  spikes.forEach((spike, i) => {
    spike.x = ((canvas.width + spike.bounds.width) * i - spike.bounds.width) / 2;
    resetSpike(spike);
  });

  distance = 0;
  hudDistance.text = '0 m';
}

function resetSpike(spike) {
  spike.reset();
  spike.x += canvas.width + spike.bounds.width;
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
  } else if (hero.y > canvas.height + hero.bounds.height / 2) {
    finished = true;
    pauseGame('Press space to restart');
  } else if (hero.y > canvas.height - (groundHeight + hero.bounds.height / 2)) {
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
    bgSky.move(path * 0.1);
    bgMountain.move(path * 0.3);
    bgGround.move(path);
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
  window.addEventListener('touchstart', e => {
    e.preventDefault();
    handleAction();
  });
}

function handleAction() {
  if (finished) {
    restartGame();
  } else {
    hero.flap();
  }
}

function tick(e) {
  const sec = e.delta * 0.001;
  if (paused || sec * speed > canvas.width * 0.2) {
    return;
  }
  moveWorld(sec);
  moveHero(sec);
  stage.update();
}
