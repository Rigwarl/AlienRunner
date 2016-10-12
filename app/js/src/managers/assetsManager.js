const manifest = [
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
];

const getHeroSpriteSheetData = name => ({
  images: [name],
  frames: { width: 100, height: 78 },
  animations: {
    fly: 0,
    flap: [1, 3, 'fly'],
    dead: 4,
  },
});

const spriteSheetsData = {
  bird: getHeroSpriteSheetData('bird'),
  monster: getHeroSpriteSheetData('monster'),
  chicken: getHeroSpriteSheetData('chicken'),
  btn: {

  },
};

const spriteSheets = {};

const assetsManager = {
  load(callback) {
    createjs.Sound.alternateExtensions = ['mp3'];
    this.queue = new createjs.LoadQueue();
    this.queue.installPlugin(createjs.Sound);
    this.queue.loadManifest(manifest);
    this.queue.addEventListener('complete', callback);
  },
  getResult(name) {
    return this.queue.getResult(name);
  },
  getSpriteSheet(name) {
    if (!spriteSheets[name]) {
      const data = spriteSheetsData[name];

      if (!data) {
        throw new Error('invalid spriteSheet name');
      }

      data.images = data.images.map(img => this.getResult(img));
      spriteSheets[name] = new createjs.SpriteSheet(data);
    }

    return spriteSheets[name];
  },
};

export default assetsManager;
