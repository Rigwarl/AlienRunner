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

Promise.all([_assetsManager2.default.init(), _serverManager2.default.init()]).then(function () {
  return Promise.all([_serverManager2.default.getUser().then(function (user) {
    return _dataManager2.default.set('user', {
      id: user.id,
      name: user.first_name + ' ' + user.last_name,
      sex: user.sex
    });
  }), _serverManager2.default.get('maxScore').then(function (r) {
    return _dataManager2.default.set('maxScore', +r);
  }), _serverManager2.default.get('sound').then(function (r) {
    return _soundManager2.default.init(r === '' ? true : !!r);
  })]);
}).then(function () {
  return _screensManager2.default.change('StartScreen');
}).catch(function (e) {
  return console.error('init error, reload page', e);
});

var stage = new createjs.Stage('game-stage');
_screensManager2.default.init(stage);

if (createjs.Touch.isSupported()) {
  createjs.Touch.enable(stage, true);
} else {
  stage.enableMouseOver(20);
}

if (window !== window.parent) {
  // createjs stage click dosnt trigger window.focus
  window.addEventListener('click', function () {
    return window.focus();
  });
}

},{"./managers/assetsManager":9,"./managers/dataManager":10,"./managers/screensManager":11,"./managers/serverManager":12,"./managers/soundManager":13}],2:[function(require,module,exports){
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

},{"../managers/assetsManager":9}],3:[function(require,module,exports){
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

    _this.createBg(type);
    _this.createLabel(label);

    _this.addEventListener('click', function () {
      return _soundManager2.default.play('flap');
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
      this.mouseEnabled = false;
    }
  }, {
    key: 'enable',
    value: function enable() {
      this.bg.gotoAndStop(this.color + 'Out');
      this.mouseEnabled = true;
    }
  }]);

  return Btn;
}(createjs.Container);

exports.default = Btn;

},{"../managers/assetsManager":9,"../managers/soundManager":13}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _screensManager = require('../managers/screensManager');

var _screensManager2 = _interopRequireDefault(_screensManager);

var _soundManager = require('../managers/soundManager');

var _soundManager2 = _interopRequireDefault(_soundManager);

var _serverManager = require('../managers/serverManager');

var _serverManager2 = _interopRequireDefault(_serverManager);

var _IconBtn = require('./IconBtn');

var _IconBtn2 = _interopRequireDefault(_IconBtn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Gui = function (_createjs$Container) {
  _inherits(Gui, _createjs$Container);

  function Gui(width) {
    _classCallCheck(this, Gui);

    var _this = _possibleConstructorReturn(this, (Gui.__proto__ || Object.getPrototypeOf(Gui)).call(this));

    _this.width = width;

    _this.menuBtn = new _IconBtn2.default('menu');
    _this.menuBtn.x = _this.menuBtn.getBounds().width / 2 + 20;
    _this.menuBtn.y = _this.menuBtn.getBounds().height / 2 + 20;

    _this.ratingBtn = new _IconBtn2.default('rating');
    _this.ratingBtn.x = _this.ratingBtn.getBounds().width * 3 / 2 + 40;
    _this.ratingBtn.y = _this.ratingBtn.getBounds().height / 2 + 20;

    _this.soundBtn = new _IconBtn2.default(_soundManager2.default.isEnabled() ? 'sound' : 'soundOff');
    _this.soundBtn.x = _this.width - _this.soundBtn.getBounds().width / 2 - 20;
    _this.soundBtn.y = _this.soundBtn.getBounds().height / 2 + 20;

    // todo: fix spritesheet later
    _this.ratingBtn.label.x = _this.soundBtn.label.x = 1;

    _this.addChild(_this.menuBtn, _this.ratingBtn, _this.soundBtn);

    _this.soundBtn.addEventListener('click', function () {
      _soundManager2.default.toggle();
      _this.soundBtn.changeLabel(_soundManager2.default.isEnabled() ? 'sound' : 'soundOff');
      _serverManager2.default.set('sound', _soundManager2.default.isEnabled());
    });

    _this.menuBtn.addEventListener('click', function () {
      return _screensManager2.default.change('StartScreen');
    });
    _this.ratingBtn.addEventListener('click', function () {
      return _screensManager2.default.change('RatingScreen');
    });
    return _this;
  }

  return Gui;
}(createjs.Container);

exports.default = Gui;

},{"../managers/screensManager":11,"../managers/serverManager":12,"../managers/soundManager":13,"./IconBtn":6}],5:[function(require,module,exports){
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
      _soundManager2.default.play('flap');
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
      _soundManager2.default.play('loose');
    }
  }]);

  return Hero;
}(createjs.Sprite);

