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
  G: 0.16,
  A: 7
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
    value: function move() {
      this.vY += CONFIG.G;
      this.y += this.vY;
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

    _this.shadowText = new createjs.Text('', '30px Guerilla', '#fff');
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
  gameType: null,
  gameMode: null,
  score: null,
  maxScore: null,
  heroType: 'monster',
  pos: null,
  win: null,
  spikes: null,
  actions: null,
  user: {
    id: null,
    name: null,
    sex: null
  },
  enemy: null,
  fields: {
    normal: [[0, 99], [100, 199]],
    upsideDown: [[200, 224], [225, 249]],
    backward: [[250, 274], [275, 299]],
    fast: [[300, 324], [325, 349]],
    slow: [[350, 374], [375, 399]],
    earthquake: [[400, 424], [425, 449]],
    fog: [[450, 474], [475, 499]]
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

var _PVPScreen = require('../screens/PVPScreen');

var _PVPScreen2 = _interopRequireDefault(_PVPScreen);

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
      PVPScreen: _PVPScreen2.default,
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

},{"../screens/EndScreen":14,"../screens/MainScreen":15,"../screens/PVPScreen":16,"../screens/RatingScreen":17,"../screens/StartScreen":18}],12:[function(require,module,exports){
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
  share: function share(message, photo) {
    var photos = {
      single: 'photo-135563388_456239017',
      pvp: 'photo-135563388_456239026'
    };
    VK.api('wall.post', {
      message: message,
      attachments: photos[photo] + ', https://vk.com/app5782118',
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

var _randomInt = require('random-int');

var _randomInt2 = _interopRequireDefault(_randomInt);

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

    _this.maxScore = new createjs.Text('\u0420\u0435\u043A\u043E\u0440\u0434: ' + _dataManager2.default.maxScore + ' \u043C', '25px Guerilla', '#000');
    _this.maxScore.textAlign = 'center';
    _this.maxScore.x = width / 2;
    _this.maxScore.y = 40;

    _this.score = new createjs.Text('\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442: ' + _dataManager2.default.score + ' \u043C', '40px Guerilla', '#000');
    _this.score.textAlign = 'center';
    _this.score.x = width / 2;
    _this.score.y = 150;

    _this.replayBtn = new _Btn2.default('Еще раз');
    _this.replayBtn.x = width / 2;
    _this.replayBtn.y = 350;

    _this.shareBtn = new _Btn2.default('Поделиться', 'orange');
    _this.shareBtn.x = width / 2;
    _this.shareBtn.y = 440;

    _this.addChild(_this.bg, _this.gui, _this.maxScore, _this.score, _this.replayBtn, _this.shareBtn);

    if (_dataManager2.default.score > _dataManager2.default.maxScore) {
      _this.maxScore.text = '\u041F\u0440\u043E\u0448\u043B\u044B\u0439 \u0440\u0435\u043A\u043E\u0440\u0434: ' + _dataManager2.default.maxScore + ' \u043C';
      _dataManager2.default.maxScore = _dataManager2.default.score;
      _serverManager2.default.set('maxScore', _dataManager2.default.maxScore);
      _this.score.text = '\u041D\u043E\u0432\u044B\u0439 \u0440\u0435\u043A\u043E\u0440\u0434: ' + _dataManager2.default.maxScore + ' \u043C!';

      _serverManager2.default.get('ratingTable', 1).then(recalcRatingTable);
    }

    if (_dataManager2.default.gameType === 'pvp') {
      _this.pvpText = new createjs.Text('', '25px Guerilla', '#000');
      _this.pvpText.textAlign = 'center';
      _this.pvpText.x = width / 2;
      _this.pvpText.y = 230;
      _this.addChild(_this.pvpText);

      if (_dataManager2.default.win) {
        _this.pvpText.text += _dataManager2.default.enemy.name + ' \u0431\u044B\u043B' + (_dataManager2.default.enemy.sex !== 2 ? 'а' : '') + ' \u043F\u043E\u0432\u0435\u0440\u0436\u0435\u043D' + (_dataManager2.default.enemy.sex !== 2 ? 'а' : '');
      } else {
        _this.pvpText.text += _dataManager2.default.enemy.name + ' \u043F\u043E\u0432\u0435\u0440\u0433' + (_dataManager2.default.enemy.sex !== 2 ? 'ла' : '') + ' \u0412\u0430\u0441';
      }
    }

    var range = _dataManager2.default.fields[_dataManager2.default.gameMode][_dataManager2.default.pos];
    var field = 'pvp' + (0, _randomInt2.default)(range[0], range[1]);
    var record = {
      user: _dataManager2.default.user,
      spikes: _dataManager2.default.spikes,
      actions: _dataManager2.default.actions
    };

    _serverManager2.default.get(field, 1).then(function (r) {
      console.warn(field);
      console.warn(record);
      console.warn(r);

      if ((!r || r.spikes.length * 0.5 < record.spikes.length) && JSON.stringify(record).length < 4096) {
        console.warn(true);
        _serverManager2.default.set(field, record, 1);
      }
    });

    _this.bindEvents();
    return _this;
  }

  _createClass(EndScreen, [{
    key: 'bindEvents',
    value: function bindEvents() {
      this.replayBtn.addEventListener('click', replay);
      this.shareBtn.addEventListener('click', share);

      this.onKeyDown = function (e) {
        if (e.keyCode === 32) {
          replay();
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


function replay() {
  switch (_dataManager2.default.gameType) {
    case 'single':
      _screensManager2.default.change('MainScreen');
      break;
    case 'pvp':
      _screensManager2.default.change('PVPScreen');
      break;
  }
}

function share() {
  var message = '';
  switch (_dataManager2.default.gameType) {
    case 'single':
      message = '\u042F \u043F\u0440\u043E\u043B\u0435\u0442\u0435\u043B' + (_dataManager2.default.user.sex !== 2 ? 'а' : '') + ' ' + _dataManager2.default.score + ' \u043C \u0432 \u0438\u0433\u0440\u0435 Flappy Monster!';
      if (_dataManager2.default.score === _dataManager2.default.maxScore) {
        message += '\nЭто мой новый рекорд! ';
      }
      message += '\nА сколько сможешь ты?';
      break;
    case 'pvp':
      if (_dataManager2.default.win) {
        message += _dataManager2.default.enemy.name + ' \u0431\u044B\u043B' + (_dataManager2.default.enemy.sex !== 2 ? 'а' : '') + ' \u043F\u043E\u0432\u0435\u0440\u0436\u0435\u043D' + (_dataManager2.default.enemy.sex !== 2 ? 'а' : '') + ' \u043C\u043D\u043E\u0439 \u0432 \u0438\u0433\u0440\u0435 Flappy Monster!';
      } else {
        message += _dataManager2.default.enemy.name + ' \u043F\u043E\u0432\u0435\u0440\u0433' + (_dataManager2.default.enemy.sex !== 2 ? 'ла' : '') + ' \u043C\u0435\u043D\u044F \u0432 \u0438\u0433\u0440\u0435 Flappy Monster,\n                   \u043D\u0443 \u043D\u0438\u0447\u0435\u0433\u043E, \u0435\u0449\u0435 \u0443\u0432\u0438\u0434\u0438\u043C\u0441\u044F...';
      }
      if (_dataManager2.default.score === _dataManager2.default.maxScore) {
        message += '\n\u041C\u043E\u0439 \u043D\u043E\u0432\u044B\u0439 \u0440\u0435\u043A\u043E\u0440\u0434 ' + _dataManager2.default.score + ' \u043C!';
      }
      break;
  }
  _serverManager2.default.share(message, _dataManager2.default.gameType);
}

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

},{"../display/Btn":3,"../display/Gui":4,"../managers/assetsManager":9,"../managers/dataManager":10,"../managers/screensManager":11,"../managers/serverManager":12,"random-int":19}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _randomInt = require('random-int');

var _randomInt2 = _interopRequireDefault(_randomInt);

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

var GROUND_HEIGHT = 80;
var START_SPEED = 5;

var MainScreen = function (_createjs$Container) {
  _inherits(MainScreen, _createjs$Container);

  function MainScreen(width, height) {
    _classCallCheck(this, MainScreen);

    var _this = _possibleConstructorReturn(this, (MainScreen.__proto__ || Object.getPrototypeOf(MainScreen)).call(this));

    _this.width = width;
    _this.height = height;

    _this.speed = START_SPEED;
    _this.spikeScale = 0.7;
    _this.step = 0;
    _this.distance = 0;

    _dataManager2.default.gameType = 'single';
    _dataManager2.default.actions = {};
    _dataManager2.default.spikes = [];
    _dataManager2.default.pos = 0;

    _this.shadowOverlay = new _ShadowOverlay2.default(_this.width, _this.height);
    _this.createBg();
    _this.createSpikes();
    _this.createHero();
    _this.createHud();

    _this.pause('Пробел - взмах крыльями, esc - пауза');
    _this.bindEvents();

    _this.title = new createjs.Text('', '65px Guerilla', '#fff');
    _this.title.textAlign = 'center';
    _this.title.textBaseline = 'middle';
    _this.title.x = width / 2;
    _this.title.y = 225;
    _this.addChild(_this.title);

    // normal mode on first fly
    switch (_dataManager2.default.maxScore ? (0, _randomInt2.default)(10) : 10) {
      case 0:
        _dataManager2.default.gameMode = 'upsideDown';
        _this.title.text = 'Вверх ногами!';
        _this.title.y = height - _this.title.y;
        _this.shadowOverlay.setText('Мир перевернулся');
        _this.hudDistance.y = height - _this.hudDistance.y;
        _this.hudDistance.color = '#fff';
        _this.y = _this.shadowOverlay.y = height;
        _this.scaleY = _this.shadowOverlay.scaleY = _this.title.scaleY = _this.hudDistance.scaleY = -1;
        break;
      case 1:
        _dataManager2.default.gameMode = 'backward';
        _this.title.text = 'Ураган!';
        _this.shadowOverlay.setText('Птицу сдувает назад');
        _this.title.x = width - _this.title.x;
        _this.hudDistance.x = width - _this.hudDistance.x;
        _this.x = _this.shadowOverlay.x = width;
        _this.scaleX = _this.hero.scaleX = _this.shadowOverlay.scaleX = _this.title.scaleX = _this.hudDistance.scaleX = -1;
        break;
      case 2:
        _dataManager2.default.gameMode = 'fast';
        _this.title.text = 'Попутный ветер!';
        _this.shadowOverlay.setText('Скорость полета повышена');
        _this.speed += 2;
        _this.spikeScale -= 0.25;
        break;
      case 3:
        _dataManager2.default.gameMode = 'slow';
        _this.title.text = 'Встречный ветер!';
        _this.shadowOverlay.setText('Скорость полета снижена');
        _this.speed -= 1;
        _this.spikeScale += 0.075;
        break;
      case 4:
        _dataManager2.default.gameMode = 'earthquake';
        _this.title.text = 'Землетрясение!';
        _this.shadowOverlay.setText('Колья раскачиваются');
        _this.spikes.forEach(function (spike, i) {
          spike.tween = createjs.Tween.get(spike, { loop: true, paused: true }).to({ skewX: 9 }, 900 + i * 100).to({ skewX: -9 }, 1800 + i * 200).to({ skewX: 0 }, 900 + i * 100);
        });
        break;
      case 5:
        _dataManager2.default.gameMode = 'fog';
        _this.title.text = 'Туман!';
        _this.shadowOverlay.setText('Видимость снижена');
        _this.speed -= 1.2;
        _this.fog = new createjs.Shape();
        _this.fog.graphics.beginRadialGradientFill(['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, .65)', 'rgba(255, 255, 255, .85)', 'rgba(255, 255, 255, .97)', '#fff'], [0, 0.5, 0.7, 0.9, 1], 0, 0, 0, 0, 0, 380).drawRect(-_this.width / 2, -_this.height, _this.width, _this.height * 2);
        _this.fog.cache(-_this.width / 2, -_this.height, _this.width, _this.height * 2);
        _this.fog.x = _this.hero.x;
        _this.fog.y = _this.hero.y;
        _this.fog.addEventListener('tick', function () {
          if (!_this.hero.dead) {
            _this.fog.y = _this.hero.y;
          }
        });
        _this.addChild(_this.fog, _this.hudDistance);
        break;
      default:
        _dataManager2.default.gameMode = 'normal';
        break;
    }
    _this.spikes.forEach(function (spike) {
      return _this.resetSpike(spike);
    });
    console.log(_dataManager2.default.gameMode);
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
      this.spikes = [new _Spike2.default(), new _Spike2.default()];
      this.spikes[0].x = -this.spikes[0].bounds.width / 2;
      this.spikes[1].x = this.width / 2;
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
      spike.scaleY = +(this.spikeScale + Math.random() * 0.45).toFixed(2);
      spike.x += this.width + spike.bounds.width;
      if (Math.random() > 0.5) {
        spike.y = this.height - GROUND_HEIGHT;
      } else {
        spike.y = 0;
        spike.scaleY = -spike.scaleY;
      }
      _dataManager2.default.spikes.push(spike.scaleY);
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
      var _this2 = this;

      this.addEventListener('click', function () {
        return _this2.handleAction();
      });
      this.onKeyDown = function (e) {
        switch (e.keyCode) {
          case 32:
            _this2.handleAction();
            e.preventDefault();
            break;
          case 27:
            _this2.togglePause();
            break;
        }
      };

      window.addEventListener('keydown', this.onKeyDown);
    }
  }, {
    key: 'handleAction',
    value: function handleAction() {
      if (this.paused) {
        if (this.title) {
          this.removeChild(this.title);
          this.title = null;
        }
        this.togglePause();
      } else {
        this.hero.flap();
        _dataManager2.default.actions[this.step] = 1;
      }
    }
  }, {
    key: 'togglePause',
    value: function togglePause() {
      var _this3 = this;

      if (this.paused) {
        this.paused = false;
        this.removeChild(this.shadowOverlay);
      } else {
        this.pause('Нажмите пробел или esc');
      }
      if (_dataManager2.default.gameMode === 'earthquake') {
        this.spikes.forEach(function (spike) {
          return spike.tween.setPaused(_this3.paused);
        });
      }
    }
  }, {
    key: 'moveWorld',
    value: function moveWorld() {
      if (this.hero.dead) {
        this.hero.x += this.speed * 0.5;
      } else {
        this.moveSpikes(this.speed);
        this.bgSky.move(this.speed * 0.1);
        this.bgMountain.move(this.speed * 0.3);
        this.bgGround.move(this.speed);

        this.distance += this.speed;
        _dataManager2.default.score = Math.floor(this.distance / 25);
        this.hudDistance.text = _dataManager2.default.score + ' \u043C';
      }
    }
  }, {
    key: 'moveSpikes',
    value: function moveSpikes() {
      var _this4 = this;

      this.spikes.forEach(function (spike) {
        spike.x -= _this4.speed;
        if (spike.x < -spike.bounds.width / 2) {
          _this4.resetSpike(spike);
          _this4.speed += 0.04;
        }
        if (ndgmr.checkPixelCollision(_this4.hero, spike)) {
          _this4.hero.die();
        }
      });
    }
  }, {
    key: 'moveHero',
    value: function moveHero() {
      this.hero.move();
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
    value: function tick() {
      if (this.paused) {
        return;
      }
      this.moveWorld();
      this.moveHero();
      this.step += 1;
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

},{"../display/Background":2,"../display/Hero":5,"../display/ShadowOverlay":7,"../display/Spike":8,"../managers/dataManager":10,"../managers/screensManager":11,"random-int":19}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _randomInt = require('random-int');

var _randomInt2 = _interopRequireDefault(_randomInt);

var _screensManager = require('../managers/screensManager');

var _screensManager2 = _interopRequireDefault(_screensManager);

var _serverManager = require('../managers/serverManager');

var _serverManager2 = _interopRequireDefault(_serverManager);

var _dataManager = require('../managers/dataManager');

var _dataManager2 = _interopRequireDefault(_dataManager);

var _Background = require('../display/Background');

var _Background2 = _interopRequireDefault(_Background);

var _Hero = require('../display/Hero');

var _Hero2 = _interopRequireDefault(_Hero);

var _Spike = require('../display/Spike');

var _Spike2 = _interopRequireDefault(_Spike);

var _Btn = require('../display/Btn');

var _Btn2 = _interopRequireDefault(_Btn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GROUND_HEIGHT = 80;
var START_SPEED = 5;

var MainScreen = function (_createjs$Container) {
  _inherits(MainScreen, _createjs$Container);

  function MainScreen(width, height) {
    _classCallCheck(this, MainScreen);

    var _this = _possibleConstructorReturn(this, (MainScreen.__proto__ || Object.getPrototypeOf(MainScreen)).call(this));

    _this.width = width;
    _this.height = height;

    _this.speed = START_SPEED;
    _this.started = false;

    _this.createBg();

    var watingText = new createjs.Text('Идет подбор соперника', '35px Guerilla', '#000');
    watingText.textAlign = 'center';
    watingText.x = width / 2;
    watingText.y = 170;

    var cancelBtn = new _Btn2.default('Отмена', 'orange');
    cancelBtn.x = width / 2;
    cancelBtn.y = 340;
    cancelBtn.addEventListener('click', function () {
      return _screensManager2.default.change('StartScreen');
    });

    _this.addChild(watingText, cancelBtn);

    _dataManager2.default.pos = (0, _randomInt2.default)(1);
    var enemyRange = _dataManager2.default.fields[_dataManager2.default.gameMode][1 - _dataManager2.default.pos];
    var enemyField = 'pvp' + (0, _randomInt2.default)(enemyRange[0], enemyRange[1]);
    console.warn(enemyField);

    Promise.all([_serverManager2.default.get(enemyField, 1).then(function (r) {
      return _this.initData(r);
    }), new Promise(function (resolve) {
      return setTimeout(resolve, Math.random() * 2000 + 500);
    })]).then(function () {
      _this.init();
      _this.removeChild(watingText, cancelBtn);
    }).catch(function (e) {
      watingText.text = 'PVP временно недоступно :(';
      console.error(e);
    });

    _this.bindEvents();
    return _this;
  }

  _createClass(MainScreen, [{
    key: 'initData',
    value: function initData(record) {
      _dataManager2.default.gameType = 'pvp';
      _dataManager2.default.gameMode = 'normal';
      _dataManager2.default.win = false;
      _dataManager2.default.actions = {};
      _dataManager2.default.spikes = [];
      _dataManager2.default.enemy = record.user;
      this.enemySpikes = record.spikes;
      this.enemyActions = record.actions;
      if (_dataManager2.default.user.id === record.user.id) {
        _dataManager2.default.enemy.name = 'Призрачный птиц';
      }
    }
  }, {
    key: 'init',
    value: function init() {
      var _this2 = this;

      this.spikeIndex = 0;
      this.step = 0;
      this.distance = 0;

      this.createSpikes();
      this.createHud();

      var counter = new createjs.Text(3, '125px Guerilla', '#000');
      counter.textAlign = 'center';
      counter.x = this.width / 2;
      counter.y = 310;

      this.addChild(counter);

      var interval = setInterval(function () {
        counter.text -= 1;
        if (counter.text < 0) {
          _this2.removeChild(counter);
          _this2.started = true;
          clearInterval(interval);
        }
      }, 1000);

      this.hero = this.createHero(_dataManager2.default.pos, _dataManager2.default.user.name);
      this.enemy = this.createHero(1 - _dataManager2.default.pos, _dataManager2.default.enemy.name);
      this.enemy.alpha = 0.5;
    }
  }, {
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
      var _this3 = this;

      this.spikes = [new _Spike2.default(), new _Spike2.default()];
      this.spikes[0].x = -this.spikes[0].bounds.width / 2;
      this.spikes[1].x = this.width / 2;
      this.spikes.forEach(function (spike) {
        return _this3.resetSpike(spike);
      });
      this.addChild.apply(this, _toConsumableArray(this.spikes));
    }
  }, {
    key: 'createHero',
    value: function createHero(pos, name) {
      var _this4 = this;

      var hero = new _Hero2.default(_dataManager2.default.heroType);
      hero.x = this.width / 2 - 180 * pos;
      hero.y = 190 - 50 * pos;

      var heroName = new createjs.Text(name, '25px Guerilla', '#000');
      heroName.textAlign = 'center';
      heroName.y = hero.y - 100;
      heroName.x = hero.x;
      this.addChild(hero, heroName);

      createjs.Tween.get(heroName).wait(2400).to({ alpha: 0 }, 800).call(function () {
        return _this4.removeChild(heroName);
      });

      return hero;
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
      spike.x += this.width + spike.bounds.width;

      if (this.enemySpikes[this.spikeIndex]) {
        spike.scaleY = this.enemySpikes[this.spikeIndex];
        this.spikeIndex += 1;

        if (spike.scaleY > 0) {
          spike.y = this.height - GROUND_HEIGHT;
        } else {
          spike.y = 0;
        }
      } else {
        spike.scaleY = +(0.7 + Math.random() * 0.45).toFixed(2);
        if (Math.random() > 0.5) {
          spike.y = this.height - GROUND_HEIGHT;
        } else {
          spike.y = 0;
          spike.scaleY = -spike.scaleY;
        }
      }
      _dataManager2.default.spikes.push(spike.scaleY);
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this5 = this;

      this.addEventListener('click', function () {
        return _this5.handleAction();
      });
      this.onKeyDown = function (e) {
        _this5.handleAction();
        e.preventDefault();
      };

      window.addEventListener('keydown', this.onKeyDown);
    }
  }, {
    key: 'handleAction',
    value: function handleAction() {
      if (!this.started) {
        return;
      }
      this.hero.flap();
      _dataManager2.default.actions[this.step] = 1;
    }
  }, {
    key: 'moveWorld',
    value: function moveWorld() {
      this.moveSpikes(this.speed);
      this.bgSky.move(this.speed * 0.1);
      this.bgMountain.move(this.speed * 0.3);
      this.bgGround.move(this.speed);

      this.distance += this.speed;
      _dataManager2.default.score = Math.floor(this.distance / 25);
      this.hudDistance.text = _dataManager2.default.score + ' \u043C';
    }
  }, {
    key: 'moveSpikes',
    value: function moveSpikes() {
      var _this6 = this;

      this.spikes.forEach(function (spike) {
        spike.x -= _this6.speed;
        if (spike.x < -spike.bounds.width / 2) {
          _this6.resetSpike(spike);
          _this6.speed += 0.04;
        }
      });
    }
  }, {
    key: 'moveHero',
    value: function moveHero(hero) {
      hero.move();
      if (hero.y < 0) {
        hero.vY = 0;
        hero.y = 0;
      } else if (hero.y > this.height + hero.bounds.height / 2) {
        if (hero === this.hero) {
          _screensManager2.default.change('EndScreen');
        } else {
          _dataManager2.default.win = true;
        }
      } else if (hero.y > this.height - (GROUND_HEIGHT + hero.bounds.height / 2)) {
        hero.die();
      }
      if (this.spikes.some(function (spike) {
        return ndgmr.checkPixelCollision(hero, spike);
      })) {
        hero.die();
      }
    }
  }, {
    key: 'tick',
    value: function tick() {
      if (!this.started) {
        return;
      }
      this.moveWorld();
      this.moveHero(this.hero);
      this.moveHero(this.enemy);

      this.step += 1;
      if (this.enemyActions[this.step]) {
        this.enemy.flap();
      }
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

},{"../display/Background":2,"../display/Btn":3,"../display/Hero":5,"../display/Spike":8,"../managers/dataManager":10,"../managers/screensManager":11,"../managers/serverManager":12,"random-int":19}],17:[function(require,module,exports){
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
        var text = new createjs.Text(i + 1 + ' ' + el.name + ' ' + el.score + ' \u043C', '25px Guerilla', '#000');
        text.y = 120 + i * 40;
        text.x = 120;
        _this2.addChild(text);

        if (el.id === _dataManager2.default.user.id) {
          winner = true;
          text.color = '#7ECE2E';
        }
      });

      if (!winner) {
        var text = new createjs.Text('- ' + _dataManager2.default.user.name + ' ' + _dataManager2.default.maxScore + ' \u043C', '25px Guerilla', '#7ECE2E');
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

},{"../display/Gui":4,"../managers/assetsManager":9,"../managers/dataManager":10,"../managers/serverManager":12}],18:[function(require,module,exports){
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
    _this.startBtn.y = 320;

    _this.pvpBtn = new _Btn2.default('PVP');
    _this.pvpBtn.x = width / 2;
    _this.pvpBtn.y = 410;

    _this.inviteBtn = new _Btn2.default('Позвать бро', 'orange');
    _this.inviteBtn.x = width / 2;
    _this.inviteBtn.y = 500;

    _this.hero = new _Hero2.default('monster');
    _this.hero.x = width / 2;
    _this.hero.y = 190;

    _this.addChild(_this.bg, _this.gui, _this.hero, _this.startBtn, _this.pvpBtn, _this.inviteBtn);

    if (_dataManager2.default.maxScore) {
      _this.score = new createjs.Text('\u0420\u0435\u043A\u043E\u0440\u0434: ' + _dataManager2.default.maxScore + ' \u043C', '25px Guerilla', '#000');
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
      this.pvpBtn.addEventListener('click', function () {
        return _screensManager2.default.change('PVPScreen');
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

},{"../display/Btn":3,"../display/Gui":4,"../display/Hero":5,"../managers/assetsManager":9,"../managers/dataManager":10,"../managers/screensManager":11,"../managers/serverManager":12}],19:[function(require,module,exports){
'use strict';
module.exports = function (min, max) {
	if (max === undefined) {
		max = min;
		min = 0;
	}

	if (typeof min !== 'number' || typeof max !== 'number') {
		throw new TypeError('Expected all arguments to be numbers');
	}

	return Math.floor(Math.random() * (max - min + 1) + min);
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvc3JjL2FwcC5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9CYWNrZ3JvdW5kLmpzIiwiYXBwL2pzL3NyYy9kaXNwbGF5L0J0bi5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9HdWkuanMiLCJhcHAvanMvc3JjL2Rpc3BsYXkvSGVyby5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9JY29uQnRuLmpzIiwiYXBwL2pzL3NyYy9kaXNwbGF5L1NoYWRvd092ZXJsYXkuanMiLCJhcHAvanMvc3JjL2Rpc3BsYXkvU3Bpa2UuanMiLCJhcHAvanMvc3JjL21hbmFnZXJzL2Fzc2V0c01hbmFnZXIuanMiLCJhcHAvanMvc3JjL21hbmFnZXJzL2RhdGFNYW5hZ2VyLmpzIiwiYXBwL2pzL3NyYy9tYW5hZ2Vycy9zY3JlZW5zTWFuYWdlci5qcyIsImFwcC9qcy9zcmMvbWFuYWdlcnMvc2VydmVyTWFuYWdlci5qcyIsImFwcC9qcy9zcmMvbWFuYWdlcnMvc291bmRNYW5hZ2VyLmpzIiwiYXBwL2pzL3NyYy9zY3JlZW5zL0VuZFNjcmVlbi5qcyIsImFwcC9qcy9zcmMvc2NyZWVucy9NYWluU2NyZWVuLmpzIiwiYXBwL2pzL3NyYy9zY3JlZW5zL1BWUFNjcmVlbi5qcyIsImFwcC9qcy9zcmMvc2NyZWVucy9SYXRpbmdTY3JlZW4uanMiLCJhcHAvanMvc3JjL3NjcmVlbnMvU3RhcnRTY3JlZW4uanMiLCJub2RlX21vZHVsZXMvcmFuZG9tLWludC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsUUFBUSxHQUFSLENBQVksQ0FDVix3QkFBYyxJQUFkLEVBRFUsRUFFVix3QkFBYyxJQUFkLEVBRlUsQ0FBWixFQUlHLElBSkgsQ0FJUTtBQUFBLFNBQU0sUUFBUSxHQUFSLENBQVksQ0FDdEIsd0JBQWMs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KGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgc2NyZWVuc01hbmFnZXIgZnJvbSAnLi9tYW5hZ2Vycy9zY3JlZW5zTWFuYWdlcic7XG5pbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuaW1wb3J0IHNlcnZlck1hbmFnZXIgZnJvbSAnLi9tYW5hZ2Vycy9zZXJ2ZXJNYW5hZ2VyJztcbmltcG9ydCBzb3VuZE1hbmFnZXIgZnJvbSAnLi9tYW5hZ2Vycy9zb3VuZE1hbmFnZXInO1xuaW1wb3J0IGRhdGFNYW5hZ2VyIGZyb20gJy4vbWFuYWdlcnMvZGF0YU1hbmFnZXInO1xuXG5Qcm9taXNlLmFsbChbXG4gIGFzc2V0c01hbmFnZXIuaW5pdCgpLFxuICBzZXJ2ZXJNYW5hZ2VyLmluaXQoKSxcbl0pXG4gIC50aGVuKCgpID0+IFByb21pc2UuYWxsKFtcbiAgICBzZXJ2ZXJNYW5hZ2VyLmdldFVzZXIoKS50aGVuKHVzZXIgPT4gZGF0YU1hbmFnZXIuc2V0KCd1c2VyJywge1xuICAgICAgaWQ6IHVzZXIuaWQsXG4gICAgICBuYW1lOiBgJHt1c2VyLmZpcnN0X25hbWV9ICR7dXNlci5sYXN0X25hbWV9YCxcbiAgICAgIHNleDogdXNlci5zZXgsXG4gICAgfSkpLFxuICAgIHNlcnZlck1hbmFnZXIuZ2V0KCdtYXhTY29yZScpLnRoZW4ociA9PiBkYXRhTWFuYWdlci5zZXQoJ21heFNjb3JlJywgK3IpKSxcbiAgICBzZXJ2ZXJNYW5hZ2VyLmdldCgnc291bmQnKS50aGVuKHIgPT4gc291bmRNYW5hZ2VyLmluaXQociA9PT0gJycgPyB0cnVlIDogISFyKSksXG4gIF0pKVxuICAudGhlbigoKSA9PiBzY3JlZW5zTWFuYWdlci5jaGFuZ2UoJ1N0YXJ0U2NyZWVuJykpXG4gIC5jYXRjaChlID0+IGNvbnNvbGUuZXJyb3IoJ2luaXQgZXJyb3IsIHJlbG9hZCBwYWdlJywgZSkpO1xuXG5jb25zdCBzdGFnZSA9IG5ldyBjcmVhdGVqcy5TdGFnZSgnZ2FtZS1zdGFnZScpO1xuc2NyZWVuc01hbmFnZXIuaW5pdChzdGFnZSk7XG5cbmlmIChjcmVhdGVqcy5Ub3VjaC5pc1N1cHBvcnRlZCgpKSB7XG4gIGNyZWF0ZWpzLlRvdWNoLmVuYWJsZShzdGFnZSwgdHJ1ZSk7XG59IGVsc2Uge1xuICBzdGFnZS5lbmFibGVNb3VzZU92ZXIoMjApO1xufVxuXG5pZiAod2luZG93ICE9PSB3aW5kb3cucGFyZW50KSB7XG4gIC8vIGNyZWF0ZWpzIHN0YWdlIGNsaWNrIGRvc250IHRyaWdnZXIgd2luZG93LmZvY3VzXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHdpbmRvdy5mb2N1cygpKTtcbn1cbiIsImltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYWNrZ3JvdW5kIGV4dGVuZHMgY3JlYXRlanMuU2hhcGUge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBjYW52YXNXaWR0aCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmltZyA9IGFzc2V0c01hbmFnZXIuZ2V0UmVzdWx0KG5hbWUpO1xuICAgIGNvbnN0IHdpZHRoID0gdGhpcy5pbWcud2lkdGggKyBjYW52YXNXaWR0aDtcblxuICAgIHRoaXMuZ3JhcGhpY3MuYmVnaW5CaXRtYXBGaWxsKHRoaXMuaW1nLCAncmVwZWF0LXgnKS5kcmF3UmVjdCgwLCAwLCB3aWR0aCwgdGhpcy5pbWcuaGVpZ2h0KTtcbiAgICB0aGlzLnJlZ1kgPSB0aGlzLmltZy5oZWlnaHQ7XG4gICAgdGhpcy5jYWNoZSgwLCAwLCB3aWR0aCwgdGhpcy5pbWcuaGVpZ2h0KTtcbiAgfVxuICBtb3ZlKHBhdGgpIHtcbiAgICB0aGlzLnggLT0gcGF0aDtcbiAgICB0aGlzLnggJT0gdGhpcy5pbWcud2lkdGg7XG4gIH1cbn1cbiIsImltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuaW1wb3J0IHNvdW5kTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zb3VuZE1hbmFnZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdG4gZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuICBjb25zdHJ1Y3RvcihsYWJlbCwgY29sb3IgPSAnZ3JlZW4nLCB0eXBlID0gJ2J0bicpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuXG4gICAgdGhpcy5jcmVhdGVCZyh0eXBlKTtcbiAgICB0aGlzLmNyZWF0ZUxhYmVsKGxhYmVsKTtcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzb3VuZE1hbmFnZXIucGxheSgnZmxhcCcpKTtcbiAgfVxuICBjcmVhdGVCZyh0eXBlKSB7XG4gICAgdGhpcy5iZyA9IG5ldyBjcmVhdGVqcy5TcHJpdGUoYXNzZXRzTWFuYWdlci5nZXRTcHJpdGVTaGVldCh0eXBlKSk7XG4gICAgdGhpcy5iZy5yZWdYID0gdGhpcy5iZy5nZXRCb3VuZHMoKS53aWR0aCAvIDI7XG4gICAgdGhpcy5iZy5yZWdZID0gdGhpcy5iZy5nZXRCb3VuZHMoKS5oZWlnaHQgLyAyO1xuICAgIHRoaXMuaGVscGVyID0gbmV3IGNyZWF0ZWpzLkJ1dHRvbkhlbHBlcih0aGlzLmJnLCBgJHt0aGlzLmNvbG9yfU91dGAsIGAke3RoaXMuY29sb3J9T3ZlcmAsIGAke3RoaXMuY29sb3J9RG93bmApO1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5iZyk7XG4gIH1cbiAgY3JlYXRlTGFiZWwobGFiZWwpIHtcbiAgICB0aGlzLmxhYmVsID0gbmV3IGNyZWF0ZWpzLlRleHQobGFiZWwsICczMHB4IEd1ZXJpbGxhJywgJyNmZmYnKTtcbiAgICB0aGlzLmxhYmVsLnNoYWRvdyA9IG5ldyBjcmVhdGVqcy5TaGFkb3coJyMwMDAnLCAwLCAxLCA1KTtcbiAgICB0aGlzLmxhYmVsLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRoaXMubGFiZWwudGV4dEJhc2VsaW5lID0gJ21pZGRsZSc7XG4gICAgdGhpcy5sYWJlbC5tb3VzZUVuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLmxhYmVsLnkgPSAtMztcblxuICAgIC8vIHRvZG8gY2FjaGVcbiAgICAvLyBub3cgaXQgY2FjaGUgYmVmb3JlIGZvbnQgbG9hZCAoXG4gICAgLy8gY29uc3QgaCA9IHRoaXMubGFiZWwuZ2V0TWVhc3VyZWRIZWlnaHQoKSArIDY7IC8vIGFkZCA2IGNvcyBvZiBzaGFkb3dcbiAgICAvLyBjb25zdCB3ID0gdGhpcy5sYWJlbC5nZXRNZWFzdXJlZFdpZHRoKCkgKyA2O1xuICAgIC8vIHRoaXMubGFiZWwuY2FjaGUoLXcgLyAyLCAtaCAvIDIsIHcsIGgpO1xuXG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmxhYmVsKTtcbiAgfVxuICBkaXNhYmxlKCkge1xuICAgIHRoaXMuYmcuZ290b0FuZFN0b3AoJ2Rpc2FibGUnKTtcbiAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xuICB9XG4gIGVuYWJsZSgpIHtcbiAgICB0aGlzLmJnLmdvdG9BbmRTdG9wKGAke3RoaXMuY29sb3J9T3V0YCk7XG4gICAgdGhpcy5tb3VzZUVuYWJsZWQgPSB0cnVlO1xuICB9XG59XG4iLCJpbXBvcnQgc2NyZWVuTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zY3JlZW5zTWFuYWdlcic7XG5pbXBvcnQgc291bmRNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NvdW5kTWFuYWdlcic7XG5pbXBvcnQgc2VydmVyTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zZXJ2ZXJNYW5hZ2VyJztcbmltcG9ydCBJY29uQnRuIGZyb20gJy4vSWNvbkJ0bic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEd1aSBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcblxuICAgIHRoaXMubWVudUJ0biA9IG5ldyBJY29uQnRuKCdtZW51Jyk7XG4gICAgdGhpcy5tZW51QnRuLnggPSB0aGlzLm1lbnVCdG4uZ2V0Qm91bmRzKCkud2lkdGggLyAyICsgMjA7XG4gICAgdGhpcy5tZW51QnRuLnkgPSB0aGlzLm1lbnVCdG4uZ2V0Qm91bmRzKCkuaGVpZ2h0IC8gMiArIDIwO1xuXG4gICAgdGhpcy5yYXRpbmdCdG4gPSBuZXcgSWNvbkJ0bigncmF0aW5nJyk7XG4gICAgdGhpcy5yYXRpbmdCdG4ueCA9IHRoaXMucmF0aW5nQnRuLmdldEJvdW5kcygpLndpZHRoICogMyAvIDIgKyA0MDtcbiAgICB0aGlzLnJhdGluZ0J0bi55ID0gdGhpcy5yYXRpbmdCdG4uZ2V0Qm91bmRzKCkuaGVpZ2h0IC8gMiArIDIwO1xuXG4gICAgdGhpcy5zb3VuZEJ0biA9IG5ldyBJY29uQnRuKHNvdW5kTWFuYWdlci5pc0VuYWJsZWQoKSA/ICdzb3VuZCcgOiAnc291bmRPZmYnKTtcbiAgICB0aGlzLnNvdW5kQnRuLnggPSB0aGlzLndpZHRoIC0gdGhpcy5zb3VuZEJ0bi5nZXRCb3VuZHMoKS53aWR0aCAvIDIgLSAyMDtcbiAgICB0aGlzLnNvdW5kQnRuLnkgPSB0aGlzLnNvdW5kQnRuLmdldEJvdW5kcygpLmhlaWdodCAvIDIgKyAyMDtcblxuICAgIC8vIHRvZG86IGZpeCBzcHJpdGVzaGVldCBsYXRlclxuICAgIHRoaXMucmF0aW5nQnRuLmxhYmVsLnggPSB0aGlzLnNvdW5kQnRuLmxhYmVsLnggPSAxO1xuXG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLm1lbnVCdG4sIHRoaXMucmF0aW5nQnRuLCB0aGlzLnNvdW5kQnRuKTtcblxuICAgIHRoaXMuc291bmRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBzb3VuZE1hbmFnZXIudG9nZ2xlKCk7XG4gICAgICB0aGlzLnNvdW5kQnRuLmNoYW5nZUxhYmVsKHNvdW5kTWFuYWdlci5pc0VuYWJsZWQoKSA/ICdzb3VuZCcgOiAnc291bmRPZmYnKTtcbiAgICAgIHNlcnZlck1hbmFnZXIuc2V0KCdzb3VuZCcsIHNvdW5kTWFuYWdlci5pc0VuYWJsZWQoKSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm1lbnVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzY3JlZW5NYW5hZ2VyLmNoYW5nZSgnU3RhcnRTY3JlZW4nKSk7XG4gICAgdGhpcy5yYXRpbmdCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzY3JlZW5NYW5hZ2VyLmNoYW5nZSgnUmF0aW5nU2NyZWVuJykpO1xuICB9XG59XG4iLCJpbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcbmltcG9ydCBzb3VuZE1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc291bmRNYW5hZ2VyJztcblxuY29uc3QgQ09ORklHID0ge1xuICBHOiAwLjE2LFxuICBBOiA3LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVybyBleHRlbmRzIGNyZWF0ZWpzLlNwcml0ZSB7XG4gIGNvbnN0cnVjdG9yKHR5cGUpIHtcbiAgICBzdXBlcihhc3NldHNNYW5hZ2VyLmdldFNwcml0ZVNoZWV0KHR5cGUpKTtcblxuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5ib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpO1xuICAgIHRoaXMucmVnWCA9IHRoaXMuYm91bmRzLndpZHRoIC8gMjtcbiAgICB0aGlzLnJlZ1kgPSB0aGlzLmJvdW5kcy5oZWlnaHQgLyAyO1xuXG4gICAgdGhpcy5kZWFkID0gZmFsc2U7XG4gICAgdGhpcy52WSA9IDA7XG4gIH1cbiAgZmxhcCgpIHtcbiAgICBpZiAodGhpcy5kZWFkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudlkgPSBNYXRoLm1heCh0aGlzLnZZIC0gQ09ORklHLkEsIC1DT05GSUcuQSk7XG4gICAgdGhpcy5nb3RvQW5kUGxheSgnZmxhcCcpO1xuICAgIHNvdW5kTWFuYWdlci5wbGF5KCdmbGFwJyk7XG4gIH1cbiAgbW92ZSgpIHtcbiAgICB0aGlzLnZZICs9IENPTkZJRy5HO1xuICAgIHRoaXMueSArPSB0aGlzLnZZO1xuICB9XG4gIGRpZSgpIHtcbiAgICBpZiAodGhpcy5kZWFkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZGVhZCA9IHRydWU7XG4gICAgdGhpcy5yb3RhdGlvbiA9IDMwO1xuICAgIHRoaXMuZ290b0FuZFN0b3AoJ2RlYWQnKTtcbiAgICBzb3VuZE1hbmFnZXIucGxheSgnbG9vc2UnKTtcbiAgfVxufVxuIiwiaW1wb3J0IGFzc2V0c01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvYXNzZXRzTWFuYWdlcic7XG5pbXBvcnQgQnRuIGZyb20gJy4vQnRuJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSWNvbkJ0biBleHRlbmRzIEJ0biB7XG4gIGNvbnN0cnVjdG9yKGxhYmVsLCBjb2xvciA9ICdvcmFuZ2UnKSB7XG4gICAgc3VwZXIobGFiZWwsIGNvbG9yLCAnaWNvbkJ0bicpO1xuICB9XG4gIGNyZWF0ZUxhYmVsKGxhYmVsKSB7XG4gICAgdGhpcy5sYWJlbCA9IG5ldyBjcmVhdGVqcy5TcHJpdGUoYXNzZXRzTWFuYWdlci5nZXRTcHJpdGVTaGVldCgnaWNvbicpLCBsYWJlbCk7XG4gICAgdGhpcy5sYWJlbC5yZWdYID0gdGhpcy5sYWJlbC5nZXRCb3VuZHMoKS53aWR0aCAvIDI7XG4gICAgdGhpcy5sYWJlbC5yZWdZID0gdGhpcy5sYWJlbC5nZXRCb3VuZHMoKS5oZWlnaHQgLyAyO1xuICAgIHRoaXMubGFiZWwubW91c2VFbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmxhYmVsKTtcbiAgfVxuICBjaGFuZ2VMYWJlbChsYWJlbCkge1xuICAgIHRoaXMubGFiZWwuZ290b0FuZFN0b3AobGFiZWwpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTaGFkb3dPdmVybGF5IGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnNoYWRvdyA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICAgIHRoaXMuc2hhZG93LmdyYXBoaWNzLmJlZ2luRmlsbCgncmdiYSgwLCAwLCAwLCAwLjYpJykuZHJhd1JlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICB0aGlzLnNoYWRvd1RleHQgPSBuZXcgY3JlYXRlanMuVGV4dCgnJywgJzMwcHggR3VlcmlsbGEnLCAnI2ZmZicpO1xuICAgIHRoaXMuc2hhZG93VGV4dC55ID0gaGVpZ2h0IC8gMjtcbiAgICB0aGlzLnNoYWRvd1RleHQueCA9IHdpZHRoIC8gMjtcbiAgICB0aGlzLnNoYWRvd1RleHQudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgdGhpcy5zaGFkb3dUZXh0LnRleHRCYXNlbGluZSA9ICdtaWRkbGUnO1xuXG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLnNoYWRvdywgdGhpcy5zaGFkb3dUZXh0KTtcbiAgICAvLyB0b2RvXG4gICAgLy8gdGhpcy5jYWNoZSgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgfVxuICBzZXRUZXh0KHRleHQpIHtcbiAgICB0aGlzLnNoYWRvd1RleHQudGV4dCA9IHRleHQ7XG4gICAgLy8gdGhpcy51cGRhdGVDYWNoZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3Bpa2UgZXh0ZW5kcyBjcmVhdGVqcy5CaXRtYXAge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihhc3NldHNNYW5hZ2VyLmdldFJlc3VsdCgnc3Bpa2UnKSk7XG5cbiAgICB0aGlzLmJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCk7XG4gICAgdGhpcy5yZWdYID0gdGhpcy5ib3VuZHMud2lkdGggLyAyO1xuICAgIHRoaXMucmVnWSA9IHRoaXMuYm91bmRzLmhlaWdodDtcbiAgfVxufVxuIiwiY29uc3QgbWFuaWZlc3QgPSBbXG4gIHsgaWQ6ICdtb25zdGVyJywgc3JjOiAnaW1nL21vbnN0ZXItc3ByaXRlLnBuZycgfSxcbiAgLy8geyBpZDogJ2JpcmQnLCBzcmM6ICdpbWcvYmlyZC1zcHJpdGUucG5nJyB9LFxuICAvLyB7IGlkOiAnY2hpY2tlbicsIHNyYzogJ2ltZy9jaGlja2VuLXNwcml0ZS5wbmcnIH0sXG4gIHsgaWQ6ICdzcGlrZScsIHNyYzogJ2ltZy9zcGlrZS5wbmcnIH0sXG4gIHsgaWQ6ICdza3knLCBzcmM6ICdpbWcvYmcvc2t5LnBuZycgfSxcbiAgeyBpZDogJ3N0YXJ0Jywgc3JjOiAnaW1nL2JnL3N0YXJ0LnBuZycgfSxcbiAgeyBpZDogJ21vdW50YWluJywgc3JjOiAnaW1nL2JnL21vdW50YWluLnBuZycgfSxcbiAgeyBpZDogJ2dyb3VuZCcsIHNyYzogJ2ltZy9iZy9ncm91bmQucG5nJyB9LFxuICB7IGlkOiAnYnRuJywgc3JjOiAnaW1nL2J0bi1zcHJpdGUucG5nJyB9LFxuICB7IGlkOiAnaWNvbi1idG4nLCBzcmM6ICdpbWcvaWNvbi1idG4tc3ByaXRlLnBuZycgfSxcbiAgeyBpZDogJ2ljb24nLCBzcmM6ICdpbWcvaWNvbi1zcHJpdGUucG5nJyB9LFxuICB7IGlkOiAnYmFjaycsIHNyYzogJ3NvdW5kL2JhY2tncm91bmQub2dnJyB9LFxuICB7IGlkOiAnZmxhcCcsIHNyYzogJ3NvdW5kL2ZsYXAub2dnJyB9LFxuICB7IGlkOiAnbG9vc2UnLCBzcmM6ICdzb3VuZC9sb29zZS5vZ2cnIH0sXG5dO1xuXG5jb25zdCBnZXRIZXJvU3ByaXRlU2hlZXREYXRhID0gbmFtZSA9PiAoe1xuICBpbWFnZXM6IFtuYW1lXSxcbiAgZnJhbWVzOiB7IHdpZHRoOiAxMDAsIGhlaWdodDogNzggfSxcbiAgYW5pbWF0aW9uczoge1xuICAgIGZseTogMCxcbiAgICBmbGFwOiBbMSwgMywgJ2ZseSddLFxuICAgIGRlYWQ6IDQsXG4gIH0sXG59KTtcblxuY29uc3Qgc3ByaXRlU2hlZXRzRGF0YSA9IHtcbiAgYmlyZDogZ2V0SGVyb1Nwcml0ZVNoZWV0RGF0YSgnYmlyZCcpLFxuICBtb25zdGVyOiBnZXRIZXJvU3ByaXRlU2hlZXREYXRhKCdtb25zdGVyJyksXG4gIGNoaWNrZW46IGdldEhlcm9TcHJpdGVTaGVldERhdGEoJ2NoaWNrZW4nKSxcbiAgYnRuOiB7XG4gICAgaW1hZ2VzOiBbJ2J0biddLFxuICAgIGZyYW1lczogeyB3aWR0aDogMjEwLCBoZWlnaHQ6IDY5LCBzcGFjaW5nOiAyIH0sXG4gICAgYW5pbWF0aW9uczoge1xuICAgICAgZ3JlZW5PdXQ6IDAsXG4gICAgICBncmVlbk92ZXI6IDIsXG4gICAgICBncmVlbkRvd246IDQsXG4gICAgICBvcmFuZ2VPdXQ6IDYsXG4gICAgICBvcmFuZ2VPdmVyOiA4LFxuICAgICAgb3JhbmdlRG93bjogMSxcbiAgICAgIHJlZE91dDogMyxcbiAgICAgIHJlZE92ZXI6IDUsXG4gICAgICByZWREb3duOiA3LFxuICAgICAgZGlzYWJsZTogOSxcbiAgICB9LFxuICB9LFxuICBpY29uQnRuOiB7XG4gICAgaW1hZ2VzOiBbJ2ljb24tYnRuJ10sXG4gICAgZnJhbWVzOiB7IHdpZHRoOiA2OSwgaGVpZ2h0OiA3MSwgc3BhY2luZzogMiB9LFxuICAgIGFuaW1hdGlvbnM6IHtcbiAgICAgIGdyZWVuT3V0OiAwLFxuICAgICAgZ3JlZW5PdmVyOiAxLFxuICAgICAgZ3JlZW5Eb3duOiAyLFxuICAgICAgb3JhbmdlT3V0OiAzLFxuICAgICAgb3JhbmdlT3ZlcjogNCxcbiAgICAgIG9yYW5nZURvd246IDUsXG4gICAgICByZWRPdXQ6IDgsXG4gICAgICByZWRPdmVyOiA3LFxuICAgICAgcmVkRG93bjogNixcbiAgICAgIGRpc2FibGU6IDksXG4gICAgfSxcbiAgfSxcbiAgaWNvbjoge1xuICAgIGltYWdlczogWydpY29uJ10sXG4gICAgZnJhbWVzOiB7IHdpZHRoOiA0MCwgaGVpZ2h0OiA0MCB9LFxuICAgIGFuaW1hdGlvbnM6IHtcbiAgICAgIHNvdW5kOiAwLFxuICAgICAgc291bmRPZmY6IDEsXG4gICAgICByYXRpbmc6IDIsXG4gICAgICBtZW51OiAzLFxuICAgIH0sXG4gIH0sXG59O1xuXG5jb25zdCBzcHJpdGVTaGVldHMgPSB7fTtcblxuY29uc3QgYXNzZXRzTWFuYWdlciA9IHtcbiAgaW5pdCgpIHtcbiAgICBjcmVhdGVqcy5Tb3VuZC5hbHRlcm5hdGVFeHRlbnNpb25zID0gWydtcDMnXTtcbiAgICB0aGlzLnF1ZXVlID0gbmV3IGNyZWF0ZWpzLkxvYWRRdWV1ZSgpO1xuICAgIHRoaXMucXVldWUuaW5zdGFsbFBsdWdpbihjcmVhdGVqcy5Tb3VuZCk7XG4gICAgdGhpcy5xdWV1ZS5sb2FkTWFuaWZlc3QobWFuaWZlc3QpO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMucXVldWUuYWRkRXZlbnRMaXN0ZW5lcignY29tcGxldGUnLCAoKSA9PiByZXNvbHZlKCkpO1xuICAgICAgdGhpcy5xdWV1ZS5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsICgpID0+IHJlamVjdCgpKTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0UmVzdWx0KG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5xdWV1ZS5nZXRSZXN1bHQobmFtZSk7XG4gIH0sXG4gIGdldFNwcml0ZVNoZWV0KG5hbWUpIHtcbiAgICBpZiAoIXNwcml0ZVNoZWV0c1tuYW1lXSkge1xuICAgICAgY29uc3QgZGF0YSA9IHNwcml0ZVNoZWV0c0RhdGFbbmFtZV07XG5cbiAgICAgIGlmICghZGF0YSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgc3ByaXRlU2hlZXQgbmFtZScpO1xuICAgICAgfVxuXG4gICAgICBkYXRhLmltYWdlcyA9IGRhdGEuaW1hZ2VzLm1hcChpbWcgPT4gdGhpcy5nZXRSZXN1bHQoaW1nKSk7XG4gICAgICBzcHJpdGVTaGVldHNbbmFtZV0gPSBuZXcgY3JlYXRlanMuU3ByaXRlU2hlZXQoZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNwcml0ZVNoZWV0c1tuYW1lXTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFzc2V0c01hbmFnZXI7XG4iLCJjb25zdCBkYXRhTWFuYWdlciA9IHtcbiAgZ2FtZVR5cGU6IG51bGwsXG4gIGdhbWVNb2RlOiBudWxsLFxuICBzY29yZTogbnVsbCxcbiAgbWF4U2NvcmU6IG51bGwsXG4gIGhlcm9UeXBlOiAnbW9uc3RlcicsXG4gIHBvczogbnVsbCxcbiAgd2luOiBudWxsLFxuICBzcGlrZXM6IG51bGwsXG4gIGFjdGlvbnM6IG51bGwsXG4gIHVzZXI6IHtcbiAgICBpZDogbnVsbCxcbiAgICBuYW1lOiBudWxsLFxuICAgIHNleDogbnVsbCxcbiAgfSxcbiAgZW5lbXk6IG51bGwsXG4gIGZpZWxkczoge1xuICAgIG5vcm1hbDogW1swLCA5OV0sIFsxMDAsIDE5OV1dLFxuICAgIHVwc2lkZURvd246IFtbMjAwLCAyMjRdLCBbMjI1LCAyNDldXSxcbiAgICBiYWNrd2FyZDogW1syNTAsIDI3NF0sIFsyNzUsIDI5OV1dLFxuICAgIGZhc3Q6IFtbMzAwLCAzMjRdLCBbMzI1LCAzNDldXSxcbiAgICBzbG93OiBbWzM1MCwgMzc0XSwgWzM3NSwgMzk5XV0sXG4gICAgZWFydGhxdWFrZTogW1s0MDAsIDQyNF0sIFs0MjUsIDQ0OV1dLFxuICAgIGZvZzogW1s0NTAsIDQ3NF0sIFs0NzUsIDQ5OV1dLFxuICB9LFxuICBzZXQoa2V5LCB2YWx1ZSkge1xuICAgIHRoaXNba2V5XSA9IHZhbHVlO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGF0YU1hbmFnZXI7XG4iLCJpbXBvcnQgU3RhcnRTY3JlZW4gZnJvbSAnLi4vc2NyZWVucy9TdGFydFNjcmVlbic7XG5pbXBvcnQgTWFpblNjcmVlbiBmcm9tICcuLi9zY3JlZW5zL01haW5TY3JlZW4nO1xuaW1wb3J0IFBWUFNjcmVlbiBmcm9tICcuLi9zY3JlZW5zL1BWUFNjcmVlbic7XG5pbXBvcnQgRW5kU2NyZWVuIGZyb20gJy4uL3NjcmVlbnMvRW5kU2NyZWVuJztcbmltcG9ydCBSYXRpbmdTY3JlZW4gZnJvbSAnLi4vc2NyZWVucy9SYXRpbmdTY3JlZW4nO1xuXG5jb25zdCBzY3JlZW5NYW5hZ2VyID0ge1xuICBpbml0KHN0YWdlKSB7XG4gICAgdGhpcy5zdGFnZSA9IHN0YWdlO1xuICAgIHRoaXMuY3VycmVudFNjcmVlbiA9IG51bGw7XG4gICAgdGhpcy5zY3JlZW5zID0ge1xuICAgICAgU3RhcnRTY3JlZW4sXG4gICAgICBNYWluU2NyZWVuLFxuICAgICAgUFZQU2NyZWVuLFxuICAgICAgRW5kU2NyZWVuLFxuICAgICAgUmF0aW5nU2NyZWVuLFxuICAgIH07XG5cbiAgICBjcmVhdGVqcy5UaWNrZXIudGltaW5nTW9kZSA9IGNyZWF0ZWpzLlRpY2tlci5SQUY7XG4gICAgY3JlYXRlanMuVGlja2VyLmFkZEV2ZW50TGlzdGVuZXIoJ3RpY2snLCBlID0+IHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRTY3JlZW4gJiYgdGhpcy5jdXJyZW50U2NyZWVuLnRpY2spIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U2NyZWVuLnRpY2soZSk7XG4gICAgICB9XG4gICAgICB0aGlzLnN0YWdlLnVwZGF0ZShlKTtcbiAgICB9KTtcbiAgfSxcbiAgY2hhbmdlKG5hbWUpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50U2NyZWVuKSB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50U2NyZWVuLmRlc3Ryb3kpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U2NyZWVuLmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5jdXJyZW50U2NyZWVuKTtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50U2NyZWVuID0gbmV3IHRoaXMuc2NyZWVuc1tuYW1lXSh0aGlzLnN0YWdlLmNhbnZhcy53aWR0aCwgdGhpcy5zdGFnZS5jYW52YXMuaGVpZ2h0KTtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuY3VycmVudFNjcmVlbik7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBzY3JlZW5NYW5hZ2VyO1xuIiwiY29uc3Qgc2VydmVyTWFuYWdlciA9IHtcbiAgaW5pdCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gVksuaW5pdChcbiAgICAgICgpID0+IHJlc29sdmUoKSxcbiAgICAgIGUgPT4gcmVqZWN0KCd2ayBpbml0IGVycm9yJywgZSksXG4gICAgJzUuNjAnKSk7XG4gIH0sXG4gIGdldFVzZXIoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIFZLLmFwaSgndXNlcnMuZ2V0JywgeyBmaWVsZHM6ICdzZXgnIH0sIHIgPT4ge1xuICAgICAgICBpZiAoci5lcnJvcikge1xuICAgICAgICAgIHJlamVjdChyLmVycm9yKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZShyLnJlc3BvbnNlWzBdKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXQoa2V5LCBnbG9iYWwgPSAwKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gVksuYXBpKCdzdG9yYWdlLmdldCcsIHsga2V5LCBnbG9iYWwgfSwgcmVzb2x2ZSkpXG4gICAgICAudGhlbihyID0+IHtcbiAgICAgICAgaWYgKHIuZXJyb3IpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Ioci5lcnJvcik7XG4gICAgICAgIH0gZWxzZSBpZiAoci5yZXNwb25zZSA9PT0gJycpIHtcbiAgICAgICAgICAvLyBjYW50IEpTT04ucGFyc2UgZW1wdHkgc3RyaW5nIGJ1dCBuZWVkIHRvIGdldCBkZWZhdWx0IHZhbHVlXG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHIucmVzcG9uc2UpO1xuICAgICAgfSk7XG4gIH0sXG4gIHNldChrZXksIHZhbHVlLCBnbG9iYWwgPSAwKSB7XG4gICAgVksuYXBpKCdzdG9yYWdlLnNldCcsIHsga2V5LCB2YWx1ZTogSlNPTi5zdHJpbmdpZnkodmFsdWUpLCBnbG9iYWwgfSk7XG4gIH0sXG4gIHNoYXJlKG1lc3NhZ2UsIHBob3RvKSB7XG4gICAgY29uc3QgcGhvdG9zID0ge1xuICAgICAgc2luZ2xlOiAncGhvdG8tMTM1NTYzMzg4XzQ1NjIzOTAxNycsXG4gICAgICBwdnA6ICdwaG90by0xMzU1NjMzODhfNDU2MjM5MDI2JyxcbiAgICB9O1xuICAgIFZLLmFwaSgnd2FsbC5wb3N0Jywge1xuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIGF0dGFjaG1lbnRzOiBgJHtwaG90b3NbcGhvdG9dfSwgaHR0cHM6Ly92ay5jb20vYXBwNTc4MjExOGAsXG4gICAgICBzZXJ2aWNlczogJ3R3aXR0ZXInLFxuICAgIH0pO1xuICB9LFxuICBpbnZpdGUoKSB7XG4gICAgVksuY2FsbE1ldGhvZCgnc2hvd0ludml0ZUJveCcpO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgc2VydmVyTWFuYWdlcjtcbiIsImNvbnN0IHNvdW5kTWFuYWdlciA9IHtcbiAgaW5pdChlbmFibGUpIHtcbiAgICB0aGlzLmVuYWJsZWQgPSBlbmFibGU7XG4gICAgdGhpcy5iZyA9IGNyZWF0ZWpzLlNvdW5kLnBsYXkoJ2JhY2snLCB7IGxvb3A6IC0xLCB2b2x1bWU6IDAuMyB9KTtcbiAgICB0aGlzLmJnLnBhdXNlZCA9ICF0aGlzLmVuYWJsZWQ7XG4gICAgLy8gc29tZXRpbWVzIG5lZ2F0aXZlIHZhbHVlIG9jY3VycyBhbmQgdGhyb3cgZXJyb3JcbiAgICB0aGlzLmJnLnBvc2l0aW9uID0gMDtcbiAgfSxcbiAgdG9nZ2xlKCkge1xuICAgIHRoaXMuZW5hYmxlZCA9ICF0aGlzLmVuYWJsZWQ7XG4gICAgdGhpcy5iZy5wYXVzZWQgPSAhdGhpcy5lbmFibGVkO1xuICB9LFxuICBpc0VuYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZW5hYmxlZDtcbiAgfSxcbiAgcGxheShzb3VuZCkge1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgIGNyZWF0ZWpzLlNvdW5kLnBsYXkoc291bmQpO1xuICAgIH1cbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNvdW5kTWFuYWdlcjtcbiIsImltcG9ydCByYW5kb21JbnQgZnJvbSAncmFuZG9tLWludCc7XG5pbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcbmltcG9ydCBzY3JlZW5zTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zY3JlZW5zTWFuYWdlcic7XG5pbXBvcnQgc2VydmVyTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zZXJ2ZXJNYW5hZ2VyJztcbmltcG9ydCBkYXRhTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9kYXRhTWFuYWdlcic7XG5pbXBvcnQgR3VpIGZyb20gJy4uL2Rpc3BsYXkvR3VpJztcbmltcG9ydCBCdG4gZnJvbSAnLi4vZGlzcGxheS9CdG4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbmRTY3JlZW4gZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuICBjb25zdHJ1Y3Rvcih3aWR0aCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmJnID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChhc3NldHNNYW5hZ2VyLmdldFJlc3VsdCgnc3RhcnQnKSk7XG4gICAgdGhpcy5ndWkgPSBuZXcgR3VpKHdpZHRoKTtcblxuICAgIHRoaXMubWF4U2NvcmUgPSBuZXcgY3JlYXRlanMuVGV4dChg0KDQtdC60L7RgNC0OiAke2RhdGFNYW5hZ2VyLm1heFNjb3JlfSDQvGAsICcyNXB4IEd1ZXJpbGxhJywgJyMwMDAnKTtcbiAgICB0aGlzLm1heFNjb3JlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRoaXMubWF4U2NvcmUueCA9IHdpZHRoIC8gMjtcbiAgICB0aGlzLm1heFNjb3JlLnkgPSA0MDtcblxuICAgIHRoaXMuc2NvcmUgPSBuZXcgY3JlYXRlanMuVGV4dChg0KDQtdC30YPQu9GM0YLQsNGCOiAke2RhdGFNYW5hZ2VyLnNjb3JlfSDQvGAsICc0MHB4IEd1ZXJpbGxhJywgJyMwMDAnKTtcbiAgICB0aGlzLnNjb3JlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRoaXMuc2NvcmUueCA9IHdpZHRoIC8gMjtcbiAgICB0aGlzLnNjb3JlLnkgPSAxNTA7XG5cbiAgICB0aGlzLnJlcGxheUJ0biA9IG5ldyBCdG4oJ9CV0YnQtSDRgNCw0LcnKTtcbiAgICB0aGlzLnJlcGxheUJ0bi54ID0gd2lkdGggLyAyO1xuICAgIHRoaXMucmVwbGF5QnRuLnkgPSAzNTA7XG5cbiAgICB0aGlzLnNoYXJlQnRuID0gbmV3IEJ0bign0J/QvtC00LXQu9C40YLRjNGB0Y8nLCAnb3JhbmdlJyk7XG4gICAgdGhpcy5zaGFyZUJ0bi54ID0gd2lkdGggLyAyO1xuICAgIHRoaXMuc2hhcmVCdG4ueSA9IDQ0MDtcblxuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5iZywgdGhpcy5ndWksIHRoaXMubWF4U2NvcmUsIHRoaXMuc2NvcmUsIHRoaXMucmVwbGF5QnRuLCB0aGlzLnNoYXJlQnRuKTtcblxuICAgIGlmIChkYXRhTWFuYWdlci5zY29yZSA+IGRhdGFNYW5hZ2VyLm1heFNjb3JlKSB7XG4gICAgICB0aGlzLm1heFNjb3JlLnRleHQgPSBg0J/RgNC+0YjQu9GL0Lkg0YDQtdC60L7RgNC0OiAke2RhdGFNYW5hZ2VyLm1heFNjb3JlfSDQvGA7XG4gICAgICBkYXRhTWFuYWdlci5tYXhTY29yZSA9IGRhdGFNYW5hZ2VyLnNjb3JlO1xuICAgICAgc2VydmVyTWFuYWdlci5zZXQoJ21heFNjb3JlJywgZGF0YU1hbmFnZXIubWF4U2NvcmUpO1xuICAgICAgdGhpcy5zY29yZS50ZXh0ID0gYNCd0L7QstGL0Lkg0YDQtdC60L7RgNC0OiAke2RhdGFNYW5hZ2VyLm1heFNjb3JlfSDQvCFgO1xuXG4gICAgICBzZXJ2ZXJNYW5hZ2VyLmdldCgncmF0aW5nVGFibGUnLCAxKS50aGVuKHJlY2FsY1JhdGluZ1RhYmxlKTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YU1hbmFnZXIuZ2FtZVR5cGUgPT09ICdwdnAnKSB7XG4gICAgICB0aGlzLnB2cFRleHQgPSBuZXcgY3JlYXRlanMuVGV4dCgnJywgJzI1cHggR3VlcmlsbGEnLCAnIzAwMCcpO1xuICAgICAgdGhpcy5wdnBUZXh0LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgdGhpcy5wdnBUZXh0LnggPSB3aWR0aCAvIDI7XG4gICAgICB0aGlzLnB2cFRleHQueSA9IDIzMDtcbiAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5wdnBUZXh0KTtcblxuICAgICAgaWYgKGRhdGFNYW5hZ2VyLndpbikge1xuICAgICAgICB0aGlzLnB2cFRleHQudGV4dCArPSBgJHtkYXRhTWFuYWdlci5lbmVteS5uYW1lfSDQsdGL0Lske2RhdGFNYW5hZ2VyLmVuZW15LnNleCAhPT0gMiA/ICfQsCcgOiAnJ30g0L/QvtCy0LXRgNC20LXQvSR7ZGF0YU1hbmFnZXIuZW5lbXkuc2V4ICE9PSAyID8gJ9CwJyA6ICcnfWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnB2cFRleHQudGV4dCArPSBgJHtkYXRhTWFuYWdlci5lbmVteS5uYW1lfSDQv9C+0LLQtdGA0LMke2RhdGFNYW5hZ2VyLmVuZW15LnNleCAhPT0gMiA/ICfQu9CwJyA6ICcnfSDQktCw0YFgO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHJhbmdlID0gZGF0YU1hbmFnZXIuZmllbGRzW2RhdGFNYW5hZ2VyLmdhbWVNb2RlXVtkYXRhTWFuYWdlci5wb3NdO1xuICAgIGNvbnN0IGZpZWxkID0gYHB2cCR7cmFuZG9tSW50KHJhbmdlWzBdLCByYW5nZVsxXSl9YDtcbiAgICBjb25zdCByZWNvcmQgPSB7XG4gICAgICB1c2VyOiBkYXRhTWFuYWdlci51c2VyLFxuICAgICAgc3Bpa2VzOiBkYXRhTWFuYWdlci5zcGlrZXMsXG4gICAgICBhY3Rpb25zOiBkYXRhTWFuYWdlci5hY3Rpb25zLFxuICAgIH07XG5cbiAgICBzZXJ2ZXJNYW5hZ2VyLmdldChmaWVsZCwgMSkudGhlbihyID0+IHtcbiAgICAgIGNvbnNvbGUud2FybihmaWVsZCk7XG4gICAgICBjb25zb2xlLndhcm4ocmVjb3JkKTtcbiAgICAgIGNvbnNvbGUud2FybihyKTtcblxuICAgICAgaWYgKCghciB8fCByLnNwaWtlcy5sZW5ndGggKiAwLjUgPCByZWNvcmQuc3Bpa2VzLmxlbmd0aCkgJiZcbiAgICAgICAgICBKU09OLnN0cmluZ2lmeShyZWNvcmQpLmxlbmd0aCA8IDQwOTYpIHtcbiAgICAgICAgY29uc29sZS53YXJuKHRydWUpO1xuICAgICAgICBzZXJ2ZXJNYW5hZ2VyLnNldChmaWVsZCwgcmVjb3JkLCAxKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICB9XG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy5yZXBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZXBsYXkpO1xuICAgIHRoaXMuc2hhcmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaGFyZSk7XG5cbiAgICB0aGlzLm9uS2V5RG93biA9IGUgPT4ge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMzIpIHtcbiAgICAgICAgcmVwbGF5KCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd24pO1xuICB9XG4gIGRlc3Ryb3koKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bik7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVwbGF5KCkge1xuICBzd2l0Y2ggKGRhdGFNYW5hZ2VyLmdhbWVUeXBlKSB7XG4gICAgY2FzZSAnc2luZ2xlJzpcbiAgICAgIHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnTWFpblNjcmVlbicpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncHZwJzpcbiAgICAgIHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnUFZQU2NyZWVuJyk7XG4gICAgICBicmVhaztcbiAgfVxufVxuXG5mdW5jdGlvbiBzaGFyZSAoKSB7XG4gIGxldCBtZXNzYWdlID0gJyc7XG4gIHN3aXRjaCAoZGF0YU1hbmFnZXIuZ2FtZVR5cGUpIHtcbiAgICBjYXNlICdzaW5nbGUnOlxuICAgICAgbWVzc2FnZSA9IGDQryDQv9GA0L7Qu9C10YLQtdC7JHtkYXRhTWFuYWdlci51c2VyLnNleCAhPT0gMiA/ICfQsCcgOiAnJ30gJHtkYXRhTWFuYWdlci5zY29yZX0g0Lwg0LIg0LjQs9GA0LUgRmxhcHB5IE1vbnN0ZXIhYDtcbiAgICAgIGlmIChkYXRhTWFuYWdlci5zY29yZSA9PT0gZGF0YU1hbmFnZXIubWF4U2NvcmUpIHtcbiAgICAgICAgbWVzc2FnZSArPSAnXFxu0K3RgtC+INC80L7QuSDQvdC+0LLRi9C5INGA0LXQutC+0YDQtCEgJztcbiAgICAgIH1cbiAgICAgIG1lc3NhZ2UgKz0gJ1xcbtCQINGB0LrQvtC70YzQutC+INGB0LzQvtC20LXRiNGMINGC0Ys/JztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3B2cCc6XG4gICAgICBpZiAoZGF0YU1hbmFnZXIud2luKSB7XG4gICAgICAgIG1lc3NhZ2UgKz0gYCR7ZGF0YU1hbmFnZXIuZW5lbXkubmFtZX0g0LHRi9C7JHtkYXRhTWFuYWdlci5lbmVteS5zZXggIT09IDIgPyAn0LAnIDogJyd9INC/0L7QstC10YDQttC10L0ke2RhdGFNYW5hZ2VyLmVuZW15LnNleCAhPT0gMiA/ICfQsCcgOiAnJ30g0LzQvdC+0Lkg0LIg0LjQs9GA0LUgRmxhcHB5IE1vbnN0ZXIhYDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1lc3NhZ2UgKz0gYCR7ZGF0YU1hbmFnZXIuZW5lbXkubmFtZX0g0L/QvtCy0LXRgNCzJHtkYXRhTWFuYWdlci5lbmVteS5zZXggIT09IDIgPyAn0LvQsCcgOiAnJ30g0LzQtdC90Y8g0LIg0LjQs9GA0LUgRmxhcHB5IE1vbnN0ZXIsXG4gICAgICAgICAgICAgICAgICAg0L3RgyDQvdC40YfQtdCz0L4sINC10YnQtSDRg9Cy0LjQtNC40LzRgdGPLi4uYDtcbiAgICAgIH1cbiAgICAgIGlmIChkYXRhTWFuYWdlci5zY29yZSA9PT0gZGF0YU1hbmFnZXIubWF4U2NvcmUpIHtcbiAgICAgICAgbWVzc2FnZSArPSBgXFxu0JzQvtC5INC90L7QstGL0Lkg0YDQtdC60L7RgNC0ICR7ZGF0YU1hbmFnZXIuc2NvcmV9INC8IWA7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgfVxuICBzZXJ2ZXJNYW5hZ2VyLnNoYXJlKG1lc3NhZ2UsIGRhdGFNYW5hZ2VyLmdhbWVUeXBlKTtcbn1cblxuZnVuY3Rpb24gcmVjYWxjUmF0aW5nVGFibGUocmF0aW5nVGFibGUpIHtcbiAgaWYgKHJhdGluZ1RhYmxlW3JhdGluZ1RhYmxlLmxlbmd0aCAtIDFdLnNjb3JlID49IGRhdGFNYW5hZ2VyLm1heFNjb3JlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgdXNlclJhdGluZyA9IHJhdGluZ1RhYmxlLmZpbmQoZWwgPT4gZWwuaWQgPT09IGRhdGFNYW5hZ2VyLnVzZXIuaWQpO1xuXG4gIGlmICh1c2VyUmF0aW5nKSB7XG4gICAgdXNlclJhdGluZy5zY29yZSA9IGRhdGFNYW5hZ2VyLm1heFNjb3JlO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IG5ld1JhdGluZyA9IHtcbiAgICAgIGlkOiBkYXRhTWFuYWdlci51c2VyLmlkLFxuICAgICAgbmFtZTogZGF0YU1hbmFnZXIudXNlci5uYW1lLFxuICAgICAgc2NvcmU6IGRhdGFNYW5hZ2VyLm1heFNjb3JlLFxuICAgIH07XG4gICAgaWYgKHJhdGluZ1RhYmxlLmxlbmd0aCA8IDEwKSB7XG4gICAgICByYXRpbmdUYWJsZS5wdXNoKG5ld1JhdGluZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJhdGluZ1RhYmxlW3JhdGluZ1RhYmxlLmxlbmd0aCAtIDFdID0gbmV3UmF0aW5nO1xuICAgIH1cbiAgfVxuXG4gIHJhdGluZ1RhYmxlLnNvcnQoKGEsIGIpID0+IGIuc2NvcmUgLSBhLnNjb3JlKTtcbiAgc2VydmVyTWFuYWdlci5zZXQoJ3JhdGluZ1RhYmxlJywgcmF0aW5nVGFibGUsIDEpO1xufVxuIiwiaW1wb3J0IHJhbmRvbUludCBmcm9tICdyYW5kb20taW50JztcbmltcG9ydCBzY3JlZW5zTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zY3JlZW5zTWFuYWdlcic7XG5pbXBvcnQgZGF0YU1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvZGF0YU1hbmFnZXInO1xuaW1wb3J0IEJhY2tncm91bmQgZnJvbSAnLi4vZGlzcGxheS9CYWNrZ3JvdW5kJztcbmltcG9ydCBIZXJvIGZyb20gJy4uL2Rpc3BsYXkvSGVybyc7XG5pbXBvcnQgU3Bpa2UgZnJvbSAnLi4vZGlzcGxheS9TcGlrZSc7XG5pbXBvcnQgU2hhZG93T3ZlcmxheSBmcm9tICcuLi9kaXNwbGF5L1NoYWRvd092ZXJsYXknO1xuXG5jb25zdCBHUk9VTkRfSEVJR0hUID0gODA7XG5jb25zdCBTVEFSVF9TUEVFRCA9IDU7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5TY3JlZW4gZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcblxuICAgIHRoaXMuc3BlZWQgPSBTVEFSVF9TUEVFRDtcbiAgICB0aGlzLnNwaWtlU2NhbGUgPSAwLjc7XG4gICAgdGhpcy5zdGVwID0gMDtcbiAgICB0aGlzLmRpc3RhbmNlID0gMDtcblxuICAgIGRhdGFNYW5hZ2VyLmdhbWVUeXBlID0gJ3NpbmdsZSc7XG4gICAgZGF0YU1hbmFnZXIuYWN0aW9ucyA9IHt9O1xuICAgIGRhdGFNYW5hZ2VyLnNwaWtlcyA9IFtdO1xuICAgIGRhdGFNYW5hZ2VyLnBvcyA9IDA7XG5cbiAgICB0aGlzLnNoYWRvd092ZXJsYXkgPSBuZXcgU2hhZG93T3ZlcmxheSh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgdGhpcy5jcmVhdGVCZygpO1xuICAgIHRoaXMuY3JlYXRlU3Bpa2VzKCk7XG4gICAgdGhpcy5jcmVhdGVIZXJvKCk7XG4gICAgdGhpcy5jcmVhdGVIdWQoKTtcblxuICAgIHRoaXMucGF1c2UoJ9Cf0YDQvtCx0LXQuyAtINCy0LfQvNCw0YUg0LrRgNGL0LvRjNGP0LzQuCwgZXNjIC0g0L/QsNGD0LfQsCcpO1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuXG4gICAgdGhpcy50aXRsZSA9IG5ldyBjcmVhdGVqcy5UZXh0KCcnLCAnNjVweCBHdWVyaWxsYScsICcjZmZmJyk7XG4gICAgdGhpcy50aXRsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICB0aGlzLnRpdGxlLnRleHRCYXNlbGluZSA9ICdtaWRkbGUnO1xuICAgIHRoaXMudGl0bGUueCA9IHdpZHRoIC8gMjtcbiAgICB0aGlzLnRpdGxlLnkgPSAyMjU7XG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLnRpdGxlKTtcblxuICAgIC8vIG5vcm1hbCBtb2RlIG9uIGZpcnN0IGZseVxuICAgIHN3aXRjaCAoZGF0YU1hbmFnZXIubWF4U2NvcmUgPyByYW5kb21JbnQoMTApIDogMTApIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgZGF0YU1hbmFnZXIuZ2FtZU1vZGUgPSAndXBzaWRlRG93bic7XG4gICAgICAgIHRoaXMudGl0bGUudGV4dCA9ICfQktCy0LXRgNGFINC90L7Qs9Cw0LzQuCEnO1xuICAgICAgICB0aGlzLnRpdGxlLnkgPSBoZWlnaHQgLSB0aGlzLnRpdGxlLnk7XG4gICAgICAgIHRoaXMuc2hhZG93T3ZlcmxheS5zZXRUZXh0KCfQnNC40YAg0L/QtdGA0LXQstC10YDQvdGD0LvRgdGPJyk7XG4gICAgICAgIHRoaXMuaHVkRGlzdGFuY2UueSA9IGhlaWdodCAtIHRoaXMuaHVkRGlzdGFuY2UueTtcbiAgICAgICAgdGhpcy5odWREaXN0YW5jZS5jb2xvciA9ICcjZmZmJztcbiAgICAgICAgdGhpcy55ID0gdGhpcy5zaGFkb3dPdmVybGF5LnkgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuc2NhbGVZID0gdGhpcy5zaGFkb3dPdmVybGF5LnNjYWxlWSA9IHRoaXMudGl0bGUuc2NhbGVZID0gdGhpcy5odWREaXN0YW5jZS5zY2FsZVkgPSAtMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIGRhdGFNYW5hZ2VyLmdhbWVNb2RlID0gJ2JhY2t3YXJkJztcbiAgICAgICAgdGhpcy50aXRsZS50ZXh0ID0gJ9Cj0YDQsNCz0LDQvSEnO1xuICAgICAgICB0aGlzLnNoYWRvd092ZXJsYXkuc2V0VGV4dCgn0J/RgtC40YbRgyDRgdC00YPQstCw0LXRgiDQvdCw0LfQsNC0Jyk7XG4gICAgICAgIHRoaXMudGl0bGUueCA9IHdpZHRoIC0gdGhpcy50aXRsZS54O1xuICAgICAgICB0aGlzLmh1ZERpc3RhbmNlLnggPSB3aWR0aCAtIHRoaXMuaHVkRGlzdGFuY2UueDtcbiAgICAgICAgdGhpcy54ID0gdGhpcy5zaGFkb3dPdmVybGF5LnggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5zY2FsZVggPSB0aGlzLmhlcm8uc2NhbGVYID0gdGhpcy5zaGFkb3dPdmVybGF5LnNjYWxlWCA9IHRoaXMudGl0bGUuc2NhbGVYID0gdGhpcy5odWREaXN0YW5jZS5zY2FsZVggPSAtMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGRhdGFNYW5hZ2VyLmdhbWVNb2RlID0gJ2Zhc3QnO1xuICAgICAgICB0aGlzLnRpdGxlLnRleHQgPSAn0J/QvtC/0YPRgtC90YvQuSDQstC10YLQtdGAISc7XG4gICAgICAgIHRoaXMuc2hhZG93T3ZlcmxheS5zZXRUZXh0KCfQodC60L7RgNC+0YHRgtGMINC/0L7Qu9C10YLQsCDQv9C+0LLRi9GI0LXQvdCwJyk7XG4gICAgICAgIHRoaXMuc3BlZWQgKz0gMjtcbiAgICAgICAgdGhpcy5zcGlrZVNjYWxlIC09IDAuMjU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBkYXRhTWFuYWdlci5nYW1lTW9kZSA9ICdzbG93JztcbiAgICAgICAgdGhpcy50aXRsZS50ZXh0ID0gJ9CS0YHRgtGA0LXRh9C90YvQuSDQstC10YLQtdGAISc7XG4gICAgICAgIHRoaXMuc2hhZG93T3ZlcmxheS5zZXRUZXh0KCfQodC60L7RgNC+0YHRgtGMINC/0L7Qu9C10YLQsCDRgdC90LjQttC10L3QsCcpO1xuICAgICAgICB0aGlzLnNwZWVkIC09IDE7XG4gICAgICAgIHRoaXMuc3Bpa2VTY2FsZSArPSAwLjA3NTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIGRhdGFNYW5hZ2VyLmdhbWVNb2RlID0gJ2VhcnRocXVha2UnO1xuICAgICAgICB0aGlzLnRpdGxlLnRleHQgPSAn0JfQtdC80LvQtdGC0YDRj9GB0LXQvdC40LUhJztcbiAgICAgICAgdGhpcy5zaGFkb3dPdmVybGF5LnNldFRleHQoJ9Ca0L7Qu9GM0Y8g0YDQsNGB0LrQsNGH0LjQstCw0Y7RgtGB0Y8nKTtcbiAgICAgICAgdGhpcy5zcGlrZXMuZm9yRWFjaCgoc3Bpa2UsIGkpID0+IHtcbiAgICAgICAgICBzcGlrZS50d2VlbiA9IGNyZWF0ZWpzLlR3ZWVuLmdldChzcGlrZSwgeyBsb29wOiB0cnVlLCBwYXVzZWQ6IHRydWUgfSlcbiAgICAgICAgICAgIC50byh7IHNrZXdYOiA5IH0sIDkwMCArIGkgKiAxMDApXG4gICAgICAgICAgICAudG8oeyBza2V3WDogLTkgfSwgMTgwMCArIGkgKiAyMDApXG4gICAgICAgICAgICAudG8oeyBza2V3WDogMCB9LCA5MDAgKyBpICogMTAwKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA1OlxuICAgICAgICBkYXRhTWFuYWdlci5nYW1lTW9kZSA9ICdmb2cnO1xuICAgICAgICB0aGlzLnRpdGxlLnRleHQgPSAn0KLRg9C80LDQvSEnO1xuICAgICAgICB0aGlzLnNoYWRvd092ZXJsYXkuc2V0VGV4dCgn0JLQuNC00LjQvNC+0YHRgtGMINGB0L3QuNC20LXQvdCwJyk7XG4gICAgICAgIHRoaXMuc3BlZWQgLT0gMS4yO1xuICAgICAgICB0aGlzLmZvZyA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICAgICAgICB0aGlzLmZvZy5ncmFwaGljc1xuICAgICAgICAgIC5iZWdpblJhZGlhbEdyYWRpZW50RmlsbChcbiAgICAgICAgICAgIFsncmdiYSgyNTUsIDI1NSwgMjU1LCAwKScsICdyZ2JhKDI1NSwgMjU1LCAyNTUsIC42NSknLCAncmdiYSgyNTUsIDI1NSwgMjU1LCAuODUpJywgJ3JnYmEoMjU1LCAyNTUsIDI1NSwgLjk3KScsICcjZmZmJ10sXG4gICAgICAgICAgICBbMCwgMC41LCAwLjcsIDAuOSwgMV0sIDAsIDAsIDAsIDAsIDAsIDM4MClcbiAgICAgICAgICAuZHJhd1JlY3QoLXRoaXMud2lkdGggLyAyLCAtdGhpcy5oZWlnaHQsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0ICogMik7XG4gICAgICAgIHRoaXMuZm9nLmNhY2hlKC10aGlzLndpZHRoIC8gMiwgLXRoaXMuaGVpZ2h0LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCAqIDIpO1xuICAgICAgICB0aGlzLmZvZy54ID0gdGhpcy5oZXJvLng7XG4gICAgICAgIHRoaXMuZm9nLnkgPSB0aGlzLmhlcm8ueTtcbiAgICAgICAgdGhpcy5mb2cuYWRkRXZlbnRMaXN0ZW5lcigndGljaycsICgpID0+IHtcbiAgICAgICAgICBpZiAoIXRoaXMuaGVyby5kZWFkKSB7XG4gICAgICAgICAgICB0aGlzLmZvZy55ID0gdGhpcy5oZXJvLnk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLmZvZywgdGhpcy5odWREaXN0YW5jZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgZGF0YU1hbmFnZXIuZ2FtZU1vZGUgPSAnbm9ybWFsJztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMuc3Bpa2VzLmZvckVhY2goc3Bpa2UgPT4gdGhpcy5yZXNldFNwaWtlKHNwaWtlKSk7XG4gICAgY29uc29sZS5sb2coZGF0YU1hbmFnZXIuZ2FtZU1vZGUpO1xuICB9XG4gIGNyZWF0ZUJnKCkge1xuICAgIHRoaXMuYmdTa3kgPSBuZXcgQmFja2dyb3VuZCgnc2t5JywgdGhpcy53aWR0aCk7XG4gICAgdGhpcy5iZ01vdW50YWluID0gbmV3IEJhY2tncm91bmQoJ21vdW50YWluJywgdGhpcy53aWR0aCk7XG4gICAgdGhpcy5iZ0dyb3VuZCA9IG5ldyBCYWNrZ3JvdW5kKCdncm91bmQnLCB0aGlzLndpZHRoKTtcbiAgICB0aGlzLmJnU2t5LnkgPSB0aGlzLmJnTW91bnRhaW4ueSA9IHRoaXMuYmdHcm91bmQueSA9IHRoaXMuaGVpZ2h0O1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5iZ1NreSwgdGhpcy5iZ01vdW50YWluLCB0aGlzLmJnR3JvdW5kKTtcbiAgfVxuICBjcmVhdGVTcGlrZXMoKSB7XG4gICAgdGhpcy5zcGlrZXMgPSBbbmV3IFNwaWtlKCksIG5ldyBTcGlrZSgpXTtcbiAgICB0aGlzLnNwaWtlc1swXS54ID0gLXRoaXMuc3Bpa2VzWzBdLmJvdW5kcy53aWR0aCAvIDI7XG4gICAgdGhpcy5zcGlrZXNbMV0ueCA9IHRoaXMud2lkdGggLyAyO1xuICAgIHRoaXMuYWRkQ2hpbGQoLi4udGhpcy5zcGlrZXMpO1xuICB9XG4gIGNyZWF0ZUhlcm8oKSB7XG4gICAgdGhpcy5oZXJvID0gbmV3IEhlcm8oZGF0YU1hbmFnZXIuaGVyb1R5cGUpO1xuICAgIHRoaXMuaGVyby54ID0gdGhpcy53aWR0aCAvIDI7XG4gICAgdGhpcy5oZXJvLnkgPSAxOTA7XG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmhlcm8pO1xuICB9XG4gIGNyZWF0ZUh1ZCgpIHtcbiAgICB0aGlzLmh1ZERpc3RhbmNlID0gbmV3IGNyZWF0ZWpzLlRleHQoJzAg0LwnLCAnMjVweCBHdWVyaWxsYScsICcjMDAwJyk7XG4gICAgdGhpcy5odWREaXN0YW5jZS54ID0gMjA7XG4gICAgdGhpcy5odWREaXN0YW5jZS55ID0gMTU7XG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmh1ZERpc3RhbmNlKTtcbiAgfVxuICByZXNldFNwaWtlKHNwaWtlKSB7XG4gICAgc3Bpa2Uuc2NhbGVZID0gKyh0aGlzLnNwaWtlU2NhbGUgKyBNYXRoLnJhbmRvbSgpICogMC40NSkudG9GaXhlZCgyKTtcbiAgICBzcGlrZS54ICs9IHRoaXMud2lkdGggKyBzcGlrZS5ib3VuZHMud2lkdGg7XG4gICAgaWYgKE1hdGgucmFuZG9tKCkgPiAwLjUpIHtcbiAgICAgIHNwaWtlLnkgPSB0aGlzLmhlaWdodCAtIEdST1VORF9IRUlHSFQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNwaWtlLnkgPSAwO1xuICAgICAgc3Bpa2Uuc2NhbGVZID0gLXNwaWtlLnNjYWxlWTtcbiAgICB9XG4gICAgZGF0YU1hbmFnZXIuc3Bpa2VzLnB1c2goc3Bpa2Uuc2NhbGVZKTtcbiAgfVxuICBwYXVzZSh0ZXh0KSB7XG4gICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuICAgIHRoaXMuc2hhZG93T3ZlcmxheS5zZXRUZXh0KHRleHQpO1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5zaGFkb3dPdmVybGF5KTtcbiAgfVxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmhhbmRsZUFjdGlvbigpKTtcbiAgICB0aGlzLm9uS2V5RG93biA9IGUgPT4ge1xuICAgICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSAzMjpcbiAgICAgICAgICB0aGlzLmhhbmRsZUFjdGlvbigpO1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyNzpcbiAgICAgICAgICB0aGlzLnRvZ2dsZVBhdXNlKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd24pO1xuICB9XG4gIGhhbmRsZUFjdGlvbigpIHtcbiAgICBpZiAodGhpcy5wYXVzZWQpIHtcbiAgICAgIGlmICh0aGlzLnRpdGxlKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy50aXRsZSk7XG4gICAgICAgIHRoaXMudGl0bGUgPSBudWxsO1xuICAgICAgfVxuICAgICAgdGhpcy50b2dnbGVQYXVzZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhlcm8uZmxhcCgpO1xuICAgICAgZGF0YU1hbmFnZXIuYWN0aW9uc1t0aGlzLnN0ZXBdID0gMTtcbiAgICB9XG4gIH1cbiAgdG9nZ2xlUGF1c2UoKSB7XG4gICAgaWYgKHRoaXMucGF1c2VkKSB7XG4gICAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLnNoYWRvd092ZXJsYXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhdXNlKCfQndCw0LbQvNC40YLQtSDQv9GA0L7QsdC10Lsg0LjQu9C4IGVzYycpO1xuICAgIH1cbiAgICBpZiAoZGF0YU1hbmFnZXIuZ2FtZU1vZGUgPT09ICdlYXJ0aHF1YWtlJykge1xuICAgICAgdGhpcy5zcGlrZXMuZm9yRWFjaChzcGlrZSA9PiBzcGlrZS50d2Vlbi5zZXRQYXVzZWQodGhpcy5wYXVzZWQpKTtcbiAgICB9XG4gIH1cbiAgbW92ZVdvcmxkKCkge1xuICAgIGlmICh0aGlzLmhlcm8uZGVhZCkge1xuICAgICAgdGhpcy5oZXJvLnggKz0gdGhpcy5zcGVlZCAqIDAuNTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb3ZlU3Bpa2VzKHRoaXMuc3BlZWQpO1xuICAgICAgdGhpcy5iZ1NreS5tb3ZlKHRoaXMuc3BlZWQgKiAwLjEpO1xuICAgICAgdGhpcy5iZ01vdW50YWluLm1vdmUodGhpcy5zcGVlZCAqIDAuMyk7XG4gICAgICB0aGlzLmJnR3JvdW5kLm1vdmUodGhpcy5zcGVlZCk7XG5cbiAgICAgIHRoaXMuZGlzdGFuY2UgKz0gdGhpcy5zcGVlZDtcbiAgICAgIGRhdGFNYW5hZ2VyLnNjb3JlID0gTWF0aC5mbG9vcih0aGlzLmRpc3RhbmNlIC8gMjUpO1xuICAgICAgdGhpcy5odWREaXN0YW5jZS50ZXh0ID0gYCR7ZGF0YU1hbmFnZXIuc2NvcmV9INC8YDtcbiAgICB9XG4gIH1cbiAgbW92ZVNwaWtlcygpIHtcbiAgICB0aGlzLnNwaWtlcy5mb3JFYWNoKHNwaWtlID0+IHtcbiAgICAgIHNwaWtlLnggLT0gdGhpcy5zcGVlZDtcbiAgICAgIGlmIChzcGlrZS54IDwgLXNwaWtlLmJvdW5kcy53aWR0aCAvIDIpIHtcbiAgICAgICAgdGhpcy5yZXNldFNwaWtlKHNwaWtlKTtcbiAgICAgICAgdGhpcy5zcGVlZCArPSAwLjA0O1xuICAgICAgfVxuICAgICAgaWYgKG5kZ21yLmNoZWNrUGl4ZWxDb2xsaXNpb24odGhpcy5oZXJvLCBzcGlrZSkpIHtcbiAgICAgICAgdGhpcy5oZXJvLmRpZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIG1vdmVIZXJvKCkge1xuICAgIHRoaXMuaGVyby5tb3ZlKCk7XG4gICAgaWYgKHRoaXMuaGVyby55IDwgMCkge1xuICAgICAgdGhpcy5oZXJvLnZZID0gMDtcbiAgICAgIHRoaXMuaGVyby55ID0gMDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaGVyby55ID4gdGhpcy5oZWlnaHQgKyB0aGlzLmhlcm8uYm91bmRzLmhlaWdodCAvIDIpIHtcbiAgICAgIHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnRW5kU2NyZWVuJyk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmhlcm8ueSA+IHRoaXMuaGVpZ2h0IC0gKEdST1VORF9IRUlHSFQgKyB0aGlzLmhlcm8uYm91bmRzLmhlaWdodCAvIDIpKSB7XG4gICAgICB0aGlzLmhlcm8uZGllKCk7XG4gICAgfVxuICB9XG4gIHRpY2soKSB7XG4gICAgaWYgKHRoaXMucGF1c2VkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMubW92ZVdvcmxkKCk7XG4gICAgdGhpcy5tb3ZlSGVybygpO1xuICAgIHRoaXMuc3RlcCArPSAxO1xuICB9XG4gIGRlc3Ryb3koKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bik7XG4gIH1cbn1cbiIsImltcG9ydCByYW5kb21JbnQgZnJvbSAncmFuZG9tLWludCc7XG5pbXBvcnQgc2NyZWVuc01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc2NyZWVuc01hbmFnZXInO1xuaW1wb3J0IHNlcnZlck1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc2VydmVyTWFuYWdlcic7XG5pbXBvcnQgZGF0YU1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvZGF0YU1hbmFnZXInO1xuaW1wb3J0IEJhY2tncm91bmQgZnJvbSAnLi4vZGlzcGxheS9CYWNrZ3JvdW5kJztcbmltcG9ydCBIZXJvIGZyb20gJy4uL2Rpc3BsYXkvSGVybyc7XG5pbXBvcnQgU3Bpa2UgZnJvbSAnLi4vZGlzcGxheS9TcGlrZSc7XG5pbXBvcnQgQnRuIGZyb20gJy4uL2Rpc3BsYXkvQnRuJztcblxuY29uc3QgR1JPVU5EX0hFSUdIVCA9IDgwO1xuY29uc3QgU1RBUlRfU1BFRUQgPSA1O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluU2NyZWVuIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICB0aGlzLnNwZWVkID0gU1RBUlRfU1BFRUQ7XG4gICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG5cbiAgICB0aGlzLmNyZWF0ZUJnKCk7XG5cbiAgICBjb25zdCB3YXRpbmdUZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoJ9CY0LTQtdGCINC/0L7QtNCx0L7RgCDRgdC+0L/QtdGA0L3QuNC60LAnLCAnMzVweCBHdWVyaWxsYScsICcjMDAwJyk7XG4gICAgd2F0aW5nVGV4dC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICB3YXRpbmdUZXh0LnggPSB3aWR0aCAvIDI7XG4gICAgd2F0aW5nVGV4dC55ID0gMTcwO1xuXG4gICAgY29uc3QgY2FuY2VsQnRuID0gbmV3IEJ0bign0J7RgtC80LXQvdCwJywgJ29yYW5nZScpO1xuICAgIGNhbmNlbEJ0bi54ID0gd2lkdGggLyAyO1xuICAgIGNhbmNlbEJ0bi55ID0gMzQwO1xuICAgIGNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnU3RhcnRTY3JlZW4nKSk7XG5cbiAgICB0aGlzLmFkZENoaWxkKHdhdGluZ1RleHQsIGNhbmNlbEJ0bik7XG5cbiAgICBkYXRhTWFuYWdlci5wb3MgPSByYW5kb21JbnQoMSk7XG4gICAgY29uc3QgZW5lbXlSYW5nZSA9IGRhdGFNYW5hZ2VyLmZpZWxkc1tkYXRhTWFuYWdlci5nYW1lTW9kZV1bMSAtIGRhdGFNYW5hZ2VyLnBvc107XG4gICAgY29uc3QgZW5lbXlGaWVsZCA9IGBwdnAke3JhbmRvbUludChlbmVteVJhbmdlWzBdLCBlbmVteVJhbmdlWzFdKX1gO1xuICAgIGNvbnNvbGUud2FybihlbmVteUZpZWxkKTtcblxuICAgIFByb21pc2UuYWxsKFtcbiAgICAgIHNlcnZlck1hbmFnZXIuZ2V0KGVuZW15RmllbGQsIDEpLnRoZW4ociA9PiB0aGlzLmluaXREYXRhKHIpKSxcbiAgICAgIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBNYXRoLnJhbmRvbSgpICogMjAwMCArIDUwMCkpLFxuICAgIF0pLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5pbml0KCk7XG4gICAgICB0aGlzLnJlbW92ZUNoaWxkKHdhdGluZ1RleHQsIGNhbmNlbEJ0bik7XG4gICAgfSkuY2F0Y2goZSA9PiB7XG4gICAgICB3YXRpbmdUZXh0LnRleHQgPSAnUFZQINCy0YDQtdC80LXQvdC90L4g0L3QtdC00L7RgdGC0YPQv9C90L4gOignO1xuICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICB9KTtcblxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICB9XG4gIGluaXREYXRhKHJlY29yZCkge1xuICAgIGRhdGFNYW5hZ2VyLmdhbWVUeXBlID0gJ3B2cCc7XG4gICAgZGF0YU1hbmFnZXIuZ2FtZU1vZGUgPSAnbm9ybWFsJztcbiAgICBkYXRhTWFuYWdlci53aW4gPSBmYWxzZTtcbiAgICBkYXRhTWFuYWdlci5hY3Rpb25zID0ge307XG4gICAgZGF0YU1hbmFnZXIuc3Bpa2VzID0gW107XG4gICAgZGF0YU1hbmFnZXIuZW5lbXkgPSByZWNvcmQudXNlcjtcbiAgICB0aGlzLmVuZW15U3Bpa2VzID0gcmVjb3JkLnNwaWtlcztcbiAgICB0aGlzLmVuZW15QWN0aW9ucyA9IHJlY29yZC5hY3Rpb25zO1xuICAgIGlmIChkYXRhTWFuYWdlci51c2VyLmlkID09PSByZWNvcmQudXNlci5pZCkge1xuICAgICAgZGF0YU1hbmFnZXIuZW5lbXkubmFtZSA9ICfQn9GA0LjQt9GA0LDRh9C90YvQuSDQv9GC0LjRhic7XG4gICAgfVxuICB9XG4gIGluaXQoKSB7XG4gICAgdGhpcy5zcGlrZUluZGV4ID0gMDtcbiAgICB0aGlzLnN0ZXAgPSAwO1xuICAgIHRoaXMuZGlzdGFuY2UgPSAwO1xuXG4gICAgdGhpcy5jcmVhdGVTcGlrZXMoKTtcbiAgICB0aGlzLmNyZWF0ZUh1ZCgpO1xuXG4gICAgY29uc3QgY291bnRlciA9IG5ldyBjcmVhdGVqcy5UZXh0KDMsICcxMjVweCBHdWVyaWxsYScsICcjMDAwJyk7XG4gICAgY291bnRlci50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICBjb3VudGVyLnggPSB0aGlzLndpZHRoIC8gMjtcbiAgICBjb3VudGVyLnkgPSAzMTA7XG5cbiAgICB0aGlzLmFkZENoaWxkKGNvdW50ZXIpO1xuXG4gICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBjb3VudGVyLnRleHQgLT0gMTtcbiAgICAgIGlmIChjb3VudGVyLnRleHQgPCAwKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2hpbGQoY291bnRlcik7XG4gICAgICAgIHRoaXMuc3RhcnRlZCA9IHRydWU7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgfVxuICAgIH0sIDEwMDApO1xuXG4gICAgdGhpcy5oZXJvID0gdGhpcy5jcmVhdGVIZXJvKGRhdGFNYW5hZ2VyLnBvcywgZGF0YU1hbmFnZXIudXNlci5uYW1lKTtcbiAgICB0aGlzLmVuZW15ID0gdGhpcy5jcmVhdGVIZXJvKDEgLSBkYXRhTWFuYWdlci5wb3MsIGRhdGFNYW5hZ2VyLmVuZW15Lm5hbWUpO1xuICAgIHRoaXMuZW5lbXkuYWxwaGEgPSAwLjU7XG4gIH1cbiAgY3JlYXRlQmcoKSB7XG4gICAgdGhpcy5iZ1NreSA9IG5ldyBCYWNrZ3JvdW5kKCdza3knLCB0aGlzLndpZHRoKTtcbiAgICB0aGlzLmJnTW91bnRhaW4gPSBuZXcgQmFja2dyb3VuZCgnbW91bnRhaW4nLCB0aGlzLndpZHRoKTtcbiAgICB0aGlzLmJnR3JvdW5kID0gbmV3IEJhY2tncm91bmQoJ2dyb3VuZCcsIHRoaXMud2lkdGgpO1xuICAgIHRoaXMuYmdTa3kueSA9IHRoaXMuYmdNb3VudGFpbi55ID0gdGhpcy5iZ0dyb3VuZC55ID0gdGhpcy5oZWlnaHQ7XG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmJnU2t5LCB0aGlzLmJnTW91bnRhaW4sIHRoaXMuYmdHcm91bmQpO1xuICB9XG4gIGNyZWF0ZVNwaWtlcygpIHtcbiAgICB0aGlzLnNwaWtlcyA9IFtuZXcgU3Bpa2UoKSwgbmV3IFNwaWtlKCldO1xuICAgIHRoaXMuc3Bpa2VzWzBdLnggPSAtdGhpcy5zcGlrZXNbMF0uYm91bmRzLndpZHRoIC8gMjtcbiAgICB0aGlzLnNwaWtlc1sxXS54ID0gdGhpcy53aWR0aCAvIDI7XG4gICAgdGhpcy5zcGlrZXMuZm9yRWFjaChzcGlrZSA9PiB0aGlzLnJlc2V0U3Bpa2Uoc3Bpa2UpKTtcbiAgICB0aGlzLmFkZENoaWxkKC4uLnRoaXMuc3Bpa2VzKTtcbiAgfVxuICBjcmVhdGVIZXJvKHBvcywgbmFtZSkge1xuICAgIGNvbnN0IGhlcm8gPSBuZXcgSGVybyhkYXRhTWFuYWdlci5oZXJvVHlwZSk7XG4gICAgaGVyby54ID0gdGhpcy53aWR0aCAvIDIgLSAxODAgKiBwb3M7XG4gICAgaGVyby55ID0gMTkwIC0gNTAgKiBwb3M7XG5cbiAgICBjb25zdCBoZXJvTmFtZSA9IG5ldyBjcmVhdGVqcy5UZXh0KG5hbWUsICcyNXB4IEd1ZXJpbGxhJywgJyMwMDAnKTtcbiAgICBoZXJvTmFtZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICBoZXJvTmFtZS55ID0gaGVyby55IC0gMTAwO1xuICAgIGhlcm9OYW1lLnggPSBoZXJvLng7XG4gICAgdGhpcy5hZGRDaGlsZChoZXJvLCBoZXJvTmFtZSk7XG5cbiAgICBjcmVhdGVqcy5Ud2Vlbi5nZXQoaGVyb05hbWUpLndhaXQoMjQwMCkudG8oeyBhbHBoYTogMCB9LCA4MDApXG4gICAgICAuY2FsbCgoKSA9PiB0aGlzLnJlbW92ZUNoaWxkKGhlcm9OYW1lKSk7XG5cbiAgICByZXR1cm4gaGVybztcbiAgfVxuICBjcmVhdGVIdWQoKSB7XG4gICAgdGhpcy5odWREaXN0YW5jZSA9IG5ldyBjcmVhdGVqcy5UZXh0KCcwINC8JywgJzI1cHggR3VlcmlsbGEnLCAnIzAwMCcpO1xuICAgIHRoaXMuaHVkRGlzdGFuY2UueCA9IDIwO1xuICAgIHRoaXMuaHVkRGlzdGFuY2UueSA9IDE1O1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5odWREaXN0YW5jZSk7XG4gIH1cbiAgcmVzZXRTcGlrZShzcGlrZSkge1xuICAgIHNwaWtlLnggKz0gdGhpcy53aWR0aCArIHNwaWtlLmJvdW5kcy53aWR0aDtcblxuICAgIGlmICh0aGlzLmVuZW15U3Bpa2VzW3RoaXMuc3Bpa2VJbmRleF0pIHtcbiAgICAgIHNwaWtlLnNjYWxlWSA9IHRoaXMuZW5lbXlTcGlrZXNbdGhpcy5zcGlrZUluZGV4XTtcbiAgICAgIHRoaXMuc3Bpa2VJbmRleCArPSAxO1xuXG4gICAgICBpZiAoc3Bpa2Uuc2NhbGVZID4gMCkge1xuICAgICAgICBzcGlrZS55ID0gdGhpcy5oZWlnaHQgLSBHUk9VTkRfSEVJR0hUO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3Bpa2UueSA9IDA7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHNwaWtlLnNjYWxlWSA9ICsoMC43ICsgTWF0aC5yYW5kb20oKSAqIDAuNDUpLnRvRml4ZWQoMik7XG4gICAgICBpZiAoTWF0aC5yYW5kb20oKSA+IDAuNSkge1xuICAgICAgICBzcGlrZS55ID0gdGhpcy5oZWlnaHQgLSBHUk9VTkRfSEVJR0hUO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3Bpa2UueSA9IDA7XG4gICAgICAgIHNwaWtlLnNjYWxlWSA9IC1zcGlrZS5zY2FsZVk7XG4gICAgICB9XG4gICAgfVxuICAgIGRhdGFNYW5hZ2VyLnNwaWtlcy5wdXNoKHNwaWtlLnNjYWxlWSk7XG4gIH1cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5oYW5kbGVBY3Rpb24oKSk7XG4gICAgdGhpcy5vbktleURvd24gPSBlID0+IHtcbiAgICAgIHRoaXMuaGFuZGxlQWN0aW9uKCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd24pO1xuICB9XG4gIGhhbmRsZUFjdGlvbigpIHtcbiAgICBpZiAoIXRoaXMuc3RhcnRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmhlcm8uZmxhcCgpO1xuICAgIGRhdGFNYW5hZ2VyLmFjdGlvbnNbdGhpcy5zdGVwXSA9IDE7XG4gIH1cbiAgbW92ZVdvcmxkKCkge1xuICAgIHRoaXMubW92ZVNwaWtlcyh0aGlzLnNwZWVkKTtcbiAgICB0aGlzLmJnU2t5Lm1vdmUodGhpcy5zcGVlZCAqIDAuMSk7XG4gICAgdGhpcy5iZ01vdW50YWluLm1vdmUodGhpcy5zcGVlZCAqIDAuMyk7XG4gICAgdGhpcy5iZ0dyb3VuZC5tb3ZlKHRoaXMuc3BlZWQpO1xuXG4gICAgdGhpcy5kaXN0YW5jZSArPSB0aGlzLnNwZWVkO1xuICAgIGRhdGFNYW5hZ2VyLnNjb3JlID0gTWF0aC5mbG9vcih0aGlzLmRpc3RhbmNlIC8gMjUpO1xuICAgIHRoaXMuaHVkRGlzdGFuY2UudGV4dCA9IGAke2RhdGFNYW5hZ2VyLnNjb3JlfSDQvGA7XG4gIH1cbiAgbW92ZVNwaWtlcygpIHtcbiAgICB0aGlzLnNwaWtlcy5mb3JFYWNoKHNwaWtlID0+IHtcbiAgICAgIHNwaWtlLnggLT0gdGhpcy5zcGVlZDtcbiAgICAgIGlmIChzcGlrZS54IDwgLXNwaWtlLmJvdW5kcy53aWR0aCAvIDIpIHtcbiAgICAgICAgdGhpcy5yZXNldFNwaWtlKHNwaWtlKTtcbiAgICAgICAgdGhpcy5zcGVlZCArPSAwLjA0O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIG1vdmVIZXJvKGhlcm8pIHtcbiAgICBoZXJvLm1vdmUoKTtcbiAgICBpZiAoaGVyby55IDwgMCkge1xuICAgICAgaGVyby52WSA9IDA7XG4gICAgICBoZXJvLnkgPSAwO1xuICAgIH0gZWxzZSBpZiAoaGVyby55ID4gdGhpcy5oZWlnaHQgKyBoZXJvLmJvdW5kcy5oZWlnaHQgLyAyKSB7XG4gICAgICBpZiAoaGVybyA9PT0gdGhpcy5oZXJvKSB7XG4gICAgICAgIHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnRW5kU2NyZWVuJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhTWFuYWdlci53aW4gPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaGVyby55ID4gdGhpcy5oZWlnaHQgLSAoR1JPVU5EX0hFSUdIVCArIGhlcm8uYm91bmRzLmhlaWdodCAvIDIpKSB7XG4gICAgICBoZXJvLmRpZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zcGlrZXMuc29tZShzcGlrZSA9PiBuZGdtci5jaGVja1BpeGVsQ29sbGlzaW9uKGhlcm8sIHNwaWtlKSkpIHtcbiAgICAgIGhlcm8uZGllKCk7XG4gICAgfVxuICB9XG4gIHRpY2soKSB7XG4gICAgaWYgKCF0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5tb3ZlV29ybGQoKTtcbiAgICB0aGlzLm1vdmVIZXJvKHRoaXMuaGVybyk7XG4gICAgdGhpcy5tb3ZlSGVybyh0aGlzLmVuZW15KTtcblxuICAgIHRoaXMuc3RlcCArPSAxO1xuICAgIGlmICh0aGlzLmVuZW15QWN0aW9uc1t0aGlzLnN0ZXBdKSB7XG4gICAgICB0aGlzLmVuZW15LmZsYXAoKTtcbiAgICB9XG4gIH1cbiAgZGVzdHJveSgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlEb3duKTtcbiAgfVxufVxuIiwiaW1wb3J0IGFzc2V0c01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvYXNzZXRzTWFuYWdlcic7XG5pbXBvcnQgZGF0YU1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvZGF0YU1hbmFnZXInO1xuaW1wb3J0IHNlcnZlck1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc2VydmVyTWFuYWdlcic7XG5pbXBvcnQgR3VpIGZyb20gJy4uL2Rpc3BsYXkvR3VpJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmF0aW5nU2NyZWVuIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3Iod2lkdGgpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuXG4gICAgdGhpcy5iZyA9IG5ldyBjcmVhdGVqcy5CaXRtYXAoYXNzZXRzTWFuYWdlci5nZXRSZXN1bHQoJ3N0YXJ0JykpO1xuICAgIHRoaXMuZ3VpID0gbmV3IEd1aSh3aWR0aCk7XG5cbiAgICB0aGlzLnRpdGxlID0gbmV3IGNyZWF0ZWpzLlRleHQoJ9Cg0LXQudGC0LjQvdCzJywgJzM1cHggR3VlcmlsbGEnLCAnIzAwMCcpO1xuICAgIHRoaXMudGl0bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgdGhpcy50aXRsZS54ID0gdGhpcy53aWR0aCAvIDI7XG4gICAgdGhpcy50aXRsZS55ID0gMzU7XG5cbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuYmcsIHRoaXMuZ3VpLCB0aGlzLnRpdGxlKTtcblxuICAgIHNlcnZlck1hbmFnZXIuZ2V0KCdyYXRpbmdUYWJsZScsIDEpXG4gICAgICAvLyB0b2RvOiByZW1vdmUgbGF0ZXIsIG5vdyBpdCBhZGQgcmVjb3JkcyBmb3Igb2xkIHVzZXJzXG4gICAgICAudGhlbihyZWNhbGNSYXRpbmdUYWJsZSlcbiAgICAgIC50aGVuKHIgPT4gdGhpcy5zaG93UmF0aW5nKHIpKVxuICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgY29uc3QgdGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KCfQoNC10LnRgtC40L3QsyDQstGA0LXQvNC10L3QvdC+INC90LXQtNC+0YHRgtGD0L/QtdC9IDooJywgJzI1cHggR3VlcmlsbGEnLCAnIzAwMCcpO1xuICAgICAgICB0ZXh0LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICB0ZXh0LnggPSB0aGlzLndpZHRoIC8gMjtcbiAgICAgICAgdGV4dC55ID0gMTUwO1xuICAgICAgICB0aGlzLmFkZENoaWxkKHRleHQpO1xuICAgICAgfSk7XG4gIH1cbiAgc2hvd1JhdGluZyhyYXRpbmdUYWJsZSkge1xuICAgIGxldCB3aW5uZXIgPSBmYWxzZTtcblxuICAgIHJhdGluZ1RhYmxlLmZvckVhY2goKGVsLCBpKSA9PiB7XG4gICAgICBjb25zdCB0ZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoYCR7aSArIDF9ICR7ZWwubmFtZX0gJHtlbC5zY29yZX0g0LxgLCAnMjVweCBHdWVyaWxsYScsICcjMDAwJyk7XG4gICAgICB0ZXh0LnkgPSAxMjAgKyBpICogNDA7XG4gICAgICB0ZXh0LnggPSAxMjA7XG4gICAgICB0aGlzLmFkZENoaWxkKHRleHQpO1xuXG4gICAgICBpZiAoZWwuaWQgPT09IGRhdGFNYW5hZ2VyLnVzZXIuaWQpIHtcbiAgICAgICAgd2lubmVyID0gdHJ1ZTtcbiAgICAgICAgdGV4dC5jb2xvciA9ICcjN0VDRTJFJztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICghd2lubmVyKSB7XG4gICAgICBjb25zdCB0ZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoYC0gJHtkYXRhTWFuYWdlci51c2VyLm5hbWV9ICR7ZGF0YU1hbmFnZXIubWF4U2NvcmV9INC8YCwgJzI1cHggR3VlcmlsbGEnLCAnIzdFQ0UyRScpO1xuICAgICAgdGV4dC55ID0gMTIwICsgcmF0aW5nVGFibGUubGVuZ3RoICogNDA7XG4gICAgICB0ZXh0LnggPSAxMjA7XG4gICAgICB0aGlzLmFkZENoaWxkKHRleHQpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiByZWNhbGNSYXRpbmdUYWJsZShyYXRpbmdUYWJsZSkge1xuICBpZiAocmF0aW5nVGFibGVbcmF0aW5nVGFibGUubGVuZ3RoIC0gMV0uc2NvcmUgPCBkYXRhTWFuYWdlci5tYXhTY29yZSkge1xuICAgIGNvbnN0IHVzZXJSYXRpbmcgPSByYXRpbmdUYWJsZS5maW5kKGVsID0+IGVsLmlkID09PSBkYXRhTWFuYWdlci51c2VyLmlkKTtcblxuICAgIGlmICh1c2VyUmF0aW5nKSB7XG4gICAgICB1c2VyUmF0aW5nLnNjb3JlID0gZGF0YU1hbmFnZXIubWF4U2NvcmU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5ld1JhdGluZyA9IHtcbiAgICAgICAgaWQ6IGRhdGFNYW5hZ2VyLnVzZXIuaWQsXG4gICAgICAgIG5hbWU6IGRhdGFNYW5hZ2VyLnVzZXIubmFtZSxcbiAgICAgICAgc2NvcmU6IGRhdGFNYW5hZ2VyLm1heFNjb3JlLFxuICAgICAgfTtcbiAgICAgIGlmIChyYXRpbmdUYWJsZS5sZW5ndGggPCAxMCkge1xuICAgICAgICByYXRpbmdUYWJsZS5wdXNoKG5ld1JhdGluZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYXRpbmdUYWJsZVtyYXRpbmdUYWJsZS5sZW5ndGggLSAxXSA9IG5ld1JhdGluZztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByYXRpbmdUYWJsZS5zb3J0KChhLCBiKSA9PiBiLnNjb3JlIC0gYS5zY29yZSk7XG4gICAgc2VydmVyTWFuYWdlci5zZXQoJ3JhdGluZ1RhYmxlJywgcmF0aW5nVGFibGUsIDEpO1xuICB9XG4gIHJldHVybiByYXRpbmdUYWJsZTtcbn1cbiIsImltcG9ydCBzZXJ2ZXJNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NlcnZlck1hbmFnZXInO1xuaW1wb3J0IGFzc2V0c01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvYXNzZXRzTWFuYWdlcic7XG5pbXBvcnQgc2NyZWVuc01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc2NyZWVuc01hbmFnZXInO1xuaW1wb3J0IGRhdGFNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2RhdGFNYW5hZ2VyJztcbmltcG9ydCBHdWkgZnJvbSAnLi4vZGlzcGxheS9HdWknO1xuaW1wb3J0IEhlcm8gZnJvbSAnLi4vZGlzcGxheS9IZXJvJztcbmltcG9ydCBCdG4gZnJvbSAnLi4vZGlzcGxheS9CdG4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFydFNjcmVlbiBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgdGhpcy5iZyA9IG5ldyBjcmVhdGVqcy5CaXRtYXAoYXNzZXRzTWFuYWdlci5nZXRSZXN1bHQoJ3N0YXJ0JykpO1xuICAgIHRoaXMuZ3VpID0gbmV3IEd1aSh3aWR0aCk7XG5cbiAgICB0aGlzLnN0YXJ0QnRuID0gbmV3IEJ0bign0JjQs9GA0LDRgtGMJyk7XG4gICAgdGhpcy5zdGFydEJ0bi54ID0gd2lkdGggLyAyO1xuICAgIHRoaXMuc3RhcnRCdG4ueSA9IDMyMDtcblxuICAgIHRoaXMucHZwQnRuID0gbmV3IEJ0bignUFZQJyk7XG4gICAgdGhpcy5wdnBCdG4ueCA9IHdpZHRoIC8gMjtcbiAgICB0aGlzLnB2cEJ0bi55ID0gNDEwO1xuXG4gICAgdGhpcy5pbnZpdGVCdG4gPSBuZXcgQnRuKCfQn9C+0LfQstCw0YLRjCDQsdGA0L4nLCAnb3JhbmdlJyk7XG4gICAgdGhpcy5pbnZpdGVCdG4ueCA9IHdpZHRoIC8gMjtcbiAgICB0aGlzLmludml0ZUJ0bi55ID0gNTAwO1xuXG4gICAgdGhpcy5oZXJvID0gbmV3IEhlcm8oJ21vbnN0ZXInKTtcbiAgICB0aGlzLmhlcm8ueCA9IHdpZHRoIC8gMjtcbiAgICB0aGlzLmhlcm8ueSA9IDE5MDtcblxuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5iZywgdGhpcy5ndWksIHRoaXMuaGVybywgdGhpcy5zdGFydEJ0biwgdGhpcy5wdnBCdG4sIHRoaXMuaW52aXRlQnRuKTtcblxuICAgIGlmIChkYXRhTWFuYWdlci5tYXhTY29yZSkge1xuICAgICAgdGhpcy5zY29yZSA9IG5ldyBjcmVhdGVqcy5UZXh0KGDQoNC10LrQvtGA0LQ6ICR7ZGF0YU1hbmFnZXIubWF4U2NvcmV9INC8YCwgJzI1cHggR3VlcmlsbGEnLCAnIzAwMCcpO1xuICAgICAgdGhpcy5zY29yZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgIHRoaXMuc2NvcmUueCA9IHRoaXMud2lkdGggLyAyO1xuICAgICAgdGhpcy5zY29yZS55ID0gNDA7XG4gICAgICB0aGlzLmFkZENoaWxkKHRoaXMuc2NvcmUpO1xuICAgIH1cblxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICB9XG4gIC8vIGNyZWF0ZUhlcm9lcygpIHtcbiAgLy8gICB0aGlzLmhlcm9lcyA9IFtcbiAgLy8gICAgIG5ldyBIZXJvKCdiaXJkJyksXG4gIC8vICAgICBuZXcgSGVybygnbW9uc3RlcicpLFxuICAvLyAgICAgbmV3IEhlcm8oJ2NoaWNrZW4nKSxcbiAgLy8gICBdO1xuICAvLyAgIHRoaXMuaGVyb2VzLmZvckVhY2goKGhlcm8sIGkpID0+IHtcbiAgLy8gICAgIGhlcm8ueSA9IHRoaXMuaGVpZ2h0IC8gMjtcbiAgLy8gICAgIGhlcm8ueCA9IChpICsgMSkgKiB0aGlzLndpZHRoIC8gKHRoaXMuaGVyb2VzLmxlbmd0aCArIDEpO1xuICAvLyAgICAgaGVyby5jdXJzb3IgPSAncG9pbnRlcic7XG4gIC8vICAgICBoZXJvLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5zZWxlY3RIZXJvKGhlcm8pKTtcbiAgLy8gICAgIGhlcm8uY2FjaGUoMCwgMCwgaGVyby5ib3VuZHMud2lkdGgsIGhlcm8uYm91bmRzLmhlaWdodCk7XG4gIC8vICAgfSk7XG4gIC8vICAgdGhpcy5oZXJvRmlsdGVyID0gbmV3IGNyZWF0ZWpzLkNvbG9yRmlsdGVyKDAuNiwgMC42LCAwLjYpO1xuICAvLyAgIHRoaXMucmVzZXRIZXJvZXMoKTtcbiAgLy8gICB0aGlzLmFkZENoaWxkKC4uLnRoaXMuaGVyb2VzKTtcbiAgLy8gfVxuICAvLyByZXNldEhlcm9lcygpIHtcbiAgLy8gICB0aGlzLmhlcm9lcy5mb3JFYWNoKGhlcm8gPT4ge1xuICAvLyAgICAgaGVyby5maWx0ZXJzID0gW3RoaXMuaGVyb0ZpbHRlcl07XG4gIC8vICAgICBoZXJvLnVwZGF0ZUNhY2hlKCk7XG4gIC8vICAgICBoZXJvLnNjYWxlWCA9IDAuODU7XG4gIC8vICAgICBoZXJvLnNjYWxlWSA9IDAuODU7XG4gIC8vICAgfSk7XG4gIC8vIH1cbiAgLy8gc2VsZWN0SGVybyhoZXJvKSB7XG4gIC8vICAgdGhpcy5yZXNldEhlcm9lcygpO1xuXG4gIC8vICAgaGVyby5maWx0ZXJzID0gW107XG4gIC8vICAgaGVyby51cGRhdGVDYWNoZSgpO1xuICAvLyAgIGhlcm8uc2NhbGVYID0gMTtcbiAgLy8gICBoZXJvLnNjYWxlWSA9IDE7XG4gIC8vICAgaGVyby5mbGFwKCk7XG5cbiAgLy8gICBpZiAoIXRoaXMuc3RhcnRCdG4uZW5hYmxlZCkge1xuICAvLyAgICAgdGhpcy5zdGFydEJ0bi5lbmFibGUoKTtcbiAgLy8gICB9XG5cbiAgLy8gICBkYXRhTWFuYWdlci5oZXJvVHlwZSA9IGhlcm8udHlwZTtcbiAgLy8gfVxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PlxuICAgICAgc2NyZWVuc01hbmFnZXIuY2hhbmdlKCdNYWluU2NyZWVuJykpO1xuICAgIHRoaXMucHZwQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT5cbiAgICAgIHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnUFZQU2NyZWVuJykpO1xuICAgIHRoaXMuaW52aXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT5cbiAgICAgIHNlcnZlck1hbmFnZXIuaW52aXRlKCkpO1xuXG4gICAgdGhpcy5vbktleURvd24gPSBlID0+IHtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDMyKSB7XG4gICAgICAgIHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnTWFpblNjcmVlbicpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd24pO1xuICB9XG4gIGRlc3Ryb3koKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bik7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG1pbiwgbWF4KSB7XG5cdGlmIChtYXggPT09IHVuZGVmaW5lZCkge1xuXHRcdG1heCA9IG1pbjtcblx0XHRtaW4gPSAwO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBtaW4gIT09ICdudW1iZXInIHx8IHR5cGVvZiBtYXggIT09ICdudW1iZXInKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYWxsIGFyZ3VtZW50cyB0byBiZSBudW1iZXJzJyk7XG5cdH1cblxuXHRyZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKTtcbn07XG4iXX0=
