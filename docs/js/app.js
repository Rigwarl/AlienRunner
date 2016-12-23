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

      window.addEventListener('keydown', this.onKeyDown);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvc3JjL2FwcC5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9CYWNrZ3JvdW5kLmpzIiwiYXBwL2pzL3NyYy9kaXNwbGF5L0J0bi5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9HdWkuanMiLCJhcHAvanMvc3JjL2Rpc3BsYXkvSGVyby5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9JY29uQnRuLmpzIiwiYXBwL2pzL3NyYy9kaXNwbGF5L1NoYWRvd092ZXJsYXkuanMiLCJhcHAvanMvc3JjL2Rpc3BsYXkvU3Bpa2UuanMiLCJhcHAvanMvc3JjL21hbmFnZXJzL2Fzc2V0c01hbmFnZXIuanMiLCJhcHAvanMvc3JjL21hbmFnZXJzL2RhdGFNYW5hZ2VyLmpzIiwiYXBwL2pzL3NyYy9tYW5hZ2Vycy9zY3JlZW5zTWFuYWdlci5qcyIsImFwcC9qcy9zcmMvbWFuYWdlcnMvc2VydmVyTWFuYWdlci5qcyIsImFwcC9qcy9zcmMvbWFuYWdlcnMvc291bmRNYW5hZ2VyLmpzIiwiYXBwL2pzL3NyYy9zY3JlZW5zL0VuZFNjcmVlbi5qcyIsImFwcC9qcy9zcmMvc2NyZWVucy9NYWluU2NyZWVuLmpzIiwiYXBwL2pzL3NyYy9zY3JlZW5zL1JhdGluZ1NjcmVlbi5qcyIsImFwcC9qcy9zcmMvc2NyZWVucy9TdGFydFNjcmVlbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsUUFBUSxHQUFSLENBQVksQ0FDVix3QkFBYyxJQUFkLEVBRFUsRUFFVix3QkFBYyxJQUFkLEVBRlUsQ0FBWixFQUlHLElBSkgsQ0FJUTtBQUFBLFNBQU0sUUFBUSxHQUFSLENBQVksQ0FDdEIsd0JBQWMsT0FBZCxHQUF3QixJQUF4QixDQUE2QjtBQUFBLFdBQVEsc0JBQVksR0FBWixDQUFnQixNQUFoQixFQUF3QjtBQUMzRCxV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O0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7aUNBQ2E7QUFDWCxXQUFLLFFBQUwsQ0FBYyxnQkFBZCxDQUErQixPQUEvQixFQUF3QztBQUFBLGVBQ3RDLHlCQUFlLE1BQWYsQ0FBc0IsWUFBdEIsQ0FEc0M7QUFBQSxPQUF4QztBQUVBLFdBQUssU0FBTCxDQUFlLGdCQUFmLENBQWdDLE9BQWhDLEVBQXlDO0FBQUEsZUFDdkMsd0JBQWMsTUFBZCxFQUR1QztBQUFBLE9BQXpDOztBQUdBLFdBQUssU0FBTCxHQUFpQixhQUFLO0FBQ3BCLFlBQUksRUFBRSxPQUFGLEtBQWMsRUFBbEIsRUFBc0I7QUFDcEIsbUNBQWUsTUFBZixDQUFzQixZQUF0QjtBQUNBLFlBQUUsY0FBRjtBQUNEO0FBQ0YsT0FMRDs7QUFPQSxhQUFPLGdCQUFQLENBQXdCLFNBQXhCLEVBQW1DLEtBQUssU0FBeEM7QUFDRDs7OzhCQUNTO0FBQ1IsYUFBTyxtQkFBUCxDQUEyQixTQUEzQixFQUFzQyxLQUFLLFNBQTNDO0FBQ0Q7Ozs7RUEzRnNDLFNBQVMsUzs7a0JBQTdCLFciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHNjcmVlbnNNYW5hZ2VyIGZyb20gJy4vbWFuYWdlcnMvc2NyZWVuc01hbmFnZXInO1xuaW1wb3J0IGFzc2V0c01hbmFnZXIgZnJvbSAnLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcbmltcG9ydCBzZXJ2ZXJNYW5hZ2VyIGZyb20gJy4vbWFuYWdlcnMvc2VydmVyTWFuYWdlcic7XG5pbXBvcnQgc291bmRNYW5hZ2VyIGZyb20gJy4vbWFuYWdlcnMvc291bmRNYW5hZ2VyJztcbmltcG9ydCBkYXRhTWFuYWdlciBmcm9tICcuL21hbmFnZXJzL2RhdGFNYW5hZ2VyJztcblxuUHJvbWlzZS5hbGwoW1xuICBhc3NldHNNYW5hZ2VyLmluaXQoKSxcbiAgc2VydmVyTWFuYWdlci5pbml0KCksXG5dKVxuICAudGhlbigoKSA9PiBQcm9taXNlLmFsbChbXG4gICAgc2VydmVyTWFuYWdlci5nZXRVc2VyKCkudGhlbih1c2VyID0+IGRhdGFNYW5hZ2VyLnNldCgndXNlcicsIHtcbiAgICAgIGlkOiB1c2VyLmlkLFxuICAgICAgbmFtZTogYCR7dXNlci5maXJzdF9uYW1lfSAke3VzZXIubGFzdF9uYW1lfWAsXG4gICAgICBzZXg6IHVzZXIuc2V4LFxuICAgIH0pKSxcbiAgICBzZXJ2ZXJNYW5hZ2VyLmdldCgnbWF4U2NvcmUnKS50aGVuKHIgPT4gZGF0YU1hbmFnZXIuc2V0KCdtYXhTY29yZScsICtyKSksXG4gICAgc2VydmVyTWFuYWdlci5nZXQoJ3NvdW5kJykudGhlbihyID0+IHNvdW5kTWFuYWdlci5pbml0KHIgPT09ICcnID8gdHJ1ZSA6ICEhcikpLFxuICBdKSlcbiAgLnRoZW4oKCkgPT4gc2NyZWVuc01hbmFnZXIuY2hhbmdlKCdTdGFydFNjcmVlbicpKVxuICAuY2F0Y2goZSA9PiBjb25zb2xlLmVycm9yKCdpbml0IGVycm9yLCByZWxvYWQgcGFnZScsIGUpKTtcblxuY29uc3Qgc3RhZ2UgPSBuZXcgY3JlYXRlanMuU3RhZ2UoJ2dhbWUtc3RhZ2UnKTtcbnNjcmVlbnNNYW5hZ2VyLmluaXQoc3RhZ2UpO1xuXG5pZiAoY3JlYXRlanMuVG91Y2guaXNTdXBwb3J0ZWQoKSkge1xuICBjcmVhdGVqcy5Ub3VjaC5lbmFibGUoc3RhZ2UsIHRydWUpO1xufSBlbHNlIHtcbiAgc3RhZ2UuZW5hYmxlTW91c2VPdmVyKDIwKTtcbn1cblxuaWYgKHdpbmRvdyAhPT0gd2luZG93LnBhcmVudCkge1xuICAvLyBjcmVhdGVqcyBzdGFnZSBjbGljayBkb3NudCB0cmlnZ2VyIHdpbmRvdy5mb2N1c1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB3aW5kb3cuZm9jdXMoKSk7XG59XG4iLCJpbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFja2dyb3VuZCBleHRlbmRzIGNyZWF0ZWpzLlNoYXBlIHtcbiAgY29uc3RydWN0b3IobmFtZSwgY2FudmFzV2lkdGgpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5pbWcgPSBhc3NldHNNYW5hZ2VyLmdldFJlc3VsdChuYW1lKTtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuaW1nLndpZHRoICsgY2FudmFzV2lkdGg7XG5cbiAgICB0aGlzLmdyYXBoaWNzLmJlZ2luQml0bWFwRmlsbCh0aGlzLmltZywgJ3JlcGVhdC14JykuZHJhd1JlY3QoMCwgMCwgd2lkdGgsIHRoaXMuaW1nLmhlaWdodCk7XG4gICAgdGhpcy5yZWdZID0gdGhpcy5pbWcuaGVpZ2h0O1xuICAgIHRoaXMuY2FjaGUoMCwgMCwgd2lkdGgsIHRoaXMuaW1nLmhlaWdodCk7XG4gIH1cbiAgbW92ZShwYXRoKSB7XG4gICAgdGhpcy54IC09IHBhdGg7XG4gICAgdGhpcy54ICU9IHRoaXMuaW1nLndpZHRoO1xuICB9XG59XG4iLCJpbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcbmltcG9ydCBzb3VuZE1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc291bmRNYW5hZ2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnRuIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3IobGFiZWwsIGNvbG9yID0gJ2dyZWVuJywgdHlwZSA9ICdidG4nKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcblxuICAgIHRoaXMuY3JlYXRlQmcodHlwZSk7XG4gICAgdGhpcy5jcmVhdGVMYWJlbChsYWJlbCk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gc291bmRNYW5hZ2VyLnBsYXkoJ2ZsYXAnKSk7XG4gIH1cbiAgY3JlYXRlQmcodHlwZSkge1xuICAgIHRoaXMuYmcgPSBuZXcgY3JlYXRlanMuU3ByaXRlKGFzc2V0c01hbmFnZXIuZ2V0U3ByaXRlU2hlZXQodHlwZSkpO1xuICAgIHRoaXMuYmcucmVnWCA9IHRoaXMuYmcuZ2V0Qm91bmRzKCkud2lkdGggLyAyO1xuICAgIHRoaXMuYmcucmVnWSA9IHRoaXMuYmcuZ2V0Qm91bmRzKCkuaGVpZ2h0IC8gMjtcbiAgICB0aGlzLmhlbHBlciA9IG5ldyBjcmVhdGVqcy5CdXR0b25IZWxwZXIodGhpcy5iZywgYCR7dGhpcy5jb2xvcn1PdXRgLCBgJHt0aGlzLmNvbG9yfU92ZXJgLCBgJHt0aGlzLmNvbG9yfURvd25gKTtcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuYmcpO1xuICB9XG4gIGNyZWF0ZUxhYmVsKGxhYmVsKSB7XG4gICAgdGhpcy5sYWJlbCA9IG5ldyBjcmVhdGVqcy5UZXh0KGxhYmVsLCAnMzBweCBHdWVyaWxsYScsICcjZmZmJyk7XG4gICAgdGhpcy5sYWJlbC5zaGFkb3cgPSBuZXcgY3JlYXRlanMuU2hhZG93KCcjMDAwJywgMCwgMSwgNSk7XG4gICAgdGhpcy5sYWJlbC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICB0aGlzLmxhYmVsLnRleHRCYXNlbGluZSA9ICdtaWRkbGUnO1xuICAgIHRoaXMubGFiZWwubW91c2VFbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy5sYWJlbC55ID0gLTM7XG5cbiAgICAvLyB0b2RvIGNhY2hlXG4gICAgLy8gbm93IGl0IGNhY2hlIGJlZm9yZSBmb250IGxvYWQgKFxuICAgIC8vIGNvbnN0IGggPSB0aGlzLmxhYmVsLmdldE1lYXN1cmVkSGVpZ2h0KCkgKyA2OyAvLyBhZGQgNiBjb3Mgb2Ygc2hhZG93XG4gICAgLy8gY29uc3QgdyA9IHRoaXMubGFiZWwuZ2V0TWVhc3VyZWRXaWR0aCgpICsgNjtcbiAgICAvLyB0aGlzLmxhYmVsLmNhY2hlKC13IC8gMiwgLWggLyAyLCB3LCBoKTtcblxuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5sYWJlbCk7XG4gIH1cbiAgZGlzYWJsZSgpIHtcbiAgICB0aGlzLmJnLmdvdG9BbmRTdG9wKCdkaXNhYmxlJyk7XG4gICAgdGhpcy5tb3VzZUVuYWJsZWQgPSBmYWxzZTtcbiAgfVxuICBlbmFibGUoKSB7XG4gICAgdGhpcy5iZy5nb3RvQW5kU3RvcChgJHt0aGlzLmNvbG9yfU91dGApO1xuICAgIHRoaXMubW91c2VFbmFibGVkID0gdHJ1ZTtcbiAgfVxufVxuIiwiaW1wb3J0IHNjcmVlbk1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc2NyZWVuc01hbmFnZXInO1xuaW1wb3J0IHNvdW5kTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zb3VuZE1hbmFnZXInO1xuaW1wb3J0IHNlcnZlck1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc2VydmVyTWFuYWdlcic7XG5pbXBvcnQgSWNvbkJ0biBmcm9tICcuL0ljb25CdG4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHdWkgZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuICBjb25zdHJ1Y3Rvcih3aWR0aCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG5cbiAgICB0aGlzLm1lbnVCdG4gPSBuZXcgSWNvbkJ0bignbWVudScpO1xuICAgIHRoaXMubWVudUJ0bi54ID0gdGhpcy5tZW51QnRuLmdldEJvdW5kcygpLndpZHRoIC8gMiArIDIwO1xuICAgIHRoaXMubWVudUJ0bi55ID0gdGhpcy5tZW51QnRuLmdldEJvdW5kcygpLmhlaWdodCAvIDIgKyAyMDtcblxuICAgIHRoaXMucmF0aW5nQnRuID0gbmV3IEljb25CdG4oJ3JhdGluZycpO1xuICAgIHRoaXMucmF0aW5nQnRuLnggPSB0aGlzLnJhdGluZ0J0bi5nZXRCb3VuZHMoKS53aWR0aCAqIDMgLyAyICsgNDA7XG4gICAgdGhpcy5yYXRpbmdCdG4ueSA9IHRoaXMucmF0aW5nQnRuLmdldEJvdW5kcygpLmhlaWdodCAvIDIgKyAyMDtcblxuICAgIHRoaXMuc291bmRCdG4gPSBuZXcgSWNvbkJ0bihzb3VuZE1hbmFnZXIuaXNFbmFibGVkKCkgPyAnc291bmQnIDogJ3NvdW5kT2ZmJyk7XG4gICAgdGhpcy5zb3VuZEJ0bi54ID0gdGhpcy53aWR0aCAtIHRoaXMuc291bmRCdG4uZ2V0Qm91bmRzKCkud2lkdGggLyAyIC0gMjA7XG4gICAgdGhpcy5zb3VuZEJ0bi55ID0gdGhpcy5zb3VuZEJ0bi5nZXRCb3VuZHMoKS5oZWlnaHQgLyAyICsgMjA7XG5cbiAgICAvLyB0b2RvOiBmaXggc3ByaXRlc2hlZXQgbGF0ZXJcbiAgICB0aGlzLnJhdGluZ0J0bi5sYWJlbC54ID0gdGhpcy5zb3VuZEJ0bi5sYWJlbC54ID0gMTtcblxuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5tZW51QnRuLCB0aGlzLnJhdGluZ0J0biwgdGhpcy5zb3VuZEJ0bik7XG5cbiAgICB0aGlzLnNvdW5kQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgc291bmRNYW5hZ2VyLnRvZ2dsZSgpO1xuICAgICAgdGhpcy5zb3VuZEJ0bi5jaGFuZ2VMYWJlbChzb3VuZE1hbmFnZXIuaXNFbmFibGVkKCkgPyAnc291bmQnIDogJ3NvdW5kT2ZmJyk7XG4gICAgICBzZXJ2ZXJNYW5hZ2VyLnNldCgnc291bmQnLCBzb3VuZE1hbmFnZXIuaXNFbmFibGVkKCkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5tZW51QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gc2NyZWVuTWFuYWdlci5jaGFuZ2UoJ1N0YXJ0U2NyZWVuJykpO1xuICAgIHRoaXMucmF0aW5nQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gc2NyZWVuTWFuYWdlci5jaGFuZ2UoJ1JhdGluZ1NjcmVlbicpKTtcbiAgfVxufVxuIiwiaW1wb3J0IGFzc2V0c01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvYXNzZXRzTWFuYWdlcic7XG5pbXBvcnQgc291bmRNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NvdW5kTWFuYWdlcic7XG5cbmNvbnN0IENPTkZJRyA9IHtcbiAgRzogNTUwLFxuICBBOiAzNzUsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZXJvIGV4dGVuZHMgY3JlYXRlanMuU3ByaXRlIHtcbiAgY29uc3RydWN0b3IodHlwZSkge1xuICAgIHN1cGVyKGFzc2V0c01hbmFnZXIuZ2V0U3ByaXRlU2hlZXQodHlwZSkpO1xuXG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCk7XG4gICAgdGhpcy5yZWdYID0gdGhpcy5ib3VuZHMud2lkdGggLyAyO1xuICAgIHRoaXMucmVnWSA9IHRoaXMuYm91bmRzLmhlaWdodCAvIDI7XG5cbiAgICB0aGlzLmRlYWQgPSBmYWxzZTtcbiAgICB0aGlzLnZZID0gMDtcbiAgfVxuICBmbGFwKCkge1xuICAgIGlmICh0aGlzLmRlYWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy52WSA9IE1hdGgubWF4KHRoaXMudlkgLSBDT05GSUcuQSwgLUNPTkZJRy5BKTtcbiAgICB0aGlzLmdvdG9BbmRQbGF5KCdmbGFwJyk7XG4gICAgc291bmRNYW5hZ2VyLnBsYXkoJ2ZsYXAnKTtcbiAgfVxuICBtb3ZlKHRpbWUpIHtcbiAgICB0aGlzLnkgKz0gKChDT05GSUcuRyAqIHRpbWUgKiAwLjUpICsgdGhpcy52WSkgKiB0aW1lO1xuICAgIHRoaXMudlkgKz0gQ09ORklHLkcgKiB0aW1lO1xuICB9XG4gIGRpZSgpIHtcbiAgICBpZiAodGhpcy5kZWFkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZGVhZCA9IHRydWU7XG4gICAgdGhpcy5yb3RhdGlvbiA9IDMwO1xuICAgIHRoaXMuZ290b0FuZFN0b3AoJ2RlYWQnKTtcbiAgICBzb3VuZE1hbmFnZXIucGxheSgnbG9vc2UnKTtcbiAgfVxufVxuIiwiaW1wb3J0IGFzc2V0c01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvYXNzZXRzTWFuYWdlcic7XG5pbXBvcnQgQnRuIGZyb20gJy4vQnRuJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSWNvbkJ0biBleHRlbmRzIEJ0biB7XG4gIGNvbnN0cnVjdG9yKGxhYmVsLCBjb2xvciA9ICdvcmFuZ2UnKSB7XG4gICAgc3VwZXIobGFiZWwsIGNvbG9yLCAnaWNvbkJ0bicpO1xuICB9XG4gIGNyZWF0ZUxhYmVsKGxhYmVsKSB7XG4gICAgdGhpcy5sYWJlbCA9IG5ldyBjcmVhdGVqcy5TcHJpdGUoYXNzZXRzTWFuYWdlci5nZXRTcHJpdGVTaGVldCgnaWNvbicpLCBsYWJlbCk7XG4gICAgdGhpcy5sYWJlbC5yZWdYID0gdGhpcy5sYWJlbC5nZXRCb3VuZHMoKS53aWR0aCAvIDI7XG4gICAgdGhpcy5sYWJlbC5yZWdZID0gdGhpcy5sYWJlbC5nZXRCb3VuZHMoKS5oZWlnaHQgLyAyO1xuICAgIHRoaXMubGFiZWwubW91c2VFbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmxhYmVsKTtcbiAgfVxuICBjaGFuZ2VMYWJlbChsYWJlbCkge1xuICAgIHRoaXMubGFiZWwuZ290b0FuZFN0b3AobGFiZWwpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTaGFkb3dPdmVybGF5IGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnNoYWRvdyA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICAgIHRoaXMuc2hhZG93LmdyYXBoaWNzLmJlZ2luRmlsbCgncmdiYSgwLCAwLCAwLCAwLjYpJykuZHJhd1JlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICB0aGlzLnNoYWRvd1RleHQgPSBuZXcgY3JlYXRlanMuVGV4dCgnJywgJzI1cHggR3VlcmlsbGEnLCAnI2ZmZicpO1xuICAgIHRoaXMuc2hhZG93VGV4dC55ID0gaGVpZ2h0IC8gMjtcbiAgICB0aGlzLnNoYWRvd1RleHQueCA9IHdpZHRoIC8gMjtcbiAgICB0aGlzLnNoYWRvd1RleHQudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgdGhpcy5zaGFkb3dUZXh0LnRleHRCYXNlbGluZSA9ICdtaWRkbGUnO1xuXG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLnNoYWRvdywgdGhpcy5zaGFkb3dUZXh0KTtcbiAgICAvLyB0b2RvXG4gICAgLy8gdGhpcy5jYWNoZSgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgfVxuICBzZXRUZXh0KHRleHQpIHtcbiAgICB0aGlzLnNoYWRvd1RleHQudGV4dCA9IHRleHQ7XG4gICAgLy8gdGhpcy51cGRhdGVDYWNoZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3Bpa2UgZXh0ZW5kcyBjcmVhdGVqcy5CaXRtYXAge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihhc3NldHNNYW5hZ2VyLmdldFJlc3VsdCgnc3Bpa2UnKSk7XG5cbiAgICB0aGlzLmJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCk7XG4gICAgdGhpcy5yZWdYID0gdGhpcy5ib3VuZHMud2lkdGggLyAyO1xuICAgIHRoaXMucmVnWSA9IHRoaXMuYm91bmRzLmhlaWdodDtcbiAgfVxuICByZXNldCgpIHtcbiAgICB0aGlzLnNjYWxlWSA9IDAuNyArIChNYXRoLnJhbmRvbSgpICogMC41KTtcbiAgfVxufVxuIiwiY29uc3QgbWFuaWZlc3QgPSBbXG4gIHsgaWQ6ICdtb25zdGVyJywgc3JjOiAnaW1nL21vbnN0ZXItc3ByaXRlLnBuZycgfSxcbiAgLy8geyBpZDogJ2JpcmQnLCBzcmM6ICdpbWcvYmlyZC1zcHJpdGUucG5nJyB9LFxuICAvLyB7IGlkOiAnY2hpY2tlbicsIHNyYzogJ2ltZy9jaGlja2VuLXNwcml0ZS5wbmcnIH0sXG4gIHsgaWQ6ICdzcGlrZScsIHNyYzogJ2ltZy9zcGlrZS5wbmcnIH0sXG4gIHsgaWQ6ICdza3knLCBzcmM6ICdpbWcvYmcvc2t5LnBuZycgfSxcbiAgeyBpZDogJ3N0YXJ0Jywgc3JjOiAnaW1nL2JnL3N0YXJ0LnBuZycgfSxcbiAgeyBpZDogJ21vdW50YWluJywgc3JjOiAnaW1nL2JnL21vdW50YWluLnBuZycgfSxcbiAgeyBpZDogJ2dyb3VuZCcsIHNyYzogJ2ltZy9iZy9ncm91bmQucG5nJyB9LFxuICB7IGlkOiAnYnRuJywgc3JjOiAnaW1nL2J0bi1zcHJpdGUucG5nJyB9LFxuICB7IGlkOiAnaWNvbi1idG4nLCBzcmM6ICdpbWcvaWNvbi1idG4tc3ByaXRlLnBuZycgfSxcbiAgeyBpZDogJ2ljb24nLCBzcmM6ICdpbWcvaWNvbi1zcHJpdGUucG5nJyB9LFxuICB7IGlkOiAnYmFjaycsIHNyYzogJ3NvdW5kL2JhY2tncm91bmQub2dnJyB9LFxuICB7IGlkOiAnZmxhcCcsIHNyYzogJ3NvdW5kL2ZsYXAub2dnJyB9LFxuICB7IGlkOiAnbG9vc2UnLCBzcmM6ICdzb3VuZC9sb29zZS5vZ2cnIH0sXG5dO1xuXG5jb25zdCBnZXRIZXJvU3ByaXRlU2hlZXREYXRhID0gbmFtZSA9PiAoe1xuICBpbWFnZXM6IFtuYW1lXSxcbiAgZnJhbWVzOiB7IHdpZHRoOiAxMDAsIGhlaWdodDogNzggfSxcbiAgYW5pbWF0aW9uczoge1xuICAgIGZseTogMCxcbiAgICBmbGFwOiBbMSwgMywgJ2ZseSddLFxuICAgIGRlYWQ6IDQsXG4gIH0sXG59KTtcblxuY29uc3Qgc3ByaXRlU2hlZXRzRGF0YSA9IHtcbiAgYmlyZDogZ2V0SGVyb1Nwcml0ZVNoZWV0RGF0YSgnYmlyZCcpLFxuICBtb25zdGVyOiBnZXRIZXJvU3ByaXRlU2hlZXREYXRhKCdtb25zdGVyJyksXG4gIGNoaWNrZW46IGdldEhlcm9TcHJpdGVTaGVldERhdGEoJ2NoaWNrZW4nKSxcbiAgYnRuOiB7XG4gICAgaW1hZ2VzOiBbJ2J0biddLFxuICAgIGZyYW1lczogeyB3aWR0aDogMjEwLCBoZWlnaHQ6IDY5LCBzcGFjaW5nOiAyIH0sXG4gICAgYW5pbWF0aW9uczoge1xuICAgICAgZ3JlZW5PdXQ6IDAsXG4gICAgICBncmVlbk92ZXI6IDIsXG4gICAgICBncmVlbkRvd246IDQsXG4gICAgICBvcmFuZ2VPdXQ6IDYsXG4gICAgICBvcmFuZ2VPdmVyOiA4LFxuICAgICAgb3JhbmdlRG93bjogMSxcbiAgICAgIHJlZE91dDogMyxcbiAgICAgIHJlZE92ZXI6IDUsXG4gICAgICByZWREb3duOiA3LFxuICAgICAgZGlzYWJsZTogOSxcbiAgICB9LFxuICB9LFxuICBpY29uQnRuOiB7XG4gICAgaW1hZ2VzOiBbJ2ljb24tYnRuJ10sXG4gICAgZnJhbWVzOiB7IHdpZHRoOiA2OSwgaGVpZ2h0OiA3MSwgc3BhY2luZzogMiB9LFxuICAgIGFuaW1hdGlvbnM6IHtcbiAgICAgIGdyZWVuT3V0OiAwLFxuICAgICAgZ3JlZW5PdmVyOiAxLFxuICAgICAgZ3JlZW5Eb3duOiAyLFxuICAgICAgb3JhbmdlT3V0OiAzLFxuICAgICAgb3JhbmdlT3ZlcjogNCxcbiAgICAgIG9yYW5nZURvd246IDUsXG4gICAgICByZWRPdXQ6IDgsXG4gICAgICByZWRPdmVyOiA3LFxuICAgICAgcmVkRG93bjogNixcbiAgICAgIGRpc2FibGU6IDksXG4gICAgfSxcbiAgfSxcbiAgaWNvbjoge1xuICAgIGltYWdlczogWydpY29uJ10sXG4gICAgZnJhbWVzOiB7IHdpZHRoOiA0MCwgaGVpZ2h0OiA0MCB9LFxuICAgIGFuaW1hdGlvbnM6IHtcbiAgICAgIHNvdW5kOiAwLFxuICAgICAgc291bmRPZmY6IDEsXG4gICAgICByYXRpbmc6IDIsXG4gICAgICBtZW51OiAzLFxuICAgIH0sXG4gIH0sXG59O1xuXG5jb25zdCBzcHJpdGVTaGVldHMgPSB7fTtcblxuY29uc3QgYXNzZXRzTWFuYWdlciA9IHtcbiAgaW5pdCgpIHtcbiAgICBjcmVhdGVqcy5Tb3VuZC5hbHRlcm5hdGVFeHRlbnNpb25zID0gWydtcDMnXTtcbiAgICB0aGlzLnF1ZXVlID0gbmV3IGNyZWF0ZWpzLkxvYWRRdWV1ZSgpO1xuICAgIHRoaXMucXVldWUuaW5zdGFsbFBsdWdpbihjcmVhdGVqcy5Tb3VuZCk7XG4gICAgdGhpcy5xdWV1ZS5sb2FkTWFuaWZlc3QobWFuaWZlc3QpO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMucXVldWUuYWRkRXZlbnRMaXN0ZW5lcignY29tcGxldGUnLCAoKSA9PiByZXNvbHZlKCkpO1xuICAgICAgdGhpcy5xdWV1ZS5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsICgpID0+IHJlamVjdCgpKTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0UmVzdWx0KG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5xdWV1ZS5nZXRSZXN1bHQobmFtZSk7XG4gIH0sXG4gIGdldFNwcml0ZVNoZWV0KG5hbWUpIHtcbiAgICBpZiAoIXNwcml0ZVNoZWV0c1tuYW1lXSkge1xuICAgICAgY29uc3QgZGF0YSA9IHNwcml0ZVNoZWV0c0RhdGFbbmFtZV07XG5cbiAgICAgIGlmICghZGF0YSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgc3ByaXRlU2hlZXQgbmFtZScpO1xuICAgICAgfVxuXG4gICAgICBkYXRhLmltYWdlcyA9IGRhdGEuaW1hZ2VzLm1hcChpbWcgPT4gdGhpcy5nZXRSZXN1bHQoaW1nKSk7XG4gICAgICBzcHJpdGVTaGVldHNbbmFtZV0gPSBuZXcgY3JlYXRlanMuU3ByaXRlU2hlZXQoZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNwcml0ZVNoZWV0c1tuYW1lXTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFzc2V0c01hbmFnZXI7XG4iLCJjb25zdCBkYXRhTWFuYWdlciA9IHtcbiAgc2NvcmU6IDAsXG4gIG1heFNjb3JlOiBudWxsLFxuICBoZXJvVHlwZTogJ21vbnN0ZXInLFxuICB1c2VyOiB7XG4gICAgaWQ6IG51bGwsXG4gICAgbmFtZTogbnVsbCxcbiAgICBzZXg6IG51bGwsXG4gIH0sXG4gIHNldChrZXksIHZhbHVlKSB7XG4gICAgdGhpc1trZXldID0gdmFsdWU7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBkYXRhTWFuYWdlcjtcbiIsImltcG9ydCBTdGFydFNjcmVlbiBmcm9tICcuLi9zY3JlZW5zL1N0YXJ0U2NyZWVuJztcbmltcG9ydCBNYWluU2NyZWVuIGZyb20gJy4uL3NjcmVlbnMvTWFpblNjcmVlbic7XG5pbXBvcnQgRW5kU2NyZWVuIGZyb20gJy4uL3NjcmVlbnMvRW5kU2NyZWVuJztcbmltcG9ydCBSYXRpbmdTY3JlZW4gZnJvbSAnLi4vc2NyZWVucy9SYXRpbmdTY3JlZW4nO1xuXG5jb25zdCBzY3JlZW5NYW5hZ2VyID0ge1xuICBpbml0KHN0YWdlKSB7XG4gICAgdGhpcy5zdGFnZSA9IHN0YWdlO1xuICAgIHRoaXMuY3VycmVudFNjcmVlbiA9IG51bGw7XG4gICAgdGhpcy5zY3JlZW5zID0ge1xuICAgICAgU3RhcnRTY3JlZW4sXG4gICAgICBNYWluU2NyZWVuLFxuICAgICAgRW5kU2NyZWVuLFxuICAgICAgUmF0aW5nU2NyZWVuLFxuICAgIH07XG5cbiAgICBjcmVhdGVqcy5UaWNrZXIudGltaW5nTW9kZSA9IGNyZWF0ZWpzLlRpY2tlci5SQUY7XG4gICAgY3JlYXRlanMuVGlja2VyLmFkZEV2ZW50TGlzdGVuZXIoJ3RpY2snLCBlID0+IHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRTY3JlZW4gJiYgdGhpcy5jdXJyZW50U2NyZWVuLnRpY2spIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U2NyZWVuLnRpY2soZSk7XG4gICAgICB9XG4gICAgICB0aGlzLnN0YWdlLnVwZGF0ZShlKTtcbiAgICB9KTtcbiAgfSxcbiAgY2hhbmdlKG5hbWUpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50U2NyZWVuKSB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50U2NyZWVuLmRlc3Ryb3kpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U2NyZWVuLmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5jdXJyZW50U2NyZWVuKTtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50U2NyZWVuID0gbmV3IHRoaXMuc2NyZWVuc1tuYW1lXSh0aGlzLnN0YWdlLmNhbnZhcy53aWR0aCwgdGhpcy5zdGFnZS5jYW52YXMuaGVpZ2h0KTtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuY3VycmVudFNjcmVlbik7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBzY3JlZW5NYW5hZ2VyO1xuIiwiY29uc3Qgc2VydmVyTWFuYWdlciA9IHtcbiAgaW5pdCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gVksuaW5pdChcbiAgICAgICgpID0+IHJlc29sdmUoKSxcbiAgICAgIGUgPT4gcmVqZWN0KCd2ayBpbml0IGVycm9yJywgZSksXG4gICAgJzUuNjAnKSk7XG4gIH0sXG4gIGdldFVzZXIoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIFZLLmFwaSgndXNlcnMuZ2V0JywgeyBmaWVsZHM6ICdzZXgnIH0sIHIgPT4ge1xuICAgICAgICBpZiAoci5lcnJvcikge1xuICAgICAgICAgIHJlamVjdChyLmVycm9yKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZShyLnJlc3BvbnNlWzBdKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXQoa2V5LCBnbG9iYWwgPSAwKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gVksuYXBpKCdzdG9yYWdlLmdldCcsIHsga2V5LCBnbG9iYWwgfSwgcmVzb2x2ZSkpXG4gICAgICAudGhlbihyID0+IHtcbiAgICAgICAgaWYgKHIuZXJyb3IpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Ioci5lcnJvcik7XG4gICAgICAgIH0gZWxzZSBpZiAoci5yZXNwb25zZSA9PT0gJycpIHtcbiAgICAgICAgICAvLyBjYW50IEpTT04ucGFyc2UgZW1wdHkgc3RyaW5nIGJ1dCBuZWVkIHRvIGdldCBkZWZhdWx0IHZhbHVlXG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHIucmVzcG9uc2UpO1xuICAgICAgfSk7XG4gIH0sXG4gIHNldChrZXksIHZhbHVlLCBnbG9iYWwgPSAwKSB7XG4gICAgVksuYXBpKCdzdG9yYWdlLnNldCcsIHsga2V5LCB2YWx1ZTogSlNPTi5zdHJpbmdpZnkodmFsdWUpLCBnbG9iYWwgfSk7XG4gIH0sXG4gIHNoYXJlKHNjb3JlLCBzZXggPSAyKSB7XG4gICAgVksuYXBpKCd3YWxsLnBvc3QnLCB7XG4gICAgICBtZXNzYWdlOiBg0K8g0L/RgNC+0LvQtdGC0LXQuyR7c2V4ICE9PSAyID8gJ9CwJyA6ICcnfSAke3Njb3JlfSDQvCDQsiDQuNCz0YDQtSBGbGFwcHkgTW9uc3RlciFcbiAgICAgICAgICAgICAgICBBINGB0LrQvtC70YzQutC+INGB0LzQvtC20LXRiNGMINGC0Ys/YCxcbiAgICAgIGF0dGFjaG1lbnRzOiAncGhvdG8tMTM1NTYzMzg4XzQ1NjIzOTAxNywgaHR0cHM6Ly92ay5jb20vYXBwNTc4MjExOCcsXG4gICAgICBzZXJ2aWNlczogJ3R3aXR0ZXInLFxuICAgIH0pO1xuICB9LFxuICBpbnZpdGUoKSB7XG4gICAgVksuY2FsbE1ldGhvZCgnc2hvd0ludml0ZUJveCcpO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgc2VydmVyTWFuYWdlcjtcbiIsImNvbnN0IHNvdW5kTWFuYWdlciA9IHtcbiAgaW5pdChlbmFibGUpIHtcbiAgICB0aGlzLmVuYWJsZWQgPSBlbmFibGU7XG4gICAgdGhpcy5iZyA9IGNyZWF0ZWpzLlNvdW5kLnBsYXkoJ2JhY2snLCB7IGxvb3A6IC0xLCB2b2x1bWU6IDAuMyB9KTtcbiAgICB0aGlzLmJnLnBhdXNlZCA9ICF0aGlzLmVuYWJsZWQ7XG4gICAgLy8gc29tZXRpbWVzIG5lZ2F0aXZlIHZhbHVlIG9jY3VycyBhbmQgdGhyb3cgZXJyb3JcbiAgICB0aGlzLmJnLnBvc2l0aW9uID0gMDtcbiAgfSxcbiAgdG9nZ2xlKCkge1xuICAgIHRoaXMuZW5hYmxlZCA9ICF0aGlzLmVuYWJsZWQ7XG4gICAgdGhpcy5iZy5wYXVzZWQgPSAhdGhpcy5lbmFibGVkO1xuICB9LFxuICBpc0VuYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZW5hYmxlZDtcbiAgfSxcbiAgcGxheShzb3VuZCkge1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgIGNyZWF0ZWpzLlNvdW5kLnBsYXkoc291bmQpO1xuICAgIH1cbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNvdW5kTWFuYWdlcjtcbiIsImltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuaW1wb3J0IHNjcmVlbnNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NjcmVlbnNNYW5hZ2VyJztcbmltcG9ydCBzZXJ2ZXJNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NlcnZlck1hbmFnZXInO1xuaW1wb3J0IGRhdGFNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2RhdGFNYW5hZ2VyJztcbmltcG9ydCBHdWkgZnJvbSAnLi4vZGlzcGxheS9HdWknO1xuaW1wb3J0IEJ0biBmcm9tICcuLi9kaXNwbGF5L0J0bic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVuZFNjcmVlbiBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuYmcgPSBuZXcgY3JlYXRlanMuQml0bWFwKGFzc2V0c01hbmFnZXIuZ2V0UmVzdWx0KCdzdGFydCcpKTtcbiAgICB0aGlzLmd1aSA9IG5ldyBHdWkod2lkdGgpO1xuXG4gICAgdGhpcy5zY29yZSA9IG5ldyBjcmVhdGVqcy5UZXh0KGDQoNC10LfRg9C70YzRgtCw0YI6ICR7ZGF0YU1hbmFnZXIuc2NvcmV9INC8XFxuXFxu0KDQtdC60L7RgNC0OiAke2RhdGFNYW5hZ2VyLm1heFNjb3JlfSDQvGAsICc0MHB4IEd1ZXJpbGxhJywgJyMwMDAnKTtcbiAgICB0aGlzLnNjb3JlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRoaXMuc2NvcmUueCA9IHdpZHRoIC8gMjtcbiAgICB0aGlzLnNjb3JlLnkgPSAxMjU7XG5cbiAgICB0aGlzLnJlcGxheUJ0biA9IG5ldyBCdG4oJ9CV0YnQtSDRgNCw0LcnKTtcbiAgICB0aGlzLnJlcGxheUJ0bi54ID0gd2lkdGggLyAyO1xuICAgIHRoaXMucmVwbGF5QnRuLnkgPSAzNTA7XG5cbiAgICB0aGlzLnNoYXJlQnRuID0gbmV3IEJ0bign0J/QvtC00LXQu9C40YLRjNGB0Y8nLCAnb3JhbmdlJyk7XG4gICAgdGhpcy5zaGFyZUJ0bi54ID0gd2lkdGggLyAyO1xuICAgIHRoaXMuc2hhcmVCdG4ueSA9IDQ1MDtcbiAgICB0aGlzLnNoYXJlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gc2VydmVyTWFuYWdlci5zaGFyZShkYXRhTWFuYWdlci5zY29yZSwgZGF0YU1hbmFnZXIudXNlci5zZXgpKTtcblxuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5iZywgdGhpcy5ndWksIHRoaXMuc2NvcmUsIHRoaXMucmVwbGF5QnRuLCB0aGlzLnNoYXJlQnRuKTtcblxuXG4gICAgaWYgKGRhdGFNYW5hZ2VyLnNjb3JlID4gZGF0YU1hbmFnZXIubWF4U2NvcmUpIHtcbiAgICAgIGRhdGFNYW5hZ2VyLm1heFNjb3JlID0gZGF0YU1hbmFnZXIuc2NvcmU7XG4gICAgICBzZXJ2ZXJNYW5hZ2VyLnNldCgnbWF4U2NvcmUnLCBkYXRhTWFuYWdlci5tYXhTY29yZSk7XG4gICAgICB0aGlzLnNjb3JlLnRleHQgPSBg0J3QvtCy0YvQuSDRgNC10LrQvtGA0LQ6ICR7ZGF0YU1hbmFnZXIubWF4U2NvcmV9INC8IWA7XG4gICAgICB0aGlzLnNjb3JlLnkgKz0gMzU7XG5cbiAgICAgIHNlcnZlck1hbmFnZXIuZ2V0KCdyYXRpbmdUYWJsZScsIDEpLnRoZW4ocmVjYWxjUmF0aW5nVGFibGUpO1xuICAgIH1cblxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICB9XG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy5yZXBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzY3JlZW5zTWFuYWdlci5jaGFuZ2UoJ01haW5TY3JlZW4nKSk7XG5cbiAgICB0aGlzLm9uS2V5RG93biA9IGUgPT4ge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMzIpIHtcbiAgICAgICAgc2NyZWVuc01hbmFnZXIuY2hhbmdlKCdNYWluU2NyZWVuJyk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bik7XG4gIH1cbiAgZGVzdHJveSgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlEb3duKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZWNhbGNSYXRpbmdUYWJsZShyYXRpbmdUYWJsZSkge1xuICBpZiAocmF0aW5nVGFibGVbcmF0aW5nVGFibGUubGVuZ3RoIC0gMV0uc2NvcmUgPj0gZGF0YU1hbmFnZXIubWF4U2NvcmUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCB1c2VyUmF0aW5nID0gcmF0aW5nVGFibGUuZmluZChlbCA9PiBlbC5pZCA9PT0gZGF0YU1hbmFnZXIudXNlci5pZCk7XG5cbiAgaWYgKHVzZXJSYXRpbmcpIHtcbiAgICB1c2VyUmF0aW5nLnNjb3JlID0gZGF0YU1hbmFnZXIubWF4U2NvcmU7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgbmV3UmF0aW5nID0ge1xuICAgICAgaWQ6IGRhdGFNYW5hZ2VyLnVzZXIuaWQsXG4gICAgICBuYW1lOiBkYXRhTWFuYWdlci51c2VyLm5hbWUsXG4gICAgICBzY29yZTogZGF0YU1hbmFnZXIubWF4U2NvcmUsXG4gICAgfTtcbiAgICBpZiAocmF0aW5nVGFibGUubGVuZ3RoIDwgMTApIHtcbiAgICAgIHJhdGluZ1RhYmxlLnB1c2gobmV3UmF0aW5nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmF0aW5nVGFibGVbcmF0aW5nVGFibGUubGVuZ3RoIC0gMV0gPSBuZXdSYXRpbmc7XG4gICAgfVxuICB9XG5cbiAgcmF0aW5nVGFibGUuc29ydCgoYSwgYikgPT4gYi5zY29yZSAtIGEuc2NvcmUpO1xuICBzZXJ2ZXJNYW5hZ2VyLnNldCgncmF0aW5nVGFibGUnLCByYXRpbmdUYWJsZSwgMSk7XG59XG4iLCJpbXBvcnQgc2NyZWVuc01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc2NyZWVuc01hbmFnZXInO1xuaW1wb3J0IGRhdGFNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2RhdGFNYW5hZ2VyJztcbmltcG9ydCBCYWNrZ3JvdW5kIGZyb20gJy4uL2Rpc3BsYXkvQmFja2dyb3VuZCc7XG5pbXBvcnQgSGVybyBmcm9tICcuLi9kaXNwbGF5L0hlcm8nO1xuaW1wb3J0IFNwaWtlIGZyb20gJy4uL2Rpc3BsYXkvU3Bpa2UnO1xuaW1wb3J0IFNoYWRvd092ZXJsYXkgZnJvbSAnLi4vZGlzcGxheS9TaGFkb3dPdmVybGF5JztcblxuY29uc3QgR1JPVU5EX0hFSUdIVCA9IDgyO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluU2NyZWVuIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICB0aGlzLnNwZWVkID0gMjkwO1xuICAgIHRoaXMuZGlzdGFuY2UgPSAwO1xuICAgIHRoaXMuc2hhZG93T3ZlcmxheSA9IG5ldyBTaGFkb3dPdmVybGF5KHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcblxuICAgIHRoaXMuY3JlYXRlQmcoKTtcbiAgICB0aGlzLmNyZWF0ZVNwaWtlcygpO1xuICAgIHRoaXMuY3JlYXRlSGVybygpO1xuICAgIHRoaXMuY3JlYXRlSHVkKCk7XG5cbiAgICB0aGlzLnBhdXNlKCfQn9GA0L7QsdC10LsgLSDQstC30LzQsNGFINC60YDRi9C70YzRj9C80LgsIGVzYyAtINC/0LDRg9C30LAnKTtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgfVxuICBjcmVhdGVCZygpIHtcbiAgICB0aGlzLmJnU2t5ID0gbmV3IEJhY2tncm91bmQoJ3NreScsIHRoaXMud2lkdGgpO1xuICAgIHRoaXMuYmdNb3VudGFpbiA9IG5ldyBCYWNrZ3JvdW5kKCdtb3VudGFpbicsIHRoaXMud2lkdGgpO1xuICAgIHRoaXMuYmdHcm91bmQgPSBuZXcgQmFja2dyb3VuZCgnZ3JvdW5kJywgdGhpcy53aWR0aCk7XG4gICAgdGhpcy5iZ1NreS55ID0gdGhpcy5iZ01vdW50YWluLnkgPSB0aGlzLmJnR3JvdW5kLnkgPSB0aGlzLmhlaWdodDtcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuYmdTa3ksIHRoaXMuYmdNb3VudGFpbiwgdGhpcy5iZ0dyb3VuZCk7XG4gIH1cbiAgY3JlYXRlU3Bpa2VzKCkge1xuICAgIHRoaXMuc3Bpa2VzID0gW25ldyBTcGlrZSgpLCBuZXcgU3Bpa2UoKV07XG4gICAgdGhpcy5zcGlrZXNbMF0ueCA9IC10aGlzLnNwaWtlc1swXS5ib3VuZHMud2lkdGggLyAyO1xuICAgIHRoaXMuc3Bpa2VzWzFdLnggPSB0aGlzLndpZHRoIC8gMjtcbiAgICB0aGlzLnNwaWtlcy5mb3JFYWNoKHNwaWtlID0+IHRoaXMucmVzZXRTcGlrZShzcGlrZSkpO1xuICAgIHRoaXMuYWRkQ2hpbGQoLi4udGhpcy5zcGlrZXMpO1xuICB9XG4gIGNyZWF0ZUhlcm8oKSB7XG4gICAgdGhpcy5oZXJvID0gbmV3IEhlcm8oZGF0YU1hbmFnZXIuaGVyb1R5cGUpO1xuICAgIHRoaXMuaGVyby54ID0gdGhpcy53aWR0aCAvIDI7XG4gICAgdGhpcy5oZXJvLnkgPSAxOTA7XG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmhlcm8pO1xuICB9XG4gIGNyZWF0ZUh1ZCgpIHtcbiAgICB0aGlzLmh1ZERpc3RhbmNlID0gbmV3IGNyZWF0ZWpzLlRleHQoJzAg0LwnLCAnMjVweCBHdWVyaWxsYScsICcjMDAwJyk7XG4gICAgdGhpcy5odWREaXN0YW5jZS54ID0gMjA7XG4gICAgdGhpcy5odWREaXN0YW5jZS55ID0gMTU7XG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmh1ZERpc3RhbmNlKTtcbiAgfVxuICByZXNldFNwaWtlKHNwaWtlKSB7XG4gICAgc3Bpa2UucmVzZXQoKTtcbiAgICBzcGlrZS54ICs9IHRoaXMud2lkdGggKyBzcGlrZS5ib3VuZHMud2lkdGg7XG4gICAgaWYgKE1hdGgucmFuZG9tKCkgPiAwLjUpIHtcbiAgICAgIHNwaWtlLnkgPSB0aGlzLmhlaWdodCAtIEdST1VORF9IRUlHSFQ7XG4gICAgICBzcGlrZS5yb3RhdGlvbiA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNwaWtlLnkgPSAwO1xuICAgICAgc3Bpa2Uucm90YXRpb24gPSAxODA7XG4gICAgfVxuICB9XG4gIHBhdXNlKHRleHQpIHtcbiAgICB0aGlzLnBhdXNlZCA9IHRydWU7XG4gICAgdGhpcy5zaGFkb3dPdmVybGF5LnNldFRleHQodGV4dCk7XG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLnNoYWRvd092ZXJsYXkpO1xuICB9XG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuaGFuZGxlQWN0aW9uKCkpO1xuICAgIHRoaXMub25LZXlEb3duID0gZSA9PiB7XG4gICAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgICBjYXNlIDMyOlxuICAgICAgICAgIHRoaXMuaGFuZGxlQWN0aW9uKCk7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI3OlxuICAgICAgICAgIHRoaXMudG9nZ2xlUGF1c2UoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bik7XG4gIH1cbiAgaGFuZGxlQWN0aW9uKCkge1xuICAgIGlmICh0aGlzLnBhdXNlZCkge1xuICAgICAgdGhpcy50b2dnbGVQYXVzZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhlcm8uZmxhcCgpO1xuICAgIH1cbiAgfVxuICB0b2dnbGVQYXVzZSgpIHtcbiAgICBpZiAodGhpcy5wYXVzZWQpIHtcbiAgICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XG4gICAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuc2hhZG93T3ZlcmxheSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGF1c2UoJ9Cd0LDQttC80LjRgtC1INC/0YDQvtCx0LXQuyDQuNC70LggZXNjJyk7XG4gICAgfVxuICB9XG4gIG1vdmVXb3JsZCh0aW1lKSB7XG4gICAgY29uc3QgcGF0aCA9IHRoaXMuc3BlZWQgKiB0aW1lO1xuICAgIGlmICh0aGlzLmhlcm8uZGVhZCkge1xuICAgICAgdGhpcy5oZXJvLnggKz0gcGF0aCAqIDAuNTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb3ZlU3Bpa2VzKHBhdGgpO1xuICAgICAgdGhpcy5iZ1NreS5tb3ZlKHBhdGggKiAwLjEpO1xuICAgICAgdGhpcy5iZ01vdW50YWluLm1vdmUocGF0aCAqIDAuMyk7XG4gICAgICB0aGlzLmJnR3JvdW5kLm1vdmUocGF0aCk7XG5cbiAgICAgIHRoaXMuZGlzdGFuY2UgKz0gcGF0aDtcbiAgICAgIGRhdGFNYW5hZ2VyLnNjb3JlID0gTWF0aC5mbG9vcih0aGlzLmRpc3RhbmNlIC8gMjUpO1xuICAgICAgdGhpcy5odWREaXN0YW5jZS50ZXh0ID0gYCR7ZGF0YU1hbmFnZXIuc2NvcmV9INC8YDtcbiAgICB9XG4gIH1cbiAgbW92ZVNwaWtlcyhwYXRoKSB7XG4gICAgdGhpcy5zcGlrZXMuZm9yRWFjaChzcGlrZSA9PiB7XG4gICAgICBzcGlrZS54IC09IHBhdGg7XG4gICAgICBpZiAoc3Bpa2UueCA8IC1zcGlrZS5ib3VuZHMud2lkdGggLyAyKSB7XG4gICAgICAgIHRoaXMucmVzZXRTcGlrZShzcGlrZSk7XG4gICAgICAgIHRoaXMuc3BlZWQgKz0gMTtcbiAgICAgIH1cbiAgICAgIGlmIChuZGdtci5jaGVja1BpeGVsQ29sbGlzaW9uKHRoaXMuaGVybywgc3Bpa2UpKSB7XG4gICAgICAgIHRoaXMuaGVyby5kaWUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBtb3ZlSGVybyh0aW1lKSB7XG4gICAgdGhpcy5oZXJvLm1vdmUodGltZSk7XG4gICAgaWYgKHRoaXMuaGVyby55IDwgMCkge1xuICAgICAgdGhpcy5oZXJvLnZZID0gMDtcbiAgICAgIHRoaXMuaGVyby55ID0gMDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaGVyby55ID4gdGhpcy5oZWlnaHQgKyB0aGlzLmhlcm8uYm91bmRzLmhlaWdodCAvIDIpIHtcbiAgICAgIHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnRW5kU2NyZWVuJyk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmhlcm8ueSA+IHRoaXMuaGVpZ2h0IC0gKEdST1VORF9IRUlHSFQgKyB0aGlzLmhlcm8uYm91bmRzLmhlaWdodCAvIDIpKSB7XG4gICAgICB0aGlzLmhlcm8uZGllKCk7XG4gICAgfVxuICB9XG4gIHRpY2soZSkge1xuICAgIGNvbnN0IHNlYyA9IGUuZGVsdGEgKiAwLjAwMTtcbiAgICBpZiAodGhpcy5wYXVzZWQgfHwgc2VjID4gMC4zKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMubW92ZVdvcmxkKHNlYyk7XG4gICAgdGhpcy5tb3ZlSGVybyhzZWMpO1xuICB9XG4gIGRlc3Ryb3koKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bik7XG4gIH1cbn1cbiIsImltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuaW1wb3J0IGRhdGFNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2RhdGFNYW5hZ2VyJztcbmltcG9ydCBzZXJ2ZXJNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NlcnZlck1hbmFnZXInO1xuaW1wb3J0IEd1aSBmcm9tICcuLi9kaXNwbGF5L0d1aSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhdGluZ1NjcmVlbiBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcblxuICAgIHRoaXMuYmcgPSBuZXcgY3JlYXRlanMuQml0bWFwKGFzc2V0c01hbmFnZXIuZ2V0UmVzdWx0KCdzdGFydCcpKTtcbiAgICB0aGlzLmd1aSA9IG5ldyBHdWkod2lkdGgpO1xuXG4gICAgdGhpcy50aXRsZSA9IG5ldyBjcmVhdGVqcy5UZXh0KCfQoNC10LnRgtC40L3QsycsICczNXB4IEd1ZXJpbGxhJywgJyMwMDAnKTtcbiAgICB0aGlzLnRpdGxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRoaXMudGl0bGUueCA9IHRoaXMud2lkdGggLyAyO1xuICAgIHRoaXMudGl0bGUueSA9IDM1O1xuXG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmJnLCB0aGlzLmd1aSwgdGhpcy50aXRsZSk7XG5cbiAgICBzZXJ2ZXJNYW5hZ2VyLmdldCgncmF0aW5nVGFibGUnLCAxKVxuICAgICAgLy8gdG9kbzogcmVtb3ZlIGxhdGVyLCBub3cgaXQgYWRkIHJlY29yZHMgZm9yIG9sZCB1c2Vyc1xuICAgICAgLnRoZW4ocmVjYWxjUmF0aW5nVGFibGUpXG4gICAgICAudGhlbihyID0+IHRoaXMuc2hvd1JhdGluZyhyKSlcbiAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRleHQgPSBuZXcgY3JlYXRlanMuVGV4dCgn0KDQtdC50YLQuNC90LMg0LLRgNC10LzQtdC90L3QviDQvdC10LTQvtGB0YLRg9C/0LXQvSA6KCcsICcyNXB4IEd1ZXJpbGxhJywgJyMwMDAnKTtcbiAgICAgICAgdGV4dC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgdGV4dC54ID0gdGhpcy53aWR0aCAvIDI7XG4gICAgICAgIHRleHQueSA9IDE1MDtcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0ZXh0KTtcbiAgICAgIH0pO1xuICB9XG4gIHNob3dSYXRpbmcocmF0aW5nVGFibGUpIHtcbiAgICBsZXQgd2lubmVyID0gZmFsc2U7XG5cbiAgICByYXRpbmdUYWJsZS5mb3JFYWNoKChlbCwgaSkgPT4ge1xuICAgICAgY29uc3QgdGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KGAke2kgKyAxfSAke2VsLm5hbWV9ICR7ZWwuc2NvcmV9INC8YCwgJzI1cHggR3VlcmlsbGEnLCAnIzAwMCcpO1xuICAgICAgdGV4dC55ID0gMTIwICsgaSAqIDQwO1xuICAgICAgdGV4dC54ID0gMTIwO1xuICAgICAgdGhpcy5hZGRDaGlsZCh0ZXh0KTtcblxuICAgICAgaWYgKGVsLmlkID09PSBkYXRhTWFuYWdlci51c2VyLmlkKSB7XG4gICAgICAgIHdpbm5lciA9IHRydWU7XG4gICAgICAgIHRleHQuY29sb3IgPSAnIzdFQ0UyRSc7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoIXdpbm5lcikge1xuICAgICAgY29uc3QgdGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KGAtICR7ZGF0YU1hbmFnZXIudXNlci5uYW1lfSAke2RhdGFNYW5hZ2VyLm1heFNjb3JlfSDQvGAsICcyNXB4IEd1ZXJpbGxhJywgJyM3RUNFMkUnKTtcbiAgICAgIHRleHQueSA9IDEyMCArIHJhdGluZ1RhYmxlLmxlbmd0aCAqIDQwO1xuICAgICAgdGV4dC54ID0gMTIwO1xuICAgICAgdGhpcy5hZGRDaGlsZCh0ZXh0KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVjYWxjUmF0aW5nVGFibGUocmF0aW5nVGFibGUpIHtcbiAgaWYgKHJhdGluZ1RhYmxlW3JhdGluZ1RhYmxlLmxlbmd0aCAtIDFdLnNjb3JlIDwgZGF0YU1hbmFnZXIubWF4U2NvcmUpIHtcbiAgICBjb25zdCB1c2VyUmF0aW5nID0gcmF0aW5nVGFibGUuZmluZChlbCA9PiBlbC5pZCA9PT0gZGF0YU1hbmFnZXIudXNlci5pZCk7XG5cbiAgICBpZiAodXNlclJhdGluZykge1xuICAgICAgdXNlclJhdGluZy5zY29yZSA9IGRhdGFNYW5hZ2VyLm1heFNjb3JlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBuZXdSYXRpbmcgPSB7XG4gICAgICAgIGlkOiBkYXRhTWFuYWdlci51c2VyLmlkLFxuICAgICAgICBuYW1lOiBkYXRhTWFuYWdlci51c2VyLm5hbWUsXG4gICAgICAgIHNjb3JlOiBkYXRhTWFuYWdlci5tYXhTY29yZSxcbiAgICAgIH07XG4gICAgICBpZiAocmF0aW5nVGFibGUubGVuZ3RoIDwgMTApIHtcbiAgICAgICAgcmF0aW5nVGFibGUucHVzaChuZXdSYXRpbmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmF0aW5nVGFibGVbcmF0aW5nVGFibGUubGVuZ3RoIC0gMV0gPSBuZXdSYXRpbmc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmF0aW5nVGFibGUuc29ydCgoYSwgYikgPT4gYi5zY29yZSAtIGEuc2NvcmUpO1xuICAgIHNlcnZlck1hbmFnZXIuc2V0KCdyYXRpbmdUYWJsZScsIHJhdGluZ1RhYmxlLCAxKTtcbiAgfVxuICByZXR1cm4gcmF0aW5nVGFibGU7XG59XG4iLCJpbXBvcnQgc2VydmVyTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zZXJ2ZXJNYW5hZ2VyJztcbmltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuaW1wb3J0IHNjcmVlbnNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NjcmVlbnNNYW5hZ2VyJztcbmltcG9ydCBkYXRhTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9kYXRhTWFuYWdlcic7XG5pbXBvcnQgR3VpIGZyb20gJy4uL2Rpc3BsYXkvR3VpJztcbmltcG9ydCBIZXJvIGZyb20gJy4uL2Rpc3BsYXkvSGVybyc7XG5pbXBvcnQgQnRuIGZyb20gJy4uL2Rpc3BsYXkvQnRuJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhcnRTY3JlZW4gZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcblxuICAgIHRoaXMuYmcgPSBuZXcgY3JlYXRlanMuQml0bWFwKGFzc2V0c01hbmFnZXIuZ2V0UmVzdWx0KCdzdGFydCcpKTtcbiAgICB0aGlzLmd1aSA9IG5ldyBHdWkod2lkdGgpO1xuXG4gICAgdGhpcy5zdGFydEJ0biA9IG5ldyBCdG4oJ9CY0LPRgNCw0YLRjCcpO1xuICAgIHRoaXMuc3RhcnRCdG4ueCA9IHdpZHRoIC8gMjtcbiAgICB0aGlzLnN0YXJ0QnRuLnkgPSAzNTA7XG5cbiAgICB0aGlzLmludml0ZUJ0biA9IG5ldyBCdG4oJ9Cf0L7Qt9Cy0LDRgtGMINCx0YDQvicsICdvcmFuZ2UnKTtcbiAgICB0aGlzLmludml0ZUJ0bi54ID0gd2lkdGggLyAyO1xuICAgIHRoaXMuaW52aXRlQnRuLnkgPSA0NTA7XG5cbiAgICB0aGlzLmhlcm8gPSBuZXcgSGVybygnbW9uc3RlcicpO1xuICAgIHRoaXMuaGVyby54ID0gd2lkdGggLyAyO1xuICAgIHRoaXMuaGVyby55ID0gMTkwO1xuXG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmJnLCB0aGlzLmd1aSwgdGhpcy5oZXJvLCB0aGlzLnN0YXJ0QnRuLCB0aGlzLmludml0ZUJ0bik7XG5cbiAgICBpZiAoZGF0YU1hbmFnZXIubWF4U2NvcmUpIHtcbiAgICAgIHRoaXMuc2NvcmUgPSBuZXcgY3JlYXRlanMuVGV4dChg0JvRg9GH0YjQuNC5INGB0YfQtdGCOiAke2RhdGFNYW5hZ2VyLm1heFNjb3JlfSDQvGAsICcyNXB4IEd1ZXJpbGxhJywgJyMwMDAnKTtcbiAgICAgIHRoaXMuc2NvcmUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICB0aGlzLnNjb3JlLnggPSB0aGlzLndpZHRoIC8gMjtcbiAgICAgIHRoaXMuc2NvcmUueSA9IDQwO1xuICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLnNjb3JlKTtcbiAgICB9XG5cbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgfVxuICAvLyBjcmVhdGVIZXJvZXMoKSB7XG4gIC8vICAgdGhpcy5oZXJvZXMgPSBbXG4gIC8vICAgICBuZXcgSGVybygnYmlyZCcpLFxuICAvLyAgICAgbmV3IEhlcm8oJ21vbnN0ZXInKSxcbiAgLy8gICAgIG5ldyBIZXJvKCdjaGlja2VuJyksXG4gIC8vICAgXTtcbiAgLy8gICB0aGlzLmhlcm9lcy5mb3JFYWNoKChoZXJvLCBpKSA9PiB7XG4gIC8vICAgICBoZXJvLnkgPSB0aGlzLmhlaWdodCAvIDI7XG4gIC8vICAgICBoZXJvLnggPSAoaSArIDEpICogdGhpcy53aWR0aCAvICh0aGlzLmhlcm9lcy5sZW5ndGggKyAxKTtcbiAgLy8gICAgIGhlcm8uY3Vyc29yID0gJ3BvaW50ZXInO1xuICAvLyAgICAgaGVyby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuc2VsZWN0SGVybyhoZXJvKSk7XG4gIC8vICAgICBoZXJvLmNhY2hlKDAsIDAsIGhlcm8uYm91bmRzLndpZHRoLCBoZXJvLmJvdW5kcy5oZWlnaHQpO1xuICAvLyAgIH0pO1xuICAvLyAgIHRoaXMuaGVyb0ZpbHRlciA9IG5ldyBjcmVhdGVqcy5Db2xvckZpbHRlcigwLjYsIDAuNiwgMC42KTtcbiAgLy8gICB0aGlzLnJlc2V0SGVyb2VzKCk7XG4gIC8vICAgdGhpcy5hZGRDaGlsZCguLi50aGlzLmhlcm9lcyk7XG4gIC8vIH1cbiAgLy8gcmVzZXRIZXJvZXMoKSB7XG4gIC8vICAgdGhpcy5oZXJvZXMuZm9yRWFjaChoZXJvID0+IHtcbiAgLy8gICAgIGhlcm8uZmlsdGVycyA9IFt0aGlzLmhlcm9GaWx0ZXJdO1xuICAvLyAgICAgaGVyby51cGRhdGVDYWNoZSgpO1xuICAvLyAgICAgaGVyby5zY2FsZVggPSAwLjg1O1xuICAvLyAgICAgaGVyby5zY2FsZVkgPSAwLjg1O1xuICAvLyAgIH0pO1xuICAvLyB9XG4gIC8vIHNlbGVjdEhlcm8oaGVybykge1xuICAvLyAgIHRoaXMucmVzZXRIZXJvZXMoKTtcblxuICAvLyAgIGhlcm8uZmlsdGVycyA9IFtdO1xuICAvLyAgIGhlcm8udXBkYXRlQ2FjaGUoKTtcbiAgLy8gICBoZXJvLnNjYWxlWCA9IDE7XG4gIC8vICAgaGVyby5zY2FsZVkgPSAxO1xuICAvLyAgIGhlcm8uZmxhcCgpO1xuXG4gIC8vICAgaWYgKCF0aGlzLnN0YXJ0QnRuLmVuYWJsZWQpIHtcbiAgLy8gICAgIHRoaXMuc3RhcnRCdG4uZW5hYmxlKCk7XG4gIC8vICAgfVxuXG4gIC8vICAgZGF0YU1hbmFnZXIuaGVyb1R5cGUgPSBoZXJvLnR5cGU7XG4gIC8vIH1cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLnN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT5cbiAgICAgIHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnTWFpblNjcmVlbicpKTtcbiAgICB0aGlzLmludml0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+XG4gICAgICBzZXJ2ZXJNYW5hZ2VyLmludml0ZSgpKTtcblxuICAgIHRoaXMub25LZXlEb3duID0gZSA9PiB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAzMikge1xuICAgICAgICBzY3JlZW5zTWFuYWdlci5jaGFuZ2UoJ01haW5TY3JlZW4nKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlEb3duKTtcbiAgfVxuICBkZXN0cm95KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd24pO1xuICB9XG59XG4iXX0=
