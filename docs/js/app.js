(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _screensManager = require('./managers/screensManager');

var _screensManager2 = _interopRequireDefault(_screensManager);

var _assetsManager = require('./managers/assetsManager');

var _assetsManager2 = _interopRequireDefault(_assetsManager);

var _soundManager = require('./managers/soundManager');

var _soundManager2 = _interopRequireDefault(_soundManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stage = new createjs.Stage('game-stage');

_screensManager2.default.init(stage);
_assetsManager2.default.load(function () {
  _soundManager2.default.init(true);
  _screensManager2.default.change('StartScreen');

  if (createjs.Touch.isSupported()) {
    createjs.Touch.enable(stage, true);
  } else {
    stage.enableMouseOver(20);
  }

  if (window !== window.parent) {
    window.addEventListener('click', function () {
      return window.focus();
    });
  }
});

},{"./managers/assetsManager":8,"./managers/screensManager":10,"./managers/soundManager":11}],2:[function(require,module,exports){
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

},{"../managers/assetsManager":8}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assetsManager = require('../managers/assetsManager');

var _assetsManager2 = _interopRequireDefault(_assetsManager);

var _soundManager = require('../managers/soundManager');

var _soundManager2 = _interopRequireDefault(_soundManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Btn = function (_createjs$Container) {
  _inherits(Btn, _createjs$Container);

  function Btn(label) {
    var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'green';
    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'btn';

    _classCallCheck(this, Btn);

    var _this = _possibleConstructorReturn(this, (Btn.__proto__ || Object.getPrototypeOf(Btn)).call(this));

    _this.color = color;
    _this.enabled = true;

    _this.createBg(type);
    _this.createLabel(label);

    _this.addEventListener('click', function () {
      return _this.enabled && _soundManager2.default.isEnabled() && createjs.Sound.play('flap');
    });
    return _this;
  }

  _createClass(Btn, [{
    key: 'createBg',
    value: function createBg(type) {
      this.bg = new createjs.Sprite(_assetsManager2.default.getSpriteSheet(type));
      this.bg.regX = this.bg.getBounds().width / 2;
      this.bg.regY = this.bg.getBounds().height / 2;
      this.helper = new createjs.ButtonHelper(this.bg, this.color + 'Out', this.color + 'Over', this.color + 'Down');
      this.addChild(this.bg);
    }
  }, {
    key: 'createLabel',
    value: function createLabel(label) {
      this.label = new createjs.Text(label, '30px CarterOne', '#fff');
      this.label.shadow = new createjs.Shadow('#000', 0, 1, 5);
      this.label.textAlign = 'center';
      this.label.textBaseline = 'middle';
      this.label.mouseEnabled = false;
      this.label.y = -2;

      // todo cache
      // now it cache before font load (
      // const h = this.label.getMeasuredHeight() + 6; // add 6 cos of shadow
      // const w = this.label.getMeasuredWidth() + 6;
      // this.label.cache(-w / 2, -h / 2, w, h);

      this.addChild(this.label);
    }
  }, {
    key: 'disable',
    value: function disable() {
      this.bg.gotoAndStop('disable');
      this.enabled = false;
      this.mouseEnabled = false;
    }
  }, {
    key: 'enable',
    value: function enable() {
      this.bg.gotoAndStop(this.color + 'Out');
      this.enabled = true;
      this.mouseEnabled = true;
    }
  }]);

  return Btn;
}(createjs.Container);

exports.default = Btn;

},{"../managers/assetsManager":8,"../managers/soundManager":11}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assetsManager = require('../managers/assetsManager');

var _assetsManager2 = _interopRequireDefault(_assetsManager);

var _soundManager = require('../managers/soundManager');

var _soundManager2 = _interopRequireDefault(_soundManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CONFIG = {
  G: 550,
  A: 375
};

var Hero = function (_createjs$Sprite) {
  _inherits(Hero, _createjs$Sprite);

  function Hero(type) {
    _classCallCheck(this, Hero);

    var _this = _possibleConstructorReturn(this, (Hero.__proto__ || Object.getPrototypeOf(Hero)).call(this, _assetsManager2.default.getSpriteSheet(type)));

    _this.type = type;
    _this.bounds = _this.getBounds();
    _this.regX = _this.bounds.width / 2;
    _this.regY = _this.bounds.height / 2;

    _this.dead = false;
    _this.vY = 0;
    return _this;
  }

  _createClass(Hero, [{
    key: 'flap',
    value: function flap() {
      if (this.dead) {
        return;
      }
      this.vY = Math.max(this.vY - CONFIG.A, -CONFIG.A);
      this.gotoAndPlay('flap');
      if (_soundManager2.default.isEnabled()) {
        createjs.Sound.play('flap');
      }
    }
  }, {
    key: 'move',
    value: function move(time) {
      this.y += (CONFIG.G * time * 0.5 + this.vY) * time;
      this.vY += CONFIG.G * time;
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
      if (_soundManager2.default.isEnabled()) {
        createjs.Sound.play('loose');
      }
    }
  }]);

  return Hero;
}(createjs.Sprite);

exports.default = Hero;

},{"../managers/assetsManager":8,"../managers/soundManager":11}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assetsManager = require('../managers/assetsManager');

var _assetsManager2 = _interopRequireDefault(_assetsManager);

var _Btn2 = require('./Btn');

var _Btn3 = _interopRequireDefault(_Btn2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IconBtn = function (_Btn) {
  _inherits(IconBtn, _Btn);

  function IconBtn(label) {
    var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'orange';

    _classCallCheck(this, IconBtn);

    return _possibleConstructorReturn(this, (IconBtn.__proto__ || Object.getPrototypeOf(IconBtn)).call(this, label, color, 'iconBtn'));
  }

  _createClass(IconBtn, [{
    key: 'createLabel',
    value: function createLabel(label) {
      this.label = new createjs.Sprite(_assetsManager2.default.getSpriteSheet('icon'), label);
      this.label.regX = this.label.getBounds().width / 2;
      this.label.regY = this.label.getBounds().height / 2;
      this.label.mouseEnabled = false;
      this.addChild(this.label);
    }
  }, {
    key: 'changeLabel',
    value: function changeLabel(label) {
      this.label.gotoAndStop(label);
    }
  }]);

  return IconBtn;
}(_Btn3.default);

exports.default = IconBtn;

},{"../managers/assetsManager":8,"./Btn":3}],6:[function(require,module,exports){
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
    // todo
    // this.cache(0, 0, width, height);
    return _this;
  }

  _createClass(ShadowOverlay, [{
    key: 'setText',
    value: function setText(text) {
      this.shadowText.text = text;
      // this.updateCache();
    }
  }]);

  return ShadowOverlay;
}(createjs.Container);

exports.default = ShadowOverlay;

},{}],7:[function(require,module,exports){
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

},{"../managers/assetsManager":8}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var manifest = [{ id: 'monster', src: 'img/monster-sprite.png' }, { id: 'bird', src: 'img/bird-sprite.png' }, { id: 'chicken', src: 'img/chicken-sprite.png' }, { id: 'spike', src: 'img/spike.png' }, { id: 'sky', src: 'img/bg/sky.png' }, { id: 'start', src: 'img/bg/start.png' }, { id: 'mountain', src: 'img/bg/mountain.png' }, { id: 'ground', src: 'img/bg/ground.png' }, { id: 'btn', src: 'img/btn-sprite.png' }, { id: 'icon-btn', src: 'img/icon-btn-sprite.png' }, { id: 'icon', src: 'img/icon-sprite.png' }, { id: 'back', src: 'sound/background.ogg' }, { id: 'flap', src: 'sound/flap.ogg' }, { id: 'loose', src: 'sound/loose.ogg' }];

var getHeroSpriteSheetData = function getHeroSpriteSheetData(name) {
  return {
    images: [name],
    frames: { width: 100, height: 78 },
    animations: {
      fly: 0,
      flap: [1, 3, 'fly'],
      dead: 4
    }
  };
};

var spriteSheetsData = {
  bird: getHeroSpriteSheetData('bird'),
  monster: getHeroSpriteSheetData('monster'),
  chicken: getHeroSpriteSheetData('chicken'),
  btn: {
    images: ['btn'],
    frames: { width: 210, height: 69, spacing: 2 },
    animations: {
      greenOut: 0,
      greenOver: 2,
      greenDown: 4,
      orangeOut: 6,
      orangeOver: 8,
      orangeDown: 1,
      redOut: 3,
      redOver: 5,
      redDown: 7,
      disable: 9
    }
  },
  iconBtn: {
    images: ['icon-btn'],
    frames: { width: 69, height: 71, spacing: 2 },
    animations: {
      greenOut: 0,
      greenOver: 1,
      greenDown: 2,
      orangeOut: 3,
      orangeOver: 4,
      orangeDown: 5,
      redOut: 8,
      redOver: 7,
      redDown: 6,
      disable: 9
    }
  },
  icon: {
    images: ['icon'],
    frames: { width: 40, height: 40 },
    animations: {
      sound: 0,
      soundOff: 1
    }
  }
};

var spriteSheets = {};

var assetsManager = {
  load: function load(callback) {
    createjs.Sound.alternateExtensions = ['mp3'];
    this.queue = new createjs.LoadQueue();
    this.queue.installPlugin(createjs.Sound);
    this.queue.loadManifest(manifest);
    this.queue.addEventListener('complete', callback);
  },
  getResult: function getResult(name) {
    return this.queue.getResult(name);
  },
  getSpriteSheet: function getSpriteSheet(name) {
    var _this = this;

    if (!spriteSheets[name]) {
      var data = spriteSheetsData[name];

      if (!data) {
        throw new Error('invalid spriteSheet name');
      }

      data.images = data.images.map(function (img) {
        return _this.getResult(img);
      });
      spriteSheets[name] = new createjs.SpriteSheet(data);
    }

    return spriteSheets[name];
  }
};

exports.default = assetsManager;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var dataManager = {
  heroType: 'monster',
  score: 0,
  maxScore: 0
};

exports.default = dataManager;

},{}],10:[function(require,module,exports){
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
      _this.stage.update(e);
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

},{"../screens/EndScreen":12,"../screens/MainScreen":13,"../screens/StartScreen":14}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var soundManager = {
  init: function init(enabled) {
    this.enabled = enabled;
    this.bg = createjs.Sound.play('back', { loop: -1, volume: 0.3 });
    this.bg.paused = !this.enabled;
  },
  toggle: function toggle() {
    this.enabled = !this.enabled;
    this.bg.paused = !this.enabled;
  },
  isEnabled: function isEnabled() {
    return this.enabled;
  }
};

exports.default = soundManager;

},{}],12:[function(require,module,exports){
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

var _soundManager = require('../managers/soundManager');

var _soundManager2 = _interopRequireDefault(_soundManager);

var _IconBtn = require('../display/IconBtn');

var _IconBtn2 = _interopRequireDefault(_IconBtn);

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
    // this.menuBtn = new Btn('Menu', 'orange');
    _this.replayBtn.x = width / 2;
    // this.menuBtn.y = 470;
    _this.replayBtn.y = 380;

    _this.addChild(_this.bg, _this.score, _this.maxScore, _this.replayBtn);

    var soundBtn = new _IconBtn2.default(_soundManager2.default.isEnabled() ? 'sound' : 'soundOff');
    soundBtn.x = width - soundBtn.getBounds().width / 2 - 25;
    soundBtn.y = soundBtn.getBounds().height / 2 + 20;
    _this.addChild(soundBtn);

    soundBtn.addEventListener('click', function () {
      _soundManager2.default.toggle();
      soundBtn.changeLabel(_soundManager2.default.isEnabled() ? 'sound' : 'soundOff');
    });

    _this.bindEvents();
    return _this;
  }

  _createClass(EndScreen, [{
    key: 'bindEvents',
    value: function bindEvents() {
      this.replayBtn.addEventListener('click', function () {
        return _screensManager2.default.change('MainScreen');
      });
      // this.menuBtn.addEventListener('click', () => screensManager.change('StartScreen'));

      this.onKeyDown = function (e) {
        if (e.keyCode === 32) {
          _screensManager2.default.change('MainScreen');
          e.preventDefault();
        }
      };

      window.addEventListener('keydown', this.onKeyDown);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      window.removeEventListener('keydown', this.onKeyDown);
    }
  }]);

  return EndScreen;
}(createjs.Container);

