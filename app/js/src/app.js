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

const speed = 300;
let distance = 0;
let paused = true;

function startGame() {
  canvas = document.querySelector('#game-stage');
  stage = new createjs.Stage(canvas);

  canvas.classList.remove('loading');

  hero = new Hero(queue);
  spikes = [new Spike(queue), new Spike(queue)];
  hudDistance = new createjs.Text('', '25px Arial', '#000');
  hudDistance.x = hudDistance.y = 15;
  shadowOverlay = new ShadowOverlay('Press anykey to start, or another to leave', canvas);

  stage.addChild(...spikes, hero, hudDistance, shadowOverlay);

  resetGame();
  pauseGame();
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
    pauseGame();
  } else if (hero.y > 485) {
    hero.die();
  }
}

function pauseGame() {
  paused = true;
  stage.addChild(shadowOverlay);
  stage.update();
}

function moveWorld(time) {
  if (hero.dead) {
    hero.x += speed * time * 0.5;
  } else {
    moveSpikes(time);
    distance += speed * time;
    hudDistance.text = `${Math.floor(distance / 25)} m`;
  }
}

function moveSpikes(time) {
  for (const spike of spikes) {
    spike.x -= speed * time;
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
  resetGame();
  stage.removeChild(shadowOverlay);
}

function bindEvents() {
  window.addEventListener('keydown', () => {
    if (paused) {
      restartGame();
    } else {
      hero.flap();
    }
  });
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
