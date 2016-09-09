(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _screensManager = require('./managers/screensManager');

var _screensManager2 = _interopRequireDefault(_screensManager);

var _assetsManager = require('./managers/assetsManager');

var _assetsManager2 = _interopRequireDefault(_assetsManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stage = new createjs.Stage('game-stage');

_screensManager2.default.init(stage);
_assetsManager2.default.load(function () {
  _screensManager2.default.change('StartScreen');
  createjs.Sound.play('back', { loop: -1, volume: 0.3 });
  if (createjs.Touch.isSupported()) {
    createjs.Touch.enable(stage, true);
  } else {
    stage.enableMouseOver(20);
  }
});

},{"./managers/assetsManager":7,"./managers/screensManager":9}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assetsManager = require('../managers/assetsManager');

var _assetsManager2 = _interopRequireDefault(_assetsManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Background = function (_createjs$Shape) {
  _inherits(Background, _createjs$Shape);

  function Background(name, canvasWidth) {
    _classCallCheck(this, Background);

    var _this = _possibleConstructorReturn(this, (Background.__proto__ || Object.getPrototypeOf(Background)).call(this));

    _this.img = _assetsManager2.default.getResult(name);
    var width = _this.img.width + canvasWidth;

    _this.graphics.beginBitmapFill(_this.img, 'repeat-x').drawRect(0, 0, width, _this.img.height);
    _this.regY = _this.img.height;
    _this.cache(0, 0, width, _this.img.height);
    return _this;
  }

  _createClass(Background, [{
    key: 'move',
    value: function move(path) {
      this.x -= path;
      this.x %= this.img.width;
    }
  }]);

  return Background;
}(createjs.Shape);

exports.default = Background;

},{"../managers/assetsManager":7}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assetsManager = require('../managers/assetsManager');

var _assetsManager2 = _interopRequireDefault(_assetsManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Btn = function (_createjs$Container) {
  _inherits(Btn, _createjs$Container);

  function Btn(text) {
    _classCallCheck(this, Btn);

    var _this = _possibleConstructorReturn(this, (Btn.__proto__ || Object.getPrototypeOf(Btn)).call(this));

    var ss = new createjs.SpriteSheet({
      images: [_assetsManager2.default.getResult('btn')],
      frames: { width: 210, height: 69 },
      animations: {
        disable: 0,
        down: 1,
        out: 2,
        over: 3
      }
    });
    _this.enabled = true;
    _this.bg = new createjs.Sprite(ss);
    _this.bg.regX = _this.bg.getBounds().width / 2;
    _this.bg.regY = _this.bg.getBounds().height / 2;

    _this.helper = new createjs.ButtonHelper(_this.bg);

    _this.label = new createjs.Text(text, '30px CarterOne', '#fff');
    _this.label.shadow = new createjs.Shadow('#000', 0, 1, 5);
    _this.label.textAlign = 'center';
    _this.label.textBaseline = 'middle';
    _this.label.y = -2;

    _this.addChild(_this.bg, _this.label);
    return _this;
  }

  _createClass(Btn, [{
    key: 'disable',
    value: function disable() {
      this.bg.gotoAndStop('disable');
      this.enabled = false;
      this.helper.enabled = false;
    }
  }, {
    key: 'enable',
    value: function enable() {
      this.bg.gotoAndStop('out');
      this.enabled = true;
      this.helper.enabled = true;
    }
  }]);

  return Btn;
}(createjs.Container);

exports.default = Btn;

},{"../managers/assetsManager":7}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assetsManager = require('../managers/assetsManager');

var _assetsManager2 = _interopRequireDefault(_assetsManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hero = function (_createjs$Sprite) {
  _inherits(Hero, _createjs$Sprite);

  function Hero(type) {
    _classCallCheck(this, Hero);

    var ss = new createjs.SpriteSheet({
      images: [_assetsManager2.default.getResult(type)],
      frames: { width: 100, height: 78 },
      animations: {
        fly: 0,
        flap: [1, 3, 'fly'],
        dead: 4
      }
    });

    var _this = _possibleConstructorReturn(this, (Hero.__proto__ || Object.getPrototypeOf(Hero)).call(this, ss));

    _this.type = type;
    _this.bounds = _this.getBounds();
    _this.regX = _this.bounds.width / 2;
    _this.regY = _this.bounds.height / 2;
    _this.a = 550;
    return _this;
  }

  _createClass(Hero, [{
    key: 'reset',
    value: function reset() {
      this.dead = false;
      this.rotation = 0;
      this.vY = 0;
      this.gotoAndStop('fly');
    }
  }, {
    key: 'flap',
    value: function flap() {
      if (this.dead) {
        return;
      }
      this.vY = Math.max(this.vY - 375, -375);
      this.gotoAndPlay('flap');
      createjs.Sound.play('flap');
    }
  }, {
    key: 'move',
    value: function move(time) {
      this.y += (this.a * time * 0.5 + this.vY) * time;
      this.vY += this.a * time;
    }
  }, {
    key: 'die',
    value: function die() {
      if (this.dead) {
        return;
      }
      this.dead = true;
      this.rotation = 30;
      this.gotoAndStop('dead');
      createjs.Sound.play('loose');
    }
  }]);

  return Hero;
}(createjs.Sprite);

exports.default = Hero;

},{"../managers/assetsManager":7}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShadowOverlay = function (_createjs$Container) {
  _inherits(ShadowOverlay, _createjs$Container);

  function ShadowOverlay(width, height) {
    _classCallCheck(this, ShadowOverlay);

    var _this = _possibleConstructorReturn(this, (ShadowOverlay.__proto__ || Object.getPrototypeOf(ShadowOverlay)).call(this));

    _this.shadow = new createjs.Shape();
    _this.shadow.graphics.beginFill('rgba(0, 0, 0, 0.6)').drawRect(0, 0, width, height);

    _this.shadowText = new createjs.Text('', '25px CarterOne', '#fff');
    _this.shadowText.y = height / 2;
    _this.shadowText.x = width / 2;
    _this.shadowText.textAlign = 'center';
    _this.shadowText.textBaseline = 'middle';

    _this.addChild(_this.shadow, _this.shadowText);
    _this.cache(0, 0, width, height);
    return _this;
  }

  _createClass(ShadowOverlay, [{
    key: 'setText',
    value: function setText(text) {
      this.shadowText.text = text;
      this.updateCache();
    }
  }]);

  return ShadowOverlay;
}(createjs.Container);

exports.default = ShadowOverlay;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assetsManager = require('../managers/assetsManager');

var _assetsManager2 = _interopRequireDefault(_assetsManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Spike = function (_createjs$Bitmap) {
  _inherits(Spike, _createjs$Bitmap);

  function Spike() {
    _classCallCheck(this, Spike);

    var _this = _possibleConstructorReturn(this, (Spike.__proto__ || Object.getPrototypeOf(Spike)).call(this, _assetsManager2.default.getResult('spike')));

    _this.bounds = _this.getBounds();
    _this.regX = _this.bounds.width / 2;
    _this.regY = _this.bounds.height;
    return _this;
  }

  _createClass(Spike, [{
    key: 'reset',
    value: function reset() {
      this.scaleY = 0.7 + Math.random() * 0.5;
    }
  }]);

  return Spike;
}(createjs.Bitmap);

exports.default = Spike;

},{"../managers/assetsManager":7}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var assetsManager = {
  load: function load(callback) {
    createjs.Sound.alternateExtensions = ['mp3'];
    this.queue = new createjs.LoadQueue();
    this.queue.installPlugin(createjs.Sound);
    this.queue.loadManifest([{ id: 'monster', src: 'img/monster-sprite.png' }, { id: 'bird', src: 'img/bird-sprite.png' }, { id: 'chicken', src: 'img/chicken-sprite.png' }, { id: 'spike', src: 'img/spike.png' }, { id: 'sky', src: 'img/bg/sky.png' }, { id: 'start', src: 'img/bg/start.png' }, { id: 'mountain', src: 'img/bg/mountain.png' }, { id: 'ground', src: 'img/bg/ground.png' }, { id: 'btn', src: 'img/btn-sprite.png' }, { id: 'back', src: 'sound/background.ogg' }, { id: 'flap', src: 'sound/flap.ogg' }, { id: 'loose', src: 'sound/loose.ogg' }]);
    this.queue.addEventListener('complete', callback);
  },
  getResult: function getResult(name) {
    return this.queue.getResult(name);
  }
};

exports.default = assetsManager;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var dataManager = {
  heroType: null,
  score: 0,
  maxScore: 0
};

exports.default = dataManager;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _StartScreen = require('../screens/StartScreen');

var _StartScreen2 = _interopRequireDefault(_StartScreen);

var _MainScreen = require('../screens/MainScreen');

var _MainScreen2 = _interopRequireDefault(_MainScreen);

var _EndScreen = require('../screens/EndScreen');

var _EndScreen2 = _interopRequireDefault(_EndScreen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var screenManager = {
  init: function init(stage) {
    var _this = this;

    this.stage = stage;
    this.currentScreen = null;
    this.screens = {
      StartScreen: _StartScreen2.default,
      MainScreen: _MainScreen2.default,
      EndScreen: _EndScreen2.default
    };

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener('tick', function (e) {
      if (_this.currentScreen && _this.currentScreen.tick) {
        _this.currentScreen.tick(e);
      }
      _this.stage.update();
    });
  },
  change: function change(name) {
    if (this.currentScreen) {
      if (this.currentScreen.destroy) {
        this.currentScreen.destroy();
      }
      this.stage.removeChild(this.currentScreen);
    }
    this.currentScreen = new this.screens[name](this.stage.canvas.width, this.stage.canvas.height);
    this.stage.addChild(this.currentScreen);
  }
};

exports.default = screenManager;

},{"../screens/EndScreen":10,"../screens/MainScreen":11,"../screens/StartScreen":12}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assetsManager = require('../managers/assetsManager');

var _assetsManager2 = _interopRequireDefault(_assetsManager);

var _screensManager = require('../managers/screensManager');

var _screensManager2 = _interopRequireDefault(_screensManager);

var _dataManager = require('../managers/dataManager');

var _dataManager2 = _interopRequireDefault(_dataManager);

var _Btn = require('../display/Btn');

var _Btn2 = _interopRequireDefault(_Btn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EndScreen = function (_createjs$Container) {
  _inherits(EndScreen, _createjs$Container);

  function EndScreen(width) {
    _classCallCheck(this, EndScreen);

    var _this = _possibleConstructorReturn(this, (EndScreen.__proto__ || Object.getPrototypeOf(EndScreen)).call(this));

    _this.bg = new createjs.Bitmap(_assetsManager2.default.getResult('start'));
    _this.score = new createjs.Text('Score: ' + _dataManager2.default.score, '40px CarterOne', '#000');
    _this.maxScore = new createjs.Text('Best score: ' + _dataManager2.default.maxScore, '40px CarterOne', '#000');
    _this.score.x = _this.maxScore.x = width / 2;
    _this.score.textAlign = _this.maxScore.textAlign = 'center';
    _this.score.y = 110;
    _this.maxScore.y = 180;

    _this.replayBtn = new _Btn2.default('Restart');
    _this.menuBtn = new _Btn2.default('Menu');
    _this.replayBtn.x = _this.menuBtn.x = width / 2;
    _this.menuBtn.y = 470;
    _this.replayBtn.y = 380;

    _this.replayBtn.addEventListener('click', function () {
      return _screensManager2.default.change('MainScreen');
    });
    _this.menuBtn.addEventListener('click', function () {
      return _screensManager2.default.change('StartScreen');
    });

    _this.addChild(_this.bg, _this.score, _this.maxScore, _this.replayBtn, _this.menuBtn);
    return _this;
  }

  return EndScreen;
}(createjs.Container);

exports.default = EndScreen;

},{"../display/Btn":3,"../managers/assetsManager":7,"../managers/dataManager":8,"../managers/screensManager":9}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _screensManager = require('../managers/screensManager');

var _screensManager2 = _interopRequireDefault(_screensManager);

var _dataManager = require('../managers/dataManager');

var _dataManager2 = _interopRequireDefault(_dataManager);

var _Background = require('../display/Background');

var _Background2 = _interopRequireDefault(_Background);

var _Hero = require('../display/Hero');

var _Hero2 = _interopRequireDefault(_Hero);

var _Spike = require('../display/Spike');

var _Spike2 = _interopRequireDefault(_Spike);

var _ShadowOverlay = require('../display/ShadowOverlay');

var _ShadowOverlay2 = _interopRequireDefault(_ShadowOverlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SPEED = 300;
var GROUND_HEIGHT = 82;

var MainScreen = function (_createjs$Container) {
  _inherits(MainScreen, _createjs$Container);

  function MainScreen(width, height) {
    _classCallCheck(this, MainScreen);

    var _this = _possibleConstructorReturn(this, (MainScreen.__proto__ || Object.getPrototypeOf(MainScreen)).call(this));

    _this.width = width;
    _this.height = height;

    _this.distance = 0;
    _this.paused = true;
    _this.finished = true;

    _this.bgSky = new _Background2.default('sky', _this.width);
    _this.bgMountain = new _Background2.default('mountain', _this.width);
    _this.bgGround = new _Background2.default('ground', _this.width);
    _this.bgSky.y = _this.bgMountain.y = _this.bgGround.y = _this.height;
    _this.addChild(_this.bgSky, _this.bgMountain, _this.bgGround);

    _this.hero = new _Hero2.default(_dataManager2.default.heroType);
    _this.spikes = [new _Spike2.default(), new _Spike2.default()];
    _this.hudDistance = new createjs.Text('', '25px CarterOne', '#000');
    _this.hudDistance.x = _this.hudDistance.y = 15;
    _this.shadowOverlay = new _ShadowOverlay2.default(_this.width, _this.height);
    _this.addChild.apply(_this, _toConsumableArray(_this.spikes).concat([_this.hero, _this.hudDistance]));

    _this.reset();
    _this.pause('Press space to flap, esc to pause');
    _this.bindEvents();
    return _this;
  }

  _createClass(MainScreen, [{
    key: 'reset',
    value: function reset() {
      var _this2 = this;

      this.hero.reset();
      this.hero.x = this.width / 2;
      this.hero.y = 200;

      this.spikes[0].x = -this.spikes[0].bounds.width / 2;
      this.spikes[1].x = this.width / 2;
      this.spikes.forEach(function (spike) {
        return _this2.resetSpike(spike);
      });

      this.distance = 0;
      this.hudDistance.text = '0 m';
    }
  }, {
    key: 'resetSpike',
    value: function resetSpike(spike) {
      spike.reset();
      spike.x += this.width + spike.bounds.width;
      if (Math.random() > 0.5) {
        spike.y = this.height - GROUND_HEIGHT;
        spike.rotation = 0;
      } else {
        spike.y = 0;
        spike.rotation = 180;
      }
    }
  }, {
    key: 'pause',
    value: function pause(text) {
      this.paused = true;
      this.shadowOverlay.setText(text);
      this.addChild(this.shadowOverlay);
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this3 = this;

      this.onKeyDown = function (e) {
        switch (e.keyCode) {
          case 32:
            _this3.handleAction();
            break;
          case 27:
            _this3.togglePause();
            break;
        }
      };
      this.onTouchStart = function (e) {
        e.preventDefault();
        _this3.handleAction();
      };

      window.addEventListener('keydown', this.onKeyDown);
      window.addEventListener('touchstart', this.onTouchStart);
    }
  }, {
    key: 'handleAction',
    value: function handleAction() {
      if (this.finished) {
        this.restart();
      } else if (!this.paused) {
        this.hero.flap();
      }
    }
  }, {
    key: 'togglePause',
    value: function togglePause() {
      if (this.finished) {
        return;
      }
      if (this.paused) {
        this.paused = false;
        this.removeChild(this.shadowOverlay);
      } else {
        this.pause('Press esc to unpause');
      }
    }
  }, {
    key: 'restart',
    value: function restart() {
      this.paused = false;
      this.finished = false;
      this.reset();
      this.removeChild(this.shadowOverlay);
    }
  }, {
    key: 'moveWorld',
    value: function moveWorld(time) {
      var path = SPEED * time;
      if (this.hero.dead) {
        this.hero.x += path * 0.5;
      } else {
        this.moveSpikes(path);
        this.bgSky.move(path * 0.1);
        this.bgMountain.move(path * 0.3);
        this.bgGround.move(path);

        this.distance += path;
        _dataManager2.default.score = Math.floor(this.distance / 25);
        this.hudDistance.text = _dataManager2.default.score + ' m';
      }
    }
  }, {
    key: 'moveSpikes',
    value: function moveSpikes(path) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.spikes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var spike = _step.value;

          spike.x -= path;
          if (spike.x < -spike.bounds.width / 2) {
            this.resetSpike(spike);
          }
          if (ndgmr.checkPixelCollision(this.hero, spike)) {
            this.hero.die();
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'moveHero',
    value: function moveHero(time) {
      this.hero.move(time);
      if (this.hero.y < 0) {
        this.hero.vY = 0;
        this.hero.y = 0;
      } else if (this.hero.y > this.height + this.hero.bounds.height / 2) {
        _dataManager2.default.maxScore = Math.max(_dataManager2.default.maxScore, _dataManager2.default.score);
        _screensManager2.default.change('EndScreen');
        this.finished = true;
        this.pause('Press space to restart');
      } else if (this.hero.y > this.height - (GROUND_HEIGHT + this.hero.bounds.height / 2)) {
        this.hero.die();
      }
    }
  }, {
    key: 'tick',
    value: function tick(e) {
      var sec = e.delta * 0.001;
      if (this.paused || sec > 0.3) {
        return;
      }
      this.moveWorld(sec);
      this.moveHero(sec);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      window.removeEventListener('keydown', this.onKeyDown);
      window.removeEventListener('touchstart', this.onTouchStart);
    }
  }]);

  return MainScreen;
}(createjs.Container);

exports.default = MainScreen;

},{"../display/Background":2,"../display/Hero":4,"../display/ShadowOverlay":5,"../display/Spike":6,"../managers/dataManager":8,"../managers/screensManager":9}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assetsManager = require('../managers/assetsManager');

var _assetsManager2 = _interopRequireDefault(_assetsManager);

var _screensManager = require('../managers/screensManager');

var _screensManager2 = _interopRequireDefault(_screensManager);

var _dataManager = require('../managers/dataManager');

var _dataManager2 = _interopRequireDefault(_dataManager);

var _Hero = require('../display/Hero');

var _Hero2 = _interopRequireDefault(_Hero);

var _Btn = require('../display/Btn');

var _Btn2 = _interopRequireDefault(_Btn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StartScreen = function (_createjs$Container) {
  _inherits(StartScreen, _createjs$Container);

  function StartScreen(width, height) {
    _classCallCheck(this, StartScreen);

    var _this = _possibleConstructorReturn(this, (StartScreen.__proto__ || Object.getPrototypeOf(StartScreen)).call(this));

    _this.width = width;
    _this.height = height;

    _this.bg = new createjs.Bitmap(_assetsManager2.default.getResult('start'));
    _this.title = new createjs.Text('Choose your avatar', '45px CarterOne', '#000');
    _this.title.textAlign = 'center';
    _this.title.x = _this.width / 2;
    _this.title.y = 100;

    _this.startBtn = new _Btn2.default('Start');
    _this.startBtn.x = width / 2;
    _this.startBtn.y = 175 + _this.height / 2;

    _this.startBtn.disable();
    _this.createHeroes();
    _this.addChild.apply(_this, [_this.bg, _this.title].concat(_toConsumableArray(_this.heroes), [_this.startBtn]));

    _this.startBtn.addEventListener('click', function () {
      if (_this.startBtn.enabled) {
        _screensManager2.default.change('MainScreen');
      }
    });
    return _this;
  }

  _createClass(StartScreen, [{
    key: 'createHeroes',
    value: function createHeroes() {
      var _this2 = this;

      this.heroes = [new _Hero2.default('bird'), new _Hero2.default('monster'), new _Hero2.default('chicken')];
      this.heroes.forEach(function (hero, i) {
        hero.y = _this2.height / 2;
        hero.x = (i + 1) * _this2.width / (_this2.heroes.length + 1);
        hero.cursor = 'pointer';
        hero.addEventListener('click', function () {
          return _this2.selectHero(hero);
        });
        hero.cache(0, 0, hero.bounds.width, hero.bounds.height);
      });
      this.resetHeroes();
    }
  }, {
    key: 'resetHeroes',
    value: function resetHeroes() {
      this.heroes.forEach(function (hero) {
        hero.filters = [new createjs.ColorFilter(0.6, 0.6, 0.6)];
        hero.updateCache();
        hero.scaleX = 0.85;
        hero.scaleY = 0.85;
      });
    }
  }, {
    key: 'selectHero',
    value: function selectHero(hero) {
      this.resetHeroes();

      hero.filters = [];
      hero.updateCache();
      hero.scaleX = 1;
      hero.scaleY = 1;
      hero.flap();

      if (!this.startBtn.enabled) {
        this.startBtn.enable();
      }

      _dataManager2.default.heroType = hero.type;
    }
  }]);

  return StartScreen;
}(createjs.Container);

exports.default = StartScreen;

},{"../display/Btn":3,"../display/Hero":4,"../managers/assetsManager":7,"../managers/dataManager":8,"../managers/screensManager":9}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvc3JjL2FwcC5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9CYWNrZ3JvdW5kLmpzIiwiYXBwL2pzL3NyYy9kaXNwbGF5L0J0bi5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9IZXJvLmpzIiwiYXBwL2pzL3NyYy9kaXNwbGF5L1NoYWRvd092ZXJsYXkuanMiLCJhcHAvanMvc3JjL2Rpc3BsYXkvU3Bpa2UuanMiLCJhcHAvanMvc3JjL21hbmFnZXJzL2Fzc2V0c01hbmFnZXIuanMiLCJhcHAvanMvc3JjL21hbmFnZXJzL2RhdGFNYW5hZ2VyLmpzIiwiYXBwL2pzL3NyYy9tYW5hZ2Vycy9zY3JlZW5zTWFuYWdlci5qcyIsImFwcC9qcy9zcmMvc2NyZWVucy9FbmRTY3JlZW4uanMiLCJhcHAvanMvc3JjL3NjcmVlbnMvTWFpblNjcmVlbi5qcyIsImFwcC9qcy9zcmMvc2NyZWVucy9TdGFydFNjcmVlbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTSxRQUFRLElBQUksU0FBUyxLQUFiLENBQW1CLFlBQW5CLENBQWQ7O0FBRUEseUJBQWUsSUFBZixDQUFvQixLQUFwQjtBQUNBLHdCQUFjLElBQWQsQ0FBbUIsWUFBTTtBQUN2QiwyQkFBZSxNQUFmLENBQXNCLGFBQXRCO0FBQ0EsV0FBUyxLQUFULENBQWUsSUFBZixDQUFvQixNQUFwQixFQUE0QixFQUFFLE1BQU0sQ0FBQyxDQUFULEVBQVksUUFBUSxHQUFwQixFQUE1QjtBQUNBLE1BQUksU0FBUyxLQUFULENBQWUsV0FBZixFQUFKLEVBQWtDO0FBQ2hDLGFBQVMsS0FBVCxDQUFlLE1BQWYsQ0FBc0IsS0FBdEIsRUFBNkIsSUFBN0I7QUFDRCxHQUZELE1BRU87QUFDTCxVQUFNLGVBQU4sQ0FBc0IsRUFBdEI7QUFDRDtBQUNGLENBUkQ7Ozs7Ozs7Ozs7O0FDTkE7Ozs7Ozs7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QUF5QixHQUF6QixFQUE4QixHQUE5QixFQUFtQyxHQUFuQyxDQUFELENBQWY7QUFDQSxhQUFLLFdBQUw7QUFDQSxhQUFLLE1BQUwsR0FBYyxJQUFkO0FBQ0EsYUFBSyxNQUFMLEdBQWMsSUFBZDtBQUNELE9BTEQ7QUFNRDs7OytCQUNVLEksRUFBTTtBQUNmLFdBQUssV0FBTDs7QUFFQSxXQUFLLE9BQUwsR0FBZSxFQUFmO0FBQ0EsV0FBSyxXQUFMO0FBQ0EsV0FBSyxNQUFMLEdBQWMsQ0FBZDtBQUNBLFdBQUssTUFBTCxHQUFjLENBQWQ7QUFDQSxXQUFLLElBQUw7O0FBRUEsVUFBSSxDQUFDLEtBQUssUUFBTCxDQUFjLE9BQW5CLEVBQTRCO0FBQzFCLGFBQUssUUFBTCxDQUFjLE1BQWQ7QUFDRDs7QUFFRCw0QkFBWSxRQUFaLEdBQXVCLEtBQUssSUFBNUI7QUFDRDs7OztFQWhFc0MsU0FBUyxTOztrQkFBN0IsVyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgc2NyZWVuc01hbmFnZXIgZnJvbSAnLi9tYW5hZ2Vycy9zY3JlZW5zTWFuYWdlcic7XG5pbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuXG5jb25zdCBzdGFnZSA9IG5ldyBjcmVhdGVqcy5TdGFnZSgnZ2FtZS1zdGFnZScpO1xuXG5zY3JlZW5zTWFuYWdlci5pbml0KHN0YWdlKTtcbmFzc2V0c01hbmFnZXIubG9hZCgoKSA9PiB7XG4gIHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnU3RhcnRTY3JlZW4nKTtcbiAgY3JlYXRlanMuU291bmQucGxheSgnYmFjaycsIHsgbG9vcDogLTEsIHZvbHVtZTogMC4zIH0pO1xuICBpZiAoY3JlYXRlanMuVG91Y2guaXNTdXBwb3J0ZWQoKSkge1xuICAgIGNyZWF0ZWpzLlRvdWNoLmVuYWJsZShzdGFnZSwgdHJ1ZSk7XG4gIH0gZWxzZSB7XG4gICAgc3RhZ2UuZW5hYmxlTW91c2VPdmVyKDIwKTtcbiAgfVxufSk7XG4iLCJpbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFja2dyb3VuZCBleHRlbmRzIGNyZWF0ZWpzLlNoYXBlIHtcbiAgY29uc3RydWN0b3IobmFtZSwgY2FudmFzV2lkdGgpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5pbWcgPSBhc3NldHNNYW5hZ2VyLmdldFJlc3VsdChuYW1lKTtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuaW1nLndpZHRoICsgY2FudmFzV2lkdGg7XG5cbiAgICB0aGlzLmdyYXBoaWNzLmJlZ2luQml0bWFwRmlsbCh0aGlzLmltZywgJ3JlcGVhdC14JykuZHJhd1JlY3QoMCwgMCwgd2lkdGgsIHRoaXMuaW1nLmhlaWdodCk7XG4gICAgdGhpcy5yZWdZID0gdGhpcy5pbWcuaGVpZ2h0O1xuICAgIHRoaXMuY2FjaGUoMCwgMCwgd2lkdGgsIHRoaXMuaW1nLmhlaWdodCk7XG4gIH1cbiAgbW92ZShwYXRoKSB7XG4gICAgdGhpcy54IC09IHBhdGg7XG4gICAgdGhpcy54ICU9IHRoaXMuaW1nLndpZHRoO1xuICB9XG59XG4iLCJpbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnRuIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3IodGV4dCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICBjb25zdCBzcyA9IG5ldyBjcmVhdGVqcy5TcHJpdGVTaGVldCh7XG4gICAgICBpbWFnZXM6IFthc3NldHNNYW5hZ2VyLmdldFJlc3VsdCgnYnRuJyldLFxuICAgICAgZnJhbWVzOiB7IHdpZHRoOiAyMTAsIGhlaWdodDogNjkgfSxcbiAgICAgIGFuaW1hdGlvbnM6IHtcbiAgICAgICAgZGlzYWJsZTogMCxcbiAgICAgICAgZG93bjogMSxcbiAgICAgICAgb3V0OiAyLFxuICAgICAgICBvdmVyOiAzLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuICAgIHRoaXMuYmcgPSBuZXcgY3JlYXRlanMuU3ByaXRlKHNzKTtcbiAgICB0aGlzLmJnLnJlZ1ggPSB0aGlzLmJnLmdldEJvdW5kcygpLndpZHRoIC8gMjtcbiAgICB0aGlzLmJnLnJlZ1kgPSB0aGlzLmJnLmdldEJvdW5kcygpLmhlaWdodCAvIDI7XG5cbiAgICB0aGlzLmhlbHBlciA9IG5ldyBjcmVhdGVqcy5CdXR0b25IZWxwZXIodGhpcy5iZyk7XG5cbiAgICB0aGlzLmxhYmVsID0gbmV3IGNyZWF0ZWpzLlRleHQodGV4dCwgJzMwcHggQ2FydGVyT25lJywgJyNmZmYnKTtcbiAgICB0aGlzLmxhYmVsLnNoYWRvdyA9IG5ldyBjcmVhdGVqcy5TaGFkb3coJyMwMDAnLCAwLCAxLCA1KTtcbiAgICB0aGlzLmxhYmVsLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRoaXMubGFiZWwudGV4dEJhc2VsaW5lID0gJ21pZGRsZSc7XG4gICAgdGhpcy5sYWJlbC55ID0gLTI7XG5cbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuYmcsIHRoaXMubGFiZWwpO1xuICB9XG4gIGRpc2FibGUoKSB7XG4gICAgdGhpcy5iZy5nb3RvQW5kU3RvcCgnZGlzYWJsZScpO1xuICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMuaGVscGVyLmVuYWJsZWQgPSBmYWxzZTtcbiAgfVxuICBlbmFibGUoKSB7XG4gICAgdGhpcy5iZy5nb3RvQW5kU3RvcCgnb3V0Jyk7XG4gICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcbiAgICB0aGlzLmhlbHBlci5lbmFibGVkID0gdHJ1ZTtcbiAgfVxufVxuIiwiaW1wb3J0IGFzc2V0c01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvYXNzZXRzTWFuYWdlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlcm8gZXh0ZW5kcyBjcmVhdGVqcy5TcHJpdGUge1xuICBjb25zdHJ1Y3Rvcih0eXBlKSB7XG4gICAgY29uc3Qgc3MgPSBuZXcgY3JlYXRlanMuU3ByaXRlU2hlZXQoe1xuICAgICAgaW1hZ2VzOiBbYXNzZXRzTWFuYWdlci5nZXRSZXN1bHQodHlwZSldLFxuICAgICAgZnJhbWVzOiB7IHdpZHRoOiAxMDAsIGhlaWdodDogNzggfSxcbiAgICAgIGFuaW1hdGlvbnM6IHtcbiAgICAgICAgZmx5OiAwLFxuICAgICAgICBmbGFwOiBbMSwgMywgJ2ZseSddLFxuICAgICAgICBkZWFkOiA0LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBzdXBlcihzcyk7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCk7XG4gICAgdGhpcy5yZWdYID0gdGhpcy5ib3VuZHMud2lkdGggLyAyO1xuICAgIHRoaXMucmVnWSA9IHRoaXMuYm91bmRzLmhlaWdodCAvIDI7XG4gICAgdGhpcy5hID0gNTUwO1xuICB9XG4gIHJlc2V0KCkge1xuICAgIHRoaXMuZGVhZCA9IGZhbHNlO1xuICAgIHRoaXMucm90YXRpb24gPSAwO1xuICAgIHRoaXMudlkgPSAwO1xuICAgIHRoaXMuZ290b0FuZFN0b3AoJ2ZseScpO1xuICB9XG4gIGZsYXAoKSB7XG4gICAgaWYgKHRoaXMuZGVhZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnZZID0gTWF0aC5tYXgodGhpcy52WSAtIDM3NSwgLTM3NSk7XG4gICAgdGhpcy5nb3RvQW5kUGxheSgnZmxhcCcpO1xuICAgIGNyZWF0ZWpzLlNvdW5kLnBsYXkoJ2ZsYXAnKTtcbiAgfVxuICBtb3ZlKHRpbWUpIHtcbiAgICB0aGlzLnkgKz0gKCh0aGlzLmEgKiB0aW1lICogMC41KSArIHRoaXMudlkpICogdGltZTtcbiAgICB0aGlzLnZZICs9IHRoaXMuYSAqIHRpbWU7XG4gIH1cbiAgZGllKCkge1xuICAgIGlmICh0aGlzLmRlYWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5kZWFkID0gdHJ1ZTtcbiAgICB0aGlzLnJvdGF0aW9uID0gMzA7XG4gICAgdGhpcy5nb3RvQW5kU3RvcCgnZGVhZCcpO1xuICAgIGNyZWF0ZWpzLlNvdW5kLnBsYXkoJ2xvb3NlJyk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoYWRvd092ZXJsYXkgZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc2hhZG93ID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG4gICAgdGhpcy5zaGFkb3cuZ3JhcGhpY3MuYmVnaW5GaWxsKCdyZ2JhKDAsIDAsIDAsIDAuNiknKS5kcmF3UmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgIHRoaXMuc2hhZG93VGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KCcnLCAnMjVweCBDYXJ0ZXJPbmUnLCAnI2ZmZicpO1xuICAgIHRoaXMuc2hhZG93VGV4dC55ID0gaGVpZ2h0IC8gMjtcbiAgICB0aGlzLnNoYWRvd1RleHQueCA9IHdpZHRoIC8gMjtcbiAgICB0aGlzLnNoYWRvd1RleHQudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgdGhpcy5zaGFkb3dUZXh0LnRleHRCYXNlbGluZSA9ICdtaWRkbGUnO1xuXG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLnNoYWRvdywgdGhpcy5zaGFkb3dUZXh0KTtcbiAgICB0aGlzLmNhY2hlKDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICB9XG4gIHNldFRleHQodGV4dCkge1xuICAgIHRoaXMuc2hhZG93VGV4dC50ZXh0ID0gdGV4dDtcbiAgICB0aGlzLnVwZGF0ZUNhY2hlKCk7XG4gIH1cbn1cbiIsImltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGlrZSBleHRlbmRzIGNyZWF0ZWpzLkJpdG1hcCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKGFzc2V0c01hbmFnZXIuZ2V0UmVzdWx0KCdzcGlrZScpKTtcblxuICAgIHRoaXMuYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKTtcbiAgICB0aGlzLnJlZ1ggPSB0aGlzLmJvdW5kcy53aWR0aCAvIDI7XG4gICAgdGhpcy5yZWdZID0gdGhpcy5ib3VuZHMuaGVpZ2h0O1xuICB9XG4gIHJlc2V0KCkge1xuICAgIHRoaXMuc2NhbGVZID0gMC43ICsgKE1hdGgucmFuZG9tKCkgKiAwLjUpO1xuICB9XG59XG4iLCJjb25zdCBhc3NldHNNYW5hZ2VyID0ge1xuICBsb2FkKGNhbGxiYWNrKSB7XG4gICAgY3JlYXRlanMuU291bmQuYWx0ZXJuYXRlRXh0ZW5zaW9ucyA9IFsnbXAzJ107XG4gICAgdGhpcy5xdWV1ZSA9IG5ldyBjcmVhdGVqcy5Mb2FkUXVldWUoKTtcbiAgICB0aGlzLnF1ZXVlLmluc3RhbGxQbHVnaW4oY3JlYXRlanMuU291bmQpO1xuICAgIHRoaXMucXVldWUubG9hZE1hbmlmZXN0KFtcbiAgICAgIHsgaWQ6ICdtb25zdGVyJywgc3JjOiAnaW1nL21vbnN0ZXItc3ByaXRlLnBuZycgfSxcbiAgICAgIHsgaWQ6ICdiaXJkJywgc3JjOiAnaW1nL2JpcmQtc3ByaXRlLnBuZycgfSxcbiAgICAgIHsgaWQ6ICdjaGlja2VuJywgc3JjOiAnaW1nL2NoaWNrZW4tc3ByaXRlLnBuZycgfSxcbiAgICAgIHsgaWQ6ICdzcGlrZScsIHNyYzogJ2ltZy9zcGlrZS5wbmcnIH0sXG4gICAgICB7IGlkOiAnc2t5Jywgc3JjOiAnaW1nL2JnL3NreS5wbmcnIH0sXG4gICAgICB7IGlkOiAnc3RhcnQnLCBzcmM6ICdpbWcvYmcvc3RhcnQucG5nJyB9LFxuICAgICAgeyBpZDogJ21vdW50YWluJywgc3JjOiAnaW1nL2JnL21vdW50YWluLnBuZycgfSxcbiAgICAgIHsgaWQ6ICdncm91bmQnLCBzcmM6ICdpbWcvYmcvZ3JvdW5kLnBuZycgfSxcbiAgICAgIHsgaWQ6ICdidG4nLCBzcmM6ICdpbWcvYnRuLXNwcml0ZS5wbmcnIH0sXG4gICAgICB7IGlkOiAnYmFjaycsIHNyYzogJ3NvdW5kL2JhY2tncm91bmQub2dnJyB9LFxuICAgICAgeyBpZDogJ2ZsYXAnLCBzcmM6ICdzb3VuZC9mbGFwLm9nZycgfSxcbiAgICAgIHsgaWQ6ICdsb29zZScsIHNyYzogJ3NvdW5kL2xvb3NlLm9nZycgfSxcbiAgICBdKTtcbiAgICB0aGlzLnF1ZXVlLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbXBsZXRlJywgY2FsbGJhY2spO1xuICB9LFxuICBnZXRSZXN1bHQobmFtZSkge1xuICAgIHJldHVybiB0aGlzLnF1ZXVlLmdldFJlc3VsdChuYW1lKTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFzc2V0c01hbmFnZXI7XG4iLCJjb25zdCBkYXRhTWFuYWdlciA9IHtcbiAgaGVyb1R5cGU6IG51bGwsXG4gIHNjb3JlOiAwLFxuICBtYXhTY29yZTogMCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRhdGFNYW5hZ2VyO1xuIiwiaW1wb3J0IFN0YXJ0U2NyZWVuIGZyb20gJy4uL3NjcmVlbnMvU3RhcnRTY3JlZW4nO1xuaW1wb3J0IE1haW5TY3JlZW4gZnJvbSAnLi4vc2NyZWVucy9NYWluU2NyZWVuJztcbmltcG9ydCBFbmRTY3JlZW4gZnJvbSAnLi4vc2NyZWVucy9FbmRTY3JlZW4nO1xuXG5jb25zdCBzY3JlZW5NYW5hZ2VyID0ge1xuICBpbml0KHN0YWdlKSB7XG4gICAgdGhpcy5zdGFnZSA9IHN0YWdlO1xuICAgIHRoaXMuY3VycmVudFNjcmVlbiA9IG51bGw7XG4gICAgdGhpcy5zY3JlZW5zID0ge1xuICAgICAgU3RhcnRTY3JlZW4sXG4gICAgICBNYWluU2NyZWVuLFxuICAgICAgRW5kU2NyZWVuLFxuICAgIH07XG5cbiAgICBjcmVhdGVqcy5UaWNrZXIudGltaW5nTW9kZSA9IGNyZWF0ZWpzLlRpY2tlci5SQUY7XG4gICAgY3JlYXRlanMuVGlja2VyLmFkZEV2ZW50TGlzdGVuZXIoJ3RpY2snLCBlID0+IHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRTY3JlZW4gJiYgdGhpcy5jdXJyZW50U2NyZWVuLnRpY2spIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U2NyZWVuLnRpY2soZSk7XG4gICAgICB9XG4gICAgICB0aGlzLnN0YWdlLnVwZGF0ZSgpO1xuICAgIH0pO1xuICB9LFxuICBjaGFuZ2UobmFtZSkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRTY3JlZW4pIHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRTY3JlZW4uZGVzdHJveSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRTY3JlZW4uZGVzdHJveSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5zdGFnZS5yZW1vdmVDaGlsZCh0aGlzLmN1cnJlbnRTY3JlZW4pO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRTY3JlZW4gPSBuZXcgdGhpcy5zY3JlZW5zW25hbWVdKHRoaXMuc3RhZ2UuY2FudmFzLndpZHRoLCB0aGlzLnN0YWdlLmNhbnZhcy5oZWlnaHQpO1xuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5jdXJyZW50U2NyZWVuKTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNjcmVlbk1hbmFnZXI7XG4iLCJpbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcbmltcG9ydCBzY3JlZW5zTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zY3JlZW5zTWFuYWdlcic7XG5pbXBvcnQgZGF0YU1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvZGF0YU1hbmFnZXInO1xuaW1wb3J0IEJ0biBmcm9tICcuLi9kaXNwbGF5L0J0bic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVuZFNjcmVlbiBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuYmcgPSBuZXcgY3JlYXRlanMuQml0bWFwKGFzc2V0c01hbmFnZXIuZ2V0UmVzdWx0KCdzdGFydCcpKTtcbiAgICB0aGlzLnNjb3JlID0gbmV3IGNyZWF0ZWpzLlRleHQoYFNjb3JlOiAke2RhdGFNYW5hZ2VyLnNjb3JlfWAsICc0MHB4IENhcnRlck9uZScsICcjMDAwJyk7XG4gICAgdGhpcy5tYXhTY29yZSA9IG5ldyBjcmVhdGVqcy5UZXh0KGBCZXN0IHNjb3JlOiAke2RhdGFNYW5hZ2VyLm1heFNjb3JlfWAsICc0MHB4IENhcnRlck9uZScsICcjMDAwJyk7XG4gICAgdGhpcy5zY29yZS54ID0gdGhpcy5tYXhTY29yZS54ID0gd2lkdGggLyAyO1xuICAgIHRoaXMuc2NvcmUudGV4dEFsaWduID0gdGhpcy5tYXhTY29yZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICB0aGlzLnNjb3JlLnkgPSAxMTA7XG4gICAgdGhpcy5tYXhTY29yZS55ID0gMTgwO1xuXG4gICAgdGhpcy5yZXBsYXlCdG4gPSBuZXcgQnRuKCdSZXN0YXJ0Jyk7XG4gICAgdGhpcy5tZW51QnRuID0gbmV3IEJ0bignTWVudScpO1xuICAgIHRoaXMucmVwbGF5QnRuLnggPSB0aGlzLm1lbnVCdG4ueCA9IHdpZHRoIC8gMjtcbiAgICB0aGlzLm1lbnVCdG4ueSA9IDQ3MDtcbiAgICB0aGlzLnJlcGxheUJ0bi55ID0gMzgwO1xuXG4gICAgdGhpcy5yZXBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzY3JlZW5zTWFuYWdlci5jaGFuZ2UoJ01haW5TY3JlZW4nKSk7XG4gICAgdGhpcy5tZW51QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gc2NyZWVuc01hbmFnZXIuY2hhbmdlKCdTdGFydFNjcmVlbicpKTtcblxuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5iZywgdGhpcy5zY29yZSwgdGhpcy5tYXhTY29yZSwgdGhpcy5yZXBsYXlCdG4sIHRoaXMubWVudUJ0bik7XG4gIH1cbn1cbiIsImltcG9ydCBzY3JlZW5zTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zY3JlZW5zTWFuYWdlcic7XG5pbXBvcnQgZGF0YU1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvZGF0YU1hbmFnZXInO1xuaW1wb3J0IEJhY2tncm91bmQgZnJvbSAnLi4vZGlzcGxheS9CYWNrZ3JvdW5kJztcbmltcG9ydCBIZXJvIGZyb20gJy4uL2Rpc3BsYXkvSGVybyc7XG5pbXBvcnQgU3Bpa2UgZnJvbSAnLi4vZGlzcGxheS9TcGlrZSc7XG5pbXBvcnQgU2hhZG93T3ZlcmxheSBmcm9tICcuLi9kaXNwbGF5L1NoYWRvd092ZXJsYXknO1xuXG5jb25zdCBTUEVFRCA9IDMwMDtcbmNvbnN0IEdST1VORF9IRUlHSFQgPSA4MjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpblNjcmVlbiBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgdGhpcy5kaXN0YW5jZSA9IDA7XG4gICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuICAgIHRoaXMuZmluaXNoZWQgPSB0cnVlO1xuXG4gICAgdGhpcy5iZ1NreSA9IG5ldyBCYWNrZ3JvdW5kKCdza3knLCB0aGlzLndpZHRoKTtcbiAgICB0aGlzLmJnTW91bnRhaW4gPSBuZXcgQmFja2dyb3VuZCgnbW91bnRhaW4nLCB0aGlzLndpZHRoKTtcbiAgICB0aGlzLmJnR3JvdW5kID0gbmV3IEJhY2tncm91bmQoJ2dyb3VuZCcsIHRoaXMud2lkdGgpO1xuICAgIHRoaXMuYmdTa3kueSA9IHRoaXMuYmdNb3VudGFpbi55ID0gdGhpcy5iZ0dyb3VuZC55ID0gdGhpcy5oZWlnaHQ7XG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmJnU2t5LCB0aGlzLmJnTW91bnRhaW4sIHRoaXMuYmdHcm91bmQpO1xuXG4gICAgdGhpcy5oZXJvID0gbmV3IEhlcm8oZGF0YU1hbmFnZXIuaGVyb1R5cGUpO1xuICAgIHRoaXMuc3Bpa2VzID0gW25ldyBTcGlrZSgpLCBuZXcgU3Bpa2UoKV07XG4gICAgdGhpcy5odWREaXN0YW5jZSA9IG5ldyBjcmVhdGVqcy5UZXh0KCcnLCAnMjVweCBDYXJ0ZXJPbmUnLCAnIzAwMCcpO1xuICAgIHRoaXMuaHVkRGlzdGFuY2UueCA9IHRoaXMuaHVkRGlzdGFuY2UueSA9IDE1O1xuICAgIHRoaXMuc2hhZG93T3ZlcmxheSA9IG5ldyBTaGFkb3dPdmVybGF5KHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB0aGlzLmFkZENoaWxkKC4uLnRoaXMuc3Bpa2VzLCB0aGlzLmhlcm8sIHRoaXMuaHVkRGlzdGFuY2UpO1xuXG4gICAgdGhpcy5yZXNldCgpO1xuICAgIHRoaXMucGF1c2UoJ1ByZXNzIHNwYWNlIHRvIGZsYXAsIGVzYyB0byBwYXVzZScpO1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICB9XG4gIHJlc2V0KCkge1xuICAgIHRoaXMuaGVyby5yZXNldCgpO1xuICAgIHRoaXMuaGVyby54ID0gdGhpcy53aWR0aCAvIDI7XG4gICAgdGhpcy5oZXJvLnkgPSAyMDA7XG5cbiAgICB0aGlzLnNwaWtlc1swXS54ID0gLXRoaXMuc3Bpa2VzWzBdLmJvdW5kcy53aWR0aCAvIDI7XG4gICAgdGhpcy5zcGlrZXNbMV0ueCA9IHRoaXMud2lkdGggLyAyO1xuICAgIHRoaXMuc3Bpa2VzLmZvckVhY2goc3Bpa2UgPT4gdGhpcy5yZXNldFNwaWtlKHNwaWtlKSk7XG5cbiAgICB0aGlzLmRpc3RhbmNlID0gMDtcbiAgICB0aGlzLmh1ZERpc3RhbmNlLnRleHQgPSAnMCBtJztcbiAgfVxuICByZXNldFNwaWtlKHNwaWtlKSB7XG4gICAgc3Bpa2UucmVzZXQoKTtcbiAgICBzcGlrZS54ICs9IHRoaXMud2lkdGggKyBzcGlrZS5ib3VuZHMud2lkdGg7XG4gICAgaWYgKE1hdGgucmFuZG9tKCkgPiAwLjUpIHtcbiAgICAgIHNwaWtlLnkgPSB0aGlzLmhlaWdodCAtIEdST1VORF9IRUlHSFQ7XG4gICAgICBzcGlrZS5yb3RhdGlvbiA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNwaWtlLnkgPSAwO1xuICAgICAgc3Bpa2Uucm90YXRpb24gPSAxODA7XG4gICAgfVxuICB9XG4gIHBhdXNlKHRleHQpIHtcbiAgICB0aGlzLnBhdXNlZCA9IHRydWU7XG4gICAgdGhpcy5zaGFkb3dPdmVybGF5LnNldFRleHQodGV4dCk7XG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLnNoYWRvd092ZXJsYXkpO1xuICB9XG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy5vbktleURvd24gPSBlID0+IHtcbiAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgMzI6XG4gICAgICAgICAgdGhpcy5oYW5kbGVBY3Rpb24oKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyNzpcbiAgICAgICAgICB0aGlzLnRvZ2dsZVBhdXNlKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLm9uVG91Y2hTdGFydCA9IGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5oYW5kbGVBY3Rpb24oKTtcbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bik7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uVG91Y2hTdGFydCk7XG4gIH1cbiAgaGFuZGxlQWN0aW9uKCkge1xuICAgIGlmICh0aGlzLmZpbmlzaGVkKSB7XG4gICAgICB0aGlzLnJlc3RhcnQoKTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLnBhdXNlZCkge1xuICAgICAgdGhpcy5oZXJvLmZsYXAoKTtcbiAgICB9XG4gIH1cbiAgdG9nZ2xlUGF1c2UoKSB7XG4gICAgaWYgKHRoaXMuZmluaXNoZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMucGF1c2VkKSB7XG4gICAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLnNoYWRvd092ZXJsYXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhdXNlKCdQcmVzcyBlc2MgdG8gdW5wYXVzZScpO1xuICAgIH1cbiAgfVxuICByZXN0YXJ0KCkge1xuICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XG4gICAgdGhpcy5maW5pc2hlZCA9IGZhbHNlO1xuICAgIHRoaXMucmVzZXQoKTtcbiAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuc2hhZG93T3ZlcmxheSk7XG4gIH1cbiAgbW92ZVdvcmxkKHRpbWUpIHtcbiAgICBjb25zdCBwYXRoID0gU1BFRUQgKiB0aW1lO1xuICAgIGlmICh0aGlzLmhlcm8uZGVhZCkge1xuICAgICAgdGhpcy5oZXJvLnggKz0gcGF0aCAqIDAuNTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb3ZlU3Bpa2VzKHBhdGgpO1xuICAgICAgdGhpcy5iZ1NreS5tb3ZlKHBhdGggKiAwLjEpO1xuICAgICAgdGhpcy5iZ01vdW50YWluLm1vdmUocGF0aCAqIDAuMyk7XG4gICAgICB0aGlzLmJnR3JvdW5kLm1vdmUocGF0aCk7XG5cbiAgICAgIHRoaXMuZGlzdGFuY2UgKz0gcGF0aDtcbiAgICAgIGRhdGFNYW5hZ2VyLnNjb3JlID0gTWF0aC5mbG9vcih0aGlzLmRpc3RhbmNlIC8gMjUpO1xuICAgICAgdGhpcy5odWREaXN0YW5jZS50ZXh0ID0gYCR7ZGF0YU1hbmFnZXIuc2NvcmV9IG1gO1xuICAgIH1cbiAgfVxuICBtb3ZlU3Bpa2VzKHBhdGgpIHtcbiAgICBmb3IgKGNvbnN0IHNwaWtlIG9mIHRoaXMuc3Bpa2VzKSB7XG4gICAgICBzcGlrZS54IC09IHBhdGg7XG4gICAgICBpZiAoc3Bpa2UueCA8IC1zcGlrZS5ib3VuZHMud2lkdGggLyAyKSB7XG4gICAgICAgIHRoaXMucmVzZXRTcGlrZShzcGlrZSk7XG4gICAgICB9XG4gICAgICBpZiAobmRnbXIuY2hlY2tQaXhlbENvbGxpc2lvbih0aGlzLmhlcm8sIHNwaWtlKSkge1xuICAgICAgICB0aGlzLmhlcm8uZGllKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIG1vdmVIZXJvKHRpbWUpIHtcbiAgICB0aGlzLmhlcm8ubW92ZSh0aW1lKTtcbiAgICBpZiAodGhpcy5oZXJvLnkgPCAwKSB7XG4gICAgICB0aGlzLmhlcm8udlkgPSAwO1xuICAgICAgdGhpcy5oZXJvLnkgPSAwO1xuICAgIH0gZWxzZSBpZiAodGhpcy5oZXJvLnkgPiB0aGlzLmhlaWdodCArIHRoaXMuaGVyby5ib3VuZHMuaGVpZ2h0IC8gMikge1xuICAgICAgZGF0YU1hbmFnZXIubWF4U2NvcmUgPSBNYXRoLm1heChkYXRhTWFuYWdlci5tYXhTY29yZSwgZGF0YU1hbmFnZXIuc2NvcmUpO1xuICAgICAgc2NyZWVuc01hbmFnZXIuY2hhbmdlKCdFbmRTY3JlZW4nKTtcbiAgICAgIHRoaXMuZmluaXNoZWQgPSB0cnVlO1xuICAgICAgdGhpcy5wYXVzZSgnUHJlc3Mgc3BhY2UgdG8gcmVzdGFydCcpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5oZXJvLnkgPiB0aGlzLmhlaWdodCAtIChHUk9VTkRfSEVJR0hUICsgdGhpcy5oZXJvLmJvdW5kcy5oZWlnaHQgLyAyKSkge1xuICAgICAgdGhpcy5oZXJvLmRpZSgpO1xuICAgIH1cbiAgfVxuICB0aWNrKGUpIHtcbiAgICBjb25zdCBzZWMgPSBlLmRlbHRhICogMC4wMDE7XG4gICAgaWYgKHRoaXMucGF1c2VkIHx8IHNlYyA+IDAuMykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm1vdmVXb3JsZChzZWMpO1xuICAgIHRoaXMubW92ZUhlcm8oc2VjKTtcbiAgfVxuICBkZXN0cm95KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd24pO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5vblRvdWNoU3RhcnQpO1xuICB9XG59XG4iLCJpbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcbmltcG9ydCBzY3JlZW5zTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zY3JlZW5zTWFuYWdlcic7XG5pbXBvcnQgZGF0YU1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvZGF0YU1hbmFnZXInO1xuaW1wb3J0IEhlcm8gZnJvbSAnLi4vZGlzcGxheS9IZXJvJztcbmltcG9ydCBCdG4gZnJvbSAnLi4vZGlzcGxheS9CdG4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFydFNjcmVlbiBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgdGhpcy5iZyA9IG5ldyBjcmVhdGVqcy5CaXRtYXAoYXNzZXRzTWFuYWdlci5nZXRSZXN1bHQoJ3N0YXJ0JykpO1xuICAgIHRoaXMudGl0bGUgPSBuZXcgY3JlYXRlanMuVGV4dCgnQ2hvb3NlIHlvdXIgYXZhdGFyJywgJzQ1cHggQ2FydGVyT25lJywgJyMwMDAnKTtcbiAgICB0aGlzLnRpdGxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRoaXMudGl0bGUueCA9IHRoaXMud2lkdGggLyAyO1xuICAgIHRoaXMudGl0bGUueSA9IDEwMDtcblxuICAgIHRoaXMuc3RhcnRCdG4gPSBuZXcgQnRuKCdTdGFydCcpO1xuICAgIHRoaXMuc3RhcnRCdG4ueCA9IHdpZHRoIC8gMjtcbiAgICB0aGlzLnN0YXJ0QnRuLnkgPSAxNzUgKyB0aGlzLmhlaWdodCAvIDI7XG5cbiAgICB0aGlzLnN0YXJ0QnRuLmRpc2FibGUoKTtcbiAgICB0aGlzLmNyZWF0ZUhlcm9lcygpO1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5iZywgdGhpcy50aXRsZSwgLi4udGhpcy5oZXJvZXMsIHRoaXMuc3RhcnRCdG4pO1xuXG4gICAgdGhpcy5zdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLnN0YXJ0QnRuLmVuYWJsZWQpIHtcbiAgICAgICAgc2NyZWVuc01hbmFnZXIuY2hhbmdlKCdNYWluU2NyZWVuJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgY3JlYXRlSGVyb2VzKCkge1xuICAgIHRoaXMuaGVyb2VzID0gW1xuICAgICAgbmV3IEhlcm8oJ2JpcmQnKSxcbiAgICAgIG5ldyBIZXJvKCdtb25zdGVyJyksXG4gICAgICBuZXcgSGVybygnY2hpY2tlbicpLFxuICAgIF07XG4gICAgdGhpcy5oZXJvZXMuZm9yRWFjaCgoaGVybywgaSkgPT4ge1xuICAgICAgaGVyby55ID0gdGhpcy5oZWlnaHQgLyAyO1xuICAgICAgaGVyby54ID0gKGkgKyAxKSAqIHRoaXMud2lkdGggLyAodGhpcy5oZXJvZXMubGVuZ3RoICsgMSk7XG4gICAgICBoZXJvLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICAgIGhlcm8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnNlbGVjdEhlcm8oaGVybykpO1xuICAgICAgaGVyby5jYWNoZSgwLCAwLCBoZXJvLmJvdW5kcy53aWR0aCwgaGVyby5ib3VuZHMuaGVpZ2h0KTtcbiAgICB9KTtcbiAgICB0aGlzLnJlc2V0SGVyb2VzKCk7XG4gIH1cbiAgcmVzZXRIZXJvZXMoKSB7XG4gICAgdGhpcy5oZXJvZXMuZm9yRWFjaChoZXJvID0+IHtcbiAgICAgIGhlcm8uZmlsdGVycyA9IFtuZXcgY3JlYXRlanMuQ29sb3JGaWx0ZXIoMC42LCAwLjYsIDAuNildO1xuICAgICAgaGVyby51cGRhdGVDYWNoZSgpO1xuICAgICAgaGVyby5zY2FsZVggPSAwLjg1O1xuICAgICAgaGVyby5zY2FsZVkgPSAwLjg1O1xuICAgIH0pO1xuICB9XG4gIHNlbGVjdEhlcm8oaGVybykge1xuICAgIHRoaXMucmVzZXRIZXJvZXMoKTtcblxuICAgIGhlcm8uZmlsdGVycyA9IFtdO1xuICAgIGhlcm8udXBkYXRlQ2FjaGUoKTtcbiAgICBoZXJvLnNjYWxlWCA9IDE7XG4gICAgaGVyby5zY2FsZVkgPSAxO1xuICAgIGhlcm8uZmxhcCgpO1xuXG4gICAgaWYgKCF0aGlzLnN0YXJ0QnRuLmVuYWJsZWQpIHtcbiAgICAgIHRoaXMuc3RhcnRCdG4uZW5hYmxlKCk7XG4gICAgfVxuXG4gICAgZGF0YU1hbmFnZXIuaGVyb1R5cGUgPSBoZXJvLnR5cGU7XG4gIH1cbn1cbiJdfQ==