exports.default = Hero;

},{"../managers/assetsManager":9,"../managers/soundManager":13}],6:[function(require,module,exports){
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

},{"../managers/assetsManager":9,"./Btn":3}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{"../managers/assetsManager":9}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var manifest = [{ id: 'monster', src: 'img/monster-sprite.png' },
// { id: 'bird', src: 'img/bird-sprite.png' },
// { id: 'chicken', src: 'img/chicken-sprite.png' },
{ id: 'spike', src: 'img/spike.png' }, { id: 'sky', src: 'img/bg/sky.png' }, { id: 'start', src: 'img/bg/start.png' }, { id: 'mountain', src: 'img/bg/mountain.png' }, { id: 'ground', src: 'img/bg/ground.png' }, { id: 'btn', src: 'img/btn-sprite.png' }, { id: 'icon-btn', src: 'img/icon-btn-sprite.png' }, { id: 'icon', src: 'img/icon-sprite.png' }, { id: 'back', src: 'sound/background.ogg' }, { id: 'flap', src: 'sound/flap.ogg' }, { id: 'loose', src: 'sound/loose.ogg' }];

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
      soundOff: 1,
      rating: 2,
      menu: 3
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

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var dataManager = {
  score: 0,
  maxScore: null,
  heroType: 'monster',
  user: {
    id: null,
    name: null,
    sex: null
  },
  set: function set(key, value) {
    this[key] = value;
  }
};

exports.default = dataManager;

},{}],11:[function(require,module,exports){
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

var _RatingScreen = require('../screens/RatingScreen');

var _RatingScreen2 = _interopRequireDefault(_RatingScreen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var screenManager = {
  init: function init(stage) {
    var _this = this;

    this.stage = stage;
    this.currentScreen = null;
    this.screens = {
      StartScreen: _StartScreen2.default,
      MainScreen: _MainScreen2.default,
      EndScreen: _EndScreen2.default,
      RatingScreen: _RatingScreen2.default
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

},{"../screens/EndScreen":14,"../screens/MainScreen":15,"../screens/RatingScreen":16,"../screens/StartScreen":17}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var serverManager = {
  init: function init() {
    return new Promise(function (resolve, reject) {
      return VK.init(function () {
        return resolve();
      }, function (e) {
        return reject('vk init error', e);
      }, '5.60');
    });
  },
  getUser: function getUser() {
    return new Promise(function (resolve, reject) {
      VK.api('users.get', { fields: 'sex' }, function (r) {
        if (r.error) {
          reject(r.error);
          return;
        }
        resolve(r.response[0]);
      });
    });
  },
  get: function get(key) {
    var global = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    return new Promise(function (resolve) {
      return VK.api('storage.get', { key: key, global: global }, resolve);
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
    var global = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    VK.api('storage.set', { key: key, value: JSON.stringify(value), global: global });
  },
  share: function share(score) {
    var sex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

    VK.api('wall.post', {
      message: 'Я пролетел' + (sex !== 2 ? 'а' : '') + ' ' + score + ' м в игре Flappy Monster!\n                A сколько сможешь ты?',
      attachments: 'photo-135563388_456239017, https://vk.com/app5782118',
      services: 'twitter'
    });
  },
  invite: function invite() {
    VK.callMethod('showInviteBox');
  }
};

exports.default = serverManager;

},{}],13:[function(require,module,exports){
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
  },
  play: function play(sound) {
    if (this.enabled) {
      createjs.Sound.play(sound);
    }
  }
};

exports.default = soundManager;

},{}],14:[function(require,module,exports){
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

var _Gui = require('../display/Gui');

var _Gui2 = _interopRequireDefault(_Gui);

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
    _this.gui = new _Gui2.default(width);

    _this.score = new createjs.Text('Результат: ' + _dataManager2.default.score + ' м\n\nРекорд: ' + _dataManager2.default.maxScore + ' м', '40px Guerilla', '#000');
    _this.score.textAlign = 'center';
    _this.score.x = width / 2;
    _this.score.y = 125;

    _this.replayBtn = new _Btn2.default('Еще раз');
    _this.replayBtn.x = width / 2;
    _this.replayBtn.y = 350;

    _this.shareBtn = new _Btn2.default('Поделиться', 'orange');
    _this.shareBtn.x = width / 2;
    _this.shareBtn.y = 450;
    _this.shareBtn.addEventListener('click', function () {
      return _serverManager2.default.share(_dataManager2.default.score, _dataManager2.default.user.sex);
    });

    _this.addChild(_this.bg, _this.gui, _this.score, _this.replayBtn, _this.shareBtn);

    if (_dataManager2.default.score > _dataManager2.default.maxScore) {
      _dataManager2.default.maxScore = _dataManager2.default.score;
      _serverManager2.default.set('maxScore', _dataManager2.default.maxScore);
      _this.score.text = 'Новый рекорд: ' + _dataManager2.default.maxScore + ' м!';
      _this.score.y += 35;

      _serverManager2.default.get('ratingTable', 1).then(recalcRatingTable);
    }

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


function recalcRatingTable(ratingTable) {
  if (ratingTable[ratingTable.length - 1].score >= _dataManager2.default.maxScore) {
    return;
  }

  var userRating = ratingTable.find(function (el) {
    return el.id === _dataManager2.default.user.id;
  });

  if (userRating) {
    userRating.score = _dataManager2.default.maxScore;
  } else {
    var newRating = {
      id: _dataManager2.default.user.id,
      name: _dataManager2.default.user.name,
      score: _dataManager2.default.maxScore
    };
    if (ratingTable.length < 10) {
      ratingTable.push(newRating);
    } else {
      ratingTable[ratingTable.length - 1] = newRating;
    }
  }

  ratingTable.sort(function (a, b) {
    return b.score - a.score;
  });
  _serverManager2.default.set('ratingTable', ratingTable, 1);
}

},{"../display/Btn":3,"../display/Gui":4,"../managers/assetsManager":9,"../managers/dataManager":10,"../managers/screensManager":11,"../managers/serverManager":12}],15:[function(require,module,exports){
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

    _this.speed = 290;
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
      this.hero.y = 190;
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

},{"../display/Background":2,"../display/Hero":5,"../display/ShadowOverlay":7,"../display/Spike":8,"../managers/dataManager":10,"../managers/screensManager":11}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assetsManager = require('../managers/assetsManager');

var _assetsManager2 = _interopRequireDefault(_assetsManager);

var _dataManager = require('../managers/dataManager');

var _dataManager2 = _interopRequireDefault(_dataManager);

var _serverManager = require('../managers/serverManager');

var _serverManager2 = _interopRequireDefault(_serverManager);

var _Gui = require('../display/Gui');

var _Gui2 = _interopRequireDefault(_Gui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RatingScreen = function (_createjs$Container) {
  _inherits(RatingScreen, _createjs$Container);

  function RatingScreen(width) {
    _classCallCheck(this, RatingScreen);

    var _this = _possibleConstructorReturn(this, (RatingScreen.__proto__ || Object.getPrototypeOf(RatingScreen)).call(this));

    _this.width = width;

    _this.bg = new createjs.Bitmap(_assetsManager2.default.getResult('start'));
    _this.gui = new _Gui2.default(width);

    _this.title = new createjs.Text('Рейтинг', '35px Guerilla', '#000');
    _this.title.textAlign = 'center';
    _this.title.x = _this.width / 2;
    _this.title.y = 35;

    _this.addChild(_this.bg, _this.gui, _this.title);

    _serverManager2.default.get('ratingTable', 1)
    // todo: remove later, now it add records for old users
    .then(recalcRatingTable).then(function (r) {
      return _this.showRating(r);
    }).catch(function () {
      var text = new createjs.Text('Рейтинг временно недоступен :(', '25px Guerilla', '#000');
      text.textAlign = 'center';
      text.x = _this.width / 2;
      text.y = 150;
      _this.addChild(text);
    });
    return _this;
  }

  _createClass(RatingScreen, [{
    key: 'showRating',
    value: function showRating(ratingTable) {
      var _this2 = this;

      var winner = false;

      ratingTable.forEach(function (el, i) {
        var text = new createjs.Text(i + 1 + ' ' + el.name + ' ' + el.score + ' м', '25px Guerilla', '#000');
        text.y = 120 + i * 40;
        text.x = 120;
        _this2.addChild(text);

        if (el.id === _dataManager2.default.user.id) {
          winner = true;
          text.color = '#7ECE2E';
        }
      });

      if (!winner) {
        var text = new createjs.Text('- ' + _dataManager2.default.user.name + ' ' + _dataManager2.default.maxScore + ' м', '25px Guerilla', '#7ECE2E');
        text.y = 120 + ratingTable.length * 40;
        text.x = 120;
        this.addChild(text);
      }
    }
  }]);

  return RatingScreen;
}(createjs.Container);

exports.default = RatingScreen;


function recalcRatingTable(ratingTable) {
  if (ratingTable[ratingTable.length - 1].score < _dataManager2.default.maxScore) {
    var userRating = ratingTable.find(function (el) {
      return el.id === _dataManager2.default.user.id;
    });

    if (userRating) {
      userRating.score = _dataManager2.default.maxScore;
    } else {
      var newRating = {
        id: _dataManager2.default.user.id,
        name: _dataManager2.default.user.name,
        score: _dataManager2.default.maxScore
      };
      if (ratingTable.length < 10) {
        ratingTable.push(newRating);
      } else {
        ratingTable[ratingTable.length - 1] = newRating;
      }
    }

    ratingTable.sort(function (a, b) {
      return b.score - a.score;
    });
    _serverManager2.default.set('ratingTable', ratingTable, 1);
  }
  return ratingTable;
}

},{"../display/Gui":4,"../managers/assetsManager":9,"../managers/dataManager":10,"../managers/serverManager":12}],17:[function(require,module,exports){
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

var _Gui = require('../display/Gui');

var _Gui2 = _interopRequireDefault(_Gui);

var _Hero = require('../display/Hero');

var _Hero2 = _interopRequireDefault(_Hero);

var _Btn = require('../display/Btn');

var _Btn2 = _interopRequireDefault(_Btn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    _this.gui = new _Gui2.default(width);

    _this.startBtn = new _Btn2.default('Играть');
    _this.startBtn.x = width / 2;
    _this.startBtn.y = 350;

    _this.inviteBtn = new _Btn2.default('Позвать бро', 'orange');
    _this.inviteBtn.x = width / 2;
    _this.inviteBtn.y = 450;

    _this.hero = new _Hero2.default('monster');
    _this.hero.x = width / 2;
    _this.hero.y = 190;

    _this.addChild(_this.bg, _this.gui, _this.hero, _this.startBtn, _this.inviteBtn);

    if (_dataManager2.default.maxScore) {
      _this.score = new createjs.Text('Лучший счет: ' + _dataManager2.default.maxScore + ' м', '25px Guerilla', '#000');
      _this.score.textAlign = 'center';
      _this.score.x = _this.width / 2;
      _this.score.y = 40;
      _this.addChild(_this.score);
    }

    _this.bindEvents();
    return _this;
  }
  // createHeroes() {
  //   this.heroes = [
  //     new Hero('bird'),
  //     new Hero('monster'),
  //     new Hero('chicken'),
  //   ];
  //   this.heroes.forEach((hero, i) => {
  //     hero.y = this.height / 2;
  //     hero.x = (i + 1) * this.width / (this.heroes.length + 1);
  //     hero.cursor = 'pointer';
  //     hero.addEventListener('click', () => this.selectHero(hero));
  //     hero.cache(0, 0, hero.bounds.width, hero.bounds.height);
  //   });
  //   this.heroFilter = new createjs.ColorFilter(0.6, 0.6, 0.6);
  //   this.resetHeroes();
  //   this.addChild(...this.heroes);
  // }
  // resetHeroes() {
  //   this.heroes.forEach(hero => {
  //     hero.filters = [this.heroFilter];
  //     hero.updateCache();
  //     hero.scaleX = 0.85;
  //     hero.scaleY = 0.85;
  //   });
  // }
  // selectHero(hero) {
  //   this.resetHeroes();

  //   hero.filters = [];
  //   hero.updateCache();
  //   hero.scaleX = 1;
  //   hero.scaleY = 1;
  //   hero.flap();

  //   if (!this.startBtn.enabled) {
  //     this.startBtn.enable();
  //   }

  //   dataManager.heroType = hero.type;
  // }


  _createClass(StartScreen, [{
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

},{"../display/Btn":3,"../display/Gui":4,"../display/Hero":5,"../managers/assetsManager":9,"../managers/dataManager":10,"../managers/screensManager":11,"../managers/serverManager":12}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvc3JjL2FwcC5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9CYWNrZ3JvdW5kLmpzIiwiYXBwL2pzL3NyYy9kaXNwbGF5L0J0bi5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9HdWkuanMiLCJhcHAvanMvc3JjL2Rpc3BsYXkvSGVyby5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9JY29uQnRuLmpzIiwiYXBwL2pzL3NyYy9kaXNwbGF5L1NoYWRvd092ZXJsYXkuanMiLCJhcHAvanMvc3JjL2Rpc3BsYXkvU3Bpa2UuanMiLCJhcHAvanMvc3JjL21hbmFnZXJzL2Fzc2V0c01hbmFnZXIuanMiLCJhcHAvanMvc3JjL21hbmFnZXJzL2RhdGFNYW5hZ2VyLmpzIiwiYXBwL2pzL3NyYy9tYW5hZ2Vycy9zY3JlZW5zTWFuYWdlci5qcyIsImFwcC9qcy9zcmMvbWFuYWdlcnMvc2VydmVyTWFuYWdlci5qcyIsImFwcC9qcy9zcmMvbWFuYWdlcnMvc291bmRNYW5hZ2VyLmpzIiwiYXBwL2pzL3NyYy9zY3JlZW5zL0VuZFNjcmVlbi5qcyIsImFwcC9qcy9zcmMvc2NyZWVucy9NYWluU2NyZWVuLmpzIiwiYXBwL2pzL3NyYy9zY3JlZW5zL1JhdGluZ1NjcmVlbi5qcyIsImFwcC9qcy9zcmMvc2NyZWVucy9TdGFydFNjcmVlbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsUUFBUSxHQUFSLENBQVksQ0FDVix3QkFBYyxJQUFkLEVBRFUsRUFFVix3QkFBYyxJQUFkLEVBRlUsQ0FBWixFQUlHLElBSkgsQ0FJUTtBQUFBLFNBQU0sUUFBUSxHQUFSLENBQVksQ0FDdEIsd0JBQWMsT0FBZCxHQUF3QixJQUF4QixDQUE2QjtBQUFBLFdBQVEsc0JBQVksR0FBWixDQUFnQixNQUFoQixFQUF3QjtBQUMzRCxV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QUFnQzFCO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7O2lDQUNhO0FBQ1gsV0FBSyxRQUFMLENBQWMsZ0JBQWQsQ0FBK0IsT0FBL0IsRUFBd0M7QUFBQSxlQUN0Qyx5QkFBZSxNQUFmLENBQXNCLFlBQXRCLENBRHNDO0FBQUEsT0FBeEM7QUFFQSxXQUFLLFNBQUwsQ0FBZSxnQkFBZixDQUFnQyxPQUFoQyxFQUF5QztBQUFBLGVBQ3ZDLHdCQUFjLE1BQWQsRUFEdUM7QUFBQSxPQUF6Qzs7QUFHQSxXQUFLLFNBQUwsR0FBaUIsYUFBSztBQUNwQixZQUFJLEVBQUUsT0FBRixLQUFjLEVBQWxCLEVBQXNCO0FBQ3BCLG1DQUFlLE1BQWYsQ0FBc0IsWUFBdEI7QUFDQSxZQUFFLGNBQUY7QUFDRDtBQUNGLE9BTEQ7O0FBT0EsYUFBTyxnQkFBUCxDQUF3QixTQUF4QixFQUFtQyxLQUFLLFNBQXhDO0FBQ0Q7Ozs4QkFDUztBQUNSLGFBQU8sbUJBQVAsQ0FBMkIsU0FBM0IsRUFBc0MsS0FBSyxTQUEzQztBQUNEOzs7O0VBM0ZzQyxTQUFTLFM7O2tCQUE3QixXIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBzY3JlZW5zTWFuYWdlciBmcm9tICcuL21hbmFnZXJzL3NjcmVlbnNNYW5hZ2VyJztcbmltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4vbWFuYWdlcnMvYXNzZXRzTWFuYWdlcic7XG5pbXBvcnQgc2VydmVyTWFuYWdlciBmcm9tICcuL21hbmFnZXJzL3NlcnZlck1hbmFnZXInO1xuaW1wb3J0IHNvdW5kTWFuYWdlciBmcm9tICcuL21hbmFnZXJzL3NvdW5kTWFuYWdlcic7XG5pbXBvcnQgZGF0YU1hbmFnZXIgZnJvbSAnLi9tYW5hZ2Vycy9kYXRhTWFuYWdlcic7XG5cblByb21pc2UuYWxsKFtcbiAgYXNzZXRzTWFuYWdlci5pbml0KCksXG4gIHNlcnZlck1hbmFnZXIuaW5pdCgpLFxuXSlcbiAgLnRoZW4oKCkgPT4gUHJvbWlzZS5hbGwoW1xuICAgIHNlcnZlck1hbmFnZXIuZ2V0VXNlcigpLnRoZW4odXNlciA9PiBkYXRhTWFuYWdlci5zZXQoJ3VzZXInLCB7XG4gICAgICBpZDogdXNlci5pZCxcbiAgICAgIG5hbWU6IGAke3VzZXIuZmlyc3RfbmFtZX0gJHt1c2VyLmxhc3RfbmFtZX1gLFxuICAgICAgc2V4OiB1c2VyLnNleCxcbiAgICB9KSksXG4gICAgc2VydmVyTWFuYWdlci5nZXQoJ21heFNjb3JlJykudGhlbihyID0+IGRhdGFNYW5hZ2VyLnNldCgnbWF4U2NvcmUnLCArcikpLFxuICAgIHNlcnZlck1hbmFnZXIuZ2V0KCdzb3VuZCcpLnRoZW4ociA9PiBzb3VuZE1hbmFnZXIuaW5pdChyID09PSAnJyA/IHRydWUgOiAhIXIpKSxcbiAgXSkpXG4gIC50aGVuKCgpID0+IHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnU3RhcnRTY3JlZW4nKSlcbiAgLmNhdGNoKGUgPT4gY29uc29sZS5lcnJvcignaW5pdCBlcnJvciwgcmVsb2FkIHBhZ2UnLCBlKSk7XG5cbmNvbnN0IHN0YWdlID0gbmV3IGNyZWF0ZWpzLlN0YWdlKCdnYW1lLXN0YWdlJyk7XG5zY3JlZW5zTWFuYWdlci5pbml0KHN0YWdlKTtcblxuaWYgKGNyZWF0ZWpzLlRvdWNoLmlzU3VwcG9ydGVkKCkpIHtcbiAgY3JlYXRlanMuVG91Y2guZW5hYmxlKHN0YWdlLCB0cnVlKTtcbn0gZWxzZSB7XG4gIHN0YWdlLmVuYWJsZU1vdXNlT3ZlcigyMCk7XG59XG5cbmlmICh3aW5kb3cgIT09IHdpbmRvdy5wYXJlbnQpIHtcbiAgLy8gY3JlYXRlanMgc3RhZ2UgY2xpY2sgZG9zbnQgdHJpZ2dlciB3aW5kb3cuZm9jdXNcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gd2luZG93LmZvY3VzKCkpO1xufVxuIiwiaW1wb3J0IGFzc2V0c01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvYXNzZXRzTWFuYWdlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhY2tncm91bmQgZXh0ZW5kcyBjcmVhdGVqcy5TaGFwZSB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGNhbnZhc1dpZHRoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuaW1nID0gYXNzZXRzTWFuYWdlci5nZXRSZXN1bHQobmFtZSk7XG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLmltZy53aWR0aCArIGNhbnZhc1dpZHRoO1xuXG4gICAgdGhpcy5ncmFwaGljcy5iZWdpbkJpdG1hcEZpbGwodGhpcy5pbWcsICdyZXBlYXQteCcpLmRyYXdSZWN0KDAsIDAsIHdpZHRoLCB0aGlzLmltZy5oZWlnaHQpO1xuICAgIHRoaXMucmVnWSA9IHRoaXMuaW1nLmhlaWdodDtcbiAgICB0aGlzLmNhY2hlKDAsIDAsIHdpZHRoLCB0aGlzLmltZy5oZWlnaHQpO1xuICB9XG4gIG1vdmUocGF0aCkge1xuICAgIHRoaXMueCAtPSBwYXRoO1xuICAgIHRoaXMueCAlPSB0aGlzLmltZy53aWR0aDtcbiAgfVxufVxuIiwiaW1wb3J0IGFzc2V0c01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvYXNzZXRzTWFuYWdlcic7XG5pbXBvcnQgc291bmRNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NvdW5kTWFuYWdlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ0biBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKGxhYmVsLCBjb2xvciA9ICdncmVlbicsIHR5cGUgPSAnYnRuJykge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XG5cbiAgICB0aGlzLmNyZWF0ZUJnKHR5cGUpO1xuICAgIHRoaXMuY3JlYXRlTGFiZWwobGFiZWwpO1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNvdW5kTWFuYWdlci5wbGF5KCdmbGFwJykpO1xuICB9XG4gIGNyZWF0ZUJnKHR5cGUpIHtcbiAgICB0aGlzLmJnID0gbmV3IGNyZWF0ZWpzLlNwcml0ZShhc3NldHNNYW5hZ2VyLmdldFNwcml0ZVNoZWV0KHR5cGUpKTtcbiAgICB0aGlzLmJnLnJlZ1ggPSB0aGlzLmJnLmdldEJvdW5kcygpLndpZHRoIC8gMjtcbiAgICB0aGlzLmJnLnJlZ1kgPSB0aGlzLmJnLmdldEJvdW5kcygpLmhlaWdodCAvIDI7XG4gICAgdGhpcy5oZWxwZXIgPSBuZXcgY3JlYXRlanMuQnV0dG9uSGVscGVyKHRoaXMuYmcsIGAke3RoaXMuY29sb3J9T3V0YCwgYCR7dGhpcy5jb2xvcn1PdmVyYCwgYCR7dGhpcy5jb2xvcn1Eb3duYCk7XG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmJnKTtcbiAgfVxuICBjcmVhdGVMYWJlbChsYWJlbCkge1xuICAgIHRoaXMubGFiZWwgPSBuZXcgY3JlYXRlanMuVGV4dChsYWJlbCwgJzMwcHggR3VlcmlsbGEnLCAnI2ZmZicpO1xuICAgIHRoaXMubGFiZWwuc2hhZG93ID0gbmV3IGNyZWF0ZWpzLlNoYWRvdygnIzAwMCcsIDAsIDEsIDUpO1xuICAgIHRoaXMubGFiZWwudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgdGhpcy5sYWJlbC50ZXh0QmFzZWxpbmUgPSAnbWlkZGxlJztcbiAgICB0aGlzLmxhYmVsLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMubGFiZWwueSA9IC0zO1xuXG4gICAgLy8gdG9kbyBjYWNoZVxuICAgIC8vIG5vdyBpdCBjYWNoZSBiZWZvcmUgZm9udCBsb2FkIChcbiAgICAvLyBjb25zdCBoID0gdGhpcy5sYWJlbC5nZXRNZWFzdXJlZEhlaWdodCgpICsgNjsgLy8gYWRkIDYgY29zIG9mIHNoYWRvd1xuICAgIC8vIGNvbnN0IHcgPSB0aGlzLmxhYmVsLmdldE1lYXN1cmVkV2lkdGgoKSArIDY7XG4gICAgLy8gdGhpcy5sYWJlbC5jYWNoZSgtdyAvIDIsIC1oIC8gMiwgdywgaCk7XG5cbiAgICB0aGlzLmFkZENoaWxkKHRoaXMubGFiZWwpO1xuICB9XG4gIGRpc2FibGUoKSB7XG4gICAgdGhpcy5iZy5nb3RvQW5kU3RvcCgnZGlzYWJsZScpO1xuICAgIHRoaXMubW91c2VFbmFibGVkID0gZmFsc2U7XG4gIH1cbiAgZW5hYmxlKCkge1xuICAgIHRoaXMuYmcuZ290b0FuZFN0b3AoYCR7dGhpcy5jb2xvcn1PdXRgKTtcbiAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IHRydWU7XG4gIH1cbn1cbiIsImltcG9ydCBzY3JlZW5NYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NjcmVlbnNNYW5hZ2VyJztcbmltcG9ydCBzb3VuZE1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc291bmRNYW5hZ2VyJztcbmltcG9ydCBzZXJ2ZXJNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NlcnZlck1hbmFnZXInO1xuaW1wb3J0IEljb25CdG4gZnJvbSAnLi9JY29uQnRuJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3VpIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3Iod2lkdGgpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuXG4gICAgdGhpcy5tZW51QnRuID0gbmV3IEljb25CdG4oJ21lbnUnKTtcbiAgICB0aGlzLm1lbnVCdG4ueCA9IHRoaXMubWVudUJ0bi5nZXRCb3VuZHMoKS53aWR0aCAvIDIgKyAyMDtcbiAgICB0aGlzLm1lbnVCdG4ueSA9IHRoaXMubWVudUJ0bi5nZXRCb3VuZHMoKS5oZWlnaHQgLyAyICsgMjA7XG5cbiAgICB0aGlzLnJhdGluZ0J0biA9IG5ldyBJY29uQnRuKCdyYXRpbmcnKTtcbiAgICB0aGlzLnJhdGluZ0J0bi54ID0gdGhpcy5yYXRpbmdCdG4uZ2V0Qm91bmRzKCkud2lkdGggKiAzIC8gMiArIDQwO1xuICAgIHRoaXMucmF0aW5nQnRuLnkgPSB0aGlzLnJhdGluZ0J0bi5nZXRCb3VuZHMoKS5oZWlnaHQgLyAyICsgMjA7XG5cbiAgICB0aGlzLnNvdW5kQnRuID0gbmV3IEljb25CdG4oc291bmRNYW5hZ2VyLmlzRW5hYmxlZCgpID8gJ3NvdW5kJyA6ICdzb3VuZE9mZicpO1xuICAgIHRoaXMuc291bmRCdG4ueCA9IHRoaXMud2lkdGggLSB0aGlzLnNvdW5kQnRuLmdldEJvdW5kcygpLndpZHRoIC8gMiAtIDIwO1xuICAgIHRoaXMuc291bmRCdG4ueSA9IHRoaXMuc291bmRCdG4uZ2V0Qm91bmRzKCkuaGVpZ2h0IC8gMiArIDIwO1xuXG4gICAgLy8gdG9kbzogZml4IHNwcml0ZXNoZWV0IGxhdGVyXG4gICAgdGhpcy5yYXRpbmdCdG4ubGFiZWwueCA9IHRoaXMuc291bmRCdG4ubGFiZWwueCA9IDE7XG5cbiAgICB0aGlzLmFkZENoaWxkKHRoaXMubWVudUJ0biwgdGhpcy5yYXRpbmdCdG4sIHRoaXMuc291bmRCdG4pO1xuXG4gICAgdGhpcy5zb3VuZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHNvdW5kTWFuYWdlci50b2dnbGUoKTtcbiAgICAgIHRoaXMuc291bmRCdG4uY2hhbmdlTGFiZWwoc291bmRNYW5hZ2VyLmlzRW5hYmxlZCgpID8gJ3NvdW5kJyA6ICdzb3VuZE9mZicpO1xuICAgICAgc2VydmVyTWFuYWdlci5zZXQoJ3NvdW5kJywgc291bmRNYW5hZ2VyLmlzRW5hYmxlZCgpKTtcbiAgICB9KTtcblxuICAgIHRoaXMubWVudUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNjcmVlbk1hbmFnZXIuY2hhbmdlKCdTdGFydFNjcmVlbicpKTtcbiAgICB0aGlzLnJhdGluZ0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNjcmVlbk1hbmFnZXIuY2hhbmdlKCdSYXRpbmdTY3JlZW4nKSk7XG4gIH1cbn1cbiIsImltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuaW1wb3J0IHNvdW5kTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zb3VuZE1hbmFnZXInO1xuXG5jb25zdCBDT05GSUcgPSB7XG4gIEc6IDU1MCxcbiAgQTogMzc1LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVybyBleHRlbmRzIGNyZWF0ZWpzLlNwcml0ZSB7XG4gIGNvbnN0cnVjdG9yKHR5cGUpIHtcbiAgICBzdXBlcihhc3NldHNNYW5hZ2VyLmdldFNwcml0ZVNoZWV0KHR5cGUpKTtcblxuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5ib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpO1xuICAgIHRoaXMucmVnWCA9IHRoaXMuYm91bmRzLndpZHRoIC8gMjtcbiAgICB0aGlzLnJlZ1kgPSB0aGlzLmJvdW5kcy5oZWlnaHQgLyAyO1xuXG4gICAgdGhpcy5kZWFkID0gZmFsc2U7XG4gICAgdGhpcy52WSA9IDA7XG4gIH1cbiAgZmxhcCgpIHtcbiAgICBpZiAodGhpcy5kZWFkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudlkgPSBNYXRoLm1heCh0aGlzLnZZIC0gQ09ORklHLkEsIC1DT05GSUcuQSk7XG4gICAgdGhpcy5nb3RvQW5kUGxheSgnZmxhcCcpO1xuICAgIHNvdW5kTWFuYWdlci5wbGF5KCdmbGFwJyk7XG4gIH1cbiAgbW92ZSh0aW1lKSB7XG4gICAgdGhpcy55ICs9ICgoQ09ORklHLkcgKiB0aW1lICogMC41KSArIHRoaXMudlkpICogdGltZTtcbiAgICB0aGlzLnZZICs9IENPTkZJRy5HICogdGltZTtcbiAgfVxuICBkaWUoKSB7XG4gICAgaWYgKHRoaXMuZGVhZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmRlYWQgPSB0cnVlO1xuICAgIHRoaXMucm90YXRpb24gPSAzMDtcbiAgICB0aGlzLmdvdG9BbmRTdG9wKCdkZWFkJyk7XG4gICAgc291bmRNYW5hZ2VyLnBsYXkoJ2xvb3NlJyk7XG4gIH1cbn1cbiIsImltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuaW1wb3J0IEJ0biBmcm9tICcuL0J0bic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEljb25CdG4gZXh0ZW5kcyBCdG4ge1xuICBjb25zdHJ1Y3RvcihsYWJlbCwgY29sb3IgPSAnb3JhbmdlJykge1xuICAgIHN1cGVyKGxhYmVsLCBjb2xvciwgJ2ljb25CdG4nKTtcbiAgfVxuICBjcmVhdGVMYWJlbChsYWJlbCkge1xuICAgIHRoaXMubGFiZWwgPSBuZXcgY3JlYXRlanMuU3ByaXRlKGFzc2V0c01hbmFnZXIuZ2V0U3ByaXRlU2hlZXQoJ2ljb24nKSwgbGFiZWwpO1xuICAgIHRoaXMubGFiZWwucmVnWCA9IHRoaXMubGFiZWwuZ2V0Qm91bmRzKCkud2lkdGggLyAyO1xuICAgIHRoaXMubGFiZWwucmVnWSA9IHRoaXMubGFiZWwuZ2V0Qm91bmRzKCkuaGVpZ2h0IC8gMjtcbiAgICB0aGlzLmxhYmVsLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5sYWJlbCk7XG4gIH1cbiAgY2hhbmdlTGFiZWwobGFiZWwpIHtcbiAgICB0aGlzLmxhYmVsLmdvdG9BbmRTdG9wKGxhYmVsKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hhZG93T3ZlcmxheSBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5zaGFkb3cgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbiAgICB0aGlzLnNoYWRvdy5ncmFwaGljcy5iZWdpbkZpbGwoJ3JnYmEoMCwgMCwgMCwgMC42KScpLmRyYXdSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgdGhpcy5zaGFkb3dUZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoJycsICcyNXB4IEd1ZXJpbGxhJywgJyNmZmYnKTtcbiAgICB0aGlzLnNoYWRvd1RleHQueSA9IGhlaWdodCAvIDI7XG4gICAgdGhpcy5zaGFkb3dUZXh0LnggPSB3aWR0aCAvIDI7XG4gICAgdGhpcy5zaGFkb3dUZXh0LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRoaXMuc2hhZG93VGV4dC50ZXh0QmFzZWxpbmUgPSAnbWlkZGxlJztcblxuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5zaGFkb3csIHRoaXMuc2hhZG93VGV4dCk7XG4gICAgLy8gdG9kb1xuICAgIC8vIHRoaXMuY2FjaGUoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gIH1cbiAgc2V0VGV4dCh0ZXh0KSB7XG4gICAgdGhpcy5zaGFkb3dUZXh0LnRleHQgPSB0ZXh0O1xuICAgIC8vIHRoaXMudXBkYXRlQ2FjaGUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IGFzc2V0c01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvYXNzZXRzTWFuYWdlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwaWtlIGV4dGVuZHMgY3JlYXRlanMuQml0bWFwIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoYXNzZXRzTWFuYWdlci5nZXRSZXN1bHQoJ3NwaWtlJykpO1xuXG4gICAgdGhpcy5ib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpO1xuICAgIHRoaXMucmVnWCA9IHRoaXMuYm91bmRzLndpZHRoIC8gMjtcbiAgICB0aGlzLnJlZ1kgPSB0aGlzLmJvdW5kcy5oZWlnaHQ7XG4gIH1cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5zY2FsZVkgPSAwLjcgKyAoTWF0aC5yYW5kb20oKSAqIDAuNSk7XG4gIH1cbn1cbiIsImNvbnN0IG1hbmlmZXN0ID0gW1xuICB7IGlkOiAnbW9uc3RlcicsIHNyYzogJ2ltZy9tb25zdGVyLXNwcml0ZS5wbmcnIH0sXG4gIC8vIHsgaWQ6ICdiaXJkJywgc3JjOiAnaW1nL2JpcmQtc3ByaXRlLnBuZycgfSxcbiAgLy8geyBpZDogJ2NoaWNrZW4nLCBzcmM6ICdpbWcvY2hpY2tlbi1zcHJpdGUucG5nJyB9LFxuICB7IGlkOiAnc3Bpa2UnLCBzcmM6ICdpbWcvc3Bpa2UucG5nJyB9LFxuICB7IGlkOiAnc2t5Jywgc3JjOiAnaW1nL2JnL3NreS5wbmcnIH0sXG4gIHsgaWQ6ICdzdGFydCcsIHNyYzogJ2ltZy9iZy9zdGFydC5wbmcnIH0sXG4gIHsgaWQ6ICdtb3VudGFpbicsIHNyYzogJ2ltZy9iZy9tb3VudGFpbi5wbmcnIH0sXG4gIHsgaWQ6ICdncm91bmQnLCBzcmM6ICdpbWcvYmcvZ3JvdW5kLnBuZycgfSxcbiAgeyBpZDogJ2J0bicsIHNyYzogJ2ltZy9idG4tc3ByaXRlLnBuZycgfSxcbiAgeyBpZDogJ2ljb24tYnRuJywgc3JjOiAnaW1nL2ljb24tYnRuLXNwcml0ZS5wbmcnIH0sXG4gIHsgaWQ6ICdpY29uJywgc3JjOiAnaW1nL2ljb24tc3ByaXRlLnBuZycgfSxcbiAgeyBpZDogJ2JhY2snLCBzcmM6ICdzb3VuZC9iYWNrZ3JvdW5kLm9nZycgfSxcbiAgeyBpZDogJ2ZsYXAnLCBzcmM6ICdzb3VuZC9mbGFwLm9nZycgfSxcbiAgeyBpZDogJ2xvb3NlJywgc3JjOiAnc291bmQvbG9vc2Uub2dnJyB9LFxuXTtcblxuY29uc3QgZ2V0SGVyb1Nwcml0ZVNoZWV0RGF0YSA9IG5hbWUgPT4gKHtcbiAgaW1hZ2VzOiBbbmFtZV0sXG4gIGZyYW1lczogeyB3aWR0aDogMTAwLCBoZWlnaHQ6IDc4IH0sXG4gIGFuaW1hdGlvbnM6IHtcbiAgICBmbHk6IDAsXG4gICAgZmxhcDogWzEsIDMsICdmbHknXSxcbiAgICBkZWFkOiA0LFxuICB9LFxufSk7XG5cbmNvbnN0IHNwcml0ZVNoZWV0c0RhdGEgPSB7XG4gIGJpcmQ6IGdldEhlcm9TcHJpdGVTaGVldERhdGEoJ2JpcmQnKSxcbiAgbW9uc3RlcjogZ2V0SGVyb1Nwcml0ZVNoZWV0RGF0YSgnbW9uc3RlcicpLFxuICBjaGlja2VuOiBnZXRIZXJvU3ByaXRlU2hlZXREYXRhKCdjaGlja2VuJyksXG4gIGJ0bjoge1xuICAgIGltYWdlczogWydidG4nXSxcbiAgICBmcmFtZXM6IHsgd2lkdGg6IDIxMCwgaGVpZ2h0OiA2OSwgc3BhY2luZzogMiB9LFxuICAgIGFuaW1hdGlvbnM6IHtcbiAgICAgIGdyZWVuT3V0OiAwLFxuICAgICAgZ3JlZW5PdmVyOiAyLFxuICAgICAgZ3JlZW5Eb3duOiA0LFxuICAgICAgb3JhbmdlT3V0OiA2LFxuICAgICAgb3JhbmdlT3ZlcjogOCxcbiAgICAgIG9yYW5nZURvd246IDEsXG4gICAgICByZWRPdXQ6IDMsXG4gICAgICByZWRPdmVyOiA1LFxuICAgICAgcmVkRG93bjogNyxcbiAgICAgIGRpc2FibGU6IDksXG4gICAgfSxcbiAgfSxcbiAgaWNvbkJ0bjoge1xuICAgIGltYWdlczogWydpY29uLWJ0biddLFxuICAgIGZyYW1lczogeyB3aWR0aDogNjksIGhlaWdodDogNzEsIHNwYWNpbmc6IDIgfSxcbiAgICBhbmltYXRpb25zOiB7XG4gICAgICBncmVlbk91dDogMCxcbiAgICAgIGdyZWVuT3ZlcjogMSxcbiAgICAgIGdyZWVuRG93bjogMixcbiAgICAgIG9yYW5nZU91dDogMyxcbiAgICAgIG9yYW5nZU92ZXI6IDQsXG4gICAgICBvcmFuZ2VEb3duOiA1LFxuICAgICAgcmVkT3V0OiA4LFxuICAgICAgcmVkT3ZlcjogNyxcbiAgICAgIHJlZERvd246IDYsXG4gICAgICBkaXNhYmxlOiA5LFxuICAgIH0sXG4gIH0sXG4gIGljb246IHtcbiAgICBpbWFnZXM6IFsnaWNvbiddLFxuICAgIGZyYW1lczogeyB3aWR0aDogNDAsIGhlaWdodDogNDAgfSxcbiAgICBhbmltYXRpb25zOiB7XG4gICAgICBzb3VuZDogMCxcbiAgICAgIHNvdW5kT2ZmOiAxLFxuICAgICAgcmF0aW5nOiAyLFxuICAgICAgbWVudTogMyxcbiAgICB9LFxuICB9LFxufTtcblxuY29uc3Qgc3ByaXRlU2hlZXRzID0ge307XG5cbmNvbnN0IGFzc2V0c01hbmFnZXIgPSB7XG4gIGluaXQoKSB7XG4gICAgY3JlYXRlanMuU291bmQuYWx0ZXJuYXRlRXh0ZW5zaW9ucyA9IFsnbXAzJ107XG4gICAgdGhpcy5xdWV1ZSA9IG5ldyBjcmVhdGVqcy5Mb2FkUXVldWUoKTtcbiAgICB0aGlzLnF1ZXVlLmluc3RhbGxQbHVnaW4oY3JlYXRlanMuU291bmQpO1xuICAgIHRoaXMucXVldWUubG9hZE1hbmlmZXN0KG1hbmlmZXN0KTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLnF1ZXVlLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbXBsZXRlJywgKCkgPT4gcmVzb2x2ZSgpKTtcbiAgICAgIHRoaXMucXVldWUuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoKSA9PiByZWplY3QoKSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldFJlc3VsdChuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMucXVldWUuZ2V0UmVzdWx0KG5hbWUpO1xuICB9LFxuICBnZXRTcHJpdGVTaGVldChuYW1lKSB7XG4gICAgaWYgKCFzcHJpdGVTaGVldHNbbmFtZV0pIHtcbiAgICAgIGNvbnN0IGRhdGEgPSBzcHJpdGVTaGVldHNEYXRhW25hbWVdO1xuXG4gICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHNwcml0ZVNoZWV0IG5hbWUnKTtcbiAgICAgIH1cblxuICAgICAgZGF0YS5pbWFnZXMgPSBkYXRhLmltYWdlcy5tYXAoaW1nID0+IHRoaXMuZ2V0UmVzdWx0KGltZykpO1xuICAgICAgc3ByaXRlU2hlZXRzW25hbWVdID0gbmV3IGNyZWF0ZWpzLlNwcml0ZVNoZWV0KGRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiBzcHJpdGVTaGVldHNbbmFtZV07XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBhc3NldHNNYW5hZ2VyO1xuIiwiY29uc3QgZGF0YU1hbmFnZXIgPSB7XG4gIHNjb3JlOiAwLFxuICBtYXhTY29yZTogbnVsbCxcbiAgaGVyb1R5cGU6ICdtb25zdGVyJyxcbiAgdXNlcjoge1xuICAgIGlkOiBudWxsLFxuICAgIG5hbWU6IG51bGwsXG4gICAgc2V4OiBudWxsLFxuICB9LFxuICBzZXQoa2V5LCB2YWx1ZSkge1xuICAgIHRoaXNba2V5XSA9IHZhbHVlO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGF0YU1hbmFnZXI7XG4iLCJpbXBvcnQgU3RhcnRTY3JlZW4gZnJvbSAnLi4vc2NyZWVucy9TdGFydFNjcmVlbic7XG5pbXBvcnQgTWFpblNjcmVlbiBmcm9tICcuLi9zY3JlZW5zL01haW5TY3JlZW4nO1xuaW1wb3J0IEVuZFNjcmVlbiBmcm9tICcuLi9zY3JlZW5zL0VuZFNjcmVlbic7XG5pbXBvcnQgUmF0aW5nU2NyZWVuIGZyb20gJy4uL3NjcmVlbnMvUmF0aW5nU2NyZWVuJztcblxuY29uc3Qgc2NyZWVuTWFuYWdlciA9IHtcbiAgaW5pdChzdGFnZSkge1xuICAgIHRoaXMuc3RhZ2UgPSBzdGFnZTtcbiAgICB0aGlzLmN1cnJlbnRTY3JlZW4gPSBudWxsO1xuICAgIHRoaXMuc2NyZWVucyA9IHtcbiAgICAgIFN0YXJ0U2NyZWVuLFxuICAgICAgTWFpblNjcmVlbixcbiAgICAgIEVuZFNjcmVlbixcbiAgICAgIFJhdGluZ1NjcmVlbixcbiAgICB9O1xuXG4gICAgY3JlYXRlanMuVGlja2VyLnRpbWluZ01vZGUgPSBjcmVhdGVqcy5UaWNrZXIuUkFGO1xuICAgIGNyZWF0ZWpzLlRpY2tlci5hZGRFdmVudExpc3RlbmVyKCd0aWNrJywgZSA9PiB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50U2NyZWVuICYmIHRoaXMuY3VycmVudFNjcmVlbi50aWNrKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFNjcmVlbi50aWNrKGUpO1xuICAgICAgfVxuICAgICAgdGhpcy5zdGFnZS51cGRhdGUoZSk7XG4gICAgfSk7XG4gIH0sXG4gIGNoYW5nZShuYW1lKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudFNjcmVlbikge1xuICAgICAgaWYgKHRoaXMuY3VycmVudFNjcmVlbi5kZXN0cm95KSB7XG4gICAgICAgIHRoaXMuY3VycmVudFNjcmVlbi5kZXN0cm95KCk7XG4gICAgICB9XG4gICAgICB0aGlzLnN0YWdlLnJlbW92ZUNoaWxkKHRoaXMuY3VycmVudFNjcmVlbik7XG4gICAgfVxuICAgIHRoaXMuY3VycmVudFNjcmVlbiA9IG5ldyB0aGlzLnNjcmVlbnNbbmFtZV0odGhpcy5zdGFnZS5jYW52YXMud2lkdGgsIHRoaXMuc3RhZ2UuY2FudmFzLmhlaWdodCk7XG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmN1cnJlbnRTY3JlZW4pO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgc2NyZWVuTWFuYWdlcjtcbiIsImNvbnN0IHNlcnZlck1hbmFnZXIgPSB7XG4gIGluaXQoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IFZLLmluaXQoXG4gICAgICAoKSA9PiByZXNvbHZlKCksXG4gICAgICBlID0+IHJlamVjdCgndmsgaW5pdCBlcnJvcicsIGUpLFxuICAgICc1LjYwJykpO1xuICB9LFxuICBnZXRVc2VyKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBWSy5hcGkoJ3VzZXJzLmdldCcsIHsgZmllbGRzOiAnc2V4JyB9LCByID0+IHtcbiAgICAgICAgaWYgKHIuZXJyb3IpIHtcbiAgICAgICAgICByZWplY3Qoci5lcnJvcik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUoci5yZXNwb25zZVswXSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0KGtleSwgZ2xvYmFsID0gMCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IFZLLmFwaSgnc3RvcmFnZS5nZXQnLCB7IGtleSwgZ2xvYmFsIH0sIHJlc29sdmUpKVxuICAgICAgLnRoZW4ociA9PiB7XG4gICAgICAgIGlmIChyLmVycm9yKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHIuZXJyb3IpO1xuICAgICAgICB9IGVsc2UgaWYgKHIucmVzcG9uc2UgPT09ICcnKSB7XG4gICAgICAgICAgLy8gY2FudCBKU09OLnBhcnNlIGVtcHR5IHN0cmluZyBidXQgbmVlZCB0byBnZXQgZGVmYXVsdCB2YWx1ZVxuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyLnJlc3BvbnNlKTtcbiAgICAgIH0pO1xuICB9LFxuICBzZXQoa2V5LCB2YWx1ZSwgZ2xvYmFsID0gMCkge1xuICAgIFZLLmFwaSgnc3RvcmFnZS5zZXQnLCB7IGtleSwgdmFsdWU6IEpTT04uc3RyaW5naWZ5KHZhbHVlKSwgZ2xvYmFsIH0pO1xuICB9LFxuICBzaGFyZShzY29yZSwgc2V4ID0gMikge1xuICAgIFZLLmFwaSgnd2FsbC5wb3N0Jywge1xuICAgICAgbWVzc2FnZTogYNCvINC/0YDQvtC70LXRgtC10Lske3NleCAhPT0gMiA/ICfQsCcgOiAnJ30gJHtzY29yZX0g0Lwg0LIg0LjQs9GA0LUgRmxhcHB5IE1vbnN0ZXIhXG4gICAgICAgICAgICAgICAgQSDRgdC60L7Qu9GM0LrQviDRgdC80L7QttC10YjRjCDRgtGLP2AsXG4gICAgICBhdHRhY2htZW50czogJ3Bob3RvLTEzNTU2MzM4OF80NTYyMzkwMTcsIGh0dHBzOi8vdmsuY29tL2FwcDU3ODIxMTgnLFxuICAgICAgc2VydmljZXM6ICd0d2l0dGVyJyxcbiAgICB9KTtcbiAgfSxcbiAgaW52aXRlKCkge1xuICAgIFZLLmNhbGxNZXRob2QoJ3Nob3dJbnZpdGVCb3gnKTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNlcnZlck1hbmFnZXI7XG4iLCJjb25zdCBzb3VuZE1hbmFnZXIgPSB7XG4gIGluaXQoZW5hYmxlKSB7XG4gICAgdGhpcy5lbmFibGVkID0gZW5hYmxlO1xuICAgIHRoaXMuYmcgPSBjcmVhdGVqcy5Tb3VuZC5wbGF5KCdiYWNrJywgeyBsb29wOiAtMSwgdm9sdW1lOiAwLjMgfSk7XG4gICAgdGhpcy5iZy5wYXVzZWQgPSAhdGhpcy5lbmFibGVkO1xuICAgIC8vIHNvbWV0aW1lcyBuZWdhdGl2ZSB2YWx1ZSBvY2N1cnMgYW5kIHRocm93IGVycm9yXG4gICAgdGhpcy5iZy5wb3NpdGlvbiA9IDA7XG4gIH0sXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzLmVuYWJsZWQgPSAhdGhpcy5lbmFibGVkO1xuICAgIHRoaXMuYmcucGF1c2VkID0gIXRoaXMuZW5hYmxlZDtcbiAgfSxcbiAgaXNFbmFibGVkKCkge1xuICAgIHJldHVybiB0aGlzLmVuYWJsZWQ7XG4gIH0sXG4gIHBsYXkoc291bmQpIHtcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7XG4gICAgICBjcmVhdGVqcy5Tb3VuZC5wbGF5KHNvdW5kKTtcbiAgICB9XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBzb3VuZE1hbmFnZXI7XG4iLCJpbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcbmltcG9ydCBzY3JlZW5zTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zY3JlZW5zTWFuYWdlcic7XG5pbXBvcnQgc2VydmVyTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zZXJ2ZXJNYW5hZ2VyJztcbmltcG9ydCBkYXRhTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9kYXRhTWFuYWdlcic7XG5pbXBvcnQgR3VpIGZyb20gJy4uL2Rpc3BsYXkvR3VpJztcbmltcG9ydCBCdG4gZnJvbSAnLi4vZGlzcGxheS9CdG4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbmRTY3JlZW4gZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuICBjb25zdHJ1Y3Rvcih3aWR0aCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmJnID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChhc3NldHNNYW5hZ2VyLmdldFJlc3VsdCgnc3RhcnQnKSk7XG4gICAgdGhpcy5ndWkgPSBuZXcgR3VpKHdpZHRoKTtcblxuICAgIHRoaXMuc2NvcmUgPSBuZXcgY3JlYXRlanMuVGV4dChg0KDQtdC30YPQu9GM0YLQsNGCOiAke2RhdGFNYW5hZ2VyLnNjb3JlfSDQvFxcblxcbtCg0LXQutC+0YDQtDogJHtkYXRhTWFuYWdlci5tYXhTY29yZX0g0LxgLCAnNDBweCBHdWVyaWxsYScsICcjMDAwJyk7XG4gICAgdGhpcy5zY29yZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICB0aGlzLnNjb3JlLnggPSB3aWR0aCAvIDI7XG4gICAgdGhpcy5zY29yZS55ID0gMTI1O1xuXG4gICAgdGhpcy5yZXBsYXlCdG4gPSBuZXcgQnRuKCfQldGJ0LUg0YDQsNC3Jyk7XG4gICAgdGhpcy5yZXBsYXlCdG4ueCA9IHdpZHRoIC8gMjtcbiAgICB0aGlzLnJlcGxheUJ0bi55ID0gMzUwO1xuXG4gICAgdGhpcy5zaGFyZUJ0biA9IG5ldyBCdG4oJ9Cf0L7QtNC10LvQuNGC0YzRgdGPJywgJ29yYW5nZScpO1xuICAgIHRoaXMuc2hhcmVCdG4ueCA9IHdpZHRoIC8gMjtcbiAgICB0aGlzLnNoYXJlQnRuLnkgPSA0NTA7XG4gICAgdGhpcy5zaGFyZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNlcnZlck1hbmFnZXIuc2hhcmUoZGF0YU1hbmFnZXIuc2NvcmUsIGRhdGFNYW5hZ2VyLnVzZXIuc2V4KSk7XG5cbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuYmcsIHRoaXMuZ3VpLCB0aGlzLnNjb3JlLCB0aGlzLnJlcGxheUJ0biwgdGhpcy5zaGFyZUJ0bik7XG5cblxuICAgIGlmIChkYXRhTWFuYWdlci5zY29yZSA+IGRhdGFNYW5hZ2VyLm1heFNjb3JlKSB7XG4gICAgICBkYXRhTWFuYWdlci5tYXhTY29yZSA9IGRhdGFNYW5hZ2VyLnNjb3JlO1xuICAgICAgc2VydmVyTWFuYWdlci5zZXQoJ21heFNjb3JlJywgZGF0YU1hbmFnZXIubWF4U2NvcmUpO1xuICAgICAgdGhpcy5zY29yZS50ZXh0ID0gYNCd0L7QstGL0Lkg0YDQtdC60L7RgNC0OiAke2RhdGFNYW5hZ2VyLm1heFNjb3JlfSDQvCFgO1xuICAgICAgdGhpcy5zY29yZS55ICs9IDM1O1xuXG4gICAgICBzZXJ2ZXJNYW5hZ2VyLmdldCgncmF0aW5nVGFibGUnLCAxKS50aGVuKHJlY2FsY1JhdGluZ1RhYmxlKTtcbiAgICB9XG5cbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgfVxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMucmVwbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gc2NyZWVuc01hbmFnZXIuY2hhbmdlKCdNYWluU2NyZWVuJykpO1xuXG4gICAgdGhpcy5vbktleURvd24gPSBlID0+IHtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDMyKSB7XG4gICAgICAgIHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnTWFpblNjcmVlbicpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd24pO1xuICB9XG4gIGRlc3Ryb3koKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bik7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVjYWxjUmF0aW5nVGFibGUocmF0aW5nVGFibGUpIHtcbiAgaWYgKHJhdGluZ1RhYmxlW3JhdGluZ1RhYmxlLmxlbmd0aCAtIDFdLnNjb3JlID49IGRhdGFNYW5hZ2VyLm1heFNjb3JlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgdXNlclJhdGluZyA9IHJhdGluZ1RhYmxlLmZpbmQoZWwgPT4gZWwuaWQgPT09IGRhdGFNYW5hZ2VyLnVzZXIuaWQpO1xuXG4gIGlmICh1c2VyUmF0aW5nKSB7XG4gICAgdXNlclJhdGluZy5zY29yZSA9IGRhdGFNYW5hZ2VyLm1heFNjb3JlO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IG5ld1JhdGluZyA9IHtcbiAgICAgIGlkOiBkYXRhTWFuYWdlci51c2VyLmlkLFxuICAgICAgbmFtZTogZGF0YU1hbmFnZXIudXNlci5uYW1lLFxuICAgICAgc2NvcmU6IGRhdGFNYW5hZ2VyLm1heFNjb3JlLFxuICAgIH07XG4gICAgaWYgKHJhdGluZ1RhYmxlLmxlbmd0aCA8IDEwKSB7XG4gICAgICByYXRpbmdUYWJsZS5wdXNoKG5ld1JhdGluZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJhdGluZ1RhYmxlW3JhdGluZ1RhYmxlLmxlbmd0aCAtIDFdID0gbmV3UmF0aW5nO1xuICAgIH1cbiAgfVxuXG4gIHJhdGluZ1RhYmxlLnNvcnQoKGEsIGIpID0+IGIuc2NvcmUgLSBhLnNjb3JlKTtcbiAgc2VydmVyTWFuYWdlci5zZXQoJ3JhdGluZ1RhYmxlJywgcmF0aW5nVGFibGUsIDEpO1xufVxuIiwiaW1wb3J0IHNjcmVlbnNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NjcmVlbnNNYW5hZ2VyJztcbmltcG9ydCBkYXRhTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9kYXRhTWFuYWdlcic7XG5pbXBvcnQgQmFja2dyb3VuZCBmcm9tICcuLi9kaXNwbGF5L0JhY2tncm91bmQnO1xuaW1wb3J0IEhlcm8gZnJvbSAnLi4vZGlzcGxheS9IZXJvJztcbmltcG9ydCBTcGlrZSBmcm9tICcuLi9kaXNwbGF5L1NwaWtlJztcbmltcG9ydCBTaGFkb3dPdmVybGF5IGZyb20gJy4uL2Rpc3BsYXkvU2hhZG93T3ZlcmxheSc7XG5cbmNvbnN0IEdST1VORF9IRUlHSFQgPSA4MjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpblNjcmVlbiBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgdGhpcy5zcGVlZCA9IDI5MDtcbiAgICB0aGlzLmRpc3RhbmNlID0gMDtcbiAgICB0aGlzLnNoYWRvd092ZXJsYXkgPSBuZXcgU2hhZG93T3ZlcmxheSh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG5cbiAgICB0aGlzLmNyZWF0ZUJnKCk7XG4gICAgdGhpcy5jcmVhdGVTcGlrZXMoKTtcbiAgICB0aGlzLmNyZWF0ZUhlcm8oKTtcbiAgICB0aGlzLmNyZWF0ZUh1ZCgpO1xuXG4gICAgdGhpcy5wYXVzZSgn0J/RgNC+0LHQtdC7IC0g0LLQt9C80LDRhSDQutGA0YvQu9GM0Y/QvNC4LCBlc2MgLSDQv9Cw0YPQt9CwJyk7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gIH1cbiAgY3JlYXRlQmcoKSB7XG4gICAgdGhpcy5iZ1NreSA9IG5ldyBCYWNrZ3JvdW5kKCdza3knLCB0aGlzLndpZHRoKTtcbiAgICB0aGlzLmJnTW91bnRhaW4gPSBuZXcgQmFja2dyb3VuZCgnbW91bnRhaW4nLCB0aGlzLndpZHRoKTtcbiAgICB0aGlzLmJnR3JvdW5kID0gbmV3IEJhY2tncm91bmQoJ2dyb3VuZCcsIHRoaXMud2lkdGgpO1xuICAgIHRoaXMuYmdTa3kueSA9IHRoaXMuYmdNb3VudGFpbi55ID0gdGhpcy5iZ0dyb3VuZC55ID0gdGhpcy5oZWlnaHQ7XG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmJnU2t5LCB0aGlzLmJnTW91bnRhaW4sIHRoaXMuYmdHcm91bmQpO1xuICB9XG4gIGNyZWF0ZVNwaWtlcygpIHtcbiAgICB0aGlzLnNwaWtlcyA9IFtuZXcgU3Bpa2UoKSwgbmV3IFNwaWtlKCldO1xuICAgIHRoaXMuc3Bpa2VzWzBdLnggPSAtdGhpcy5zcGlrZXNbMF0uYm91bmRzLndpZHRoIC8gMjtcbiAgICB0aGlzLnNwaWtlc1sxXS54ID0gdGhpcy53aWR0aCAvIDI7XG4gICAgdGhpcy5zcGlrZXMuZm9yRWFjaChzcGlrZSA9PiB0aGlzLnJlc2V0U3Bpa2Uoc3Bpa2UpKTtcbiAgICB0aGlzLmFkZENoaWxkKC4uLnRoaXMuc3Bpa2VzKTtcbiAgfVxuICBjcmVhdGVIZXJvKCkge1xuICAgIHRoaXMuaGVybyA9IG5ldyBIZXJvKGRhdGFNYW5hZ2VyLmhlcm9UeXBlKTtcbiAgICB0aGlzLmhlcm8ueCA9IHRoaXMud2lkdGggLyAyO1xuICAgIHRoaXMuaGVyby55ID0gMTkwO1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5oZXJvKTtcbiAgfVxuICBjcmVhdGVIdWQoKSB7XG4gICAgdGhpcy5odWREaXN0YW5jZSA9IG5ldyBjcmVhdGVqcy5UZXh0KCcwINC8JywgJzI1cHggR3VlcmlsbGEnLCAnIzAwMCcpO1xuICAgIHRoaXMuaHVkRGlzdGFuY2UueCA9IDIwO1xuICAgIHRoaXMuaHVkRGlzdGFuY2UueSA9IDE1O1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5odWREaXN0YW5jZSk7XG4gIH1cbiAgcmVzZXRTcGlrZShzcGlrZSkge1xuICAgIHNwaWtlLnJlc2V0KCk7XG4gICAgc3Bpa2UueCArPSB0aGlzLndpZHRoICsgc3Bpa2UuYm91bmRzLndpZHRoO1xuICAgIGlmIChNYXRoLnJhbmRvbSgpID4gMC41KSB7XG4gICAgICBzcGlrZS55ID0gdGhpcy5oZWlnaHQgLSBHUk9VTkRfSEVJR0hUO1xuICAgICAgc3Bpa2Uucm90YXRpb24gPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBzcGlrZS55ID0gMDtcbiAgICAgIHNwaWtlLnJvdGF0aW9uID0gMTgwO1xuICAgIH1cbiAgfVxuICBwYXVzZSh0ZXh0KSB7XG4gICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuICAgIHRoaXMuc2hhZG93T3ZlcmxheS5zZXRUZXh0KHRleHQpO1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5zaGFkb3dPdmVybGF5KTtcbiAgfVxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmhhbmRsZUFjdGlvbigpKTtcbiAgICB0aGlzLm9uS2V5RG93biA9IGUgPT4ge1xuICAgICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSAzMjpcbiAgICAgICAgICB0aGlzLmhhbmRsZUFjdGlvbigpO1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyNzpcbiAgICAgICAgICB0aGlzLnRvZ2dsZVBhdXNlKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLm9uVG91Y2hTdGFydCA9IGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5oYW5kbGVBY3Rpb24oKTtcbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bik7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uVG91Y2hTdGFydCk7XG4gIH1cbiAgaGFuZGxlQWN0aW9uKCkge1xuICAgIGlmICh0aGlzLnBhdXNlZCkge1xuICAgICAgdGhpcy50b2dnbGVQYXVzZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhlcm8uZmxhcCgpO1xuICAgIH1cbiAgfVxuICB0b2dnbGVQYXVzZSgpIHtcbiAgICBpZiAodGhpcy5wYXVzZWQpIHtcbiAgICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XG4gICAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuc2hhZG93T3ZlcmxheSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGF1c2UoJ9Cd0LDQttC80LjRgtC1INC/0YDQvtCx0LXQuyDQuNC70LggZXNjJyk7XG4gICAgfVxuICB9XG4gIG1vdmVXb3JsZCh0aW1lKSB7XG4gICAgY29uc3QgcGF0aCA9IHRoaXMuc3BlZWQgKiB0aW1lO1xuICAgIGlmICh0aGlzLmhlcm8uZGVhZCkge1xuICAgICAgdGhpcy5oZXJvLnggKz0gcGF0aCAqIDAuNTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb3ZlU3Bpa2VzKHBhdGgpO1xuICAgICAgdGhpcy5iZ1NreS5tb3ZlKHBhdGggKiAwLjEpO1xuICAgICAgdGhpcy5iZ01vdW50YWluLm1vdmUocGF0aCAqIDAuMyk7XG4gICAgICB0aGlzLmJnR3JvdW5kLm1vdmUocGF0aCk7XG5cbiAgICAgIHRoaXMuZGlzdGFuY2UgKz0gcGF0aDtcbiAgICAgIGRhdGFNYW5hZ2VyLnNjb3JlID0gTWF0aC5mbG9vcih0aGlzLmRpc3RhbmNlIC8gMjUpO1xuICAgICAgdGhpcy5odWREaXN0YW5jZS50ZXh0ID0gYCR7ZGF0YU1hbmFnZXIuc2NvcmV9INC8YDtcbiAgICB9XG4gIH1cbiAgbW92ZVNwaWtlcyhwYXRoKSB7XG4gICAgdGhpcy5zcGlrZXMuZm9yRWFjaChzcGlrZSA9PiB7XG4gICAgICBzcGlrZS54IC09IHBhdGg7XG4gICAgICBpZiAoc3Bpa2UueCA8IC1zcGlrZS5ib3VuZHMud2lkdGggLyAyKSB7XG4gICAgICAgIHRoaXMucmVzZXRTcGlrZShzcGlrZSk7XG4gICAgICAgIHRoaXMuc3BlZWQgKz0gMTtcbiAgICAgIH1cbiAgICAgIGlmIChuZGdtci5jaGVja1BpeGVsQ29sbGlzaW9uKHRoaXMuaGVybywgc3Bpa2UpKSB7XG4gICAgICAgIHRoaXMuaGVyby5kaWUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBtb3ZlSGVybyh0aW1lKSB7XG4gICAgdGhpcy5oZXJvLm1vdmUodGltZSk7XG4gICAgaWYgKHRoaXMuaGVyby55IDwgMCkge1xuICAgICAgdGhpcy5oZXJvLnZZID0gMDtcbiAgICAgIHRoaXMuaGVyby55ID0gMDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaGVyby55ID4gdGhpcy5oZWlnaHQgKyB0aGlzLmhlcm8uYm91bmRzLmhlaWdodCAvIDIpIHtcbiAgICAgIHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnRW5kU2NyZWVuJyk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmhlcm8ueSA+IHRoaXMuaGVpZ2h0IC0gKEdST1VORF9IRUlHSFQgKyB0aGlzLmhlcm8uYm91bmRzLmhlaWdodCAvIDIpKSB7XG4gICAgICB0aGlzLmhlcm8uZGllKCk7XG4gICAgfVxuICB9XG4gIHRpY2soZSkge1xuICAgIGNvbnN0IHNlYyA9IGUuZGVsdGEgKiAwLjAwMTtcbiAgICBpZiAodGhpcy5wYXVzZWQgfHwgc2VjID4gMC4zKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMubW92ZVdvcmxkKHNlYyk7XG4gICAgdGhpcy5tb3ZlSGVybyhzZWMpO1xuICB9XG4gIGRlc3Ryb3koKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bik7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uVG91Y2hTdGFydCk7XG4gIH1cbn1cbiIsImltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuaW1wb3J0IGRhdGFNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2RhdGFNYW5hZ2VyJztcbmltcG9ydCBzZXJ2ZXJNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NlcnZlck1hbmFnZXInO1xuaW1wb3J0IEd1aSBmcm9tICcuLi9kaXNwbGF5L0d1aSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhdGluZ1NjcmVlbiBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcblxuICAgIHRoaXMuYmcgPSBuZXcgY3JlYXRlanMuQml0bWFwKGFzc2V0c01hbmFnZXIuZ2V0UmVzdWx0KCdzdGFydCcpKTtcbiAgICB0aGlzLmd1aSA9IG5ldyBHdWkod2lkdGgpO1xuXG4gICAgdGhpcy50aXRsZSA9IG5ldyBjcmVhdGVqcy5UZXh0KCfQoNC10LnRgtC40L3QsycsICczNXB4IEd1ZXJpbGxhJywgJyMwMDAnKTtcbiAgICB0aGlzLnRpdGxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRoaXMudGl0bGUueCA9IHRoaXMud2lkdGggLyAyO1xuICAgIHRoaXMudGl0bGUueSA9IDM1O1xuXG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmJnLCB0aGlzLmd1aSwgdGhpcy50aXRsZSk7XG5cbiAgICBzZXJ2ZXJNYW5hZ2VyLmdldCgncmF0aW5nVGFibGUnLCAxKVxuICAgICAgLy8gdG9kbzogcmVtb3ZlIGxhdGVyLCBub3cgaXQgYWRkIHJlY29yZHMgZm9yIG9sZCB1c2Vyc1xuICAgICAgLnRoZW4ocmVjYWxjUmF0aW5nVGFibGUpXG4gICAgICAudGhlbihyID0+IHRoaXMuc2hvd1JhdGluZyhyKSlcbiAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRleHQgPSBuZXcgY3JlYXRlanMuVGV4dCgn0KDQtdC50YLQuNC90LMg0LLRgNC10LzQtdC90L3QviDQvdC10LTQvtGB0YLRg9C/0LXQvSA6KCcsICcyNXB4IEd1ZXJpbGxhJywgJyMwMDAnKTtcbiAgICAgICAgdGV4dC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgdGV4dC54ID0gdGhpcy53aWR0aCAvIDI7XG4gICAgICAgIHRleHQueSA9IDE1MDtcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0ZXh0KTtcbiAgICAgIH0pO1xuICB9XG4gIHNob3dSYXRpbmcocmF0aW5nVGFibGUpIHtcbiAgICBsZXQgd2lubmVyID0gZmFsc2U7XG5cbiAgICByYXRpbmdUYWJsZS5mb3JFYWNoKChlbCwgaSkgPT4ge1xuICAgICAgY29uc3QgdGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KGAke2kgKyAxfSAke2VsLm5hbWV9ICR7ZWwuc2NvcmV9INC8YCwgJzI1cHggR3VlcmlsbGEnLCAnIzAwMCcpO1xuICAgICAgdGV4dC55ID0gMTIwICsgaSAqIDQwO1xuICAgICAgdGV4dC54ID0gMTIwO1xuICAgICAgdGhpcy5hZGRDaGlsZCh0ZXh0KTtcblxuICAgICAgaWYgKGVsLmlkID09PSBkYXRhTWFuYWdlci51c2VyLmlkKSB7XG4gICAgICAgIHdpbm5lciA9IHRydWU7XG4gICAgICAgIHRleHQuY29sb3IgPSAnIzdFQ0UyRSc7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoIXdpbm5lcikge1xuICAgICAgY29uc3QgdGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KGAtICR7ZGF0YU1hbmFnZXIudXNlci5uYW1lfSAke2RhdGFNYW5hZ2VyLm1heFNjb3JlfSDQvGAsICcyNXB4IEd1ZXJpbGxhJywgJyM3RUNFMkUnKTtcbiAgICAgIHRleHQueSA9IDEyMCArIHJhdGluZ1RhYmxlLmxlbmd0aCAqIDQwO1xuICAgICAgdGV4dC54ID0gMTIwO1xuICAgICAgdGhpcy5hZGRDaGlsZCh0ZXh0KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVjYWxjUmF0aW5nVGFibGUocmF0aW5nVGFibGUpIHtcbiAgaWYgKHJhdGluZ1RhYmxlW3JhdGluZ1RhYmxlLmxlbmd0aCAtIDFdLnNjb3JlIDwgZGF0YU1hbmFnZXIubWF4U2NvcmUpIHtcbiAgICBjb25zdCB1c2VyUmF0aW5nID0gcmF0aW5nVGFibGUuZmluZChlbCA9PiBlbC5pZCA9PT0gZGF0YU1hbmFnZXIudXNlci5pZCk7XG5cbiAgICBpZiAodXNlclJhdGluZykge1xuICAgICAgdXNlclJhdGluZy5zY29yZSA9IGRhdGFNYW5hZ2VyLm1heFNjb3JlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBuZXdSYXRpbmcgPSB7XG4gICAgICAgIGlkOiBkYXRhTWFuYWdlci51c2VyLmlkLFxuICAgICAgICBuYW1lOiBkYXRhTWFuYWdlci51c2VyLm5hbWUsXG4gICAgICAgIHNjb3JlOiBkYXRhTWFuYWdlci5tYXhTY29yZSxcbiAgICAgIH07XG4gICAgICBpZiAocmF0aW5nVGFibGUubGVuZ3RoIDwgMTApIHtcbiAgICAgICAgcmF0aW5nVGFibGUucHVzaChuZXdSYXRpbmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmF0aW5nVGFibGVbcmF0aW5nVGFibGUubGVuZ3RoIC0gMV0gPSBuZXdSYXRpbmc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmF0aW5nVGFibGUuc29ydCgoYSwgYikgPT4gYi5zY29yZSAtIGEuc2NvcmUpO1xuICAgIHNlcnZlck1hbmFnZXIuc2V0KCdyYXRpbmdUYWJsZScsIHJhdGluZ1RhYmxlLCAxKTtcbiAgfVxuICByZXR1cm4gcmF0aW5nVGFibGU7XG59XG4iLCJpbXBvcnQgc2VydmVyTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zZXJ2ZXJNYW5hZ2VyJztcbmltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuaW1wb3J0IHNjcmVlbnNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NjcmVlbnNNYW5hZ2VyJztcbmltcG9ydCBkYXRhTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9kYXRhTWFuYWdlcic7XG5pbXBvcnQgR3VpIGZyb20gJy4uL2Rpc3BsYXkvR3VpJztcbmltcG9ydCBIZXJvIGZyb20gJy4uL2Rpc3BsYXkvSGVybyc7XG5pbXBvcnQgQnRuIGZyb20gJy4uL2Rpc3BsYXkvQnRuJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhcnRTY3JlZW4gZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcblxuICAgIHRoaXMuYmcgPSBuZXcgY3JlYXRlanMuQml0bWFwKGFzc2V0c01hbmFnZXIuZ2V0UmVzdWx0KCdzdGFydCcpKTtcbiAgICB0aGlzLmd1aSA9IG5ldyBHdWkod2lkdGgpO1xuXG4gICAgdGhpcy5zdGFydEJ0biA9IG5ldyBCdG4oJ9CY0LPRgNCw0YLRjCcpO1xuICAgIHRoaXMuc3RhcnRCdG4ueCA9IHdpZHRoIC8gMjtcbiAgICB0aGlzLnN0YXJ0QnRuLnkgPSAzNTA7XG5cbiAgICB0aGlzLmludml0ZUJ0biA9IG5ldyBCdG4oJ9Cf0L7Qt9Cy0LDRgtGMINCx0YDQvicsICdvcmFuZ2UnKTtcbiAgICB0aGlzLmludml0ZUJ0bi54ID0gd2lkdGggLyAyO1xuICAgIHRoaXMuaW52aXRlQnRuLnkgPSA0NTA7XG5cbiAgICB0aGlzLmhlcm8gPSBuZXcgSGVybygnbW9uc3RlcicpO1xuICAgIHRoaXMuaGVyby54ID0gd2lkdGggLyAyO1xuICAgIHRoaXMuaGVyby55ID0gMTkwO1xuXG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmJnLCB0aGlzLmd1aSwgdGhpcy5oZXJvLCB0aGlzLnN0YXJ0QnRuLCB0aGlzLmludml0ZUJ0bik7XG5cbiAgICBpZiAoZGF0YU1hbmFnZXIubWF4U2NvcmUpIHtcbiAgICAgIHRoaXMuc2NvcmUgPSBuZXcgY3JlYXRlanMuVGV4dChg0JvRg9GH0YjQuNC5INGB0YfQtdGCOiAke2RhdGFNYW5hZ2VyLm1heFNjb3JlfSDQvGAsICcyNXB4IEd1ZXJpbGxhJywgJyMwMDAnKTtcbiAgICAgIHRoaXMuc2NvcmUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICB0aGlzLnNjb3JlLnggPSB0aGlzLndpZHRoIC8gMjtcbiAgICAgIHRoaXMuc2NvcmUueSA9IDQwO1xuICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLnNjb3JlKTtcbiAgICB9XG5cbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgfVxuICAvLyBjcmVhdGVIZXJvZXMoKSB7XG4gIC8vICAgdGhpcy5oZXJvZXMgPSBbXG4gIC8vICAgICBuZXcgSGVybygnYmlyZCcpLFxuICAvLyAgICAgbmV3IEhlcm8oJ21vbnN0ZXInKSxcbiAgLy8gICAgIG5ldyBIZXJvKCdjaGlja2VuJyksXG4gIC8vICAgXTtcbiAgLy8gICB0aGlzLmhlcm9lcy5mb3JFYWNoKChoZXJvLCBpKSA9PiB7XG4gIC8vICAgICBoZXJvLnkgPSB0aGlzLmhlaWdodCAvIDI7XG4gIC8vICAgICBoZXJvLnggPSAoaSArIDEpICogdGhpcy53aWR0aCAvICh0aGlzLmhlcm9lcy5sZW5ndGggKyAxKTtcbiAgLy8gICAgIGhlcm8uY3Vyc29yID0gJ3BvaW50ZXInO1xuICAvLyAgICAgaGVyby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuc2VsZWN0SGVybyhoZXJvKSk7XG4gIC8vICAgICBoZXJvLmNhY2hlKDAsIDAsIGhlcm8uYm91bmRzLndpZHRoLCBoZXJvLmJvdW5kcy5oZWlnaHQpO1xuICAvLyAgIH0pO1xuICAvLyAgIHRoaXMuaGVyb0ZpbHRlciA9IG5ldyBjcmVhdGVqcy5Db2xvckZpbHRlcigwLjYsIDAuNiwgMC42KTtcbiAgLy8gICB0aGlzLnJlc2V0SGVyb2VzKCk7XG4gIC8vICAgdGhpcy5hZGRDaGlsZCguLi50aGlzLmhlcm9lcyk7XG4gIC8vIH1cbiAgLy8gcmVzZXRIZXJvZXMoKSB7XG4gIC8vICAgdGhpcy5oZXJvZXMuZm9yRWFjaChoZXJvID0+IHtcbiAgLy8gICAgIGhlcm8uZmlsdGVycyA9IFt0aGlzLmhlcm9GaWx0ZXJdO1xuICAvLyAgICAgaGVyby51cGRhdGVDYWNoZSgpO1xuICAvLyAgICAgaGVyby5zY2FsZVggPSAwLjg1O1xuICAvLyAgICAgaGVyby5zY2FsZVkgPSAwLjg1O1xuICAvLyAgIH0pO1xuICAvLyB9XG4gIC8vIHNlbGVjdEhlcm8oaGVybykge1xuICAvLyAgIHRoaXMucmVzZXRIZXJvZXMoKTtcblxuICAvLyAgIGhlcm8uZmlsdGVycyA9IFtdO1xuICAvLyAgIGhlcm8udXBkYXRlQ2FjaGUoKTtcbiAgLy8gICBoZXJvLnNjYWxlWCA9IDE7XG4gIC8vICAgaGVyby5zY2FsZVkgPSAxO1xuICAvLyAgIGhlcm8uZmxhcCgpO1xuXG4gIC8vICAgaWYgKCF0aGlzLnN0YXJ0QnRuLmVuYWJsZWQpIHtcbiAgLy8gICAgIHRoaXMuc3RhcnRCdG4uZW5hYmxlKCk7XG4gIC8vICAgfVxuXG4gIC8vICAgZGF0YU1hbmFnZXIuaGVyb1R5cGUgPSBoZXJvLnR5cGU7XG4gIC8vIH1cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLnN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT5cbiAgICAgIHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnTWFpblNjcmVlbicpKTtcbiAgICB0aGlzLmludml0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+XG4gICAgICBzZXJ2ZXJNYW5hZ2VyLmludml0ZSgpKTtcblxuICAgIHRoaXMub25LZXlEb3duID0gZSA9PiB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAzMikge1xuICAgICAgICBzY3JlZW5zTWFuYWdlci5jaGFuZ2UoJ01haW5TY3JlZW4nKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlEb3duKTtcbiAgfVxuICBkZXN0cm95KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd24pO1xuICB9XG59XG4iXX0=
