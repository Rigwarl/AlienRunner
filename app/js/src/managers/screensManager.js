import mainScreen from '../screens/mainScreen';

const screenManager = {
  init(stage) {
    this.stage = stage;
    this.currentScreen = null;
    this.screens = {
      mainScreen,
    };

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener('tick', e => {
      if (this.currentScreen && this.currentScreen.tick) {
        this.currentScreen.tick(e);
      }
      this.stage.update();
    });
  },
  change(name) {
    if (this.currentScreen) {
      if (this.currentScreen.destroy) {
        this.currentScreen.destroy();
      }
      this.stage.removeChild(this.currentScreen);
    }
    this.currentScreen = new this.screens[name]();
    this.stage.addChild(this.currentScreen);
  },
};

export default screenManager;
