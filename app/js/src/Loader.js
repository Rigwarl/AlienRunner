export default class Loader extends createjs.LoadQueue {
  constructor() {
    super();
    createjs.Sound.alternateExtensions = ['mp3'];
    this.installPlugin(createjs.Sound);
    this.loadManifest([
      { id: 'char', src: 'img/monster-sprite.png' },
      { id: 'spike', src: 'img/spike.png' },
      { id: 'back', src: 'sound/background.ogg' },
      { id: 'flap', src: 'sound/flap.ogg' },
      { id: 'loose', src: 'sound/loose.ogg' },
    ]);
  }
}
