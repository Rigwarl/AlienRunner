const assetsManager = {
  load(callback) {
    createjs.Sound.alternateExtensions = ['mp3'];
    this.queue = new createjs.LoadQueue();
    this.queue.installPlugin(createjs.Sound);
    this.queue.loadManifest([
      { id: 'monster', src: 'img/monster-sprite.png' },
      { id: 'bird', src: 'img/bird-sprite.png' },
      { id: 'chicken', src: 'img/chicken-sprite.png' },
      { id: 'spike', src: 'img/spike.png' },
      { id: 'sky', src: 'img/bg/sky.png' },
      { id: 'start', src: 'img/bg/start.png' },
      { id: 'mountain', src: 'img/bg/mountain.png' },
      { id: 'ground', src: 'img/bg/ground.png' },
      { id: 'btn', src: 'img/btn-sprite.png' },
      { id: 'back', src: 'sound/background.ogg' },
      { id: 'flap', src: 'sound/flap.ogg' },
      { id: 'loose', src: 'sound/loose.ogg' },
    ]);
    this.queue.addEventListener('complete', callback);
  },
  getResult(name) {
    return this.queue.getResult(name);
  },
};

export default assetsManager;
