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

    _this.addEventListener('click', function () {
      if (_this.enabled) {
        createjs.Sound.play('flap');
      }
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvc3JjL2FwcC5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9CYWNrZ3JvdW5kLmpzIiwiYXBwL2pzL3NyYy9kaXNwbGF5L0J0bi5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9IZXJvLmpzIiwiYXBwL2pzL3NyYy9kaXNwbGF5L1NoYWRvd092ZXJsYXkuanMiLCJhcHAvanMvc3JjL2Rpc3BsYXkvU3Bpa2UuanMiLCJhcHAvanMvc3JjL21hbmFnZXJzL2Fzc2V0c01hbmFnZXIuanMiLCJhcHAvanMvc3JjL21hbmFnZXJzL2RhdGFNYW5hZ2VyLmpzIiwiYXBwL2pzL3NyYy9tYW5hZ2Vycy9zY3JlZW5zTWFuYWdlci5qcyIsImFwcC9qcy9zcmMvc2NyZWVucy9FbmRTY3JlZW4uanMiLCJhcHAvanMvc3JjL3NjcmVlbnMvTWFpblNjcmVlbi5qcyIsImFwcC9qcy9zcmMvc2NyZWVucy9TdGFydFNjcmVlbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTSxRQUFRLElBQUksU0FBUyxLQUFiLENBQW1CLFlBQW5CLENBQWQ7O0FBRUEseUJBQWUsSUFBZixDQUFvQixLQUFwQjtBQUNBLHdCQUFjLElBQWQsQ0FBbUIsWUFBTTtBQUN2QiwyQkFBZSxNQUFmLENBQXNCLGFBQXRCO0FBQ0EsV0FBUyxLQUFULENBQWUsSUFBZixDQUFvQixNQUFwQixFQUE0QixFQUFFLE1BQU0sQ0FBQyxDQUFULEVBQVksUUFBUSxHQUFwQixFQUE1QjtBQUNBLE1BQUksU0FBUyxLQUFULENBQWUsV0FBZixFQUFKLEVBQWtDO0FBQ2hDLGFBQVMsS0FBVCxDQUFlLE1BQWYsQ0FBc0IsS0FBdEIsRUFBNkIsSUFBN0I7QUFDRCxHQUZELE1BRU87QUFDTCxVQUFNLGVBQU4sQ0FBc0IsRUFBdEI7QUFDRDtBQUNGLENBUkQ7Ozs7Ozs7Ozs7O0FDTkE7Ozs7Ozs7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aEQ7QUFDRCxPQU5EO0FBT0EsV0FBSyxXQUFMO0FBQ0Q7OztrQ0FDYTtBQUNaLFdBQUssTUFBTCxDQUFZLE9BQVosQ0FBb0IsZ0JBQVE7QUFDMUIsYUFBSyxPQUFMLEdBQWUsQ0FBQyxJQUFJLFNBQVMsV0FBYixDQUF5QixHQUF6QixFQUE4QixHQUE5QixFQUFtQyxHQUFuQyxDQUFELENBQWY7QUFDQSxhQUFLLFdBQUw7QUFDQSxhQUFLLE1BQUwsR0FBYyxJQUFkO0FBQ0EsYUFBSyxNQUFMLEdBQWMsSUFBZDtBQUNELE9BTEQ7QUFNRDs7OytCQUNVLEksRUFBTTtBQUNmLFdBQUssV0FBTDs7QUFFQSxXQUFLLE9BQUwsR0FBZSxFQUFmO0FBQ0EsV0FBSyxXQUFMO0FBQ0EsV0FBSyxNQUFMLEdBQWMsQ0FBZDtBQUNBLFdBQUssTUFBTCxHQUFjLENBQWQ7QUFDQSxXQUFLLElBQUw7O0FBRUEsVUFBSSxDQUFDLEtBQUssUUFBTCxDQUFjLE9BQW5CLEVBQTRCO0FBQzFCLGFBQUssUUFBTCxDQUFjLE1BQWQ7QUFDRDs7QUFFRCw0QkFBWSxRQUFaLEdBQXVCLEtBQUssSUFBNUI7QUFDRDs7OztFQWhFc0MsU0FBUyxTOztrQkFBN0IsVyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgc2NyZWVuc01hbmFnZXIgZnJvbSAnLi9tYW5hZ2Vycy9zY3JlZW5zTWFuYWdlcic7XG5pbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuXG5jb25zdCBzdGFnZSA9IG5ldyBjcmVhdGVqcy5TdGFnZSgnZ2FtZS1zdGFnZScpO1xuXG5zY3JlZW5zTWFuYWdlci5pbml0KHN0YWdlKTtcbmFzc2V0c01hbmFnZXIubG9hZCgoKSA9PiB7XG4gIHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnU3RhcnRTY3JlZW4nKTtcbiAgY3JlYXRlanMuU291bmQucGxheSgnYmFjaycsIHsgbG9vcDogLTEsIHZvbHVtZTogMC4zIH0pO1xuICBpZiAoY3JlYXRlanMuVG91Y2guaXNTdXBwb3J0ZWQoKSkge1xuICAgIGNyZWF0ZWpzLlRvdWNoLmVuYWJsZShzdGFnZSwgdHJ1ZSk7XG4gIH0gZWxzZSB7XG4gICAgc3RhZ2UuZW5hYmxlTW91c2VPdmVyKDIwKTtcbiAgfVxufSk7XG4iLCJpbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFja2dyb3VuZCBleHRlbmRzIGNyZWF0ZWpzLlNoYXBlIHtcbiAgY29uc3RydWN0b3IobmFtZSwgY2FudmFzV2lkdGgpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5pbWcgPSBhc3NldHNNYW5hZ2VyLmdldFJlc3VsdChuYW1lKTtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuaW1nLndpZHRoICsgY2FudmFzV2lkdGg7XG5cbiAgICB0aGlzLmdyYXBoaWNzLmJlZ2luQml0bWFwRmlsbCh0aGlzLmltZywgJ3JlcGVhdC14JykuZHJhd1JlY3QoMCwgMCwgd2lkdGgsIHRoaXMuaW1nLmhlaWdodCk7XG4gICAgdGhpcy5yZWdZID0gdGhpcy5pbWcuaGVpZ2h0O1xuICAgIHRoaXMuY2FjaGUoMCwgMCwgd2lkdGgsIHRoaXMuaW1nLmhlaWdodCk7XG4gIH1cbiAgbW92ZShwYXRoKSB7XG4gICAgdGhpcy54IC09IHBhdGg7XG4gICAgdGhpcy54ICU9IHRoaXMuaW1nLndpZHRoO1xuICB9XG59XG4iLCJpbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnRuIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3IodGV4dCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICBjb25zdCBzcyA9IG5ldyBjcmVhdGVqcy5TcHJpdGVTaGVldCh7XG4gICAgICBpbWFnZXM6IFthc3NldHNNYW5hZ2VyLmdldFJlc3VsdCgnYnRuJyldLFxuICAgICAgZnJhbWVzOiB7IHdpZHRoOiAyMTAsIGhlaWdodDogNjkgfSxcbiAgICAgIGFuaW1hdGlvbnM6IHtcbiAgICAgICAgZGlzYWJsZTogMCxcbiAgICAgICAgZG93bjogMSxcbiAgICAgICAgb3V0OiAyLFxuICAgICAgICBvdmVyOiAzLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuICAgIHRoaXMuYmcgPSBuZXcgY3JlYXRlanMuU3ByaXRlKHNzKTtcbiAgICB0aGlzLmJnLnJlZ1ggPSB0aGlzLmJnLmdldEJvdW5kcygpLndpZHRoIC8gMjtcbiAgICB0aGlzLmJnLnJlZ1kgPSB0aGlzLmJnLmdldEJvdW5kcygpLmhlaWdodCAvIDI7XG5cbiAgICB0aGlzLmhlbHBlciA9IG5ldyBjcmVhdGVqcy5CdXR0b25IZWxwZXIodGhpcy5iZyk7XG5cbiAgICB0aGlzLmxhYmVsID0gbmV3IGNyZWF0ZWpzLlRleHQodGV4dCwgJzMwcHggQ2FydGVyT25lJywgJyNmZmYnKTtcbiAgICB0aGlzLmxhYmVsLnNoYWRvdyA9IG5ldyBjcmVhdGVqcy5TaGFkb3coJyMwMDAnLCAwLCAxLCA1KTtcbiAgICB0aGlzLmxhYmVsLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRoaXMubGFiZWwudGV4dEJhc2VsaW5lID0gJ21pZGRsZSc7XG4gICAgdGhpcy5sYWJlbC55ID0gLTI7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgICBjcmVhdGVqcy5Tb3VuZC5wbGF5KCdmbGFwJyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmJnLCB0aGlzLmxhYmVsKTtcbiAgfVxuICBkaXNhYmxlKCkge1xuICAgIHRoaXMuYmcuZ290b0FuZFN0b3AoJ2Rpc2FibGUnKTtcbiAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLmhlbHBlci5lbmFibGVkID0gZmFsc2U7XG4gIH1cbiAgZW5hYmxlKCkge1xuICAgIHRoaXMuYmcuZ290b0FuZFN0b3AoJ291dCcpO1xuICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XG4gICAgdGhpcy5oZWxwZXIuZW5hYmxlZCA9IHRydWU7XG4gIH1cbn1cbiIsImltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZXJvIGV4dGVuZHMgY3JlYXRlanMuU3ByaXRlIHtcbiAgY29uc3RydWN0b3IodHlwZSkge1xuICAgIGNvbnN0IHNzID0gbmV3IGNyZWF0ZWpzLlNwcml0ZVNoZWV0KHtcbiAgICAgIGltYWdlczogW2Fzc2V0c01hbmFnZXIuZ2V0UmVzdWx0KHR5cGUpXSxcbiAgICAgIGZyYW1lczogeyB3aWR0aDogMTAwLCBoZWlnaHQ6IDc4IH0sXG4gICAgICBhbmltYXRpb25zOiB7XG4gICAgICAgIGZseTogMCxcbiAgICAgICAgZmxhcDogWzEsIDMsICdmbHknXSxcbiAgICAgICAgZGVhZDogNCxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgc3VwZXIoc3MpO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5ib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpO1xuICAgIHRoaXMucmVnWCA9IHRoaXMuYm91bmRzLndpZHRoIC8gMjtcbiAgICB0aGlzLnJlZ1kgPSB0aGlzLmJvdW5kcy5oZWlnaHQgLyAyO1xuICAgIHRoaXMuYSA9IDU1MDtcbiAgfVxuICByZXNldCgpIHtcbiAgICB0aGlzLmRlYWQgPSBmYWxzZTtcbiAgICB0aGlzLnJvdGF0aW9uID0gMDtcbiAgICB0aGlzLnZZID0gMDtcbiAgICB0aGlzLmdvdG9BbmRTdG9wKCdmbHknKTtcbiAgfVxuICBmbGFwKCkge1xuICAgIGlmICh0aGlzLmRlYWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy52WSA9IE1hdGgubWF4KHRoaXMudlkgLSAzNzUsIC0zNzUpO1xuICAgIHRoaXMuZ290b0FuZFBsYXkoJ2ZsYXAnKTtcbiAgICBjcmVhdGVqcy5Tb3VuZC5wbGF5KCdmbGFwJyk7XG4gIH1cbiAgbW92ZSh0aW1lKSB7XG4gICAgdGhpcy55ICs9ICgodGhpcy5hICogdGltZSAqIDAuNSkgKyB0aGlzLnZZKSAqIHRpbWU7XG4gICAgdGhpcy52WSArPSB0aGlzLmEgKiB0aW1lO1xuICB9XG4gIGRpZSgpIHtcbiAgICBpZiAodGhpcy5kZWFkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZGVhZCA9IHRydWU7XG4gICAgdGhpcy5yb3RhdGlvbiA9IDMwO1xuICAgIHRoaXMuZ290b0FuZFN0b3AoJ2RlYWQnKTtcbiAgICBjcmVhdGVqcy5Tb3VuZC5wbGF5KCdsb29zZScpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTaGFkb3dPdmVybGF5IGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnNoYWRvdyA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICAgIHRoaXMuc2hhZG93LmdyYXBoaWNzLmJlZ2luRmlsbCgncmdiYSgwLCAwLCAwLCAwLjYpJykuZHJhd1JlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICB0aGlzLnNoYWRvd1RleHQgPSBuZXcgY3JlYXRlanMuVGV4dCgnJywgJzI1cHggQ2FydGVyT25lJywgJyNmZmYnKTtcbiAgICB0aGlzLnNoYWRvd1RleHQueSA9IGhlaWdodCAvIDI7XG4gICAgdGhpcy5zaGFkb3dUZXh0LnggPSB3aWR0aCAvIDI7XG4gICAgdGhpcy5zaGFkb3dUZXh0LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRoaXMuc2hhZG93VGV4dC50ZXh0QmFzZWxpbmUgPSAnbWlkZGxlJztcblxuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5zaGFkb3csIHRoaXMuc2hhZG93VGV4dCk7XG4gICAgdGhpcy5jYWNoZSgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgfVxuICBzZXRUZXh0KHRleHQpIHtcbiAgICB0aGlzLnNoYWRvd1RleHQudGV4dCA9IHRleHQ7XG4gICAgdGhpcy51cGRhdGVDYWNoZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3Bpa2UgZXh0ZW5kcyBjcmVhdGVqcy5CaXRtYXAge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihhc3NldHNNYW5hZ2VyLmdldFJlc3VsdCgnc3Bpa2UnKSk7XG5cbiAgICB0aGlzLmJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCk7XG4gICAgdGhpcy5yZWdYID0gdGhpcy5ib3VuZHMud2lkdGggLyAyO1xuICAgIHRoaXMucmVnWSA9IHRoaXMuYm91bmRzLmhlaWdodDtcbiAgfVxuICByZXNldCgpIHtcbiAgICB0aGlzLnNjYWxlWSA9IDAuNyArIChNYXRoLnJhbmRvbSgpICogMC41KTtcbiAgfVxufVxuIiwiY29uc3QgYXNzZXRzTWFuYWdlciA9IHtcbiAgbG9hZChjYWxsYmFjaykge1xuICAgIGNyZWF0ZWpzLlNvdW5kLmFsdGVybmF0ZUV4dGVuc2lvbnMgPSBbJ21wMyddO1xuICAgIHRoaXMucXVldWUgPSBuZXcgY3JlYXRlanMuTG9hZFF1ZXVlKCk7XG4gICAgdGhpcy5xdWV1ZS5pbnN0YWxsUGx1Z2luKGNyZWF0ZWpzLlNvdW5kKTtcbiAgICB0aGlzLnF1ZXVlLmxvYWRNYW5pZmVzdChbXG4gICAgICB7IGlkOiAnbW9uc3RlcicsIHNyYzogJ2ltZy9tb25zdGVyLXNwcml0ZS5wbmcnIH0sXG4gICAgICB7IGlkOiAnYmlyZCcsIHNyYzogJ2ltZy9iaXJkLXNwcml0ZS5wbmcnIH0sXG4gICAgICB7IGlkOiAnY2hpY2tlbicsIHNyYzogJ2ltZy9jaGlja2VuLXNwcml0ZS5wbmcnIH0sXG4gICAgICB7IGlkOiAnc3Bpa2UnLCBzcmM6ICdpbWcvc3Bpa2UucG5nJyB9LFxuICAgICAgeyBpZDogJ3NreScsIHNyYzogJ2ltZy9iZy9za3kucG5nJyB9LFxuICAgICAgeyBpZDogJ3N0YXJ0Jywgc3JjOiAnaW1nL2JnL3N0YXJ0LnBuZycgfSxcbiAgICAgIHsgaWQ6ICdtb3VudGFpbicsIHNyYzogJ2ltZy9iZy9tb3VudGFpbi5wbmcnIH0sXG4gICAgICB7IGlkOiAnZ3JvdW5kJywgc3JjOiAnaW1nL2JnL2dyb3VuZC5wbmcnIH0sXG4gICAgICB7IGlkOiAnYnRuJywgc3JjOiAnaW1nL2J0bi1zcHJpdGUucG5nJyB9LFxuICAgICAgeyBpZDogJ2JhY2snLCBzcmM6ICdzb3VuZC9iYWNrZ3JvdW5kLm9nZycgfSxcbiAgICAgIHsgaWQ6ICdmbGFwJywgc3JjOiAnc291bmQvZmxhcC5vZ2cnIH0sXG4gICAgICB7IGlkOiAnbG9vc2UnLCBzcmM6ICdzb3VuZC9sb29zZS5vZ2cnIH0sXG4gICAgXSk7XG4gICAgdGhpcy5xdWV1ZS5hZGRFdmVudExpc3RlbmVyKCdjb21wbGV0ZScsIGNhbGxiYWNrKTtcbiAgfSxcbiAgZ2V0UmVzdWx0KG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5xdWV1ZS5nZXRSZXN1bHQobmFtZSk7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBhc3NldHNNYW5hZ2VyO1xuIiwiY29uc3QgZGF0YU1hbmFnZXIgPSB7XG4gIGhlcm9UeXBlOiBudWxsLFxuICBzY29yZTogMCxcbiAgbWF4U2NvcmU6IDAsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBkYXRhTWFuYWdlcjtcbiIsImltcG9ydCBTdGFydFNjcmVlbiBmcm9tICcuLi9zY3JlZW5zL1N0YXJ0U2NyZWVuJztcbmltcG9ydCBNYWluU2NyZWVuIGZyb20gJy4uL3NjcmVlbnMvTWFpblNjcmVlbic7XG5pbXBvcnQgRW5kU2NyZWVuIGZyb20gJy4uL3NjcmVlbnMvRW5kU2NyZWVuJztcblxuY29uc3Qgc2NyZWVuTWFuYWdlciA9IHtcbiAgaW5pdChzdGFnZSkge1xuICAgIHRoaXMuc3RhZ2UgPSBzdGFnZTtcbiAgICB0aGlzLmN1cnJlbnRTY3JlZW4gPSBudWxsO1xuICAgIHRoaXMuc2NyZWVucyA9IHtcbiAgICAgIFN0YXJ0U2NyZWVuLFxuICAgICAgTWFpblNjcmVlbixcbiAgICAgIEVuZFNjcmVlbixcbiAgICB9O1xuXG4gICAgY3JlYXRlanMuVGlja2VyLnRpbWluZ01vZGUgPSBjcmVhdGVqcy5UaWNrZXIuUkFGO1xuICAgIGNyZWF0ZWpzLlRpY2tlci5hZGRFdmVudExpc3RlbmVyKCd0aWNrJywgZSA9PiB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50U2NyZWVuICYmIHRoaXMuY3VycmVudFNjcmVlbi50aWNrKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFNjcmVlbi50aWNrKGUpO1xuICAgICAgfVxuICAgICAgdGhpcy5zdGFnZS51cGRhdGUoKTtcbiAgICB9KTtcbiAgfSxcbiAgY2hhbmdlKG5hbWUpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50U2NyZWVuKSB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50U2NyZWVuLmRlc3Ryb3kpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U2NyZWVuLmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5jdXJyZW50U2NyZWVuKTtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50U2NyZWVuID0gbmV3IHRoaXMuc2NyZWVuc1tuYW1lXSh0aGlzLnN0YWdlLmNhbnZhcy53aWR0aCwgdGhpcy5zdGFnZS5jYW52YXMuaGVpZ2h0KTtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuY3VycmVudFNjcmVlbik7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBzY3JlZW5NYW5hZ2VyO1xuIiwiaW1wb3J0IGFzc2V0c01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvYXNzZXRzTWFuYWdlcic7XG5pbXBvcnQgc2NyZWVuc01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc2NyZWVuc01hbmFnZXInO1xuaW1wb3J0IGRhdGFNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2RhdGFNYW5hZ2VyJztcbmltcG9ydCBCdG4gZnJvbSAnLi4vZGlzcGxheS9CdG4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbmRTY3JlZW4gZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuICBjb25zdHJ1Y3Rvcih3aWR0aCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmJnID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChhc3NldHNNYW5hZ2VyLmdldFJlc3VsdCgnc3RhcnQnKSk7XG4gICAgdGhpcy5zY29yZSA9IG5ldyBjcmVhdGVqcy5UZXh0KGBTY29yZTogJHtkYXRhTWFuYWdlci5zY29yZX1gLCAnNDBweCBDYXJ0ZXJPbmUnLCAnIzAwMCcpO1xuICAgIHRoaXMubWF4U2NvcmUgPSBuZXcgY3JlYXRlanMuVGV4dChgQmVzdCBzY29yZTogJHtkYXRhTWFuYWdlci5tYXhTY29yZX1gLCAnNDBweCBDYXJ0ZXJPbmUnLCAnIzAwMCcpO1xuICAgIHRoaXMuc2NvcmUueCA9IHRoaXMubWF4U2NvcmUueCA9IHdpZHRoIC8gMjtcbiAgICB0aGlzLnNjb3JlLnRleHRBbGlnbiA9IHRoaXMubWF4U2NvcmUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgdGhpcy5zY29yZS55ID0gMTEwO1xuICAgIHRoaXMubWF4U2NvcmUueSA9IDE4MDtcblxuICAgIHRoaXMucmVwbGF5QnRuID0gbmV3IEJ0bignUmVzdGFydCcpO1xuICAgIHRoaXMubWVudUJ0biA9IG5ldyBCdG4oJ01lbnUnKTtcbiAgICB0aGlzLnJlcGxheUJ0bi54ID0gdGhpcy5tZW51QnRuLnggPSB3aWR0aCAvIDI7XG4gICAgdGhpcy5tZW51QnRuLnkgPSA0NzA7XG4gICAgdGhpcy5yZXBsYXlCdG4ueSA9IDM4MDtcblxuICAgIHRoaXMucmVwbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gc2NyZWVuc01hbmFnZXIuY2hhbmdlKCdNYWluU2NyZWVuJykpO1xuICAgIHRoaXMubWVudUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnU3RhcnRTY3JlZW4nKSk7XG5cbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuYmcsIHRoaXMuc2NvcmUsIHRoaXMubWF4U2NvcmUsIHRoaXMucmVwbGF5QnRuLCB0aGlzLm1lbnVCdG4pO1xuICB9XG59XG4iLCJpbXBvcnQgc2NyZWVuc01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc2NyZWVuc01hbmFnZXInO1xuaW1wb3J0IGRhdGFNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2RhdGFNYW5hZ2VyJztcbmltcG9ydCBCYWNrZ3JvdW5kIGZyb20gJy4uL2Rpc3BsYXkvQmFja2dyb3VuZCc7XG5pbXBvcnQgSGVybyBmcm9tICcuLi9kaXNwbGF5L0hlcm8nO1xuaW1wb3J0IFNwaWtlIGZyb20gJy4uL2Rpc3BsYXkvU3Bpa2UnO1xuaW1wb3J0IFNoYWRvd092ZXJsYXkgZnJvbSAnLi4vZGlzcGxheS9TaGFkb3dPdmVybGF5JztcblxuY29uc3QgU1BFRUQgPSAzMDA7XG5jb25zdCBHUk9VTkRfSEVJR0hUID0gODI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5TY3JlZW4gZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcblxuICAgIHRoaXMuZGlzdGFuY2UgPSAwO1xuICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcbiAgICB0aGlzLmZpbmlzaGVkID0gdHJ1ZTtcblxuICAgIHRoaXMuYmdTa3kgPSBuZXcgQmFja2dyb3VuZCgnc2t5JywgdGhpcy53aWR0aCk7XG4gICAgdGhpcy5iZ01vdW50YWluID0gbmV3IEJhY2tncm91bmQoJ21vdW50YWluJywgdGhpcy53aWR0aCk7XG4gICAgdGhpcy5iZ0dyb3VuZCA9IG5ldyBCYWNrZ3JvdW5kKCdncm91bmQnLCB0aGlzLndpZHRoKTtcbiAgICB0aGlzLmJnU2t5LnkgPSB0aGlzLmJnTW91bnRhaW4ueSA9IHRoaXMuYmdHcm91bmQueSA9IHRoaXMuaGVpZ2h0O1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5iZ1NreSwgdGhpcy5iZ01vdW50YWluLCB0aGlzLmJnR3JvdW5kKTtcblxuICAgIHRoaXMuaGVybyA9IG5ldyBIZXJvKGRhdGFNYW5hZ2VyLmhlcm9UeXBlKTtcbiAgICB0aGlzLnNwaWtlcyA9IFtuZXcgU3Bpa2UoKSwgbmV3IFNwaWtlKCldO1xuICAgIHRoaXMuaHVkRGlzdGFuY2UgPSBuZXcgY3JlYXRlanMuVGV4dCgnJywgJzI1cHggQ2FydGVyT25lJywgJyMwMDAnKTtcbiAgICB0aGlzLmh1ZERpc3RhbmNlLnggPSB0aGlzLmh1ZERpc3RhbmNlLnkgPSAxNTtcbiAgICB0aGlzLnNoYWRvd092ZXJsYXkgPSBuZXcgU2hhZG93T3ZlcmxheSh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgdGhpcy5hZGRDaGlsZCguLi50aGlzLnNwaWtlcywgdGhpcy5oZXJvLCB0aGlzLmh1ZERpc3RhbmNlKTtcblxuICAgIHRoaXMucmVzZXQoKTtcbiAgICB0aGlzLnBhdXNlKCdQcmVzcyBzcGFjZSB0byBmbGFwLCBlc2MgdG8gcGF1c2UnKTtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgfVxuICByZXNldCgpIHtcbiAgICB0aGlzLmhlcm8ucmVzZXQoKTtcbiAgICB0aGlzLmhlcm8ueCA9IHRoaXMud2lkdGggLyAyO1xuICAgIHRoaXMuaGVyby55ID0gMjAwO1xuXG4gICAgdGhpcy5zcGlrZXNbMF0ueCA9IC10aGlzLnNwaWtlc1swXS5ib3VuZHMud2lkdGggLyAyO1xuICAgIHRoaXMuc3Bpa2VzWzFdLnggPSB0aGlzLndpZHRoIC8gMjtcbiAgICB0aGlzLnNwaWtlcy5mb3JFYWNoKHNwaWtlID0+IHRoaXMucmVzZXRTcGlrZShzcGlrZSkpO1xuXG4gICAgdGhpcy5kaXN0YW5jZSA9IDA7XG4gICAgdGhpcy5odWREaXN0YW5jZS50ZXh0ID0gJzAgbSc7XG4gIH1cbiAgcmVzZXRTcGlrZShzcGlrZSkge1xuICAgIHNwaWtlLnJlc2V0KCk7XG4gICAgc3Bpa2UueCArPSB0aGlzLndpZHRoICsgc3Bpa2UuYm91bmRzLndpZHRoO1xuICAgIGlmIChNYXRoLnJhbmRvbSgpID4gMC41KSB7XG4gICAgICBzcGlrZS55ID0gdGhpcy5oZWlnaHQgLSBHUk9VTkRfSEVJR0hUO1xuICAgICAgc3Bpa2Uucm90YXRpb24gPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBzcGlrZS55ID0gMDtcbiAgICAgIHNwaWtlLnJvdGF0aW9uID0gMTgwO1xuICAgIH1cbiAgfVxuICBwYXVzZSh0ZXh0KSB7XG4gICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuICAgIHRoaXMuc2hhZG93T3ZlcmxheS5zZXRUZXh0KHRleHQpO1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5zaGFkb3dPdmVybGF5KTtcbiAgfVxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMub25LZXlEb3duID0gZSA9PiB7XG4gICAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgICBjYXNlIDMyOlxuICAgICAgICAgIHRoaXMuaGFuZGxlQWN0aW9uKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjc6XG4gICAgICAgICAgdGhpcy50b2dnbGVQYXVzZSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5vblRvdWNoU3RhcnQgPSBlID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuaGFuZGxlQWN0aW9uKCk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd24pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5vblRvdWNoU3RhcnQpO1xuICB9XG4gIGhhbmRsZUFjdGlvbigpIHtcbiAgICBpZiAodGhpcy5maW5pc2hlZCkge1xuICAgICAgdGhpcy5yZXN0YXJ0KCk7XG4gICAgfSBlbHNlIGlmICghdGhpcy5wYXVzZWQpIHtcbiAgICAgIHRoaXMuaGVyby5mbGFwKCk7XG4gICAgfVxuICB9XG4gIHRvZ2dsZVBhdXNlKCkge1xuICAgIGlmICh0aGlzLmZpbmlzaGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLnBhdXNlZCkge1xuICAgICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5zaGFkb3dPdmVybGF5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYXVzZSgnUHJlc3MgZXNjIHRvIHVucGF1c2UnKTtcbiAgICB9XG4gIH1cbiAgcmVzdGFydCgpIHtcbiAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuICAgIHRoaXMuZmluaXNoZWQgPSBmYWxzZTtcbiAgICB0aGlzLnJlc2V0KCk7XG4gICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLnNoYWRvd092ZXJsYXkpO1xuICB9XG4gIG1vdmVXb3JsZCh0aW1lKSB7XG4gICAgY29uc3QgcGF0aCA9IFNQRUVEICogdGltZTtcbiAgICBpZiAodGhpcy5oZXJvLmRlYWQpIHtcbiAgICAgIHRoaXMuaGVyby54ICs9IHBhdGggKiAwLjU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW92ZVNwaWtlcyhwYXRoKTtcbiAgICAgIHRoaXMuYmdTa3kubW92ZShwYXRoICogMC4xKTtcbiAgICAgIHRoaXMuYmdNb3VudGFpbi5tb3ZlKHBhdGggKiAwLjMpO1xuICAgICAgdGhpcy5iZ0dyb3VuZC5tb3ZlKHBhdGgpO1xuXG4gICAgICB0aGlzLmRpc3RhbmNlICs9IHBhdGg7XG4gICAgICBkYXRhTWFuYWdlci5zY29yZSA9IE1hdGguZmxvb3IodGhpcy5kaXN0YW5jZSAvIDI1KTtcbiAgICAgIHRoaXMuaHVkRGlzdGFuY2UudGV4dCA9IGAke2RhdGFNYW5hZ2VyLnNjb3JlfSBtYDtcbiAgICB9XG4gIH1cbiAgbW92ZVNwaWtlcyhwYXRoKSB7XG4gICAgZm9yIChjb25zdCBzcGlrZSBvZiB0aGlzLnNwaWtlcykge1xuICAgICAgc3Bpa2UueCAtPSBwYXRoO1xuICAgICAgaWYgKHNwaWtlLnggPCAtc3Bpa2UuYm91bmRzLndpZHRoIC8gMikge1xuICAgICAgICB0aGlzLnJlc2V0U3Bpa2Uoc3Bpa2UpO1xuICAgICAgfVxuICAgICAgaWYgKG5kZ21yLmNoZWNrUGl4ZWxDb2xsaXNpb24odGhpcy5oZXJvLCBzcGlrZSkpIHtcbiAgICAgICAgdGhpcy5oZXJvLmRpZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBtb3ZlSGVybyh0aW1lKSB7XG4gICAgdGhpcy5oZXJvLm1vdmUodGltZSk7XG4gICAgaWYgKHRoaXMuaGVyby55IDwgMCkge1xuICAgICAgdGhpcy5oZXJvLnZZID0gMDtcbiAgICAgIHRoaXMuaGVyby55ID0gMDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaGVyby55ID4gdGhpcy5oZWlnaHQgKyB0aGlzLmhlcm8uYm91bmRzLmhlaWdodCAvIDIpIHtcbiAgICAgIGRhdGFNYW5hZ2VyLm1heFNjb3JlID0gTWF0aC5tYXgoZGF0YU1hbmFnZXIubWF4U2NvcmUsIGRhdGFNYW5hZ2VyLnNjb3JlKTtcbiAgICAgIHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnRW5kU2NyZWVuJyk7XG4gICAgICB0aGlzLmZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMucGF1c2UoJ1ByZXNzIHNwYWNlIHRvIHJlc3RhcnQnKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaGVyby55ID4gdGhpcy5oZWlnaHQgLSAoR1JPVU5EX0hFSUdIVCArIHRoaXMuaGVyby5ib3VuZHMuaGVpZ2h0IC8gMikpIHtcbiAgICAgIHRoaXMuaGVyby5kaWUoKTtcbiAgICB9XG4gIH1cbiAgdGljayhlKSB7XG4gICAgY29uc3Qgc2VjID0gZS5kZWx0YSAqIDAuMDAxO1xuICAgIGlmICh0aGlzLnBhdXNlZCB8fCBzZWMgPiAwLjMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5tb3ZlV29ybGQoc2VjKTtcbiAgICB0aGlzLm1vdmVIZXJvKHNlYyk7XG4gIH1cbiAgZGVzdHJveSgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlEb3duKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMub25Ub3VjaFN0YXJ0KTtcbiAgfVxufVxuIiwiaW1wb3J0IGFzc2V0c01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvYXNzZXRzTWFuYWdlcic7XG5pbXBvcnQgc2NyZWVuc01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc2NyZWVuc01hbmFnZXInO1xuaW1wb3J0IGRhdGFNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2RhdGFNYW5hZ2VyJztcbmltcG9ydCBIZXJvIGZyb20gJy4uL2Rpc3BsYXkvSGVybyc7XG5pbXBvcnQgQnRuIGZyb20gJy4uL2Rpc3BsYXkvQnRuJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhcnRTY3JlZW4gZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcblxuICAgIHRoaXMuYmcgPSBuZXcgY3JlYXRlanMuQml0bWFwKGFzc2V0c01hbmFnZXIuZ2V0UmVzdWx0KCdzdGFydCcpKTtcbiAgICB0aGlzLnRpdGxlID0gbmV3IGNyZWF0ZWpzLlRleHQoJ0Nob29zZSB5b3VyIGF2YXRhcicsICc0NXB4IENhcnRlck9uZScsICcjMDAwJyk7XG4gICAgdGhpcy50aXRsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICB0aGlzLnRpdGxlLnggPSB0aGlzLndpZHRoIC8gMjtcbiAgICB0aGlzLnRpdGxlLnkgPSAxMDA7XG5cbiAgICB0aGlzLnN0YXJ0QnRuID0gbmV3IEJ0bignU3RhcnQnKTtcbiAgICB0aGlzLnN0YXJ0QnRuLnggPSB3aWR0aCAvIDI7XG4gICAgdGhpcy5zdGFydEJ0bi55ID0gMTc1ICsgdGhpcy5oZWlnaHQgLyAyO1xuXG4gICAgdGhpcy5zdGFydEJ0bi5kaXNhYmxlKCk7XG4gICAgdGhpcy5jcmVhdGVIZXJvZXMoKTtcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuYmcsIHRoaXMudGl0bGUsIC4uLnRoaXMuaGVyb2VzLCB0aGlzLnN0YXJ0QnRuKTtcblxuICAgIHRoaXMuc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5zdGFydEJ0bi5lbmFibGVkKSB7XG4gICAgICAgIHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnTWFpblNjcmVlbicpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGNyZWF0ZUhlcm9lcygpIHtcbiAgICB0aGlzLmhlcm9lcyA9IFtcbiAgICAgIG5ldyBIZXJvKCdiaXJkJyksXG4gICAgICBuZXcgSGVybygnbW9uc3RlcicpLFxuICAgICAgbmV3IEhlcm8oJ2NoaWNrZW4nKSxcbiAgICBdO1xuICAgIHRoaXMuaGVyb2VzLmZvckVhY2goKGhlcm8sIGkpID0+IHtcbiAgICAgIGhlcm8ueSA9IHRoaXMuaGVpZ2h0IC8gMjtcbiAgICAgIGhlcm8ueCA9IChpICsgMSkgKiB0aGlzLndpZHRoIC8gKHRoaXMuaGVyb2VzLmxlbmd0aCArIDEpO1xuICAgICAgaGVyby5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgICBoZXJvLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5zZWxlY3RIZXJvKGhlcm8pKTtcbiAgICAgIGhlcm8uY2FjaGUoMCwgMCwgaGVyby5ib3VuZHMud2lkdGgsIGhlcm8uYm91bmRzLmhlaWdodCk7XG4gICAgfSk7XG4gICAgdGhpcy5yZXNldEhlcm9lcygpO1xuICB9XG4gIHJlc2V0SGVyb2VzKCkge1xuICAgIHRoaXMuaGVyb2VzLmZvckVhY2goaGVybyA9PiB7XG4gICAgICBoZXJvLmZpbHRlcnMgPSBbbmV3IGNyZWF0ZWpzLkNvbG9yRmlsdGVyKDAuNiwgMC42LCAwLjYpXTtcbiAgICAgIGhlcm8udXBkYXRlQ2FjaGUoKTtcbiAgICAgIGhlcm8uc2NhbGVYID0gMC44NTtcbiAgICAgIGhlcm8uc2NhbGVZID0gMC44NTtcbiAgICB9KTtcbiAgfVxuICBzZWxlY3RIZXJvKGhlcm8pIHtcbiAgICB0aGlzLnJlc2V0SGVyb2VzKCk7XG5cbiAgICBoZXJvLmZpbHRlcnMgPSBbXTtcbiAgICBoZXJvLnVwZGF0ZUNhY2hlKCk7XG4gICAgaGVyby5zY2FsZVggPSAxO1xuICAgIGhlcm8uc2NhbGVZID0gMTtcbiAgICBoZXJvLmZsYXAoKTtcblxuICAgIGlmICghdGhpcy5zdGFydEJ0bi5lbmFibGVkKSB7XG4gICAgICB0aGlzLnN0YXJ0QnRuLmVuYWJsZSgpO1xuICAgIH1cblxuICAgIGRhdGFNYW5hZ2VyLmhlcm9UeXBlID0gaGVyby50eXBlO1xuICB9XG59XG4iXX0=
