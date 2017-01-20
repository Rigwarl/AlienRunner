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
        _this.fog.x = _this.hero.x;
        _this.fog.y = _this.hero.y;
        _this.fog.addEventListener('tick', function () {
          if (!_this.hero.dead) {
            _this.fog.y = _this.hero.y;
          }
        });
        _this.addChild(_this.fog);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvc3JjL2FwcC5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9CYWNrZ3JvdW5kLmpzIiwiYXBwL2pzL3NyYy9kaXNwbGF5L0J0bi5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9HdWkuanMiLCJhcHAvanMvc3JjL2Rpc3BsYXkvSGVyby5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9JY29uQnRuLmpzIiwiYXBwL2pzL3NyYy9kaXNwbGF5L1NoYWRvd092ZXJsYXkuanMiLCJhcHAvanMvc3JjL2Rpc3BsYXkvU3Bpa2UuanMiLCJhcHAvanMvc3JjL21hbmFnZXJzL2Fzc2V0c01hbmFnZXIuanMiLCJhcHAvanMvc3JjL21hbmFnZXJzL2RhdGFNYW5hZ2VyLmpzIiwiYXBwL2pzL3NyYy9tYW5hZ2Vycy9zY3JlZW5zTWFuYWdlci5qcyIsImFwcC9qcy9zcmMvbWFuYWdlcnMvc2VydmVyTWFuYWdlci5qcyIsImFwcC9qcy9zcmMvbWFuYWdlcnMvc291bmRNYW5hZ2VyLmpzIiwiYXBwL2pzL3NyYy9zY3JlZW5zL0VuZFNjcmVlbi5qcyIsImFwcC9qcy9zcmMvc2NyZWVucy9NYWluU2NyZWVuLmpzIiwiYXBwL2pzL3NyYy9zY3JlZW5zL1BWUFNjcmVlbi5qcyIsImFwcC9qcy9zcmMvc2NyZWVucy9SYXRpbmdTY3JlZW4uanMiLCJhcHAvanMvc3JjL3NjcmVlbnMvU3RhcnRTY3JlZW4uanMiLCJub2RlX21vZHVsZXMvcmFuZG9tLWludC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsUUFBUSxHQUFSLENBQVksQ0FDVix3QkFBYyxJQUFkLEVBRFUsRUFFVix3QkFBYyxJQUFkLEVBRlUsQ0FBWixFQUlHLElBSkgsQ0FJUTtBQUFBLFNBQU0sUUFBUSxHQUFSLENBQVksQ0FDdEIsd0JBQWMs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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7O2lDQUNhO0FBQ1gsV0FBSyxRQUFMLENBQWMsZ0JBQWQsQ0FBK0IsT0FBL0IsRUFBd0M7QUFBQSxlQUN0Qyx5QkFBZSxNQUFmLENBQXNCLFlBQXRCLENBRHNDO0FBQUEsT0FBeEM7QUFFQSxXQUFLLE1BQUwsQ0FBWSxnQkFBWixDQUE2QixPQUE3QixFQUFzQztBQUFBLGVBQ3BDLHlCQUFlLE1BQWYsQ0FBc0IsV0FBdEIsQ0FEb0M7QUFBQSxPQUF0QztBQUVBLFdBQUssU0FBTCxDQUFlLGdCQUFmLENBQWdDLE9BQWhDLEVBQXlDO0FBQUEsZUFDdkMsd0JBQWMsTUFBZCxFQUR1QztBQUFBLE9BQXpDOztBQUdBLFdBQUssU0FBTCxHQUFpQixhQUFLO0FBQ3BCLFlBQUksRUFBRSxPQUFGLEtBQWMsRUFBbEIsRUFBc0I7QUFDcEIsbUNBQWUsTUFBZixDQUFzQixZQUF0QjtBQUNBLFlBQUUsY0FBRjtBQUNEO0FBQ0YsT0FMRDs7QUFPQSxhQUFPLGdCQUFQLENBQXdCLFNBQXhCLEVBQW1DLEtBQUssU0FBeEM7QUFDRDs7OzhCQUNTO0FBQ1IsYUFBTyxtQkFBUCxDQUEyQixTQUEzQixFQUFzQyxLQUFLLFNBQTNDO0FBQ0Q7Ozs7RUFqR3NDLFNBQVMsUzs7a0JBQTdCLFc7OztBQ1JyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBzY3JlZW5zTWFuYWdlciBmcm9tICcuL21hbmFnZXJzL3NjcmVlbnNNYW5hZ2VyJztcbmltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4vbWFuYWdlcnMvYXNzZXRzTWFuYWdlcic7XG5pbXBvcnQgc2VydmVyTWFuYWdlciBmcm9tICcuL21hbmFnZXJzL3NlcnZlck1hbmFnZXInO1xuaW1wb3J0IHNvdW5kTWFuYWdlciBmcm9tICcuL21hbmFnZXJzL3NvdW5kTWFuYWdlcic7XG5pbXBvcnQgZGF0YU1hbmFnZXIgZnJvbSAnLi9tYW5hZ2Vycy9kYXRhTWFuYWdlcic7XG5cblByb21pc2UuYWxsKFtcbiAgYXNzZXRzTWFuYWdlci5pbml0KCksXG4gIHNlcnZlck1hbmFnZXIuaW5pdCgpLFxuXSlcbiAgLnRoZW4oKCkgPT4gUHJvbWlzZS5hbGwoW1xuICAgIHNlcnZlck1hbmFnZXIuZ2V0VXNlcigpLnRoZW4odXNlciA9PiBkYXRhTWFuYWdlci5zZXQoJ3VzZXInLCB7XG4gICAgICBpZDogdXNlci5pZCxcbiAgICAgIG5hbWU6IGAke3VzZXIuZmlyc3RfbmFtZX0gJHt1c2VyLmxhc3RfbmFtZX1gLFxuICAgICAgc2V4OiB1c2VyLnNleCxcbiAgICB9KSksXG4gICAgc2VydmVyTWFuYWdlci5nZXQoJ21heFNjb3JlJykudGhlbihyID0+IGRhdGFNYW5hZ2VyLnNldCgnbWF4U2NvcmUnLCArcikpLFxuICAgIHNlcnZlck1hbmFnZXIuZ2V0KCdzb3VuZCcpLnRoZW4ociA9PiBzb3VuZE1hbmFnZXIuaW5pdChyID09PSAnJyA/IHRydWUgOiAhIXIpKSxcbiAgXSkpXG4gIC50aGVuKCgpID0+IHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnU3RhcnRTY3JlZW4nKSlcbiAgLmNhdGNoKGUgPT4gY29uc29sZS5lcnJvcignaW5pdCBlcnJvciwgcmVsb2FkIHBhZ2UnLCBlKSk7XG5cbmNvbnN0IHN0YWdlID0gbmV3IGNyZWF0ZWpzLlN0YWdlKCdnYW1lLXN0YWdlJyk7XG5zY3JlZW5zTWFuYWdlci5pbml0KHN0YWdlKTtcblxuaWYgKGNyZWF0ZWpzLlRvdWNoLmlzU3VwcG9ydGVkKCkpIHtcbiAgY3JlYXRlanMuVG91Y2guZW5hYmxlKHN0YWdlLCB0cnVlKTtcbn0gZWxzZSB7XG4gIHN0YWdlLmVuYWJsZU1vdXNlT3ZlcigyMCk7XG59XG5cbmlmICh3aW5kb3cgIT09IHdpbmRvdy5wYXJlbnQpIHtcbiAgLy8gY3JlYXRlanMgc3RhZ2UgY2xpY2sgZG9zbnQgdHJpZ2dlciB3aW5kb3cuZm9jdXNcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gd2luZG93LmZvY3VzKCkpO1xufVxuIiwiaW1wb3J0IGFzc2V0c01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvYXNzZXRzTWFuYWdlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhY2tncm91bmQgZXh0ZW5kcyBjcmVhdGVqcy5TaGFwZSB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGNhbnZhc1dpZHRoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuaW1nID0gYXNzZXRzTWFuYWdlci5nZXRSZXN1bHQobmFtZSk7XG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLmltZy53aWR0aCArIGNhbnZhc1dpZHRoO1xuXG4gICAgdGhpcy5ncmFwaGljcy5iZWdpbkJpdG1hcEZpbGwodGhpcy5pbWcsICdyZXBlYXQteCcpLmRyYXdSZWN0KDAsIDAsIHdpZHRoLCB0aGlzLmltZy5oZWlnaHQpO1xuICAgIHRoaXMucmVnWSA9IHRoaXMuaW1nLmhlaWdodDtcbiAgICB0aGlzLmNhY2hlKDAsIDAsIHdpZHRoLCB0aGlzLmltZy5oZWlnaHQpO1xuICB9XG4gIG1vdmUocGF0aCkge1xuICAgIHRoaXMueCAtPSBwYXRoO1xuICAgIHRoaXMueCAlPSB0aGlzLmltZy53aWR0aDtcbiAgfVxufVxuIiwiaW1wb3J0IGFzc2V0c01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvYXNzZXRzTWFuYWdlcic7XG5pbXBvcnQgc291bmRNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NvdW5kTWFuYWdlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ0biBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKGxhYmVsLCBjb2xvciA9ICdncmVlbicsIHR5cGUgPSAnYnRuJykge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XG5cbiAgICB0aGlzLmNyZWF0ZUJnKHR5cGUpO1xuICAgIHRoaXMuY3JlYXRlTGFiZWwobGFiZWwpO1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNvdW5kTWFuYWdlci5wbGF5KCdmbGFwJykpO1xuICB9XG4gIGNyZWF0ZUJnKHR5cGUpIHtcbiAgICB0aGlzLmJnID0gbmV3IGNyZWF0ZWpzLlNwcml0ZShhc3NldHNNYW5hZ2VyLmdldFNwcml0ZVNoZWV0KHR5cGUpKTtcbiAgICB0aGlzLmJnLnJlZ1ggPSB0aGlzLmJnLmdldEJvdW5kcygpLndpZHRoIC8gMjtcbiAgICB0aGlzLmJnLnJlZ1kgPSB0aGlzLmJnLmdldEJvdW5kcygpLmhlaWdodCAvIDI7XG4gICAgdGhpcy5oZWxwZXIgPSBuZXcgY3JlYXRlanMuQnV0dG9uSGVscGVyKHRoaXMuYmcsIGAke3RoaXMuY29sb3J9T3V0YCwgYCR7dGhpcy5jb2xvcn1PdmVyYCwgYCR7dGhpcy5jb2xvcn1Eb3duYCk7XG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmJnKTtcbiAgfVxuICBjcmVhdGVMYWJlbChsYWJlbCkge1xuICAgIHRoaXMubGFiZWwgPSBuZXcgY3JlYXRlanMuVGV4dChsYWJlbCwgJzMwcHggR3VlcmlsbGEnLCAnI2ZmZicpO1xuICAgIHRoaXMubGFiZWwuc2hhZG93ID0gbmV3IGNyZWF0ZWpzLlNoYWRvdygnIzAwMCcsIDAsIDEsIDUpO1xuICAgIHRoaXMubGFiZWwudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgdGhpcy5sYWJlbC50ZXh0QmFzZWxpbmUgPSAnbWlkZGxlJztcbiAgICB0aGlzLmxhYmVsLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMubGFiZWwueSA9IC0zO1xuXG4gICAgLy8gdG9kbyBjYWNoZVxuICAgIC8vIG5vdyBpdCBjYWNoZSBiZWZvcmUgZm9udCBsb2FkIChcbiAgICAvLyBjb25zdCBoID0gdGhpcy5sYWJlbC5nZXRNZWFzdXJlZEhlaWdodCgpICsgNjsgLy8gYWRkIDYgY29zIG9mIHNoYWRvd1xuICAgIC8vIGNvbnN0IHcgPSB0aGlzLmxhYmVsLmdldE1lYXN1cmVkV2lkdGgoKSArIDY7XG4gICAgLy8gdGhpcy5sYWJlbC5jYWNoZSgtdyAvIDIsIC1oIC8gMiwgdywgaCk7XG5cbiAgICB0aGlzLmFkZENoaWxkKHRoaXMubGFiZWwpO1xuICB9XG4gIGRpc2FibGUoKSB7XG4gICAgdGhpcy5iZy5nb3RvQW5kU3RvcCgnZGlzYWJsZScpO1xuICAgIHRoaXMubW91c2VFbmFibGVkID0gZmFsc2U7XG4gIH1cbiAgZW5hYmxlKCkge1xuICAgIHRoaXMuYmcuZ290b0FuZFN0b3AoYCR7dGhpcy5jb2xvcn1PdXRgKTtcbiAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IHRydWU7XG4gIH1cbn1cbiIsImltcG9ydCBzY3JlZW5NYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NjcmVlbnNNYW5hZ2VyJztcbmltcG9ydCBzb3VuZE1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc291bmRNYW5hZ2VyJztcbmltcG9ydCBzZXJ2ZXJNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NlcnZlck1hbmFnZXInO1xuaW1wb3J0IEljb25CdG4gZnJvbSAnLi9JY29uQnRuJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3VpIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3Iod2lkdGgpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuXG4gICAgdGhpcy5tZW51QnRuID0gbmV3IEljb25CdG4oJ21lbnUnKTtcbiAgICB0aGlzLm1lbnVCdG4ueCA9IHRoaXMubWVudUJ0bi5nZXRCb3VuZHMoKS53aWR0aCAvIDIgKyAyMDtcbiAgICB0aGlzLm1lbnVCdG4ueSA9IHRoaXMubWVudUJ0bi5nZXRCb3VuZHMoKS5oZWlnaHQgLyAyICsgMjA7XG5cbiAgICB0aGlzLnJhdGluZ0J0biA9IG5ldyBJY29uQnRuKCdyYXRpbmcnKTtcbiAgICB0aGlzLnJhdGluZ0J0bi54ID0gdGhpcy5yYXRpbmdCdG4uZ2V0Qm91bmRzKCkud2lkdGggKiAzIC8gMiArIDQwO1xuICAgIHRoaXMucmF0aW5nQnRuLnkgPSB0aGlzLnJhdGluZ0J0bi5nZXRCb3VuZHMoKS5oZWlnaHQgLyAyICsgMjA7XG5cbiAgICB0aGlzLnNvdW5kQnRuID0gbmV3IEljb25CdG4oc291bmRNYW5hZ2VyLmlzRW5hYmxlZCgpID8gJ3NvdW5kJyA6ICdzb3VuZE9mZicpO1xuICAgIHRoaXMuc291bmRCdG4ueCA9IHRoaXMud2lkdGggLSB0aGlzLnNvdW5kQnRuLmdldEJvdW5kcygpLndpZHRoIC8gMiAtIDIwO1xuICAgIHRoaXMuc291bmRCdG4ueSA9IHRoaXMuc291bmRCdG4uZ2V0Qm91bmRzKCkuaGVpZ2h0IC8gMiArIDIwO1xuXG4gICAgLy8gdG9kbzogZml4IHNwcml0ZXNoZWV0IGxhdGVyXG4gICAgdGhpcy5yYXRpbmdCdG4ubGFiZWwueCA9IHRoaXMuc291bmRCdG4ubGFiZWwueCA9IDE7XG5cbiAgICB0aGlzLmFkZENoaWxkKHRoaXMubWVudUJ0biwgdGhpcy5yYXRpbmdCdG4sIHRoaXMuc291bmRCdG4pO1xuXG4gICAgdGhpcy5zb3VuZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHNvdW5kTWFuYWdlci50b2dnbGUoKTtcbiAgICAgIHRoaXMuc291bmRCdG4uY2hhbmdlTGFiZWwoc291bmRNYW5hZ2VyLmlzRW5hYmxlZCgpID8gJ3NvdW5kJyA6ICdzb3VuZE9mZicpO1xuICAgICAgc2VydmVyTWFuYWdlci5zZXQoJ3NvdW5kJywgc291bmRNYW5hZ2VyLmlzRW5hYmxlZCgpKTtcbiAgICB9KTtcblxuICAgIHRoaXMubWVudUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNjcmVlbk1hbmFnZXIuY2hhbmdlKCdTdGFydFNjcmVlbicpKTtcbiAgICB0aGlzLnJhdGluZ0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNjcmVlbk1hbmFnZXIuY2hhbmdlKCdSYXRpbmdTY3JlZW4nKSk7XG4gIH1cbn1cbiIsImltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuaW1wb3J0IHNvdW5kTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zb3VuZE1hbmFnZXInO1xuXG5jb25zdCBDT05GSUcgPSB7XG4gIEc6IDAuMTYsXG4gIEE6IDcsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZXJvIGV4dGVuZHMgY3JlYXRlanMuU3ByaXRlIHtcbiAgY29uc3RydWN0b3IodHlwZSkge1xuICAgIHN1cGVyKGFzc2V0c01hbmFnZXIuZ2V0U3ByaXRlU2hlZXQodHlwZSkpO1xuXG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCk7XG4gICAgdGhpcy5yZWdYID0gdGhpcy5ib3VuZHMud2lkdGggLyAyO1xuICAgIHRoaXMucmVnWSA9IHRoaXMuYm91bmRzLmhlaWdodCAvIDI7XG5cbiAgICB0aGlzLmRlYWQgPSBmYWxzZTtcbiAgICB0aGlzLnZZID0gMDtcbiAgfVxuICBmbGFwKCkge1xuICAgIGlmICh0aGlzLmRlYWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy52WSA9IE1hdGgubWF4KHRoaXMudlkgLSBDT05GSUcuQSwgLUNPTkZJRy5BKTtcbiAgICB0aGlzLmdvdG9BbmRQbGF5KCdmbGFwJyk7XG4gICAgc291bmRNYW5hZ2VyLnBsYXkoJ2ZsYXAnKTtcbiAgfVxuICBtb3ZlKCkge1xuICAgIHRoaXMudlkgKz0gQ09ORklHLkc7XG4gICAgdGhpcy55ICs9IHRoaXMudlk7XG4gIH1cbiAgZGllKCkge1xuICAgIGlmICh0aGlzLmRlYWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5kZWFkID0gdHJ1ZTtcbiAgICB0aGlzLnJvdGF0aW9uID0gMzA7XG4gICAgdGhpcy5nb3RvQW5kU3RvcCgnZGVhZCcpO1xuICAgIHNvdW5kTWFuYWdlci5wbGF5KCdsb29zZScpO1xuICB9XG59XG4iLCJpbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcbmltcG9ydCBCdG4gZnJvbSAnLi9CdG4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJY29uQnRuIGV4dGVuZHMgQnRuIHtcbiAgY29uc3RydWN0b3IobGFiZWwsIGNvbG9yID0gJ29yYW5nZScpIHtcbiAgICBzdXBlcihsYWJlbCwgY29sb3IsICdpY29uQnRuJyk7XG4gIH1cbiAgY3JlYXRlTGFiZWwobGFiZWwpIHtcbiAgICB0aGlzLmxhYmVsID0gbmV3IGNyZWF0ZWpzLlNwcml0ZShhc3NldHNNYW5hZ2VyLmdldFNwcml0ZVNoZWV0KCdpY29uJyksIGxhYmVsKTtcbiAgICB0aGlzLmxhYmVsLnJlZ1ggPSB0aGlzLmxhYmVsLmdldEJvdW5kcygpLndpZHRoIC8gMjtcbiAgICB0aGlzLmxhYmVsLnJlZ1kgPSB0aGlzLmxhYmVsLmdldEJvdW5kcygpLmhlaWdodCAvIDI7XG4gICAgdGhpcy5sYWJlbC5tb3VzZUVuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMubGFiZWwpO1xuICB9XG4gIGNoYW5nZUxhYmVsKGxhYmVsKSB7XG4gICAgdGhpcy5sYWJlbC5nb3RvQW5kU3RvcChsYWJlbCk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoYWRvd092ZXJsYXkgZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc2hhZG93ID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG4gICAgdGhpcy5zaGFkb3cuZ3JhcGhpY3MuYmVnaW5GaWxsKCdyZ2JhKDAsIDAsIDAsIDAuNiknKS5kcmF3UmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgIHRoaXMuc2hhZG93VGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KCcnLCAnMzBweCBHdWVyaWxsYScsICcjZmZmJyk7XG4gICAgdGhpcy5zaGFkb3dUZXh0LnkgPSBoZWlnaHQgLyAyO1xuICAgIHRoaXMuc2hhZG93VGV4dC54ID0gd2lkdGggLyAyO1xuICAgIHRoaXMuc2hhZG93VGV4dC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICB0aGlzLnNoYWRvd1RleHQudGV4dEJhc2VsaW5lID0gJ21pZGRsZSc7XG5cbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuc2hhZG93LCB0aGlzLnNoYWRvd1RleHQpO1xuICAgIC8vIHRvZG9cbiAgICAvLyB0aGlzLmNhY2hlKDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICB9XG4gIHNldFRleHQodGV4dCkge1xuICAgIHRoaXMuc2hhZG93VGV4dC50ZXh0ID0gdGV4dDtcbiAgICAvLyB0aGlzLnVwZGF0ZUNhY2hlKCk7XG4gIH1cbn1cbiIsImltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGlrZSBleHRlbmRzIGNyZWF0ZWpzLkJpdG1hcCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKGFzc2V0c01hbmFnZXIuZ2V0UmVzdWx0KCdzcGlrZScpKTtcblxuICAgIHRoaXMuYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKTtcbiAgICB0aGlzLnJlZ1ggPSB0aGlzLmJvdW5kcy53aWR0aCAvIDI7XG4gICAgdGhpcy5yZWdZID0gdGhpcy5ib3VuZHMuaGVpZ2h0O1xuICB9XG59XG4iLCJjb25zdCBtYW5pZmVzdCA9IFtcbiAgeyBpZDogJ21vbnN0ZXInLCBzcmM6ICdpbWcvbW9uc3Rlci1zcHJpdGUucG5nJyB9LFxuICAvLyB7IGlkOiAnYmlyZCcsIHNyYzogJ2ltZy9iaXJkLXNwcml0ZS5wbmcnIH0sXG4gIC8vIHsgaWQ6ICdjaGlja2VuJywgc3JjOiAnaW1nL2NoaWNrZW4tc3ByaXRlLnBuZycgfSxcbiAgeyBpZDogJ3NwaWtlJywgc3JjOiAnaW1nL3NwaWtlLnBuZycgfSxcbiAgeyBpZDogJ3NreScsIHNyYzogJ2ltZy9iZy9za3kucG5nJyB9LFxuICB7IGlkOiAnc3RhcnQnLCBzcmM6ICdpbWcvYmcvc3RhcnQucG5nJyB9LFxuICB7IGlkOiAnbW91bnRhaW4nLCBzcmM6ICdpbWcvYmcvbW91bnRhaW4ucG5nJyB9LFxuICB7IGlkOiAnZ3JvdW5kJywgc3JjOiAnaW1nL2JnL2dyb3VuZC5wbmcnIH0sXG4gIHsgaWQ6ICdidG4nLCBzcmM6ICdpbWcvYnRuLXNwcml0ZS5wbmcnIH0sXG4gIHsgaWQ6ICdpY29uLWJ0bicsIHNyYzogJ2ltZy9pY29uLWJ0bi1zcHJpdGUucG5nJyB9LFxuICB7IGlkOiAnaWNvbicsIHNyYzogJ2ltZy9pY29uLXNwcml0ZS5wbmcnIH0sXG4gIHsgaWQ6ICdiYWNrJywgc3JjOiAnc291bmQvYmFja2dyb3VuZC5vZ2cnIH0sXG4gIHsgaWQ6ICdmbGFwJywgc3JjOiAnc291bmQvZmxhcC5vZ2cnIH0sXG4gIHsgaWQ6ICdsb29zZScsIHNyYzogJ3NvdW5kL2xvb3NlLm9nZycgfSxcbl07XG5cbmNvbnN0IGdldEhlcm9TcHJpdGVTaGVldERhdGEgPSBuYW1lID0+ICh7XG4gIGltYWdlczogW25hbWVdLFxuICBmcmFtZXM6IHsgd2lkdGg6IDEwMCwgaGVpZ2h0OiA3OCB9LFxuICBhbmltYXRpb25zOiB7XG4gICAgZmx5OiAwLFxuICAgIGZsYXA6IFsxLCAzLCAnZmx5J10sXG4gICAgZGVhZDogNCxcbiAgfSxcbn0pO1xuXG5jb25zdCBzcHJpdGVTaGVldHNEYXRhID0ge1xuICBiaXJkOiBnZXRIZXJvU3ByaXRlU2hlZXREYXRhKCdiaXJkJyksXG4gIG1vbnN0ZXI6IGdldEhlcm9TcHJpdGVTaGVldERhdGEoJ21vbnN0ZXInKSxcbiAgY2hpY2tlbjogZ2V0SGVyb1Nwcml0ZVNoZWV0RGF0YSgnY2hpY2tlbicpLFxuICBidG46IHtcbiAgICBpbWFnZXM6IFsnYnRuJ10sXG4gICAgZnJhbWVzOiB7IHdpZHRoOiAyMTAsIGhlaWdodDogNjksIHNwYWNpbmc6IDIgfSxcbiAgICBhbmltYXRpb25zOiB7XG4gICAgICBncmVlbk91dDogMCxcbiAgICAgIGdyZWVuT3ZlcjogMixcbiAgICAgIGdyZWVuRG93bjogNCxcbiAgICAgIG9yYW5nZU91dDogNixcbiAgICAgIG9yYW5nZU92ZXI6IDgsXG4gICAgICBvcmFuZ2VEb3duOiAxLFxuICAgICAgcmVkT3V0OiAzLFxuICAgICAgcmVkT3ZlcjogNSxcbiAgICAgIHJlZERvd246IDcsXG4gICAgICBkaXNhYmxlOiA5LFxuICAgIH0sXG4gIH0sXG4gIGljb25CdG46IHtcbiAgICBpbWFnZXM6IFsnaWNvbi1idG4nXSxcbiAgICBmcmFtZXM6IHsgd2lkdGg6IDY5LCBoZWlnaHQ6IDcxLCBzcGFjaW5nOiAyIH0sXG4gICAgYW5pbWF0aW9uczoge1xuICAgICAgZ3JlZW5PdXQ6IDAsXG4gICAgICBncmVlbk92ZXI6IDEsXG4gICAgICBncmVlbkRvd246IDIsXG4gICAgICBvcmFuZ2VPdXQ6IDMsXG4gICAgICBvcmFuZ2VPdmVyOiA0LFxuICAgICAgb3JhbmdlRG93bjogNSxcbiAgICAgIHJlZE91dDogOCxcbiAgICAgIHJlZE92ZXI6IDcsXG4gICAgICByZWREb3duOiA2LFxuICAgICAgZGlzYWJsZTogOSxcbiAgICB9LFxuICB9LFxuICBpY29uOiB7XG4gICAgaW1hZ2VzOiBbJ2ljb24nXSxcbiAgICBmcmFtZXM6IHsgd2lkdGg6IDQwLCBoZWlnaHQ6IDQwIH0sXG4gICAgYW5pbWF0aW9uczoge1xuICAgICAgc291bmQ6IDAsXG4gICAgICBzb3VuZE9mZjogMSxcbiAgICAgIHJhdGluZzogMixcbiAgICAgIG1lbnU6IDMsXG4gICAgfSxcbiAgfSxcbn07XG5cbmNvbnN0IHNwcml0ZVNoZWV0cyA9IHt9O1xuXG5jb25zdCBhc3NldHNNYW5hZ2VyID0ge1xuICBpbml0KCkge1xuICAgIGNyZWF0ZWpzLlNvdW5kLmFsdGVybmF0ZUV4dGVuc2lvbnMgPSBbJ21wMyddO1xuICAgIHRoaXMucXVldWUgPSBuZXcgY3JlYXRlanMuTG9hZFF1ZXVlKCk7XG4gICAgdGhpcy5xdWV1ZS5pbnN0YWxsUGx1Z2luKGNyZWF0ZWpzLlNvdW5kKTtcbiAgICB0aGlzLnF1ZXVlLmxvYWRNYW5pZmVzdChtYW5pZmVzdCk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5xdWV1ZS5hZGRFdmVudExpc3RlbmVyKCdjb21wbGV0ZScsICgpID0+IHJlc29sdmUoKSk7XG4gICAgICB0aGlzLnF1ZXVlLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKCkgPT4gcmVqZWN0KCkpO1xuICAgIH0pO1xuICB9LFxuICBnZXRSZXN1bHQobmFtZSkge1xuICAgIHJldHVybiB0aGlzLnF1ZXVlLmdldFJlc3VsdChuYW1lKTtcbiAgfSxcbiAgZ2V0U3ByaXRlU2hlZXQobmFtZSkge1xuICAgIGlmICghc3ByaXRlU2hlZXRzW25hbWVdKSB7XG4gICAgICBjb25zdCBkYXRhID0gc3ByaXRlU2hlZXRzRGF0YVtuYW1lXTtcblxuICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBzcHJpdGVTaGVldCBuYW1lJyk7XG4gICAgICB9XG5cbiAgICAgIGRhdGEuaW1hZ2VzID0gZGF0YS5pbWFnZXMubWFwKGltZyA9PiB0aGlzLmdldFJlc3VsdChpbWcpKTtcbiAgICAgIHNwcml0ZVNoZWV0c1tuYW1lXSA9IG5ldyBjcmVhdGVqcy5TcHJpdGVTaGVldChkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3ByaXRlU2hlZXRzW25hbWVdO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgYXNzZXRzTWFuYWdlcjtcbiIsImNvbnN0IGRhdGFNYW5hZ2VyID0ge1xuICBnYW1lVHlwZTogbnVsbCxcbiAgZ2FtZU1vZGU6IG51bGwsXG4gIHNjb3JlOiBudWxsLFxuICBtYXhTY29yZTogbnVsbCxcbiAgaGVyb1R5cGU6ICdtb25zdGVyJyxcbiAgcG9zOiBudWxsLFxuICB3aW46IG51bGwsXG4gIHNwaWtlczogbnVsbCxcbiAgYWN0aW9uczogbnVsbCxcbiAgdXNlcjoge1xuICAgIGlkOiBudWxsLFxuICAgIG5hbWU6IG51bGwsXG4gICAgc2V4OiBudWxsLFxuICB9LFxuICBlbmVteTogbnVsbCxcbiAgZmllbGRzOiB7XG4gICAgbm9ybWFsOiBbWzAsIDk5XSwgWzEwMCwgMTk5XV0sXG4gICAgdXBzaWRlRG93bjogW1syMDAsIDIyNF0sIFsyMjUsIDI0OV1dLFxuICAgIGJhY2t3YXJkOiBbWzI1MCwgMjc0XSwgWzI3NSwgMjk5XV0sXG4gICAgZmFzdDogW1szMDAsIDMyNF0sIFszMjUsIDM0OV1dLFxuICAgIHNsb3c6IFtbMzUwLCAzNzRdLCBbMzc1LCAzOTldXSxcbiAgICBlYXJ0aHF1YWtlOiBbWzQwMCwgNDI0XSwgWzQyNSwgNDQ5XV0sXG4gICAgZm9nOiBbWzQ1MCwgNDc0XSwgWzQ3NSwgNDk5XV0sXG4gIH0sXG4gIHNldChrZXksIHZhbHVlKSB7XG4gICAgdGhpc1trZXldID0gdmFsdWU7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBkYXRhTWFuYWdlcjtcbiIsImltcG9ydCBTdGFydFNjcmVlbiBmcm9tICcuLi9zY3JlZW5zL1N0YXJ0U2NyZWVuJztcbmltcG9ydCBNYWluU2NyZWVuIGZyb20gJy4uL3NjcmVlbnMvTWFpblNjcmVlbic7XG5pbXBvcnQgUFZQU2NyZWVuIGZyb20gJy4uL3NjcmVlbnMvUFZQU2NyZWVuJztcbmltcG9ydCBFbmRTY3JlZW4gZnJvbSAnLi4vc2NyZWVucy9FbmRTY3JlZW4nO1xuaW1wb3J0IFJhdGluZ1NjcmVlbiBmcm9tICcuLi9zY3JlZW5zL1JhdGluZ1NjcmVlbic7XG5cbmNvbnN0IHNjcmVlbk1hbmFnZXIgPSB7XG4gIGluaXQoc3RhZ2UpIHtcbiAgICB0aGlzLnN0YWdlID0gc3RhZ2U7XG4gICAgdGhpcy5jdXJyZW50U2NyZWVuID0gbnVsbDtcbiAgICB0aGlzLnNjcmVlbnMgPSB7XG4gICAgICBTdGFydFNjcmVlbixcbiAgICAgIE1haW5TY3JlZW4sXG4gICAgICBQVlBTY3JlZW4sXG4gICAgICBFbmRTY3JlZW4sXG4gICAgICBSYXRpbmdTY3JlZW4sXG4gICAgfTtcblxuICAgIGNyZWF0ZWpzLlRpY2tlci50aW1pbmdNb2RlID0gY3JlYXRlanMuVGlja2VyLlJBRjtcbiAgICBjcmVhdGVqcy5UaWNrZXIuYWRkRXZlbnRMaXN0ZW5lcigndGljaycsIGUgPT4ge1xuICAgICAgaWYgKHRoaXMuY3VycmVudFNjcmVlbiAmJiB0aGlzLmN1cnJlbnRTY3JlZW4udGljaykge1xuICAgICAgICB0aGlzLmN1cnJlbnRTY3JlZW4udGljayhlKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3RhZ2UudXBkYXRlKGUpO1xuICAgIH0pO1xuICB9LFxuICBjaGFuZ2UobmFtZSkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRTY3JlZW4pIHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRTY3JlZW4uZGVzdHJveSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRTY3JlZW4uZGVzdHJveSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5zdGFnZS5yZW1vdmVDaGlsZCh0aGlzLmN1cnJlbnRTY3JlZW4pO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRTY3JlZW4gPSBuZXcgdGhpcy5zY3JlZW5zW25hbWVdKHRoaXMuc3RhZ2UuY2FudmFzLndpZHRoLCB0aGlzLnN0YWdlLmNhbnZhcy5oZWlnaHQpO1xuICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5jdXJyZW50U2NyZWVuKTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNjcmVlbk1hbmFnZXI7XG4iLCJjb25zdCBzZXJ2ZXJNYW5hZ2VyID0ge1xuICBpbml0KCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiBWSy5pbml0KFxuICAgICAgKCkgPT4gcmVzb2x2ZSgpLFxuICAgICAgZSA9PiByZWplY3QoJ3ZrIGluaXQgZXJyb3InLCBlKSxcbiAgICAnNS42MCcpKTtcbiAgfSxcbiAgZ2V0VXNlcigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgVksuYXBpKCd1c2Vycy5nZXQnLCB7IGZpZWxkczogJ3NleCcgfSwgciA9PiB7XG4gICAgICAgIGlmIChyLmVycm9yKSB7XG4gICAgICAgICAgcmVqZWN0KHIuZXJyb3IpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKHIucmVzcG9uc2VbMF0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldChrZXksIGdsb2JhbCA9IDApIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBWSy5hcGkoJ3N0b3JhZ2UuZ2V0JywgeyBrZXksIGdsb2JhbCB9LCByZXNvbHZlKSlcbiAgICAgIC50aGVuKHIgPT4ge1xuICAgICAgICBpZiAoci5lcnJvcikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyLmVycm9yKTtcbiAgICAgICAgfSBlbHNlIGlmIChyLnJlc3BvbnNlID09PSAnJykge1xuICAgICAgICAgIC8vIGNhbnQgSlNPTi5wYXJzZSBlbXB0eSBzdHJpbmcgYnV0IG5lZWQgdG8gZ2V0IGRlZmF1bHQgdmFsdWVcbiAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoci5yZXNwb25zZSk7XG4gICAgICB9KTtcbiAgfSxcbiAgc2V0KGtleSwgdmFsdWUsIGdsb2JhbCA9IDApIHtcbiAgICBWSy5hcGkoJ3N0b3JhZ2Uuc2V0JywgeyBrZXksIHZhbHVlOiBKU09OLnN0cmluZ2lmeSh2YWx1ZSksIGdsb2JhbCB9KTtcbiAgfSxcbiAgc2hhcmUobWVzc2FnZSwgcGhvdG8pIHtcbiAgICBjb25zdCBwaG90b3MgPSB7XG4gICAgICBzaW5nbGU6ICdwaG90by0xMzU1NjMzODhfNDU2MjM5MDE3JyxcbiAgICAgIHB2cDogJ3Bob3RvLTEzNTU2MzM4OF80NTYyMzkwMjYnLFxuICAgIH07XG4gICAgVksuYXBpKCd3YWxsLnBvc3QnLCB7XG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgYXR0YWNobWVudHM6IGAke3Bob3Rvc1twaG90b119LCBodHRwczovL3ZrLmNvbS9hcHA1NzgyMTE4YCxcbiAgICAgIHNlcnZpY2VzOiAndHdpdHRlcicsXG4gICAgfSk7XG4gIH0sXG4gIGludml0ZSgpIHtcbiAgICBWSy5jYWxsTWV0aG9kKCdzaG93SW52aXRlQm94Jyk7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBzZXJ2ZXJNYW5hZ2VyO1xuIiwiY29uc3Qgc291bmRNYW5hZ2VyID0ge1xuICBpbml0KGVuYWJsZSkge1xuICAgIHRoaXMuZW5hYmxlZCA9IGVuYWJsZTtcbiAgICB0aGlzLmJnID0gY3JlYXRlanMuU291bmQucGxheSgnYmFjaycsIHsgbG9vcDogLTEsIHZvbHVtZTogMC4zIH0pO1xuICAgIHRoaXMuYmcucGF1c2VkID0gIXRoaXMuZW5hYmxlZDtcbiAgICAvLyBzb21ldGltZXMgbmVnYXRpdmUgdmFsdWUgb2NjdXJzIGFuZCB0aHJvdyBlcnJvclxuICAgIHRoaXMuYmcucG9zaXRpb24gPSAwO1xuICB9LFxuICB0b2dnbGUoKSB7XG4gICAgdGhpcy5lbmFibGVkID0gIXRoaXMuZW5hYmxlZDtcbiAgICB0aGlzLmJnLnBhdXNlZCA9ICF0aGlzLmVuYWJsZWQ7XG4gIH0sXG4gIGlzRW5hYmxlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5lbmFibGVkO1xuICB9LFxuICBwbGF5KHNvdW5kKSB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgY3JlYXRlanMuU291bmQucGxheShzb3VuZCk7XG4gICAgfVxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgc291bmRNYW5hZ2VyO1xuIiwiaW1wb3J0IHJhbmRvbUludCBmcm9tICdyYW5kb20taW50JztcbmltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuaW1wb3J0IHNjcmVlbnNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NjcmVlbnNNYW5hZ2VyJztcbmltcG9ydCBzZXJ2ZXJNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NlcnZlck1hbmFnZXInO1xuaW1wb3J0IGRhdGFNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2RhdGFNYW5hZ2VyJztcbmltcG9ydCBHdWkgZnJvbSAnLi4vZGlzcGxheS9HdWknO1xuaW1wb3J0IEJ0biBmcm9tICcuLi9kaXNwbGF5L0J0bic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVuZFNjcmVlbiBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuYmcgPSBuZXcgY3JlYXRlanMuQml0bWFwKGFzc2V0c01hbmFnZXIuZ2V0UmVzdWx0KCdzdGFydCcpKTtcbiAgICB0aGlzLmd1aSA9IG5ldyBHdWkod2lkdGgpO1xuXG4gICAgdGhpcy5tYXhTY29yZSA9IG5ldyBjcmVhdGVqcy5UZXh0KGDQoNC10LrQvtGA0LQ6ICR7ZGF0YU1hbmFnZXIubWF4U2NvcmV9INC8YCwgJzI1cHggR3VlcmlsbGEnLCAnIzAwMCcpO1xuICAgIHRoaXMubWF4U2NvcmUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgdGhpcy5tYXhTY29yZS54ID0gd2lkdGggLyAyO1xuICAgIHRoaXMubWF4U2NvcmUueSA9IDQwO1xuXG4gICAgdGhpcy5zY29yZSA9IG5ldyBjcmVhdGVqcy5UZXh0KGDQoNC10LfRg9C70YzRgtCw0YI6ICR7ZGF0YU1hbmFnZXIuc2NvcmV9INC8YCwgJzQwcHggR3VlcmlsbGEnLCAnIzAwMCcpO1xuICAgIHRoaXMuc2NvcmUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgdGhpcy5zY29yZS54ID0gd2lkdGggLyAyO1xuICAgIHRoaXMuc2NvcmUueSA9IDE1MDtcblxuICAgIHRoaXMucmVwbGF5QnRuID0gbmV3IEJ0bign0JXRidC1INGA0LDQtycpO1xuICAgIHRoaXMucmVwbGF5QnRuLnggPSB3aWR0aCAvIDI7XG4gICAgdGhpcy5yZXBsYXlCdG4ueSA9IDM1MDtcblxuICAgIHRoaXMuc2hhcmVCdG4gPSBuZXcgQnRuKCfQn9C+0LTQtdC70LjRgtGM0YHRjycsICdvcmFuZ2UnKTtcbiAgICB0aGlzLnNoYXJlQnRuLnggPSB3aWR0aCAvIDI7XG4gICAgdGhpcy5zaGFyZUJ0bi55ID0gNDQwO1xuXG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmJnLCB0aGlzLmd1aSwgdGhpcy5tYXhTY29yZSwgdGhpcy5zY29yZSwgdGhpcy5yZXBsYXlCdG4sIHRoaXMuc2hhcmVCdG4pO1xuXG4gICAgaWYgKGRhdGFNYW5hZ2VyLnNjb3JlID4gZGF0YU1hbmFnZXIubWF4U2NvcmUpIHtcbiAgICAgIHRoaXMubWF4U2NvcmUudGV4dCA9IGDQn9GA0L7RiNC70YvQuSDRgNC10LrQvtGA0LQ6ICR7ZGF0YU1hbmFnZXIubWF4U2NvcmV9INC8YDtcbiAgICAgIGRhdGFNYW5hZ2VyLm1heFNjb3JlID0gZGF0YU1hbmFnZXIuc2NvcmU7XG4gICAgICBzZXJ2ZXJNYW5hZ2VyLnNldCgnbWF4U2NvcmUnLCBkYXRhTWFuYWdlci5tYXhTY29yZSk7XG4gICAgICB0aGlzLnNjb3JlLnRleHQgPSBg0J3QvtCy0YvQuSDRgNC10LrQvtGA0LQ6ICR7ZGF0YU1hbmFnZXIubWF4U2NvcmV9INC8IWA7XG5cbiAgICAgIHNlcnZlck1hbmFnZXIuZ2V0KCdyYXRpbmdUYWJsZScsIDEpLnRoZW4ocmVjYWxjUmF0aW5nVGFibGUpO1xuICAgIH1cblxuICAgIGlmIChkYXRhTWFuYWdlci5nYW1lVHlwZSA9PT0gJ3B2cCcpIHtcbiAgICAgIHRoaXMucHZwVGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KCcnLCAnMjVweCBHdWVyaWxsYScsICcjMDAwJyk7XG4gICAgICB0aGlzLnB2cFRleHQudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICB0aGlzLnB2cFRleHQueCA9IHdpZHRoIC8gMjtcbiAgICAgIHRoaXMucHZwVGV4dC55ID0gMjMwO1xuICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLnB2cFRleHQpO1xuXG4gICAgICBpZiAoZGF0YU1hbmFnZXIud2luKSB7XG4gICAgICAgIHRoaXMucHZwVGV4dC50ZXh0ICs9IGAke2RhdGFNYW5hZ2VyLmVuZW15Lm5hbWV9INCx0YvQuyR7ZGF0YU1hbmFnZXIuZW5lbXkuc2V4ICE9PSAyID8gJ9CwJyA6ICcnfSDQv9C+0LLQtdGA0LbQtdC9JHtkYXRhTWFuYWdlci5lbmVteS5zZXggIT09IDIgPyAn0LAnIDogJyd9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucHZwVGV4dC50ZXh0ICs9IGAke2RhdGFNYW5hZ2VyLmVuZW15Lm5hbWV9INC/0L7QstC10YDQsyR7ZGF0YU1hbmFnZXIuZW5lbXkuc2V4ICE9PSAyID8gJ9C70LAnIDogJyd9INCS0LDRgWA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcmFuZ2UgPSBkYXRhTWFuYWdlci5maWVsZHNbZGF0YU1hbmFnZXIuZ2FtZU1vZGVdW2RhdGFNYW5hZ2VyLnBvc107XG4gICAgY29uc3QgZmllbGQgPSBgcHZwJHtyYW5kb21JbnQocmFuZ2VbMF0sIHJhbmdlWzFdKX1gO1xuICAgIGNvbnN0IHJlY29yZCA9IHtcbiAgICAgIHVzZXI6IGRhdGFNYW5hZ2VyLnVzZXIsXG4gICAgICBzcGlrZXM6IGRhdGFNYW5hZ2VyLnNwaWtlcyxcbiAgICAgIGFjdGlvbnM6IGRhdGFNYW5hZ2VyLmFjdGlvbnMsXG4gICAgfTtcblxuICAgIHNlcnZlck1hbmFnZXIuZ2V0KGZpZWxkLCAxKS50aGVuKHIgPT4ge1xuICAgICAgY29uc29sZS53YXJuKGZpZWxkKTtcbiAgICAgIGNvbnNvbGUud2FybihyZWNvcmQpO1xuICAgICAgY29uc29sZS53YXJuKHIpO1xuXG4gICAgICBpZiAoKCFyIHx8IHIuc3Bpa2VzLmxlbmd0aCAqIDAuNSA8IHJlY29yZC5zcGlrZXMubGVuZ3RoKSAmJlxuICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHJlY29yZCkubGVuZ3RoIDwgNDA5Nikge1xuICAgICAgICBjb25zb2xlLndhcm4odHJ1ZSk7XG4gICAgICAgIHNlcnZlck1hbmFnZXIuc2V0KGZpZWxkLCByZWNvcmQsIDEpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gIH1cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLnJlcGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlcGxheSk7XG4gICAgdGhpcy5zaGFyZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNoYXJlKTtcblxuICAgIHRoaXMub25LZXlEb3duID0gZSA9PiB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAzMikge1xuICAgICAgICByZXBsYXkoKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH07XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bik7XG4gIH1cbiAgZGVzdHJveSgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlEb3duKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZXBsYXkoKSB7XG4gIHN3aXRjaCAoZGF0YU1hbmFnZXIuZ2FtZVR5cGUpIHtcbiAgICBjYXNlICdzaW5nbGUnOlxuICAgICAgc2NyZWVuc01hbmFnZXIuY2hhbmdlKCdNYWluU2NyZWVuJyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdwdnAnOlxuICAgICAgc2NyZWVuc01hbmFnZXIuY2hhbmdlKCdQVlBTY3JlZW4nKTtcbiAgICAgIGJyZWFrO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNoYXJlICgpIHtcbiAgbGV0IG1lc3NhZ2UgPSAnJztcbiAgc3dpdGNoIChkYXRhTWFuYWdlci5nYW1lVHlwZSkge1xuICAgIGNhc2UgJ3NpbmdsZSc6XG4gICAgICBtZXNzYWdlID0gYNCvINC/0YDQvtC70LXRgtC10Lske2RhdGFNYW5hZ2VyLnVzZXIuc2V4ICE9PSAyID8gJ9CwJyA6ICcnfSAke2RhdGFNYW5hZ2VyLnNjb3JlfSDQvCDQsiDQuNCz0YDQtSBGbGFwcHkgTW9uc3RlciFgO1xuICAgICAgaWYgKGRhdGFNYW5hZ2VyLnNjb3JlID09PSBkYXRhTWFuYWdlci5tYXhTY29yZSkge1xuICAgICAgICBtZXNzYWdlICs9ICdcXG7QrdGC0L4g0LzQvtC5INC90L7QstGL0Lkg0YDQtdC60L7RgNC0ISAnO1xuICAgICAgfVxuICAgICAgbWVzc2FnZSArPSAnXFxu0JAg0YHQutC+0LvRjNC60L4g0YHQvNC+0LbQtdGI0Ywg0YLRiz8nO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncHZwJzpcbiAgICAgIGlmIChkYXRhTWFuYWdlci53aW4pIHtcbiAgICAgICAgbWVzc2FnZSArPSBgJHtkYXRhTWFuYWdlci5lbmVteS5uYW1lfSDQsdGL0Lske2RhdGFNYW5hZ2VyLmVuZW15LnNleCAhPT0gMiA/ICfQsCcgOiAnJ30g0L/QvtCy0LXRgNC20LXQvSR7ZGF0YU1hbmFnZXIuZW5lbXkuc2V4ICE9PSAyID8gJ9CwJyA6ICcnfSDQvNC90L7QuSDQsiDQuNCz0YDQtSBGbGFwcHkgTW9uc3RlciFgO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWVzc2FnZSArPSBgJHtkYXRhTWFuYWdlci5lbmVteS5uYW1lfSDQv9C+0LLQtdGA0LMke2RhdGFNYW5hZ2VyLmVuZW15LnNleCAhPT0gMiA/ICfQu9CwJyA6ICcnfSDQvNC10L3RjyDQsiDQuNCz0YDQtSBGbGFwcHkgTW9uc3RlcixcbiAgICAgICAgICAgICAgICAgICDQvdGDINC90LjRh9C10LPQviwg0LXRidC1INGD0LLQuNC00LjQvNGB0Y8uLi5gO1xuICAgICAgfVxuICAgICAgaWYgKGRhdGFNYW5hZ2VyLnNjb3JlID09PSBkYXRhTWFuYWdlci5tYXhTY29yZSkge1xuICAgICAgICBtZXNzYWdlICs9IGBcXG7QnNC+0Lkg0L3QvtCy0YvQuSDRgNC10LrQvtGA0LQgJHtkYXRhTWFuYWdlci5zY29yZX0g0LwhYDtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICB9XG4gIHNlcnZlck1hbmFnZXIuc2hhcmUobWVzc2FnZSwgZGF0YU1hbmFnZXIuZ2FtZVR5cGUpO1xufVxuXG5mdW5jdGlvbiByZWNhbGNSYXRpbmdUYWJsZShyYXRpbmdUYWJsZSkge1xuICBpZiAocmF0aW5nVGFibGVbcmF0aW5nVGFibGUubGVuZ3RoIC0gMV0uc2NvcmUgPj0gZGF0YU1hbmFnZXIubWF4U2NvcmUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCB1c2VyUmF0aW5nID0gcmF0aW5nVGFibGUuZmluZChlbCA9PiBlbC5pZCA9PT0gZGF0YU1hbmFnZXIudXNlci5pZCk7XG5cbiAgaWYgKHVzZXJSYXRpbmcpIHtcbiAgICB1c2VyUmF0aW5nLnNjb3JlID0gZGF0YU1hbmFnZXIubWF4U2NvcmU7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgbmV3UmF0aW5nID0ge1xuICAgICAgaWQ6IGRhdGFNYW5hZ2VyLnVzZXIuaWQsXG4gICAgICBuYW1lOiBkYXRhTWFuYWdlci51c2VyLm5hbWUsXG4gICAgICBzY29yZTogZGF0YU1hbmFnZXIubWF4U2NvcmUsXG4gICAgfTtcbiAgICBpZiAocmF0aW5nVGFibGUubGVuZ3RoIDwgMTApIHtcbiAgICAgIHJhdGluZ1RhYmxlLnB1c2gobmV3UmF0aW5nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmF0aW5nVGFibGVbcmF0aW5nVGFibGUubGVuZ3RoIC0gMV0gPSBuZXdSYXRpbmc7XG4gICAgfVxuICB9XG5cbiAgcmF0aW5nVGFibGUuc29ydCgoYSwgYikgPT4gYi5zY29yZSAtIGEuc2NvcmUpO1xuICBzZXJ2ZXJNYW5hZ2VyLnNldCgncmF0aW5nVGFibGUnLCByYXRpbmdUYWJsZSwgMSk7XG59XG4iLCJpbXBvcnQgcmFuZG9tSW50IGZyb20gJ3JhbmRvbS1pbnQnO1xuaW1wb3J0IHNjcmVlbnNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NjcmVlbnNNYW5hZ2VyJztcbmltcG9ydCBkYXRhTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9kYXRhTWFuYWdlcic7XG5pbXBvcnQgQmFja2dyb3VuZCBmcm9tICcuLi9kaXNwbGF5L0JhY2tncm91bmQnO1xuaW1wb3J0IEhlcm8gZnJvbSAnLi4vZGlzcGxheS9IZXJvJztcbmltcG9ydCBTcGlrZSBmcm9tICcuLi9kaXNwbGF5L1NwaWtlJztcbmltcG9ydCBTaGFkb3dPdmVybGF5IGZyb20gJy4uL2Rpc3BsYXkvU2hhZG93T3ZlcmxheSc7XG5cbmNvbnN0IEdST1VORF9IRUlHSFQgPSA4MDtcbmNvbnN0IFNUQVJUX1NQRUVEID0gNTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpblNjcmVlbiBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgdGhpcy5zcGVlZCA9IFNUQVJUX1NQRUVEO1xuICAgIHRoaXMuc3Bpa2VTY2FsZSA9IDAuNztcbiAgICB0aGlzLnN0ZXAgPSAwO1xuICAgIHRoaXMuZGlzdGFuY2UgPSAwO1xuXG4gICAgZGF0YU1hbmFnZXIuZ2FtZVR5cGUgPSAnc2luZ2xlJztcbiAgICBkYXRhTWFuYWdlci5hY3Rpb25zID0ge307XG4gICAgZGF0YU1hbmFnZXIuc3Bpa2VzID0gW107XG4gICAgZGF0YU1hbmFnZXIucG9zID0gMDtcblxuICAgIHRoaXMuc2hhZG93T3ZlcmxheSA9IG5ldyBTaGFkb3dPdmVybGF5KHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB0aGlzLmNyZWF0ZUJnKCk7XG4gICAgdGhpcy5jcmVhdGVTcGlrZXMoKTtcbiAgICB0aGlzLmNyZWF0ZUhlcm8oKTtcbiAgICB0aGlzLmNyZWF0ZUh1ZCgpO1xuXG4gICAgdGhpcy5wYXVzZSgn0J/RgNC+0LHQtdC7IC0g0LLQt9C80LDRhSDQutGA0YvQu9GM0Y/QvNC4LCBlc2MgLSDQv9Cw0YPQt9CwJyk7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG5cbiAgICB0aGlzLnRpdGxlID0gbmV3IGNyZWF0ZWpzLlRleHQoJycsICc2NXB4IEd1ZXJpbGxhJywgJyNmZmYnKTtcbiAgICB0aGlzLnRpdGxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRoaXMudGl0bGUudGV4dEJhc2VsaW5lID0gJ21pZGRsZSc7XG4gICAgdGhpcy50aXRsZS54ID0gd2lkdGggLyAyO1xuICAgIHRoaXMudGl0bGUueSA9IDIyNTtcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMudGl0bGUpO1xuXG4gICAgLy8gbm9ybWFsIG1vZGUgb24gZmlyc3QgZmx5XG4gICAgc3dpdGNoIChkYXRhTWFuYWdlci5tYXhTY29yZSA/IHJhbmRvbUludCgxMCkgOiAxMCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICBkYXRhTWFuYWdlci5nYW1lTW9kZSA9ICd1cHNpZGVEb3duJztcbiAgICAgICAgdGhpcy50aXRsZS50ZXh0ID0gJ9CS0LLQtdGA0YUg0L3QvtCz0LDQvNC4ISc7XG4gICAgICAgIHRoaXMudGl0bGUueSA9IGhlaWdodCAtIHRoaXMudGl0bGUueTtcbiAgICAgICAgdGhpcy5zaGFkb3dPdmVybGF5LnNldFRleHQoJ9Cc0LjRgCDQv9C10YDQtdCy0LXRgNC90YPQu9GB0Y8nKTtcbiAgICAgICAgdGhpcy5odWREaXN0YW5jZS55ID0gaGVpZ2h0IC0gdGhpcy5odWREaXN0YW5jZS55O1xuICAgICAgICB0aGlzLmh1ZERpc3RhbmNlLmNvbG9yID0gJyNmZmYnO1xuICAgICAgICB0aGlzLnkgPSB0aGlzLnNoYWRvd092ZXJsYXkueSA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5zY2FsZVkgPSB0aGlzLnNoYWRvd092ZXJsYXkuc2NhbGVZID0gdGhpcy50aXRsZS5zY2FsZVkgPSB0aGlzLmh1ZERpc3RhbmNlLnNjYWxlWSA9IC0xO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgZGF0YU1hbmFnZXIuZ2FtZU1vZGUgPSAnYmFja3dhcmQnO1xuICAgICAgICB0aGlzLnRpdGxlLnRleHQgPSAn0KPRgNCw0LPQsNC9ISc7XG4gICAgICAgIHRoaXMuc2hhZG93T3ZlcmxheS5zZXRUZXh0KCfQn9GC0LjRhtGDINGB0LTRg9Cy0LDQtdGCINC90LDQt9Cw0LQnKTtcbiAgICAgICAgdGhpcy50aXRsZS54ID0gd2lkdGggLSB0aGlzLnRpdGxlLng7XG4gICAgICAgIHRoaXMuaHVkRGlzdGFuY2UueCA9IHdpZHRoIC0gdGhpcy5odWREaXN0YW5jZS54O1xuICAgICAgICB0aGlzLnggPSB0aGlzLnNoYWRvd092ZXJsYXkueCA9IHdpZHRoO1xuICAgICAgICB0aGlzLnNjYWxlWCA9IHRoaXMuaGVyby5zY2FsZVggPSB0aGlzLnNoYWRvd092ZXJsYXkuc2NhbGVYID0gdGhpcy50aXRsZS5zY2FsZVggPSB0aGlzLmh1ZERpc3RhbmNlLnNjYWxlWCA9IC0xO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgZGF0YU1hbmFnZXIuZ2FtZU1vZGUgPSAnZmFzdCc7XG4gICAgICAgIHRoaXMudGl0bGUudGV4dCA9ICfQn9C+0L/Rg9GC0L3Ri9C5INCy0LXRgtC10YAhJztcbiAgICAgICAgdGhpcy5zaGFkb3dPdmVybGF5LnNldFRleHQoJ9Ch0LrQvtGA0L7RgdGC0Ywg0L/QvtC70LXRgtCwINC/0L7QstGL0YjQtdC90LAnKTtcbiAgICAgICAgdGhpcy5zcGVlZCArPSAyO1xuICAgICAgICB0aGlzLnNwaWtlU2NhbGUgLT0gMC4yNTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGRhdGFNYW5hZ2VyLmdhbWVNb2RlID0gJ3Nsb3cnO1xuICAgICAgICB0aGlzLnRpdGxlLnRleHQgPSAn0JLRgdGC0YDQtdGH0L3Ri9C5INCy0LXRgtC10YAhJztcbiAgICAgICAgdGhpcy5zaGFkb3dPdmVybGF5LnNldFRleHQoJ9Ch0LrQvtGA0L7RgdGC0Ywg0L/QvtC70LXRgtCwINGB0L3QuNC20LXQvdCwJyk7XG4gICAgICAgIHRoaXMuc3BlZWQgLT0gMTtcbiAgICAgICAgdGhpcy5zcGlrZVNjYWxlICs9IDAuMDc1O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgZGF0YU1hbmFnZXIuZ2FtZU1vZGUgPSAnZWFydGhxdWFrZSc7XG4gICAgICAgIHRoaXMudGl0bGUudGV4dCA9ICfQl9C10LzQu9C10YLRgNGP0YHQtdC90LjQtSEnO1xuICAgICAgICB0aGlzLnNoYWRvd092ZXJsYXkuc2V0VGV4dCgn0JrQvtC70YzRjyDRgNCw0YHQutCw0YfQuNCy0LDRjtGC0YHRjycpO1xuICAgICAgICB0aGlzLnNwaWtlcy5mb3JFYWNoKChzcGlrZSwgaSkgPT4ge1xuICAgICAgICAgIHNwaWtlLnR3ZWVuID0gY3JlYXRlanMuVHdlZW4uZ2V0KHNwaWtlLCB7IGxvb3A6IHRydWUsIHBhdXNlZDogdHJ1ZSB9KVxuICAgICAgICAgICAgLnRvKHsgc2tld1g6IDkgfSwgOTAwICsgaSAqIDEwMClcbiAgICAgICAgICAgIC50byh7IHNrZXdYOiAtOSB9LCAxODAwICsgaSAqIDIwMClcbiAgICAgICAgICAgIC50byh7IHNrZXdYOiAwIH0sIDkwMCArIGkgKiAxMDApO1xuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDU6XG4gICAgICAgIGRhdGFNYW5hZ2VyLmdhbWVNb2RlID0gJ2ZvZyc7XG4gICAgICAgIHRoaXMudGl0bGUudGV4dCA9ICfQotGD0LzQsNC9ISc7XG4gICAgICAgIHRoaXMuc2hhZG93T3ZlcmxheS5zZXRUZXh0KCfQktC40LTQuNC80L7RgdGC0Ywg0YHQvdC40LbQtdC90LAnKTtcbiAgICAgICAgdGhpcy5zcGVlZCAtPSAxLjI7XG4gICAgICAgIHRoaXMuZm9nID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG4gICAgICAgIHRoaXMuZm9nLmdyYXBoaWNzXG4gICAgICAgICAgLmJlZ2luUmFkaWFsR3JhZGllbnRGaWxsKFxuICAgICAgICAgICAgWydyZ2JhKDI1NSwgMjU1LCAyNTUsIDApJywgJ3JnYmEoMjU1LCAyNTUsIDI1NSwgLjY1KScsICdyZ2JhKDI1NSwgMjU1LCAyNTUsIC44NSknLCAncmdiYSgyNTUsIDI1NSwgMjU1LCAuOTcpJywgJyNmZmYnXSxcbiAgICAgICAgICAgIFswLCAwLjUsIDAuNywgMC45LCAxXSwgMCwgMCwgMCwgMCwgMCwgMzgwKVxuICAgICAgICAgIC5kcmF3UmVjdCgtdGhpcy53aWR0aCAvIDIsIC10aGlzLmhlaWdodCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQgKiAyKTtcbiAgICAgICAgdGhpcy5mb2cueCA9IHRoaXMuaGVyby54O1xuICAgICAgICB0aGlzLmZvZy55ID0gdGhpcy5oZXJvLnk7XG4gICAgICAgIHRoaXMuZm9nLmFkZEV2ZW50TGlzdGVuZXIoJ3RpY2snLCAoKSA9PiB7XG4gICAgICAgICAgaWYgKCF0aGlzLmhlcm8uZGVhZCkge1xuICAgICAgICAgICAgdGhpcy5mb2cueSA9IHRoaXMuaGVyby55O1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5mb2cpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGRhdGFNYW5hZ2VyLmdhbWVNb2RlID0gJ25vcm1hbCc7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB0aGlzLnNwaWtlcy5mb3JFYWNoKHNwaWtlID0+IHRoaXMucmVzZXRTcGlrZShzcGlrZSkpO1xuICAgIGNvbnNvbGUubG9nKGRhdGFNYW5hZ2VyLmdhbWVNb2RlKTtcbiAgfVxuICBjcmVhdGVCZygpIHtcbiAgICB0aGlzLmJnU2t5ID0gbmV3IEJhY2tncm91bmQoJ3NreScsIHRoaXMud2lkdGgpO1xuICAgIHRoaXMuYmdNb3VudGFpbiA9IG5ldyBCYWNrZ3JvdW5kKCdtb3VudGFpbicsIHRoaXMud2lkdGgpO1xuICAgIHRoaXMuYmdHcm91bmQgPSBuZXcgQmFja2dyb3VuZCgnZ3JvdW5kJywgdGhpcy53aWR0aCk7XG4gICAgdGhpcy5iZ1NreS55ID0gdGhpcy5iZ01vdW50YWluLnkgPSB0aGlzLmJnR3JvdW5kLnkgPSB0aGlzLmhlaWdodDtcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuYmdTa3ksIHRoaXMuYmdNb3VudGFpbiwgdGhpcy5iZ0dyb3VuZCk7XG4gIH1cbiAgY3JlYXRlU3Bpa2VzKCkge1xuICAgIHRoaXMuc3Bpa2VzID0gW25ldyBTcGlrZSgpLCBuZXcgU3Bpa2UoKV07XG4gICAgdGhpcy5zcGlrZXNbMF0ueCA9IC10aGlzLnNwaWtlc1swXS5ib3VuZHMud2lkdGggLyAyO1xuICAgIHRoaXMuc3Bpa2VzWzFdLnggPSB0aGlzLndpZHRoIC8gMjtcbiAgICB0aGlzLmFkZENoaWxkKC4uLnRoaXMuc3Bpa2VzKTtcbiAgfVxuICBjcmVhdGVIZXJvKCkge1xuICAgIHRoaXMuaGVybyA9IG5ldyBIZXJvKGRhdGFNYW5hZ2VyLmhlcm9UeXBlKTtcbiAgICB0aGlzLmhlcm8ueCA9IHRoaXMud2lkdGggLyAyO1xuICAgIHRoaXMuaGVyby55ID0gMTkwO1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5oZXJvKTtcbiAgfVxuICBjcmVhdGVIdWQoKSB7XG4gICAgdGhpcy5odWREaXN0YW5jZSA9IG5ldyBjcmVhdGVqcy5UZXh0KCcwINC8JywgJzI1cHggR3VlcmlsbGEnLCAnIzAwMCcpO1xuICAgIHRoaXMuaHVkRGlzdGFuY2UueCA9IDIwO1xuICAgIHRoaXMuaHVkRGlzdGFuY2UueSA9IDE1O1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5odWREaXN0YW5jZSk7XG4gIH1cbiAgcmVzZXRTcGlrZShzcGlrZSkge1xuICAgIHNwaWtlLnNjYWxlWSA9ICsodGhpcy5zcGlrZVNjYWxlICsgTWF0aC5yYW5kb20oKSAqIDAuNDUpLnRvRml4ZWQoMik7XG4gICAgc3Bpa2UueCArPSB0aGlzLndpZHRoICsgc3Bpa2UuYm91bmRzLndpZHRoO1xuICAgIGlmIChNYXRoLnJhbmRvbSgpID4gMC41KSB7XG4gICAgICBzcGlrZS55ID0gdGhpcy5oZWlnaHQgLSBHUk9VTkRfSEVJR0hUO1xuICAgIH0gZWxzZSB7XG4gICAgICBzcGlrZS55ID0gMDtcbiAgICAgIHNwaWtlLnNjYWxlWSA9IC1zcGlrZS5zY2FsZVk7XG4gICAgfVxuICAgIGRhdGFNYW5hZ2VyLnNwaWtlcy5wdXNoKHNwaWtlLnNjYWxlWSk7XG4gIH1cbiAgcGF1c2UodGV4dCkge1xuICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcbiAgICB0aGlzLnNoYWRvd092ZXJsYXkuc2V0VGV4dCh0ZXh0KTtcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuc2hhZG93T3ZlcmxheSk7XG4gIH1cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5oYW5kbGVBY3Rpb24oKSk7XG4gICAgdGhpcy5vbktleURvd24gPSBlID0+IHtcbiAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgMzI6XG4gICAgICAgICAgdGhpcy5oYW5kbGVBY3Rpb24oKTtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjc6XG4gICAgICAgICAgdGhpcy50b2dnbGVQYXVzZSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlEb3duKTtcbiAgfVxuICBoYW5kbGVBY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMucGF1c2VkKSB7XG4gICAgICBpZiAodGhpcy50aXRsZSkge1xuICAgICAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMudGl0bGUpO1xuICAgICAgICB0aGlzLnRpdGxlID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHRoaXMudG9nZ2xlUGF1c2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oZXJvLmZsYXAoKTtcbiAgICAgIGRhdGFNYW5hZ2VyLmFjdGlvbnNbdGhpcy5zdGVwXSA9IDE7XG4gICAgfVxuICB9XG4gIHRvZ2dsZVBhdXNlKCkge1xuICAgIGlmICh0aGlzLnBhdXNlZCkge1xuICAgICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5zaGFkb3dPdmVybGF5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYXVzZSgn0J3QsNC20LzQuNGC0LUg0L/RgNC+0LHQtdC7INC40LvQuCBlc2MnKTtcbiAgICB9XG4gICAgaWYgKGRhdGFNYW5hZ2VyLmdhbWVNb2RlID09PSAnZWFydGhxdWFrZScpIHtcbiAgICAgIHRoaXMuc3Bpa2VzLmZvckVhY2goc3Bpa2UgPT4gc3Bpa2UudHdlZW4uc2V0UGF1c2VkKHRoaXMucGF1c2VkKSk7XG4gICAgfVxuICB9XG4gIG1vdmVXb3JsZCgpIHtcbiAgICBpZiAodGhpcy5oZXJvLmRlYWQpIHtcbiAgICAgIHRoaXMuaGVyby54ICs9IHRoaXMuc3BlZWQgKiAwLjU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW92ZVNwaWtlcyh0aGlzLnNwZWVkKTtcbiAgICAgIHRoaXMuYmdTa3kubW92ZSh0aGlzLnNwZWVkICogMC4xKTtcbiAgICAgIHRoaXMuYmdNb3VudGFpbi5tb3ZlKHRoaXMuc3BlZWQgKiAwLjMpO1xuICAgICAgdGhpcy5iZ0dyb3VuZC5tb3ZlKHRoaXMuc3BlZWQpO1xuXG4gICAgICB0aGlzLmRpc3RhbmNlICs9IHRoaXMuc3BlZWQ7XG4gICAgICBkYXRhTWFuYWdlci5zY29yZSA9IE1hdGguZmxvb3IodGhpcy5kaXN0YW5jZSAvIDI1KTtcbiAgICAgIHRoaXMuaHVkRGlzdGFuY2UudGV4dCA9IGAke2RhdGFNYW5hZ2VyLnNjb3JlfSDQvGA7XG4gICAgfVxuICB9XG4gIG1vdmVTcGlrZXMoKSB7XG4gICAgdGhpcy5zcGlrZXMuZm9yRWFjaChzcGlrZSA9PiB7XG4gICAgICBzcGlrZS54IC09IHRoaXMuc3BlZWQ7XG4gICAgICBpZiAoc3Bpa2UueCA8IC1zcGlrZS5ib3VuZHMud2lkdGggLyAyKSB7XG4gICAgICAgIHRoaXMucmVzZXRTcGlrZShzcGlrZSk7XG4gICAgICAgIHRoaXMuc3BlZWQgKz0gMC4wNDtcbiAgICAgIH1cbiAgICAgIGlmIChuZGdtci5jaGVja1BpeGVsQ29sbGlzaW9uKHRoaXMuaGVybywgc3Bpa2UpKSB7XG4gICAgICAgIHRoaXMuaGVyby5kaWUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBtb3ZlSGVybygpIHtcbiAgICB0aGlzLmhlcm8ubW92ZSgpO1xuICAgIGlmICh0aGlzLmhlcm8ueSA8IDApIHtcbiAgICAgIHRoaXMuaGVyby52WSA9IDA7XG4gICAgICB0aGlzLmhlcm8ueSA9IDA7XG4gICAgfSBlbHNlIGlmICh0aGlzLmhlcm8ueSA+IHRoaXMuaGVpZ2h0ICsgdGhpcy5oZXJvLmJvdW5kcy5oZWlnaHQgLyAyKSB7XG4gICAgICBzY3JlZW5zTWFuYWdlci5jaGFuZ2UoJ0VuZFNjcmVlbicpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5oZXJvLnkgPiB0aGlzLmhlaWdodCAtIChHUk9VTkRfSEVJR0hUICsgdGhpcy5oZXJvLmJvdW5kcy5oZWlnaHQgLyAyKSkge1xuICAgICAgdGhpcy5oZXJvLmRpZSgpO1xuICAgIH1cbiAgfVxuICB0aWNrKCkge1xuICAgIGlmICh0aGlzLnBhdXNlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm1vdmVXb3JsZCgpO1xuICAgIHRoaXMubW92ZUhlcm8oKTtcbiAgICB0aGlzLnN0ZXAgKz0gMTtcbiAgfVxuICBkZXN0cm95KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd24pO1xuICB9XG59XG4iLCJpbXBvcnQgcmFuZG9tSW50IGZyb20gJ3JhbmRvbS1pbnQnO1xuaW1wb3J0IHNjcmVlbnNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NjcmVlbnNNYW5hZ2VyJztcbmltcG9ydCBzZXJ2ZXJNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NlcnZlck1hbmFnZXInO1xuaW1wb3J0IGRhdGFNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2RhdGFNYW5hZ2VyJztcbmltcG9ydCBCYWNrZ3JvdW5kIGZyb20gJy4uL2Rpc3BsYXkvQmFja2dyb3VuZCc7XG5pbXBvcnQgSGVybyBmcm9tICcuLi9kaXNwbGF5L0hlcm8nO1xuaW1wb3J0IFNwaWtlIGZyb20gJy4uL2Rpc3BsYXkvU3Bpa2UnO1xuaW1wb3J0IEJ0biBmcm9tICcuLi9kaXNwbGF5L0J0bic7XG5cbmNvbnN0IEdST1VORF9IRUlHSFQgPSA4MDtcbmNvbnN0IFNUQVJUX1NQRUVEID0gNTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpblNjcmVlbiBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgdGhpcy5zcGVlZCA9IFNUQVJUX1NQRUVEO1xuICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5jcmVhdGVCZygpO1xuXG4gICAgY29uc3Qgd2F0aW5nVGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KCfQmNC00LXRgiDQv9C+0LTQsdC+0YAg0YHQvtC/0LXRgNC90LjQutCwJywgJzM1cHggR3VlcmlsbGEnLCAnIzAwMCcpO1xuICAgIHdhdGluZ1RleHQudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgd2F0aW5nVGV4dC54ID0gd2lkdGggLyAyO1xuICAgIHdhdGluZ1RleHQueSA9IDE3MDtcblxuICAgIGNvbnN0IGNhbmNlbEJ0biA9IG5ldyBCdG4oJ9Ce0YLQvNC10L3QsCcsICdvcmFuZ2UnKTtcbiAgICBjYW5jZWxCdG4ueCA9IHdpZHRoIC8gMjtcbiAgICBjYW5jZWxCdG4ueSA9IDM0MDtcbiAgICBjYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzY3JlZW5zTWFuYWdlci5jaGFuZ2UoJ1N0YXJ0U2NyZWVuJykpO1xuXG4gICAgdGhpcy5hZGRDaGlsZCh3YXRpbmdUZXh0LCBjYW5jZWxCdG4pO1xuXG4gICAgZGF0YU1hbmFnZXIucG9zID0gcmFuZG9tSW50KDEpO1xuICAgIGNvbnN0IGVuZW15UmFuZ2UgPSBkYXRhTWFuYWdlci5maWVsZHNbZGF0YU1hbmFnZXIuZ2FtZU1vZGVdWzEgLSBkYXRhTWFuYWdlci5wb3NdO1xuICAgIGNvbnN0IGVuZW15RmllbGQgPSBgcHZwJHtyYW5kb21JbnQoZW5lbXlSYW5nZVswXSwgZW5lbXlSYW5nZVsxXSl9YDtcbiAgICBjb25zb2xlLndhcm4oZW5lbXlGaWVsZCk7XG5cbiAgICBQcm9taXNlLmFsbChbXG4gICAgICBzZXJ2ZXJNYW5hZ2VyLmdldChlbmVteUZpZWxkLCAxKS50aGVuKHIgPT4gdGhpcy5pbml0RGF0YShyKSksXG4gICAgICBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgTWF0aC5yYW5kb20oKSAqIDIwMDAgKyA1MDApKSxcbiAgICBdKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgdGhpcy5yZW1vdmVDaGlsZCh3YXRpbmdUZXh0LCBjYW5jZWxCdG4pO1xuICAgIH0pLmNhdGNoKGUgPT4ge1xuICAgICAgd2F0aW5nVGV4dC50ZXh0ID0gJ1BWUCDQstGA0LXQvNC10L3QvdC+INC90LXQtNC+0YHRgtGD0L/QvdC+IDooJztcbiAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgfVxuICBpbml0RGF0YShyZWNvcmQpIHtcbiAgICBkYXRhTWFuYWdlci5nYW1lVHlwZSA9ICdwdnAnO1xuICAgIGRhdGFNYW5hZ2VyLmdhbWVNb2RlID0gJ25vcm1hbCc7XG4gICAgZGF0YU1hbmFnZXIud2luID0gZmFsc2U7XG4gICAgZGF0YU1hbmFnZXIuYWN0aW9ucyA9IHt9O1xuICAgIGRhdGFNYW5hZ2VyLnNwaWtlcyA9IFtdO1xuICAgIGRhdGFNYW5hZ2VyLmVuZW15ID0gcmVjb3JkLnVzZXI7XG4gICAgdGhpcy5lbmVteVNwaWtlcyA9IHJlY29yZC5zcGlrZXM7XG4gICAgdGhpcy5lbmVteUFjdGlvbnMgPSByZWNvcmQuYWN0aW9ucztcbiAgICBpZiAoZGF0YU1hbmFnZXIudXNlci5pZCA9PT0gcmVjb3JkLnVzZXIuaWQpIHtcbiAgICAgIGRhdGFNYW5hZ2VyLmVuZW15Lm5hbWUgPSAn0J/RgNC40LfRgNCw0YfQvdGL0Lkg0L/RgtC40YYnO1xuICAgIH1cbiAgfVxuICBpbml0KCkge1xuICAgIHRoaXMuc3Bpa2VJbmRleCA9IDA7XG4gICAgdGhpcy5zdGVwID0gMDtcbiAgICB0aGlzLmRpc3RhbmNlID0gMDtcblxuICAgIHRoaXMuY3JlYXRlU3Bpa2VzKCk7XG4gICAgdGhpcy5jcmVhdGVIdWQoKTtcblxuICAgIGNvbnN0IGNvdW50ZXIgPSBuZXcgY3JlYXRlanMuVGV4dCgzLCAnMTI1cHggR3VlcmlsbGEnLCAnIzAwMCcpO1xuICAgIGNvdW50ZXIudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgY291bnRlci54ID0gdGhpcy53aWR0aCAvIDI7XG4gICAgY291bnRlci55ID0gMzEwO1xuXG4gICAgdGhpcy5hZGRDaGlsZChjb3VudGVyKTtcblxuICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgY291bnRlci50ZXh0IC09IDE7XG4gICAgICBpZiAoY291bnRlci50ZXh0IDwgMCkge1xuICAgICAgICB0aGlzLnJlbW92ZUNoaWxkKGNvdW50ZXIpO1xuICAgICAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgIH1cbiAgICB9LCAxMDAwKTtcblxuICAgIHRoaXMuaGVybyA9IHRoaXMuY3JlYXRlSGVybyhkYXRhTWFuYWdlci5wb3MsIGRhdGFNYW5hZ2VyLnVzZXIubmFtZSk7XG4gICAgdGhpcy5lbmVteSA9IHRoaXMuY3JlYXRlSGVybygxIC0gZGF0YU1hbmFnZXIucG9zLCBkYXRhTWFuYWdlci5lbmVteS5uYW1lKTtcbiAgICB0aGlzLmVuZW15LmFscGhhID0gMC41O1xuICB9XG4gIGNyZWF0ZUJnKCkge1xuICAgIHRoaXMuYmdTa3kgPSBuZXcgQmFja2dyb3VuZCgnc2t5JywgdGhpcy53aWR0aCk7XG4gICAgdGhpcy5iZ01vdW50YWluID0gbmV3IEJhY2tncm91bmQoJ21vdW50YWluJywgdGhpcy53aWR0aCk7XG4gICAgdGhpcy5iZ0dyb3VuZCA9IG5ldyBCYWNrZ3JvdW5kKCdncm91bmQnLCB0aGlzLndpZHRoKTtcbiAgICB0aGlzLmJnU2t5LnkgPSB0aGlzLmJnTW91bnRhaW4ueSA9IHRoaXMuYmdHcm91bmQueSA9IHRoaXMuaGVpZ2h0O1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5iZ1NreSwgdGhpcy5iZ01vdW50YWluLCB0aGlzLmJnR3JvdW5kKTtcbiAgfVxuICBjcmVhdGVTcGlrZXMoKSB7XG4gICAgdGhpcy5zcGlrZXMgPSBbbmV3IFNwaWtlKCksIG5ldyBTcGlrZSgpXTtcbiAgICB0aGlzLnNwaWtlc1swXS54ID0gLXRoaXMuc3Bpa2VzWzBdLmJvdW5kcy53aWR0aCAvIDI7XG4gICAgdGhpcy5zcGlrZXNbMV0ueCA9IHRoaXMud2lkdGggLyAyO1xuICAgIHRoaXMuc3Bpa2VzLmZvckVhY2goc3Bpa2UgPT4gdGhpcy5yZXNldFNwaWtlKHNwaWtlKSk7XG4gICAgdGhpcy5hZGRDaGlsZCguLi50aGlzLnNwaWtlcyk7XG4gIH1cbiAgY3JlYXRlSGVybyhwb3MsIG5hbWUpIHtcbiAgICBjb25zdCBoZXJvID0gbmV3IEhlcm8oZGF0YU1hbmFnZXIuaGVyb1R5cGUpO1xuICAgIGhlcm8ueCA9IHRoaXMud2lkdGggLyAyIC0gMTgwICogcG9zO1xuICAgIGhlcm8ueSA9IDE5MCAtIDUwICogcG9zO1xuXG4gICAgY29uc3QgaGVyb05hbWUgPSBuZXcgY3JlYXRlanMuVGV4dChuYW1lLCAnMjVweCBHdWVyaWxsYScsICcjMDAwJyk7XG4gICAgaGVyb05hbWUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgaGVyb05hbWUueSA9IGhlcm8ueSAtIDEwMDtcbiAgICBoZXJvTmFtZS54ID0gaGVyby54O1xuICAgIHRoaXMuYWRkQ2hpbGQoaGVybywgaGVyb05hbWUpO1xuXG4gICAgY3JlYXRlanMuVHdlZW4uZ2V0KGhlcm9OYW1lKS53YWl0KDI0MDApLnRvKHsgYWxwaGE6IDAgfSwgODAwKVxuICAgICAgLmNhbGwoKCkgPT4gdGhpcy5yZW1vdmVDaGlsZChoZXJvTmFtZSkpO1xuXG4gICAgcmV0dXJuIGhlcm87XG4gIH1cbiAgY3JlYXRlSHVkKCkge1xuICAgIHRoaXMuaHVkRGlzdGFuY2UgPSBuZXcgY3JlYXRlanMuVGV4dCgnMCDQvCcsICcyNXB4IEd1ZXJpbGxhJywgJyMwMDAnKTtcbiAgICB0aGlzLmh1ZERpc3RhbmNlLnggPSAyMDtcbiAgICB0aGlzLmh1ZERpc3RhbmNlLnkgPSAxNTtcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuaHVkRGlzdGFuY2UpO1xuICB9XG4gIHJlc2V0U3Bpa2Uoc3Bpa2UpIHtcbiAgICBzcGlrZS54ICs9IHRoaXMud2lkdGggKyBzcGlrZS5ib3VuZHMud2lkdGg7XG5cbiAgICBpZiAodGhpcy5lbmVteVNwaWtlc1t0aGlzLnNwaWtlSW5kZXhdKSB7XG4gICAgICBzcGlrZS5zY2FsZVkgPSB0aGlzLmVuZW15U3Bpa2VzW3RoaXMuc3Bpa2VJbmRleF07XG4gICAgICB0aGlzLnNwaWtlSW5kZXggKz0gMTtcblxuICAgICAgaWYgKHNwaWtlLnNjYWxlWSA+IDApIHtcbiAgICAgICAgc3Bpa2UueSA9IHRoaXMuaGVpZ2h0IC0gR1JPVU5EX0hFSUdIVDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNwaWtlLnkgPSAwO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzcGlrZS5zY2FsZVkgPSArKDAuNyArIE1hdGgucmFuZG9tKCkgKiAwLjQ1KS50b0ZpeGVkKDIpO1xuICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPiAwLjUpIHtcbiAgICAgICAgc3Bpa2UueSA9IHRoaXMuaGVpZ2h0IC0gR1JPVU5EX0hFSUdIVDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNwaWtlLnkgPSAwO1xuICAgICAgICBzcGlrZS5zY2FsZVkgPSAtc3Bpa2Uuc2NhbGVZO1xuICAgICAgfVxuICAgIH1cbiAgICBkYXRhTWFuYWdlci5zcGlrZXMucHVzaChzcGlrZS5zY2FsZVkpO1xuICB9XG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuaGFuZGxlQWN0aW9uKCkpO1xuICAgIHRoaXMub25LZXlEb3duID0gZSA9PiB7XG4gICAgICB0aGlzLmhhbmRsZUFjdGlvbigpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlEb3duKTtcbiAgfVxuICBoYW5kbGVBY3Rpb24oKSB7XG4gICAgaWYgKCF0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5oZXJvLmZsYXAoKTtcbiAgICBkYXRhTWFuYWdlci5hY3Rpb25zW3RoaXMuc3RlcF0gPSAxO1xuICB9XG4gIG1vdmVXb3JsZCgpIHtcbiAgICB0aGlzLm1vdmVTcGlrZXModGhpcy5zcGVlZCk7XG4gICAgdGhpcy5iZ1NreS5tb3ZlKHRoaXMuc3BlZWQgKiAwLjEpO1xuICAgIHRoaXMuYmdNb3VudGFpbi5tb3ZlKHRoaXMuc3BlZWQgKiAwLjMpO1xuICAgIHRoaXMuYmdHcm91bmQubW92ZSh0aGlzLnNwZWVkKTtcblxuICAgIHRoaXMuZGlzdGFuY2UgKz0gdGhpcy5zcGVlZDtcbiAgICBkYXRhTWFuYWdlci5zY29yZSA9IE1hdGguZmxvb3IodGhpcy5kaXN0YW5jZSAvIDI1KTtcbiAgICB0aGlzLmh1ZERpc3RhbmNlLnRleHQgPSBgJHtkYXRhTWFuYWdlci5zY29yZX0g0LxgO1xuICB9XG4gIG1vdmVTcGlrZXMoKSB7XG4gICAgdGhpcy5zcGlrZXMuZm9yRWFjaChzcGlrZSA9PiB7XG4gICAgICBzcGlrZS54IC09IHRoaXMuc3BlZWQ7XG4gICAgICBpZiAoc3Bpa2UueCA8IC1zcGlrZS5ib3VuZHMud2lkdGggLyAyKSB7XG4gICAgICAgIHRoaXMucmVzZXRTcGlrZShzcGlrZSk7XG4gICAgICAgIHRoaXMuc3BlZWQgKz0gMC4wNDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBtb3ZlSGVybyhoZXJvKSB7XG4gICAgaGVyby5tb3ZlKCk7XG4gICAgaWYgKGhlcm8ueSA8IDApIHtcbiAgICAgIGhlcm8udlkgPSAwO1xuICAgICAgaGVyby55ID0gMDtcbiAgICB9IGVsc2UgaWYgKGhlcm8ueSA+IHRoaXMuaGVpZ2h0ICsgaGVyby5ib3VuZHMuaGVpZ2h0IC8gMikge1xuICAgICAgaWYgKGhlcm8gPT09IHRoaXMuaGVybykge1xuICAgICAgICBzY3JlZW5zTWFuYWdlci5jaGFuZ2UoJ0VuZFNjcmVlbicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF0YU1hbmFnZXIud2luID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGhlcm8ueSA+IHRoaXMuaGVpZ2h0IC0gKEdST1VORF9IRUlHSFQgKyBoZXJvLmJvdW5kcy5oZWlnaHQgLyAyKSkge1xuICAgICAgaGVyby5kaWUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc3Bpa2VzLnNvbWUoc3Bpa2UgPT4gbmRnbXIuY2hlY2tQaXhlbENvbGxpc2lvbihoZXJvLCBzcGlrZSkpKSB7XG4gICAgICBoZXJvLmRpZSgpO1xuICAgIH1cbiAgfVxuICB0aWNrKCkge1xuICAgIGlmICghdGhpcy5zdGFydGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMubW92ZVdvcmxkKCk7XG4gICAgdGhpcy5tb3ZlSGVybyh0aGlzLmhlcm8pO1xuICAgIHRoaXMubW92ZUhlcm8odGhpcy5lbmVteSk7XG5cbiAgICB0aGlzLnN0ZXAgKz0gMTtcbiAgICBpZiAodGhpcy5lbmVteUFjdGlvbnNbdGhpcy5zdGVwXSkge1xuICAgICAgdGhpcy5lbmVteS5mbGFwKCk7XG4gICAgfVxuICB9XG4gIGRlc3Ryb3koKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bik7XG4gIH1cbn1cbiIsImltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuaW1wb3J0IGRhdGFNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2RhdGFNYW5hZ2VyJztcbmltcG9ydCBzZXJ2ZXJNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NlcnZlck1hbmFnZXInO1xuaW1wb3J0IEd1aSBmcm9tICcuLi9kaXNwbGF5L0d1aSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhdGluZ1NjcmVlbiBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcblxuICAgIHRoaXMuYmcgPSBuZXcgY3JlYXRlanMuQml0bWFwKGFzc2V0c01hbmFnZXIuZ2V0UmVzdWx0KCdzdGFydCcpKTtcbiAgICB0aGlzLmd1aSA9IG5ldyBHdWkod2lkdGgpO1xuXG4gICAgdGhpcy50aXRsZSA9IG5ldyBjcmVhdGVqcy5UZXh0KCfQoNC10LnRgtC40L3QsycsICczNXB4IEd1ZXJpbGxhJywgJyMwMDAnKTtcbiAgICB0aGlzLnRpdGxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRoaXMudGl0bGUueCA9IHRoaXMud2lkdGggLyAyO1xuICAgIHRoaXMudGl0bGUueSA9IDM1O1xuXG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmJnLCB0aGlzLmd1aSwgdGhpcy50aXRsZSk7XG5cbiAgICBzZXJ2ZXJNYW5hZ2VyLmdldCgncmF0aW5nVGFibGUnLCAxKVxuICAgICAgLy8gdG9kbzogcmVtb3ZlIGxhdGVyLCBub3cgaXQgYWRkIHJlY29yZHMgZm9yIG9sZCB1c2Vyc1xuICAgICAgLnRoZW4ocmVjYWxjUmF0aW5nVGFibGUpXG4gICAgICAudGhlbihyID0+IHRoaXMuc2hvd1JhdGluZyhyKSlcbiAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRleHQgPSBuZXcgY3JlYXRlanMuVGV4dCgn0KDQtdC50YLQuNC90LMg0LLRgNC10LzQtdC90L3QviDQvdC10LTQvtGB0YLRg9C/0LXQvSA6KCcsICcyNXB4IEd1ZXJpbGxhJywgJyMwMDAnKTtcbiAgICAgICAgdGV4dC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgdGV4dC54ID0gdGhpcy53aWR0aCAvIDI7XG4gICAgICAgIHRleHQueSA9IDE1MDtcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0ZXh0KTtcbiAgICAgIH0pO1xuICB9XG4gIHNob3dSYXRpbmcocmF0aW5nVGFibGUpIHtcbiAgICBsZXQgd2lubmVyID0gZmFsc2U7XG5cbiAgICByYXRpbmdUYWJsZS5mb3JFYWNoKChlbCwgaSkgPT4ge1xuICAgICAgY29uc3QgdGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KGAke2kgKyAxfSAke2VsLm5hbWV9ICR7ZWwuc2NvcmV9INC8YCwgJzI1cHggR3VlcmlsbGEnLCAnIzAwMCcpO1xuICAgICAgdGV4dC55ID0gMTIwICsgaSAqIDQwO1xuICAgICAgdGV4dC54ID0gMTIwO1xuICAgICAgdGhpcy5hZGRDaGlsZCh0ZXh0KTtcblxuICAgICAgaWYgKGVsLmlkID09PSBkYXRhTWFuYWdlci51c2VyLmlkKSB7XG4gICAgICAgIHdpbm5lciA9IHRydWU7XG4gICAgICAgIHRleHQuY29sb3IgPSAnIzdFQ0UyRSc7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoIXdpbm5lcikge1xuICAgICAgY29uc3QgdGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KGAtICR7ZGF0YU1hbmFnZXIudXNlci5uYW1lfSAke2RhdGFNYW5hZ2VyLm1heFNjb3JlfSDQvGAsICcyNXB4IEd1ZXJpbGxhJywgJyM3RUNFMkUnKTtcbiAgICAgIHRleHQueSA9IDEyMCArIHJhdGluZ1RhYmxlLmxlbmd0aCAqIDQwO1xuICAgICAgdGV4dC54ID0gMTIwO1xuICAgICAgdGhpcy5hZGRDaGlsZCh0ZXh0KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVjYWxjUmF0aW5nVGFibGUocmF0aW5nVGFibGUpIHtcbiAgaWYgKHJhdGluZ1RhYmxlW3JhdGluZ1RhYmxlLmxlbmd0aCAtIDFdLnNjb3JlIDwgZGF0YU1hbmFnZXIubWF4U2NvcmUpIHtcbiAgICBjb25zdCB1c2VyUmF0aW5nID0gcmF0aW5nVGFibGUuZmluZChlbCA9PiBlbC5pZCA9PT0gZGF0YU1hbmFnZXIudXNlci5pZCk7XG5cbiAgICBpZiAodXNlclJhdGluZykge1xuICAgICAgdXNlclJhdGluZy5zY29yZSA9IGRhdGFNYW5hZ2VyLm1heFNjb3JlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBuZXdSYXRpbmcgPSB7XG4gICAgICAgIGlkOiBkYXRhTWFuYWdlci51c2VyLmlkLFxuICAgICAgICBuYW1lOiBkYXRhTWFuYWdlci51c2VyLm5hbWUsXG4gICAgICAgIHNjb3JlOiBkYXRhTWFuYWdlci5tYXhTY29yZSxcbiAgICAgIH07XG4gICAgICBpZiAocmF0aW5nVGFibGUubGVuZ3RoIDwgMTApIHtcbiAgICAgICAgcmF0aW5nVGFibGUucHVzaChuZXdSYXRpbmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmF0aW5nVGFibGVbcmF0aW5nVGFibGUubGVuZ3RoIC0gMV0gPSBuZXdSYXRpbmc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmF0aW5nVGFibGUuc29ydCgoYSwgYikgPT4gYi5zY29yZSAtIGEuc2NvcmUpO1xuICAgIHNlcnZlck1hbmFnZXIuc2V0KCdyYXRpbmdUYWJsZScsIHJhdGluZ1RhYmxlLCAxKTtcbiAgfVxuICByZXR1cm4gcmF0aW5nVGFibGU7XG59XG4iLCJpbXBvcnQgc2VydmVyTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zZXJ2ZXJNYW5hZ2VyJztcbmltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuaW1wb3J0IHNjcmVlbnNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NjcmVlbnNNYW5hZ2VyJztcbmltcG9ydCBkYXRhTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9kYXRhTWFuYWdlcic7XG5pbXBvcnQgR3VpIGZyb20gJy4uL2Rpc3BsYXkvR3VpJztcbmltcG9ydCBIZXJvIGZyb20gJy4uL2Rpc3BsYXkvSGVybyc7XG5pbXBvcnQgQnRuIGZyb20gJy4uL2Rpc3BsYXkvQnRuJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhcnRTY3JlZW4gZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcblxuICAgIHRoaXMuYmcgPSBuZXcgY3JlYXRlanMuQml0bWFwKGFzc2V0c01hbmFnZXIuZ2V0UmVzdWx0KCdzdGFydCcpKTtcbiAgICB0aGlzLmd1aSA9IG5ldyBHdWkod2lkdGgpO1xuXG4gICAgdGhpcy5zdGFydEJ0biA9IG5ldyBCdG4oJ9CY0LPRgNCw0YLRjCcpO1xuICAgIHRoaXMuc3RhcnRCdG4ueCA9IHdpZHRoIC8gMjtcbiAgICB0aGlzLnN0YXJ0QnRuLnkgPSAzMjA7XG5cbiAgICB0aGlzLnB2cEJ0biA9IG5ldyBCdG4oJ1BWUCcpO1xuICAgIHRoaXMucHZwQnRuLnggPSB3aWR0aCAvIDI7XG4gICAgdGhpcy5wdnBCdG4ueSA9IDQxMDtcblxuICAgIHRoaXMuaW52aXRlQnRuID0gbmV3IEJ0bign0J/QvtC30LLQsNGC0Ywg0LHRgNC+JywgJ29yYW5nZScpO1xuICAgIHRoaXMuaW52aXRlQnRuLnggPSB3aWR0aCAvIDI7XG4gICAgdGhpcy5pbnZpdGVCdG4ueSA9IDUwMDtcblxuICAgIHRoaXMuaGVybyA9IG5ldyBIZXJvKCdtb25zdGVyJyk7XG4gICAgdGhpcy5oZXJvLnggPSB3aWR0aCAvIDI7XG4gICAgdGhpcy5oZXJvLnkgPSAxOTA7XG5cbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuYmcsIHRoaXMuZ3VpLCB0aGlzLmhlcm8sIHRoaXMuc3RhcnRCdG4sIHRoaXMucHZwQnRuLCB0aGlzLmludml0ZUJ0bik7XG5cbiAgICBpZiAoZGF0YU1hbmFnZXIubWF4U2NvcmUpIHtcbiAgICAgIHRoaXMuc2NvcmUgPSBuZXcgY3JlYXRlanMuVGV4dChg0KDQtdC60L7RgNC0OiAke2RhdGFNYW5hZ2VyLm1heFNjb3JlfSDQvGAsICcyNXB4IEd1ZXJpbGxhJywgJyMwMDAnKTtcbiAgICAgIHRoaXMuc2NvcmUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICB0aGlzLnNjb3JlLnggPSB0aGlzLndpZHRoIC8gMjtcbiAgICAgIHRoaXMuc2NvcmUueSA9IDQwO1xuICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLnNjb3JlKTtcbiAgICB9XG5cbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgfVxuICAvLyBjcmVhdGVIZXJvZXMoKSB7XG4gIC8vICAgdGhpcy5oZXJvZXMgPSBbXG4gIC8vICAgICBuZXcgSGVybygnYmlyZCcpLFxuICAvLyAgICAgbmV3IEhlcm8oJ21vbnN0ZXInKSxcbiAgLy8gICAgIG5ldyBIZXJvKCdjaGlja2VuJyksXG4gIC8vICAgXTtcbiAgLy8gICB0aGlzLmhlcm9lcy5mb3JFYWNoKChoZXJvLCBpKSA9PiB7XG4gIC8vICAgICBoZXJvLnkgPSB0aGlzLmhlaWdodCAvIDI7XG4gIC8vICAgICBoZXJvLnggPSAoaSArIDEpICogdGhpcy53aWR0aCAvICh0aGlzLmhlcm9lcy5sZW5ndGggKyAxKTtcbiAgLy8gICAgIGhlcm8uY3Vyc29yID0gJ3BvaW50ZXInO1xuICAvLyAgICAgaGVyby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuc2VsZWN0SGVybyhoZXJvKSk7XG4gIC8vICAgICBoZXJvLmNhY2hlKDAsIDAsIGhlcm8uYm91bmRzLndpZHRoLCBoZXJvLmJvdW5kcy5oZWlnaHQpO1xuICAvLyAgIH0pO1xuICAvLyAgIHRoaXMuaGVyb0ZpbHRlciA9IG5ldyBjcmVhdGVqcy5Db2xvckZpbHRlcigwLjYsIDAuNiwgMC42KTtcbiAgLy8gICB0aGlzLnJlc2V0SGVyb2VzKCk7XG4gIC8vICAgdGhpcy5hZGRDaGlsZCguLi50aGlzLmhlcm9lcyk7XG4gIC8vIH1cbiAgLy8gcmVzZXRIZXJvZXMoKSB7XG4gIC8vICAgdGhpcy5oZXJvZXMuZm9yRWFjaChoZXJvID0+IHtcbiAgLy8gICAgIGhlcm8uZmlsdGVycyA9IFt0aGlzLmhlcm9GaWx0ZXJdO1xuICAvLyAgICAgaGVyby51cGRhdGVDYWNoZSgpO1xuICAvLyAgICAgaGVyby5zY2FsZVggPSAwLjg1O1xuICAvLyAgICAgaGVyby5zY2FsZVkgPSAwLjg1O1xuICAvLyAgIH0pO1xuICAvLyB9XG4gIC8vIHNlbGVjdEhlcm8oaGVybykge1xuICAvLyAgIHRoaXMucmVzZXRIZXJvZXMoKTtcblxuICAvLyAgIGhlcm8uZmlsdGVycyA9IFtdO1xuICAvLyAgIGhlcm8udXBkYXRlQ2FjaGUoKTtcbiAgLy8gICBoZXJvLnNjYWxlWCA9IDE7XG4gIC8vICAgaGVyby5zY2FsZVkgPSAxO1xuICAvLyAgIGhlcm8uZmxhcCgpO1xuXG4gIC8vICAgaWYgKCF0aGlzLnN0YXJ0QnRuLmVuYWJsZWQpIHtcbiAgLy8gICAgIHRoaXMuc3RhcnRCdG4uZW5hYmxlKCk7XG4gIC8vICAgfVxuXG4gIC8vICAgZGF0YU1hbmFnZXIuaGVyb1R5cGUgPSBoZXJvLnR5cGU7XG4gIC8vIH1cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLnN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT5cbiAgICAgIHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnTWFpblNjcmVlbicpKTtcbiAgICB0aGlzLnB2cEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+XG4gICAgICBzY3JlZW5zTWFuYWdlci5jaGFuZ2UoJ1BWUFNjcmVlbicpKTtcbiAgICB0aGlzLmludml0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+XG4gICAgICBzZXJ2ZXJNYW5hZ2VyLmludml0ZSgpKTtcblxuICAgIHRoaXMub25LZXlEb3duID0gZSA9PiB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAzMikge1xuICAgICAgICBzY3JlZW5zTWFuYWdlci5jaGFuZ2UoJ01haW5TY3JlZW4nKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlEb3duKTtcbiAgfVxuICBkZXN0cm95KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd24pO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChtaW4sIG1heCkge1xuXHRpZiAobWF4ID09PSB1bmRlZmluZWQpIHtcblx0XHRtYXggPSBtaW47XG5cdFx0bWluID0gMDtcblx0fVxuXG5cdGlmICh0eXBlb2YgbWluICE9PSAnbnVtYmVyJyB8fCB0eXBlb2YgbWF4ICE9PSAnbnVtYmVyJykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGFsbCBhcmd1bWVudHMgdG8gYmUgbnVtYmVycycpO1xuXHR9XG5cblx0cmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbik7XG59O1xuIl19
