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
        message: 'Я пролетел ' + score + 'м в игре Flappy Monster!\n                  A сколько сможешь ты?',
        attachments: 'photo-135563388_456239017, https://vk.com/app5782118',
        services: 'twitter'

      });
    }
  },
  invite: function invite() {
    if (this.sever === 'vk') {
      VK.callMethod('showInviteBox');
    }
  },
  isSocial: function isSocial() {
    return this.server === 'vk';
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
    _this.score = new createjs.Text('Результат: ' + _dataManager2.default.score + ' м\n\nРекорд: ' + _dataManager2.default.maxScore + ' м', '40px Guerilla', '#000');
    _this.score.textAlign = 'center';
    _this.score.x = width / 2;
    _this.score.y = 125;

    _this.replayBtn = new _Btn2.default('Еще раз');
    _this.replayBtn.x = width / 2;
    _this.replayBtn.y = 350;

    _this.addChild(_this.bg, _this.score, _this.replayBtn);

    if (_serverManager2.default.isSocial()) {
      _this.shareBtn = new _Btn2.default('Поделиться', 'orange');
      _this.shareBtn.x = width / 2;
      _this.shareBtn.y = 450;
      _this.shareBtn.addEventListener('click', function () {
        return _serverManager2.default.share(_dataManager2.default.score);
      });
      _this.addChild(_this.shareBtn);
    }

    if (_dataManager2.default.score > _dataManager2.default.maxScore) {
      _dataManager2.default.maxScore = _dataManager2.default.score;
      _serverManager2.default.set('maxScore', _dataManager2.default.maxScore);
      _this.score.text = 'Новый рекорд: ' + _dataManager2.default.maxScore + ' м!';
      _this.score.y += 35;
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
        this.hudDistance.text = _dataManager2.default.score + ' м';
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
    _this.startBtn.y = 350;

    _this.inviteBtn = new _Btn2.default('Позвать бро', 'orange');
    _this.inviteBtn.x = width / 2;
    _this.inviteBtn.y = 450;

    _this.addChild(_this.bg, _this.title, _this.startBtn, _this.inviteBtn);
    // this.createHeroes();

    if (_dataManager2.default.maxScore) {
      _this.score = new createjs.Text('Лучший счет: ' + _dataManager2.default.maxScore + ' м', '25px Guerilla', '#000');
      _this.score.x = 35;
      _this.score.y = 25;
      _this.addChild(_this.score);
    }

    var hero = new _Hero2.default('monster');
    hero.x = width / 2;
    hero.y = 190;
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
      this.inviteBtn.addEventListener('click', function () {
        return _serverManager2.default.invite();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvc3JjL2FwcC5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9CYWNrZ3JvdW5kLmpzIiwiYXBwL2pzL3NyYy9kaXNwbGF5L0J0bi5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9IZXJvLmpzIiwiYXBwL2pzL3NyYy9kaXNwbGF5L0ljb25CdG4uanMiLCJhcHAvanMvc3JjL2Rpc3BsYXkvU2hhZG93T3ZlcmxheS5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9TcGlrZS5qcyIsImFwcC9qcy9zcmMvbWFuYWdlcnMvYXNzZXRzTWFuYWdlci5qcyIsImFwcC9qcy9zcmMvbWFuYWdlcnMvZGF0YU1hbmFnZXIuanMiLCJhcHAvanMvc3JjL21hbmFnZXJzL3NjcmVlbnNNYW5hZ2VyLmpzIiwiYXBwL2pzL3NyYy9tYW5hZ2Vycy9zZXJ2ZXJNYW5hZ2VyLmpzIiwiYXBwL2pzL3NyYy9tYW5hZ2Vycy9zb3VuZE1hbmFnZXIuanMiLCJhcHAvanMvc3JjL3NjcmVlbnMvRW5kU2NyZWVuLmpzIiwiYXBwL2pzL3NyYy9zY3JlZW5zL01haW5TY3JlZW4uanMiLCJhcHAvanMvc3JjL3NjcmVlbnMvU3RhcnRTY3JlZW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU0sUUFBUSxJQUFJLFNBQVMsS0FBYixDQUFtQixZQUFuQixDQUFkO0FBQ0EseUJBQWUsSUFBZixDQUFvQixLQUFwQjs7QUFFQSxJQUFJLFNBQVMsT0FBYjs7QUFFQSxJQUFJLFdBQVcsT0FBTyxNQUF0QixFQUE4QjtBQUM1QixNQUFJLFNBQVMsUUFBVCxDQUFrQixRQUFsQixDQUEyQixXQUEzQixDQUFKLEVBQTZDO0FBQzNDLGFBQVMsSUFBVDtBQUNEO0FBQ0Q7QUFDQSxTQUFPLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDO0FBQUEsV0FB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LFdBQUssSUFBTDs7QUFFQSxVQUFJLENBQUMsS0FBSyxRQUFMLENBQWMsT0FBbkIsRUFBNEI7QUFDMUIsYUFBSyxRQUFMLENBQWMsTUFBZDtBQUNEOztBQUVELDRCQUFZLFFBQVosR0FBdUIsS0FBSyxJQUE1QjtBQUNEOzs7aUNBQ1k7QUFDWCxXQUFLLFFBQUwsQ0FBYyxnQkFBZCxDQUErQixPQUEvQixFQUF3QztBQUFBLGVBQ3RDLHlCQUFlLE1BQWYsQ0FBc0IsWUFBdEIsQ0FEc0M7QUFBQSxPQUF4QztBQUVBLFdBQUssU0FBTCxDQUFlLGdCQUFmLENBQWdDLE9BQWhDLEVBQXlDO0FBQUEsZUFDdkMsd0JBQWMsTUFBZCxFQUR1QztBQUFBLE9BQXpDOztBQUdBLFdBQUssU0FBTCxHQUFpQixhQUFLO0FBQ3BCLFlBQUksRUFBRSxPQUFGLEtBQWMsRUFBbEIsRUFBc0I7QUFDcEIsbUNBQWUsTUFBZixDQUFzQixZQUF0QjtBQUNBLFlBQUUsY0FBRjtBQUNEO0FBQ0YsT0FMRDs7QUFPQSxhQUFPLGdCQUFQLENBQXdCLFNBQXhCLEVBQW1DLEtBQUssU0FBeEM7QUFDRDs7OzhCQUNTO0FBQ1IsYUFBTyxtQkFBUCxDQUEyQixTQUEzQixFQUFzQyxLQUFLLFNBQTNDO0FBQ0Q7Ozs7RUE1R3NDLFNBQVMsUzs7a0JBQTdCLFciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHNjcmVlbnNNYW5hZ2VyIGZyb20gJy4vbWFuYWdlcnMvc2NyZWVuc01hbmFnZXInO1xuaW1wb3J0IGFzc2V0c01hbmFnZXIgZnJvbSAnLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcbmltcG9ydCBzZXJ2ZXJNYW5hZ2VyIGZyb20gJy4vbWFuYWdlcnMvc2VydmVyTWFuYWdlcic7XG5pbXBvcnQgc291bmRNYW5hZ2VyIGZyb20gJy4vbWFuYWdlcnMvc291bmRNYW5hZ2VyJztcbmltcG9ydCBkYXRhTWFuYWdlciBmcm9tICcuL21hbmFnZXJzL2RhdGFNYW5hZ2VyJztcblxuY29uc3Qgc3RhZ2UgPSBuZXcgY3JlYXRlanMuU3RhZ2UoJ2dhbWUtc3RhZ2UnKTtcbnNjcmVlbnNNYW5hZ2VyLmluaXQoc3RhZ2UpO1xuXG5sZXQgc2VydmVyID0gJ2xvY2FsJztcblxuaWYgKHdpbmRvdyAhPT0gd2luZG93LnBhcmVudCkge1xuICBpZiAoZG9jdW1lbnQucmVmZXJyZXIuaW5jbHVkZXMoJzovL3ZrLmNvbScpKSB7XG4gICAgc2VydmVyID0gJ3ZrJztcbiAgfVxuICAvLyBjcmVhdGVqcyBzdGFnZSBjbGljayBkb3NudCB0cmlnZ2VyIHdpbmRvdy5mb2N1c1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB3aW5kb3cuZm9jdXMoKSk7XG59XG5cblByb21pc2UuYWxsKFtcbiAgYXNzZXRzTWFuYWdlci5pbml0KCksXG4gIHNlcnZlck1hbmFnZXIuaW5pdChzZXJ2ZXIpLFxuXSlcbiAgLnRoZW4oKCkgPT4gUHJvbWlzZS5hbGwoW1xuICAgIHNlcnZlck1hbmFnZXIuZ2V0KCdtYXhTY29yZScpXG4gICAgICAudGhlbihyID0+IGRhdGFNYW5hZ2VyLmluaXQoK3IpKSxcbiAgICBzZXJ2ZXJNYW5hZ2VyLmdldCgnc291bmQnKVxuICAgICAgLnRoZW4oXG4gICAgICAgIC8vIHNvdW5kIG9uIGJ5IGRlZmF1bHQgYW5kIG9uIHNlcnZlciBlcnJvclxuICAgICAgICByID0+IHNvdW5kTWFuYWdlci5pbml0KHIgPT09ICcnID8gdHJ1ZSA6ICEhciksXG4gICAgICAgICgpID0+IHNvdW5kTWFuYWdlci5pbml0KHRydWUpLFxuICAgICAgKSxcbiAgXSkpXG4gIC50aGVuKCgpID0+IHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnU3RhcnRTY3JlZW4nKSlcbiAgLmNhdGNoKGUgPT4gY29uc29sZS5lcnJvcignaW5pdCBlcnJvciwgcmVsb2FkIHBhZ2UnLCBlKSk7XG5cbmlmIChjcmVhdGVqcy5Ub3VjaC5pc1N1cHBvcnRlZCgpKSB7XG4gIGNyZWF0ZWpzLlRvdWNoLmVuYWJsZShzdGFnZSwgdHJ1ZSk7XG59IGVsc2Uge1xuICBzdGFnZS5lbmFibGVNb3VzZU92ZXIoMjApO1xufVxuIiwiaW1wb3J0IGFzc2V0c01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvYXNzZXRzTWFuYWdlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhY2tncm91bmQgZXh0ZW5kcyBjcmVhdGVqcy5TaGFwZSB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGNhbnZhc1dpZHRoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuaW1nID0gYXNzZXRzTWFuYWdlci5nZXRSZXN1bHQobmFtZSk7XG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLmltZy53aWR0aCArIGNhbnZhc1dpZHRoO1xuXG4gICAgdGhpcy5ncmFwaGljcy5iZWdpbkJpdG1hcEZpbGwodGhpcy5pbWcsICdyZXBlYXQteCcpLmRyYXdSZWN0KDAsIDAsIHdpZHRoLCB0aGlzLmltZy5oZWlnaHQpO1xuICAgIHRoaXMucmVnWSA9IHRoaXMuaW1nLmhlaWdodDtcbiAgICB0aGlzLmNhY2hlKDAsIDAsIHdpZHRoLCB0aGlzLmltZy5oZWlnaHQpO1xuICB9XG4gIG1vdmUocGF0aCkge1xuICAgIHRoaXMueCAtPSBwYXRoO1xuICAgIHRoaXMueCAlPSB0aGlzLmltZy53aWR0aDtcbiAgfVxufVxuIiwiaW1wb3J0IGFzc2V0c01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvYXNzZXRzTWFuYWdlcic7XG5pbXBvcnQgc291bmRNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NvdW5kTWFuYWdlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ0biBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKGxhYmVsLCBjb2xvciA9ICdncmVlbicsIHR5cGUgPSAnYnRuJykge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcblxuICAgIHRoaXMuY3JlYXRlQmcodHlwZSk7XG4gICAgdGhpcy5jcmVhdGVMYWJlbChsYWJlbCk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT5cbiAgICAgIHRoaXMuZW5hYmxlZCAmJiBzb3VuZE1hbmFnZXIuaXNFbmFibGVkKCkgJiYgY3JlYXRlanMuU291bmQucGxheSgnZmxhcCcpKTtcbiAgfVxuICBjcmVhdGVCZyh0eXBlKSB7XG4gICAgdGhpcy5iZyA9IG5ldyBjcmVhdGVqcy5TcHJpdGUoYXNzZXRzTWFuYWdlci5nZXRTcHJpdGVTaGVldCh0eXBlKSk7XG4gICAgdGhpcy5iZy5yZWdYID0gdGhpcy5iZy5nZXRCb3VuZHMoKS53aWR0aCAvIDI7XG4gICAgdGhpcy5iZy5yZWdZID0gdGhpcy5iZy5nZXRCb3VuZHMoKS5oZWlnaHQgLyAyO1xuICAgIHRoaXMuaGVscGVyID0gbmV3IGNyZWF0ZWpzLkJ1dHRvbkhlbHBlcih0aGlzLmJnLCBgJHt0aGlzLmNvbG9yfU91dGAsIGAke3RoaXMuY29sb3J9T3ZlcmAsIGAke3RoaXMuY29sb3J9RG93bmApO1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5iZyk7XG4gIH1cbiAgY3JlYXRlTGFiZWwobGFiZWwpIHtcbiAgICB0aGlzLmxhYmVsID0gbmV3IGNyZWF0ZWpzLlRleHQobGFiZWwsICczMHB4IEd1ZXJpbGxhJywgJyNmZmYnKTtcbiAgICB0aGlzLmxhYmVsLnNoYWRvdyA9IG5ldyBjcmVhdGVqcy5TaGFkb3coJyMwMDAnLCAwLCAxLCA1KTtcbiAgICB0aGlzLmxhYmVsLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRoaXMubGFiZWwudGV4dEJhc2VsaW5lID0gJ21pZGRsZSc7XG4gICAgdGhpcy5sYWJlbC5tb3VzZUVuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLmxhYmVsLnkgPSAtMztcblxuICAgIC8vIHRvZG8gY2FjaGVcbiAgICAvLyBub3cgaXQgY2FjaGUgYmVmb3JlIGZvbnQgbG9hZCAoXG4gICAgLy8gY29uc3QgaCA9IHRoaXMubGFiZWwuZ2V0TWVhc3VyZWRIZWlnaHQoKSArIDY7IC8vIGFkZCA2IGNvcyBvZiBzaGFkb3dcbiAgICAvLyBjb25zdCB3ID0gdGhpcy5sYWJlbC5nZXRNZWFzdXJlZFdpZHRoKCkgKyA2O1xuICAgIC8vIHRoaXMubGFiZWwuY2FjaGUoLXcgLyAyLCAtaCAvIDIsIHcsIGgpO1xuXG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmxhYmVsKTtcbiAgfVxuICBkaXNhYmxlKCkge1xuICAgIHRoaXMuYmcuZ290b0FuZFN0b3AoJ2Rpc2FibGUnKTtcbiAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xuICB9XG4gIGVuYWJsZSgpIHtcbiAgICB0aGlzLmJnLmdvdG9BbmRTdG9wKGAke3RoaXMuY29sb3J9T3V0YCk7XG4gICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcbiAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IHRydWU7XG4gIH1cbn1cbiIsImltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuaW1wb3J0IHNvdW5kTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zb3VuZE1hbmFnZXInO1xuXG5jb25zdCBDT05GSUcgPSB7XG4gIEc6IDU1MCxcbiAgQTogMzc1LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVybyBleHRlbmRzIGNyZWF0ZWpzLlNwcml0ZSB7XG4gIGNvbnN0cnVjdG9yKHR5cGUpIHtcbiAgICBzdXBlcihhc3NldHNNYW5hZ2VyLmdldFNwcml0ZVNoZWV0KHR5cGUpKTtcblxuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5ib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpO1xuICAgIHRoaXMucmVnWCA9IHRoaXMuYm91bmRzLndpZHRoIC8gMjtcbiAgICB0aGlzLnJlZ1kgPSB0aGlzLmJvdW5kcy5oZWlnaHQgLyAyO1xuXG4gICAgdGhpcy5kZWFkID0gZmFsc2U7XG4gICAgdGhpcy52WSA9IDA7XG4gIH1cbiAgZmxhcCgpIHtcbiAgICBpZiAodGhpcy5kZWFkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudlkgPSBNYXRoLm1heCh0aGlzLnZZIC0gQ09ORklHLkEsIC1DT05GSUcuQSk7XG4gICAgdGhpcy5nb3RvQW5kUGxheSgnZmxhcCcpO1xuICAgIGlmIChzb3VuZE1hbmFnZXIuaXNFbmFibGVkKCkpIHtcbiAgICAgIGNyZWF0ZWpzLlNvdW5kLnBsYXkoJ2ZsYXAnKTtcbiAgICB9XG4gIH1cbiAgbW92ZSh0aW1lKSB7XG4gICAgdGhpcy55ICs9ICgoQ09ORklHLkcgKiB0aW1lICogMC41KSArIHRoaXMudlkpICogdGltZTtcbiAgICB0aGlzLnZZICs9IENPTkZJRy5HICogdGltZTtcbiAgfVxuICBkaWUoKSB7XG4gICAgaWYgKHRoaXMuZGVhZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmRlYWQgPSB0cnVlO1xuICAgIHRoaXMucm90YXRpb24gPSAzMDtcbiAgICB0aGlzLmdvdG9BbmRTdG9wKCdkZWFkJyk7XG4gICAgaWYgKHNvdW5kTWFuYWdlci5pc0VuYWJsZWQoKSkge1xuICAgICAgY3JlYXRlanMuU291bmQucGxheSgnbG9vc2UnKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuaW1wb3J0IEJ0biBmcm9tICcuL0J0bic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEljb25CdG4gZXh0ZW5kcyBCdG4ge1xuICBjb25zdHJ1Y3RvcihsYWJlbCwgY29sb3IgPSAnb3JhbmdlJykge1xuICAgIHN1cGVyKGxhYmVsLCBjb2xvciwgJ2ljb25CdG4nKTtcbiAgfVxuICBjcmVhdGVMYWJlbChsYWJlbCkge1xuICAgIHRoaXMubGFiZWwgPSBuZXcgY3JlYXRlanMuU3ByaXRlKGFzc2V0c01hbmFnZXIuZ2V0U3ByaXRlU2hlZXQoJ2ljb24nKSwgbGFiZWwpO1xuICAgIHRoaXMubGFiZWwucmVnWCA9IHRoaXMubGFiZWwuZ2V0Qm91bmRzKCkud2lkdGggLyAyO1xuICAgIHRoaXMubGFiZWwucmVnWSA9IHRoaXMubGFiZWwuZ2V0Qm91bmRzKCkuaGVpZ2h0IC8gMjtcbiAgICB0aGlzLmxhYmVsLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5sYWJlbCk7XG4gIH1cbiAgY2hhbmdlTGFiZWwobGFiZWwpIHtcbiAgICB0aGlzLmxhYmVsLmdvdG9BbmRTdG9wKGxhYmVsKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hhZG93T3ZlcmxheSBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5zaGFkb3cgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbiAgICB0aGlzLnNoYWRvdy5ncmFwaGljcy5iZWdpbkZpbGwoJ3JnYmEoMCwgMCwgMCwgMC42KScpLmRyYXdSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgdGhpcy5zaGFkb3dUZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoJycsICcyNXB4IEd1ZXJpbGxhJywgJyNmZmYnKTtcbiAgICB0aGlzLnNoYWRvd1RleHQueSA9IGhlaWdodCAvIDI7XG4gICAgdGhpcy5zaGFkb3dUZXh0LnggPSB3aWR0aCAvIDI7XG4gICAgdGhpcy5zaGFkb3dUZXh0LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRoaXMuc2hhZG93VGV4dC50ZXh0QmFzZWxpbmUgPSAnbWlkZGxlJztcblxuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5zaGFkb3csIHRoaXMuc2hhZG93VGV4dCk7XG4gICAgLy8gdG9kb1xuICAgIC8vIHRoaXMuY2FjaGUoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gIH1cbiAgc2V0VGV4dCh0ZXh0KSB7XG4gICAgdGhpcy5zaGFkb3dUZXh0LnRleHQgPSB0ZXh0O1xuICAgIC8vIHRoaXMudXBkYXRlQ2FjaGUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IGFzc2V0c01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvYXNzZXRzTWFuYWdlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwaWtlIGV4dGVuZHMgY3JlYXRlanMuQml0bWFwIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoYXNzZXRzTWFuYWdlci5nZXRSZXN1bHQoJ3NwaWtlJykpO1xuXG4gICAgdGhpcy5ib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpO1xuICAgIHRoaXMucmVnWCA9IHRoaXMuYm91bmRzLndpZHRoIC8gMjtcbiAgICB0aGlzLnJlZ1kgPSB0aGlzLmJvdW5kcy5oZWlnaHQ7XG4gIH1cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5zY2FsZVkgPSAwLjcgKyAoTWF0aC5yYW5kb20oKSAqIDAuNSk7XG4gIH1cbn1cbiIsImNvbnN0IG1hbmlmZXN0ID0gW1xuICB7IGlkOiAnbW9uc3RlcicsIHNyYzogJ2ltZy9tb25zdGVyLXNwcml0ZS5wbmcnIH0sXG4gIHsgaWQ6ICdiaXJkJywgc3JjOiAnaW1nL2JpcmQtc3ByaXRlLnBuZycgfSxcbiAgeyBpZDogJ2NoaWNrZW4nLCBzcmM6ICdpbWcvY2hpY2tlbi1zcHJpdGUucG5nJyB9LFxuICB7IGlkOiAnc3Bpa2UnLCBzcmM6ICdpbWcvc3Bpa2UucG5nJyB9LFxuICB7IGlkOiAnc2t5Jywgc3JjOiAnaW1nL2JnL3NreS5wbmcnIH0sXG4gIHsgaWQ6ICdzdGFydCcsIHNyYzogJ2ltZy9iZy9zdGFydC5wbmcnIH0sXG4gIHsgaWQ6ICdtb3VudGFpbicsIHNyYzogJ2ltZy9iZy9tb3VudGFpbi5wbmcnIH0sXG4gIHsgaWQ6ICdncm91bmQnLCBzcmM6ICdpbWcvYmcvZ3JvdW5kLnBuZycgfSxcbiAgeyBpZDogJ2J0bicsIHNyYzogJ2ltZy9idG4tc3ByaXRlLnBuZycgfSxcbiAgeyBpZDogJ2ljb24tYnRuJywgc3JjOiAnaW1nL2ljb24tYnRuLXNwcml0ZS5wbmcnIH0sXG4gIHsgaWQ6ICdpY29uJywgc3JjOiAnaW1nL2ljb24tc3ByaXRlLnBuZycgfSxcbiAgeyBpZDogJ2JhY2snLCBzcmM6ICdzb3VuZC9iYWNrZ3JvdW5kLm9nZycgfSxcbiAgeyBpZDogJ2ZsYXAnLCBzcmM6ICdzb3VuZC9mbGFwLm9nZycgfSxcbiAgeyBpZDogJ2xvb3NlJywgc3JjOiAnc291bmQvbG9vc2Uub2dnJyB9LFxuXTtcblxuY29uc3QgZ2V0SGVyb1Nwcml0ZVNoZWV0RGF0YSA9IG5hbWUgPT4gKHtcbiAgaW1hZ2VzOiBbbmFtZV0sXG4gIGZyYW1lczogeyB3aWR0aDogMTAwLCBoZWlnaHQ6IDc4IH0sXG4gIGFuaW1hdGlvbnM6IHtcbiAgICBmbHk6IDAsXG4gICAgZmxhcDogWzEsIDMsICdmbHknXSxcbiAgICBkZWFkOiA0LFxuICB9LFxufSk7XG5cbmNvbnN0IHNwcml0ZVNoZWV0c0RhdGEgPSB7XG4gIGJpcmQ6IGdldEhlcm9TcHJpdGVTaGVldERhdGEoJ2JpcmQnKSxcbiAgbW9uc3RlcjogZ2V0SGVyb1Nwcml0ZVNoZWV0RGF0YSgnbW9uc3RlcicpLFxuICBjaGlja2VuOiBnZXRIZXJvU3ByaXRlU2hlZXREYXRhKCdjaGlja2VuJyksXG4gIGJ0bjoge1xuICAgIGltYWdlczogWydidG4nXSxcbiAgICBmcmFtZXM6IHsgd2lkdGg6IDIxMCwgaGVpZ2h0OiA2OSwgc3BhY2luZzogMiB9LFxuICAgIGFuaW1hdGlvbnM6IHtcbiAgICAgIGdyZWVuT3V0OiAwLFxuICAgICAgZ3JlZW5PdmVyOiAyLFxuICAgICAgZ3JlZW5Eb3duOiA0LFxuICAgICAgb3JhbmdlT3V0OiA2LFxuICAgICAgb3JhbmdlT3ZlcjogOCxcbiAgICAgIG9yYW5nZURvd246IDEsXG4gICAgICByZWRPdXQ6IDMsXG4gICAgICByZWRPdmVyOiA1LFxuICAgICAgcmVkRG93bjogNyxcbiAgICAgIGRpc2FibGU6IDksXG4gICAgfSxcbiAgfSxcbiAgaWNvbkJ0bjoge1xuICAgIGltYWdlczogWydpY29uLWJ0biddLFxuICAgIGZyYW1lczogeyB3aWR0aDogNjksIGhlaWdodDogNzEsIHNwYWNpbmc6IDIgfSxcbiAgICBhbmltYXRpb25zOiB7XG4gICAgICBncmVlbk91dDogMCxcbiAgICAgIGdyZWVuT3ZlcjogMSxcbiAgICAgIGdyZWVuRG93bjogMixcbiAgICAgIG9yYW5nZU91dDogMyxcbiAgICAgIG9yYW5nZU92ZXI6IDQsXG4gICAgICBvcmFuZ2VEb3duOiA1LFxuICAgICAgcmVkT3V0OiA4LFxuICAgICAgcmVkT3ZlcjogNyxcbiAgICAgIHJlZERvd246IDYsXG4gICAgICBkaXNhYmxlOiA5LFxuICAgIH0sXG4gIH0sXG4gIGljb246IHtcbiAgICBpbWFnZXM6IFsnaWNvbiddLFxuICAgIGZyYW1lczogeyB3aWR0aDogNDAsIGhlaWdodDogNDAgfSxcbiAgICBhbmltYXRpb25zOiB7XG4gICAgICBzb3VuZDogMCxcbiAgICAgIHNvdW5kT2ZmOiAxLFxuICAgIH0sXG4gIH0sXG59O1xuXG5jb25zdCBzcHJpdGVTaGVldHMgPSB7fTtcblxuY29uc3QgYXNzZXRzTWFuYWdlciA9IHtcbiAgaW5pdCgpIHtcbiAgICBjcmVhdGVqcy5Tb3VuZC5hbHRlcm5hdGVFeHRlbnNpb25zID0gWydtcDMnXTtcbiAgICB0aGlzLnF1ZXVlID0gbmV3IGNyZWF0ZWpzLkxvYWRRdWV1ZSgpO1xuICAgIHRoaXMucXVldWUuaW5zdGFsbFBsdWdpbihjcmVhdGVqcy5Tb3VuZCk7XG4gICAgdGhpcy5xdWV1ZS5sb2FkTWFuaWZlc3QobWFuaWZlc3QpO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMucXVldWUuYWRkRXZlbnRMaXN0ZW5lcignY29tcGxldGUnLCAoKSA9PiByZXNvbHZlKCkpO1xuICAgICAgdGhpcy5xdWV1ZS5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsICgpID0+IHJlamVjdCgpKTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0UmVzdWx0KG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5xdWV1ZS5nZXRSZXN1bHQobmFtZSk7XG4gIH0sXG4gIGdldFNwcml0ZVNoZWV0KG5hbWUpIHtcbiAgICBpZiAoIXNwcml0ZVNoZWV0c1tuYW1lXSkge1xuICAgICAgY29uc3QgZGF0YSA9IHNwcml0ZVNoZWV0c0RhdGFbbmFtZV07XG5cbiAgICAgIGlmICghZGF0YSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgc3ByaXRlU2hlZXQgbmFtZScpO1xuICAgICAgfVxuXG4gICAgICBkYXRhLmltYWdlcyA9IGRhdGEuaW1hZ2VzLm1hcChpbWcgPT4gdGhpcy5nZXRSZXN1bHQoaW1nKSk7XG4gICAgICBzcHJpdGVTaGVldHNbbmFtZV0gPSBuZXcgY3JlYXRlanMuU3ByaXRlU2hlZXQoZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNwcml0ZVNoZWV0c1tuYW1lXTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFzc2V0c01hbmFnZXI7XG4iLCJjb25zdCBkYXRhTWFuYWdlciA9IHtcbiAgaW5pdChtYXhTY29yZSkge1xuICAgIHRoaXMubWF4U2NvcmUgPSBtYXhTY29yZTtcbiAgICB0aGlzLnNjb3JlID0gMDtcbiAgICB0aGlzLmhlcm9UeXBlID0gJ21vbnN0ZXInO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGF0YU1hbmFnZXI7XG4iLCJpbXBvcnQgU3RhcnRTY3JlZW4gZnJvbSAnLi4vc2NyZWVucy9TdGFydFNjcmVlbic7XG5pbXBvcnQgTWFpblNjcmVlbiBmcm9tICcuLi9zY3JlZW5zL01haW5TY3JlZW4nO1xuaW1wb3J0IEVuZFNjcmVlbiBmcm9tICcuLi9zY3JlZW5zL0VuZFNjcmVlbic7XG5cbmNvbnN0IHNjcmVlbk1hbmFnZXIgPSB7XG4gIGluaXQoc3RhZ2UpIHtcbiAgICB0aGlzLnN0YWdlID0gc3RhZ2U7XG4gICAgdGhpcy5jdXJyZW50U2NyZWVuID0gbnVsbDtcbiAgICB0aGlzLnNjcmVlbnMgPSB7XG4gICAgICBTdGFydFNjcmVlbixcbiAgICAgIE1haW5TY3JlZW4sXG4gICAgICBFbmRTY3JlZW4sXG4gICAgfTtcblxuICAgIGNyZWF0ZWpzLlRpY2tlci50aW1pbmdNb2RlID0gY3JlYXRlanMuVGlja2VyLlJBRjtcbiAgICBjcmVhdGVqcy5UaWNrZXIuYWRkRXZlbnRMaXN0ZW5lcigndGljaycsIGUgPT4ge1xuICAgICAgaWYgKHRoaXMuY3VycmVudFNjcmVlbiAmJiB0aGlzLmN1cnJlbnRTY3JlZW4udGljaykge1xuICAgICAgICB0aGlzLmN1cnJlbnRTY3JlZW4udGljayhlKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3RhZ2UudXBkYXRlKGUpO1xuICAgIH0pO1xuICB9LFxuICBjaGFuZ2UobmFtZSkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRTY3JlZW4pIHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRTY3JlZW4uZGVzdHJveSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRTY3JlZW4uZGVzdHJveSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5zdGFnZS5yZW1vdmVDaGlsZCh0aGlzLmN1cnJlbnRTY3JlZW4pO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRTY3JlZW4gPSBuZXcgdGhpcy5zY3JlZW5zW25hbWVdKHRoaXMuc3RhZ2UuY2FudmFzLndpZHRoLCB0aGlzLnN0YWdlLmNhbnZhcy5oZWlnaHQpO1xuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5jdXJyZW50U2NyZWVuKTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNjcmVlbk1hbmFnZXI7XG4iLCJjb25zdCBzZXJ2ZXJNYW5hZ2VyID0ge1xuICBpbml0KHNlcnZlcikge1xuICAgIHRoaXMuc2VydmVyID0gc2VydmVyO1xuXG4gICAgLy8gdG9kbyB1c2UgbG9jYWxzdG9yYWdlIGlmIG5vdCB2ayBlbnZcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBzd2l0Y2ggKHNlcnZlcikge1xuICAgICAgICBjYXNlICdsb2NhbCc6XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd2ayc6XG4gICAgICAgICAgVksuaW5pdChcbiAgICAgICAgICAgICgpID0+IHJlc29sdmUoKSxcbiAgICAgICAgICAgIGUgPT4gcmVqZWN0KCd2ayBpbml0IGVycm9yJywgZSksXG4gICAgICAgICAgJzUuNjAnKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZWplY3QoJ3dyb25nIHNlcnZlciBuYW1lJyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG4gIGdldChrZXkpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgc3dpdGNoICh0aGlzLnNlcnZlcikge1xuICAgICAgICBjYXNlICdsb2NhbCc6XG4gICAgICAgICAgcmVzb2x2ZSh7IHJlc3BvbnNlOiAnJyB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAndmsnOlxuICAgICAgICAgIFZLLmFwaSgnc3RvcmFnZS5nZXQnLCB7IGtleSB9LCByZXNvbHZlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZWplY3QoJ3dyb25nIHNlcnZlciBuYW1lJyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSkudGhlbihyID0+IHtcbiAgICAgIGlmIChyLmVycm9yKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihyLmVycm9yKTtcbiAgICAgIH0gZWxzZSBpZiAoci5yZXNwb25zZSA9PT0gJycpIHtcbiAgICAgICAgLy8gY2FudCBKU09OLnBhcnNlIGVtcHR5IHN0cmluZyBidXQgbmVlZCB0byBnZXQgZGVmYXVsdCB2YWx1ZVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShyLnJlc3BvbnNlKTtcbiAgICB9KTtcbiAgfSxcbiAgc2V0KGtleSwgdmFsdWUpIHtcbiAgICBpZiAodGhpcy5zZXJ2ZXIgPT09ICd2aycpIHtcbiAgICAgIFZLLmFwaSgnc3RvcmFnZS5zZXQnLCB7IGtleSwgdmFsdWUgfSk7XG4gICAgfVxuICB9LFxuICBzaGFyZShzY29yZSkge1xuICAgIGlmICh0aGlzLnNlcnZlciA9PT0gJ3ZrJykge1xuICAgICAgVksuYXBpKCd3YWxsLnBvc3QnLCB7XG4gICAgICAgIG1lc3NhZ2U6IGDQryDQv9GA0L7Qu9C10YLQtdC7ICR7c2NvcmV90Lwg0LIg0LjQs9GA0LUgRmxhcHB5IE1vbnN0ZXIhXG4gICAgICAgICAgICAgICAgICBBINGB0LrQvtC70YzQutC+INGB0LzQvtC20LXRiNGMINGC0Ys/YCxcbiAgICAgICAgYXR0YWNobWVudHM6ICdwaG90by0xMzU1NjMzODhfNDU2MjM5MDE3LCBodHRwczovL3ZrLmNvbS9hcHA1NzgyMTE4JyxcbiAgICAgICAgc2VydmljZXM6ICd0d2l0dGVyJyxcblxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuICBpbnZpdGUoKSB7XG4gICAgaWYgKHRoaXMuc2V2ZXIgPT09ICd2aycpIHtcbiAgICAgIFZLLmNhbGxNZXRob2QoJ3Nob3dJbnZpdGVCb3gnKTtcbiAgICB9XG4gIH0sXG4gIGlzU29jaWFsKCkge1xuICAgIHJldHVybiB0aGlzLnNlcnZlciA9PT0gJ3ZrJztcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNlcnZlck1hbmFnZXI7XG4iLCJjb25zdCBzb3VuZE1hbmFnZXIgPSB7XG4gIGluaXQoZW5hYmxlKSB7XG4gICAgdGhpcy5lbmFibGVkID0gZW5hYmxlO1xuICAgIHRoaXMuYmcgPSBjcmVhdGVqcy5Tb3VuZC5wbGF5KCdiYWNrJywgeyBsb29wOiAtMSwgdm9sdW1lOiAwLjMgfSk7XG4gICAgdGhpcy5iZy5wYXVzZWQgPSAhdGhpcy5lbmFibGVkO1xuICAgIC8vIHNvbWV0aW1lcyBuZWdhdGl2ZSB2YWx1ZSBvY2N1cnMgYW5kIHRocm93IGVycm9yXG4gICAgdGhpcy5iZy5wb3NpdGlvbiA9IDA7XG4gIH0sXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzLmVuYWJsZWQgPSAhdGhpcy5lbmFibGVkO1xuICAgIHRoaXMuYmcucGF1c2VkID0gIXRoaXMuZW5hYmxlZDtcbiAgfSxcbiAgaXNFbmFibGVkKCkge1xuICAgIHJldHVybiB0aGlzLmVuYWJsZWQ7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBzb3VuZE1hbmFnZXI7XG4iLCJpbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcbmltcG9ydCBzY3JlZW5zTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zY3JlZW5zTWFuYWdlcic7XG5pbXBvcnQgc2VydmVyTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zZXJ2ZXJNYW5hZ2VyJztcbmltcG9ydCBkYXRhTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9kYXRhTWFuYWdlcic7XG5pbXBvcnQgc291bmRNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NvdW5kTWFuYWdlcic7XG5pbXBvcnQgSWNvbkJ0biBmcm9tICcuLi9kaXNwbGF5L0ljb25CdG4nO1xuaW1wb3J0IEJ0biBmcm9tICcuLi9kaXNwbGF5L0J0bic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVuZFNjcmVlbiBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuYmcgPSBuZXcgY3JlYXRlanMuQml0bWFwKGFzc2V0c01hbmFnZXIuZ2V0UmVzdWx0KCdzdGFydCcpKTtcbiAgICB0aGlzLnNjb3JlID0gbmV3IGNyZWF0ZWpzLlRleHQoYNCg0LXQt9GD0LvRjNGC0LDRgjogJHtkYXRhTWFuYWdlci5zY29yZX0g0LxcXG5cXG7QoNC10LrQvtGA0LQ6ICR7ZGF0YU1hbmFnZXIubWF4U2NvcmV9INC8YCwgJzQwcHggR3VlcmlsbGEnLCAnIzAwMCcpO1xuICAgIHRoaXMuc2NvcmUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgdGhpcy5zY29yZS54ID0gd2lkdGggLyAyO1xuICAgIHRoaXMuc2NvcmUueSA9IDEyNTtcblxuICAgIHRoaXMucmVwbGF5QnRuID0gbmV3IEJ0bign0JXRidC1INGA0LDQtycpO1xuICAgIHRoaXMucmVwbGF5QnRuLnggPSB3aWR0aCAvIDI7XG4gICAgdGhpcy5yZXBsYXlCdG4ueSA9IDM1MDtcblxuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5iZywgdGhpcy5zY29yZSwgdGhpcy5yZXBsYXlCdG4pO1xuXG4gICAgaWYgKHNlcnZlck1hbmFnZXIuaXNTb2NpYWwoKSkge1xuICAgICAgdGhpcy5zaGFyZUJ0biA9IG5ldyBCdG4oJ9Cf0L7QtNC10LvQuNGC0YzRgdGPJywgJ29yYW5nZScpO1xuICAgICAgdGhpcy5zaGFyZUJ0bi54ID0gd2lkdGggLyAyO1xuICAgICAgdGhpcy5zaGFyZUJ0bi55ID0gNDUwO1xuICAgICAgdGhpcy5zaGFyZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNlcnZlck1hbmFnZXIuc2hhcmUoZGF0YU1hbmFnZXIuc2NvcmUpKTtcbiAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5zaGFyZUJ0bik7XG4gICAgfVxuXG4gICAgaWYgKGRhdGFNYW5hZ2VyLnNjb3JlID4gZGF0YU1hbmFnZXIubWF4U2NvcmUpIHtcbiAgICAgIGRhdGFNYW5hZ2VyLm1heFNjb3JlID0gZGF0YU1hbmFnZXIuc2NvcmU7XG4gICAgICBzZXJ2ZXJNYW5hZ2VyLnNldCgnbWF4U2NvcmUnLCBkYXRhTWFuYWdlci5tYXhTY29yZSk7XG4gICAgICB0aGlzLnNjb3JlLnRleHQgPSBg0J3QvtCy0YvQuSDRgNC10LrQvtGA0LQ6ICR7ZGF0YU1hbmFnZXIubWF4U2NvcmV9INC8IWA7XG4gICAgICB0aGlzLnNjb3JlLnkgKz0gMzU7XG4gICAgfVxuXG4gICAgY29uc3Qgc291bmRCdG4gPSBuZXcgSWNvbkJ0bihzb3VuZE1hbmFnZXIuaXNFbmFibGVkKCkgPyAnc291bmQnIDogJ3NvdW5kT2ZmJyk7XG4gICAgc291bmRCdG4ueCA9IHdpZHRoIC0gc291bmRCdG4uZ2V0Qm91bmRzKCkud2lkdGggLyAyIC0gMjU7XG4gICAgc291bmRCdG4ueSA9IHNvdW5kQnRuLmdldEJvdW5kcygpLmhlaWdodCAvIDIgKyAyMDtcbiAgICB0aGlzLmFkZENoaWxkKHNvdW5kQnRuKTtcblxuICAgIHNvdW5kQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgc291bmRNYW5hZ2VyLnRvZ2dsZSgpO1xuICAgICAgc291bmRCdG4uY2hhbmdlTGFiZWwoc291bmRNYW5hZ2VyLmlzRW5hYmxlZCgpID8gJ3NvdW5kJyA6ICdzb3VuZE9mZicpO1xuICAgICAgc2VydmVyTWFuYWdlci5zZXQoJ3NvdW5kJywgc291bmRNYW5hZ2VyLmlzRW5hYmxlZCgpKTtcbiAgICB9KTtcblxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICB9XG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy5yZXBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzY3JlZW5zTWFuYWdlci5jaGFuZ2UoJ01haW5TY3JlZW4nKSk7XG5cbiAgICB0aGlzLm9uS2V5RG93biA9IGUgPT4ge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMzIpIHtcbiAgICAgICAgc2NyZWVuc01hbmFnZXIuY2hhbmdlKCdNYWluU2NyZWVuJyk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bik7XG4gIH1cbiAgZGVzdHJveSgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlEb3duKTtcbiAgfVxufVxuIiwiaW1wb3J0IHNjcmVlbnNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NjcmVlbnNNYW5hZ2VyJztcbmltcG9ydCBkYXRhTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9kYXRhTWFuYWdlcic7XG5pbXBvcnQgQmFja2dyb3VuZCBmcm9tICcuLi9kaXNwbGF5L0JhY2tncm91bmQnO1xuaW1wb3J0IEhlcm8gZnJvbSAnLi4vZGlzcGxheS9IZXJvJztcbmltcG9ydCBTcGlrZSBmcm9tICcuLi9kaXNwbGF5L1NwaWtlJztcbmltcG9ydCBTaGFkb3dPdmVybGF5IGZyb20gJy4uL2Rpc3BsYXkvU2hhZG93T3ZlcmxheSc7XG5cbmNvbnN0IEdST1VORF9IRUlHSFQgPSA4MjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpblNjcmVlbiBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgdGhpcy5zcGVlZCA9IDI4NTtcbiAgICB0aGlzLmRpc3RhbmNlID0gMDtcbiAgICB0aGlzLnNoYWRvd092ZXJsYXkgPSBuZXcgU2hhZG93T3ZlcmxheSh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG5cbiAgICB0aGlzLmNyZWF0ZUJnKCk7XG4gICAgdGhpcy5jcmVhdGVTcGlrZXMoKTtcbiAgICB0aGlzLmNyZWF0ZUhlcm8oKTtcbiAgICB0aGlzLmNyZWF0ZUh1ZCgpO1xuXG4gICAgdGhpcy5wYXVzZSgn0J/RgNC+0LHQtdC7IC0g0LLQt9C80LDRhSDQutGA0YvQu9GM0Y/QvNC4LCBlc2MgLSDQv9Cw0YPQt9CwJyk7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gIH1cbiAgY3JlYXRlQmcoKSB7XG4gICAgdGhpcy5iZ1NreSA9IG5ldyBCYWNrZ3JvdW5kKCdza3knLCB0aGlzLndpZHRoKTtcbiAgICB0aGlzLmJnTW91bnRhaW4gPSBuZXcgQmFja2dyb3VuZCgnbW91bnRhaW4nLCB0aGlzLndpZHRoKTtcbiAgICB0aGlzLmJnR3JvdW5kID0gbmV3IEJhY2tncm91bmQoJ2dyb3VuZCcsIHRoaXMud2lkdGgpO1xuICAgIHRoaXMuYmdTa3kueSA9IHRoaXMuYmdNb3VudGFpbi55ID0gdGhpcy5iZ0dyb3VuZC55ID0gdGhpcy5oZWlnaHQ7XG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmJnU2t5LCB0aGlzLmJnTW91bnRhaW4sIHRoaXMuYmdHcm91bmQpO1xuICB9XG4gIGNyZWF0ZVNwaWtlcygpIHtcbiAgICB0aGlzLnNwaWtlcyA9IFtuZXcgU3Bpa2UoKSwgbmV3IFNwaWtlKCldO1xuICAgIHRoaXMuc3Bpa2VzWzBdLnggPSAtdGhpcy5zcGlrZXNbMF0uYm91bmRzLndpZHRoIC8gMjtcbiAgICB0aGlzLnNwaWtlc1sxXS54ID0gdGhpcy53aWR0aCAvIDI7XG4gICAgdGhpcy5zcGlrZXMuZm9yRWFjaChzcGlrZSA9PiB0aGlzLnJlc2V0U3Bpa2Uoc3Bpa2UpKTtcbiAgICB0aGlzLmFkZENoaWxkKC4uLnRoaXMuc3Bpa2VzKTtcbiAgfVxuICBjcmVhdGVIZXJvKCkge1xuICAgIHRoaXMuaGVybyA9IG5ldyBIZXJvKGRhdGFNYW5hZ2VyLmhlcm9UeXBlKTtcbiAgICB0aGlzLmhlcm8ueCA9IHRoaXMud2lkdGggLyAyO1xuICAgIHRoaXMuaGVyby55ID0gMjAwO1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5oZXJvKTtcbiAgfVxuICBjcmVhdGVIdWQoKSB7XG4gICAgdGhpcy5odWREaXN0YW5jZSA9IG5ldyBjcmVhdGVqcy5UZXh0KCcwINC8JywgJzI1cHggR3VlcmlsbGEnLCAnIzAwMCcpO1xuICAgIHRoaXMuaHVkRGlzdGFuY2UueCA9IDIwO1xuICAgIHRoaXMuaHVkRGlzdGFuY2UueSA9IDE1O1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5odWREaXN0YW5jZSk7XG4gIH1cbiAgcmVzZXRTcGlrZShzcGlrZSkge1xuICAgIHNwaWtlLnJlc2V0KCk7XG4gICAgc3Bpa2UueCArPSB0aGlzLndpZHRoICsgc3Bpa2UuYm91bmRzLndpZHRoO1xuICAgIGlmIChNYXRoLnJhbmRvbSgpID4gMC41KSB7XG4gICAgICBzcGlrZS55ID0gdGhpcy5oZWlnaHQgLSBHUk9VTkRfSEVJR0hUO1xuICAgICAgc3Bpa2Uucm90YXRpb24gPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBzcGlrZS55ID0gMDtcbiAgICAgIHNwaWtlLnJvdGF0aW9uID0gMTgwO1xuICAgIH1cbiAgfVxuICBwYXVzZSh0ZXh0KSB7XG4gICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuICAgIHRoaXMuc2hhZG93T3ZlcmxheS5zZXRUZXh0KHRleHQpO1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5zaGFkb3dPdmVybGF5KTtcbiAgfVxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmhhbmRsZUFjdGlvbigpKTtcbiAgICB0aGlzLm9uS2V5RG93biA9IGUgPT4ge1xuICAgICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSAzMjpcbiAgICAgICAgICB0aGlzLmhhbmRsZUFjdGlvbigpO1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyNzpcbiAgICAgICAgICB0aGlzLnRvZ2dsZVBhdXNlKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLm9uVG91Y2hTdGFydCA9IGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5oYW5kbGVBY3Rpb24oKTtcbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bik7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uVG91Y2hTdGFydCk7XG4gIH1cbiAgaGFuZGxlQWN0aW9uKCkge1xuICAgIGlmICh0aGlzLnBhdXNlZCkge1xuICAgICAgdGhpcy50b2dnbGVQYXVzZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhlcm8uZmxhcCgpO1xuICAgIH1cbiAgfVxuICB0b2dnbGVQYXVzZSgpIHtcbiAgICBpZiAodGhpcy5wYXVzZWQpIHtcbiAgICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XG4gICAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuc2hhZG93T3ZlcmxheSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGF1c2UoJ9Cd0LDQttC80LjRgtC1INC/0YDQvtCx0LXQuyDQuNC70LggZXNjJyk7XG4gICAgfVxuICB9XG4gIG1vdmVXb3JsZCh0aW1lKSB7XG4gICAgY29uc3QgcGF0aCA9IHRoaXMuc3BlZWQgKiB0aW1lO1xuICAgIGlmICh0aGlzLmhlcm8uZGVhZCkge1xuICAgICAgdGhpcy5oZXJvLnggKz0gcGF0aCAqIDAuNTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb3ZlU3Bpa2VzKHBhdGgpO1xuICAgICAgdGhpcy5iZ1NreS5tb3ZlKHBhdGggKiAwLjEpO1xuICAgICAgdGhpcy5iZ01vdW50YWluLm1vdmUocGF0aCAqIDAuMyk7XG4gICAgICB0aGlzLmJnR3JvdW5kLm1vdmUocGF0aCk7XG5cbiAgICAgIHRoaXMuZGlzdGFuY2UgKz0gcGF0aDtcbiAgICAgIGRhdGFNYW5hZ2VyLnNjb3JlID0gTWF0aC5mbG9vcih0aGlzLmRpc3RhbmNlIC8gMjUpO1xuICAgICAgdGhpcy5odWREaXN0YW5jZS50ZXh0ID0gYCR7ZGF0YU1hbmFnZXIuc2NvcmV9INC8YDtcbiAgICB9XG4gIH1cbiAgbW92ZVNwaWtlcyhwYXRoKSB7XG4gICAgdGhpcy5zcGlrZXMuZm9yRWFjaChzcGlrZSA9PiB7XG4gICAgICBzcGlrZS54IC09IHBhdGg7XG4gICAgICBpZiAoc3Bpa2UueCA8IC1zcGlrZS5ib3VuZHMud2lkdGggLyAyKSB7XG4gICAgICAgIHRoaXMucmVzZXRTcGlrZShzcGlrZSk7XG4gICAgICAgIHRoaXMuc3BlZWQgKz0gMTtcbiAgICAgIH1cbiAgICAgIGlmIChuZGdtci5jaGVja1BpeGVsQ29sbGlzaW9uKHRoaXMuaGVybywgc3Bpa2UpKSB7XG4gICAgICAgIHRoaXMuaGVyby5kaWUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBtb3ZlSGVybyh0aW1lKSB7XG4gICAgdGhpcy5oZXJvLm1vdmUodGltZSk7XG4gICAgaWYgKHRoaXMuaGVyby55IDwgMCkge1xuICAgICAgdGhpcy5oZXJvLnZZID0gMDtcbiAgICAgIHRoaXMuaGVyby55ID0gMDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaGVyby55ID4gdGhpcy5oZWlnaHQgKyB0aGlzLmhlcm8uYm91bmRzLmhlaWdodCAvIDIpIHtcbiAgICAgIHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnRW5kU2NyZWVuJyk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmhlcm8ueSA+IHRoaXMuaGVpZ2h0IC0gKEdST1VORF9IRUlHSFQgKyB0aGlzLmhlcm8uYm91bmRzLmhlaWdodCAvIDIpKSB7XG4gICAgICB0aGlzLmhlcm8uZGllKCk7XG4gICAgfVxuICB9XG4gIHRpY2soZSkge1xuICAgIGNvbnN0IHNlYyA9IGUuZGVsdGEgKiAwLjAwMTtcbiAgICBpZiAodGhpcy5wYXVzZWQgfHwgc2VjID4gMC4zKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMubW92ZVdvcmxkKHNlYyk7XG4gICAgdGhpcy5tb3ZlSGVybyhzZWMpO1xuICB9XG4gIGRlc3Ryb3koKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bik7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uVG91Y2hTdGFydCk7XG4gIH1cbn1cbiIsImltcG9ydCBzZXJ2ZXJNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NlcnZlck1hbmFnZXInO1xuaW1wb3J0IGFzc2V0c01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvYXNzZXRzTWFuYWdlcic7XG5pbXBvcnQgc2NyZWVuc01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc2NyZWVuc01hbmFnZXInO1xuaW1wb3J0IGRhdGFNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2RhdGFNYW5hZ2VyJztcbmltcG9ydCBzb3VuZE1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc291bmRNYW5hZ2VyJztcbmltcG9ydCBJY29uQnRuIGZyb20gJy4uL2Rpc3BsYXkvSWNvbkJ0bic7XG5pbXBvcnQgSGVybyBmcm9tICcuLi9kaXNwbGF5L0hlcm8nO1xuaW1wb3J0IEJ0biBmcm9tICcuLi9kaXNwbGF5L0J0bic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXJ0U2NyZWVuIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICB0aGlzLmJnID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChhc3NldHNNYW5hZ2VyLmdldFJlc3VsdCgnc3RhcnQnKSk7XG4gICAgLy8gZm9yIGJldHRlciB0aW1lc1xuICAgIC8vIHRoaXMudGl0bGUgPSBuZXcgY3JlYXRlanMuVGV4dCgnQ2hvb3NlIHlvdXIgYXZhdGFyJywgJzQ1cHggQ2FydGVyT25lJywgJyMwMDAnKTtcbiAgICAvLyB0aGlzLnRpdGxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIC8vIHRoaXMudGl0bGUueCA9IHRoaXMud2lkdGggLyAyO1xuICAgIC8vIHRoaXMudGl0bGUueSA9IDEwMDtcblxuXG4gICAgdGhpcy5zdGFydEJ0biA9IG5ldyBCdG4oJ9CY0LPRgNCw0YLRjCcpO1xuICAgIHRoaXMuc3RhcnRCdG4ueCA9IHdpZHRoIC8gMjtcbiAgICB0aGlzLnN0YXJ0QnRuLnkgPSAzNTA7XG5cbiAgICB0aGlzLmludml0ZUJ0biA9IG5ldyBCdG4oJ9Cf0L7Qt9Cy0LDRgtGMINCx0YDQvicsICdvcmFuZ2UnKTtcbiAgICB0aGlzLmludml0ZUJ0bi54ID0gd2lkdGggLyAyO1xuICAgIHRoaXMuaW52aXRlQnRuLnkgPSA0NTA7XG5cbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuYmcsIHRoaXMudGl0bGUsIHRoaXMuc3RhcnRCdG4sIHRoaXMuaW52aXRlQnRuKTtcbiAgICAvLyB0aGlzLmNyZWF0ZUhlcm9lcygpO1xuXG4gICAgaWYgKGRhdGFNYW5hZ2VyLm1heFNjb3JlKSB7XG4gICAgICB0aGlzLnNjb3JlID0gbmV3IGNyZWF0ZWpzLlRleHQoYNCb0YPRh9GI0LjQuSDRgdGH0LXRgjogJHtkYXRhTWFuYWdlci5tYXhTY29yZX0g0LxgLCAnMjVweCBHdWVyaWxsYScsICcjMDAwJyk7XG4gICAgICB0aGlzLnNjb3JlLnggPSAzNTtcbiAgICAgIHRoaXMuc2NvcmUueSA9IDI1O1xuICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLnNjb3JlKTtcbiAgICB9XG5cbiAgICBjb25zdCBoZXJvID0gbmV3IEhlcm8oJ21vbnN0ZXInKTtcbiAgICBoZXJvLnggPSB3aWR0aCAvIDI7XG4gICAgaGVyby55ID0gMTkwO1xuICAgIHRoaXMuYWRkQ2hpbGQoaGVybyk7XG5cbiAgICBjb25zdCBzb3VuZEJ0biA9IG5ldyBJY29uQnRuKHNvdW5kTWFuYWdlci5pc0VuYWJsZWQoKSA/ICdzb3VuZCcgOiAnc291bmRPZmYnKTtcbiAgICBzb3VuZEJ0bi54ID0gdGhpcy53aWR0aCAtIHNvdW5kQnRuLmdldEJvdW5kcygpLndpZHRoIC8gMiAtIDI1O1xuICAgIHNvdW5kQnRuLnkgPSBzb3VuZEJ0bi5nZXRCb3VuZHMoKS5oZWlnaHQgLyAyICsgMjA7XG4gICAgdGhpcy5hZGRDaGlsZChzb3VuZEJ0bik7XG5cbiAgICBzb3VuZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHNvdW5kTWFuYWdlci50b2dnbGUoKTtcbiAgICAgIHNvdW5kQnRuLmNoYW5nZUxhYmVsKHNvdW5kTWFuYWdlci5pc0VuYWJsZWQoKSA/ICdzb3VuZCcgOiAnc291bmRPZmYnKTtcbiAgICAgIHNlcnZlck1hbmFnZXIuc2V0KCdzb3VuZCcsIHNvdW5kTWFuYWdlci5pc0VuYWJsZWQoKSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgfVxuICBjcmVhdGVIZXJvZXMoKSB7XG4gICAgdGhpcy5oZXJvZXMgPSBbXG4gICAgICBuZXcgSGVybygnYmlyZCcpLFxuICAgICAgbmV3IEhlcm8oJ21vbnN0ZXInKSxcbiAgICAgIG5ldyBIZXJvKCdjaGlja2VuJyksXG4gICAgXTtcbiAgICB0aGlzLmhlcm9lcy5mb3JFYWNoKChoZXJvLCBpKSA9PiB7XG4gICAgICBoZXJvLnkgPSB0aGlzLmhlaWdodCAvIDI7XG4gICAgICBoZXJvLnggPSAoaSArIDEpICogdGhpcy53aWR0aCAvICh0aGlzLmhlcm9lcy5sZW5ndGggKyAxKTtcbiAgICAgIGhlcm8uY3Vyc29yID0gJ3BvaW50ZXInO1xuICAgICAgaGVyby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuc2VsZWN0SGVybyhoZXJvKSk7XG4gICAgICBoZXJvLmNhY2hlKDAsIDAsIGhlcm8uYm91bmRzLndpZHRoLCBoZXJvLmJvdW5kcy5oZWlnaHQpO1xuICAgIH0pO1xuICAgIHRoaXMuaGVyb0ZpbHRlciA9IG5ldyBjcmVhdGVqcy5Db2xvckZpbHRlcigwLjYsIDAuNiwgMC42KTtcbiAgICB0aGlzLnJlc2V0SGVyb2VzKCk7XG4gICAgdGhpcy5hZGRDaGlsZCguLi50aGlzLmhlcm9lcyk7XG4gIH1cbiAgcmVzZXRIZXJvZXMoKSB7XG4gICAgdGhpcy5oZXJvZXMuZm9yRWFjaChoZXJvID0+IHtcbiAgICAgIGhlcm8uZmlsdGVycyA9IFt0aGlzLmhlcm9GaWx0ZXJdO1xuICAgICAgaGVyby51cGRhdGVDYWNoZSgpO1xuICAgICAgaGVyby5zY2FsZVggPSAwLjg1O1xuICAgICAgaGVyby5zY2FsZVkgPSAwLjg1O1xuICAgIH0pO1xuICB9XG4gIHNlbGVjdEhlcm8oaGVybykge1xuICAgIHRoaXMucmVzZXRIZXJvZXMoKTtcblxuICAgIGhlcm8uZmlsdGVycyA9IFtdO1xuICAgIGhlcm8udXBkYXRlQ2FjaGUoKTtcbiAgICBoZXJvLnNjYWxlWCA9IDE7XG4gICAgaGVyby5zY2FsZVkgPSAxO1xuICAgIGhlcm8uZmxhcCgpO1xuXG4gICAgaWYgKCF0aGlzLnN0YXJ0QnRuLmVuYWJsZWQpIHtcbiAgICAgIHRoaXMuc3RhcnRCdG4uZW5hYmxlKCk7XG4gICAgfVxuXG4gICAgZGF0YU1hbmFnZXIuaGVyb1R5cGUgPSBoZXJvLnR5cGU7XG4gIH1cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLnN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT5cbiAgICAgIHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnTWFpblNjcmVlbicpKTtcbiAgICB0aGlzLmludml0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+XG4gICAgICBzZXJ2ZXJNYW5hZ2VyLmludml0ZSgpKTtcblxuICAgIHRoaXMub25LZXlEb3duID0gZSA9PiB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAzMikge1xuICAgICAgICBzY3JlZW5zTWFuYWdlci5jaGFuZ2UoJ01haW5TY3JlZW4nKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlEb3duKTtcbiAgfVxuICBkZXN0cm95KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd24pO1xuICB9XG59XG4iXX0=
