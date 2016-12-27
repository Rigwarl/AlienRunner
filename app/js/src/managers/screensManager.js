import StartScreen from '../screens/StartScreen';
import MainScreen from '../screens/MainScreen';
import PVPScreen from '../screens/PVPScreen';
import EndScreen from '../screens/EndScreen';
import RatingScreen from '../screens/RatingScreen';

const screenManager = {
  init(stage) {
    this.stage = stage;
    this.currentScreen = null;
    this.screens = {
      StartScreen,
      MainScreen,
      PVPScreen,
      EndScreen,
      RatingScreen,
    };

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener('tick', e => {
      if (this.currentScreen && this.currentScreen.tick) {
        this.currentScreen.tick(e);
      }
      this.stage.update(e);
    });
  },
  change(name) {
    if (this.currentScreen) {
      if (this.currentScreen.destroy) {
        this.currentScreen.destroy();
      }
      this.stage.removeChild(this.currentScreen);
    }
    this.currentScreen = new this.screens[name](this.stage.canvas.width, this.stage.canvas.height);
    this.stage.addChild(this.currentScreen);
  },
};

export default screenManager;