exports.default = EndScreen;

},{"../display/Btn":3,"../display/IconBtn":5,"../managers/assetsManager":8,"../managers/dataManager":9,"../managers/screensManager":10,"../managers/soundManager":11}],13:[function(require,module,exports){
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

var GROUND_HEIGHT = 82;

var MainScreen = function (_createjs$Container) {
  _inherits(MainScreen, _createjs$Container);

  function MainScreen(width, height) {
    _classCallCheck(this, MainScreen);

    var _this = _possibleConstructorReturn(this, (MainScreen.__proto__ || Object.getPrototypeOf(MainScreen)).call(this));

    _this.width = width;
    _this.height = height;

    _this.speed = 300;
    _this.distance = 0;
    _this.shadowOverlay = new _ShadowOverlay2.default(_this.width, _this.height);

    _this.createBg();
    _this.createSpikes();
    _this.createHero();
    _this.createHud();

    _this.pause('Press space to flap, esc to pause');
    _this.bindEvents();
    return _this;
  }

  _createClass(MainScreen, [{
    key: 'createBg',
    value: function createBg() {
      this.bgSky = new _Background2.default('sky', this.width);
      this.bgMountain = new _Background2.default('mountain', this.width);
      this.bgGround = new _Background2.default('ground', this.width);
      this.bgSky.y = this.bgMountain.y = this.bgGround.y = this.height;
      this.addChild(this.bgSky, this.bgMountain, this.bgGround);
    }
  }, {
    key: 'createSpikes',
    value: function createSpikes() {
      var _this2 = this;

      this.spikes = [new _Spike2.default(), new _Spike2.default()];
      this.spikes[0].x = -this.spikes[0].bounds.width / 2;
      this.spikes[1].x = this.width / 2;
      this.spikes.forEach(function (spike) {
        return _this2.resetSpike(spike);
      });
      this.addChild.apply(this, _toConsumableArray(this.spikes));
    }
  }, {
    key: 'createHero',
    value: function createHero() {
      this.hero = new _Hero2.default(_dataManager2.default.heroType);
      this.hero.x = this.width / 2;
      this.hero.y = 200;
      this.addChild(this.hero);
    }
  }, {
    key: 'createHud',
    value: function createHud() {
      this.hudDistance = new createjs.Text('0 m', '25px CarterOne', '#000');
      this.hudDistance.x = 20;
      this.hudDistance.y = 15;
      this.addChild(this.hudDistance);
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

      this.addEventListener('click', function () {
        return _this3.handleAction();
      });
      this.onKeyDown = function (e) {
        switch (e.keyCode) {
          case 32:
            _this3.handleAction();
            e.preventDefault();
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
      if (this.paused) {
        this.togglePause();
      } else {
        this.hero.flap();
      }
    }
  }, {
    key: 'togglePause',
    value: function togglePause() {
      if (this.paused) {
        this.paused = false;
        this.removeChild(this.shadowOverlay);
      } else {
        this.pause('Press space or esc to unpause');
      }
    }
  }, {
    key: 'moveWorld',
    value: function moveWorld(time) {
      var path = this.speed * time;
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
      var _this4 = this;

      this.spikes.forEach(function (spike) {
        spike.x -= path;
        if (spike.x < -spike.bounds.width / 2) {
          _this4.resetSpike(spike);
          _this4.speed += 1;
        }
        if (ndgmr.checkPixelCollision(_this4.hero, spike)) {
          _this4.hero.die();
        }
      });
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

},{"../display/Background":2,"../display/Hero":4,"../display/ShadowOverlay":6,"../display/Spike":7,"../managers/dataManager":9,"../managers/screensManager":10}],14:[function(require,module,exports){
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

var _soundManager = require('../managers/soundManager');

var _soundManager2 = _interopRequireDefault(_soundManager);

var _IconBtn = require('../display/IconBtn');

var _IconBtn2 = _interopRequireDefault(_IconBtn);

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
    // for better times
    // this.title = new createjs.Text('Choose your avatar', '45px CarterOne', '#000');
    // this.title.textAlign = 'center';
    // this.title.x = this.width / 2;
    // this.title.y = 100;

    _this.startBtn = new _Btn2.default('Start');
    _this.startBtn.x = width / 2;
    _this.startBtn.y = 175 + _this.height / 2 - 80;
    // this.startBtn.disable();

    _this.addChild(_this.bg, _this.title, _this.startBtn);
    // this.createHeroes();

    var hero = new _Hero2.default('monster');
    hero.x = width / 2;
    hero.y = height / 2 - 75;
    _this.addChild(hero);

    var soundBtn = new _IconBtn2.default(_soundManager2.default.isEnabled() ? 'sound' : 'soundOff');
    soundBtn.x = _this.width - soundBtn.getBounds().width / 2 - 25;
    soundBtn.y = soundBtn.getBounds().height / 2 + 20;
    _this.addChild(soundBtn);

    soundBtn.addEventListener('click', function () {
      _soundManager2.default.toggle();
      soundBtn.changeLabel(_soundManager2.default.isEnabled() ? 'sound' : 'soundOff');
    });

    _this.bindEvents();
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
      this.heroFilter = new createjs.ColorFilter(0.6, 0.6, 0.6);
      this.resetHeroes();
      this.addChild.apply(this, _toConsumableArray(this.heroes));
    }
  }, {
    key: 'resetHeroes',
    value: function resetHeroes() {
      var _this3 = this;

      this.heroes.forEach(function (hero) {
        hero.filters = [_this3.heroFilter];
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
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      this.startBtn.addEventListener('click', function () {
        return _screensManager2.default.change('MainScreen');
      });

      this.onKeyDown = function (e) {
        if (e.keyCode === 32) {
          _screensManager2.default.change('MainScreen');
          e.preventDefault();
        }
      };

      window.addEventListener('keydown', this.onKeyDown);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      window.removeEventListener('keydown', this.onKeyDown);
    }
  }]);

  return StartScreen;
}(createjs.Container);

exports.default = StartScreen;

},{"../display/Btn":3,"../display/Hero":4,"../display/IconBtn":5,"../managers/assetsManager":8,"../managers/dataManager":9,"../managers/screensManager":10,"../managers/soundManager":11}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvc3JjL2FwcC5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9CYWNrZ3JvdW5kLmpzIiwiYXBwL2pzL3NyYy9kaXNwbGF5L0J0bi5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9IZXJvLmpzIiwiYXBwL2pzL3NyYy9kaXNwbGF5L0ljb25CdG4uanMiLCJhcHAvanMvc3JjL2Rpc3BsYXkvU2hhZG93T3ZlcmxheS5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9TcGlrZS5qcyIsImFwcC9qcy9zcmMvbWFuYWdlcnMvYXNzZXRzTWFuYWdlci5qcyIsImFwcC9qcy9zcmMvbWFuYWdlcnMvZGF0YU1hbmFnZXIuanMiLCJhcHAvanMvc3JjL21hbmFnZXJzL3NjcmVlbnNNYW5hZ2VyLmpzIiwiYXBwL2pzL3NyYy9tYW5hZ2Vycy9zb3VuZE1hbmFnZXIuanMiLCJhcHAvanMvc3JjL3NjcmVlbnMvRW5kU2NyZWVuLmpzIiwiYXBwL2pzL3NyYy9zY3JlZW5zL01haW5TY3JlZW4uanMiLCJhcHAvanMvc3JjL3NjcmVlbnMvU3RhcnRTY3JlZW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTSxRQUFRLElBQUksU0FBUyxLQUFiLENBQW1CLFlBQW5CLENBQWQ7O0FBRUEseUJBQWUsSUFBZixDQUFvQixLQUFwQjtBQUNBLHdCQUFjLElBQWQsQ0FBbUIsWUFBTTtBQUN2Qix5QkFBYSxJQUFiLENBQWtCLElBQWxCO0FBQ0EsMkJBQWUsTUFBZixDQUFzQixhQUF0Qjs7QUFFQSxNQUFJLFNBQVMsS0FBVCxDQUFlLFdBQWYsRUFBSixFQUFrQztBQUNoQyxhQUFTLEtBQVQsQ0FBZSxNQUFmLENBQXNCLEtBQXRCLEVBQTZCLElBQTdCO0FBQ0QsR0FGRCxNQUVPO0FBQ0wsVUFBTSxlQUFOLENBQXNCLEVBQXRCO0FBQ0Q7O0FBRUQsTUFBSSxXQUFXLE9BQU8sTUFBdEIsRUFBOEI7QUFDNUIsV0FBTyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQztBQUFBLGFBQU0sT0FBTyxLQUFQLEVBQU47QUFBQSxLQUFqQztBQUNEO0FBQ0YsQ0FiRDs7Ozs7Ozs7Ozs7QUNQQTs7Ozs7Ozs7Ozs7O0lBRXFCLFU7OztBQUNuQixzQkFBWSxJQUFaLEVBQWtCLFdBQWxCLEVBQStCO0FBQUE7O0FBQUE7O0FBRzdCLFVBQUssR0FBTCxHQUFXLHdCQUFjLFNBQWQsQ0FBd0IsSUFBeEIsQ0FBWDtBQUNBLFFBQU0sUUFBUSxNQUFLLEdBQUwsQ0FBUyxLQUFULEdBQWlCLFdBQS9COztBQUVBLFVBQUssUUFBTCxDQUFjLGVBQWQsQ0FBOEIsTUFBSyxHQUFuQyxFQUF3QyxVQUF4QyxFQUFvRCxRQUFwRCxDQUE2RCxDQUE3RCxFQUFnRSxDQUFoRSxFQUFtRSxLQUFuRSxFQUEwRSxNQUFLLEdBQUwsQ0FBUyxNQUFuRjtBQUNBLFVBQUssSUFBTCxHQUFZLE1BQUssR0FBTCxDQUFTLE1BQXJCO0FBQ0EsVUFBSyxLQUFMLENBQVcsQ0FBWCxFQUFjLENBQWQsRUFBaUIsS0FBakIsRUFBd0IsTUFBSyxHQUFMLENBQVMsTUFBakM7QUFSNkI7QUFTOUI7Ozs7eUJBQ0ksSSxFQUFNO0FBQ1QsV0FBSyxDQUFMLElBQVUsSUFBVjtBQUNBLFdBQUssQ0FBTCxJQUFVLEtBQUssR0FBTCxDQUFTLEtBQW5CO0FBQ0Q7Ozs7RUFkcUMsU0FBUyxLOztrQkFBNUIsVTs7Ozs7Ozs7Ozs7QUNGckI7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCLEc7OztBQUNuQixlQUFZLEtBQVosRUFBa0Q7QUFBQSxRQUEvQixLQUErQix1RUFBdkIsT0FBdUI7QUFBQSxRQUFkLElBQWMsdUVBQVAsS0FBTzs7QUFBQTs7QUFBQTs7QUFHaEQsVUFBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLFVBQUssT0FBTCxHQUFlLElBQWY7O0FBRUEsVUFBSyxRQUFMLENBQWMsSUFBZDtBQUNBLFVBQUssV0FBTCxDQUFpQixLQUFqQjs7QUFFQSxVQUFLLGdCQUFMLENBQXNCLE9BQXRCLEVBQStCO0FBQUEsYUFDN0IsTUFBSyxPQUFMLElBQWdCLHVCQUFhLFNBQWIsRUFBaEIsSUFBNEMsU0FBUyxLQUFULENBQWUsSUFBZixDQUFvQixNQUFwQixDQURmO0FBQUEsS0FBL0I7QUFUZ0Q7QUFXakQ7Ozs7NkJBQ1EsSSxFQUFNO0FBQ2IsV0FBSyxFQUFMLEdBQVUsSUFBSSxTQUFTLE1BQWIsQ0FBb0Isd0JBQWMsY0FBZCxDQUE2QixJQUE3QixDQUFwQixDQUFWO0FBQ0EsV0FBSyxFQUFMLENBQVEsSUFBUixHQUFlLEtBQUssRUFBTCxDQUFRLFNBQVIsR0FBb0IsS0FBcEIsR0FBNEIsQ0FBM0M7QUFDQSxXQUFLLEVBQUwsQ0FBUSxJQUFSLEdBQWUsS0FBSyxFQUFMLENBQVEsU0FBUixHQUFvQixNQUFwQixHQUE2QixDQUE1QztBQUNBLFdBQUssTUFBTCxHQUFjLElBQUksU0FBUyxZQUFiLENBQTBCLEtBQUssRUFBL0IsRUFBc0MsS0FBSyxLQUEzQyxVQUEwRCxLQUFLLEtBQS9ELFdBQStFLEtBQUssS0FBcEYsVUFBZDtBQUNBLFdBQUssUUFBTCxDQUFjLEtBQUssRUFBbkI7QUFDRDs7O2dDQUNXLEssRUFBTztBQUNqQixXQUFLLEtBQUwsR0FBYSxJQUFJLFNBQVMsSUFBYixDQUFrQixLQUFsQixFQUF5QixnQkFBekIsRUFBMkMsTUFBM0MsQ0FBYjtBQUNBLFdBQUssS0FBTCxDQUFXLE1BQVgsR0FBb0IsSUFBSSxTQUFTLE1BQWIsQ0FBb0IsTUFBcEIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsQ0FBcEI7QUFDQSxXQUFLLEtBQUwsQ0FBVyxTQUFYLEdBQXVCLFFBQXZCO0FBQ0EsV0FBSyxLQUFMLENBQVcsWUFBWCxHQUEwQixRQUExQjtBQUNBLFdBQUssS0FBTCxDQUFXLFlBQVgsR0FBMEIsS0FBMUI7QUFDQSxXQUFLLEtBQUwsQ0FBVyxDQUFYLEdBQWUsQ0FBQyxDQUFoQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQUssUUFBTCxDQUFjLEtBQUssS0FBbkI7QUFDRDs7OzhCQUNTO0FBQ1IsV0FBSyxFQUFMLENBQVEsV0FBUixDQUFvQixTQUFwQjtBQUNBLFdBQUssT0FBTCxHQUFlLEtBQWY7QUFDQSxXQUFLLFlBQUwsR0FBb0IsS0FBcEI7QUFDRDs7OzZCQUNRO0FBQ1AsV0FBSyxFQUFMLENBQVEsV0FBUixDQUF1QixLQUFLLEtBQTVCO0FBQ0EsV0FBSyxPQUFMLEdBQWUsSUFBZjtBQUNBLFdBQUssWUFBTCxHQUFvQixJQUFwQjtBQUNEOzs7O0VBN0M4QixTQUFTLFM7O2tCQUFyQixHOzs7Ozs7Ozs7OztBQ0hyQjs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNLFNBQVM7QUFDYixLQUFHLEdBRFU7QUFFYixLQUFHO0FBRlUsQ0FBZjs7SUFLcUIsSTs7O0FBQ25CLGdCQUFZLElBQVosRUFBa0I7QUFBQTs7QUFBQSw0R0FDVix3QkFBYyxjQUFkLENBQTZCLElBQTdCLENBRFU7O0FBR2hCLFVBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxVQUFLLE1BQUwsR0FBYyxNQUFLLFNBQUwsRUFBZDtBQUNBLFVBQUssSUFBTCxHQUFZLE1BQUssTUFBTCxDQUFZLEtBQVosR0FBb0IsQ0FBaEM7QUFDQSxVQUFLLElBQUwsR0FBWSxNQUFLLE1BQUwsQ0FBWSxNQUFaLEdBQXFCLENBQWpDOztBQUVBLFVBQUssSUFBTCxHQUFZLEtBQVo7QUFDQSxVQUFLLEVBQUwsR0FBVSxDQUFWO0FBVGdCO0FBVWpCOzs7OzJCQUNNO0FBQ0wsVUFBSSxLQUFLLElBQVQsRUFBZTtBQUNiO0FBQ0Q7QUFDRCxXQUFLLEVBQUwsR0FBVSxLQUFLLEdBQUwsQ0FBUyxLQUFLLEVBQUwsR0FBVSxPQUFPLENBQTFCLEVBQTZCLENBQUMsT0FBTyxDQUFyQyxDQUFWO0FBQ0EsV0FBSyxXQUFMLENBQWlCLE1BQWpCO0FBQ0EsVUFBSSx1QkFBYSxTQUFiLEVBQUosRUFBOEI7QUFDNUIsaUJBQVMsS0FBVCxDQUFlLElBQWYsQ0FBb0IsTUFBcEI7QUFDRDtBQUNGOzs7eUJBQ0ksSSxFQUFNO0FBQ1QsV0FBSyxDQUFMLElBQVUsQ0FBRSxPQUFPLENBQVAsR0FBVyxJQUFYLEdBQWtCLEdBQW5CLEdBQTBCLEtBQUssRUFBaEMsSUFBc0MsSUFBaEQ7QUFDQSxXQUFLLEVBQUwsSUFBVyxPQUFPLENBQVAsR0FBVyxJQUF0QjtBQUNEOzs7MEJBQ0s7QUFDSixVQUFJLEtBQUssSUFBVCxFQUFlO0FBQ2I7QUFDRDtBQUNELFdBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxXQUFLLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxXQUFLLFdBQUwsQ0FBaUIsTUFBakI7QUFDQSxVQUFJLHVCQUFhLFNBQWIsRUFBSixFQUE4QjtBQUM1QixpQkFBUyxLQUFULENBQWUsSUFBZixDQUFvQixPQUFwQjtBQUNEO0FBQ0Y7Ozs7RUFwQytCLFNBQVMsTTs7a0JBQXRCLEk7Ozs7Ozs7Ozs7O0FDUnJCOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQixPOzs7QUFDbkIsbUJBQVksS0FBWixFQUFxQztBQUFBLFFBQWxCLEtBQWtCLHVFQUFWLFFBQVU7O0FBQUE7O0FBQUEsNkdBQzdCLEtBRDZCLEVBQ3RCLEtBRHNCLEVBQ2YsU0FEZTtBQUVwQzs7OztnQ0FDVyxLLEVBQU87QUFDakIsV0FBSyxLQUFMLEdBQWEsSUFBSSxTQUFTLE1BQWIsQ0FBb0Isd0JBQWMsY0FBZCxDQUE2QixNQUE3QixDQUFwQixFQUEwRCxLQUExRCxDQUFiO0FBQ0EsV0FBSyxLQUFMLENBQVcsSUFBWCxHQUFrQixLQUFLLEtBQUwsQ0FBVyxTQUFYLEdBQXVCLEtBQXZCLEdBQStCLENBQWpEO0FBQ0EsV0FBSyxLQUFMLENBQVcsSUFBWCxHQUFrQixLQUFLLEtBQUwsQ0FBVyxTQUFYLEdBQXVCLE1BQXZCLEdBQWdDLENBQWxEO0FBQ0EsV0FBSyxLQUFMLENBQVcsWUFBWCxHQUEwQixLQUExQjtBQUNBLFdBQUssUUFBTCxDQUFjLEtBQUssS0FBbkI7QUFDRDs7O2dDQUNXLEssRUFBTztBQUNqQixXQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEtBQXZCO0FBQ0Q7Ozs7OztrQkFia0IsTzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNIQSxhOzs7QUFDbkIseUJBQVksS0FBWixFQUFtQixNQUFuQixFQUEyQjtBQUFBOztBQUFBOztBQUd6QixVQUFLLE1BQUwsR0FBYyxJQUFJLFNBQVMsS0FBYixFQUFkO0FBQ0EsVUFBSyxNQUFMLENBQVksUUFBWixDQUFxQixTQUFyQixDQUErQixvQkFBL0IsRUFBcUQsUUFBckQsQ0FBOEQsQ0FBOUQsRUFBaUUsQ0FBakUsRUFBb0UsS0FBcEUsRUFBMkUsTUFBM0U7O0FBRUEsVUFBSyxVQUFMLEdBQWtCLElBQUksU0FBUyxJQUFiLENBQWtCLEVBQWxCLEVBQXNCLGdCQUF0QixFQUF3QyxNQUF4QyxDQUFsQjtBQUNBLFVBQUssVUFBTCxDQUFnQixDQUFoQixHQUFvQixTQUFTLENBQTdCO0FBQ0EsVUFBSyxVQUFMLENBQWdCLENBQWhCLEdBQW9CLFFBQVEsQ0FBNUI7QUFDQSxVQUFLLFVBQUwsQ0FBZ0IsU0FBaEIsR0FBNEIsUUFBNUI7QUFDQSxVQUFLLFVBQUwsQ0FBZ0IsWUFBaEIsR0FBK0IsUUFBL0I7O0FBRUEsVUFBSyxRQUFMLENBQWMsTUFBSyxNQUFuQixFQUEyQixNQUFLLFVBQWhDO0FBQ0E7QUFDQTtBQWR5QjtBQWUxQjs7Ozs0QkFDTyxJLEVBQU07QUFDWixXQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsR0FBdUIsSUFBdkI7QUFDQTtBQUNEOzs7O0VBcEJ3QyxTQUFTLFM7O2tCQUEvQixhOzs7Ozs7Ozs7OztBQ0FyQjs7Ozs7Ozs7Ozs7O0lBRXFCLEs7OztBQUNuQixtQkFBYztBQUFBOztBQUFBLDhHQUNOLHdCQUFjLFNBQWQsQ0FBd0IsT0FBeEIsQ0FETTs7QUFHWixVQUFLLE1BQUwsR0FBYyxNQUFLLFNBQUwsRUFBZDtBQUNBLFVBQUssSUFBTCxHQUFZLE1BQUssTUFBTCxDQUFZLEtBQVosR0FBb0IsQ0FBaEM7QUFDQSxVQUFLLElBQUwsR0FBWSxNQUFLLE1BQUwsQ0FBWSxNQUF4QjtBQUxZO0FBTWI7Ozs7NEJBQ087QUFDTixXQUFLLE1BQUwsR0FBYyxNQUFPLEtBQUssTUFBTCxLQUFnQixHQUFyQztBQUNEOzs7O0VBVmdDLFNBQVMsTTs7a0JBQXZCLEs7Ozs7Ozs7O0FDRnJCLElBQU0sV0FBVyxDQUNmLEVBQUUsSUFBSSxTQUFOLEVBQWlCLEtBQUssd0JBQXRCLEVBRGUsRUFFZixFQUFFLElBQUksTUFBTixFQUFjLEtBQUsscUJBQW5CLEVBRmUsRUFHZixFQUFFLElBQUksU0FBTixFQUFpQixLQUFLLHdCQUF0QixFQUhlLEVBSWYsRUFBRSxJQUFJLE9BQU4sRUFBZSxLQUFLLGVBQXBCLEVBSmUsRUFLZixFQUFFLElBQUksS0FBTixFQUFhLEtBQUssZ0JBQWxCLEVBTGUsRUFNZixFQUFFLElBQUksT0FBTixFQUFlLEtBQUssa0JBQXBCLEVBTmUsRUFPZixFQUFFLElBQUksVUFBTixFQUFrQixLQUFLLHFCQUF2QixFQVBlLEVBUWYsRUFBRSxJQUFJLFFBQU4sRUFBZ0IsS0FBSyxtQkFBckIsRUFSZSxFQVNmLEVBQUUsSUFBSSxLQUFOLEVBQWEsS0FBSyxvQkFBbEIsRUFUZSxFQVVmLEVBQUUsSUFBSSxVQUFOLEVBQWtCLEtBQUsseUJBQXZCLEVBVmUsRUFXZixFQUFFLElBQUksTUFBTixFQUFjLEtBQUsscUJBQW5CLEVBWGUsRUFZZixFQUFFLElBQUksTUFBTixFQUFjLEtBQUssc0JBQW5CLEVBWmUsRUFhZixFQUFFLElBQUksTUFBTixFQUFjLEtBQUssZ0JBQW5CLEVBYmUsRUFjZixFQUFFLElBQUksT0FBTixFQUFlLEtBQUssaUJBQXBCLEVBZGUsQ0FBakI7O0FBaUJBLElBQU0seUJBQXlCLFNBQXpCLHNCQUF5QjtBQUFBLFNBQVM7QUFDdEMsWUFBUSxDQUFDLElBQUQsQ0FEOEI7QUFFdEMsWUFBUSxFQUFFLE9BQU8sR0FBVCxFQUFjLFFBQVEsRUFBdEIsRUFGOEI7QUFHdEMsZ0JBQVk7QUFDVixXQUFLLENBREs7QUFFVixZQUFNLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxLQUFQLENBRkk7QUFHVixZQUFNO0FBSEk7QUFIMEIsR0FBVDtBQUFBLENBQS9COztBQVVBLElBQU0sbUJBQW1CO0FBQ3ZCLFFBQU0sdUJBQXVCLE1BQXZCLENBRGlCO0FBRXZCLFdBQVMsdUJBQXVCLFNBQXZCLENBRmM7QUFHdkIsV0FBUyx1QkFBdUIsU0FBdkIsQ0FIYztBQUl2QixPQUFLO0FBQ0gsWUFBUSxDQUFDLEtBQUQsQ0FETDtBQUVILFlBQVEsRUFBRSxPQUFPLEdBQVQsRUFBYyxRQUFRLEVBQXRCLEVBQTBCLFNBQVMsQ0FBbkMsRUFGTDtBQUdILGdCQUFZO0FBQ1YsZ0JBQVUsQ0FEQTtBQUVWLGlCQUFXLENBRkQ7QUFHVixpQkFBVyxDQUhEO0FBSVYsaUJBQVcsQ0FKRDtBQUtWLGtCQUFZLENBTEY7QUFNVixrQkFBWSxDQU5GO0FBT1YsY0FBUSxDQVBFO0FBUVYsZUFBUyxDQVJDO0FBU1YsZUFBUyxDQVRDO0FBVVYsZUFBUztBQVZDO0FBSFQsR0FKa0I7QUFvQnZCLFdBQVM7QUFDUCxZQUFRLENBQUMsVUFBRCxDQUREO0FBRVAsWUFBUSxFQUFFLE9BQU8sRUFBVCxFQUFhLFFBQVEsRUFBckIsRUFBeUIsU0FBUyxDQUFsQyxFQUZEO0FBR1AsZ0JBQVk7QUFDVixnQkFBVSxDQURBO0FBRVYsaUJBQVcsQ0FGRDtBQUdWLGlCQUFXLENBSEQ7QUFJVixpQkFBVyxDQUpEO0FBS1Ysa0JBQVksQ0FMRjtBQU1WLGtCQUFZLENBTkY7QUFPVixjQUFRLENBUEU7QUFRVixlQUFTLENBUkM7QUFTVixlQUFTLENBVEM7QUFVVixlQUFTO0FBVkM7QUFITCxHQXBCYztBQW9DdkIsUUFBTTtBQUNKLFlBQVEsQ0FBQyxNQUFELENBREo7QUFFSixZQUFRLEVBQUUsT0FBTyxFQUFULEVBQWEsUUFBUSxFQUFyQixFQUZKO0FBR0osZ0JBQVk7QUFDVixhQUFPLENBREc7QUFFVixnQkFBVTtBQUZBO0FBSFI7QUFwQ2lCLENBQXpCOztBQThDQSxJQUFNLGVBQWUsRUFBckI7O0FBRUEsSUFBTSxnQkFBZ0I7QUFDcEIsTUFEb0IsZ0JBQ2YsUUFEZSxFQUNMO0FBQ2IsYUFBUyxLQUFULENBQWUsbUJBQWYsR0FBcUMsQ0FBQyxLQUFELENBQXJDO0FBQ0EsU0FBSyxLQUFMLEdBQWEsSUFBSSxTQUFTLFNBQWIsRUFBYjtBQUNBLFNBQUssS0FBTCxDQUFXLGFBQVgsQ0FBeUIsU0FBUyxLQUFsQztBQUNBLFNBQUssS0FBTCxDQUFXLFlBQVgsQ0FBd0IsUUFBeEI7QUFDQSxTQUFLLEtBQUwsQ0FBVyxnQkFBWCxDQUE0QixVQUE1QixFQUF3QyxRQUF4QztBQUNELEdBUG1CO0FBUXBCLFdBUm9CLHFCQVFWLElBUlUsRUFRSjtBQUNkLFdBQU8sS0FBSyxLQUFMLENBQVcsU0FBWCxDQUFxQixJQUFyQixDQUFQO0FBQ0QsR0FWbUI7QUFXcEIsZ0JBWG9CLDBCQVdMLElBWEssRUFXQztBQUFBOztBQUNuQixRQUFJLENBQUMsYUFBYSxJQUFiLENBQUwsRUFBeUI7QUFDdkIsVUFBTSxPQUFPLGlCQUFpQixJQUFqQixDQUFiOztBQUVBLFVBQUksQ0FBQyxJQUFMLEVBQVc7QUFDVCxjQUFNLElBQUksS0FBSixDQUFVLDBCQUFWLENBQU47QUFDRDs7QUFFRCxXQUFLLE1BQUwsR0FBYyxLQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCO0FBQUEsZUFBTyxNQUFLLFNBQUwsQ0FBZSxHQUFmLENBQVA7QUFBQSxPQUFoQixDQUFkO0FBQ0EsbUJBQWEsSUFBYixJQUFxQixJQUFJLFNBQVMsV0FBYixDQUF5QixJQUF6QixDQUFyQjtBQUNEOztBQUVELFdBQU8sYUFBYSxJQUFiLENBQVA7QUFDRDtBQXhCbUIsQ0FBdEI7O2tCQTJCZSxhOzs7Ozs7OztBQ3RHZixJQUFNLGNBQWM7QUFDbEIsWUFBVSxTQURRO0FBRWxCLFNBQU8sQ0FGVztBQUdsQixZQUFVO0FBSFEsQ0FBcEI7O2tCQU1lLFc7Ozs7Ozs7OztBQ05mOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTSxnQkFBZ0I7QUFDcEIsTUFEb0IsZ0JBQ2YsS0FEZSxFQUNSO0FBQUE7O0FBQ1YsU0FBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLFNBQUssYUFBTCxHQUFxQixJQUFyQjtBQUNBLFNBQUssT0FBTCxHQUFlO0FBQ2Isd0NBRGE7QUFFYixzQ0FGYTtBQUdiO0FBSGEsS0FBZjs7QUFNQSxhQUFTLE1BQVQsQ0FBZ0IsVUFBaEIsR0FBNkIsU0FBUyxNQUFULENBQWdCLEdBQTdDO0FBQ0EsYUFBUyxNQUFULENBQWdCLGdCQUFoQixDQUFpQyxNQUFqQyxFQUF5QyxhQUFLO0FBQzVDLFVBQUksTUFBSyxhQUFMLElBQXNCLE1BQUssYUFBTCxDQUFtQixJQUE3QyxFQUFtRDtBQUNqRCxjQUFLLGFBQUwsQ0FBbUIsSUFBbkIsQ0FBd0IsQ0FBeEI7QUFDRDtBQUNELFlBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsQ0FBbEI7QUFDRCxLQUxEO0FBTUQsR0FqQm1CO0FBa0JwQixRQWxCb0Isa0JBa0JiLElBbEJhLEVBa0JQO0FBQ1gsUUFBSSxLQUFLLGFBQVQsRUFBd0I7QUFDdEIsVUFBSSxLQUFLLGFBQUwsQ0FBbUIsT0FBdkIsRUFBZ0M7QUFDOUIsYUFBSyxhQUFMLENBQW1CLE9BQW5CO0FBQ0Q7QUFDRCxXQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEtBQUssYUFBNUI7QUFDRDtBQUNELFNBQUssYUFBTCxHQUFxQixJQUFJLEtBQUssT0FBTCxDQUFhLElBQWIsQ0FBSixDQUF1QixLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLEtBQXpDLEVBQWdELEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsTUFBbEUsQ0FBckI7QUFDQSxTQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLEtBQUssYUFBekI7QUFDRDtBQTNCbUIsQ0FBdEI7O2tCQThCZSxhOzs7Ozs7OztBQ2xDZixJQUFNLGVBQWU7QUFDbkIsTUFEbUIsZ0JBQ2QsT0FEYyxFQUNMO0FBQ1osU0FBSyxPQUFMLEdBQWUsT0FBZjtBQUNBLFNBQUssRUFBTCxHQUFVLFNBQVMsS0FBVCxDQUFlLElBQWYsQ0FBb0IsTUFBcEIsRUFBNEIsRUFBRSxNQUFNLENBQUMsQ0FBVCxFQUFZLFFBQVEsR0FBcEIsRUFBNUIsQ0FBVjtBQUNBLFNBQUssRUFBTCxDQUFRLE1BQVIsR0FBaUIsQ0FBQyxLQUFLLE9BQXZCO0FBQ0QsR0FMa0I7QUFNbkIsUUFObUIsb0JBTVY7QUFDUCxTQUFLLE9BQUwsR0FBZSxDQUFDLEtBQUssT0FBckI7QUFDQSxTQUFLLEVBQUwsQ0FBUSxNQUFSLEdBQWlCLENBQUMsS0FBSyxPQUF2QjtBQUNELEdBVGtCO0FBVW5CLFdBVm1CLHVCQVVQO0FBQ1YsV0FBTyxLQUFLLE9BQVo7QUFDRDtBQVprQixDQUFyQjs7a0JBZWUsWTs7Ozs7Ozs7Ozs7QUNmZjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQixTOzs7QUFDbkIscUJBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBOztBQUdqQixVQUFLLEVBQUwsR0FBVSxJQUFJLFNBQVMsTUFBYixDQUFvQix3QkFBYyxTQUFkLENBQXdCLE9BQXhCLENBQXBCLENBQVY7QUFDQSxVQUFLLEtBQUwsR0FBYSxJQUFJLFNBQVMsSUFBYixhQUE0QixzQkFBWSxLQUF4QyxFQUFpRCxnQkFBakQsRUFBbUUsTUFBbkUsQ0FBYjtBQUNBLFVBQUssUUFBTCxHQUFnQixJQUFJLFNBQVMsSUFBYixrQkFBaUMsc0JBQVksUUFBN0MsRUFBeUQsZ0JBQXpELEVBQTJFLE1BQTNFLENBQWhCO0FBQ0EsVUFBSyxLQUFMLENBQVcsQ0FBWCxHQUFlLE1BQUssUUFBTCxDQUFjLENBQWQsR0FBa0IsUUFBUSxDQUF6QztBQUNBLFVBQUssS0FBTCxDQUFXLFNBQVgsR0FBdUIsTUFBSyxRQUFMLENBQWMsU0FBZCxHQUEwQixRQUFqRDtBQUNBLFVBQUssS0FBTCxDQUFXLENBQVgsR0FBZSxHQUFmO0FBQ0EsVUFBSyxRQUFMLENBQWMsQ0FBZCxHQUFrQixHQUFsQjs7QUFFQSxVQUFLLFNBQUwsR0FBaUIsa0JBQVEsU0FBUixDQUFqQjtBQUNBO0FBQ0EsVUFBSyxTQUFMLENBQWUsQ0FBZixHQUFtQixRQUFRLENBQTNCO0FBQ0E7QUFDQSxVQUFLLFNBQUwsQ0FBZSxDQUFmLEdBQW1CLEdBQW5COztBQUVBLFVBQUssUUFBTCxDQUFjLE1BQUssRUFBbkIsRUFBdUIsTUFBSyxLQUE1QixFQUFtQyxNQUFLLFFBQXhDLEVBQWtELE1BQUssU0FBdkQ7O0FBRUEsUUFBTSxXQUFXLHNCQUFZLHVCQUFhLFNBQWIsS0FBMkIsT0FBM0IsR0FBcUMsVUFBakQsQ0FBakI7QUFDQSxhQUFTLENBQVQsR0FBYSxRQUFRLFNBQVMsU0FBVCxHQUFxQixLQUFyQixHQUE2QixDQUFyQyxHQUF5QyxFQUF0RDtBQUNBLGFBQVMsQ0FBVCxHQUFhLFNBQVMsU0FBVCxHQUFxQixNQUFyQixHQUE4QixDQUE5QixHQUFrQyxFQUEvQztBQUNBLFVBQUssUUFBTCxDQUFjLFFBQWQ7O0FBRUEsYUFBUyxnQkFBVCxDQUEwQixPQUExQixFQUFtQyxZQUFNO0FBQ3ZDLDZCQUFhLE1BQWI7QUFDQSxlQUFTLFdBQVQsQ0FBcUIsdUJBQWEsU0FBYixLQUEyQixPQUEzQixHQUFxQyxVQUExRDtBQUNELEtBSEQ7O0FBS0EsVUFBSyxVQUFMO0FBN0JpQjtBQThCbEI7Ozs7aUNBQ1k7QUFDWCxXQUFLLFNBQUwsQ0FBZSxnQkFBZixDQUFnQyxPQUFoQyxFQUF5QztBQUFBLGVBQU0seUJBQWUsTUFBZixDQUFzQixZQUF0QixDQUFOO0FBQUEsT0FBekM7QUFDQTs7QUFFQSxXQUFLLFNBQUwsR0FBaUIsYUFBSztBQUNwQixZQUFJLEVBQUUsT0FBRixLQUFjLEVBQWxCLEVBQXNCO0FBQ3BCLG1DQUFlLE1BQWYsQ0FBc0IsWUFBdEI7QUFDQSxZQUFFLGNBQUY7QUFDRDtBQUNGLE9BTEQ7O0FBT0EsYUFBTyxnQkFBUCxDQUF3QixTQUF4QixFQUFtQyxLQUFLLFNBQXhDO0FBQ0Q7Ozs4QkFDUztBQUNSLGFBQU8sbUJBQVAsQ0FBMkIsU0FBM0IsRUFBc0MsS0FBSyxTQUEzQztBQUNEOzs7O0VBL0NvQyxTQUFTLFM7O2tCQUEzQixTOzs7Ozs7Ozs7OztBQ1ByQjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTSxnQkFBZ0IsRUFBdEI7O0lBRXFCLFU7OztBQUNuQixzQkFBWSxLQUFaLEVBQW1CLE1BQW5CLEVBQTJCO0FBQUE7O0FBQUE7O0FBR3pCLFVBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxVQUFLLE1BQUwsR0FBYyxNQUFkOztBQUVBLFVBQUssS0FBTCxHQUFhLEdBQWI7QUFDQSxVQUFLLFFBQUwsR0FBZ0IsQ0FBaEI7QUFDQSxVQUFLLGFBQUwsR0FBcUIsNEJBQWtCLE1BQUssS0FBdkIsRUFBOEIsTUFBSyxNQUFuQyxDQUFyQjs7QUFFQSxVQUFLLFFBQUw7QUFDQSxVQUFLLFlBQUw7QUFDQSxVQUFLLFVBQUw7QUFDQSxVQUFLLFNBQUw7O0FBRUEsVUFBSyxLQUFMLENBQVcsbUNBQVg7QUFDQSxVQUFLLFVBQUw7QUFoQnlCO0FBaUIxQjs7OzsrQkFDVTtBQUNULFdBQUssS0FBTCxHQUFhLHlCQUFlLEtBQWYsRUFBc0IsS0FBSyxLQUEzQixDQUFiO0FBQ0EsV0FBSyxVQUFMLEdBQWtCLHlCQUFlLFVBQWYsRUFBMkIsS0FBSyxLQUFoQyxDQUFsQjtBQUNBLFdBQUssUUFBTCxHQUFnQix5QkFBZSxRQUFmLEVBQXlCLEtBQUssS0FBOUIsQ0FBaEI7QUFDQSxXQUFLLEtBQUwsQ0FBVyxDQUFYLEdBQWUsS0FBSyxVQUFMLENBQWdCLENBQWhCLEdBQW9CLEtBQUssUUFBTCxDQUFjLENBQWQsR0FBa0IsS0FBSyxNQUExRDtBQUNBLFdBQUssUUFBTCxDQUFjLEtBQUssS0FBbkIsRUFBMEIsS0FBSyxVQUEvQixFQUEyQyxLQUFLLFFBQWhEO0FBQ0Q7OzttQ0FDYztBQUFBOztBQUNiLFdBQUssTUFBTCxHQUFjLENBQUMscUJBQUQsRUFBYyxxQkFBZCxDQUFkO0FBQ0EsV0FBSyxNQUFMLENBQVksQ0FBWixFQUFlLENBQWYsR0FBbUIsQ0FBQyxLQUFLLE1BQUwsQ0FBWSxDQUFaLEVBQWUsTUFBZixDQUFzQixLQUF2QixHQUErQixDQUFsRDtBQUNBLFdBQUssTUFBTCxDQUFZLENBQVosRUFBZSxDQUFmLEdBQW1CLEtBQUssS0FBTCxHQUFhLENBQWhDO0FBQ0EsV0FBSyxNQUFMLENBQVksT0FBWixDQUFvQjtBQUFBLGVBQVMsT0FBSyxVQUFMLENBQWdCLEtBQWhCLENBQVQ7QUFBQSxPQUFwQjtBQUNBLFdBQUssUUFBTCxnQ0FBaUIsS0FBSyxNQUF0QjtBQUNEOzs7aUNBQ1k7QUFDWCxXQUFLLElBQUwsR0FBWSxtQkFBUyxzQkFBWSxRQUFyQixDQUFaO0FBQ0EsV0FBSyxJQUFMLENBQVUsQ0FBVixHQUFjLEtBQUssS0FBTCxHQUFhLENBQTNCO0FBQ0EsV0FBSyxJQUFMLENBQVUsQ0FBVixHQUFjLEdBQWQ7QUFDQSxXQUFLLFFBQUwsQ0FBYyxLQUFLLElBQW5CO0FBQ0Q7OztnQ0FDVztBQUNWLFdBQUssV0FBTCxHQUFtQixJQUFJLFNBQVMsSUFBYixDQUFrQixLQUFsQixFQUF5QixnQkFBekIsRUFBMkMsTUFBM0MsQ0FBbkI7QUFDQSxXQUFLLFdBQUwsQ0FBaUIsQ0FBakIsR0FBcUIsRUFBckI7QUFDQSxXQUFLLFdBQUwsQ0FBaUIsQ0FBakIsR0FBcUIsRUFBckI7QUFDQSxXQUFLLFFBQUwsQ0FBYyxLQUFLLFdBQW5CO0FBQ0Q7OzsrQkFDVSxLLEVBQU87QUFDaEIsWUFBTSxLQUFOO0FBQ0EsWUFBTSxDQUFOLElBQVcsS0FBSyxLQUFMLEdBQWEsTUFBTSxNQUFOLENBQWEsS0FBckM7QUFDQSxVQUFJLEtBQUssTUFBTCxLQUFnQixHQUFwQixFQUF5QjtBQUN2QixjQUFNLENBQU4sR0FBVSxLQUFLLE1BQUwsR0FBYyxhQUF4QjtBQUNBLGNBQU0sUUFBTixHQUFpQixDQUFqQjtBQUNELE9BSEQsTUFHTztBQUNMLGNBQU0sQ0FBTixHQUFVLENBQVY7QUFDQSxjQUFNLFFBQU4sR0FBaUIsR0FBakI7QUFDRDtBQUNGOzs7MEJBQ0ssSSxFQUFNO0FBQ1YsV0FBSyxNQUFMLEdBQWMsSUFBZDtBQUNBLFdBQUssYUFBTCxDQUFtQixPQUFuQixDQUEyQixJQUEzQjtBQUNBLFdBQUssUUFBTCxDQUFjLEtBQUssYUFBbkI7QUFDRDs7O2lDQUNZO0FBQUE7O0FBQ1gsV0FBSyxnQkFBTCxDQUFzQixPQUF0QixFQUErQjtBQUFBLGVBQU0sT0FBSyxZQUFMLEVBQU47QUFBQSxPQUEvQjtBQUNBLFdBQUssU0FBTCxHQUFpQixhQUFLO0FBQ3BCLGdCQUFRLEVBQUUsT0FBVjtBQUNFLGVBQUssRUFBTDtBQUNFLG1CQUFLLFlBQUw7QUFDQSxjQUFFLGNBQUY7QUFDQTtBQUNGLGVBQUssRUFBTDtBQUNFLG1CQUFLLFdBQUw7QUFDQTtBQVBKO0FBU0QsT0FWRDtBQVdBLFdBQUssWUFBTCxHQUFvQixhQUFLO0FBQ3ZCLFVBQUUsY0FBRjtBQUNBLGVBQUssWUFBTDtBQUNELE9BSEQ7O0FBS0EsYUFBTyxnQkFBUCxDQUF3QixTQUF4QixFQUFtQyxLQUFLLFNBQXhDO0FBQ0EsYUFBTyxnQkFBUCxDQUF3QixZQUF4QixFQUFzQyxLQUFLLFlBQTNDO0FBQ0Q7OzttQ0FDYztBQUNiLFVBQUksS0FBSyxNQUFULEVBQWlCO0FBQ2YsYUFBSyxXQUFMO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBSyxJQUFMLENBQVUsSUFBVjtBQUNEO0FBQ0Y7OztrQ0FDYTtBQUNaLFVBQUksS0FBSyxNQUFULEVBQWlCO0FBQ2YsYUFBSyxNQUFMLEdBQWMsS0FBZDtBQUNBLGFBQUssV0FBTCxDQUFpQixLQUFLLGFBQXRCO0FBQ0QsT0FIRCxNQUdPO0FBQ0wsYUFBSyxLQUFMLENBQVcsK0JBQVg7QUFDRDtBQUNGOzs7OEJBQ1MsSSxFQUFNO0FBQ2QsVUFBTSxPQUFPLEtBQUssS0FBTCxHQUFhLElBQTFCO0FBQ0EsVUFBSSxLQUFLLElBQUwsQ0FBVSxJQUFkLEVBQW9CO0FBQ2xCLGFBQUssSUFBTCxDQUFVLENBQVYsSUFBZSxPQUFPLEdBQXRCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBSyxVQUFMLENBQWdCLElBQWhCO0FBQ0EsYUFBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixPQUFPLEdBQXZCO0FBQ0EsYUFBSyxVQUFMLENBQWdCLElBQWhCLENBQXFCLE9BQU8sR0FBNUI7QUFDQSxhQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLElBQW5COztBQUVBLGFBQUssUUFBTCxJQUFpQixJQUFqQjtBQUNBLDhCQUFZLEtBQVosR0FBb0IsS0FBSyxLQUFMLENBQVcsS0FBSyxRQUFMLEdBQWdCLEVBQTNCLENBQXBCO0FBQ0EsYUFBSyxXQUFMLENBQWlCLElBQWpCLEdBQTJCLHNCQUFZLEtBQXZDO0FBQ0Q7QUFDRjs7OytCQUNVLEksRUFBTTtBQUFBOztBQUNmLFdBQUssTUFBTCxDQUFZLE9BQVosQ0FBb0IsaUJBQVM7QUFDM0IsY0FBTSxDQUFOLElBQVcsSUFBWDtBQUNBLFlBQUksTUFBTSxDQUFOLEdBQVUsQ0FBQyxNQUFNLE1BQU4sQ0FBYSxLQUFkLEdBQXNCLENBQXBDLEVBQXVDO0FBQ3JDLGlCQUFLLFVBQUwsQ0FBZ0IsS0FBaEI7QUFDQSxpQkFBSyxLQUFMLElBQWMsQ0FBZDtBQUNEO0FBQ0QsWUFBSSxNQUFNLG1CQUFOLENBQTBCLE9BQUssSUFBL0IsRUFBcUMsS0FBckMsQ0FBSixFQUFpRDtBQUMvQyxpQkFBSyxJQUFMLENBQVUsR0FBVjtBQUNEO0FBQ0YsT0FURDtBQVVEOzs7NkJBQ1EsSSxFQUFNO0FBQ2IsV0FBSyxJQUFMLENBQVUsSUFBVixDQUFlLElBQWY7QUFDQSxVQUFJLEtBQUssSUFBTCxDQUFVLENBQVYsR0FBYyxDQUFsQixFQUFxQjtBQUNuQixhQUFLLElBQUwsQ0FBVSxFQUFWLEdBQWUsQ0FBZjtBQUNBLGFBQUssSUFBTCxDQUFVLENBQVYsR0FBYyxDQUFkO0FBQ0QsT0FIRCxNQUdPLElBQUksS0FBSyxJQUFMLENBQVUsQ0FBVixHQUFjLEtBQUssTUFBTCxHQUFjLEtBQUssSUFBTCxDQUFVLE1BQVYsQ0FBaUIsTUFBakIsR0FBMEIsQ0FBMUQsRUFBNkQ7QUFDbEUsOEJBQVksUUFBWixHQUF1QixLQUFLLEdBQUwsQ0FBUyxzQkFBWSxRQUFyQixFQUErQixzQkFBWSxLQUEzQyxDQUF2QjtBQUNBLGlDQUFlLE1BQWYsQ0FBc0IsV0FBdEI7QUFDRCxPQUhNLE1BR0EsSUFBSSxLQUFLLElBQUwsQ0FBVSxDQUFWLEdBQWMsS0FBSyxNQUFMLElBQWUsZ0JBQWdCLEtBQUssSUFBTCxDQUFVLE1BQVYsQ0FBaUIsTUFBakIsR0FBMEIsQ0FBekQsQ0FBbEIsRUFBK0U7QUFDcEYsYUFBSyxJQUFMLENBQVUsR0FBVjtBQUNEO0FBQ0Y7Ozt5QkFDSSxDLEVBQUc7QUFDTixVQUFNLE1BQU0sRUFBRSxLQUFGLEdBQVUsS0FBdEI7QUFDQSxVQUFJLEtBQUssTUFBTCxJQUFlLE1BQU0sR0FBekIsRUFBOEI7QUFDNUI7QUFDRDtBQUNELFdBQUssU0FBTCxDQUFlLEdBQWY7QUFDQSxXQUFLLFFBQUwsQ0FBYyxHQUFkO0FBQ0Q7Ozs4QkFDUztBQUNSLGFBQU8sbUJBQVAsQ0FBMkIsU0FBM0IsRUFBc0MsS0FBSyxTQUEzQztBQUNBLGFBQU8sbUJBQVAsQ0FBMkIsWUFBM0IsRUFBeUMsS0FBSyxZQUE5QztBQUNEOzs7O0VBbkpxQyxTQUFTLFM7O2tCQUE1QixVOzs7Ozs7Ozs7OztBQ1RyQjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUIsVzs7O0FBQ25CLHVCQUFZLEtBQVosRUFBbUIsTUFBbkIsRUFBMkI7QUFBQTs7QUFBQTs7QUFHekIsVUFBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLFVBQUssTUFBTCxHQUFjLE1BQWQ7O0FBRUEsVUFBSyxFQUFMLEdBQVUsSUFBSSxTQUFTLE1BQWIsQ0FBb0Isd0JBQWMsU0FBZCxDQUF3QixPQUF4QixDQUFwQixDQUFWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFLLFFBQUwsR0FBZ0Isa0JBQVEsT0FBUixDQUFoQjtBQUNBLFVBQUssUUFBTCxDQUFjLENBQWQsR0FBa0IsUUFBUSxDQUExQjtBQUNBLFVBQUssUUFBTCxDQUFjLENBQWQsR0FBa0IsTUFBTSxNQUFLLE1BQUwsR0FBYyxDQUFwQixHQUF3QixFQUExQztBQUNBOztBQUVBLFVBQUssUUFBTCxDQUFjLE1BQUssRUFBbkIsRUFBdUIsTUFBSyxLQUE1QixFQUFtQyxNQUFLLFFBQXhDO0FBQ0E7O0FBRUEsUUFBTSxPQUFPLG1CQUFTLFNBQVQsQ0FBYjtBQUNBLFNBQUssQ0FBTCxHQUFTLFFBQVEsQ0FBakI7QUFDQSxTQUFLLENBQUwsR0FBUyxTQUFTLENBQVQsR0FBYSxFQUF0QjtBQUNBLFVBQUssUUFBTCxDQUFjLElBQWQ7O0FBRUEsUUFBTSxXQUFXLHNCQUFZLHVCQUFhLFNBQWIsS0FBMkIsT0FBM0IsR0FBcUMsVUFBakQsQ0FBakI7QUFDQSxhQUFTLENBQVQsR0FBYSxNQUFLLEtBQUwsR0FBYSxTQUFTLFNBQVQsR0FBcUIsS0FBckIsR0FBNkIsQ0FBMUMsR0FBOEMsRUFBM0Q7QUFDQSxhQUFTLENBQVQsR0FBYSxTQUFTLFNBQVQsR0FBcUIsTUFBckIsR0FBOEIsQ0FBOUIsR0FBa0MsRUFBL0M7QUFDQSxVQUFLLFFBQUwsQ0FBYyxRQUFkOztBQUVBLGFBQVMsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUMsWUFBTTtBQUN2Qyw2QkFBYSxNQUFiO0FBQ0EsZUFBUyxXQUFULENBQXFCLHVCQUFhLFNBQWIsS0FBMkIsT0FBM0IsR0FBcUMsVUFBMUQ7QUFDRCxLQUhEOztBQUtBLFVBQUssVUFBTDtBQXBDeUI7QUFxQzFCOzs7O21DQUNjO0FBQUE7O0FBQ2IsV0FBSyxNQUFMLEdBQWMsQ0FDWixtQkFBUyxNQUFULENBRFksRUFFWixtQkFBUyxTQUFULENBRlksRUFHWixtQkFBUyxTQUFULENBSFksQ0FBZDtBQUtBLFdBQUssTUFBTCxDQUFZLE9BQVosQ0FBb0IsVUFBQyxJQUFELEVBQU8sQ0FBUCxFQUFhO0FBQy9CLGFBQUssQ0FBTCxHQUFTLE9BQUssTUFBTCxHQUFjLENBQXZCO0FBQ0EsYUFBSyxDQUFMLEdBQVMsQ0FBQyxJQUFJLENBQUwsSUFBVSxPQUFLLEtBQWYsSUFBd0IsT0FBSyxNQUFMLENBQVksTUFBWixHQUFxQixDQUE3QyxDQUFUO0FBQ0EsYUFBSyxNQUFMLEdBQWMsU0FBZDtBQUNBLGFBQUssZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0I7QUFBQSxpQkFBTSxPQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsQ0FBTjtBQUFBLFNBQS9CO0FBQ0EsYUFBSyxLQUFMLENBQVcsQ0FBWCxFQUFjLENBQWQsRUFBaUIsS0FBSyxNQUFMLENBQVksS0FBN0IsRUFBb0MsS0FBSyxNQUFMLENBQVksTUFBaEQ7QUFDRCxPQU5EO0FBT0EsV0FBSyxVQUFMLEdBQWtCLElBQUksU0FBUyxXQUFiLENBQXlCLEdBQXpCLEVBQThCLEdBQTlCLEVBQW1DLEdBQW5DLENBQWxCO0FBQ0EsV0FBSyxXQUFMO0FBQ0EsV0FBSyxRQUFMLGdDQUFpQixLQUFLLE1BQXRCO0FBQ0Q7OztrQ0FDYTtBQUFBOztBQUNaLFdBQUssTUFBTCxDQUFZLE9BQVosQ0FBb0IsZ0JBQVE7QUFDMUIsYUFBSyxPQUFMLEdBQWUsQ0FBQyxPQUFLLFVBQU4sQ0FBZjtBQUNBLGFBQUssV0FBTDtBQUNBLGFBQUssTUFBTCxHQUFjLElBQWQ7QUFDQSxhQUFLLE1BQUwsR0FBYyxJQUFkO0FBQ0QsT0FMRDtBQU1EOzs7K0JBQ1UsSSxFQUFNO0FBQ2YsV0FBSyxXQUFMOztBQUVBLFdBQUssT0FBTCxHQUFlLEVBQWY7QUFDQSxXQUFLLFdBQUw7QUFDQSxXQUFLLE1BQUwsR0FBYyxDQUFkO0FBQ0EsV0FBSyxNQUFMLEdBQWMsQ0FBZDtBQUNBLFdBQUssSUFBTDs7QUFFQSxVQUFJLENBQUMsS0FBSyxRQUFMLENBQWMsT0FBbkIsRUFBNEI7QUFDMUIsYUFBSyxRQUFMLENBQWMsTUFBZDtBQUNEOztBQUVELDRCQUFZLFFBQVosR0FBdUIsS0FBSyxJQUE1QjtBQUNEOzs7aUNBQ1k7QUFDWCxXQUFLLFFBQUwsQ0FBYyxnQkFBZCxDQUErQixPQUEvQixFQUF3QztBQUFBLGVBQ3RDLHlCQUFlLE1BQWYsQ0FBc0IsWUFBdEIsQ0FEc0M7QUFBQSxPQUF4Qzs7QUFHQSxXQUFLLFNBQUwsR0FBaUIsYUFBSztBQUNwQixZQUFJLEVBQUUsT0FBRixLQUFjLEVBQWxCLEVBQXNCO0FBQ3BCLG1DQUFlLE1BQWYsQ0FBc0IsWUFBdEI7QUFDQSxZQUFFLGNBQUY7QUFDRDtBQUNGLE9BTEQ7O0FBT0EsYUFBTyxnQkFBUCxDQUF3QixTQUF4QixFQUFtQyxLQUFLLFNBQXhDO0FBQ0Q7Ozs4QkFDUztBQUNSLGFBQU8sbUJBQVAsQ0FBMkIsU0FBM0IsRUFBc0MsS0FBSyxTQUEzQztBQUNEOzs7O0VBOUZzQyxTQUFTLFM7O2tCQUE3QixXIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBzY3JlZW5zTWFuYWdlciBmcm9tICcuL21hbmFnZXJzL3NjcmVlbnNNYW5hZ2VyJztcbmltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4vbWFuYWdlcnMvYXNzZXRzTWFuYWdlcic7XG5pbXBvcnQgc291bmRNYW5hZ2VyIGZyb20gJy4vbWFuYWdlcnMvc291bmRNYW5hZ2VyJztcblxuY29uc3Qgc3RhZ2UgPSBuZXcgY3JlYXRlanMuU3RhZ2UoJ2dhbWUtc3RhZ2UnKTtcblxuc2NyZWVuc01hbmFnZXIuaW5pdChzdGFnZSk7XG5hc3NldHNNYW5hZ2VyLmxvYWQoKCkgPT4ge1xuICBzb3VuZE1hbmFnZXIuaW5pdCh0cnVlKTtcbiAgc2NyZWVuc01hbmFnZXIuY2hhbmdlKCdTdGFydFNjcmVlbicpO1xuXG4gIGlmIChjcmVhdGVqcy5Ub3VjaC5pc1N1cHBvcnRlZCgpKSB7XG4gICAgY3JlYXRlanMuVG91Y2guZW5hYmxlKHN0YWdlLCB0cnVlKTtcbiAgfSBlbHNlIHtcbiAgICBzdGFnZS5lbmFibGVNb3VzZU92ZXIoMjApO1xuICB9XG5cbiAgaWYgKHdpbmRvdyAhPT0gd2luZG93LnBhcmVudCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHdpbmRvdy5mb2N1cygpKTtcbiAgfVxufSk7XG4iLCJpbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFja2dyb3VuZCBleHRlbmRzIGNyZWF0ZWpzLlNoYXBlIHtcbiAgY29uc3RydWN0b3IobmFtZSwgY2FudmFzV2lkdGgpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5pbWcgPSBhc3NldHNNYW5hZ2VyLmdldFJlc3VsdChuYW1lKTtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuaW1nLndpZHRoICsgY2FudmFzV2lkdGg7XG5cbiAgICB0aGlzLmdyYXBoaWNzLmJlZ2luQml0bWFwRmlsbCh0aGlzLmltZywgJ3JlcGVhdC14JykuZHJhd1JlY3QoMCwgMCwgd2lkdGgsIHRoaXMuaW1nLmhlaWdodCk7XG4gICAgdGhpcy5yZWdZID0gdGhpcy5pbWcuaGVpZ2h0O1xuICAgIHRoaXMuY2FjaGUoMCwgMCwgd2lkdGgsIHRoaXMuaW1nLmhlaWdodCk7XG4gIH1cbiAgbW92ZShwYXRoKSB7XG4gICAgdGhpcy54IC09IHBhdGg7XG4gICAgdGhpcy54ICU9IHRoaXMuaW1nLndpZHRoO1xuICB9XG59XG4iLCJpbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcbmltcG9ydCBzb3VuZE1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc291bmRNYW5hZ2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnRuIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3IobGFiZWwsIGNvbG9yID0gJ2dyZWVuJywgdHlwZSA9ICdidG4nKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuXG4gICAgdGhpcy5jcmVhdGVCZyh0eXBlKTtcbiAgICB0aGlzLmNyZWF0ZUxhYmVsKGxhYmVsKTtcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PlxuICAgICAgdGhpcy5lbmFibGVkICYmIHNvdW5kTWFuYWdlci5pc0VuYWJsZWQoKSAmJiBjcmVhdGVqcy5Tb3VuZC5wbGF5KCdmbGFwJykpO1xuICB9XG4gIGNyZWF0ZUJnKHR5cGUpIHtcbiAgICB0aGlzLmJnID0gbmV3IGNyZWF0ZWpzLlNwcml0ZShhc3NldHNNYW5hZ2VyLmdldFNwcml0ZVNoZWV0KHR5cGUpKTtcbiAgICB0aGlzLmJnLnJlZ1ggPSB0aGlzLmJnLmdldEJvdW5kcygpLndpZHRoIC8gMjtcbiAgICB0aGlzLmJnLnJlZ1kgPSB0aGlzLmJnLmdldEJvdW5kcygpLmhlaWdodCAvIDI7XG4gICAgdGhpcy5oZWxwZXIgPSBuZXcgY3JlYXRlanMuQnV0dG9uSGVscGVyKHRoaXMuYmcsIGAke3RoaXMuY29sb3J9T3V0YCwgYCR7dGhpcy5jb2xvcn1PdmVyYCwgYCR7dGhpcy5jb2xvcn1Eb3duYCk7XG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmJnKTtcbiAgfVxuICBjcmVhdGVMYWJlbChsYWJlbCkge1xuICAgIHRoaXMubGFiZWwgPSBuZXcgY3JlYXRlanMuVGV4dChsYWJlbCwgJzMwcHggQ2FydGVyT25lJywgJyNmZmYnKTtcbiAgICB0aGlzLmxhYmVsLnNoYWRvdyA9IG5ldyBjcmVhdGVqcy5TaGFkb3coJyMwMDAnLCAwLCAxLCA1KTtcbiAgICB0aGlzLmxhYmVsLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRoaXMubGFiZWwudGV4dEJhc2VsaW5lID0gJ21pZGRsZSc7XG4gICAgdGhpcy5sYWJlbC5tb3VzZUVuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLmxhYmVsLnkgPSAtMjtcblxuICAgIC8vIHRvZG8gY2FjaGVcbiAgICAvLyBub3cgaXQgY2FjaGUgYmVmb3JlIGZvbnQgbG9hZCAoXG4gICAgLy8gY29uc3QgaCA9IHRoaXMubGFiZWwuZ2V0TWVhc3VyZWRIZWlnaHQoKSArIDY7IC8vIGFkZCA2IGNvcyBvZiBzaGFkb3dcbiAgICAvLyBjb25zdCB3ID0gdGhpcy5sYWJlbC5nZXRNZWFzdXJlZFdpZHRoKCkgKyA2O1xuICAgIC8vIHRoaXMubGFiZWwuY2FjaGUoLXcgLyAyLCAtaCAvIDIsIHcsIGgpO1xuXG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmxhYmVsKTtcbiAgfVxuICBkaXNhYmxlKCkge1xuICAgIHRoaXMuYmcuZ290b0FuZFN0b3AoJ2Rpc2FibGUnKTtcbiAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xuICB9XG4gIGVuYWJsZSgpIHtcbiAgICB0aGlzLmJnLmdvdG9BbmRTdG9wKGAke3RoaXMuY29sb3J9T3V0YCk7XG4gICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcbiAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IHRydWU7XG4gIH1cbn1cbiIsImltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuaW1wb3J0IHNvdW5kTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zb3VuZE1hbmFnZXInO1xuXG5jb25zdCBDT05GSUcgPSB7XG4gIEc6IDU1MCxcbiAgQTogMzc1LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVybyBleHRlbmRzIGNyZWF0ZWpzLlNwcml0ZSB7XG4gIGNvbnN0cnVjdG9yKHR5cGUpIHtcbiAgICBzdXBlcihhc3NldHNNYW5hZ2VyLmdldFNwcml0ZVNoZWV0KHR5cGUpKTtcblxuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5ib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpO1xuICAgIHRoaXMucmVnWCA9IHRoaXMuYm91bmRzLndpZHRoIC8gMjtcbiAgICB0aGlzLnJlZ1kgPSB0aGlzLmJvdW5kcy5oZWlnaHQgLyAyO1xuXG4gICAgdGhpcy5kZWFkID0gZmFsc2U7XG4gICAgdGhpcy52WSA9IDA7XG4gIH1cbiAgZmxhcCgpIHtcbiAgICBpZiAodGhpcy5kZWFkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudlkgPSBNYXRoLm1heCh0aGlzLnZZIC0gQ09ORklHLkEsIC1DT05GSUcuQSk7XG4gICAgdGhpcy5nb3RvQW5kUGxheSgnZmxhcCcpO1xuICAgIGlmIChzb3VuZE1hbmFnZXIuaXNFbmFibGVkKCkpIHtcbiAgICAgIGNyZWF0ZWpzLlNvdW5kLnBsYXkoJ2ZsYXAnKTtcbiAgICB9XG4gIH1cbiAgbW92ZSh0aW1lKSB7XG4gICAgdGhpcy55ICs9ICgoQ09ORklHLkcgKiB0aW1lICogMC41KSArIHRoaXMudlkpICogdGltZTtcbiAgICB0aGlzLnZZICs9IENPTkZJRy5HICogdGltZTtcbiAgfVxuICBkaWUoKSB7XG4gICAgaWYgKHRoaXMuZGVhZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmRlYWQgPSB0cnVlO1xuICAgIHRoaXMucm90YXRpb24gPSAzMDtcbiAgICB0aGlzLmdvdG9BbmRTdG9wKCdkZWFkJyk7XG4gICAgaWYgKHNvdW5kTWFuYWdlci5pc0VuYWJsZWQoKSkge1xuICAgICAgY3JlYXRlanMuU291bmQucGxheSgnbG9vc2UnKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuaW1wb3J0IEJ0biBmcm9tICcuL0J0bic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEljb25CdG4gZXh0ZW5kcyBCdG4ge1xuICBjb25zdHJ1Y3RvcihsYWJlbCwgY29sb3IgPSAnb3JhbmdlJykge1xuICAgIHN1cGVyKGxhYmVsLCBjb2xvciwgJ2ljb25CdG4nKTtcbiAgfVxuICBjcmVhdGVMYWJlbChsYWJlbCkge1xuICAgIHRoaXMubGFiZWwgPSBuZXcgY3JlYXRlanMuU3ByaXRlKGFzc2V0c01hbmFnZXIuZ2V0U3ByaXRlU2hlZXQoJ2ljb24nKSwgbGFiZWwpO1xuICAgIHRoaXMubGFiZWwucmVnWCA9IHRoaXMubGFiZWwuZ2V0Qm91bmRzKCkud2lkdGggLyAyO1xuICAgIHRoaXMubGFiZWwucmVnWSA9IHRoaXMubGFiZWwuZ2V0Qm91bmRzKCkuaGVpZ2h0IC8gMjtcbiAgICB0aGlzLmxhYmVsLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5sYWJlbCk7XG4gIH1cbiAgY2hhbmdlTGFiZWwobGFiZWwpIHtcbiAgICB0aGlzLmxhYmVsLmdvdG9BbmRTdG9wKGxhYmVsKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hhZG93T3ZlcmxheSBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5zaGFkb3cgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbiAgICB0aGlzLnNoYWRvdy5ncmFwaGljcy5iZWdpbkZpbGwoJ3JnYmEoMCwgMCwgMCwgMC42KScpLmRyYXdSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgdGhpcy5zaGFkb3dUZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoJycsICcyNXB4IENhcnRlck9uZScsICcjZmZmJyk7XG4gICAgdGhpcy5zaGFkb3dUZXh0LnkgPSBoZWlnaHQgLyAyO1xuICAgIHRoaXMuc2hhZG93VGV4dC54ID0gd2lkdGggLyAyO1xuICAgIHRoaXMuc2hhZG93VGV4dC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICB0aGlzLnNoYWRvd1RleHQudGV4dEJhc2VsaW5lID0gJ21pZGRsZSc7XG5cbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuc2hhZG93LCB0aGlzLnNoYWRvd1RleHQpO1xuICAgIC8vIHRvZG9cbiAgICAvLyB0aGlzLmNhY2hlKDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICB9XG4gIHNldFRleHQodGV4dCkge1xuICAgIHRoaXMuc2hhZG93VGV4dC50ZXh0ID0gdGV4dDtcbiAgICAvLyB0aGlzLnVwZGF0ZUNhY2hlKCk7XG4gIH1cbn1cbiIsImltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGlrZSBleHRlbmRzIGNyZWF0ZWpzLkJpdG1hcCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKGFzc2V0c01hbmFnZXIuZ2V0UmVzdWx0KCdzcGlrZScpKTtcblxuICAgIHRoaXMuYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKTtcbiAgICB0aGlzLnJlZ1ggPSB0aGlzLmJvdW5kcy53aWR0aCAvIDI7XG4gICAgdGhpcy5yZWdZID0gdGhpcy5ib3VuZHMuaGVpZ2h0O1xuICB9XG4gIHJlc2V0KCkge1xuICAgIHRoaXMuc2NhbGVZID0gMC43ICsgKE1hdGgucmFuZG9tKCkgKiAwLjUpO1xuICB9XG59XG4iLCJjb25zdCBtYW5pZmVzdCA9IFtcbiAgeyBpZDogJ21vbnN0ZXInLCBzcmM6ICdpbWcvbW9uc3Rlci1zcHJpdGUucG5nJyB9LFxuICB7IGlkOiAnYmlyZCcsIHNyYzogJ2ltZy9iaXJkLXNwcml0ZS5wbmcnIH0sXG4gIHsgaWQ6ICdjaGlja2VuJywgc3JjOiAnaW1nL2NoaWNrZW4tc3ByaXRlLnBuZycgfSxcbiAgeyBpZDogJ3NwaWtlJywgc3JjOiAnaW1nL3NwaWtlLnBuZycgfSxcbiAgeyBpZDogJ3NreScsIHNyYzogJ2ltZy9iZy9za3kucG5nJyB9LFxuICB7IGlkOiAnc3RhcnQnLCBzcmM6ICdpbWcvYmcvc3RhcnQucG5nJyB9LFxuICB7IGlkOiAnbW91bnRhaW4nLCBzcmM6ICdpbWcvYmcvbW91bnRhaW4ucG5nJyB9LFxuICB7IGlkOiAnZ3JvdW5kJywgc3JjOiAnaW1nL2JnL2dyb3VuZC5wbmcnIH0sXG4gIHsgaWQ6ICdidG4nLCBzcmM6ICdpbWcvYnRuLXNwcml0ZS5wbmcnIH0sXG4gIHsgaWQ6ICdpY29uLWJ0bicsIHNyYzogJ2ltZy9pY29uLWJ0bi1zcHJpdGUucG5nJyB9LFxuICB7IGlkOiAnaWNvbicsIHNyYzogJ2ltZy9pY29uLXNwcml0ZS5wbmcnIH0sXG4gIHsgaWQ6ICdiYWNrJywgc3JjOiAnc291bmQvYmFja2dyb3VuZC5vZ2cnIH0sXG4gIHsgaWQ6ICdmbGFwJywgc3JjOiAnc291bmQvZmxhcC5vZ2cnIH0sXG4gIHsgaWQ6ICdsb29zZScsIHNyYzogJ3NvdW5kL2xvb3NlLm9nZycgfSxcbl07XG5cbmNvbnN0IGdldEhlcm9TcHJpdGVTaGVldERhdGEgPSBuYW1lID0+ICh7XG4gIGltYWdlczogW25hbWVdLFxuICBmcmFtZXM6IHsgd2lkdGg6IDEwMCwgaGVpZ2h0OiA3OCB9LFxuICBhbmltYXRpb25zOiB7XG4gICAgZmx5OiAwLFxuICAgIGZsYXA6IFsxLCAzLCAnZmx5J10sXG4gICAgZGVhZDogNCxcbiAgfSxcbn0pO1xuXG5jb25zdCBzcHJpdGVTaGVldHNEYXRhID0ge1xuICBiaXJkOiBnZXRIZXJvU3ByaXRlU2hlZXREYXRhKCdiaXJkJyksXG4gIG1vbnN0ZXI6IGdldEhlcm9TcHJpdGVTaGVldERhdGEoJ21vbnN0ZXInKSxcbiAgY2hpY2tlbjogZ2V0SGVyb1Nwcml0ZVNoZWV0RGF0YSgnY2hpY2tlbicpLFxuICBidG46IHtcbiAgICBpbWFnZXM6IFsnYnRuJ10sXG4gICAgZnJhbWVzOiB7IHdpZHRoOiAyMTAsIGhlaWdodDogNjksIHNwYWNpbmc6IDIgfSxcbiAgICBhbmltYXRpb25zOiB7XG4gICAgICBncmVlbk91dDogMCxcbiAgICAgIGdyZWVuT3ZlcjogMixcbiAgICAgIGdyZWVuRG93bjogNCxcbiAgICAgIG9yYW5nZU91dDogNixcbiAgICAgIG9yYW5nZU92ZXI6IDgsXG4gICAgICBvcmFuZ2VEb3duOiAxLFxuICAgICAgcmVkT3V0OiAzLFxuICAgICAgcmVkT3ZlcjogNSxcbiAgICAgIHJlZERvd246IDcsXG4gICAgICBkaXNhYmxlOiA5LFxuICAgIH0sXG4gIH0sXG4gIGljb25CdG46IHtcbiAgICBpbWFnZXM6IFsnaWNvbi1idG4nXSxcbiAgICBmcmFtZXM6IHsgd2lkdGg6IDY5LCBoZWlnaHQ6IDcxLCBzcGFjaW5nOiAyIH0sXG4gICAgYW5pbWF0aW9uczoge1xuICAgICAgZ3JlZW5PdXQ6IDAsXG4gICAgICBncmVlbk92ZXI6IDEsXG4gICAgICBncmVlbkRvd246IDIsXG4gICAgICBvcmFuZ2VPdXQ6IDMsXG4gICAgICBvcmFuZ2VPdmVyOiA0LFxuICAgICAgb3JhbmdlRG93bjogNSxcbiAgICAgIHJlZE91dDogOCxcbiAgICAgIHJlZE92ZXI6IDcsXG4gICAgICByZWREb3duOiA2LFxuICAgICAgZGlzYWJsZTogOSxcbiAgICB9LFxuICB9LFxuICBpY29uOiB7XG4gICAgaW1hZ2VzOiBbJ2ljb24nXSxcbiAgICBmcmFtZXM6IHsgd2lkdGg6IDQwLCBoZWlnaHQ6IDQwIH0sXG4gICAgYW5pbWF0aW9uczoge1xuICAgICAgc291bmQ6IDAsXG4gICAgICBzb3VuZE9mZjogMSxcbiAgICB9LFxuICB9LFxufTtcblxuY29uc3Qgc3ByaXRlU2hlZXRzID0ge307XG5cbmNvbnN0IGFzc2V0c01hbmFnZXIgPSB7XG4gIGxvYWQoY2FsbGJhY2spIHtcbiAgICBjcmVhdGVqcy5Tb3VuZC5hbHRlcm5hdGVFeHRlbnNpb25zID0gWydtcDMnXTtcbiAgICB0aGlzLnF1ZXVlID0gbmV3IGNyZWF0ZWpzLkxvYWRRdWV1ZSgpO1xuICAgIHRoaXMucXVldWUuaW5zdGFsbFBsdWdpbihjcmVhdGVqcy5Tb3VuZCk7XG4gICAgdGhpcy5xdWV1ZS5sb2FkTWFuaWZlc3QobWFuaWZlc3QpO1xuICAgIHRoaXMucXVldWUuYWRkRXZlbnRMaXN0ZW5lcignY29tcGxldGUnLCBjYWxsYmFjayk7XG4gIH0sXG4gIGdldFJlc3VsdChuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMucXVldWUuZ2V0UmVzdWx0KG5hbWUpO1xuICB9LFxuICBnZXRTcHJpdGVTaGVldChuYW1lKSB7XG4gICAgaWYgKCFzcHJpdGVTaGVldHNbbmFtZV0pIHtcbiAgICAgIGNvbnN0IGRhdGEgPSBzcHJpdGVTaGVldHNEYXRhW25hbWVdO1xuXG4gICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHNwcml0ZVNoZWV0IG5hbWUnKTtcbiAgICAgIH1cblxuICAgICAgZGF0YS5pbWFnZXMgPSBkYXRhLmltYWdlcy5tYXAoaW1nID0+IHRoaXMuZ2V0UmVzdWx0KGltZykpO1xuICAgICAgc3ByaXRlU2hlZXRzW25hbWVdID0gbmV3IGNyZWF0ZWpzLlNwcml0ZVNoZWV0KGRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiBzcHJpdGVTaGVldHNbbmFtZV07XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBhc3NldHNNYW5hZ2VyO1xuIiwiY29uc3QgZGF0YU1hbmFnZXIgPSB7XG4gIGhlcm9UeXBlOiAnbW9uc3RlcicsXG4gIHNjb3JlOiAwLFxuICBtYXhTY29yZTogMCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRhdGFNYW5hZ2VyO1xuIiwiaW1wb3J0IFN0YXJ0U2NyZWVuIGZyb20gJy4uL3NjcmVlbnMvU3RhcnRTY3JlZW4nO1xuaW1wb3J0IE1haW5TY3JlZW4gZnJvbSAnLi4vc2NyZWVucy9NYWluU2NyZWVuJztcbmltcG9ydCBFbmRTY3JlZW4gZnJvbSAnLi4vc2NyZWVucy9FbmRTY3JlZW4nO1xuXG5jb25zdCBzY3JlZW5NYW5hZ2VyID0ge1xuICBpbml0KHN0YWdlKSB7XG4gICAgdGhpcy5zdGFnZSA9IHN0YWdlO1xuICAgIHRoaXMuY3VycmVudFNjcmVlbiA9IG51bGw7XG4gICAgdGhpcy5zY3JlZW5zID0ge1xuICAgICAgU3RhcnRTY3JlZW4sXG4gICAgICBNYWluU2NyZWVuLFxuICAgICAgRW5kU2NyZWVuLFxuICAgIH07XG5cbiAgICBjcmVhdGVqcy5UaWNrZXIudGltaW5nTW9kZSA9IGNyZWF0ZWpzLlRpY2tlci5SQUY7XG4gICAgY3JlYXRlanMuVGlja2VyLmFkZEV2ZW50TGlzdGVuZXIoJ3RpY2snLCBlID0+IHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRTY3JlZW4gJiYgdGhpcy5jdXJyZW50U2NyZWVuLnRpY2spIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U2NyZWVuLnRpY2soZSk7XG4gICAgICB9XG4gICAgICB0aGlzLnN0YWdlLnVwZGF0ZShlKTtcbiAgICB9KTtcbiAgfSxcbiAgY2hhbmdlKG5hbWUpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50U2NyZWVuKSB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50U2NyZWVuLmRlc3Ryb3kpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U2NyZWVuLmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5jdXJyZW50U2NyZWVuKTtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50U2NyZWVuID0gbmV3IHRoaXMuc2NyZWVuc1tuYW1lXSh0aGlzLnN0YWdlLmNhbnZhcy53aWR0aCwgdGhpcy5zdGFnZS5jYW52YXMuaGVpZ2h0KTtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuY3VycmVudFNjcmVlbik7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBzY3JlZW5NYW5hZ2VyO1xuIiwiY29uc3Qgc291bmRNYW5hZ2VyID0ge1xuICBpbml0KGVuYWJsZWQpIHtcbiAgICB0aGlzLmVuYWJsZWQgPSBlbmFibGVkO1xuICAgIHRoaXMuYmcgPSBjcmVhdGVqcy5Tb3VuZC5wbGF5KCdiYWNrJywgeyBsb29wOiAtMSwgdm9sdW1lOiAwLjMgfSk7XG4gICAgdGhpcy5iZy5wYXVzZWQgPSAhdGhpcy5lbmFibGVkO1xuICB9LFxuICB0b2dnbGUoKSB7XG4gICAgdGhpcy5lbmFibGVkID0gIXRoaXMuZW5hYmxlZDtcbiAgICB0aGlzLmJnLnBhdXNlZCA9ICF0aGlzLmVuYWJsZWQ7XG4gIH0sXG4gIGlzRW5hYmxlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5lbmFibGVkO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgc291bmRNYW5hZ2VyO1xuIiwiaW1wb3J0IGFzc2V0c01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvYXNzZXRzTWFuYWdlcic7XG5pbXBvcnQgc2NyZWVuc01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc2NyZWVuc01hbmFnZXInO1xuaW1wb3J0IGRhdGFNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2RhdGFNYW5hZ2VyJztcbmltcG9ydCBzb3VuZE1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc291bmRNYW5hZ2VyJztcbmltcG9ydCBJY29uQnRuIGZyb20gJy4uL2Rpc3BsYXkvSWNvbkJ0bic7XG5pbXBvcnQgQnRuIGZyb20gJy4uL2Rpc3BsYXkvQnRuJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW5kU2NyZWVuIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3Iod2lkdGgpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5iZyA9IG5ldyBjcmVhdGVqcy5CaXRtYXAoYXNzZXRzTWFuYWdlci5nZXRSZXN1bHQoJ3N0YXJ0JykpO1xuICAgIHRoaXMuc2NvcmUgPSBuZXcgY3JlYXRlanMuVGV4dChgU2NvcmU6ICR7ZGF0YU1hbmFnZXIuc2NvcmV9YCwgJzQwcHggQ2FydGVyT25lJywgJyMwMDAnKTtcbiAgICB0aGlzLm1heFNjb3JlID0gbmV3IGNyZWF0ZWpzLlRleHQoYEJlc3Qgc2NvcmU6ICR7ZGF0YU1hbmFnZXIubWF4U2NvcmV9YCwgJzQwcHggQ2FydGVyT25lJywgJyMwMDAnKTtcbiAgICB0aGlzLnNjb3JlLnggPSB0aGlzLm1heFNjb3JlLnggPSB3aWR0aCAvIDI7XG4gICAgdGhpcy5zY29yZS50ZXh0QWxpZ24gPSB0aGlzLm1heFNjb3JlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRoaXMuc2NvcmUueSA9IDExMDtcbiAgICB0aGlzLm1heFNjb3JlLnkgPSAxODA7XG5cbiAgICB0aGlzLnJlcGxheUJ0biA9IG5ldyBCdG4oJ1Jlc3RhcnQnKTtcbiAgICAvLyB0aGlzLm1lbnVCdG4gPSBuZXcgQnRuKCdNZW51JywgJ29yYW5nZScpO1xuICAgIHRoaXMucmVwbGF5QnRuLnggPSB3aWR0aCAvIDI7XG4gICAgLy8gdGhpcy5tZW51QnRuLnkgPSA0NzA7XG4gICAgdGhpcy5yZXBsYXlCdG4ueSA9IDM4MDtcblxuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5iZywgdGhpcy5zY29yZSwgdGhpcy5tYXhTY29yZSwgdGhpcy5yZXBsYXlCdG4pO1xuXG4gICAgY29uc3Qgc291bmRCdG4gPSBuZXcgSWNvbkJ0bihzb3VuZE1hbmFnZXIuaXNFbmFibGVkKCkgPyAnc291bmQnIDogJ3NvdW5kT2ZmJyk7XG4gICAgc291bmRCdG4ueCA9IHdpZHRoIC0gc291bmRCdG4uZ2V0Qm91bmRzKCkud2lkdGggLyAyIC0gMjU7XG4gICAgc291bmRCdG4ueSA9IHNvdW5kQnRuLmdldEJvdW5kcygpLmhlaWdodCAvIDIgKyAyMDtcbiAgICB0aGlzLmFkZENoaWxkKHNvdW5kQnRuKTtcblxuICAgIHNvdW5kQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgc291bmRNYW5hZ2VyLnRvZ2dsZSgpO1xuICAgICAgc291bmRCdG4uY2hhbmdlTGFiZWwoc291bmRNYW5hZ2VyLmlzRW5hYmxlZCgpID8gJ3NvdW5kJyA6ICdzb3VuZE9mZicpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gIH1cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLnJlcGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnTWFpblNjcmVlbicpKTtcbiAgICAvLyB0aGlzLm1lbnVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzY3JlZW5zTWFuYWdlci5jaGFuZ2UoJ1N0YXJ0U2NyZWVuJykpO1xuXG4gICAgdGhpcy5vbktleURvd24gPSBlID0+IHtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDMyKSB7XG4gICAgICAgIHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnTWFpblNjcmVlbicpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd24pO1xuICB9XG4gIGRlc3Ryb3koKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bik7XG4gIH1cbn1cbiIsImltcG9ydCBzY3JlZW5zTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zY3JlZW5zTWFuYWdlcic7XG5pbXBvcnQgZGF0YU1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvZGF0YU1hbmFnZXInO1xuaW1wb3J0IEJhY2tncm91bmQgZnJvbSAnLi4vZGlzcGxheS9CYWNrZ3JvdW5kJztcbmltcG9ydCBIZXJvIGZyb20gJy4uL2Rpc3BsYXkvSGVybyc7XG5pbXBvcnQgU3Bpa2UgZnJvbSAnLi4vZGlzcGxheS9TcGlrZSc7XG5pbXBvcnQgU2hhZG93T3ZlcmxheSBmcm9tICcuLi9kaXNwbGF5L1NoYWRvd092ZXJsYXknO1xuXG5jb25zdCBHUk9VTkRfSEVJR0hUID0gODI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5TY3JlZW4gZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcblxuICAgIHRoaXMuc3BlZWQgPSAzMDA7XG4gICAgdGhpcy5kaXN0YW5jZSA9IDA7XG4gICAgdGhpcy5zaGFkb3dPdmVybGF5ID0gbmV3IFNoYWRvd092ZXJsYXkodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuXG4gICAgdGhpcy5jcmVhdGVCZygpO1xuICAgIHRoaXMuY3JlYXRlU3Bpa2VzKCk7XG4gICAgdGhpcy5jcmVhdGVIZXJvKCk7XG4gICAgdGhpcy5jcmVhdGVIdWQoKTtcblxuICAgIHRoaXMucGF1c2UoJ1ByZXNzIHNwYWNlIHRvIGZsYXAsIGVzYyB0byBwYXVzZScpO1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICB9XG4gIGNyZWF0ZUJnKCkge1xuICAgIHRoaXMuYmdTa3kgPSBuZXcgQmFja2dyb3VuZCgnc2t5JywgdGhpcy53aWR0aCk7XG4gICAgdGhpcy5iZ01vdW50YWluID0gbmV3IEJhY2tncm91bmQoJ21vdW50YWluJywgdGhpcy53aWR0aCk7XG4gICAgdGhpcy5iZ0dyb3VuZCA9IG5ldyBCYWNrZ3JvdW5kKCdncm91bmQnLCB0aGlzLndpZHRoKTtcbiAgICB0aGlzLmJnU2t5LnkgPSB0aGlzLmJnTW91bnRhaW4ueSA9IHRoaXMuYmdHcm91bmQueSA9IHRoaXMuaGVpZ2h0O1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5iZ1NreSwgdGhpcy5iZ01vdW50YWluLCB0aGlzLmJnR3JvdW5kKTtcbiAgfVxuICBjcmVhdGVTcGlrZXMoKSB7XG4gICAgdGhpcy5zcGlrZXMgPSBbbmV3IFNwaWtlKCksIG5ldyBTcGlrZSgpXTtcbiAgICB0aGlzLnNwaWtlc1swXS54ID0gLXRoaXMuc3Bpa2VzWzBdLmJvdW5kcy53aWR0aCAvIDI7XG4gICAgdGhpcy5zcGlrZXNbMV0ueCA9IHRoaXMud2lkdGggLyAyO1xuICAgIHRoaXMuc3Bpa2VzLmZvckVhY2goc3Bpa2UgPT4gdGhpcy5yZXNldFNwaWtlKHNwaWtlKSk7XG4gICAgdGhpcy5hZGRDaGlsZCguLi50aGlzLnNwaWtlcyk7XG4gIH1cbiAgY3JlYXRlSGVybygpIHtcbiAgICB0aGlzLmhlcm8gPSBuZXcgSGVybyhkYXRhTWFuYWdlci5oZXJvVHlwZSk7XG4gICAgdGhpcy5oZXJvLnggPSB0aGlzLndpZHRoIC8gMjtcbiAgICB0aGlzLmhlcm8ueSA9IDIwMDtcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuaGVybyk7XG4gIH1cbiAgY3JlYXRlSHVkKCkge1xuICAgIHRoaXMuaHVkRGlzdGFuY2UgPSBuZXcgY3JlYXRlanMuVGV4dCgnMCBtJywgJzI1cHggQ2FydGVyT25lJywgJyMwMDAnKTtcbiAgICB0aGlzLmh1ZERpc3RhbmNlLnggPSAyMDtcbiAgICB0aGlzLmh1ZERpc3RhbmNlLnkgPSAxNTtcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuaHVkRGlzdGFuY2UpO1xuICB9XG4gIHJlc2V0U3Bpa2Uoc3Bpa2UpIHtcbiAgICBzcGlrZS5yZXNldCgpO1xuICAgIHNwaWtlLnggKz0gdGhpcy53aWR0aCArIHNwaWtlLmJvdW5kcy53aWR0aDtcbiAgICBpZiAoTWF0aC5yYW5kb20oKSA+IDAuNSkge1xuICAgICAgc3Bpa2UueSA9IHRoaXMuaGVpZ2h0IC0gR1JPVU5EX0hFSUdIVDtcbiAgICAgIHNwaWtlLnJvdGF0aW9uID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgc3Bpa2UueSA9IDA7XG4gICAgICBzcGlrZS5yb3RhdGlvbiA9IDE4MDtcbiAgICB9XG4gIH1cbiAgcGF1c2UodGV4dCkge1xuICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcbiAgICB0aGlzLnNoYWRvd092ZXJsYXkuc2V0VGV4dCh0ZXh0KTtcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuc2hhZG93T3ZlcmxheSk7XG4gIH1cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5oYW5kbGVBY3Rpb24oKSk7XG4gICAgdGhpcy5vbktleURvd24gPSBlID0+IHtcbiAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgMzI6XG4gICAgICAgICAgdGhpcy5oYW5kbGVBY3Rpb24oKTtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjc6XG4gICAgICAgICAgdGhpcy50b2dnbGVQYXVzZSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5vblRvdWNoU3RhcnQgPSBlID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuaGFuZGxlQWN0aW9uKCk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd24pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5vblRvdWNoU3RhcnQpO1xuICB9XG4gIGhhbmRsZUFjdGlvbigpIHtcbiAgICBpZiAodGhpcy5wYXVzZWQpIHtcbiAgICAgIHRoaXMudG9nZ2xlUGF1c2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oZXJvLmZsYXAoKTtcbiAgICB9XG4gIH1cbiAgdG9nZ2xlUGF1c2UoKSB7XG4gICAgaWYgKHRoaXMucGF1c2VkKSB7XG4gICAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLnNoYWRvd092ZXJsYXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhdXNlKCdQcmVzcyBzcGFjZSBvciBlc2MgdG8gdW5wYXVzZScpO1xuICAgIH1cbiAgfVxuICBtb3ZlV29ybGQodGltZSkge1xuICAgIGNvbnN0IHBhdGggPSB0aGlzLnNwZWVkICogdGltZTtcbiAgICBpZiAodGhpcy5oZXJvLmRlYWQpIHtcbiAgICAgIHRoaXMuaGVyby54ICs9IHBhdGggKiAwLjU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW92ZVNwaWtlcyhwYXRoKTtcbiAgICAgIHRoaXMuYmdTa3kubW92ZShwYXRoICogMC4xKTtcbiAgICAgIHRoaXMuYmdNb3VudGFpbi5tb3ZlKHBhdGggKiAwLjMpO1xuICAgICAgdGhpcy5iZ0dyb3VuZC5tb3ZlKHBhdGgpO1xuXG4gICAgICB0aGlzLmRpc3RhbmNlICs9IHBhdGg7XG4gICAgICBkYXRhTWFuYWdlci5zY29yZSA9IE1hdGguZmxvb3IodGhpcy5kaXN0YW5jZSAvIDI1KTtcbiAgICAgIHRoaXMuaHVkRGlzdGFuY2UudGV4dCA9IGAke2RhdGFNYW5hZ2VyLnNjb3JlfSBtYDtcbiAgICB9XG4gIH1cbiAgbW92ZVNwaWtlcyhwYXRoKSB7XG4gICAgdGhpcy5zcGlrZXMuZm9yRWFjaChzcGlrZSA9PiB7XG4gICAgICBzcGlrZS54IC09IHBhdGg7XG4gICAgICBpZiAoc3Bpa2UueCA8IC1zcGlrZS5ib3VuZHMud2lkdGggLyAyKSB7XG4gICAgICAgIHRoaXMucmVzZXRTcGlrZShzcGlrZSk7XG4gICAgICAgIHRoaXMuc3BlZWQgKz0gMTtcbiAgICAgIH1cbiAgICAgIGlmIChuZGdtci5jaGVja1BpeGVsQ29sbGlzaW9uKHRoaXMuaGVybywgc3Bpa2UpKSB7XG4gICAgICAgIHRoaXMuaGVyby5kaWUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBtb3ZlSGVybyh0aW1lKSB7XG4gICAgdGhpcy5oZXJvLm1vdmUodGltZSk7XG4gICAgaWYgKHRoaXMuaGVyby55IDwgMCkge1xuICAgICAgdGhpcy5oZXJvLnZZID0gMDtcbiAgICAgIHRoaXMuaGVyby55ID0gMDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaGVyby55ID4gdGhpcy5oZWlnaHQgKyB0aGlzLmhlcm8uYm91bmRzLmhlaWdodCAvIDIpIHtcbiAgICAgIGRhdGFNYW5hZ2VyLm1heFNjb3JlID0gTWF0aC5tYXgoZGF0YU1hbmFnZXIubWF4U2NvcmUsIGRhdGFNYW5hZ2VyLnNjb3JlKTtcbiAgICAgIHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnRW5kU2NyZWVuJyk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmhlcm8ueSA+IHRoaXMuaGVpZ2h0IC0gKEdST1VORF9IRUlHSFQgKyB0aGlzLmhlcm8uYm91bmRzLmhlaWdodCAvIDIpKSB7XG4gICAgICB0aGlzLmhlcm8uZGllKCk7XG4gICAgfVxuICB9XG4gIHRpY2soZSkge1xuICAgIGNvbnN0IHNlYyA9IGUuZGVsdGEgKiAwLjAwMTtcbiAgICBpZiAodGhpcy5wYXVzZWQgfHwgc2VjID4gMC4zKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMubW92ZVdvcmxkKHNlYyk7XG4gICAgdGhpcy5tb3ZlSGVybyhzZWMpO1xuICB9XG4gIGRlc3Ryb3koKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bik7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uVG91Y2hTdGFydCk7XG4gIH1cbn1cbiIsImltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuaW1wb3J0IHNjcmVlbnNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NjcmVlbnNNYW5hZ2VyJztcbmltcG9ydCBkYXRhTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9kYXRhTWFuYWdlcic7XG5pbXBvcnQgc291bmRNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NvdW5kTWFuYWdlcic7XG5pbXBvcnQgSWNvbkJ0biBmcm9tICcuLi9kaXNwbGF5L0ljb25CdG4nO1xuaW1wb3J0IEhlcm8gZnJvbSAnLi4vZGlzcGxheS9IZXJvJztcbmltcG9ydCBCdG4gZnJvbSAnLi4vZGlzcGxheS9CdG4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFydFNjcmVlbiBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgdGhpcy5iZyA9IG5ldyBjcmVhdGVqcy5CaXRtYXAoYXNzZXRzTWFuYWdlci5nZXRSZXN1bHQoJ3N0YXJ0JykpO1xuICAgIC8vIGZvciBiZXR0ZXIgdGltZXNcbiAgICAvLyB0aGlzLnRpdGxlID0gbmV3IGNyZWF0ZWpzLlRleHQoJ0Nob29zZSB5b3VyIGF2YXRhcicsICc0NXB4IENhcnRlck9uZScsICcjMDAwJyk7XG4gICAgLy8gdGhpcy50aXRsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAvLyB0aGlzLnRpdGxlLnggPSB0aGlzLndpZHRoIC8gMjtcbiAgICAvLyB0aGlzLnRpdGxlLnkgPSAxMDA7XG5cbiAgICB0aGlzLnN0YXJ0QnRuID0gbmV3IEJ0bignU3RhcnQnKTtcbiAgICB0aGlzLnN0YXJ0QnRuLnggPSB3aWR0aCAvIDI7XG4gICAgdGhpcy5zdGFydEJ0bi55ID0gMTc1ICsgdGhpcy5oZWlnaHQgLyAyIC0gODA7XG4gICAgLy8gdGhpcy5zdGFydEJ0bi5kaXNhYmxlKCk7XG5cbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuYmcsIHRoaXMudGl0bGUsIHRoaXMuc3RhcnRCdG4pO1xuICAgIC8vIHRoaXMuY3JlYXRlSGVyb2VzKCk7XG5cbiAgICBjb25zdCBoZXJvID0gbmV3IEhlcm8oJ21vbnN0ZXInKTtcbiAgICBoZXJvLnggPSB3aWR0aCAvIDI7XG4gICAgaGVyby55ID0gaGVpZ2h0IC8gMiAtIDc1O1xuICAgIHRoaXMuYWRkQ2hpbGQoaGVybyk7XG5cbiAgICBjb25zdCBzb3VuZEJ0biA9IG5ldyBJY29uQnRuKHNvdW5kTWFuYWdlci5pc0VuYWJsZWQoKSA/ICdzb3VuZCcgOiAnc291bmRPZmYnKTtcbiAgICBzb3VuZEJ0bi54ID0gdGhpcy53aWR0aCAtIHNvdW5kQnRuLmdldEJvdW5kcygpLndpZHRoIC8gMiAtIDI1O1xuICAgIHNvdW5kQnRuLnkgPSBzb3VuZEJ0bi5nZXRCb3VuZHMoKS5oZWlnaHQgLyAyICsgMjA7XG4gICAgdGhpcy5hZGRDaGlsZChzb3VuZEJ0bik7XG5cbiAgICBzb3VuZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHNvdW5kTWFuYWdlci50b2dnbGUoKTtcbiAgICAgIHNvdW5kQnRuLmNoYW5nZUxhYmVsKHNvdW5kTWFuYWdlci5pc0VuYWJsZWQoKSA/ICdzb3VuZCcgOiAnc291bmRPZmYnKTtcbiAgICB9KTtcblxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICB9XG4gIGNyZWF0ZUhlcm9lcygpIHtcbiAgICB0aGlzLmhlcm9lcyA9IFtcbiAgICAgIG5ldyBIZXJvKCdiaXJkJyksXG4gICAgICBuZXcgSGVybygnbW9uc3RlcicpLFxuICAgICAgbmV3IEhlcm8oJ2NoaWNrZW4nKSxcbiAgICBdO1xuICAgIHRoaXMuaGVyb2VzLmZvckVhY2goKGhlcm8sIGkpID0+IHtcbiAgICAgIGhlcm8ueSA9IHRoaXMuaGVpZ2h0IC8gMjtcbiAgICAgIGhlcm8ueCA9IChpICsgMSkgKiB0aGlzLndpZHRoIC8gKHRoaXMuaGVyb2VzLmxlbmd0aCArIDEpO1xuICAgICAgaGVyby5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgICBoZXJvLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5zZWxlY3RIZXJvKGhlcm8pKTtcbiAgICAgIGhlcm8uY2FjaGUoMCwgMCwgaGVyby5ib3VuZHMud2lkdGgsIGhlcm8uYm91bmRzLmhlaWdodCk7XG4gICAgfSk7XG4gICAgdGhpcy5oZXJvRmlsdGVyID0gbmV3IGNyZWF0ZWpzLkNvbG9yRmlsdGVyKDAuNiwgMC42LCAwLjYpO1xuICAgIHRoaXMucmVzZXRIZXJvZXMoKTtcbiAgICB0aGlzLmFkZENoaWxkKC4uLnRoaXMuaGVyb2VzKTtcbiAgfVxuICByZXNldEhlcm9lcygpIHtcbiAgICB0aGlzLmhlcm9lcy5mb3JFYWNoKGhlcm8gPT4ge1xuICAgICAgaGVyby5maWx0ZXJzID0gW3RoaXMuaGVyb0ZpbHRlcl07XG4gICAgICBoZXJvLnVwZGF0ZUNhY2hlKCk7XG4gICAgICBoZXJvLnNjYWxlWCA9IDAuODU7XG4gICAgICBoZXJvLnNjYWxlWSA9IDAuODU7XG4gICAgfSk7XG4gIH1cbiAgc2VsZWN0SGVybyhoZXJvKSB7XG4gICAgdGhpcy5yZXNldEhlcm9lcygpO1xuXG4gICAgaGVyby5maWx0ZXJzID0gW107XG4gICAgaGVyby51cGRhdGVDYWNoZSgpO1xuICAgIGhlcm8uc2NhbGVYID0gMTtcbiAgICBoZXJvLnNjYWxlWSA9IDE7XG4gICAgaGVyby5mbGFwKCk7XG5cbiAgICBpZiAoIXRoaXMuc3RhcnRCdG4uZW5hYmxlZCkge1xuICAgICAgdGhpcy5zdGFydEJ0bi5lbmFibGUoKTtcbiAgICB9XG5cbiAgICBkYXRhTWFuYWdlci5oZXJvVHlwZSA9IGhlcm8udHlwZTtcbiAgfVxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PlxuICAgICAgc2NyZWVuc01hbmFnZXIuY2hhbmdlKCdNYWluU2NyZWVuJykpO1xuXG4gICAgdGhpcy5vbktleURvd24gPSBlID0+IHtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDMyKSB7XG4gICAgICAgIHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnTWFpblNjcmVlbicpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd24pO1xuICB9XG4gIGRlc3Ryb3koKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bik7XG4gIH1cbn1cbiJdfQ==
