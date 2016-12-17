(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _screensManager = require('./managers/screensManager');

var _screensManager2 = _interopRequireDefault(_screensManager);

var _assetsManager = require('./managers/assetsManager');

var _assetsManager2 = _interopRequireDefault(_assetsManager);

var _serverManager = require('./managers/serverManager');

var _serverManager2 = _interopRequireDefault(_serverManager);

var _soundManager = require('./managers/soundManager');

var _soundManager2 = _interopRequireDefault(_soundManager);

var _dataManager = require('./managers/dataManager');

var _dataManager2 = _interopRequireDefault(_dataManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stage = new createjs.Stage('game-stage');
_screensManager2.default.init(stage);

var server = 'local';

if (window !== window.parent) {
  if (document.referrer.includes('://vk.com')) {
    server = 'vk';
  }
  // createjs stage click dosnt trigger window.focus
  window.addEventListener('click', function () {
    return window.focus();
  });
}

Promise.all([_assetsManager2.default.init(), _serverManager2.default.init(server)]).then(function () {
  return Promise.all([_serverManager2.default.get('maxScore').then(function (r) {
    return _dataManager2.default.init(+r);
  }), _serverManager2.default.get('sound').then(
  // sound on by default and on server error
  function (r) {
    return _soundManager2.default.init(r === '' ? true : !!r);
  }, function () {
    return _soundManager2.default.init(true);
  })]);
}).then(function () {
  return _screensManager2.default.change('StartScreen');
}).catch(function (e) {
  return console.error('init error, reload page', e);
});

if (createjs.Touch.isSupported()) {
  createjs.Touch.enable(stage, true);
} else {
  stage.enableMouseOver(20);
}

},{"./managers/assetsManager":8,"./managers/dataManager":9,"./managers/screensManager":10,"./managers/serverManager":11,"./managers/soundManager":12}],2:[function(require,module,exports){
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
      this.label = new createjs.Text(label, '30px Guerilla', '#fff');
      this.label.shadow = new createjs.Shadow('#000', 0, 1, 5);
      this.label.textAlign = 'center';
      this.label.textBaseline = 'middle';
      this.label.mouseEnabled = false;
      this.label.y = -3;

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

},{"../managers/assetsManager":8,"../managers/soundManager":12}],4:[function(require,module,exports){
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

},{"../managers/assetsManager":8,"../managers/soundManager":12}],5:[function(require,module,exports){
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

    _this.shadowText = new createjs.Text('', '25px Guerilla', '#fff');
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
  init: function init() {
    var _this = this;

    createjs.Sound.alternateExtensions = ['mp3'];
    this.queue = new createjs.LoadQueue();
    this.queue.installPlugin(createjs.Sound);
    this.queue.loadManifest(manifest);

    return new Promise(function (resolve, reject) {
      _this.queue.addEventListener('complete', function () {
        return resolve();
      });
      _this.queue.addEventListener('error', function () {
        return reject();
      });
    });
  },
  getResult: function getResult(name) {
    return this.queue.getResult(name);
  },
  getSpriteSheet: function getSpriteSheet(name) {
    var _this2 = this;

    if (!spriteSheets[name]) {
      var data = spriteSheetsData[name];

      if (!data) {
        throw new Error('invalid spriteSheet name');
      }

      data.images = data.images.map(function (img) {
        return _this2.getResult(img);
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
  init: function init(maxScore) {
    this.maxScore = maxScore;
    this.score = 0;
    this.heroType = 'monster';
  }
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

},{"../screens/EndScreen":13,"../screens/MainScreen":14,"../screens/StartScreen":15}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var serverManager = {
  init: function init(server) {
    this.server = server;

    // todo use localstorage if not vk env

    return new Promise(function (resolve, reject) {
      switch (server) {
        case 'local':
          resolve();
          break;
        case 'vk':
          VK.init(function () {
            return resolve();
          }, function (e) {
            return reject('vk init error', e);
          }, '5.60');
          break;
        default:
          reject('wrong server name');
          break;
      }
    });
  },
  get: function get(key) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      switch (_this.server) {
        case 'local':
          resolve({ response: '' });
          break;
        case 'vk':
          VK.api('storage.get', { key: key }, resolve);
          break;
        default:
          reject('wrong server name');
          break;
      }
    }).then(function (r) {
      if (r.error) {
        throw new Error(r.error);
      } else if (r.response === '') {
        // cant JSON.parse empty string but need to get default value
        return '';
      }
      return JSON.parse(r.response);
    });
  },
  set: function set(key, value) {
    if (this.server === 'vk') {
      VK.api('storage.set', { key: key, value: value });
    }
  },
  share: function share(score) {
    if (this.server === 'vk') {
      VK.api('wall.post', {
        message: '\u042F \u043F\u0440\u043E\u043B\u0435\u0442\u0435\u043B ' + score + '\u043C \u0432 \u0438\u0433\u0440\u0435 Flappy Monster!\n                  A \u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0441\u043C\u043E\u0436\u0435\u0448\u044C \u0442\u044B?',
        attachments: 'photo-135563388_456239017'

      });
    }
  }
};

exports.default = serverManager;

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var soundManager = {
  init: function init(enable) {
    this.enabled = enable;
    this.bg = createjs.Sound.play('back', { loop: -1, volume: 0.3 });
    this.bg.paused = !this.enabled;
    // sometimes negative value occurs and throw error
    this.bg.position = 0;
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

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assetsManager = require('../managers/assetsManager');

var _assetsManager2 = _interopRequireDefault(_assetsManager);

var _screensManager = require('../managers/screensManager');

var _screensManager2 = _interopRequireDefault(_screensManager);

var _serverManager = require('../managers/serverManager');

var _serverManager2 = _interopRequireDefault(_serverManager);

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
    _this.score = new createjs.Text('\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442: ' + _dataManager2.default.score + ' \u043C\n\n\u0420\u0435\u043A\u043E\u0440\u0434: ' + _dataManager2.default.maxScore + ' \u043C', '40px Guerilla', '#000');
    _this.score.x = width / 2;
    _this.score.textAlign = 'center';
    _this.score.y = 125;

    _this.replayBtn = new _Btn2.default('Еще раз');
    // this.menuBtn = new Btn('Menu', 'orange');
    _this.replayBtn.x = width / 2;
    // this.menuBtn.y = 470;
    _this.replayBtn.y = 390;

    _this.addChild(_this.bg, _this.score, _this.replayBtn);

    if (_dataManager2.default.score > _dataManager2.default.maxScore) {
      _dataManager2.default.maxScore = _dataManager2.default.score;
      _serverManager2.default.set('maxScore', _dataManager2.default.maxScore);
      _this.score.text = '\u041D\u043E\u0432\u044B\u0439 \u0440\u0435\u043A\u043E\u0440\u0434: ' + _dataManager2.default.maxScore + ' \u043C!';
      // this.score.y += 60;
      _this.shareBtn = new _Btn2.default('Поделиться', 'orange');
      _this.shareBtn.x = width / 2;
      _this.shareBtn.y = 290;
      _this.addChild(_this.shareBtn);

      _this.shareBtn.addEventListener('click', function () {
        return _serverManager2.default.share(_dataManager2.default.score);
      });
    }

    var soundBtn = new _IconBtn2.default(_soundManager2.default.isEnabled() ? 'sound' : 'soundOff');
    soundBtn.x = width - soundBtn.getBounds().width / 2 - 25;
    soundBtn.y = soundBtn.getBounds().height / 2 + 20;
    _this.addChild(soundBtn);

    soundBtn.addEventListener('click', function () {
      _soundManager2.default.toggle();
      soundBtn.changeLabel(_soundManager2.default.isEnabled() ? 'sound' : 'soundOff');
      _serverManager2.default.set('sound', _soundManager2.default.isEnabled());
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

},{"../display/Btn":3,"../display/IconBtn":5,"../managers/assetsManager":8,"../managers/dataManager":9,"../managers/screensManager":10,"../managers/serverManager":11,"../managers/soundManager":12}],14:[function(require,module,exports){
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

    _this.speed = 285;
    _this.distance = 0;
    _this.shadowOverlay = new _ShadowOverlay2.default(_this.width, _this.height);

    _this.createBg();
    _this.createSpikes();
    _this.createHero();
    _this.createHud();

    _this.pause('Пробел - взмах крыльями, esc - пауза');
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
      this.hudDistance = new createjs.Text('0 м', '25px Guerilla', '#000');
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
        this.pause('Нажмите пробел или esc');
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
        this.hudDistance.text = _dataManager2.default.score + ' \u043C';
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

},{"../display/Background":2,"../display/Hero":4,"../display/ShadowOverlay":6,"../display/Spike":7,"../managers/dataManager":9,"../managers/screensManager":10}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _serverManager = require('../managers/serverManager');

var _serverManager2 = _interopRequireDefault(_serverManager);

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


    _this.startBtn = new _Btn2.default('Играть');
    _this.startBtn.x = width / 2;
    _this.startBtn.y = 175 + _this.height / 2 - 80;
    // this.startBtn.disable();

    _this.addChild(_this.bg, _this.title, _this.startBtn);
    // this.createHeroes();

    if (_dataManager2.default.maxScore) {
      _this.score = new createjs.Text('\u041B\u0443\u0447\u0448\u0438\u0439 \u0441\u0447\u0435\u0442: ' + _dataManager2.default.maxScore + ' \u043C', '25px Guerilla', '#000');
      _this.score.x = 35;
      _this.score.y = 25;
      _this.addChild(_this.score);
    }

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
      _serverManager2.default.set('sound', _soundManager2.default.isEnabled());
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

},{"../display/Btn":3,"../display/Hero":4,"../display/IconBtn":5,"../managers/assetsManager":8,"../managers/dataManager":9,"../managers/screensManager":10,"../managers/serverManager":11,"../managers/soundManager":12}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvc3JjL2FwcC5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9CYWNrZ3JvdW5kLmpzIiwiYXBwL2pzL3NyYy9kaXNwbGF5L0J0bi5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9IZXJvLmpzIiwiYXBwL2pzL3NyYy9kaXNwbGF5L0ljb25CdG4uanMiLCJhcHAvanMvc3JjL2Rpc3BsYXkvU2hhZG93T3ZlcmxheS5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9TcGlrZS5qcyIsImFwcC9qcy9zcmMvbWFuYWdlcnMvYXNzZXRzTWFuYWdlci5qcyIsImFwcC9qcy9zcmMvbWFuYWdlcnMvZGF0YU1hbmFnZXIuanMiLCJhcHAvanMvc3JjL21hbmFnZXJzL3NjcmVlbnNNYW5hZ2VyLmpzIiwiYXBwL2pzL3NyYy9tYW5hZ2Vycy9zZXJ2ZXJNYW5hZ2VyLmpzIiwiYXBwL2pzL3NyYy9tYW5hZ2Vycy9zb3VuZE1hbmFnZXIuanMiLCJhcHAvanMvc3JjL3NjcmVlbnMvRW5kU2NyZWVuLmpzIiwiYXBwL2pzL3NyYy9zY3JlZW5zL01haW5TY3JlZW4uanMiLCJhcHAvanMvc3JjL3NjcmVlbnMvU3RhcnRTY3JlZW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU0sUUFBUSxJQUFJLFNBQVMsS0FBYixDQUFtQixZQUFuQixDQUFkO0FBQ0EseUJBQWUsSUFBZixDQUFvQixLQUFwQjs7QUFFQSxJQUFJLFNBQVMsT0FBYjs7QUFFQSxJQUFJLFdBQVcsT0FBTyxNQUF0QixFQUE4QjtBQUM1QixNQUFJLFNBQVMsUUFBVCxDQUFrQixRQUFsQixDQUEyQixXQUEzQixDQUFKLEVBQTZDO0FBQzNDLGFBQVMsSUFBVDtBQUNEO0FBQ0Q7QUFDQSxTQUFPLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDO0FBQUEsV0FB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QUY7QUFDRDtBQUNGLE9BTEQ7O0FBT0EsYUFBTyxnQkFBUCxDQUF3QixTQUF4QixFQUFtQyxLQUFLLFNBQXhDO0FBQ0Q7Ozs4QkFDUztBQUNSLGFBQU8sbUJBQVAsQ0FBMkIsU0FBM0IsRUFBc0MsS0FBSyxTQUEzQztBQUNEOzs7O0VBdkdzQyxTQUFTLFM7O2tCQUE3QixXIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBzY3JlZW5zTWFuYWdlciBmcm9tICcuL21hbmFnZXJzL3NjcmVlbnNNYW5hZ2VyJztcbmltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4vbWFuYWdlcnMvYXNzZXRzTWFuYWdlcic7XG5pbXBvcnQgc2VydmVyTWFuYWdlciBmcm9tICcuL21hbmFnZXJzL3NlcnZlck1hbmFnZXInO1xuaW1wb3J0IHNvdW5kTWFuYWdlciBmcm9tICcuL21hbmFnZXJzL3NvdW5kTWFuYWdlcic7XG5pbXBvcnQgZGF0YU1hbmFnZXIgZnJvbSAnLi9tYW5hZ2Vycy9kYXRhTWFuYWdlcic7XG5cbmNvbnN0IHN0YWdlID0gbmV3IGNyZWF0ZWpzLlN0YWdlKCdnYW1lLXN0YWdlJyk7XG5zY3JlZW5zTWFuYWdlci5pbml0KHN0YWdlKTtcblxubGV0IHNlcnZlciA9ICdsb2NhbCc7XG5cbmlmICh3aW5kb3cgIT09IHdpbmRvdy5wYXJlbnQpIHtcbiAgaWYgKGRvY3VtZW50LnJlZmVycmVyLmluY2x1ZGVzKCc6Ly92ay5jb20nKSkge1xuICAgIHNlcnZlciA9ICd2ayc7XG4gIH1cbiAgLy8gY3JlYXRlanMgc3RhZ2UgY2xpY2sgZG9zbnQgdHJpZ2dlciB3aW5kb3cuZm9jdXNcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gd2luZG93LmZvY3VzKCkpO1xufVxuXG5Qcm9taXNlLmFsbChbXG4gIGFzc2V0c01hbmFnZXIuaW5pdCgpLFxuICBzZXJ2ZXJNYW5hZ2VyLmluaXQoc2VydmVyKSxcbl0pXG4gIC50aGVuKCgpID0+IFByb21pc2UuYWxsKFtcbiAgICBzZXJ2ZXJNYW5hZ2VyLmdldCgnbWF4U2NvcmUnKVxuICAgICAgLnRoZW4ociA9PiBkYXRhTWFuYWdlci5pbml0KCtyKSksXG4gICAgc2VydmVyTWFuYWdlci5nZXQoJ3NvdW5kJylcbiAgICAgIC50aGVuKFxuICAgICAgICAvLyBzb3VuZCBvbiBieSBkZWZhdWx0IGFuZCBvbiBzZXJ2ZXIgZXJyb3JcbiAgICAgICAgciA9PiBzb3VuZE1hbmFnZXIuaW5pdChyID09PSAnJyA/IHRydWUgOiAhIXIpLFxuICAgICAgICAoKSA9PiBzb3VuZE1hbmFnZXIuaW5pdCh0cnVlKSxcbiAgICAgICksXG4gIF0pKVxuICAudGhlbigoKSA9PiBzY3JlZW5zTWFuYWdlci5jaGFuZ2UoJ1N0YXJ0U2NyZWVuJykpXG4gIC5jYXRjaChlID0+IGNvbnNvbGUuZXJyb3IoJ2luaXQgZXJyb3IsIHJlbG9hZCBwYWdlJywgZSkpO1xuXG5pZiAoY3JlYXRlanMuVG91Y2guaXNTdXBwb3J0ZWQoKSkge1xuICBjcmVhdGVqcy5Ub3VjaC5lbmFibGUoc3RhZ2UsIHRydWUpO1xufSBlbHNlIHtcbiAgc3RhZ2UuZW5hYmxlTW91c2VPdmVyKDIwKTtcbn1cbiIsImltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYWNrZ3JvdW5kIGV4dGVuZHMgY3JlYXRlanMuU2hhcGUge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBjYW52YXNXaWR0aCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmltZyA9IGFzc2V0c01hbmFnZXIuZ2V0UmVzdWx0KG5hbWUpO1xuICAgIGNvbnN0IHdpZHRoID0gdGhpcy5pbWcud2lkdGggKyBjYW52YXNXaWR0aDtcblxuICAgIHRoaXMuZ3JhcGhpY3MuYmVnaW5CaXRtYXBGaWxsKHRoaXMuaW1nLCAncmVwZWF0LXgnKS5kcmF3UmVjdCgwLCAwLCB3aWR0aCwgdGhpcy5pbWcuaGVpZ2h0KTtcbiAgICB0aGlzLnJlZ1kgPSB0aGlzLmltZy5oZWlnaHQ7XG4gICAgdGhpcy5jYWNoZSgwLCAwLCB3aWR0aCwgdGhpcy5pbWcuaGVpZ2h0KTtcbiAgfVxuICBtb3ZlKHBhdGgpIHtcbiAgICB0aGlzLnggLT0gcGF0aDtcbiAgICB0aGlzLnggJT0gdGhpcy5pbWcud2lkdGg7XG4gIH1cbn1cbiIsImltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuaW1wb3J0IHNvdW5kTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zb3VuZE1hbmFnZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdG4gZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuICBjb25zdHJ1Y3RvcihsYWJlbCwgY29sb3IgPSAnZ3JlZW4nLCB0eXBlID0gJ2J0bicpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XG5cbiAgICB0aGlzLmNyZWF0ZUJnKHR5cGUpO1xuICAgIHRoaXMuY3JlYXRlTGFiZWwobGFiZWwpO1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+XG4gICAgICB0aGlzLmVuYWJsZWQgJiYgc291bmRNYW5hZ2VyLmlzRW5hYmxlZCgpICYmIGNyZWF0ZWpzLlNvdW5kLnBsYXkoJ2ZsYXAnKSk7XG4gIH1cbiAgY3JlYXRlQmcodHlwZSkge1xuICAgIHRoaXMuYmcgPSBuZXcgY3JlYXRlanMuU3ByaXRlKGFzc2V0c01hbmFnZXIuZ2V0U3ByaXRlU2hlZXQodHlwZSkpO1xuICAgIHRoaXMuYmcucmVnWCA9IHRoaXMuYmcuZ2V0Qm91bmRzKCkud2lkdGggLyAyO1xuICAgIHRoaXMuYmcucmVnWSA9IHRoaXMuYmcuZ2V0Qm91bmRzKCkuaGVpZ2h0IC8gMjtcbiAgICB0aGlzLmhlbHBlciA9IG5ldyBjcmVhdGVqcy5CdXR0b25IZWxwZXIodGhpcy5iZywgYCR7dGhpcy5jb2xvcn1PdXRgLCBgJHt0aGlzLmNvbG9yfU92ZXJgLCBgJHt0aGlzLmNvbG9yfURvd25gKTtcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuYmcpO1xuICB9XG4gIGNyZWF0ZUxhYmVsKGxhYmVsKSB7XG4gICAgdGhpcy5sYWJlbCA9IG5ldyBjcmVhdGVqcy5UZXh0KGxhYmVsLCAnMzBweCBHdWVyaWxsYScsICcjZmZmJyk7XG4gICAgdGhpcy5sYWJlbC5zaGFkb3cgPSBuZXcgY3JlYXRlanMuU2hhZG93KCcjMDAwJywgMCwgMSwgNSk7XG4gICAgdGhpcy5sYWJlbC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICB0aGlzLmxhYmVsLnRleHRCYXNlbGluZSA9ICdtaWRkbGUnO1xuICAgIHRoaXMubGFiZWwubW91c2VFbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy5sYWJlbC55ID0gLTM7XG5cbiAgICAvLyB0b2RvIGNhY2hlXG4gICAgLy8gbm93IGl0IGNhY2hlIGJlZm9yZSBmb250IGxvYWQgKFxuICAgIC8vIGNvbnN0IGggPSB0aGlzLmxhYmVsLmdldE1lYXN1cmVkSGVpZ2h0KCkgKyA2OyAvLyBhZGQgNiBjb3Mgb2Ygc2hhZG93XG4gICAgLy8gY29uc3QgdyA9IHRoaXMubGFiZWwuZ2V0TWVhc3VyZWRXaWR0aCgpICsgNjtcbiAgICAvLyB0aGlzLmxhYmVsLmNhY2hlKC13IC8gMiwgLWggLyAyLCB3LCBoKTtcblxuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5sYWJlbCk7XG4gIH1cbiAgZGlzYWJsZSgpIHtcbiAgICB0aGlzLmJnLmdvdG9BbmRTdG9wKCdkaXNhYmxlJyk7XG4gICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy5tb3VzZUVuYWJsZWQgPSBmYWxzZTtcbiAgfVxuICBlbmFibGUoKSB7XG4gICAgdGhpcy5iZy5nb3RvQW5kU3RvcChgJHt0aGlzLmNvbG9yfU91dGApO1xuICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XG4gICAgdGhpcy5tb3VzZUVuYWJsZWQgPSB0cnVlO1xuICB9XG59XG4iLCJpbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcbmltcG9ydCBzb3VuZE1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc291bmRNYW5hZ2VyJztcblxuY29uc3QgQ09ORklHID0ge1xuICBHOiA1NTAsXG4gIEE6IDM3NSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlcm8gZXh0ZW5kcyBjcmVhdGVqcy5TcHJpdGUge1xuICBjb25zdHJ1Y3Rvcih0eXBlKSB7XG4gICAgc3VwZXIoYXNzZXRzTWFuYWdlci5nZXRTcHJpdGVTaGVldCh0eXBlKSk7XG5cbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMuYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKTtcbiAgICB0aGlzLnJlZ1ggPSB0aGlzLmJvdW5kcy53aWR0aCAvIDI7XG4gICAgdGhpcy5yZWdZID0gdGhpcy5ib3VuZHMuaGVpZ2h0IC8gMjtcblxuICAgIHRoaXMuZGVhZCA9IGZhbHNlO1xuICAgIHRoaXMudlkgPSAwO1xuICB9XG4gIGZsYXAoKSB7XG4gICAgaWYgKHRoaXMuZGVhZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnZZID0gTWF0aC5tYXgodGhpcy52WSAtIENPTkZJRy5BLCAtQ09ORklHLkEpO1xuICAgIHRoaXMuZ290b0FuZFBsYXkoJ2ZsYXAnKTtcbiAgICBpZiAoc291bmRNYW5hZ2VyLmlzRW5hYmxlZCgpKSB7XG4gICAgICBjcmVhdGVqcy5Tb3VuZC5wbGF5KCdmbGFwJyk7XG4gICAgfVxuICB9XG4gIG1vdmUodGltZSkge1xuICAgIHRoaXMueSArPSAoKENPTkZJRy5HICogdGltZSAqIDAuNSkgKyB0aGlzLnZZKSAqIHRpbWU7XG4gICAgdGhpcy52WSArPSBDT05GSUcuRyAqIHRpbWU7XG4gIH1cbiAgZGllKCkge1xuICAgIGlmICh0aGlzLmRlYWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5kZWFkID0gdHJ1ZTtcbiAgICB0aGlzLnJvdGF0aW9uID0gMzA7XG4gICAgdGhpcy5nb3RvQW5kU3RvcCgnZGVhZCcpO1xuICAgIGlmIChzb3VuZE1hbmFnZXIuaXNFbmFibGVkKCkpIHtcbiAgICAgIGNyZWF0ZWpzLlNvdW5kLnBsYXkoJ2xvb3NlJyk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcbmltcG9ydCBCdG4gZnJvbSAnLi9CdG4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJY29uQnRuIGV4dGVuZHMgQnRuIHtcbiAgY29uc3RydWN0b3IobGFiZWwsIGNvbG9yID0gJ29yYW5nZScpIHtcbiAgICBzdXBlcihsYWJlbCwgY29sb3IsICdpY29uQnRuJyk7XG4gIH1cbiAgY3JlYXRlTGFiZWwobGFiZWwpIHtcbiAgICB0aGlzLmxhYmVsID0gbmV3IGNyZWF0ZWpzLlNwcml0ZShhc3NldHNNYW5hZ2VyLmdldFNwcml0ZVNoZWV0KCdpY29uJyksIGxhYmVsKTtcbiAgICB0aGlzLmxhYmVsLnJlZ1ggPSB0aGlzLmxhYmVsLmdldEJvdW5kcygpLndpZHRoIC8gMjtcbiAgICB0aGlzLmxhYmVsLnJlZ1kgPSB0aGlzLmxhYmVsLmdldEJvdW5kcygpLmhlaWdodCAvIDI7XG4gICAgdGhpcy5sYWJlbC5tb3VzZUVuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMubGFiZWwpO1xuICB9XG4gIGNoYW5nZUxhYmVsKGxhYmVsKSB7XG4gICAgdGhpcy5sYWJlbC5nb3RvQW5kU3RvcChsYWJlbCk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoYWRvd092ZXJsYXkgZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc2hhZG93ID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG4gICAgdGhpcy5zaGFkb3cuZ3JhcGhpY3MuYmVnaW5GaWxsKCdyZ2JhKDAsIDAsIDAsIDAuNiknKS5kcmF3UmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgIHRoaXMuc2hhZG93VGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KCcnLCAnMjVweCBHdWVyaWxsYScsICcjZmZmJyk7XG4gICAgdGhpcy5zaGFkb3dUZXh0LnkgPSBoZWlnaHQgLyAyO1xuICAgIHRoaXMuc2hhZG93VGV4dC54ID0gd2lkdGggLyAyO1xuICAgIHRoaXMuc2hhZG93VGV4dC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICB0aGlzLnNoYWRvd1RleHQudGV4dEJhc2VsaW5lID0gJ21pZGRsZSc7XG5cbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuc2hhZG93LCB0aGlzLnNoYWRvd1RleHQpO1xuICAgIC8vIHRvZG9cbiAgICAvLyB0aGlzLmNhY2hlKDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICB9XG4gIHNldFRleHQodGV4dCkge1xuICAgIHRoaXMuc2hhZG93VGV4dC50ZXh0ID0gdGV4dDtcbiAgICAvLyB0aGlzLnVwZGF0ZUNhY2hlKCk7XG4gIH1cbn1cbiIsImltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGlrZSBleHRlbmRzIGNyZWF0ZWpzLkJpdG1hcCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKGFzc2V0c01hbmFnZXIuZ2V0UmVzdWx0KCdzcGlrZScpKTtcblxuICAgIHRoaXMuYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKTtcbiAgICB0aGlzLnJlZ1ggPSB0aGlzLmJvdW5kcy53aWR0aCAvIDI7XG4gICAgdGhpcy5yZWdZID0gdGhpcy5ib3VuZHMuaGVpZ2h0O1xuICB9XG4gIHJlc2V0KCkge1xuICAgIHRoaXMuc2NhbGVZID0gMC43ICsgKE1hdGgucmFuZG9tKCkgKiAwLjUpO1xuICB9XG59XG4iLCJjb25zdCBtYW5pZmVzdCA9IFtcbiAgeyBpZDogJ21vbnN0ZXInLCBzcmM6ICdpbWcvbW9uc3Rlci1zcHJpdGUucG5nJyB9LFxuICB7IGlkOiAnYmlyZCcsIHNyYzogJ2ltZy9iaXJkLXNwcml0ZS5wbmcnIH0sXG4gIHsgaWQ6ICdjaGlja2VuJywgc3JjOiAnaW1nL2NoaWNrZW4tc3ByaXRlLnBuZycgfSxcbiAgeyBpZDogJ3NwaWtlJywgc3JjOiAnaW1nL3NwaWtlLnBuZycgfSxcbiAgeyBpZDogJ3NreScsIHNyYzogJ2ltZy9iZy9za3kucG5nJyB9LFxuICB7IGlkOiAnc3RhcnQnLCBzcmM6ICdpbWcvYmcvc3RhcnQucG5nJyB9LFxuICB7IGlkOiAnbW91bnRhaW4nLCBzcmM6ICdpbWcvYmcvbW91bnRhaW4ucG5nJyB9LFxuICB7IGlkOiAnZ3JvdW5kJywgc3JjOiAnaW1nL2JnL2dyb3VuZC5wbmcnIH0sXG4gIHsgaWQ6ICdidG4nLCBzcmM6ICdpbWcvYnRuLXNwcml0ZS5wbmcnIH0sXG4gIHsgaWQ6ICdpY29uLWJ0bicsIHNyYzogJ2ltZy9pY29uLWJ0bi1zcHJpdGUucG5nJyB9LFxuICB7IGlkOiAnaWNvbicsIHNyYzogJ2ltZy9pY29uLXNwcml0ZS5wbmcnIH0sXG4gIHsgaWQ6ICdiYWNrJywgc3JjOiAnc291bmQvYmFja2dyb3VuZC5vZ2cnIH0sXG4gIHsgaWQ6ICdmbGFwJywgc3JjOiAnc291bmQvZmxhcC5vZ2cnIH0sXG4gIHsgaWQ6ICdsb29zZScsIHNyYzogJ3NvdW5kL2xvb3NlLm9nZycgfSxcbl07XG5cbmNvbnN0IGdldEhlcm9TcHJpdGVTaGVldERhdGEgPSBuYW1lID0+ICh7XG4gIGltYWdlczogW25hbWVdLFxuICBmcmFtZXM6IHsgd2lkdGg6IDEwMCwgaGVpZ2h0OiA3OCB9LFxuICBhbmltYXRpb25zOiB7XG4gICAgZmx5OiAwLFxuICAgIGZsYXA6IFsxLCAzLCAnZmx5J10sXG4gICAgZGVhZDogNCxcbiAgfSxcbn0pO1xuXG5jb25zdCBzcHJpdGVTaGVldHNEYXRhID0ge1xuICBiaXJkOiBnZXRIZXJvU3ByaXRlU2hlZXREYXRhKCdiaXJkJyksXG4gIG1vbnN0ZXI6IGdldEhlcm9TcHJpdGVTaGVldERhdGEoJ21vbnN0ZXInKSxcbiAgY2hpY2tlbjogZ2V0SGVyb1Nwcml0ZVNoZWV0RGF0YSgnY2hpY2tlbicpLFxuICBidG46IHtcbiAgICBpbWFnZXM6IFsnYnRuJ10sXG4gICAgZnJhbWVzOiB7IHdpZHRoOiAyMTAsIGhlaWdodDogNjksIHNwYWNpbmc6IDIgfSxcbiAgICBhbmltYXRpb25zOiB7XG4gICAgICBncmVlbk91dDogMCxcbiAgICAgIGdyZWVuT3ZlcjogMixcbiAgICAgIGdyZWVuRG93bjogNCxcbiAgICAgIG9yYW5nZU91dDogNixcbiAgICAgIG9yYW5nZU92ZXI6IDgsXG4gICAgICBvcmFuZ2VEb3duOiAxLFxuICAgICAgcmVkT3V0OiAzLFxuICAgICAgcmVkT3ZlcjogNSxcbiAgICAgIHJlZERvd246IDcsXG4gICAgICBkaXNhYmxlOiA5LFxuICAgIH0sXG4gIH0sXG4gIGljb25CdG46IHtcbiAgICBpbWFnZXM6IFsnaWNvbi1idG4nXSxcbiAgICBmcmFtZXM6IHsgd2lkdGg6IDY5LCBoZWlnaHQ6IDcxLCBzcGFjaW5nOiAyIH0sXG4gICAgYW5pbWF0aW9uczoge1xuICAgICAgZ3JlZW5PdXQ6IDAsXG4gICAgICBncmVlbk92ZXI6IDEsXG4gICAgICBncmVlbkRvd246IDIsXG4gICAgICBvcmFuZ2VPdXQ6IDMsXG4gICAgICBvcmFuZ2VPdmVyOiA0LFxuICAgICAgb3JhbmdlRG93bjogNSxcbiAgICAgIHJlZE91dDogOCxcbiAgICAgIHJlZE92ZXI6IDcsXG4gICAgICByZWREb3duOiA2LFxuICAgICAgZGlzYWJsZTogOSxcbiAgICB9LFxuICB9LFxuICBpY29uOiB7XG4gICAgaW1hZ2VzOiBbJ2ljb24nXSxcbiAgICBmcmFtZXM6IHsgd2lkdGg6IDQwLCBoZWlnaHQ6IDQwIH0sXG4gICAgYW5pbWF0aW9uczoge1xuICAgICAgc291bmQ6IDAsXG4gICAgICBzb3VuZE9mZjogMSxcbiAgICB9LFxuICB9LFxufTtcblxuY29uc3Qgc3ByaXRlU2hlZXRzID0ge307XG5cbmNvbnN0IGFzc2V0c01hbmFnZXIgPSB7XG4gIGluaXQoKSB7XG4gICAgY3JlYXRlanMuU291bmQuYWx0ZXJuYXRlRXh0ZW5zaW9ucyA9IFsnbXAzJ107XG4gICAgdGhpcy5xdWV1ZSA9IG5ldyBjcmVhdGVqcy5Mb2FkUXVldWUoKTtcbiAgICB0aGlzLnF1ZXVlLmluc3RhbGxQbHVnaW4oY3JlYXRlanMuU291bmQpO1xuICAgIHRoaXMucXVldWUubG9hZE1hbmlmZXN0KG1hbmlmZXN0KTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLnF1ZXVlLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbXBsZXRlJywgKCkgPT4gcmVzb2x2ZSgpKTtcbiAgICAgIHRoaXMucXVldWUuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoKSA9PiByZWplY3QoKSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldFJlc3VsdChuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMucXVldWUuZ2V0UmVzdWx0KG5hbWUpO1xuICB9LFxuICBnZXRTcHJpdGVTaGVldChuYW1lKSB7XG4gICAgaWYgKCFzcHJpdGVTaGVldHNbbmFtZV0pIHtcbiAgICAgIGNvbnN0IGRhdGEgPSBzcHJpdGVTaGVldHNEYXRhW25hbWVdO1xuXG4gICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHNwcml0ZVNoZWV0IG5hbWUnKTtcbiAgICAgIH1cblxuICAgICAgZGF0YS5pbWFnZXMgPSBkYXRhLmltYWdlcy5tYXAoaW1nID0+IHRoaXMuZ2V0UmVzdWx0KGltZykpO1xuICAgICAgc3ByaXRlU2hlZXRzW25hbWVdID0gbmV3IGNyZWF0ZWpzLlNwcml0ZVNoZWV0KGRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiBzcHJpdGVTaGVldHNbbmFtZV07XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBhc3NldHNNYW5hZ2VyO1xuIiwiY29uc3QgZGF0YU1hbmFnZXIgPSB7XG4gIGluaXQobWF4U2NvcmUpIHtcbiAgICB0aGlzLm1heFNjb3JlID0gbWF4U2NvcmU7XG4gICAgdGhpcy5zY29yZSA9IDA7XG4gICAgdGhpcy5oZXJvVHlwZSA9ICdtb25zdGVyJztcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRhdGFNYW5hZ2VyO1xuIiwiaW1wb3J0IFN0YXJ0U2NyZWVuIGZyb20gJy4uL3NjcmVlbnMvU3RhcnRTY3JlZW4nO1xuaW1wb3J0IE1haW5TY3JlZW4gZnJvbSAnLi4vc2NyZWVucy9NYWluU2NyZWVuJztcbmltcG9ydCBFbmRTY3JlZW4gZnJvbSAnLi4vc2NyZWVucy9FbmRTY3JlZW4nO1xuXG5jb25zdCBzY3JlZW5NYW5hZ2VyID0ge1xuICBpbml0KHN0YWdlKSB7XG4gICAgdGhpcy5zdGFnZSA9IHN0YWdlO1xuICAgIHRoaXMuY3VycmVudFNjcmVlbiA9IG51bGw7XG4gICAgdGhpcy5zY3JlZW5zID0ge1xuICAgICAgU3RhcnRTY3JlZW4sXG4gICAgICBNYWluU2NyZWVuLFxuICAgICAgRW5kU2NyZWVuLFxuICAgIH07XG5cbiAgICBjcmVhdGVqcy5UaWNrZXIudGltaW5nTW9kZSA9IGNyZWF0ZWpzLlRpY2tlci5SQUY7XG4gICAgY3JlYXRlanMuVGlja2VyLmFkZEV2ZW50TGlzdGVuZXIoJ3RpY2snLCBlID0+IHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRTY3JlZW4gJiYgdGhpcy5jdXJyZW50U2NyZWVuLnRpY2spIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U2NyZWVuLnRpY2soZSk7XG4gICAgICB9XG4gICAgICB0aGlzLnN0YWdlLnVwZGF0ZShlKTtcbiAgICB9KTtcbiAgfSxcbiAgY2hhbmdlKG5hbWUpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50U2NyZWVuKSB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50U2NyZWVuLmRlc3Ryb3kpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U2NyZWVuLmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5jdXJyZW50U2NyZWVuKTtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50U2NyZWVuID0gbmV3IHRoaXMuc2NyZWVuc1tuYW1lXSh0aGlzLnN0YWdlLmNhbnZhcy53aWR0aCwgdGhpcy5zdGFnZS5jYW52YXMuaGVpZ2h0KTtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuY3VycmVudFNjcmVlbik7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBzY3JlZW5NYW5hZ2VyO1xuIiwiY29uc3Qgc2VydmVyTWFuYWdlciA9IHtcbiAgaW5pdChzZXJ2ZXIpIHtcbiAgICB0aGlzLnNlcnZlciA9IHNlcnZlcjtcblxuICAgIC8vIHRvZG8gdXNlIGxvY2Fsc3RvcmFnZSBpZiBub3QgdmsgZW52XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgc3dpdGNoIChzZXJ2ZXIpIHtcbiAgICAgICAgY2FzZSAnbG9jYWwnOlxuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAndmsnOlxuICAgICAgICAgIFZLLmluaXQoXG4gICAgICAgICAgICAoKSA9PiByZXNvbHZlKCksXG4gICAgICAgICAgICBlID0+IHJlamVjdCgndmsgaW5pdCBlcnJvcicsIGUpLFxuICAgICAgICAgICc1LjYwJyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmVqZWN0KCd3cm9uZyBzZXJ2ZXIgbmFtZScpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuICBnZXQoa2V5KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHN3aXRjaCAodGhpcy5zZXJ2ZXIpIHtcbiAgICAgICAgY2FzZSAnbG9jYWwnOlxuICAgICAgICAgIHJlc29sdmUoeyByZXNwb25zZTogJycgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3ZrJzpcbiAgICAgICAgICBWSy5hcGkoJ3N0b3JhZ2UuZ2V0JywgeyBrZXkgfSwgcmVzb2x2ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmVqZWN0KCd3cm9uZyBzZXJ2ZXIgbmFtZScpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pLnRoZW4ociA9PiB7XG4gICAgICBpZiAoci5lcnJvcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3Ioci5lcnJvcik7XG4gICAgICB9IGVsc2UgaWYgKHIucmVzcG9uc2UgPT09ICcnKSB7XG4gICAgICAgIC8vIGNhbnQgSlNPTi5wYXJzZSBlbXB0eSBzdHJpbmcgYnV0IG5lZWQgdG8gZ2V0IGRlZmF1bHQgdmFsdWVcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoci5yZXNwb25zZSk7XG4gICAgfSk7XG4gIH0sXG4gIHNldChrZXksIHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuc2VydmVyID09PSAndmsnKSB7XG4gICAgICBWSy5hcGkoJ3N0b3JhZ2Uuc2V0JywgeyBrZXksIHZhbHVlIH0pO1xuICAgIH1cbiAgfSxcbiAgc2hhcmUoc2NvcmUpIHtcbiAgICBpZiAodGhpcy5zZXJ2ZXIgPT09ICd2aycpIHtcbiAgICAgIFZLLmFwaSgnd2FsbC5wb3N0Jywge1xuICAgICAgICBtZXNzYWdlOiBg0K8g0L/RgNC+0LvQtdGC0LXQuyAke3Njb3JlfdC8INCyINC40LPRgNC1IEZsYXBweSBNb25zdGVyIVxuICAgICAgICAgICAgICAgICAgQSDRgdC60L7Qu9GM0LrQviDRgdC80L7QttC10YjRjCDRgtGLP2AsXG4gICAgICAgIGF0dGFjaG1lbnRzOiAncGhvdG8tMTM1NTYzMzg4XzQ1NjIzOTAxNycsXG5cbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNlcnZlck1hbmFnZXI7XG4iLCJjb25zdCBzb3VuZE1hbmFnZXIgPSB7XG4gIGluaXQoZW5hYmxlKSB7XG4gICAgdGhpcy5lbmFibGVkID0gZW5hYmxlO1xuICAgIHRoaXMuYmcgPSBjcmVhdGVqcy5Tb3VuZC5wbGF5KCdiYWNrJywgeyBsb29wOiAtMSwgdm9sdW1lOiAwLjMgfSk7XG4gICAgdGhpcy5iZy5wYXVzZWQgPSAhdGhpcy5lbmFibGVkO1xuICAgIC8vIHNvbWV0aW1lcyBuZWdhdGl2ZSB2YWx1ZSBvY2N1cnMgYW5kIHRocm93IGVycm9yXG4gICAgdGhpcy5iZy5wb3NpdGlvbiA9IDA7XG4gIH0sXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzLmVuYWJsZWQgPSAhdGhpcy5lbmFibGVkO1xuICAgIHRoaXMuYmcucGF1c2VkID0gIXRoaXMuZW5hYmxlZDtcbiAgfSxcbiAgaXNFbmFibGVkKCkge1xuICAgIHJldHVybiB0aGlzLmVuYWJsZWQ7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBzb3VuZE1hbmFnZXI7XG4iLCJpbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcbmltcG9ydCBzY3JlZW5zTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zY3JlZW5zTWFuYWdlcic7XG5pbXBvcnQgc2VydmVyTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zZXJ2ZXJNYW5hZ2VyJztcbmltcG9ydCBkYXRhTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9kYXRhTWFuYWdlcic7XG5pbXBvcnQgc291bmRNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NvdW5kTWFuYWdlcic7XG5pbXBvcnQgSWNvbkJ0biBmcm9tICcuLi9kaXNwbGF5L0ljb25CdG4nO1xuaW1wb3J0IEJ0biBmcm9tICcuLi9kaXNwbGF5L0J0bic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVuZFNjcmVlbiBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuYmcgPSBuZXcgY3JlYXRlanMuQml0bWFwKGFzc2V0c01hbmFnZXIuZ2V0UmVzdWx0KCdzdGFydCcpKTtcbiAgICB0aGlzLnNjb3JlID0gbmV3IGNyZWF0ZWpzLlRleHQoYNCg0LXQt9GD0LvRjNGC0LDRgjogJHtkYXRhTWFuYWdlci5zY29yZX0g0LxcXG5cXG7QoNC10LrQvtGA0LQ6ICR7ZGF0YU1hbmFnZXIubWF4U2NvcmV9INC8YCwgJzQwcHggR3VlcmlsbGEnLCAnIzAwMCcpO1xuICAgIHRoaXMuc2NvcmUueCA9IHdpZHRoIC8gMjtcbiAgICB0aGlzLnNjb3JlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRoaXMuc2NvcmUueSA9IDEyNTtcblxuXG4gICAgdGhpcy5yZXBsYXlCdG4gPSBuZXcgQnRuKCfQldGJ0LUg0YDQsNC3Jyk7XG4gICAgLy8gdGhpcy5tZW51QnRuID0gbmV3IEJ0bignTWVudScsICdvcmFuZ2UnKTtcbiAgICB0aGlzLnJlcGxheUJ0bi54ID0gd2lkdGggLyAyO1xuICAgIC8vIHRoaXMubWVudUJ0bi55ID0gNDcwO1xuICAgIHRoaXMucmVwbGF5QnRuLnkgPSAzOTA7XG5cbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuYmcsIHRoaXMuc2NvcmUsIHRoaXMucmVwbGF5QnRuKTtcblxuICAgIGlmIChkYXRhTWFuYWdlci5zY29yZSA+IGRhdGFNYW5hZ2VyLm1heFNjb3JlKSB7XG4gICAgICBkYXRhTWFuYWdlci5tYXhTY29yZSA9IGRhdGFNYW5hZ2VyLnNjb3JlO1xuICAgICAgc2VydmVyTWFuYWdlci5zZXQoJ21heFNjb3JlJywgZGF0YU1hbmFnZXIubWF4U2NvcmUpO1xuICAgICAgdGhpcy5zY29yZS50ZXh0ID0gYNCd0L7QstGL0Lkg0YDQtdC60L7RgNC0OiAke2RhdGFNYW5hZ2VyLm1heFNjb3JlfSDQvCFgO1xuICAgICAgLy8gdGhpcy5zY29yZS55ICs9IDYwO1xuICAgICAgdGhpcy5zaGFyZUJ0biA9IG5ldyBCdG4oJ9Cf0L7QtNC10LvQuNGC0YzRgdGPJywgJ29yYW5nZScpO1xuICAgICAgdGhpcy5zaGFyZUJ0bi54ID0gd2lkdGggLyAyO1xuICAgICAgdGhpcy5zaGFyZUJ0bi55ID0gMjkwO1xuICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLnNoYXJlQnRuKTtcblxuICAgICAgdGhpcy5zaGFyZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNlcnZlck1hbmFnZXIuc2hhcmUoZGF0YU1hbmFnZXIuc2NvcmUpKTtcbiAgICB9XG5cbiAgICBjb25zdCBzb3VuZEJ0biA9IG5ldyBJY29uQnRuKHNvdW5kTWFuYWdlci5pc0VuYWJsZWQoKSA/ICdzb3VuZCcgOiAnc291bmRPZmYnKTtcbiAgICBzb3VuZEJ0bi54ID0gd2lkdGggLSBzb3VuZEJ0bi5nZXRCb3VuZHMoKS53aWR0aCAvIDIgLSAyNTtcbiAgICBzb3VuZEJ0bi55ID0gc291bmRCdG4uZ2V0Qm91bmRzKCkuaGVpZ2h0IC8gMiArIDIwO1xuICAgIHRoaXMuYWRkQ2hpbGQoc291bmRCdG4pO1xuXG4gICAgc291bmRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBzb3VuZE1hbmFnZXIudG9nZ2xlKCk7XG4gICAgICBzb3VuZEJ0bi5jaGFuZ2VMYWJlbChzb3VuZE1hbmFnZXIuaXNFbmFibGVkKCkgPyAnc291bmQnIDogJ3NvdW5kT2ZmJyk7XG4gICAgICBzZXJ2ZXJNYW5hZ2VyLnNldCgnc291bmQnLCBzb3VuZE1hbmFnZXIuaXNFbmFibGVkKCkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gIH1cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLnJlcGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnTWFpblNjcmVlbicpKTtcbiAgICAvLyB0aGlzLm1lbnVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzY3JlZW5zTWFuYWdlci5jaGFuZ2UoJ1N0YXJ0U2NyZWVuJykpO1xuXG4gICAgdGhpcy5vbktleURvd24gPSBlID0+IHtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDMyKSB7XG4gICAgICAgIHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnTWFpblNjcmVlbicpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd24pO1xuICB9XG4gIGRlc3Ryb3koKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bik7XG4gIH1cbn1cbiIsImltcG9ydCBzY3JlZW5zTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zY3JlZW5zTWFuYWdlcic7XG5pbXBvcnQgZGF0YU1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvZGF0YU1hbmFnZXInO1xuaW1wb3J0IEJhY2tncm91bmQgZnJvbSAnLi4vZGlzcGxheS9CYWNrZ3JvdW5kJztcbmltcG9ydCBIZXJvIGZyb20gJy4uL2Rpc3BsYXkvSGVybyc7XG5pbXBvcnQgU3Bpa2UgZnJvbSAnLi4vZGlzcGxheS9TcGlrZSc7XG5pbXBvcnQgU2hhZG93T3ZlcmxheSBmcm9tICcuLi9kaXNwbGF5L1NoYWRvd092ZXJsYXknO1xuXG5jb25zdCBHUk9VTkRfSEVJR0hUID0gODI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5TY3JlZW4gZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcblxuICAgIHRoaXMuc3BlZWQgPSAyODU7XG4gICAgdGhpcy5kaXN0YW5jZSA9IDA7XG4gICAgdGhpcy5zaGFkb3dPdmVybGF5ID0gbmV3IFNoYWRvd092ZXJsYXkodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuXG4gICAgdGhpcy5jcmVhdGVCZygpO1xuICAgIHRoaXMuY3JlYXRlU3Bpa2VzKCk7XG4gICAgdGhpcy5jcmVhdGVIZXJvKCk7XG4gICAgdGhpcy5jcmVhdGVIdWQoKTtcblxuICAgIHRoaXMucGF1c2UoJ9Cf0YDQvtCx0LXQuyAtINCy0LfQvNCw0YUg0LrRgNGL0LvRjNGP0LzQuCwgZXNjIC0g0L/QsNGD0LfQsCcpO1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICB9XG4gIGNyZWF0ZUJnKCkge1xuICAgIHRoaXMuYmdTa3kgPSBuZXcgQmFja2dyb3VuZCgnc2t5JywgdGhpcy53aWR0aCk7XG4gICAgdGhpcy5iZ01vdW50YWluID0gbmV3IEJhY2tncm91bmQoJ21vdW50YWluJywgdGhpcy53aWR0aCk7XG4gICAgdGhpcy5iZ0dyb3VuZCA9IG5ldyBCYWNrZ3JvdW5kKCdncm91bmQnLCB0aGlzLndpZHRoKTtcbiAgICB0aGlzLmJnU2t5LnkgPSB0aGlzLmJnTW91bnRhaW4ueSA9IHRoaXMuYmdHcm91bmQueSA9IHRoaXMuaGVpZ2h0O1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5iZ1NreSwgdGhpcy5iZ01vdW50YWluLCB0aGlzLmJnR3JvdW5kKTtcbiAgfVxuICBjcmVhdGVTcGlrZXMoKSB7XG4gICAgdGhpcy5zcGlrZXMgPSBbbmV3IFNwaWtlKCksIG5ldyBTcGlrZSgpXTtcbiAgICB0aGlzLnNwaWtlc1swXS54ID0gLXRoaXMuc3Bpa2VzWzBdLmJvdW5kcy53aWR0aCAvIDI7XG4gICAgdGhpcy5zcGlrZXNbMV0ueCA9IHRoaXMud2lkdGggLyAyO1xuICAgIHRoaXMuc3Bpa2VzLmZvckVhY2goc3Bpa2UgPT4gdGhpcy5yZXNldFNwaWtlKHNwaWtlKSk7XG4gICAgdGhpcy5hZGRDaGlsZCguLi50aGlzLnNwaWtlcyk7XG4gIH1cbiAgY3JlYXRlSGVybygpIHtcbiAgICB0aGlzLmhlcm8gPSBuZXcgSGVybyhkYXRhTWFuYWdlci5oZXJvVHlwZSk7XG4gICAgdGhpcy5oZXJvLnggPSB0aGlzLndpZHRoIC8gMjtcbiAgICB0aGlzLmhlcm8ueSA9IDIwMDtcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuaGVybyk7XG4gIH1cbiAgY3JlYXRlSHVkKCkge1xuICAgIHRoaXMuaHVkRGlzdGFuY2UgPSBuZXcgY3JlYXRlanMuVGV4dCgnMCDQvCcsICcyNXB4IEd1ZXJpbGxhJywgJyMwMDAnKTtcbiAgICB0aGlzLmh1ZERpc3RhbmNlLnggPSAyMDtcbiAgICB0aGlzLmh1ZERpc3RhbmNlLnkgPSAxNTtcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuaHVkRGlzdGFuY2UpO1xuICB9XG4gIHJlc2V0U3Bpa2Uoc3Bpa2UpIHtcbiAgICBzcGlrZS5yZXNldCgpO1xuICAgIHNwaWtlLnggKz0gdGhpcy53aWR0aCArIHNwaWtlLmJvdW5kcy53aWR0aDtcbiAgICBpZiAoTWF0aC5yYW5kb20oKSA+IDAuNSkge1xuICAgICAgc3Bpa2UueSA9IHRoaXMuaGVpZ2h0IC0gR1JPVU5EX0hFSUdIVDtcbiAgICAgIHNwaWtlLnJvdGF0aW9uID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgc3Bpa2UueSA9IDA7XG4gICAgICBzcGlrZS5yb3RhdGlvbiA9IDE4MDtcbiAgICB9XG4gIH1cbiAgcGF1c2UodGV4dCkge1xuICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcbiAgICB0aGlzLnNoYWRvd092ZXJsYXkuc2V0VGV4dCh0ZXh0KTtcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuc2hhZG93T3ZlcmxheSk7XG4gIH1cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5oYW5kbGVBY3Rpb24oKSk7XG4gICAgdGhpcy5vbktleURvd24gPSBlID0+IHtcbiAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgMzI6XG4gICAgICAgICAgdGhpcy5oYW5kbGVBY3Rpb24oKTtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjc6XG4gICAgICAgICAgdGhpcy50b2dnbGVQYXVzZSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5vblRvdWNoU3RhcnQgPSBlID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuaGFuZGxlQWN0aW9uKCk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd24pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5vblRvdWNoU3RhcnQpO1xuICB9XG4gIGhhbmRsZUFjdGlvbigpIHtcbiAgICBpZiAodGhpcy5wYXVzZWQpIHtcbiAgICAgIHRoaXMudG9nZ2xlUGF1c2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oZXJvLmZsYXAoKTtcbiAgICB9XG4gIH1cbiAgdG9nZ2xlUGF1c2UoKSB7XG4gICAgaWYgKHRoaXMucGF1c2VkKSB7XG4gICAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLnNoYWRvd092ZXJsYXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhdXNlKCfQndCw0LbQvNC40YLQtSDQv9GA0L7QsdC10Lsg0LjQu9C4IGVzYycpO1xuICAgIH1cbiAgfVxuICBtb3ZlV29ybGQodGltZSkge1xuICAgIGNvbnN0IHBhdGggPSB0aGlzLnNwZWVkICogdGltZTtcbiAgICBpZiAodGhpcy5oZXJvLmRlYWQpIHtcbiAgICAgIHRoaXMuaGVyby54ICs9IHBhdGggKiAwLjU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW92ZVNwaWtlcyhwYXRoKTtcbiAgICAgIHRoaXMuYmdTa3kubW92ZShwYXRoICogMC4xKTtcbiAgICAgIHRoaXMuYmdNb3VudGFpbi5tb3ZlKHBhdGggKiAwLjMpO1xuICAgICAgdGhpcy5iZ0dyb3VuZC5tb3ZlKHBhdGgpO1xuXG4gICAgICB0aGlzLmRpc3RhbmNlICs9IHBhdGg7XG4gICAgICBkYXRhTWFuYWdlci5zY29yZSA9IE1hdGguZmxvb3IodGhpcy5kaXN0YW5jZSAvIDI1KTtcbiAgICAgIHRoaXMuaHVkRGlzdGFuY2UudGV4dCA9IGAke2RhdGFNYW5hZ2VyLnNjb3JlfSDQvGA7XG4gICAgfVxuICB9XG4gIG1vdmVTcGlrZXMocGF0aCkge1xuICAgIHRoaXMuc3Bpa2VzLmZvckVhY2goc3Bpa2UgPT4ge1xuICAgICAgc3Bpa2UueCAtPSBwYXRoO1xuICAgICAgaWYgKHNwaWtlLnggPCAtc3Bpa2UuYm91bmRzLndpZHRoIC8gMikge1xuICAgICAgICB0aGlzLnJlc2V0U3Bpa2Uoc3Bpa2UpO1xuICAgICAgICB0aGlzLnNwZWVkICs9IDE7XG4gICAgICB9XG4gICAgICBpZiAobmRnbXIuY2hlY2tQaXhlbENvbGxpc2lvbih0aGlzLmhlcm8sIHNwaWtlKSkge1xuICAgICAgICB0aGlzLmhlcm8uZGllKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgbW92ZUhlcm8odGltZSkge1xuICAgIHRoaXMuaGVyby5tb3ZlKHRpbWUpO1xuICAgIGlmICh0aGlzLmhlcm8ueSA8IDApIHtcbiAgICAgIHRoaXMuaGVyby52WSA9IDA7XG4gICAgICB0aGlzLmhlcm8ueSA9IDA7XG4gICAgfSBlbHNlIGlmICh0aGlzLmhlcm8ueSA+IHRoaXMuaGVpZ2h0ICsgdGhpcy5oZXJvLmJvdW5kcy5oZWlnaHQgLyAyKSB7XG4gICAgICBzY3JlZW5zTWFuYWdlci5jaGFuZ2UoJ0VuZFNjcmVlbicpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5oZXJvLnkgPiB0aGlzLmhlaWdodCAtIChHUk9VTkRfSEVJR0hUICsgdGhpcy5oZXJvLmJvdW5kcy5oZWlnaHQgLyAyKSkge1xuICAgICAgdGhpcy5oZXJvLmRpZSgpO1xuICAgIH1cbiAgfVxuICB0aWNrKGUpIHtcbiAgICBjb25zdCBzZWMgPSBlLmRlbHRhICogMC4wMDE7XG4gICAgaWYgKHRoaXMucGF1c2VkIHx8IHNlYyA+IDAuMykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm1vdmVXb3JsZChzZWMpO1xuICAgIHRoaXMubW92ZUhlcm8oc2VjKTtcbiAgfVxuICBkZXN0cm95KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd24pO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5vblRvdWNoU3RhcnQpO1xuICB9XG59XG4iLCJpbXBvcnQgc2VydmVyTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zZXJ2ZXJNYW5hZ2VyJztcbmltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuaW1wb3J0IHNjcmVlbnNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NjcmVlbnNNYW5hZ2VyJztcbmltcG9ydCBkYXRhTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9kYXRhTWFuYWdlcic7XG5pbXBvcnQgc291bmRNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NvdW5kTWFuYWdlcic7XG5pbXBvcnQgSWNvbkJ0biBmcm9tICcuLi9kaXNwbGF5L0ljb25CdG4nO1xuaW1wb3J0IEhlcm8gZnJvbSAnLi4vZGlzcGxheS9IZXJvJztcbmltcG9ydCBCdG4gZnJvbSAnLi4vZGlzcGxheS9CdG4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFydFNjcmVlbiBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgdGhpcy5iZyA9IG5ldyBjcmVhdGVqcy5CaXRtYXAoYXNzZXRzTWFuYWdlci5nZXRSZXN1bHQoJ3N0YXJ0JykpO1xuICAgIC8vIGZvciBiZXR0ZXIgdGltZXNcbiAgICAvLyB0aGlzLnRpdGxlID0gbmV3IGNyZWF0ZWpzLlRleHQoJ0Nob29zZSB5b3VyIGF2YXRhcicsICc0NXB4IENhcnRlck9uZScsICcjMDAwJyk7XG4gICAgLy8gdGhpcy50aXRsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAvLyB0aGlzLnRpdGxlLnggPSB0aGlzLndpZHRoIC8gMjtcbiAgICAvLyB0aGlzLnRpdGxlLnkgPSAxMDA7XG5cblxuICAgIHRoaXMuc3RhcnRCdG4gPSBuZXcgQnRuKCfQmNCz0YDQsNGC0YwnKTtcbiAgICB0aGlzLnN0YXJ0QnRuLnggPSB3aWR0aCAvIDI7XG4gICAgdGhpcy5zdGFydEJ0bi55ID0gMTc1ICsgdGhpcy5oZWlnaHQgLyAyIC0gODA7XG4gICAgLy8gdGhpcy5zdGFydEJ0bi5kaXNhYmxlKCk7XG5cbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuYmcsIHRoaXMudGl0bGUsIHRoaXMuc3RhcnRCdG4pO1xuICAgIC8vIHRoaXMuY3JlYXRlSGVyb2VzKCk7XG5cbiAgICBpZiAoZGF0YU1hbmFnZXIubWF4U2NvcmUpIHtcbiAgICAgIHRoaXMuc2NvcmUgPSBuZXcgY3JlYXRlanMuVGV4dChg0JvRg9GH0YjQuNC5INGB0YfQtdGCOiAke2RhdGFNYW5hZ2VyLm1heFNjb3JlfSDQvGAsICcyNXB4IEd1ZXJpbGxhJywgJyMwMDAnKTtcbiAgICAgIHRoaXMuc2NvcmUueCA9IDM1O1xuICAgICAgdGhpcy5zY29yZS55ID0gMjU7XG4gICAgICB0aGlzLmFkZENoaWxkKHRoaXMuc2NvcmUpO1xuICAgIH1cblxuICAgIGNvbnN0IGhlcm8gPSBuZXcgSGVybygnbW9uc3RlcicpO1xuICAgIGhlcm8ueCA9IHdpZHRoIC8gMjtcbiAgICBoZXJvLnkgPSBoZWlnaHQgLyAyIC0gNzU7XG4gICAgdGhpcy5hZGRDaGlsZChoZXJvKTtcblxuICAgIGNvbnN0IHNvdW5kQnRuID0gbmV3IEljb25CdG4oc291bmRNYW5hZ2VyLmlzRW5hYmxlZCgpID8gJ3NvdW5kJyA6ICdzb3VuZE9mZicpO1xuICAgIHNvdW5kQnRuLnggPSB0aGlzLndpZHRoIC0gc291bmRCdG4uZ2V0Qm91bmRzKCkud2lkdGggLyAyIC0gMjU7XG4gICAgc291bmRCdG4ueSA9IHNvdW5kQnRuLmdldEJvdW5kcygpLmhlaWdodCAvIDIgKyAyMDtcbiAgICB0aGlzLmFkZENoaWxkKHNvdW5kQnRuKTtcblxuICAgIHNvdW5kQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgc291bmRNYW5hZ2VyLnRvZ2dsZSgpO1xuICAgICAgc291bmRCdG4uY2hhbmdlTGFiZWwoc291bmRNYW5hZ2VyLmlzRW5hYmxlZCgpID8gJ3NvdW5kJyA6ICdzb3VuZE9mZicpO1xuICAgICAgc2VydmVyTWFuYWdlci5zZXQoJ3NvdW5kJywgc291bmRNYW5hZ2VyLmlzRW5hYmxlZCgpKTtcbiAgICB9KTtcblxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICB9XG4gIGNyZWF0ZUhlcm9lcygpIHtcbiAgICB0aGlzLmhlcm9lcyA9IFtcbiAgICAgIG5ldyBIZXJvKCdiaXJkJyksXG4gICAgICBuZXcgSGVybygnbW9uc3RlcicpLFxuICAgICAgbmV3IEhlcm8oJ2NoaWNrZW4nKSxcbiAgICBdO1xuICAgIHRoaXMuaGVyb2VzLmZvckVhY2goKGhlcm8sIGkpID0+IHtcbiAgICAgIGhlcm8ueSA9IHRoaXMuaGVpZ2h0IC8gMjtcbiAgICAgIGhlcm8ueCA9IChpICsgMSkgKiB0aGlzLndpZHRoIC8gKHRoaXMuaGVyb2VzLmxlbmd0aCArIDEpO1xuICAgICAgaGVyby5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgICBoZXJvLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5zZWxlY3RIZXJvKGhlcm8pKTtcbiAgICAgIGhlcm8uY2FjaGUoMCwgMCwgaGVyby5ib3VuZHMud2lkdGgsIGhlcm8uYm91bmRzLmhlaWdodCk7XG4gICAgfSk7XG4gICAgdGhpcy5oZXJvRmlsdGVyID0gbmV3IGNyZWF0ZWpzLkNvbG9yRmlsdGVyKDAuNiwgMC42LCAwLjYpO1xuICAgIHRoaXMucmVzZXRIZXJvZXMoKTtcbiAgICB0aGlzLmFkZENoaWxkKC4uLnRoaXMuaGVyb2VzKTtcbiAgfVxuICByZXNldEhlcm9lcygpIHtcbiAgICB0aGlzLmhlcm9lcy5mb3JFYWNoKGhlcm8gPT4ge1xuICAgICAgaGVyby5maWx0ZXJzID0gW3RoaXMuaGVyb0ZpbHRlcl07XG4gICAgICBoZXJvLnVwZGF0ZUNhY2hlKCk7XG4gICAgICBoZXJvLnNjYWxlWCA9IDAuODU7XG4gICAgICBoZXJvLnNjYWxlWSA9IDAuODU7XG4gICAgfSk7XG4gIH1cbiAgc2VsZWN0SGVybyhoZXJvKSB7XG4gICAgdGhpcy5yZXNldEhlcm9lcygpO1xuXG4gICAgaGVyby5maWx0ZXJzID0gW107XG4gICAgaGVyby51cGRhdGVDYWNoZSgpO1xuICAgIGhlcm8uc2NhbGVYID0gMTtcbiAgICBoZXJvLnNjYWxlWSA9IDE7XG4gICAgaGVyby5mbGFwKCk7XG5cbiAgICBpZiAoIXRoaXMuc3RhcnRCdG4uZW5hYmxlZCkge1xuICAgICAgdGhpcy5zdGFydEJ0bi5lbmFibGUoKTtcbiAgICB9XG5cbiAgICBkYXRhTWFuYWdlci5oZXJvVHlwZSA9IGhlcm8udHlwZTtcbiAgfVxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PlxuICAgICAgc2NyZWVuc01hbmFnZXIuY2hhbmdlKCdNYWluU2NyZWVuJykpO1xuXG4gICAgdGhpcy5vbktleURvd24gPSBlID0+IHtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDMyKSB7XG4gICAgICAgIHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnTWFpblNjcmVlbicpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd24pO1xuICB9XG4gIGRlc3Ryb3koKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bik7XG4gIH1cbn1cbiJdfQ==
