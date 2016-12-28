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
  score: null,
  maxScore: null,
  heroType: 'monster',
  pos: null,
  win: null,
  spikes: null,
  actions: null,
  enemyActions: null,
  user: {
    id: null,
    name: null,
    sex: null
  },
  enemy: null,
  fields: {
    normal: [[0, 49], [100, 149]]
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

    _this.maxScore = new createjs.Text('Рекорд: ' + _dataManager2.default.maxScore + ' м', '25px Guerilla', '#000');
    _this.maxScore.textAlign = 'center';
    _this.maxScore.x = width / 2;
    _this.maxScore.y = 40;

    _this.score = new createjs.Text('Результат: ' + _dataManager2.default.score + ' м', '40px Guerilla', '#000');
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
      _this.maxScore.text = 'Прошлый рекорд: ' + _dataManager2.default.maxScore + ' м';
      _dataManager2.default.maxScore = _dataManager2.default.score;
      _serverManager2.default.set('maxScore', _dataManager2.default.maxScore);
      _this.score.text = 'Новый рекорд: ' + _dataManager2.default.maxScore + ' м!';

      _serverManager2.default.get('ratingTable', 1).then(recalcRatingTable);
    }

    if (_dataManager2.default.gameType === 'pvp') {
      var enemy = _dataManager2.default.enemy;
      _this.pvpText = new createjs.Text('', '25px Guerilla', '#000');
      _this.pvpText.textAlign = 'center';
      _this.pvpText.x = width / 2;
      _this.pvpText.y = 230;
      _this.addChild(_this.pvpText);

      if (_dataManager2.default.win) {
        _this.pvpText.text += enemy.name + ' был' + (enemy.sex !== 2 ? 'а' : '') + ' повержен' + (enemy.sex !== 2 ? 'а' : '');
      } else {
        _this.pvpText.text += enemy.name + ' поверг' + (enemy.sex !== 2 ? 'ла' : '') + ' Вас';
      }
    }

    var range = _dataManager2.default.fields.normal[_dataManager2.default.pos];
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
      console.warn(r.spikes.length * 0.5 < record.spikes.length);
      if (r.spikes.length * 0.5 < record.spikes.length && JSON.stringify(record).length < 4096) {
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
      this.shareBtn.addEventListener('click', function () {
        return _serverManager2.default.share(_dataManager2.default.score, _dataManager2.default.user.sex);
      });

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
var START_SPEED = 5;

var MainScreen = function (_createjs$Container) {
  _inherits(MainScreen, _createjs$Container);

  function MainScreen(width, height) {
    _classCallCheck(this, MainScreen);

    var _this = _possibleConstructorReturn(this, (MainScreen.__proto__ || Object.getPrototypeOf(MainScreen)).call(this));

    _this.width = width;
    _this.height = height;

    _this.speed = START_SPEED;
    _this.step = 0;
    _this.distance = 0;
    _this.shadowOverlay = new _ShadowOverlay2.default(_this.width, _this.height);

    _dataManager2.default.gameType = 'single';
    _dataManager2.default.actions = {};
    _dataManager2.default.spikes = [];
    _dataManager2.default.pos = 0;

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
      spike.scaleY = +(0.7 + Math.random() * 0.5).toFixed(2);
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
        _dataManager2.default.actions[this.step] = 1;
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
        this.hudDistance.text = _dataManager2.default.score + ' м';
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

},{"../display/Background":2,"../display/Hero":5,"../display/ShadowOverlay":7,"../display/Spike":8,"../managers/dataManager":10,"../managers/screensManager":11}],16:[function(require,module,exports){
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

var GROUND_HEIGHT = 82;
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
    var enemyRange = _dataManager2.default.fields.normal[1 - _dataManager2.default.pos];
    var enemyField = 'pvp' + (0, _randomInt2.default)(enemyRange[0], enemyRange[1]);

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
      _dataManager2.default.win = false;
      _dataManager2.default.actions = {};
      _dataManager2.default.spikes = record.spikes;
      _dataManager2.default.enemyActions = record.actions;
      _dataManager2.default.enemy = record.user;
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

      if (_dataManager2.default.spikes[this.spikeIndex]) {
        spike.scaleY = _dataManager2.default.spikes[this.spikeIndex];
        this.spikeIndex += 1;

        if (spike.scaleY > 0) {
          spike.y = this.height - GROUND_HEIGHT;
        } else {
          spike.y = 0;
        }
      } else {
        spike.scaleY = +(0.7 + Math.random() * 0.5).toFixed(2);
        if (Math.random() > 0.5) {
          spike.y = this.height - GROUND_HEIGHT;
        } else {
          spike.y = 0;
          spike.scaleY = -spike.scaleY;
        }
        _dataManager2.default.spikes.push(spike.scaleY);
      }
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
      this.hudDistance.text = _dataManager2.default.score + ' м';
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
      if (_dataManager2.default.enemyActions[this.step]) {
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
      _this.score = new createjs.Text('Рекорд: ' + _dataManager2.default.maxScore + ' м', '25px Guerilla', '#000');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvc3JjL2FwcC5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9CYWNrZ3JvdW5kLmpzIiwiYXBwL2pzL3NyYy9kaXNwbGF5L0J0bi5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9HdWkuanMiLCJhcHAvanMvc3JjL2Rpc3BsYXkvSGVyby5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9JY29uQnRuLmpzIiwiYXBwL2pzL3NyYy9kaXNwbGF5L1NoYWRvd092ZXJsYXkuanMiLCJhcHAvanMvc3JjL2Rpc3BsYXkvU3Bpa2UuanMiLCJhcHAvanMvc3JjL21hbmFnZXJzL2Fzc2V0c01hbmFnZXIuanMiLCJhcHAvanMvc3JjL21hbmFnZXJzL2RhdGFNYW5hZ2VyLmpzIiwiYXBwL2pzL3NyYy9tYW5hZ2Vycy9zY3JlZW5zTWFuYWdlci5qcyIsImFwcC9qcy9zcmMvbWFuYWdlcnMvc2VydmVyTWFuYWdlci5qcyIsImFwcC9qcy9zcmMvbWFuYWdlcnMvc291bmRNYW5hZ2VyLmpzIiwiYXBwL2pzL3NyYy9zY3JlZW5zL0VuZFNjcmVlbi5qcyIsImFwcC9qcy9zcmMvc2NyZWVucy9NYWluU2NyZWVuLmpzIiwiYXBwL2pzL3NyYy9zY3JlZW5zL1BWUFNjcmVlbi5qcyIsImFwcC9qcy9zcmMvc2NyZWVucy9SYXRpbmdTY3JlZW4uanMiLCJhcHAvanMvc3JjL3NjcmVlbnMvU3RhcnRTY3JlZW4uanMiLCJub2RlX21vZHVsZXMvcmFuZG9tLWludC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsUUFBUSxHQUFSLENBQVksQ0FDVix3QkFBYyxJQUFkLEVBRFUsRUFFVix3QkFBYyxJQUFkLEVBRlUsQ0FBWixFQUlHLElBSkgsQ0FJUTtBQUFBLFNBQU0sUUFBUSxHQUFSLENBQVksQ0FDdEIsd0JBQWMsT0FBZCxHQUF3QixJQUF4QixDQUE2QjtBQUFBLFdBQVEsc0JBQVksR0FBWixDQUFnQixNQUFoQixFQUF3QjtBQUMzRCxVQUFJLEtBQUssRUFEa0Q7QUFFM0QsWUFBUyxLQUFLLFVBQWQsU0FBNEIsS0FBSyxTQUYwQjtBQUczRCxXQUFLLEtBQUs7QUFIaUQsS0FBeEIsQ0FBUjtBQUFBLEdBQTdCLENBRHNCLEVBTXRCLHdCQUFjLEdBQWQsQ0FBa0IsVUFBbEIsRUFBOEIsSUFBOUIsQ0FBbUM7QUFBQSxXQUFLLHNCQUFZLEdBQVosQ0FBZ0IsVUFBaEIsRUFBNEIsQ0FBQyxDQUE3QixDQUFMO0FBQUEsR0FBbkMsQ0FOc0IsRUFPdEIsd0JBQWMsR0FBZCxDQUFrQixPQUFsQixFQUEyQixJQUEzQixDQUFnQztBQUFBLFdBQUssdUJBQWEsSUFBYixDQUFrQixNQUFNLEVBQU4sR0FBVyxJQUFYLEdBQWtCLENBQUMsQ0FBQyxDQUF0QyxDQUFMO0FBQUEsR0FBaEMsQ0FQc0IsQ0FBWixDQUFOO0FBQUEsQ0FKUixFQWFHLElBYkgsQ0FhUTtBQUFBLFNBQU0seUJBQWUsTUFBZixDQUFzQixhQUF0QixDQUFOO0FBQUEsQ0FiUixFQWNHLEtBZEgsQ0FjUztBQUFBLFNBQUssUUFBUSxLQUFSLENBQWMseUJBQWQsRUFBeUMsQ0FBekMsQ0FBTDtBQUFBLENBZFQ7O0FBZ0JBLElBQU0sUUFBUSxJQUFJLFNBQVMsS0FBYixDQUFtQixZQUFuQixDQUFkO0FBQ0EseUJBQWUsSUFBZixDQUFvQixLQUFwQjs7QUFFQSxJQUFJLFNBQVMsS0FBVCxDQUFlLFdBQWYsRUFBSixFQUFrQztBQUNoQyxXQUFTLEtBQVQsQ0FBZSxNQUFmLENBQXNCLEtBQXRCLEVBQTZCLElBQTdCO0FBQ0QsQ0FGRCxNQUVPO0FBQ0wsUUFBTSxlQUFOLENBQXNCLEVBQXRCO0FBQ0Q7O0FBRUQsSUFBSSxXQUFXLE9BQU8sTUFBdEIsRUFBOEI7QUFDNUI7QUFDQSxTQUFPLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDO0FBQUEsV0FBTSxPQUFPLEtBQVAsRUFBTjtBQUFBLEdBQWpDO0FBQ0Q7Ozs7Ozs7Ozs7O0FDbENEOzs7Ozs7Ozs7Ozs7SUFFcUIsVTs7O0FBQ25CLHNCQUFZLElBQVosRUFBa0IsV0FBbEIsRUFBK0I7QUFBQTs7QUFBQTs7QUFHN0IsVUFBSyxHQUFMLEdBQVcsd0JBQWMsU0FBZCxDQUF3QixJQUF4QixDQUFYO0FBQ0EsUUFBTSxRQUFRLE1BQUssR0FBTCxDQUFTLEtBQVQsR0FBaUIsV0FBL0I7O0FBRUEsVUFBSyxRQUFMLENBQWMsZUFBZCxDQUE4QixNQUFLLEdBQW5DLEVBQXdDLFVBQXhDLEVBQW9ELFFBQXBELENBQTZELENBQTdELEVBQWdFLENBQWhFLEVBQW1FLEtBQW5FLEVBQTBFLE1BQUssR0FBTCxDQUFTLE1BQW5GO0FBQ0EsVUFBSyxJQUFMLEdBQVksTUFBSyxHQUFMLENBQVMsTUFBckI7QUFDQSxVQUFLLEtBQUwsQ0FBVyxDQUFYLEVBQWMsQ0FBZCxFQUFpQixLQUFqQixFQUF3QixNQUFLLEdBQUwsQ0FBUyxNQUFqQztBQVI2QjtBQVM5Qjs7Ozt5QkFDSSxJLEVBQU07QUFDVCxXQUFLLENBQUwsSUFBVSxJQUFWO0FBQ0EsV0FBSyxDQUFMLElBQVUsS0FBSyxHQUFMLENBQVMsS0FBbkI7QUFDRDs7OztFQWRxQyxTQUFTLEs7O2tCQUE1QixVOzs7Ozs7Ozs7OztBQ0ZyQjs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUIsRzs7O0FBQ25CLGVBQVksS0FBWixFQUFrRDtBQUFBLFFBQS9CLEtBQStCLHVFQUF2QixPQUF1QjtBQUFBLFFBQWQsSUFBYyx1RUFBUCxLQUFPOztBQUFBOztBQUFBOztBQUdoRCxVQUFLLEtBQUwsR0FBYSxLQUFiOztBQUVBLFVBQUssUUFBTCxDQUFjLElBQWQ7QUFDQSxVQUFLLFdBQUwsQ0FBaUIsS0FBakI7O0FBRUEsVUFBSyxnQkFBTCxDQUFzQixPQUF0QixFQUErQjtBQUFBLGFBQU0sdUJBQWEsSUFBYixDQUFrQixNQUFsQixDQUFOO0FBQUEsS0FBL0I7QUFSZ0Q7QUFTakQ7Ozs7NkJBQ1EsSSxFQUFNO0FBQ2IsV0FBSyxFQUFMLEdBQVUsSUFBSSxTQUFTLE1BQWIsQ0FBb0Isd0JBQWMsY0FBZCxDQUE2QixJQUE3QixDQUFwQixDQUFWO0FBQ0EsV0FBSyxFQUFMLENBQVEsSUFBUixHQUFlLEtBQUssRUFBTCxDQUFRLFNBQVIsR0FBb0IsS0FBcEIsR0FBNEIsQ0FBM0M7QUFDQSxXQUFLLEVBQUwsQ0FBUSxJQUFSLEdBQWUsS0FBSyxFQUFMLENBQVEsU0FBUixHQUFvQixNQUFwQixHQUE2QixDQUE1QztBQUNBLFdBQUssTUFBTCxHQUFjLElBQUksU0FBUyxZQUFiLENBQTBCLEtBQUssRUFBL0IsRUFBc0MsS0FBSyxLQUEzQyxVQUEwRCxLQUFLLEtBQS9ELFdBQStFLEtBQUssS0FBcEYsVUFBZDtBQUNBLFdBQUssUUFBTCxDQUFjLEtBQUssRUFBbkI7QUFDRDs7O2dDQUNXLEssRUFBTztBQUNqQixXQUFLLEtBQUwsR0FBYSxJQUFJLFNBQVMsSUFBYixDQUFrQixLQUFsQixFQUF5QixlQUF6QixFQUEwQyxNQUExQyxDQUFiO0FBQ0EsV0FBSyxLQUFMLENBQVcsTUFBWCxHQUFvQixJQUFJLFNBQVMsTUFBYixDQUFvQixNQUFwQixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxDQUFwQjtBQUNBLFdBQUssS0FBTCxDQUFXLFNBQVgsR0FBdUIsUUFBdkI7QUFDQSxXQUFLLEtBQUwsQ0FBVyxZQUFYLEdBQTBCLFFBQTFCO0FBQ0EsV0FBSyxLQUFMLENBQVcsWUFBWCxHQUEwQixLQUExQjtBQUNBLFdBQUssS0FBTCxDQUFXLENBQVgsR0FBZSxDQUFDLENBQWhCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBSyxRQUFMLENBQWMsS0FBSyxLQUFuQjtBQUNEOzs7OEJBQ1M7QUFDUixXQUFLLEVBQUwsQ0FBUSxXQUFSLENBQW9CLFNBQXBCO0FBQ0EsV0FBSyxZQUFMLEdBQW9CLEtBQXBCO0FBQ0Q7Ozs2QkFDUTtBQUNQLFdBQUssRUFBTCxDQUFRLFdBQVIsQ0FBdUIsS0FBSyxLQUE1QjtBQUNBLFdBQUssWUFBTCxHQUFvQixJQUFwQjtBQUNEOzs7O0VBekM4QixTQUFTLFM7O2tCQUFyQixHOzs7Ozs7Ozs7QUNIckI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQixHOzs7QUFDbkIsZUFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUE7O0FBR2pCLFVBQUssS0FBTCxHQUFhLEtBQWI7O0FBRUEsVUFBSyxPQUFMLEdBQWUsc0JBQVksTUFBWixDQUFmO0FBQ0EsVUFBSyxPQUFMLENBQWEsQ0FBYixHQUFpQixNQUFLLE9BQUwsQ0FBYSxTQUFiLEdBQXlCLEtBQXpCLEdBQWlDLENBQWpDLEdBQXFDLEVBQXREO0FBQ0EsVUFBSyxPQUFMLENBQWEsQ0FBYixHQUFpQixNQUFLLE9BQUwsQ0FBYSxTQUFiLEdBQXlCLE1BQXpCLEdBQWtDLENBQWxDLEdBQXNDLEVBQXZEOztBQUVBLFVBQUssU0FBTCxHQUFpQixzQkFBWSxRQUFaLENBQWpCO0FBQ0EsVUFBSyxTQUFMLENBQWUsQ0FBZixHQUFtQixNQUFLLFNBQUwsQ0FBZSxTQUFmLEdBQTJCLEtBQTNCLEdBQW1DLENBQW5DLEdBQXVDLENBQXZDLEdBQTJDLEVBQTlEO0FBQ0EsVUFBSyxTQUFMLENBQWUsQ0FBZixHQUFtQixNQUFLLFNBQUwsQ0FBZSxTQUFmLEdBQTJCLE1BQTNCLEdBQW9DLENBQXBDLEdBQXdDLEVBQTNEOztBQUVBLFVBQUssUUFBTCxHQUFnQixzQkFBWSx1QkFBYSxTQUFiLEtBQTJCLE9BQTNCLEdBQXFDLFVBQWpELENBQWhCO0FBQ0EsVUFBSyxRQUFMLENBQWMsQ0FBZCxHQUFrQixNQUFLLEtBQUwsR0FBYSxNQUFLLFFBQUwsQ0FBYyxTQUFkLEdBQTBCLEtBQTFCLEdBQWtDLENBQS9DLEdBQW1ELEVBQXJFO0FBQ0EsVUFBSyxRQUFMLENBQWMsQ0FBZCxHQUFrQixNQUFLLFFBQUwsQ0FBYyxTQUFkLEdBQTBCLE1BQTFCLEdBQW1DLENBQW5DLEdBQXVDLEVBQXpEOztBQUVBO0FBQ0EsVUFBSyxTQUFMLENBQWUsS0FBZixDQUFxQixDQUFyQixHQUF5QixNQUFLLFFBQUwsQ0FBYyxLQUFkLENBQW9CLENBQXBCLEdBQXdCLENBQWpEOztBQUVBLFVBQUssUUFBTCxDQUFjLE1BQUssT0FBbkIsRUFBNEIsTUFBSyxTQUFqQyxFQUE0QyxNQUFLLFFBQWpEOztBQUVBLFVBQUssUUFBTCxDQUFjLGdCQUFkLENBQStCLE9BQS9CLEVBQXdDLFlBQU07QUFDNUMsNkJBQWEsTUFBYjtBQUNBLFlBQUssUUFBTCxDQUFjLFdBQWQsQ0FBMEIsdUJBQWEsU0FBYixLQUEyQixPQUEzQixHQUFxQyxVQUEvRDtBQUNBLDhCQUFjLEdBQWQsQ0FBa0IsT0FBbEIsRUFBMkIsdUJBQWEsU0FBYixFQUEzQjtBQUNELEtBSkQ7O0FBTUEsVUFBSyxPQUFMLENBQWEsZ0JBQWIsQ0FBOEIsT0FBOUIsRUFBdUM7QUFBQSxhQUFNLHlCQUFjLE1BQWQsQ0FBcUIsYUFBckIsQ0FBTjtBQUFBLEtBQXZDO0FBQ0EsVUFBSyxTQUFMLENBQWUsZ0JBQWYsQ0FBZ0MsT0FBaEMsRUFBeUM7QUFBQSxhQUFNLHlCQUFjLE1BQWQsQ0FBcUIsY0FBckIsQ0FBTjtBQUFBLEtBQXpDO0FBN0JpQjtBQThCbEI7OztFQS9COEIsU0FBUyxTOztrQkFBckIsRzs7Ozs7Ozs7Ozs7QUNMckI7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTSxTQUFTO0FBQ2IsS0FBRyxJQURVO0FBRWIsS0FBRztBQUZVLENBQWY7O0lBS3FCLEk7OztBQUNuQixnQkFBWSxJQUFaLEVBQWtCO0FBQUE7O0FBQUEsNEdBQ1Ysd0JBQWMsY0FBZCxDQUE2QixJQUE3QixDQURVOztBQUdoQixVQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0EsVUFBSyxNQUFMLEdBQWMsTUFBSyxTQUFMLEVBQWQ7QUFDQSxVQUFLLElBQUwsR0FBWSxNQUFLLE1BQUwsQ0FBWSxLQUFaLEdBQW9CLENBQWhDO0FBQ0EsVUFBSyxJQUFMLEdBQVksTUFBSyxNQUFMLENBQVksTUFBWixHQUFxQixDQUFqQzs7QUFFQSxVQUFLLElBQUwsR0FBWSxLQUFaO0FBQ0EsVUFBSyxFQUFMLEdBQVUsQ0FBVjtBQVRnQjtBQVVqQjs7OzsyQkFDTTtBQUNMLFVBQUksS0FBSyxJQUFULEVBQWU7QUFDYjtBQUNEO0FBQ0QsV0FBSyxFQUFMLEdBQVUsS0FBSyxHQUFMLENBQVMsS0FBSyxFQUFMLEdBQVUsT0FBTyxDQUExQixFQUE2QixDQUFDLE9BQU8sQ0FBckMsQ0FBVjtBQUNBLFdBQUssV0FBTCxDQUFpQixNQUFqQjtBQUNBLDZCQUFhLElBQWIsQ0FBa0IsTUFBbEI7QUFDRDs7OzJCQUNNO0FBQ0wsV0FBSyxFQUFMLElBQVcsT0FBTyxDQUFsQjtBQUNBLFdBQUssQ0FBTCxJQUFVLEtBQUssRUFBZjtBQUNEOzs7MEJBQ0s7QUFDSixVQUFJLEtBQUssSUFBVCxFQUFlO0FBQ2I7QUFDRDtBQUNELFdBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxXQUFLLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxXQUFLLFdBQUwsQ0FBaUIsTUFBakI7QUFDQSw2QkFBYSxJQUFiLENBQWtCLE9BQWxCO0FBQ0Q7Ozs7RUFoQytCLFNBQVMsTTs7a0JBQXRCLEk7Ozs7Ozs7Ozs7O0FDUnJCOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQixPOzs7QUFDbkIsbUJBQVksS0FBWixFQUFxQztBQUFBLFFBQWxCLEtBQWtCLHVFQUFWLFFBQVU7O0FBQUE7O0FBQUEsNkdBQzdCLEtBRDZCLEVBQ3RCLEtBRHNCLEVBQ2YsU0FEZTtBQUVwQzs7OztnQ0FDVyxLLEVBQU87QUFDakIsV0FBSyxLQUFMLEdBQWEsSUFBSSxTQUFTLE1BQWIsQ0FBb0Isd0JBQWMsY0FBZCxDQUE2QixNQUE3QixDQUFwQixFQUEwRCxLQUExRCxDQUFiO0FBQ0EsV0FBSyxLQUFMLENBQVcsSUFBWCxHQUFrQixLQUFLLEtBQUwsQ0FBVyxTQUFYLEdBQXVCLEtBQXZCLEdBQStCLENBQWpEO0FBQ0EsV0FBSyxLQUFMLENBQVcsSUFBWCxHQUFrQixLQUFLLEtBQUwsQ0FBVyxTQUFYLEdBQXVCLE1BQXZCLEdBQWdDLENBQWxEO0FBQ0EsV0FBSyxLQUFMLENBQVcsWUFBWCxHQUEwQixLQUExQjtBQUNBLFdBQUssUUFBTCxDQUFjLEtBQUssS0FBbkI7QUFDRDs7O2dDQUNXLEssRUFBTztBQUNqQixXQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEtBQXZCO0FBQ0Q7Ozs7OztrQkFia0IsTzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNIQSxhOzs7QUFDbkIseUJBQVksS0FBWixFQUFtQixNQUFuQixFQUEyQjtBQUFBOztBQUFBOztBQUd6QixVQUFLLE1BQUwsR0FBYyxJQUFJLFNBQVMsS0FBYixFQUFkO0FBQ0EsVUFBSyxNQUFMLENBQVksUUFBWixDQUFxQixTQUFyQixDQUErQixvQkFBL0IsRUFBcUQsUUFBckQsQ0FBOEQsQ0FBOUQsRUFBaUUsQ0FBakUsRUFBb0UsS0FBcEUsRUFBMkUsTUFBM0U7O0FBRUEsVUFBSyxVQUFMLEdBQWtCLElBQUksU0FBUyxJQUFiLENBQWtCLEVBQWxCLEVBQXNCLGVBQXRCLEVBQXVDLE1BQXZDLENBQWxCO0FBQ0EsVUFBSyxVQUFMLENBQWdCLENBQWhCLEdBQW9CLFNBQVMsQ0FBN0I7QUFDQSxVQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsR0FBb0IsUUFBUSxDQUE1QjtBQUNBLFVBQUssVUFBTCxDQUFnQixTQUFoQixHQUE0QixRQUE1QjtBQUNBLFVBQUssVUFBTCxDQUFnQixZQUFoQixHQUErQixRQUEvQjs7QUFFQSxVQUFLLFFBQUwsQ0FBYyxNQUFLLE1BQW5CLEVBQTJCLE1BQUssVUFBaEM7QUFDQTtBQUNBO0FBZHlCO0FBZTFCOzs7OzRCQUNPLEksRUFBTTtBQUNaLFdBQUssVUFBTCxDQUFnQixJQUFoQixHQUF1QixJQUF2QjtBQUNBO0FBQ0Q7Ozs7RUFwQndDLFNBQVMsUzs7a0JBQS9CLGE7Ozs7Ozs7OztBQ0FyQjs7Ozs7Ozs7Ozs7O0lBRXFCLEs7OztBQUNuQixtQkFBYztBQUFBOztBQUFBLDhHQUNOLHdCQUFjLFNBQWQsQ0FBd0IsT0FBeEIsQ0FETTs7QUFHWixVQUFLLE1BQUwsR0FBYyxNQUFLLFNBQUwsRUFBZDtBQUNBLFVBQUssSUFBTCxHQUFZLE1BQUssTUFBTCxDQUFZLEtBQVosR0FBb0IsQ0FBaEM7QUFDQSxVQUFLLElBQUwsR0FBWSxNQUFLLE1BQUwsQ0FBWSxNQUF4QjtBQUxZO0FBTWI7OztFQVBnQyxTQUFTLE07O2tCQUF2QixLOzs7Ozs7OztBQ0ZyQixJQUFNLFdBQVcsQ0FDZixFQUFFLElBQUksU0FBTixFQUFpQixLQUFLLHdCQUF0QixFQURlO0FBRWY7QUFDQTtBQUNBLEVBQUUsSUFBSSxPQUFOLEVBQWUsS0FBSyxlQUFwQixFQUplLEVBS2YsRUFBRSxJQUFJLEtBQU4sRUFBYSxLQUFLLGdCQUFsQixFQUxlLEVBTWYsRUFBRSxJQUFJLE9BQU4sRUFBZSxLQUFLLGtCQUFwQixFQU5lLEVBT2YsRUFBRSxJQUFJLFVBQU4sRUFBa0IsS0FBSyxxQkFBdkIsRUFQZSxFQVFmLEVBQUUsSUFBSSxRQUFOLEVBQWdCLEtBQUssbUJBQXJCLEVBUmUsRUFTZixFQUFFLElBQUksS0FBTixFQUFhLEtBQUssb0JBQWxCLEVBVGUsRUFVZixFQUFFLElBQUksVUFBTixFQUFrQixLQUFLLHlCQUF2QixFQVZlLEVBV2YsRUFBRSxJQUFJLE1BQU4sRUFBYyxLQUFLLHFCQUFuQixFQVhlLEVBWWYsRUFBRSxJQUFJLE1BQU4sRUFBYyxLQUFLLHNCQUFuQixFQVplLEVBYWYsRUFBRSxJQUFJLE1BQU4sRUFBYyxLQUFLLGdCQUFuQixFQWJlLEVBY2YsRUFBRSxJQUFJLE9BQU4sRUFBZSxLQUFLLGlCQUFwQixFQWRlLENBQWpCOztBQWlCQSxJQUFNLHlCQUF5QixTQUF6QixzQkFBeUI7QUFBQSxTQUFTO0FBQ3RDLFlBQVEsQ0FBQyxJQUFELENBRDhCO0FBRXRDLFlBQVEsRUFBRSxPQUFPLEdBQVQsRUFBYyxRQUFRLEVBQXRCLEVBRjhCO0FBR3RDLGdCQUFZO0FBQ1YsV0FBSyxDQURLO0FBRVYsWUFBTSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sS0FBUCxDQUZJO0FBR1YsWUFBTTtBQUhJO0FBSDBCLEdBQVQ7QUFBQSxDQUEvQjs7QUFVQSxJQUFNLG1CQUFtQjtBQUN2QixRQUFNLHVCQUF1QixNQUF2QixDQURpQjtBQUV2QixXQUFTLHVCQUF1QixTQUF2QixDQUZjO0FBR3ZCLFdBQVMsdUJBQXVCLFNBQXZCLENBSGM7QUFJdkIsT0FBSztBQUNILFlBQVEsQ0FBQyxLQUFELENBREw7QUFFSCxZQUFRLEVBQUUsT0FBTyxHQUFULEVBQWMsUUFBUSxFQUF0QixFQUEwQixTQUFTLENBQW5DLEVBRkw7QUFHSCxnQkFBWTtBQUNWLGdCQUFVLENBREE7QUFFVixpQkFBVyxDQUZEO0FBR1YsaUJBQVcsQ0FIRDtBQUlWLGlCQUFXLENBSkQ7QUFLVixrQkFBWSxDQUxGO0FBTVYsa0JBQVksQ0FORjtBQU9WLGNBQVEsQ0FQRTtBQVFWLGVBQVMsQ0FSQztBQVNWLGVBQVMsQ0FUQztBQVVWLGVBQVM7QUFWQztBQUhULEdBSmtCO0FBb0J2QixXQUFTO0FBQ1AsWUFBUSxDQUFDLFVBQUQsQ0FERDtBQUVQLFlBQVEsRUFBRSxPQUFPLEVBQVQsRUFBYSxRQUFRLEVBQXJCLEVBQXlCLFNBQVMsQ0FBbEMsRUFGRDtBQUdQLGdCQUFZO0FBQ1YsZ0JBQVUsQ0FEQTtBQUVWLGlCQUFXLENBRkQ7QUFHVixpQkFBVyxDQUhEO0FBSVYsaUJBQVcsQ0FKRDtBQUtWLGtCQUFZLENBTEY7QUFNVixrQkFBWSxDQU5GO0FBT1YsY0FBUSxDQVBFO0FBUVYsZUFBUyxDQVJDO0FBU1YsZUFBUyxDQVRDO0FBVVYsZUFBUztBQVZDO0FBSEwsR0FwQmM7QUFvQ3ZCLFFBQU07QUFDSixZQUFRLENBQUMsTUFBRCxDQURKO0FBRUosWUFBUSxFQUFFLE9BQU8sRUFBVCxFQUFhLFFBQVEsRUFBckIsRUFGSjtBQUdKLGdCQUFZO0FBQ1YsYUFBTyxDQURHO0FBRVYsZ0JBQVUsQ0FGQTtBQUdWLGNBQVEsQ0FIRTtBQUlWLFlBQU07QUFKSTtBQUhSO0FBcENpQixDQUF6Qjs7QUFnREEsSUFBTSxlQUFlLEVBQXJCOztBQUVBLElBQU0sZ0JBQWdCO0FBQ3BCLE1BRG9CLGtCQUNiO0FBQUE7O0FBQ0wsYUFBUyxLQUFULENBQWUsbUJBQWYsR0FBcUMsQ0FBQyxLQUFELENBQXJDO0FBQ0EsU0FBSyxLQUFMLEdBQWEsSUFBSSxTQUFTLFNBQWIsRUFBYjtBQUNBLFNBQUssS0FBTCxDQUFXLGFBQVgsQ0FBeUIsU0FBUyxLQUFsQztBQUNBLFNBQUssS0FBTCxDQUFXLFlBQVgsQ0FBd0IsUUFBeEI7O0FBRUEsV0FBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQXFCO0FBQ3RDLFlBQUssS0FBTCxDQUFXLGdCQUFYLENBQTRCLFVBQTVCLEVBQXdDO0FBQUEsZUFBTSxTQUFOO0FBQUEsT0FBeEM7QUFDQSxZQUFLLEtBQUwsQ0FBVyxnQkFBWCxDQUE0QixPQUE1QixFQUFxQztBQUFBLGVBQU0sUUFBTjtBQUFBLE9BQXJDO0FBQ0QsS0FITSxDQUFQO0FBSUQsR0FYbUI7QUFZcEIsV0Fab0IscUJBWVYsSUFaVSxFQVlKO0FBQ2QsV0FBTyxLQUFLLEtBQUwsQ0FBVyxTQUFYLENBQXFCLElBQXJCLENBQVA7QUFDRCxHQWRtQjtBQWVwQixnQkFmb0IsMEJBZUwsSUFmSyxFQWVDO0FBQUE7O0FBQ25CLFFBQUksQ0FBQyxhQUFhLElBQWIsQ0FBTCxFQUF5QjtBQUN2QixVQUFNLE9BQU8saUJBQWlCLElBQWpCLENBQWI7O0FBRUEsVUFBSSxDQUFDLElBQUwsRUFBVztBQUNULGNBQU0sSUFBSSxLQUFKLENBQVUsMEJBQVYsQ0FBTjtBQUNEOztBQUVELFdBQUssTUFBTCxHQUFjLEtBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0I7QUFBQSxlQUFPLE9BQUssU0FBTCxDQUFlLEdBQWYsQ0FBUDtBQUFBLE9BQWhCLENBQWQ7QUFDQSxtQkFBYSxJQUFiLElBQXFCLElBQUksU0FBUyxXQUFiLENBQXlCLElBQXpCLENBQXJCO0FBQ0Q7O0FBRUQsV0FBTyxhQUFhLElBQWIsQ0FBUDtBQUNEO0FBNUJtQixDQUF0Qjs7a0JBK0JlLGE7Ozs7Ozs7O0FDNUdmLElBQU0sY0FBYztBQUNsQixZQUFVLElBRFE7QUFFbEIsU0FBTyxJQUZXO0FBR2xCLFlBQVUsSUFIUTtBQUlsQixZQUFVLFNBSlE7QUFLbEIsT0FBSyxJQUxhO0FBTWxCLE9BQUssSUFOYTtBQU9sQixVQUFRLElBUFU7QUFRbEIsV0FBUyxJQVJTO0FBU2xCLGdCQUFjLElBVEk7QUFVbEIsUUFBTTtBQUNKLFFBQUksSUFEQTtBQUVKLFVBQU0sSUFGRjtBQUdKLFNBQUs7QUFIRCxHQVZZO0FBZWxCLFNBQU8sSUFmVztBQWdCbEIsVUFBUTtBQUNOLFlBQVEsQ0FBQyxDQUFDLENBQUQsRUFBSSxFQUFKLENBQUQsRUFBVSxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQVY7QUFERixHQWhCVTtBQW1CbEIsS0FuQmtCLGVBbUJkLEdBbkJjLEVBbUJULEtBbkJTLEVBbUJGO0FBQ2QsU0FBSyxHQUFMLElBQVksS0FBWjtBQUNEO0FBckJpQixDQUFwQjs7a0JBd0JlLFc7Ozs7Ozs7OztBQ3hCZjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNLGdCQUFnQjtBQUNwQixNQURvQixnQkFDZixLQURlLEVBQ1I7QUFBQTs7QUFDVixTQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsU0FBSyxhQUFMLEdBQXFCLElBQXJCO0FBQ0EsU0FBSyxPQUFMLEdBQWU7QUFDYix3Q0FEYTtBQUViLHNDQUZhO0FBR2Isb0NBSGE7QUFJYixvQ0FKYTtBQUtiO0FBTGEsS0FBZjs7QUFRQSxhQUFTLE1BQVQsQ0FBZ0IsVUFBaEIsR0FBNkIsU0FBUyxNQUFULENBQWdCLEdBQTdDO0FBQ0EsYUFBUyxNQUFULENBQWdCLGdCQUFoQixDQUFpQyxNQUFqQyxFQUF5QyxhQUFLO0FBQzVDLFVBQUksTUFBSyxhQUFMLElBQXNCLE1BQUssYUFBTCxDQUFtQixJQUE3QyxFQUFtRDtBQUNqRCxjQUFLLGFBQUwsQ0FBbUIsSUFBbkIsQ0FBd0IsQ0FBeEI7QUFDRDtBQUNELFlBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsQ0FBbEI7QUFDRCxLQUxEO0FBTUQsR0FuQm1CO0FBb0JwQixRQXBCb0Isa0JBb0JiLElBcEJhLEVBb0JQO0FBQ1gsUUFBSSxLQUFLLGFBQVQsRUFBd0I7QUFDdEIsVUFBSSxLQUFLLGFBQUwsQ0FBbUIsT0FBdkIsRUFBZ0M7QUFDOUIsYUFBSyxhQUFMLENBQW1CLE9BQW5CO0FBQ0Q7QUFDRCxXQUFLLEtBQUwsQ0FBVyxXQUFYLENBQXVCLEtBQUssYUFBNUI7QUFDRDtBQUNELFNBQUssYUFBTCxHQUFxQixJQUFJLEtBQUssT0FBTCxDQUFhLElBQWIsQ0FBSixDQUF1QixLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLEtBQXpDLEVBQWdELEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsTUFBbEUsQ0FBckI7QUFDQSxTQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLEtBQUssYUFBekI7QUFDRDtBQTdCbUIsQ0FBdEI7O2tCQWdDZSxhOzs7Ozs7OztBQ3RDZixJQUFNLGdCQUFnQjtBQUNwQixNQURvQixrQkFDYjtBQUNMLFdBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVjtBQUFBLGFBQXFCLEdBQUcsSUFBSCxDQUN0QztBQUFBLGVBQU0sU0FBTjtBQUFBLE9BRHNDLEVBRXRDO0FBQUEsZUFBSyxPQUFPLGVBQVAsRUFBd0IsQ0FBeEIsQ0FBTDtBQUFBLE9BRnNDLEVBR3hDLE1BSHdDLENBQXJCO0FBQUEsS0FBWixDQUFQO0FBSUQsR0FObUI7QUFPcEIsU0FQb0IscUJBT1Y7QUFDUixXQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFDdEMsU0FBRyxHQUFILENBQU8sV0FBUCxFQUFvQixFQUFFLFFBQVEsS0FBVixFQUFwQixFQUF1QyxhQUFLO0FBQzFDLFlBQUksRUFBRSxLQUFOLEVBQWE7QUFDWCxpQkFBTyxFQUFFLEtBQVQ7QUFDQTtBQUNEO0FBQ0QsZ0JBQVEsRUFBRSxRQUFGLENBQVcsQ0FBWCxDQUFSO0FBQ0QsT0FORDtBQU9ELEtBUk0sQ0FBUDtBQVNELEdBakJtQjtBQWtCcEIsS0FsQm9CLGVBa0JoQixHQWxCZ0IsRUFrQkM7QUFBQSxRQUFaLE1BQVksdUVBQUgsQ0FBRzs7QUFDbkIsV0FBTyxJQUFJLE9BQUosQ0FBWTtBQUFBLGFBQVcsR0FBRyxHQUFILENBQU8sYUFBUCxFQUFzQixFQUFFLFFBQUYsRUFBTyxjQUFQLEVBQXRCLEVBQXVDLE9BQXZDLENBQVg7QUFBQSxLQUFaLEVBQ0osSUFESSxDQUNDLGFBQUs7QUFDVCxVQUFJLEVBQUUsS0FBTixFQUFhO0FBQ1gsY0FBTSxJQUFJLEtBQUosQ0FBVSxFQUFFLEtBQVosQ0FBTjtBQUNELE9BRkQsTUFFTyxJQUFJLEVBQUUsUUFBRixLQUFlLEVBQW5CLEVBQXVCO0FBQzVCO0FBQ0EsZUFBTyxFQUFQO0FBQ0Q7QUFDRCxhQUFPLEtBQUssS0FBTCxDQUFXLEVBQUUsUUFBYixDQUFQO0FBQ0QsS0FUSSxDQUFQO0FBVUQsR0E3Qm1CO0FBOEJwQixLQTlCb0IsZUE4QmhCLEdBOUJnQixFQThCWCxLQTlCVyxFQThCUTtBQUFBLFFBQVosTUFBWSx1RUFBSCxDQUFHOztBQUMxQixPQUFHLEdBQUgsQ0FBTyxhQUFQLEVBQXNCLEVBQUUsUUFBRixFQUFPLE9BQU8sS0FBSyxTQUFMLENBQWUsS0FBZixDQUFkLEVBQXFDLGNBQXJDLEVBQXRCO0FBQ0QsR0FoQ21CO0FBaUNwQixPQWpDb0IsaUJBaUNkLEtBakNjLEVBaUNFO0FBQUEsUUFBVCxHQUFTLHVFQUFILENBQUc7O0FBQ3BCLE9BQUcsR0FBSCxDQUFPLFdBQVAsRUFBb0I7QUFDbEIsK0JBQXNCLFFBQVEsQ0FBUixHQUFZLEdBQVosR0FBa0IsRUFBeEMsVUFBOEMsS0FBOUMscUVBRGtCO0FBR2xCLG1CQUFhLHNEQUhLO0FBSWxCLGdCQUFVO0FBSlEsS0FBcEI7QUFNRCxHQXhDbUI7QUF5Q3BCLFFBekNvQixvQkF5Q1g7QUFDUCxPQUFHLFVBQUgsQ0FBYyxlQUFkO0FBQ0Q7QUEzQ21CLENBQXRCOztrQkE4Q2UsYTs7Ozs7Ozs7QUM5Q2YsSUFBTSxlQUFlO0FBQ25CLE1BRG1CLGdCQUNkLE1BRGMsRUFDTjtBQUNYLFNBQUssT0FBTCxHQUFlLE1BQWY7QUFDQSxTQUFLLEVBQUwsR0FBVSxTQUFTLEtBQVQsQ0FBZSxJQUFmLENBQW9CLE1BQXBCLEVBQTRCLEVBQUUsTUFBTSxDQUFDLENBQVQsRUFBWSxRQUFRLEdBQXBCLEVBQTVCLENBQVY7QUFDQSxTQUFLLEVBQUwsQ0FBUSxNQUFSLEdBQWlCLENBQUMsS0FBSyxPQUF2QjtBQUNBO0FBQ0EsU0FBSyxFQUFMLENBQVEsUUFBUixHQUFtQixDQUFuQjtBQUNELEdBUGtCO0FBUW5CLFFBUm1CLG9CQVFWO0FBQ1AsU0FBSyxPQUFMLEdBQWUsQ0FBQyxLQUFLLE9BQXJCO0FBQ0EsU0FBSyxFQUFMLENBQVEsTUFBUixHQUFpQixDQUFDLEtBQUssT0FBdkI7QUFDRCxHQVhrQjtBQVluQixXQVptQix1QkFZUDtBQUNWLFdBQU8sS0FBSyxPQUFaO0FBQ0QsR0Fka0I7QUFlbkIsTUFmbUIsZ0JBZWQsS0FmYyxFQWVQO0FBQ1YsUUFBSSxLQUFLLE9BQVQsRUFBa0I7QUFDaEIsZUFBUyxLQUFULENBQWUsSUFBZixDQUFvQixLQUFwQjtBQUNEO0FBQ0Y7QUFuQmtCLENBQXJCOztrQkFzQmUsWTs7Ozs7Ozs7Ozs7QUN0QmY7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQixTOzs7QUFDbkIscUJBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBOztBQUdqQixVQUFLLEVBQUwsR0FBVSxJQUFJLFNBQVMsTUFBYixDQUFvQix3QkFBYyxTQUFkLENBQXdCLE9BQXhCLENBQXBCLENBQVY7QUFDQSxVQUFLLEdBQUwsR0FBVyxrQkFBUSxLQUFSLENBQVg7O0FBRUEsVUFBSyxRQUFMLEdBQWdCLElBQUksU0FBUyxJQUFiLGNBQTZCLHNCQUFZLFFBQXpDLFNBQXVELGVBQXZELEVBQXdFLE1BQXhFLENBQWhCO0FBQ0EsVUFBSyxRQUFMLENBQWMsU0FBZCxHQUEwQixRQUExQjtBQUNBLFVBQUssUUFBTCxDQUFjLENBQWQsR0FBa0IsUUFBUSxDQUExQjtBQUNBLFVBQUssUUFBTCxDQUFjLENBQWQsR0FBa0IsRUFBbEI7O0FBRUEsVUFBSyxLQUFMLEdBQWEsSUFBSSxTQUFTLElBQWIsaUJBQWdDLHNCQUFZLEtBQTVDLFNBQXVELGVBQXZELEVBQXdFLE1BQXhFLENBQWI7QUFDQSxVQUFLLEtBQUwsQ0FBVyxTQUFYLEdBQXVCLFFBQXZCO0FBQ0EsVUFBSyxLQUFMLENBQVcsQ0FBWCxHQUFlLFFBQVEsQ0FBdkI7QUFDQSxVQUFLLEtBQUwsQ0FBVyxDQUFYLEdBQWUsR0FBZjs7QUFFQSxVQUFLLFNBQUwsR0FBaUIsa0JBQVEsU0FBUixDQUFqQjtBQUNBLFVBQUssU0FBTCxDQUFlLENBQWYsR0FBbUIsUUFBUSxDQUEzQjtBQUNBLFVBQUssU0FBTCxDQUFlLENBQWYsR0FBbUIsR0FBbkI7O0FBRUEsVUFBSyxRQUFMLEdBQWdCLGtCQUFRLFlBQVIsRUFBc0IsUUFBdEIsQ0FBaEI7QUFDQSxVQUFLLFFBQUwsQ0FBYyxDQUFkLEdBQWtCLFFBQVEsQ0FBMUI7QUFDQSxVQUFLLFFBQUwsQ0FBYyxDQUFkLEdBQWtCLEdBQWxCOztBQUVBLFVBQUssUUFBTCxDQUFjLE1BQUssRUFBbkIsRUFBdUIsTUFBSyxHQUE1QixFQUFpQyxNQUFLLFFBQXRDLEVBQWdELE1BQUssS0FBckQsRUFBNEQsTUFBSyxTQUFqRSxFQUE0RSxNQUFLLFFBQWpGOztBQUVBLFFBQUksc0JBQVksS0FBWixHQUFvQixzQkFBWSxRQUFwQyxFQUE4QztBQUM1QyxZQUFLLFFBQUwsQ0FBYyxJQUFkLHdCQUF3QyxzQkFBWSxRQUFwRDtBQUNBLDRCQUFZLFFBQVosR0FBdUIsc0JBQVksS0FBbkM7QUFDQSw4QkFBYyxHQUFkLENBQWtCLFVBQWxCLEVBQThCLHNCQUFZLFFBQTFDO0FBQ0EsWUFBSyxLQUFMLENBQVcsSUFBWCxzQkFBbUMsc0JBQVksUUFBL0M7O0FBRUEsOEJBQWMsR0FBZCxDQUFrQixhQUFsQixFQUFpQyxDQUFqQyxFQUFvQyxJQUFwQyxDQUF5QyxpQkFBekM7QUFDRDs7QUFFRCxRQUFJLHNCQUFZLFFBQVosS0FBeUIsS0FBN0IsRUFBb0M7QUFDbEMsVUFBTSxRQUFRLHNCQUFZLEtBQTFCO0FBQ0EsWUFBSyxPQUFMLEdBQWUsSUFBSSxTQUFTLElBQWIsQ0FBa0IsRUFBbEIsRUFBc0IsZUFBdEIsRUFBdUMsTUFBdkMsQ0FBZjtBQUNBLFlBQUssT0FBTCxDQUFhLFNBQWIsR0FBeUIsUUFBekI7QUFDQSxZQUFLLE9BQUwsQ0FBYSxDQUFiLEdBQWlCLFFBQVEsQ0FBekI7QUFDQSxZQUFLLE9BQUwsQ0FBYSxDQUFiLEdBQWlCLEdBQWpCO0FBQ0EsWUFBSyxRQUFMLENBQWMsTUFBSyxPQUFuQjs7QUFFQSxVQUFJLHNCQUFZLEdBQWhCLEVBQXFCO0FBQ25CLGNBQUssT0FBTCxDQUFhLElBQWIsSUFBd0IsTUFBTSxJQUE5QixhQUF5QyxNQUFNLEdBQU4sS0FBYyxDQUFkLEdBQWtCLEdBQWxCLEdBQXdCLEVBQWpFLG1CQUErRSxNQUFNLEdBQU4sS0FBYyxDQUFkLEdBQWtCLEdBQWxCLEdBQXdCLEVBQXZHO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsY0FBSyxPQUFMLENBQWEsSUFBYixJQUF3QixNQUFNLElBQTlCLGdCQUE0QyxNQUFNLEdBQU4sS0FBYyxDQUFkLEdBQWtCLElBQWxCLEdBQXlCLEVBQXJFO0FBQ0Q7QUFDRjs7QUFFRCxRQUFNLFFBQVEsc0JBQVksTUFBWixDQUFtQixNQUFuQixDQUEwQixzQkFBWSxHQUF0QyxDQUFkO0FBQ0EsUUFBTSxnQkFBYyx5QkFBVSxNQUFNLENBQU4sQ0FBVixFQUFvQixNQUFNLENBQU4sQ0FBcEIsQ0FBcEI7QUFDQSxRQUFNLFNBQVM7QUFDYixZQUFNLHNCQUFZLElBREw7QUFFYixjQUFRLHNCQUFZLE1BRlA7QUFHYixlQUFTLHNCQUFZO0FBSFIsS0FBZjs7QUFNQSw0QkFBYyxHQUFkLENBQWtCLEtBQWxCLEVBQXlCLENBQXpCLEVBQTRCLElBQTVCLENBQWlDLGFBQUs7QUFDcEMsY0FBUSxJQUFSLENBQWEsS0FBYjtBQUNBLGNBQVEsSUFBUixDQUFhLE1BQWI7QUFDQSxjQUFRLElBQVIsQ0FBYSxDQUFiO0FBQ0EsY0FBUSxJQUFSLENBQWEsRUFBRSxNQUFGLENBQVMsTUFBVCxHQUFrQixHQUFsQixHQUF3QixPQUFPLE1BQVAsQ0FBYyxNQUFuRDtBQUNBLFVBQUksRUFBRSxNQUFGLENBQVMsTUFBVCxHQUFrQixHQUFsQixHQUF3QixPQUFPLE1BQVAsQ0FBYyxNQUF0QyxJQUNBLEtBQUssU0FBTCxDQUFlLE1BQWYsRUFBdUIsTUFBdkIsR0FBZ0MsSUFEcEMsRUFDMEM7QUFDeEMsZ0NBQWMsR0FBZCxDQUFrQixLQUFsQixFQUF5QixNQUF6QixFQUFpQyxDQUFqQztBQUNEO0FBQ0YsS0FURDs7QUFXQSxVQUFLLFVBQUw7QUFyRWlCO0FBc0VsQjs7OztpQ0FDWTtBQUNYLFdBQUssU0FBTCxDQUFlLGdCQUFmLENBQWdDLE9BQWhDLEVBQXlDLE1BQXpDO0FBQ0EsV0FBSyxRQUFMLENBQWMsZ0JBQWQsQ0FBK0IsT0FBL0IsRUFBd0M7QUFBQSxlQUFNLHdCQUFjLEtBQWQsQ0FBb0Isc0JBQVksS0FBaEMsRUFBdUMsc0JBQVksSUFBWixDQUFpQixHQUF4RCxDQUFOO0FBQUEsT0FBeEM7O0FBRUEsV0FBSyxTQUFMLEdBQWlCLGFBQUs7QUFDcEIsWUFBSSxFQUFFLE9BQUYsS0FBYyxFQUFsQixFQUFzQjtBQUNwQjtBQUNBLFlBQUUsY0FBRjtBQUNEO0FBQ0YsT0FMRDtBQU1BLGFBQU8sZ0JBQVAsQ0FBd0IsU0FBeEIsRUFBbUMsS0FBSyxTQUF4QztBQUNEOzs7OEJBQ1M7QUFDUixhQUFPLG1CQUFQLENBQTJCLFNBQTNCLEVBQXNDLEtBQUssU0FBM0M7QUFDRDs7OztFQXRGb0MsU0FBUyxTOztrQkFBM0IsUzs7O0FBeUZyQixTQUFTLE1BQVQsR0FBa0I7QUFDaEIsVUFBUSxzQkFBWSxRQUFwQjtBQUNFLFNBQUssUUFBTDtBQUNFLCtCQUFlLE1BQWYsQ0FBc0IsWUFBdEI7QUFDQTtBQUNGLFNBQUssS0FBTDtBQUNFLCtCQUFlLE1BQWYsQ0FBc0IsV0FBdEI7QUFDQTtBQU5KO0FBUUQ7O0FBRUQsU0FBUyxpQkFBVCxDQUEyQixXQUEzQixFQUF3QztBQUN0QyxNQUFJLFlBQVksWUFBWSxNQUFaLEdBQXFCLENBQWpDLEVBQW9DLEtBQXBDLElBQTZDLHNCQUFZLFFBQTdELEVBQXVFO0FBQ3JFO0FBQ0Q7O0FBRUQsTUFBTSxhQUFhLFlBQVksSUFBWixDQUFpQjtBQUFBLFdBQU0sR0FBRyxFQUFILEtBQVUsc0JBQVksSUFBWixDQUFpQixFQUFqQztBQUFBLEdBQWpCLENBQW5COztBQUVBLE1BQUksVUFBSixFQUFnQjtBQUNkLGVBQVcsS0FBWCxHQUFtQixzQkFBWSxRQUEvQjtBQUNELEdBRkQsTUFFTztBQUNMLFFBQU0sWUFBWTtBQUNoQixVQUFJLHNCQUFZLElBQVosQ0FBaUIsRUFETDtBQUVoQixZQUFNLHNCQUFZLElBQVosQ0FBaUIsSUFGUDtBQUdoQixhQUFPLHNCQUFZO0FBSEgsS0FBbEI7QUFLQSxRQUFJLFlBQVksTUFBWixHQUFxQixFQUF6QixFQUE2QjtBQUMzQixrQkFBWSxJQUFaLENBQWlCLFNBQWpCO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsa0JBQVksWUFBWSxNQUFaLEdBQXFCLENBQWpDLElBQXNDLFNBQXRDO0FBQ0Q7QUFDRjs7QUFFRCxjQUFZLElBQVosQ0FBaUIsVUFBQyxDQUFELEVBQUksQ0FBSjtBQUFBLFdBQVUsRUFBRSxLQUFGLEdBQVUsRUFBRSxLQUF0QjtBQUFBLEdBQWpCO0FBQ0EsMEJBQWMsR0FBZCxDQUFrQixhQUFsQixFQUFpQyxXQUFqQyxFQUE4QyxDQUE5QztBQUNEOzs7Ozs7Ozs7OztBQ3BJRDs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTSxnQkFBZ0IsRUFBdEI7QUFDQSxJQUFNLGNBQWMsQ0FBcEI7O0lBRXFCLFU7OztBQUNuQixzQkFBWSxLQUFaLEVBQW1CLE1BQW5CLEVBQTJCO0FBQUE7O0FBQUE7O0FBR3pCLFVBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxVQUFLLE1BQUwsR0FBYyxNQUFkOztBQUVBLFVBQUssS0FBTCxHQUFhLFdBQWI7QUFDQSxVQUFLLElBQUwsR0FBWSxDQUFaO0FBQ0EsVUFBSyxRQUFMLEdBQWdCLENBQWhCO0FBQ0EsVUFBSyxhQUFMLEdBQXFCLDRCQUFrQixNQUFLLEtBQXZCLEVBQThCLE1BQUssTUFBbkMsQ0FBckI7O0FBRUEsMEJBQVksUUFBWixHQUF1QixRQUF2QjtBQUNBLDBCQUFZLE9BQVosR0FBc0IsRUFBdEI7QUFDQSwwQkFBWSxNQUFaLEdBQXFCLEVBQXJCO0FBQ0EsMEJBQVksR0FBWixHQUFrQixDQUFsQjs7QUFFQSxVQUFLLFFBQUw7QUFDQSxVQUFLLFlBQUw7QUFDQSxVQUFLLFVBQUw7QUFDQSxVQUFLLFNBQUw7O0FBRUEsVUFBSyxLQUFMLENBQVcsc0NBQVg7QUFDQSxVQUFLLFVBQUw7QUF0QnlCO0FBdUIxQjs7OzsrQkFDVTtBQUNULFdBQUssS0FBTCxHQUFhLHlCQUFlLEtBQWYsRUFBc0IsS0FBSyxLQUEzQixDQUFiO0FBQ0EsV0FBSyxVQUFMLEdBQWtCLHlCQUFlLFVBQWYsRUFBMkIsS0FBSyxLQUFoQyxDQUFsQjtBQUNBLFdBQUssUUFBTCxHQUFnQix5QkFBZSxRQUFmLEVBQXlCLEtBQUssS0FBOUIsQ0FBaEI7QUFDQSxXQUFLLEtBQUwsQ0FBVyxDQUFYLEdBQWUsS0FBSyxVQUFMLENBQWdCLENBQWhCLEdBQW9CLEtBQUssUUFBTCxDQUFjLENBQWQsR0FBa0IsS0FBSyxNQUExRDtBQUNBLFdBQUssUUFBTCxDQUFjLEtBQUssS0FBbkIsRUFBMEIsS0FBSyxVQUEvQixFQUEyQyxLQUFLLFFBQWhEO0FBQ0Q7OzttQ0FDYztBQUFBOztBQUNiLFdBQUssTUFBTCxHQUFjLENBQUMscUJBQUQsRUFBYyxxQkFBZCxDQUFkO0FBQ0EsV0FBSyxNQUFMLENBQVksQ0FBWixFQUFlLENBQWYsR0FBbUIsQ0FBQyxLQUFLLE1BQUwsQ0FBWSxDQUFaLEVBQWUsTUFBZixDQUFzQixLQUF2QixHQUErQixDQUFsRDtBQUNBLFdBQUssTUFBTCxDQUFZLENBQVosRUFBZSxDQUFmLEdBQW1CLEtBQUssS0FBTCxHQUFhLENBQWhDO0FBQ0EsV0FBSyxNQUFMLENBQVksT0FBWixDQUFvQjtBQUFBLGVBQVMsT0FBSyxVQUFMLENBQWdCLEtBQWhCLENBQVQ7QUFBQSxPQUFwQjtBQUNBLFdBQUssUUFBTCxnQ0FBaUIsS0FBSyxNQUF0QjtBQUNEOzs7aUNBQ1k7QUFDWCxXQUFLLElBQUwsR0FBWSxtQkFBUyxzQkFBWSxRQUFyQixDQUFaO0FBQ0EsV0FBSyxJQUFMLENBQVUsQ0FBVixHQUFjLEtBQUssS0FBTCxHQUFhLENBQTNCO0FBQ0EsV0FBSyxJQUFMLENBQVUsQ0FBVixHQUFjLEdBQWQ7QUFDQSxXQUFLLFFBQUwsQ0FBYyxLQUFLLElBQW5CO0FBQ0Q7OztnQ0FDVztBQUNWLFdBQUssV0FBTCxHQUFtQixJQUFJLFNBQVMsSUFBYixDQUFrQixLQUFsQixFQUF5QixlQUF6QixFQUEwQyxNQUExQyxDQUFuQjtBQUNBLFdBQUssV0FBTCxDQUFpQixDQUFqQixHQUFxQixFQUFyQjtBQUNBLFdBQUssV0FBTCxDQUFpQixDQUFqQixHQUFxQixFQUFyQjtBQUNBLFdBQUssUUFBTCxDQUFjLEtBQUssV0FBbkI7QUFDRDs7OytCQUNVLEssRUFBTztBQUNoQixZQUFNLE1BQU4sR0FBZSxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQUwsS0FBZ0IsR0FBdkIsRUFBNEIsT0FBNUIsQ0FBb0MsQ0FBcEMsQ0FBaEI7QUFDQSxZQUFNLENBQU4sSUFBVyxLQUFLLEtBQUwsR0FBYSxNQUFNLE1BQU4sQ0FBYSxLQUFyQztBQUNBLFVBQUksS0FBSyxNQUFMLEtBQWdCLEdBQXBCLEVBQXlCO0FBQ3ZCLGNBQU0sQ0FBTixHQUFVLEtBQUssTUFBTCxHQUFjLGFBQXhCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsY0FBTSxDQUFOLEdBQVUsQ0FBVjtBQUNBLGNBQU0sTUFBTixHQUFlLENBQUMsTUFBTSxNQUF0QjtBQUNEO0FBQ0QsNEJBQVksTUFBWixDQUFtQixJQUFuQixDQUF3QixNQUFNLE1BQTlCO0FBQ0Q7OzswQkFDSyxJLEVBQU07QUFDVixXQUFLLE1BQUwsR0FBYyxJQUFkO0FBQ0EsV0FBSyxhQUFMLENBQW1CLE9BQW5CLENBQTJCLElBQTNCO0FBQ0EsV0FBSyxRQUFMLENBQWMsS0FBSyxhQUFuQjtBQUNEOzs7aUNBQ1k7QUFBQTs7QUFDWCxXQUFLLGdCQUFMLENBQXNCLE9BQXRCLEVBQStCO0FBQUEsZUFBTSxPQUFLLFlBQUwsRUFBTjtBQUFBLE9BQS9CO0FBQ0EsV0FBSyxTQUFMLEdBQWlCLGFBQUs7QUFDcEIsZ0JBQVEsRUFBRSxPQUFWO0FBQ0UsZUFBSyxFQUFMO0FBQ0UsbUJBQUssWUFBTDtBQUNBLGNBQUUsY0FBRjtBQUNBO0FBQ0YsZUFBSyxFQUFMO0FBQ0UsbUJBQUssV0FBTDtBQUNBO0FBUEo7QUFTRCxPQVZEOztBQVlBLGFBQU8sZ0JBQVAsQ0FBd0IsU0FBeEIsRUFBbUMsS0FBSyxTQUF4QztBQUNEOzs7bUNBQ2M7QUFDYixVQUFJLEtBQUssTUFBVCxFQUFpQjtBQUNmLGFBQUssV0FBTDtBQUNELE9BRkQsTUFFTztBQUNMLGFBQUssSUFBTCxDQUFVLElBQVY7QUFDQSw4QkFBWSxPQUFaLENBQW9CLEtBQUssSUFBekIsSUFBaUMsQ0FBakM7QUFDRDtBQUNGOzs7a0NBQ2E7QUFDWixVQUFJLEtBQUssTUFBVCxFQUFpQjtBQUNmLGFBQUssTUFBTCxHQUFjLEtBQWQ7QUFDQSxhQUFLLFdBQUwsQ0FBaUIsS0FBSyxhQUF0QjtBQUNELE9BSEQsTUFHTztBQUNMLGFBQUssS0FBTCxDQUFXLHdCQUFYO0FBQ0Q7QUFDRjs7O2dDQUNXO0FBQ1YsVUFBSSxLQUFLLElBQUwsQ0FBVSxJQUFkLEVBQW9CO0FBQ2xCLGFBQUssSUFBTCxDQUFVLENBQVYsSUFBZSxLQUFLLEtBQUwsR0FBYSxHQUE1QjtBQUNELE9BRkQsTUFFTztBQUNMLGFBQUssVUFBTCxDQUFnQixLQUFLLEtBQXJCO0FBQ0EsYUFBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixLQUFLLEtBQUwsR0FBYSxHQUE3QjtBQUNBLGFBQUssVUFBTCxDQUFnQixJQUFoQixDQUFxQixLQUFLLEtBQUwsR0FBYSxHQUFsQztBQUNBLGFBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsS0FBSyxLQUF4Qjs7QUFFQSxhQUFLLFFBQUwsSUFBaUIsS0FBSyxLQUF0QjtBQUNBLDhCQUFZLEtBQVosR0FBb0IsS0FBSyxLQUFMLENBQVcsS0FBSyxRQUFMLEdBQWdCLEVBQTNCLENBQXBCO0FBQ0EsYUFBSyxXQUFMLENBQWlCLElBQWpCLEdBQTJCLHNCQUFZLEtBQXZDO0FBQ0Q7QUFDRjs7O2lDQUNZO0FBQUE7O0FBQ1gsV0FBSyxNQUFMLENBQVksT0FBWixDQUFvQixpQkFBUztBQUMzQixjQUFNLENBQU4sSUFBVyxPQUFLLEtBQWhCO0FBQ0EsWUFBSSxNQUFNLENBQU4sR0FBVSxDQUFDLE1BQU0sTUFBTixDQUFhLEtBQWQsR0FBc0IsQ0FBcEMsRUFBdUM7QUFDckMsaUJBQUssVUFBTCxDQUFnQixLQUFoQjtBQUNBLGlCQUFLLEtBQUwsSUFBYyxJQUFkO0FBQ0Q7QUFDRCxZQUFJLE1BQU0sbUJBQU4sQ0FBMEIsT0FBSyxJQUEvQixFQUFxQyxLQUFyQyxDQUFKLEVBQWlEO0FBQy9DLGlCQUFLLElBQUwsQ0FBVSxHQUFWO0FBQ0Q7QUFDRixPQVREO0FBVUQ7OzsrQkFDVTtBQUNULFdBQUssSUFBTCxDQUFVLElBQVY7QUFDQSxVQUFJLEtBQUssSUFBTCxDQUFVLENBQVYsR0FBYyxDQUFsQixFQUFxQjtBQUNuQixhQUFLLElBQUwsQ0FBVSxFQUFWLEdBQWUsQ0FBZjtBQUNBLGFBQUssSUFBTCxDQUFVLENBQVYsR0FBYyxDQUFkO0FBQ0QsT0FIRCxNQUdPLElBQUksS0FBSyxJQUFMLENBQVUsQ0FBVixHQUFjLEtBQUssTUFBTCxHQUFjLEtBQUssSUFBTCxDQUFVLE1BQVYsQ0FBaUIsTUFBakIsR0FBMEIsQ0FBMUQsRUFBNkQ7QUFDbEUsaUNBQWUsTUFBZixDQUFzQixXQUF0QjtBQUNELE9BRk0sTUFFQSxJQUFJLEtBQUssSUFBTCxDQUFVLENBQVYsR0FBYyxLQUFLLE1BQUwsSUFBZSxnQkFBZ0IsS0FBSyxJQUFMLENBQVUsTUFBVixDQUFpQixNQUFqQixHQUEwQixDQUF6RCxDQUFsQixFQUErRTtBQUNwRixhQUFLLElBQUwsQ0FBVSxHQUFWO0FBQ0Q7QUFDRjs7OzJCQUNNO0FBQ0wsVUFBSSxLQUFLLE1BQVQsRUFBaUI7QUFDZjtBQUNEO0FBQ0QsV0FBSyxTQUFMO0FBQ0EsV0FBSyxRQUFMO0FBQ0EsV0FBSyxJQUFMLElBQWEsQ0FBYjtBQUNEOzs7OEJBQ1M7QUFDUixhQUFPLG1CQUFQLENBQTJCLFNBQTNCLEVBQXNDLEtBQUssU0FBM0M7QUFDRDs7OztFQWxKcUMsU0FBUyxTOztrQkFBNUIsVTs7Ozs7Ozs7Ozs7QUNWckI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNLGdCQUFnQixFQUF0QjtBQUNBLElBQU0sY0FBYyxDQUFwQjs7SUFFcUIsVTs7O0FBQ25CLHNCQUFZLEtBQVosRUFBbUIsTUFBbkIsRUFBMkI7QUFBQTs7QUFBQTs7QUFHekIsVUFBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLFVBQUssTUFBTCxHQUFjLE1BQWQ7O0FBRUEsVUFBSyxLQUFMLEdBQWEsV0FBYjtBQUNBLFVBQUssT0FBTCxHQUFlLEtBQWY7O0FBRUEsVUFBSyxRQUFMOztBQUVBLFFBQU0sYUFBYSxJQUFJLFNBQVMsSUFBYixDQUFrQix1QkFBbEIsRUFBMkMsZUFBM0MsRUFBNEQsTUFBNUQsQ0FBbkI7QUFDQSxlQUFXLFNBQVgsR0FBdUIsUUFBdkI7QUFDQSxlQUFXLENBQVgsR0FBZSxRQUFRLENBQXZCO0FBQ0EsZUFBVyxDQUFYLEdBQWUsR0FBZjs7QUFFQSxRQUFNLFlBQVksa0JBQVEsUUFBUixFQUFrQixRQUFsQixDQUFsQjtBQUNBLGNBQVUsQ0FBVixHQUFjLFFBQVEsQ0FBdEI7QUFDQSxjQUFVLENBQVYsR0FBYyxHQUFkO0FBQ0EsY0FBVSxnQkFBVixDQUEyQixPQUEzQixFQUFvQztBQUFBLGFBQU0seUJBQWUsTUFBZixDQUFzQixhQUF0QixDQUFOO0FBQUEsS0FBcEM7O0FBRUEsVUFBSyxRQUFMLENBQWMsVUFBZCxFQUEwQixTQUExQjs7QUFFQSwwQkFBWSxHQUFaLEdBQWtCLHlCQUFVLENBQVYsQ0FBbEI7QUFDQSxRQUFNLGFBQWEsc0JBQVksTUFBWixDQUFtQixNQUFuQixDQUEwQixJQUFJLHNCQUFZLEdBQTFDLENBQW5CO0FBQ0EsUUFBTSxxQkFBbUIseUJBQVUsV0FBVyxDQUFYLENBQVYsRUFBeUIsV0FBVyxDQUFYLENBQXpCLENBQXpCOztBQUVBLFlBQVEsR0FBUixDQUFZLENBQ1Ysd0JBQWMsR0FBZCxDQUFrQixVQUFsQixFQUE4QixDQUE5QixFQUFpQyxJQUFqQyxDQUFzQztBQUFBLGFBQUssTUFBSyxRQUFMLENBQWMsQ0FBZCxDQUFMO0FBQUEsS0FBdEMsQ0FEVSxFQUVWLElBQUksT0FBSixDQUFZO0FBQUEsYUFBVyxXQUFXLE9BQVgsRUFBb0IsS0FBSyxNQUFMLEtBQWdCLElBQWhCLEdBQXVCLEdBQTNDLENBQVg7QUFBQSxLQUFaLENBRlUsQ0FBWixFQUdHLElBSEgsQ0FHUSxZQUFNO0FBQ1osWUFBSyxJQUFMO0FBQ0EsWUFBSyxXQUFMLENBQWlCLFVBQWpCLEVBQTZCLFNBQTdCO0FBQ0QsS0FORCxFQU1HLEtBTkgsQ0FNUyxhQUFLO0FBQ1osaUJBQVcsSUFBWCxHQUFrQiw0QkFBbEI7QUFDQSxjQUFRLEtBQVIsQ0FBYyxDQUFkO0FBQ0QsS0FURDs7QUFXQSxVQUFLLFVBQUw7QUF0Q3lCO0FBdUMxQjs7Ozs2QkFDUSxNLEVBQVE7QUFDZiw0QkFBWSxRQUFaLEdBQXVCLEtBQXZCO0FBQ0EsNEJBQVksR0FBWixHQUFrQixLQUFsQjtBQUNBLDRCQUFZLE9BQVosR0FBc0IsRUFBdEI7QUFDQSw0QkFBWSxNQUFaLEdBQXFCLE9BQU8sTUFBNUI7QUFDQSw0QkFBWSxZQUFaLEdBQTJCLE9BQU8sT0FBbEM7QUFDQSw0QkFBWSxLQUFaLEdBQW9CLE9BQU8sSUFBM0I7QUFDQSxVQUFJLHNCQUFZLElBQVosQ0FBaUIsRUFBakIsS0FBd0IsT0FBTyxJQUFQLENBQVksRUFBeEMsRUFBNEM7QUFDMUMsOEJBQVksS0FBWixDQUFrQixJQUFsQixHQUF5QixpQkFBekI7QUFDRDtBQUNGOzs7MkJBQ007QUFBQTs7QUFDTCxXQUFLLFVBQUwsR0FBa0IsQ0FBbEI7QUFDQSxXQUFLLElBQUwsR0FBWSxDQUFaO0FBQ0EsV0FBSyxRQUFMLEdBQWdCLENBQWhCOztBQUVBLFdBQUssWUFBTDtBQUNBLFdBQUssU0FBTDs7QUFFQSxVQUFNLFVBQVUsSUFBSSxTQUFTLElBQWIsQ0FBa0IsQ0FBbEIsRUFBcUIsZ0JBQXJCLEVBQXVDLE1BQXZDLENBQWhCO0FBQ0EsY0FBUSxTQUFSLEdBQW9CLFFBQXBCO0FBQ0EsY0FBUSxDQUFSLEdBQVksS0FBSyxLQUFMLEdBQWEsQ0FBekI7QUFDQSxjQUFRLENBQVIsR0FBWSxHQUFaOztBQUVBLFdBQUssUUFBTCxDQUFjLE9BQWQ7O0FBRUEsVUFBTSxXQUFXLFlBQVksWUFBTTtBQUNqQyxnQkFBUSxJQUFSLElBQWdCLENBQWhCO0FBQ0EsWUFBSSxRQUFRLElBQVIsR0FBZSxDQUFuQixFQUFzQjtBQUNwQixpQkFBSyxXQUFMLENBQWlCLE9BQWpCO0FBQ0EsaUJBQUssT0FBTCxHQUFlLElBQWY7QUFDQSx3QkFBYyxRQUFkO0FBQ0Q7QUFDRixPQVBnQixFQU9kLElBUGMsQ0FBakI7O0FBU0EsV0FBSyxJQUFMLEdBQVksS0FBSyxVQUFMLENBQWdCLHNCQUFZLEdBQTVCLEVBQWlDLHNCQUFZLElBQVosQ0FBaUIsSUFBbEQsQ0FBWjtBQUNBLFdBQUssS0FBTCxHQUFhLEtBQUssVUFBTCxDQUFnQixJQUFJLHNCQUFZLEdBQWhDLEVBQXFDLHNCQUFZLEtBQVosQ0FBa0IsSUFBdkQsQ0FBYjtBQUNBLFdBQUssS0FBTCxDQUFXLEtBQVgsR0FBbUIsR0FBbkI7QUFDRDs7OytCQUNVO0FBQ1QsV0FBSyxLQUFMLEdBQWEseUJBQWUsS0FBZixFQUFzQixLQUFLLEtBQTNCLENBQWI7QUFDQSxXQUFLLFVBQUwsR0FBa0IseUJBQWUsVUFBZixFQUEyQixLQUFLLEtBQWhDLENBQWxCO0FBQ0EsV0FBSyxRQUFMLEdBQWdCLHlCQUFlLFFBQWYsRUFBeUIsS0FBSyxLQUE5QixDQUFoQjtBQUNBLFdBQUssS0FBTCxDQUFXLENBQVgsR0FBZSxLQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsR0FBb0IsS0FBSyxRQUFMLENBQWMsQ0FBZCxHQUFrQixLQUFLLE1BQTFEO0FBQ0EsV0FBSyxRQUFMLENBQWMsS0FBSyxLQUFuQixFQUEwQixLQUFLLFVBQS9CLEVBQTJDLEtBQUssUUFBaEQ7QUFDRDs7O21DQUNjO0FBQUE7O0FBQ2IsV0FBSyxNQUFMLEdBQWMsQ0FBQyxxQkFBRCxFQUFjLHFCQUFkLENBQWQ7QUFDQSxXQUFLLE1BQUwsQ0FBWSxDQUFaLEVBQWUsQ0FBZixHQUFtQixDQUFDLEtBQUssTUFBTCxDQUFZLENBQVosRUFBZSxNQUFmLENBQXNCLEtBQXZCLEdBQStCLENBQWxEO0FBQ0EsV0FBSyxNQUFMLENBQVksQ0FBWixFQUFlLENBQWYsR0FBbUIsS0FBSyxLQUFMLEdBQWEsQ0FBaEM7QUFDQSxXQUFLLE1BQUwsQ0FBWSxPQUFaLENBQW9CO0FBQUEsZUFBUyxPQUFLLFVBQUwsQ0FBZ0IsS0FBaEIsQ0FBVDtBQUFBLE9BQXBCO0FBQ0EsV0FBSyxRQUFMLGdDQUFpQixLQUFLLE1BQXRCO0FBQ0Q7OzsrQkFDVSxHLEVBQUssSSxFQUFNO0FBQUE7O0FBQ3BCLFVBQU0sT0FBTyxtQkFBUyxzQkFBWSxRQUFyQixDQUFiO0FBQ0EsV0FBSyxDQUFMLEdBQVMsS0FBSyxLQUFMLEdBQWEsQ0FBYixHQUFpQixNQUFNLEdBQWhDO0FBQ0EsV0FBSyxDQUFMLEdBQVMsTUFBTSxLQUFLLEdBQXBCOztBQUVBLFVBQU0sV0FBVyxJQUFJLFNBQVMsSUFBYixDQUFrQixJQUFsQixFQUF3QixlQUF4QixFQUF5QyxNQUF6QyxDQUFqQjtBQUNBLGVBQVMsU0FBVCxHQUFxQixRQUFyQjtBQUNBLGVBQVMsQ0FBVCxHQUFhLEtBQUssQ0FBTCxHQUFTLEdBQXRCO0FBQ0EsZUFBUyxDQUFULEdBQWEsS0FBSyxDQUFsQjtBQUNBLFdBQUssUUFBTCxDQUFjLElBQWQsRUFBb0IsUUFBcEI7O0FBRUEsZUFBUyxLQUFULENBQWUsR0FBZixDQUFtQixRQUFuQixFQUE2QixJQUE3QixDQUFrQyxJQUFsQyxFQUF3QyxFQUF4QyxDQUEyQyxFQUFFLE9BQU8sQ0FBVCxFQUEzQyxFQUF5RCxHQUF6RCxFQUNHLElBREgsQ0FDUTtBQUFBLGVBQU0sT0FBSyxXQUFMLENBQWlCLFFBQWpCLENBQU47QUFBQSxPQURSOztBQUdBLGFBQU8sSUFBUDtBQUNEOzs7Z0NBQ1c7QUFDVixXQUFLLFdBQUwsR0FBbUIsSUFBSSxTQUFTLElBQWIsQ0FBa0IsS0FBbEIsRUFBeUIsZUFBekIsRUFBMEMsTUFBMUMsQ0FBbkI7QUFDQSxXQUFLLFdBQUwsQ0FBaUIsQ0FBakIsR0FBcUIsRUFBckI7QUFDQSxXQUFLLFdBQUwsQ0FBaUIsQ0FBakIsR0FBcUIsRUFBckI7QUFDQSxXQUFLLFFBQUwsQ0FBYyxLQUFLLFdBQW5CO0FBQ0Q7OzsrQkFDVSxLLEVBQU87QUFDaEIsWUFBTSxDQUFOLElBQVcsS0FBSyxLQUFMLEdBQWEsTUFBTSxNQUFOLENBQWEsS0FBckM7O0FBRUEsVUFBSSxzQkFBWSxNQUFaLENBQW1CLEtBQUssVUFBeEIsQ0FBSixFQUF5QztBQUN2QyxjQUFNLE1BQU4sR0FBZSxzQkFBWSxNQUFaLENBQW1CLEtBQUssVUFBeEIsQ0FBZjtBQUNBLGFBQUssVUFBTCxJQUFtQixDQUFuQjs7QUFFQSxZQUFJLE1BQU0sTUFBTixHQUFlLENBQW5CLEVBQXNCO0FBQ3BCLGdCQUFNLENBQU4sR0FBVSxLQUFLLE1BQUwsR0FBYyxhQUF4QjtBQUNELFNBRkQsTUFFTztBQUNMLGdCQUFNLENBQU4sR0FBVSxDQUFWO0FBQ0Q7QUFDRixPQVRELE1BU087QUFDTCxjQUFNLE1BQU4sR0FBZSxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQUwsS0FBZ0IsR0FBdkIsRUFBNEIsT0FBNUIsQ0FBb0MsQ0FBcEMsQ0FBaEI7QUFDQSxZQUFJLEtBQUssTUFBTCxLQUFnQixHQUFwQixFQUF5QjtBQUN2QixnQkFBTSxDQUFOLEdBQVUsS0FBSyxNQUFMLEdBQWMsYUFBeEI7QUFDRCxTQUZELE1BRU87QUFDTCxnQkFBTSxDQUFOLEdBQVUsQ0FBVjtBQUNBLGdCQUFNLE1BQU4sR0FBZSxDQUFDLE1BQU0sTUFBdEI7QUFDRDtBQUNELDhCQUFZLE1BQVosQ0FBbUIsSUFBbkIsQ0FBd0IsTUFBTSxNQUE5QjtBQUNEO0FBQ0Y7OztpQ0FDWTtBQUFBOztBQUNYLFdBQUssZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0I7QUFBQSxlQUFNLE9BQUssWUFBTCxFQUFOO0FBQUEsT0FBL0I7QUFDQSxXQUFLLFNBQUwsR0FBaUIsYUFBSztBQUNwQixlQUFLLFlBQUw7QUFDQSxVQUFFLGNBQUY7QUFDRCxPQUhEOztBQUtBLGFBQU8sZ0JBQVAsQ0FBd0IsU0FBeEIsRUFBbUMsS0FBSyxTQUF4QztBQUNEOzs7bUNBQ2M7QUFDYixVQUFJLENBQUMsS0FBSyxPQUFWLEVBQW1CO0FBQ2pCO0FBQ0Q7QUFDRCxXQUFLLElBQUwsQ0FBVSxJQUFWO0FBQ0EsNEJBQVksT0FBWixDQUFvQixLQUFLLElBQXpCLElBQWlDLENBQWpDO0FBQ0Q7OztnQ0FDVztBQUNWLFdBQUssVUFBTCxDQUFnQixLQUFLLEtBQXJCO0FBQ0EsV0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixLQUFLLEtBQUwsR0FBYSxHQUE3QjtBQUNBLFdBQUssVUFBTCxDQUFnQixJQUFoQixDQUFxQixLQUFLLEtBQUwsR0FBYSxHQUFsQztBQUNBLFdBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsS0FBSyxLQUF4Qjs7QUFFQSxXQUFLLFFBQUwsSUFBaUIsS0FBSyxLQUF0QjtBQUNBLDRCQUFZLEtBQVosR0FBb0IsS0FBSyxLQUFMLENBQVcsS0FBSyxRQUFMLEdBQWdCLEVBQTNCLENBQXBCO0FBQ0EsV0FBSyxXQUFMLENBQWlCLElBQWpCLEdBQTJCLHNCQUFZLEtBQXZDO0FBQ0Q7OztpQ0FDWTtBQUFBOztBQUNYLFdBQUssTUFBTCxDQUFZLE9BQVosQ0FBb0IsaUJBQVM7QUFDM0IsY0FBTSxDQUFOLElBQVcsT0FBSyxLQUFoQjtBQUNBLFlBQUksTUFBTSxDQUFOLEdBQVUsQ0FBQyxNQUFNLE1BQU4sQ0FBYSxLQUFkLEdBQXNCLENBQXBDLEVBQXVDO0FBQ3JDLGlCQUFLLFVBQUwsQ0FBZ0IsS0FBaEI7QUFDQSxpQkFBSyxLQUFMLElBQWMsSUFBZDtBQUNEO0FBQ0YsT0FORDtBQU9EOzs7NkJBQ1EsSSxFQUFNO0FBQ2IsV0FBSyxJQUFMO0FBQ0EsVUFBSSxLQUFLLENBQUwsR0FBUyxDQUFiLEVBQWdCO0FBQ2QsYUFBSyxFQUFMLEdBQVUsQ0FBVjtBQUNBLGFBQUssQ0FBTCxHQUFTLENBQVQ7QUFDRCxPQUhELE1BR08sSUFBSSxLQUFLLENBQUwsR0FBUyxLQUFLLE1BQUwsR0FBYyxLQUFLLE1BQUwsQ0FBWSxNQUFaLEdBQXFCLENBQWhELEVBQW1EO0FBQ3hELFlBQUksU0FBUyxLQUFLLElBQWxCLEVBQXdCO0FBQ3RCLG1DQUFlLE1BQWYsQ0FBc0IsV0FBdEI7QUFDRCxTQUZELE1BRU87QUFDTCxnQ0FBWSxHQUFaLEdBQWtCLElBQWxCO0FBQ0Q7QUFDRixPQU5NLE1BTUEsSUFBSSxLQUFLLENBQUwsR0FBUyxLQUFLLE1BQUwsSUFBZSxnQkFBZ0IsS0FBSyxNQUFMLENBQVksTUFBWixHQUFxQixDQUFwRCxDQUFiLEVBQXFFO0FBQzFFLGFBQUssR0FBTDtBQUNEO0FBQ0QsVUFBSSxLQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCO0FBQUEsZUFBUyxNQUFNLG1CQUFOLENBQTBCLElBQTFCLEVBQWdDLEtBQWhDLENBQVQ7QUFBQSxPQUFqQixDQUFKLEVBQXVFO0FBQ3JFLGFBQUssR0FBTDtBQUNEO0FBQ0Y7OzsyQkFDTTtBQUNMLFVBQUksQ0FBQyxLQUFLLE9BQVYsRUFBbUI7QUFDakI7QUFDRDtBQUNELFdBQUssU0FBTDtBQUNBLFdBQUssUUFBTCxDQUFjLEtBQUssSUFBbkI7QUFDQSxXQUFLLFFBQUwsQ0FBYyxLQUFLLEtBQW5COztBQUVBLFdBQUssSUFBTCxJQUFhLENBQWI7QUFDQSxVQUFJLHNCQUFZLFlBQVosQ0FBeUIsS0FBSyxJQUE5QixDQUFKLEVBQXlDO0FBQ3ZDLGFBQUssS0FBTCxDQUFXLElBQVg7QUFDRDtBQUNGOzs7OEJBQ1M7QUFDUixhQUFPLG1CQUFQLENBQTJCLFNBQTNCLEVBQXNDLEtBQUssU0FBM0M7QUFDRDs7OztFQS9NcUMsU0FBUyxTOztrQkFBNUIsVTs7Ozs7Ozs7Ozs7QUNackI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQixZOzs7QUFDbkIsd0JBQVksS0FBWixFQUFtQjtBQUFBOztBQUFBOztBQUdqQixVQUFLLEtBQUwsR0FBYSxLQUFiOztBQUVBLFVBQUssRUFBTCxHQUFVLElBQUksU0FBUyxNQUFiLENBQW9CLHdCQUFjLFNBQWQsQ0FBd0IsT0FBeEIsQ0FBcEIsQ0FBVjtBQUNBLFVBQUssR0FBTCxHQUFXLGtCQUFRLEtBQVIsQ0FBWDs7QUFFQSxVQUFLLEtBQUwsR0FBYSxJQUFJLFNBQVMsSUFBYixDQUFrQixTQUFsQixFQUE2QixlQUE3QixFQUE4QyxNQUE5QyxDQUFiO0FBQ0EsVUFBSyxLQUFMLENBQVcsU0FBWCxHQUF1QixRQUF2QjtBQUNBLFVBQUssS0FBTCxDQUFXLENBQVgsR0FBZSxNQUFLLEtBQUwsR0FBYSxDQUE1QjtBQUNBLFVBQUssS0FBTCxDQUFXLENBQVgsR0FBZSxFQUFmOztBQUVBLFVBQUssUUFBTCxDQUFjLE1BQUssRUFBbkIsRUFBdUIsTUFBSyxHQUE1QixFQUFpQyxNQUFLLEtBQXRDOztBQUVBLDRCQUFjLEdBQWQsQ0FBa0IsYUFBbEIsRUFBaUMsQ0FBakM7QUFDRTtBQURGLEtBRUcsSUFGSCxDQUVRLGlCQUZSLEVBR0csSUFISCxDQUdRO0FBQUEsYUFBSyxNQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsQ0FBTDtBQUFBLEtBSFIsRUFJRyxLQUpILENBSVMsWUFBTTtBQUNYLFVBQU0sT0FBTyxJQUFJLFNBQVMsSUFBYixDQUFrQixnQ0FBbEIsRUFBb0QsZUFBcEQsRUFBcUUsTUFBckUsQ0FBYjtBQUNBLFdBQUssU0FBTCxHQUFpQixRQUFqQjtBQUNBLFdBQUssQ0FBTCxHQUFTLE1BQUssS0FBTCxHQUFhLENBQXRCO0FBQ0EsV0FBSyxDQUFMLEdBQVMsR0FBVDtBQUNBLFlBQUssUUFBTCxDQUFjLElBQWQ7QUFDRCxLQVZIO0FBZmlCO0FBMEJsQjs7OzsrQkFDVSxXLEVBQWE7QUFBQTs7QUFDdEIsVUFBSSxTQUFTLEtBQWI7O0FBRUEsa0JBQVksT0FBWixDQUFvQixVQUFDLEVBQUQsRUFBSyxDQUFMLEVBQVc7QUFDN0IsWUFBTSxPQUFPLElBQUksU0FBUyxJQUFiLENBQXFCLElBQUksQ0FBekIsU0FBOEIsR0FBRyxJQUFqQyxTQUF5QyxHQUFHLEtBQTVDLFNBQXVELGVBQXZELEVBQXdFLE1BQXhFLENBQWI7QUFDQSxhQUFLLENBQUwsR0FBUyxNQUFNLElBQUksRUFBbkI7QUFDQSxhQUFLLENBQUwsR0FBUyxHQUFUO0FBQ0EsZUFBSyxRQUFMLENBQWMsSUFBZDs7QUFFQSxZQUFJLEdBQUcsRUFBSCxLQUFVLHNCQUFZLElBQVosQ0FBaUIsRUFBL0IsRUFBbUM7QUFDakMsbUJBQVMsSUFBVDtBQUNBLGVBQUssS0FBTCxHQUFhLFNBQWI7QUFDRDtBQUNGLE9BVkQ7O0FBWUEsVUFBSSxDQUFDLE1BQUwsRUFBYTtBQUNYLFlBQU0sT0FBTyxJQUFJLFNBQVMsSUFBYixRQUF1QixzQkFBWSxJQUFaLENBQWlCLElBQXhDLFNBQWdELHNCQUFZLFFBQTVELFNBQTBFLGVBQTFFLEVBQTJGLFNBQTNGLENBQWI7QUFDQSxhQUFLLENBQUwsR0FBUyxNQUFNLFlBQVksTUFBWixHQUFxQixFQUFwQztBQUNBLGFBQUssQ0FBTCxHQUFTLEdBQVQ7QUFDQSxhQUFLLFFBQUwsQ0FBYyxJQUFkO0FBQ0Q7QUFDRjs7OztFQWpEdUMsU0FBUyxTOztrQkFBOUIsWTs7O0FBb0RyQixTQUFTLGlCQUFULENBQTJCLFdBQTNCLEVBQXdDO0FBQ3RDLE1BQUksWUFBWSxZQUFZLE1BQVosR0FBcUIsQ0FBakMsRUFBb0MsS0FBcEMsR0FBNEMsc0JBQVksUUFBNUQsRUFBc0U7QUFDcEUsUUFBTSxhQUFhLFlBQVksSUFBWixDQUFpQjtBQUFBLGFBQU0sR0FBRyxFQUFILEtBQVUsc0JBQVksSUFBWixDQUFpQixFQUFqQztBQUFBLEtBQWpCLENBQW5COztBQUVBLFFBQUksVUFBSixFQUFnQjtBQUNkLGlCQUFXLEtBQVgsR0FBbUIsc0JBQVksUUFBL0I7QUFDRCxLQUZELE1BRU87QUFDTCxVQUFNLFlBQVk7QUFDaEIsWUFBSSxzQkFBWSxJQUFaLENBQWlCLEVBREw7QUFFaEIsY0FBTSxzQkFBWSxJQUFaLENBQWlCLElBRlA7QUFHaEIsZUFBTyxzQkFBWTtBQUhILE9BQWxCO0FBS0EsVUFBSSxZQUFZLE1BQVosR0FBcUIsRUFBekIsRUFBNkI7QUFDM0Isb0JBQVksSUFBWixDQUFpQixTQUFqQjtBQUNELE9BRkQsTUFFTztBQUNMLG9CQUFZLFlBQVksTUFBWixHQUFxQixDQUFqQyxJQUFzQyxTQUF0QztBQUNEO0FBQ0Y7O0FBRUQsZ0JBQVksSUFBWixDQUFpQixVQUFDLENBQUQsRUFBSSxDQUFKO0FBQUEsYUFBVSxFQUFFLEtBQUYsR0FBVSxFQUFFLEtBQXRCO0FBQUEsS0FBakI7QUFDQSw0QkFBYyxHQUFkLENBQWtCLGFBQWxCLEVBQWlDLFdBQWpDLEVBQThDLENBQTlDO0FBQ0Q7QUFDRCxTQUFPLFdBQVA7QUFDRDs7Ozs7Ozs7Ozs7QUNoRkQ7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQixXOzs7QUFDbkIsdUJBQVksS0FBWixFQUFtQixNQUFuQixFQUEyQjtBQUFBOztBQUFBOztBQUd6QixVQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsVUFBSyxNQUFMLEdBQWMsTUFBZDs7QUFFQSxVQUFLLEVBQUwsR0FBVSxJQUFJLFNBQVMsTUFBYixDQUFvQix3QkFBYyxTQUFkLENBQXdCLE9BQXhCLENBQXBCLENBQVY7QUFDQSxVQUFLLEdBQUwsR0FBVyxrQkFBUSxLQUFSLENBQVg7O0FBRUEsVUFBSyxRQUFMLEdBQWdCLGtCQUFRLFFBQVIsQ0FBaEI7QUFDQSxVQUFLLFFBQUwsQ0FBYyxDQUFkLEdBQWtCLFFBQVEsQ0FBMUI7QUFDQSxVQUFLLFFBQUwsQ0FBYyxDQUFkLEdBQWtCLEdBQWxCOztBQUVBLFVBQUssTUFBTCxHQUFjLGtCQUFRLEtBQVIsQ0FBZDtBQUNBLFVBQUssTUFBTCxDQUFZLENBQVosR0FBZ0IsUUFBUSxDQUF4QjtBQUNBLFVBQUssTUFBTCxDQUFZLENBQVosR0FBZ0IsR0FBaEI7O0FBRUEsVUFBSyxTQUFMLEdBQWlCLGtCQUFRLGFBQVIsRUFBdUIsUUFBdkIsQ0FBakI7QUFDQSxVQUFLLFNBQUwsQ0FBZSxDQUFmLEdBQW1CLFFBQVEsQ0FBM0I7QUFDQSxVQUFLLFNBQUwsQ0FBZSxDQUFmLEdBQW1CLEdBQW5COztBQUVBLFVBQUssSUFBTCxHQUFZLG1CQUFTLFNBQVQsQ0FBWjtBQUNBLFVBQUssSUFBTCxDQUFVLENBQVYsR0FBYyxRQUFRLENBQXRCO0FBQ0EsVUFBSyxJQUFMLENBQVUsQ0FBVixHQUFjLEdBQWQ7O0FBRUEsVUFBSyxRQUFMLENBQWMsTUFBSyxFQUFuQixFQUF1QixNQUFLLEdBQTVCLEVBQWlDLE1BQUssSUFBdEMsRUFBNEMsTUFBSyxRQUFqRCxFQUEyRCxNQUFLLE1BQWhFLEVBQXdFLE1BQUssU0FBN0U7O0FBRUEsUUFBSSxzQkFBWSxRQUFoQixFQUEwQjtBQUN4QixZQUFLLEtBQUwsR0FBYSxJQUFJLFNBQVMsSUFBYixjQUE2QixzQkFBWSxRQUF6QyxTQUF1RCxlQUF2RCxFQUF3RSxNQUF4RSxDQUFiO0FBQ0EsWUFBSyxLQUFMLENBQVcsU0FBWCxHQUF1QixRQUF2QjtBQUNBLFlBQUssS0FBTCxDQUFXLENBQVgsR0FBZSxNQUFLLEtBQUwsR0FBYSxDQUE1QjtBQUNBLFlBQUssS0FBTCxDQUFXLENBQVgsR0FBZSxFQUFmO0FBQ0EsWUFBSyxRQUFMLENBQWMsTUFBSyxLQUFuQjtBQUNEOztBQUVELFVBQUssVUFBTDtBQW5DeUI7QUFvQzFCO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7O2lDQUNhO0FBQ1gsV0FBSyxRQUFMLENBQWMsZ0JBQWQsQ0FBK0IsT0FBL0IsRUFBd0M7QUFBQSxlQUN0Qyx5QkFBZSxNQUFmLENBQXNCLFlBQXRCLENBRHNDO0FBQUEsT0FBeEM7QUFFQSxXQUFLLE1BQUwsQ0FBWSxnQkFBWixDQUE2QixPQUE3QixFQUFzQztBQUFBLGVBQ3BDLHlCQUFlLE1BQWYsQ0FBc0IsV0FBdEIsQ0FEb0M7QUFBQSxPQUF0QztBQUVBLFdBQUssU0FBTCxDQUFlLGdCQUFmLENBQWdDLE9BQWhDLEVBQXlDO0FBQUEsZUFDdkMsd0JBQWMsTUFBZCxFQUR1QztBQUFBLE9BQXpDOztBQUdBLFdBQUssU0FBTCxHQUFpQixhQUFLO0FBQ3BCLFlBQUksRUFBRSxPQUFGLEtBQWMsRUFBbEIsRUFBc0I7QUFDcEIsbUNBQWUsTUFBZixDQUFzQixZQUF0QjtBQUNBLFlBQUUsY0FBRjtBQUNEO0FBQ0YsT0FMRDs7QUFPQSxhQUFPLGdCQUFQLENBQXdCLFNBQXhCLEVBQW1DLEtBQUssU0FBeEM7QUFDRDs7OzhCQUNTO0FBQ1IsYUFBTyxtQkFBUCxDQUEyQixTQUEzQixFQUFzQyxLQUFLLFNBQTNDO0FBQ0Q7Ozs7RUFqR3NDLFNBQVMsUzs7a0JBQTdCLFc7OztBQ1JyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBzY3JlZW5zTWFuYWdlciBmcm9tICcuL21hbmFnZXJzL3NjcmVlbnNNYW5hZ2VyJztcbmltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4vbWFuYWdlcnMvYXNzZXRzTWFuYWdlcic7XG5pbXBvcnQgc2VydmVyTWFuYWdlciBmcm9tICcuL21hbmFnZXJzL3NlcnZlck1hbmFnZXInO1xuaW1wb3J0IHNvdW5kTWFuYWdlciBmcm9tICcuL21hbmFnZXJzL3NvdW5kTWFuYWdlcic7XG5pbXBvcnQgZGF0YU1hbmFnZXIgZnJvbSAnLi9tYW5hZ2Vycy9kYXRhTWFuYWdlcic7XG5cblByb21pc2UuYWxsKFtcbiAgYXNzZXRzTWFuYWdlci5pbml0KCksXG4gIHNlcnZlck1hbmFnZXIuaW5pdCgpLFxuXSlcbiAgLnRoZW4oKCkgPT4gUHJvbWlzZS5hbGwoW1xuICAgIHNlcnZlck1hbmFnZXIuZ2V0VXNlcigpLnRoZW4odXNlciA9PiBkYXRhTWFuYWdlci5zZXQoJ3VzZXInLCB7XG4gICAgICBpZDogdXNlci5pZCxcbiAgICAgIG5hbWU6IGAke3VzZXIuZmlyc3RfbmFtZX0gJHt1c2VyLmxhc3RfbmFtZX1gLFxuICAgICAgc2V4OiB1c2VyLnNleCxcbiAgICB9KSksXG4gICAgc2VydmVyTWFuYWdlci5nZXQoJ21heFNjb3JlJykudGhlbihyID0+IGRhdGFNYW5hZ2VyLnNldCgnbWF4U2NvcmUnLCArcikpLFxuICAgIHNlcnZlck1hbmFnZXIuZ2V0KCdzb3VuZCcpLnRoZW4ociA9PiBzb3VuZE1hbmFnZXIuaW5pdChyID09PSAnJyA/IHRydWUgOiAhIXIpKSxcbiAgXSkpXG4gIC50aGVuKCgpID0+IHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnU3RhcnRTY3JlZW4nKSlcbiAgLmNhdGNoKGUgPT4gY29uc29sZS5lcnJvcignaW5pdCBlcnJvciwgcmVsb2FkIHBhZ2UnLCBlKSk7XG5cbmNvbnN0IHN0YWdlID0gbmV3IGNyZWF0ZWpzLlN0YWdlKCdnYW1lLXN0YWdlJyk7XG5zY3JlZW5zTWFuYWdlci5pbml0KHN0YWdlKTtcblxuaWYgKGNyZWF0ZWpzLlRvdWNoLmlzU3VwcG9ydGVkKCkpIHtcbiAgY3JlYXRlanMuVG91Y2guZW5hYmxlKHN0YWdlLCB0cnVlKTtcbn0gZWxzZSB7XG4gIHN0YWdlLmVuYWJsZU1vdXNlT3ZlcigyMCk7XG59XG5cbmlmICh3aW5kb3cgIT09IHdpbmRvdy5wYXJlbnQpIHtcbiAgLy8gY3JlYXRlanMgc3RhZ2UgY2xpY2sgZG9zbnQgdHJpZ2dlciB3aW5kb3cuZm9jdXNcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gd2luZG93LmZvY3VzKCkpO1xufVxuIiwiaW1wb3J0IGFzc2V0c01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvYXNzZXRzTWFuYWdlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhY2tncm91bmQgZXh0ZW5kcyBjcmVhdGVqcy5TaGFwZSB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGNhbnZhc1dpZHRoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuaW1nID0gYXNzZXRzTWFuYWdlci5nZXRSZXN1bHQobmFtZSk7XG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLmltZy53aWR0aCArIGNhbnZhc1dpZHRoO1xuXG4gICAgdGhpcy5ncmFwaGljcy5iZWdpbkJpdG1hcEZpbGwodGhpcy5pbWcsICdyZXBlYXQteCcpLmRyYXdSZWN0KDAsIDAsIHdpZHRoLCB0aGlzLmltZy5oZWlnaHQpO1xuICAgIHRoaXMucmVnWSA9IHRoaXMuaW1nLmhlaWdodDtcbiAgICB0aGlzLmNhY2hlKDAsIDAsIHdpZHRoLCB0aGlzLmltZy5oZWlnaHQpO1xuICB9XG4gIG1vdmUocGF0aCkge1xuICAgIHRoaXMueCAtPSBwYXRoO1xuICAgIHRoaXMueCAlPSB0aGlzLmltZy53aWR0aDtcbiAgfVxufVxuIiwiaW1wb3J0IGFzc2V0c01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvYXNzZXRzTWFuYWdlcic7XG5pbXBvcnQgc291bmRNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NvdW5kTWFuYWdlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ0biBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKGxhYmVsLCBjb2xvciA9ICdncmVlbicsIHR5cGUgPSAnYnRuJykge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XG5cbiAgICB0aGlzLmNyZWF0ZUJnKHR5cGUpO1xuICAgIHRoaXMuY3JlYXRlTGFiZWwobGFiZWwpO1xuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNvdW5kTWFuYWdlci5wbGF5KCdmbGFwJykpO1xuICB9XG4gIGNyZWF0ZUJnKHR5cGUpIHtcbiAgICB0aGlzLmJnID0gbmV3IGNyZWF0ZWpzLlNwcml0ZShhc3NldHNNYW5hZ2VyLmdldFNwcml0ZVNoZWV0KHR5cGUpKTtcbiAgICB0aGlzLmJnLnJlZ1ggPSB0aGlzLmJnLmdldEJvdW5kcygpLndpZHRoIC8gMjtcbiAgICB0aGlzLmJnLnJlZ1kgPSB0aGlzLmJnLmdldEJvdW5kcygpLmhlaWdodCAvIDI7XG4gICAgdGhpcy5oZWxwZXIgPSBuZXcgY3JlYXRlanMuQnV0dG9uSGVscGVyKHRoaXMuYmcsIGAke3RoaXMuY29sb3J9T3V0YCwgYCR7dGhpcy5jb2xvcn1PdmVyYCwgYCR7dGhpcy5jb2xvcn1Eb3duYCk7XG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmJnKTtcbiAgfVxuICBjcmVhdGVMYWJlbChsYWJlbCkge1xuICAgIHRoaXMubGFiZWwgPSBuZXcgY3JlYXRlanMuVGV4dChsYWJlbCwgJzMwcHggR3VlcmlsbGEnLCAnI2ZmZicpO1xuICAgIHRoaXMubGFiZWwuc2hhZG93ID0gbmV3IGNyZWF0ZWpzLlNoYWRvdygnIzAwMCcsIDAsIDEsIDUpO1xuICAgIHRoaXMubGFiZWwudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgdGhpcy5sYWJlbC50ZXh0QmFzZWxpbmUgPSAnbWlkZGxlJztcbiAgICB0aGlzLmxhYmVsLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMubGFiZWwueSA9IC0zO1xuXG4gICAgLy8gdG9kbyBjYWNoZVxuICAgIC8vIG5vdyBpdCBjYWNoZSBiZWZvcmUgZm9udCBsb2FkIChcbiAgICAvLyBjb25zdCBoID0gdGhpcy5sYWJlbC5nZXRNZWFzdXJlZEhlaWdodCgpICsgNjsgLy8gYWRkIDYgY29zIG9mIHNoYWRvd1xuICAgIC8vIGNvbnN0IHcgPSB0aGlzLmxhYmVsLmdldE1lYXN1cmVkV2lkdGgoKSArIDY7XG4gICAgLy8gdGhpcy5sYWJlbC5jYWNoZSgtdyAvIDIsIC1oIC8gMiwgdywgaCk7XG5cbiAgICB0aGlzLmFkZENoaWxkKHRoaXMubGFiZWwpO1xuICB9XG4gIGRpc2FibGUoKSB7XG4gICAgdGhpcy5iZy5nb3RvQW5kU3RvcCgnZGlzYWJsZScpO1xuICAgIHRoaXMubW91c2VFbmFibGVkID0gZmFsc2U7XG4gIH1cbiAgZW5hYmxlKCkge1xuICAgIHRoaXMuYmcuZ290b0FuZFN0b3AoYCR7dGhpcy5jb2xvcn1PdXRgKTtcbiAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IHRydWU7XG4gIH1cbn1cbiIsImltcG9ydCBzY3JlZW5NYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NjcmVlbnNNYW5hZ2VyJztcbmltcG9ydCBzb3VuZE1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc291bmRNYW5hZ2VyJztcbmltcG9ydCBzZXJ2ZXJNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NlcnZlck1hbmFnZXInO1xuaW1wb3J0IEljb25CdG4gZnJvbSAnLi9JY29uQnRuJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3VpIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3Iod2lkdGgpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuXG4gICAgdGhpcy5tZW51QnRuID0gbmV3IEljb25CdG4oJ21lbnUnKTtcbiAgICB0aGlzLm1lbnVCdG4ueCA9IHRoaXMubWVudUJ0bi5nZXRCb3VuZHMoKS53aWR0aCAvIDIgKyAyMDtcbiAgICB0aGlzLm1lbnVCdG4ueSA9IHRoaXMubWVudUJ0bi5nZXRCb3VuZHMoKS5oZWlnaHQgLyAyICsgMjA7XG5cbiAgICB0aGlzLnJhdGluZ0J0biA9IG5ldyBJY29uQnRuKCdyYXRpbmcnKTtcbiAgICB0aGlzLnJhdGluZ0J0bi54ID0gdGhpcy5yYXRpbmdCdG4uZ2V0Qm91bmRzKCkud2lkdGggKiAzIC8gMiArIDQwO1xuICAgIHRoaXMucmF0aW5nQnRuLnkgPSB0aGlzLnJhdGluZ0J0bi5nZXRCb3VuZHMoKS5oZWlnaHQgLyAyICsgMjA7XG5cbiAgICB0aGlzLnNvdW5kQnRuID0gbmV3IEljb25CdG4oc291bmRNYW5hZ2VyLmlzRW5hYmxlZCgpID8gJ3NvdW5kJyA6ICdzb3VuZE9mZicpO1xuICAgIHRoaXMuc291bmRCdG4ueCA9IHRoaXMud2lkdGggLSB0aGlzLnNvdW5kQnRuLmdldEJvdW5kcygpLndpZHRoIC8gMiAtIDIwO1xuICAgIHRoaXMuc291bmRCdG4ueSA9IHRoaXMuc291bmRCdG4uZ2V0Qm91bmRzKCkuaGVpZ2h0IC8gMiArIDIwO1xuXG4gICAgLy8gdG9kbzogZml4IHNwcml0ZXNoZWV0IGxhdGVyXG4gICAgdGhpcy5yYXRpbmdCdG4ubGFiZWwueCA9IHRoaXMuc291bmRCdG4ubGFiZWwueCA9IDE7XG5cbiAgICB0aGlzLmFkZENoaWxkKHRoaXMubWVudUJ0biwgdGhpcy5yYXRpbmdCdG4sIHRoaXMuc291bmRCdG4pO1xuXG4gICAgdGhpcy5zb3VuZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHNvdW5kTWFuYWdlci50b2dnbGUoKTtcbiAgICAgIHRoaXMuc291bmRCdG4uY2hhbmdlTGFiZWwoc291bmRNYW5hZ2VyLmlzRW5hYmxlZCgpID8gJ3NvdW5kJyA6ICdzb3VuZE9mZicpO1xuICAgICAgc2VydmVyTWFuYWdlci5zZXQoJ3NvdW5kJywgc291bmRNYW5hZ2VyLmlzRW5hYmxlZCgpKTtcbiAgICB9KTtcblxuICAgIHRoaXMubWVudUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNjcmVlbk1hbmFnZXIuY2hhbmdlKCdTdGFydFNjcmVlbicpKTtcbiAgICB0aGlzLnJhdGluZ0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNjcmVlbk1hbmFnZXIuY2hhbmdlKCdSYXRpbmdTY3JlZW4nKSk7XG4gIH1cbn1cbiIsImltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuaW1wb3J0IHNvdW5kTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zb3VuZE1hbmFnZXInO1xuXG5jb25zdCBDT05GSUcgPSB7XG4gIEc6IDAuMTYsXG4gIEE6IDcsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZXJvIGV4dGVuZHMgY3JlYXRlanMuU3ByaXRlIHtcbiAgY29uc3RydWN0b3IodHlwZSkge1xuICAgIHN1cGVyKGFzc2V0c01hbmFnZXIuZ2V0U3ByaXRlU2hlZXQodHlwZSkpO1xuXG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCk7XG4gICAgdGhpcy5yZWdYID0gdGhpcy5ib3VuZHMud2lkdGggLyAyO1xuICAgIHRoaXMucmVnWSA9IHRoaXMuYm91bmRzLmhlaWdodCAvIDI7XG5cbiAgICB0aGlzLmRlYWQgPSBmYWxzZTtcbiAgICB0aGlzLnZZID0gMDtcbiAgfVxuICBmbGFwKCkge1xuICAgIGlmICh0aGlzLmRlYWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy52WSA9IE1hdGgubWF4KHRoaXMudlkgLSBDT05GSUcuQSwgLUNPTkZJRy5BKTtcbiAgICB0aGlzLmdvdG9BbmRQbGF5KCdmbGFwJyk7XG4gICAgc291bmRNYW5hZ2VyLnBsYXkoJ2ZsYXAnKTtcbiAgfVxuICBtb3ZlKCkge1xuICAgIHRoaXMudlkgKz0gQ09ORklHLkc7XG4gICAgdGhpcy55ICs9IHRoaXMudlk7XG4gIH1cbiAgZGllKCkge1xuICAgIGlmICh0aGlzLmRlYWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5kZWFkID0gdHJ1ZTtcbiAgICB0aGlzLnJvdGF0aW9uID0gMzA7XG4gICAgdGhpcy5nb3RvQW5kU3RvcCgnZGVhZCcpO1xuICAgIHNvdW5kTWFuYWdlci5wbGF5KCdsb29zZScpO1xuICB9XG59XG4iLCJpbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcbmltcG9ydCBCdG4gZnJvbSAnLi9CdG4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJY29uQnRuIGV4dGVuZHMgQnRuIHtcbiAgY29uc3RydWN0b3IobGFiZWwsIGNvbG9yID0gJ29yYW5nZScpIHtcbiAgICBzdXBlcihsYWJlbCwgY29sb3IsICdpY29uQnRuJyk7XG4gIH1cbiAgY3JlYXRlTGFiZWwobGFiZWwpIHtcbiAgICB0aGlzLmxhYmVsID0gbmV3IGNyZWF0ZWpzLlNwcml0ZShhc3NldHNNYW5hZ2VyLmdldFNwcml0ZVNoZWV0KCdpY29uJyksIGxhYmVsKTtcbiAgICB0aGlzLmxhYmVsLnJlZ1ggPSB0aGlzLmxhYmVsLmdldEJvdW5kcygpLndpZHRoIC8gMjtcbiAgICB0aGlzLmxhYmVsLnJlZ1kgPSB0aGlzLmxhYmVsLmdldEJvdW5kcygpLmhlaWdodCAvIDI7XG4gICAgdGhpcy5sYWJlbC5tb3VzZUVuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMubGFiZWwpO1xuICB9XG4gIGNoYW5nZUxhYmVsKGxhYmVsKSB7XG4gICAgdGhpcy5sYWJlbC5nb3RvQW5kU3RvcChsYWJlbCk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoYWRvd092ZXJsYXkgZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc2hhZG93ID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XG4gICAgdGhpcy5zaGFkb3cuZ3JhcGhpY3MuYmVnaW5GaWxsKCdyZ2JhKDAsIDAsIDAsIDAuNiknKS5kcmF3UmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgIHRoaXMuc2hhZG93VGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KCcnLCAnMjVweCBHdWVyaWxsYScsICcjZmZmJyk7XG4gICAgdGhpcy5zaGFkb3dUZXh0LnkgPSBoZWlnaHQgLyAyO1xuICAgIHRoaXMuc2hhZG93VGV4dC54ID0gd2lkdGggLyAyO1xuICAgIHRoaXMuc2hhZG93VGV4dC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICB0aGlzLnNoYWRvd1RleHQudGV4dEJhc2VsaW5lID0gJ21pZGRsZSc7XG5cbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuc2hhZG93LCB0aGlzLnNoYWRvd1RleHQpO1xuICAgIC8vIHRvZG9cbiAgICAvLyB0aGlzLmNhY2hlKDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICB9XG4gIHNldFRleHQodGV4dCkge1xuICAgIHRoaXMuc2hhZG93VGV4dC50ZXh0ID0gdGV4dDtcbiAgICAvLyB0aGlzLnVwZGF0ZUNhY2hlKCk7XG4gIH1cbn1cbiIsImltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGlrZSBleHRlbmRzIGNyZWF0ZWpzLkJpdG1hcCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKGFzc2V0c01hbmFnZXIuZ2V0UmVzdWx0KCdzcGlrZScpKTtcblxuICAgIHRoaXMuYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKTtcbiAgICB0aGlzLnJlZ1ggPSB0aGlzLmJvdW5kcy53aWR0aCAvIDI7XG4gICAgdGhpcy5yZWdZID0gdGhpcy5ib3VuZHMuaGVpZ2h0O1xuICB9XG59XG4iLCJjb25zdCBtYW5pZmVzdCA9IFtcbiAgeyBpZDogJ21vbnN0ZXInLCBzcmM6ICdpbWcvbW9uc3Rlci1zcHJpdGUucG5nJyB9LFxuICAvLyB7IGlkOiAnYmlyZCcsIHNyYzogJ2ltZy9iaXJkLXNwcml0ZS5wbmcnIH0sXG4gIC8vIHsgaWQ6ICdjaGlja2VuJywgc3JjOiAnaW1nL2NoaWNrZW4tc3ByaXRlLnBuZycgfSxcbiAgeyBpZDogJ3NwaWtlJywgc3JjOiAnaW1nL3NwaWtlLnBuZycgfSxcbiAgeyBpZDogJ3NreScsIHNyYzogJ2ltZy9iZy9za3kucG5nJyB9LFxuICB7IGlkOiAnc3RhcnQnLCBzcmM6ICdpbWcvYmcvc3RhcnQucG5nJyB9LFxuICB7IGlkOiAnbW91bnRhaW4nLCBzcmM6ICdpbWcvYmcvbW91bnRhaW4ucG5nJyB9LFxuICB7IGlkOiAnZ3JvdW5kJywgc3JjOiAnaW1nL2JnL2dyb3VuZC5wbmcnIH0sXG4gIHsgaWQ6ICdidG4nLCBzcmM6ICdpbWcvYnRuLXNwcml0ZS5wbmcnIH0sXG4gIHsgaWQ6ICdpY29uLWJ0bicsIHNyYzogJ2ltZy9pY29uLWJ0bi1zcHJpdGUucG5nJyB9LFxuICB7IGlkOiAnaWNvbicsIHNyYzogJ2ltZy9pY29uLXNwcml0ZS5wbmcnIH0sXG4gIHsgaWQ6ICdiYWNrJywgc3JjOiAnc291bmQvYmFja2dyb3VuZC5vZ2cnIH0sXG4gIHsgaWQ6ICdmbGFwJywgc3JjOiAnc291bmQvZmxhcC5vZ2cnIH0sXG4gIHsgaWQ6ICdsb29zZScsIHNyYzogJ3NvdW5kL2xvb3NlLm9nZycgfSxcbl07XG5cbmNvbnN0IGdldEhlcm9TcHJpdGVTaGVldERhdGEgPSBuYW1lID0+ICh7XG4gIGltYWdlczogW25hbWVdLFxuICBmcmFtZXM6IHsgd2lkdGg6IDEwMCwgaGVpZ2h0OiA3OCB9LFxuICBhbmltYXRpb25zOiB7XG4gICAgZmx5OiAwLFxuICAgIGZsYXA6IFsxLCAzLCAnZmx5J10sXG4gICAgZGVhZDogNCxcbiAgfSxcbn0pO1xuXG5jb25zdCBzcHJpdGVTaGVldHNEYXRhID0ge1xuICBiaXJkOiBnZXRIZXJvU3ByaXRlU2hlZXREYXRhKCdiaXJkJyksXG4gIG1vbnN0ZXI6IGdldEhlcm9TcHJpdGVTaGVldERhdGEoJ21vbnN0ZXInKSxcbiAgY2hpY2tlbjogZ2V0SGVyb1Nwcml0ZVNoZWV0RGF0YSgnY2hpY2tlbicpLFxuICBidG46IHtcbiAgICBpbWFnZXM6IFsnYnRuJ10sXG4gICAgZnJhbWVzOiB7IHdpZHRoOiAyMTAsIGhlaWdodDogNjksIHNwYWNpbmc6IDIgfSxcbiAgICBhbmltYXRpb25zOiB7XG4gICAgICBncmVlbk91dDogMCxcbiAgICAgIGdyZWVuT3ZlcjogMixcbiAgICAgIGdyZWVuRG93bjogNCxcbiAgICAgIG9yYW5nZU91dDogNixcbiAgICAgIG9yYW5nZU92ZXI6IDgsXG4gICAgICBvcmFuZ2VEb3duOiAxLFxuICAgICAgcmVkT3V0OiAzLFxuICAgICAgcmVkT3ZlcjogNSxcbiAgICAgIHJlZERvd246IDcsXG4gICAgICBkaXNhYmxlOiA5LFxuICAgIH0sXG4gIH0sXG4gIGljb25CdG46IHtcbiAgICBpbWFnZXM6IFsnaWNvbi1idG4nXSxcbiAgICBmcmFtZXM6IHsgd2lkdGg6IDY5LCBoZWlnaHQ6IDcxLCBzcGFjaW5nOiAyIH0sXG4gICAgYW5pbWF0aW9uczoge1xuICAgICAgZ3JlZW5PdXQ6IDAsXG4gICAgICBncmVlbk92ZXI6IDEsXG4gICAgICBncmVlbkRvd246IDIsXG4gICAgICBvcmFuZ2VPdXQ6IDMsXG4gICAgICBvcmFuZ2VPdmVyOiA0LFxuICAgICAgb3JhbmdlRG93bjogNSxcbiAgICAgIHJlZE91dDogOCxcbiAgICAgIHJlZE92ZXI6IDcsXG4gICAgICByZWREb3duOiA2LFxuICAgICAgZGlzYWJsZTogOSxcbiAgICB9LFxuICB9LFxuICBpY29uOiB7XG4gICAgaW1hZ2VzOiBbJ2ljb24nXSxcbiAgICBmcmFtZXM6IHsgd2lkdGg6IDQwLCBoZWlnaHQ6IDQwIH0sXG4gICAgYW5pbWF0aW9uczoge1xuICAgICAgc291bmQ6IDAsXG4gICAgICBzb3VuZE9mZjogMSxcbiAgICAgIHJhdGluZzogMixcbiAgICAgIG1lbnU6IDMsXG4gICAgfSxcbiAgfSxcbn07XG5cbmNvbnN0IHNwcml0ZVNoZWV0cyA9IHt9O1xuXG5jb25zdCBhc3NldHNNYW5hZ2VyID0ge1xuICBpbml0KCkge1xuICAgIGNyZWF0ZWpzLlNvdW5kLmFsdGVybmF0ZUV4dGVuc2lvbnMgPSBbJ21wMyddO1xuICAgIHRoaXMucXVldWUgPSBuZXcgY3JlYXRlanMuTG9hZFF1ZXVlKCk7XG4gICAgdGhpcy5xdWV1ZS5pbnN0YWxsUGx1Z2luKGNyZWF0ZWpzLlNvdW5kKTtcbiAgICB0aGlzLnF1ZXVlLmxvYWRNYW5pZmVzdChtYW5pZmVzdCk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5xdWV1ZS5hZGRFdmVudExpc3RlbmVyKCdjb21wbGV0ZScsICgpID0+IHJlc29sdmUoKSk7XG4gICAgICB0aGlzLnF1ZXVlLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKCkgPT4gcmVqZWN0KCkpO1xuICAgIH0pO1xuICB9LFxuICBnZXRSZXN1bHQobmFtZSkge1xuICAgIHJldHVybiB0aGlzLnF1ZXVlLmdldFJlc3VsdChuYW1lKTtcbiAgfSxcbiAgZ2V0U3ByaXRlU2hlZXQobmFtZSkge1xuICAgIGlmICghc3ByaXRlU2hlZXRzW25hbWVdKSB7XG4gICAgICBjb25zdCBkYXRhID0gc3ByaXRlU2hlZXRzRGF0YVtuYW1lXTtcblxuICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBzcHJpdGVTaGVldCBuYW1lJyk7XG4gICAgICB9XG5cbiAgICAgIGRhdGEuaW1hZ2VzID0gZGF0YS5pbWFnZXMubWFwKGltZyA9PiB0aGlzLmdldFJlc3VsdChpbWcpKTtcbiAgICAgIHNwcml0ZVNoZWV0c1tuYW1lXSA9IG5ldyBjcmVhdGVqcy5TcHJpdGVTaGVldChkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3ByaXRlU2hlZXRzW25hbWVdO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgYXNzZXRzTWFuYWdlcjtcbiIsImNvbnN0IGRhdGFNYW5hZ2VyID0ge1xuICBnYW1lVHlwZTogbnVsbCxcbiAgc2NvcmU6IG51bGwsXG4gIG1heFNjb3JlOiBudWxsLFxuICBoZXJvVHlwZTogJ21vbnN0ZXInLFxuICBwb3M6IG51bGwsXG4gIHdpbjogbnVsbCxcbiAgc3Bpa2VzOiBudWxsLFxuICBhY3Rpb25zOiBudWxsLFxuICBlbmVteUFjdGlvbnM6IG51bGwsXG4gIHVzZXI6IHtcbiAgICBpZDogbnVsbCxcbiAgICBuYW1lOiBudWxsLFxuICAgIHNleDogbnVsbCxcbiAgfSxcbiAgZW5lbXk6IG51bGwsXG4gIGZpZWxkczoge1xuICAgIG5vcm1hbDogW1swLCA0OV0sIFsxMDAsIDE0OV1dLFxuICB9LFxuICBzZXQoa2V5LCB2YWx1ZSkge1xuICAgIHRoaXNba2V5XSA9IHZhbHVlO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGF0YU1hbmFnZXI7XG4iLCJpbXBvcnQgU3RhcnRTY3JlZW4gZnJvbSAnLi4vc2NyZWVucy9TdGFydFNjcmVlbic7XG5pbXBvcnQgTWFpblNjcmVlbiBmcm9tICcuLi9zY3JlZW5zL01haW5TY3JlZW4nO1xuaW1wb3J0IFBWUFNjcmVlbiBmcm9tICcuLi9zY3JlZW5zL1BWUFNjcmVlbic7XG5pbXBvcnQgRW5kU2NyZWVuIGZyb20gJy4uL3NjcmVlbnMvRW5kU2NyZWVuJztcbmltcG9ydCBSYXRpbmdTY3JlZW4gZnJvbSAnLi4vc2NyZWVucy9SYXRpbmdTY3JlZW4nO1xuXG5jb25zdCBzY3JlZW5NYW5hZ2VyID0ge1xuICBpbml0KHN0YWdlKSB7XG4gICAgdGhpcy5zdGFnZSA9IHN0YWdlO1xuICAgIHRoaXMuY3VycmVudFNjcmVlbiA9IG51bGw7XG4gICAgdGhpcy5zY3JlZW5zID0ge1xuICAgICAgU3RhcnRTY3JlZW4sXG4gICAgICBNYWluU2NyZWVuLFxuICAgICAgUFZQU2NyZWVuLFxuICAgICAgRW5kU2NyZWVuLFxuICAgICAgUmF0aW5nU2NyZWVuLFxuICAgIH07XG5cbiAgICBjcmVhdGVqcy5UaWNrZXIudGltaW5nTW9kZSA9IGNyZWF0ZWpzLlRpY2tlci5SQUY7XG4gICAgY3JlYXRlanMuVGlja2VyLmFkZEV2ZW50TGlzdGVuZXIoJ3RpY2snLCBlID0+IHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRTY3JlZW4gJiYgdGhpcy5jdXJyZW50U2NyZWVuLnRpY2spIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U2NyZWVuLnRpY2soZSk7XG4gICAgICB9XG4gICAgICB0aGlzLnN0YWdlLnVwZGF0ZShlKTtcbiAgICB9KTtcbiAgfSxcbiAgY2hhbmdlKG5hbWUpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50U2NyZWVuKSB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50U2NyZWVuLmRlc3Ryb3kpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U2NyZWVuLmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5jdXJyZW50U2NyZWVuKTtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50U2NyZWVuID0gbmV3IHRoaXMuc2NyZWVuc1tuYW1lXSh0aGlzLnN0YWdlLmNhbnZhcy53aWR0aCwgdGhpcy5zdGFnZS5jYW52YXMuaGVpZ2h0KTtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuY3VycmVudFNjcmVlbik7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBzY3JlZW5NYW5hZ2VyO1xuIiwiY29uc3Qgc2VydmVyTWFuYWdlciA9IHtcbiAgaW5pdCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gVksuaW5pdChcbiAgICAgICgpID0+IHJlc29sdmUoKSxcbiAgICAgIGUgPT4gcmVqZWN0KCd2ayBpbml0IGVycm9yJywgZSksXG4gICAgJzUuNjAnKSk7XG4gIH0sXG4gIGdldFVzZXIoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIFZLLmFwaSgndXNlcnMuZ2V0JywgeyBmaWVsZHM6ICdzZXgnIH0sIHIgPT4ge1xuICAgICAgICBpZiAoci5lcnJvcikge1xuICAgICAgICAgIHJlamVjdChyLmVycm9yKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZShyLnJlc3BvbnNlWzBdKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXQoa2V5LCBnbG9iYWwgPSAwKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gVksuYXBpKCdzdG9yYWdlLmdldCcsIHsga2V5LCBnbG9iYWwgfSwgcmVzb2x2ZSkpXG4gICAgICAudGhlbihyID0+IHtcbiAgICAgICAgaWYgKHIuZXJyb3IpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Ioci5lcnJvcik7XG4gICAgICAgIH0gZWxzZSBpZiAoci5yZXNwb25zZSA9PT0gJycpIHtcbiAgICAgICAgICAvLyBjYW50IEpTT04ucGFyc2UgZW1wdHkgc3RyaW5nIGJ1dCBuZWVkIHRvIGdldCBkZWZhdWx0IHZhbHVlXG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHIucmVzcG9uc2UpO1xuICAgICAgfSk7XG4gIH0sXG4gIHNldChrZXksIHZhbHVlLCBnbG9iYWwgPSAwKSB7XG4gICAgVksuYXBpKCdzdG9yYWdlLnNldCcsIHsga2V5LCB2YWx1ZTogSlNPTi5zdHJpbmdpZnkodmFsdWUpLCBnbG9iYWwgfSk7XG4gIH0sXG4gIHNoYXJlKHNjb3JlLCBzZXggPSAyKSB7XG4gICAgVksuYXBpKCd3YWxsLnBvc3QnLCB7XG4gICAgICBtZXNzYWdlOiBg0K8g0L/RgNC+0LvQtdGC0LXQuyR7c2V4ICE9PSAyID8gJ9CwJyA6ICcnfSAke3Njb3JlfSDQvCDQsiDQuNCz0YDQtSBGbGFwcHkgTW9uc3RlciFcbiAgICAgICAgICAgICAgICBBINGB0LrQvtC70YzQutC+INGB0LzQvtC20LXRiNGMINGC0Ys/YCxcbiAgICAgIGF0dGFjaG1lbnRzOiAncGhvdG8tMTM1NTYzMzg4XzQ1NjIzOTAxNywgaHR0cHM6Ly92ay5jb20vYXBwNTc4MjExOCcsXG4gICAgICBzZXJ2aWNlczogJ3R3aXR0ZXInLFxuICAgIH0pO1xuICB9LFxuICBpbnZpdGUoKSB7XG4gICAgVksuY2FsbE1ldGhvZCgnc2hvd0ludml0ZUJveCcpO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgc2VydmVyTWFuYWdlcjtcbiIsImNvbnN0IHNvdW5kTWFuYWdlciA9IHtcbiAgaW5pdChlbmFibGUpIHtcbiAgICB0aGlzLmVuYWJsZWQgPSBlbmFibGU7XG4gICAgdGhpcy5iZyA9IGNyZWF0ZWpzLlNvdW5kLnBsYXkoJ2JhY2snLCB7IGxvb3A6IC0xLCB2b2x1bWU6IDAuMyB9KTtcbiAgICB0aGlzLmJnLnBhdXNlZCA9ICF0aGlzLmVuYWJsZWQ7XG4gICAgLy8gc29tZXRpbWVzIG5lZ2F0aXZlIHZhbHVlIG9jY3VycyBhbmQgdGhyb3cgZXJyb3JcbiAgICB0aGlzLmJnLnBvc2l0aW9uID0gMDtcbiAgfSxcbiAgdG9nZ2xlKCkge1xuICAgIHRoaXMuZW5hYmxlZCA9ICF0aGlzLmVuYWJsZWQ7XG4gICAgdGhpcy5iZy5wYXVzZWQgPSAhdGhpcy5lbmFibGVkO1xuICB9LFxuICBpc0VuYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZW5hYmxlZDtcbiAgfSxcbiAgcGxheShzb3VuZCkge1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgIGNyZWF0ZWpzLlNvdW5kLnBsYXkoc291bmQpO1xuICAgIH1cbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNvdW5kTWFuYWdlcjtcbiIsImltcG9ydCByYW5kb21JbnQgZnJvbSAncmFuZG9tLWludCc7XG5pbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcbmltcG9ydCBzY3JlZW5zTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zY3JlZW5zTWFuYWdlcic7XG5pbXBvcnQgc2VydmVyTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zZXJ2ZXJNYW5hZ2VyJztcbmltcG9ydCBkYXRhTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9kYXRhTWFuYWdlcic7XG5pbXBvcnQgR3VpIGZyb20gJy4uL2Rpc3BsYXkvR3VpJztcbmltcG9ydCBCdG4gZnJvbSAnLi4vZGlzcGxheS9CdG4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbmRTY3JlZW4gZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuICBjb25zdHJ1Y3Rvcih3aWR0aCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmJnID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChhc3NldHNNYW5hZ2VyLmdldFJlc3VsdCgnc3RhcnQnKSk7XG4gICAgdGhpcy5ndWkgPSBuZXcgR3VpKHdpZHRoKTtcblxuICAgIHRoaXMubWF4U2NvcmUgPSBuZXcgY3JlYXRlanMuVGV4dChg0KDQtdC60L7RgNC0OiAke2RhdGFNYW5hZ2VyLm1heFNjb3JlfSDQvGAsICcyNXB4IEd1ZXJpbGxhJywgJyMwMDAnKTtcbiAgICB0aGlzLm1heFNjb3JlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRoaXMubWF4U2NvcmUueCA9IHdpZHRoIC8gMjtcbiAgICB0aGlzLm1heFNjb3JlLnkgPSA0MDtcblxuICAgIHRoaXMuc2NvcmUgPSBuZXcgY3JlYXRlanMuVGV4dChg0KDQtdC30YPQu9GM0YLQsNGCOiAke2RhdGFNYW5hZ2VyLnNjb3JlfSDQvGAsICc0MHB4IEd1ZXJpbGxhJywgJyMwMDAnKTtcbiAgICB0aGlzLnNjb3JlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRoaXMuc2NvcmUueCA9IHdpZHRoIC8gMjtcbiAgICB0aGlzLnNjb3JlLnkgPSAxNTA7XG5cbiAgICB0aGlzLnJlcGxheUJ0biA9IG5ldyBCdG4oJ9CV0YnQtSDRgNCw0LcnKTtcbiAgICB0aGlzLnJlcGxheUJ0bi54ID0gd2lkdGggLyAyO1xuICAgIHRoaXMucmVwbGF5QnRuLnkgPSAzNTA7XG5cbiAgICB0aGlzLnNoYXJlQnRuID0gbmV3IEJ0bign0J/QvtC00LXQu9C40YLRjNGB0Y8nLCAnb3JhbmdlJyk7XG4gICAgdGhpcy5zaGFyZUJ0bi54ID0gd2lkdGggLyAyO1xuICAgIHRoaXMuc2hhcmVCdG4ueSA9IDQ0MDtcblxuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5iZywgdGhpcy5ndWksIHRoaXMubWF4U2NvcmUsIHRoaXMuc2NvcmUsIHRoaXMucmVwbGF5QnRuLCB0aGlzLnNoYXJlQnRuKTtcblxuICAgIGlmIChkYXRhTWFuYWdlci5zY29yZSA+IGRhdGFNYW5hZ2VyLm1heFNjb3JlKSB7XG4gICAgICB0aGlzLm1heFNjb3JlLnRleHQgPSBg0J/RgNC+0YjQu9GL0Lkg0YDQtdC60L7RgNC0OiAke2RhdGFNYW5hZ2VyLm1heFNjb3JlfSDQvGA7XG4gICAgICBkYXRhTWFuYWdlci5tYXhTY29yZSA9IGRhdGFNYW5hZ2VyLnNjb3JlO1xuICAgICAgc2VydmVyTWFuYWdlci5zZXQoJ21heFNjb3JlJywgZGF0YU1hbmFnZXIubWF4U2NvcmUpO1xuICAgICAgdGhpcy5zY29yZS50ZXh0ID0gYNCd0L7QstGL0Lkg0YDQtdC60L7RgNC0OiAke2RhdGFNYW5hZ2VyLm1heFNjb3JlfSDQvCFgO1xuXG4gICAgICBzZXJ2ZXJNYW5hZ2VyLmdldCgncmF0aW5nVGFibGUnLCAxKS50aGVuKHJlY2FsY1JhdGluZ1RhYmxlKTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YU1hbmFnZXIuZ2FtZVR5cGUgPT09ICdwdnAnKSB7XG4gICAgICBjb25zdCBlbmVteSA9IGRhdGFNYW5hZ2VyLmVuZW15O1xuICAgICAgdGhpcy5wdnBUZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoJycsICcyNXB4IEd1ZXJpbGxhJywgJyMwMDAnKTtcbiAgICAgIHRoaXMucHZwVGV4dC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgIHRoaXMucHZwVGV4dC54ID0gd2lkdGggLyAyO1xuICAgICAgdGhpcy5wdnBUZXh0LnkgPSAyMzA7XG4gICAgICB0aGlzLmFkZENoaWxkKHRoaXMucHZwVGV4dCk7XG5cbiAgICAgIGlmIChkYXRhTWFuYWdlci53aW4pIHtcbiAgICAgICAgdGhpcy5wdnBUZXh0LnRleHQgKz0gYCR7ZW5lbXkubmFtZX0g0LHRi9C7JHtlbmVteS5zZXggIT09IDIgPyAn0LAnIDogJyd9INC/0L7QstC10YDQttC10L0ke2VuZW15LnNleCAhPT0gMiA/ICfQsCcgOiAnJ31gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wdnBUZXh0LnRleHQgKz0gYCR7ZW5lbXkubmFtZX0g0L/QvtCy0LXRgNCzJHtlbmVteS5zZXggIT09IDIgPyAn0LvQsCcgOiAnJ30g0JLQsNGBYDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCByYW5nZSA9IGRhdGFNYW5hZ2VyLmZpZWxkcy5ub3JtYWxbZGF0YU1hbmFnZXIucG9zXTtcbiAgICBjb25zdCBmaWVsZCA9IGBwdnAke3JhbmRvbUludChyYW5nZVswXSwgcmFuZ2VbMV0pfWA7XG4gICAgY29uc3QgcmVjb3JkID0ge1xuICAgICAgdXNlcjogZGF0YU1hbmFnZXIudXNlcixcbiAgICAgIHNwaWtlczogZGF0YU1hbmFnZXIuc3Bpa2VzLFxuICAgICAgYWN0aW9uczogZGF0YU1hbmFnZXIuYWN0aW9ucyxcbiAgICB9O1xuXG4gICAgc2VydmVyTWFuYWdlci5nZXQoZmllbGQsIDEpLnRoZW4ociA9PiB7XG4gICAgICBjb25zb2xlLndhcm4oZmllbGQpO1xuICAgICAgY29uc29sZS53YXJuKHJlY29yZCk7XG4gICAgICBjb25zb2xlLndhcm4ocik7XG4gICAgICBjb25zb2xlLndhcm4oci5zcGlrZXMubGVuZ3RoICogMC41IDwgcmVjb3JkLnNwaWtlcy5sZW5ndGgpO1xuICAgICAgaWYgKHIuc3Bpa2VzLmxlbmd0aCAqIDAuNSA8IHJlY29yZC5zcGlrZXMubGVuZ3RoICYmXG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkocmVjb3JkKS5sZW5ndGggPCA0MDk2KSB7XG4gICAgICAgIHNlcnZlck1hbmFnZXIuc2V0KGZpZWxkLCByZWNvcmQsIDEpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gIH1cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLnJlcGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlcGxheSk7XG4gICAgdGhpcy5zaGFyZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNlcnZlck1hbmFnZXIuc2hhcmUoZGF0YU1hbmFnZXIuc2NvcmUsIGRhdGFNYW5hZ2VyLnVzZXIuc2V4KSk7XG5cbiAgICB0aGlzLm9uS2V5RG93biA9IGUgPT4ge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMzIpIHtcbiAgICAgICAgcmVwbGF5KCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd24pO1xuICB9XG4gIGRlc3Ryb3koKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bik7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVwbGF5KCkge1xuICBzd2l0Y2ggKGRhdGFNYW5hZ2VyLmdhbWVUeXBlKSB7XG4gICAgY2FzZSAnc2luZ2xlJzpcbiAgICAgIHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnTWFpblNjcmVlbicpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncHZwJzpcbiAgICAgIHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnUFZQU2NyZWVuJyk7XG4gICAgICBicmVhaztcbiAgfVxufVxuXG5mdW5jdGlvbiByZWNhbGNSYXRpbmdUYWJsZShyYXRpbmdUYWJsZSkge1xuICBpZiAocmF0aW5nVGFibGVbcmF0aW5nVGFibGUubGVuZ3RoIC0gMV0uc2NvcmUgPj0gZGF0YU1hbmFnZXIubWF4U2NvcmUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCB1c2VyUmF0aW5nID0gcmF0aW5nVGFibGUuZmluZChlbCA9PiBlbC5pZCA9PT0gZGF0YU1hbmFnZXIudXNlci5pZCk7XG5cbiAgaWYgKHVzZXJSYXRpbmcpIHtcbiAgICB1c2VyUmF0aW5nLnNjb3JlID0gZGF0YU1hbmFnZXIubWF4U2NvcmU7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgbmV3UmF0aW5nID0ge1xuICAgICAgaWQ6IGRhdGFNYW5hZ2VyLnVzZXIuaWQsXG4gICAgICBuYW1lOiBkYXRhTWFuYWdlci51c2VyLm5hbWUsXG4gICAgICBzY29yZTogZGF0YU1hbmFnZXIubWF4U2NvcmUsXG4gICAgfTtcbiAgICBpZiAocmF0aW5nVGFibGUubGVuZ3RoIDwgMTApIHtcbiAgICAgIHJhdGluZ1RhYmxlLnB1c2gobmV3UmF0aW5nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmF0aW5nVGFibGVbcmF0aW5nVGFibGUubGVuZ3RoIC0gMV0gPSBuZXdSYXRpbmc7XG4gICAgfVxuICB9XG5cbiAgcmF0aW5nVGFibGUuc29ydCgoYSwgYikgPT4gYi5zY29yZSAtIGEuc2NvcmUpO1xuICBzZXJ2ZXJNYW5hZ2VyLnNldCgncmF0aW5nVGFibGUnLCByYXRpbmdUYWJsZSwgMSk7XG59XG4iLCJpbXBvcnQgc2NyZWVuc01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc2NyZWVuc01hbmFnZXInO1xuaW1wb3J0IGRhdGFNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2RhdGFNYW5hZ2VyJztcbmltcG9ydCBCYWNrZ3JvdW5kIGZyb20gJy4uL2Rpc3BsYXkvQmFja2dyb3VuZCc7XG5pbXBvcnQgSGVybyBmcm9tICcuLi9kaXNwbGF5L0hlcm8nO1xuaW1wb3J0IFNwaWtlIGZyb20gJy4uL2Rpc3BsYXkvU3Bpa2UnO1xuaW1wb3J0IFNoYWRvd092ZXJsYXkgZnJvbSAnLi4vZGlzcGxheS9TaGFkb3dPdmVybGF5JztcblxuY29uc3QgR1JPVU5EX0hFSUdIVCA9IDgyO1xuY29uc3QgU1RBUlRfU1BFRUQgPSA1O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluU2NyZWVuIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICB0aGlzLnNwZWVkID0gU1RBUlRfU1BFRUQ7XG4gICAgdGhpcy5zdGVwID0gMDtcbiAgICB0aGlzLmRpc3RhbmNlID0gMDtcbiAgICB0aGlzLnNoYWRvd092ZXJsYXkgPSBuZXcgU2hhZG93T3ZlcmxheSh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG5cbiAgICBkYXRhTWFuYWdlci5nYW1lVHlwZSA9ICdzaW5nbGUnO1xuICAgIGRhdGFNYW5hZ2VyLmFjdGlvbnMgPSB7fTtcbiAgICBkYXRhTWFuYWdlci5zcGlrZXMgPSBbXTtcbiAgICBkYXRhTWFuYWdlci5wb3MgPSAwO1xuXG4gICAgdGhpcy5jcmVhdGVCZygpO1xuICAgIHRoaXMuY3JlYXRlU3Bpa2VzKCk7XG4gICAgdGhpcy5jcmVhdGVIZXJvKCk7XG4gICAgdGhpcy5jcmVhdGVIdWQoKTtcblxuICAgIHRoaXMucGF1c2UoJ9Cf0YDQvtCx0LXQuyAtINCy0LfQvNCw0YUg0LrRgNGL0LvRjNGP0LzQuCwgZXNjIC0g0L/QsNGD0LfQsCcpO1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICB9XG4gIGNyZWF0ZUJnKCkge1xuICAgIHRoaXMuYmdTa3kgPSBuZXcgQmFja2dyb3VuZCgnc2t5JywgdGhpcy53aWR0aCk7XG4gICAgdGhpcy5iZ01vdW50YWluID0gbmV3IEJhY2tncm91bmQoJ21vdW50YWluJywgdGhpcy53aWR0aCk7XG4gICAgdGhpcy5iZ0dyb3VuZCA9IG5ldyBCYWNrZ3JvdW5kKCdncm91bmQnLCB0aGlzLndpZHRoKTtcbiAgICB0aGlzLmJnU2t5LnkgPSB0aGlzLmJnTW91bnRhaW4ueSA9IHRoaXMuYmdHcm91bmQueSA9IHRoaXMuaGVpZ2h0O1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5iZ1NreSwgdGhpcy5iZ01vdW50YWluLCB0aGlzLmJnR3JvdW5kKTtcbiAgfVxuICBjcmVhdGVTcGlrZXMoKSB7XG4gICAgdGhpcy5zcGlrZXMgPSBbbmV3IFNwaWtlKCksIG5ldyBTcGlrZSgpXTtcbiAgICB0aGlzLnNwaWtlc1swXS54ID0gLXRoaXMuc3Bpa2VzWzBdLmJvdW5kcy53aWR0aCAvIDI7XG4gICAgdGhpcy5zcGlrZXNbMV0ueCA9IHRoaXMud2lkdGggLyAyO1xuICAgIHRoaXMuc3Bpa2VzLmZvckVhY2goc3Bpa2UgPT4gdGhpcy5yZXNldFNwaWtlKHNwaWtlKSk7XG4gICAgdGhpcy5hZGRDaGlsZCguLi50aGlzLnNwaWtlcyk7XG4gIH1cbiAgY3JlYXRlSGVybygpIHtcbiAgICB0aGlzLmhlcm8gPSBuZXcgSGVybyhkYXRhTWFuYWdlci5oZXJvVHlwZSk7XG4gICAgdGhpcy5oZXJvLnggPSB0aGlzLndpZHRoIC8gMjtcbiAgICB0aGlzLmhlcm8ueSA9IDE5MDtcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuaGVybyk7XG4gIH1cbiAgY3JlYXRlSHVkKCkge1xuICAgIHRoaXMuaHVkRGlzdGFuY2UgPSBuZXcgY3JlYXRlanMuVGV4dCgnMCDQvCcsICcyNXB4IEd1ZXJpbGxhJywgJyMwMDAnKTtcbiAgICB0aGlzLmh1ZERpc3RhbmNlLnggPSAyMDtcbiAgICB0aGlzLmh1ZERpc3RhbmNlLnkgPSAxNTtcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuaHVkRGlzdGFuY2UpO1xuICB9XG4gIHJlc2V0U3Bpa2Uoc3Bpa2UpIHtcbiAgICBzcGlrZS5zY2FsZVkgPSArKDAuNyArIE1hdGgucmFuZG9tKCkgKiAwLjUpLnRvRml4ZWQoMik7XG4gICAgc3Bpa2UueCArPSB0aGlzLndpZHRoICsgc3Bpa2UuYm91bmRzLndpZHRoO1xuICAgIGlmIChNYXRoLnJhbmRvbSgpID4gMC41KSB7XG4gICAgICBzcGlrZS55ID0gdGhpcy5oZWlnaHQgLSBHUk9VTkRfSEVJR0hUO1xuICAgIH0gZWxzZSB7XG4gICAgICBzcGlrZS55ID0gMDtcbiAgICAgIHNwaWtlLnNjYWxlWSA9IC1zcGlrZS5zY2FsZVk7XG4gICAgfVxuICAgIGRhdGFNYW5hZ2VyLnNwaWtlcy5wdXNoKHNwaWtlLnNjYWxlWSk7XG4gIH1cbiAgcGF1c2UodGV4dCkge1xuICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcbiAgICB0aGlzLnNoYWRvd092ZXJsYXkuc2V0VGV4dCh0ZXh0KTtcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuc2hhZG93T3ZlcmxheSk7XG4gIH1cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5oYW5kbGVBY3Rpb24oKSk7XG4gICAgdGhpcy5vbktleURvd24gPSBlID0+IHtcbiAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgMzI6XG4gICAgICAgICAgdGhpcy5oYW5kbGVBY3Rpb24oKTtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjc6XG4gICAgICAgICAgdGhpcy50b2dnbGVQYXVzZSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlEb3duKTtcbiAgfVxuICBoYW5kbGVBY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMucGF1c2VkKSB7XG4gICAgICB0aGlzLnRvZ2dsZVBhdXNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGVyby5mbGFwKCk7XG4gICAgICBkYXRhTWFuYWdlci5hY3Rpb25zW3RoaXMuc3RlcF0gPSAxO1xuICAgIH1cbiAgfVxuICB0b2dnbGVQYXVzZSgpIHtcbiAgICBpZiAodGhpcy5wYXVzZWQpIHtcbiAgICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XG4gICAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuc2hhZG93T3ZlcmxheSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGF1c2UoJ9Cd0LDQttC80LjRgtC1INC/0YDQvtCx0LXQuyDQuNC70LggZXNjJyk7XG4gICAgfVxuICB9XG4gIG1vdmVXb3JsZCgpIHtcbiAgICBpZiAodGhpcy5oZXJvLmRlYWQpIHtcbiAgICAgIHRoaXMuaGVyby54ICs9IHRoaXMuc3BlZWQgKiAwLjU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW92ZVNwaWtlcyh0aGlzLnNwZWVkKTtcbiAgICAgIHRoaXMuYmdTa3kubW92ZSh0aGlzLnNwZWVkICogMC4xKTtcbiAgICAgIHRoaXMuYmdNb3VudGFpbi5tb3ZlKHRoaXMuc3BlZWQgKiAwLjMpO1xuICAgICAgdGhpcy5iZ0dyb3VuZC5tb3ZlKHRoaXMuc3BlZWQpO1xuXG4gICAgICB0aGlzLmRpc3RhbmNlICs9IHRoaXMuc3BlZWQ7XG4gICAgICBkYXRhTWFuYWdlci5zY29yZSA9IE1hdGguZmxvb3IodGhpcy5kaXN0YW5jZSAvIDI1KTtcbiAgICAgIHRoaXMuaHVkRGlzdGFuY2UudGV4dCA9IGAke2RhdGFNYW5hZ2VyLnNjb3JlfSDQvGA7XG4gICAgfVxuICB9XG4gIG1vdmVTcGlrZXMoKSB7XG4gICAgdGhpcy5zcGlrZXMuZm9yRWFjaChzcGlrZSA9PiB7XG4gICAgICBzcGlrZS54IC09IHRoaXMuc3BlZWQ7XG4gICAgICBpZiAoc3Bpa2UueCA8IC1zcGlrZS5ib3VuZHMud2lkdGggLyAyKSB7XG4gICAgICAgIHRoaXMucmVzZXRTcGlrZShzcGlrZSk7XG4gICAgICAgIHRoaXMuc3BlZWQgKz0gMC4wNDtcbiAgICAgIH1cbiAgICAgIGlmIChuZGdtci5jaGVja1BpeGVsQ29sbGlzaW9uKHRoaXMuaGVybywgc3Bpa2UpKSB7XG4gICAgICAgIHRoaXMuaGVyby5kaWUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBtb3ZlSGVybygpIHtcbiAgICB0aGlzLmhlcm8ubW92ZSgpO1xuICAgIGlmICh0aGlzLmhlcm8ueSA8IDApIHtcbiAgICAgIHRoaXMuaGVyby52WSA9IDA7XG4gICAgICB0aGlzLmhlcm8ueSA9IDA7XG4gICAgfSBlbHNlIGlmICh0aGlzLmhlcm8ueSA+IHRoaXMuaGVpZ2h0ICsgdGhpcy5oZXJvLmJvdW5kcy5oZWlnaHQgLyAyKSB7XG4gICAgICBzY3JlZW5zTWFuYWdlci5jaGFuZ2UoJ0VuZFNjcmVlbicpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5oZXJvLnkgPiB0aGlzLmhlaWdodCAtIChHUk9VTkRfSEVJR0hUICsgdGhpcy5oZXJvLmJvdW5kcy5oZWlnaHQgLyAyKSkge1xuICAgICAgdGhpcy5oZXJvLmRpZSgpO1xuICAgIH1cbiAgfVxuICB0aWNrKCkge1xuICAgIGlmICh0aGlzLnBhdXNlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm1vdmVXb3JsZCgpO1xuICAgIHRoaXMubW92ZUhlcm8oKTtcbiAgICB0aGlzLnN0ZXAgKz0gMTtcbiAgfVxuICBkZXN0cm95KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd24pO1xuICB9XG59XG4iLCJpbXBvcnQgcmFuZG9tSW50IGZyb20gJ3JhbmRvbS1pbnQnO1xuaW1wb3J0IHNjcmVlbnNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NjcmVlbnNNYW5hZ2VyJztcbmltcG9ydCBzZXJ2ZXJNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NlcnZlck1hbmFnZXInO1xuaW1wb3J0IGRhdGFNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2RhdGFNYW5hZ2VyJztcbmltcG9ydCBCYWNrZ3JvdW5kIGZyb20gJy4uL2Rpc3BsYXkvQmFja2dyb3VuZCc7XG5pbXBvcnQgSGVybyBmcm9tICcuLi9kaXNwbGF5L0hlcm8nO1xuaW1wb3J0IFNwaWtlIGZyb20gJy4uL2Rpc3BsYXkvU3Bpa2UnO1xuaW1wb3J0IEJ0biBmcm9tICcuLi9kaXNwbGF5L0J0bic7XG5cbmNvbnN0IEdST1VORF9IRUlHSFQgPSA4MjtcbmNvbnN0IFNUQVJUX1NQRUVEID0gNTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpblNjcmVlbiBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgdGhpcy5zcGVlZCA9IFNUQVJUX1NQRUVEO1xuICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5jcmVhdGVCZygpO1xuXG4gICAgY29uc3Qgd2F0aW5nVGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KCfQmNC00LXRgiDQv9C+0LTQsdC+0YAg0YHQvtC/0LXRgNC90LjQutCwJywgJzM1cHggR3VlcmlsbGEnLCAnIzAwMCcpO1xuICAgIHdhdGluZ1RleHQudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgd2F0aW5nVGV4dC54ID0gd2lkdGggLyAyO1xuICAgIHdhdGluZ1RleHQueSA9IDE3MDtcblxuICAgIGNvbnN0IGNhbmNlbEJ0biA9IG5ldyBCdG4oJ9Ce0YLQvNC10L3QsCcsICdvcmFuZ2UnKTtcbiAgICBjYW5jZWxCdG4ueCA9IHdpZHRoIC8gMjtcbiAgICBjYW5jZWxCdG4ueSA9IDM0MDtcbiAgICBjYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzY3JlZW5zTWFuYWdlci5jaGFuZ2UoJ1N0YXJ0U2NyZWVuJykpO1xuXG4gICAgdGhpcy5hZGRDaGlsZCh3YXRpbmdUZXh0LCBjYW5jZWxCdG4pO1xuXG4gICAgZGF0YU1hbmFnZXIucG9zID0gcmFuZG9tSW50KDEpO1xuICAgIGNvbnN0IGVuZW15UmFuZ2UgPSBkYXRhTWFuYWdlci5maWVsZHMubm9ybWFsWzEgLSBkYXRhTWFuYWdlci5wb3NdO1xuICAgIGNvbnN0IGVuZW15RmllbGQgPSBgcHZwJHtyYW5kb21JbnQoZW5lbXlSYW5nZVswXSwgZW5lbXlSYW5nZVsxXSl9YDtcblxuICAgIFByb21pc2UuYWxsKFtcbiAgICAgIHNlcnZlck1hbmFnZXIuZ2V0KGVuZW15RmllbGQsIDEpLnRoZW4ociA9PiB0aGlzLmluaXREYXRhKHIpKSxcbiAgICAgIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBNYXRoLnJhbmRvbSgpICogMjAwMCArIDUwMCkpLFxuICAgIF0pLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5pbml0KCk7XG4gICAgICB0aGlzLnJlbW92ZUNoaWxkKHdhdGluZ1RleHQsIGNhbmNlbEJ0bik7XG4gICAgfSkuY2F0Y2goZSA9PiB7XG4gICAgICB3YXRpbmdUZXh0LnRleHQgPSAnUFZQINCy0YDQtdC80LXQvdC90L4g0L3QtdC00L7RgdGC0YPQv9C90L4gOignO1xuICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICB9KTtcblxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICB9XG4gIGluaXREYXRhKHJlY29yZCkge1xuICAgIGRhdGFNYW5hZ2VyLmdhbWVUeXBlID0gJ3B2cCc7XG4gICAgZGF0YU1hbmFnZXIud2luID0gZmFsc2U7XG4gICAgZGF0YU1hbmFnZXIuYWN0aW9ucyA9IHt9O1xuICAgIGRhdGFNYW5hZ2VyLnNwaWtlcyA9IHJlY29yZC5zcGlrZXM7XG4gICAgZGF0YU1hbmFnZXIuZW5lbXlBY3Rpb25zID0gcmVjb3JkLmFjdGlvbnM7XG4gICAgZGF0YU1hbmFnZXIuZW5lbXkgPSByZWNvcmQudXNlcjtcbiAgICBpZiAoZGF0YU1hbmFnZXIudXNlci5pZCA9PT0gcmVjb3JkLnVzZXIuaWQpIHtcbiAgICAgIGRhdGFNYW5hZ2VyLmVuZW15Lm5hbWUgPSAn0J/RgNC40LfRgNCw0YfQvdGL0Lkg0L/RgtC40YYnO1xuICAgIH1cbiAgfVxuICBpbml0KCkge1xuICAgIHRoaXMuc3Bpa2VJbmRleCA9IDA7XG4gICAgdGhpcy5zdGVwID0gMDtcbiAgICB0aGlzLmRpc3RhbmNlID0gMDtcblxuICAgIHRoaXMuY3JlYXRlU3Bpa2VzKCk7XG4gICAgdGhpcy5jcmVhdGVIdWQoKTtcblxuICAgIGNvbnN0IGNvdW50ZXIgPSBuZXcgY3JlYXRlanMuVGV4dCgzLCAnMTI1cHggR3VlcmlsbGEnLCAnIzAwMCcpO1xuICAgIGNvdW50ZXIudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgY291bnRlci54ID0gdGhpcy53aWR0aCAvIDI7XG4gICAgY291bnRlci55ID0gMzEwO1xuXG4gICAgdGhpcy5hZGRDaGlsZChjb3VudGVyKTtcblxuICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgY291bnRlci50ZXh0IC09IDE7XG4gICAgICBpZiAoY291bnRlci50ZXh0IDwgMCkge1xuICAgICAgICB0aGlzLnJlbW92ZUNoaWxkKGNvdW50ZXIpO1xuICAgICAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgIH1cbiAgICB9LCAxMDAwKTtcblxuICAgIHRoaXMuaGVybyA9IHRoaXMuY3JlYXRlSGVybyhkYXRhTWFuYWdlci5wb3MsIGRhdGFNYW5hZ2VyLnVzZXIubmFtZSk7XG4gICAgdGhpcy5lbmVteSA9IHRoaXMuY3JlYXRlSGVybygxIC0gZGF0YU1hbmFnZXIucG9zLCBkYXRhTWFuYWdlci5lbmVteS5uYW1lKTtcbiAgICB0aGlzLmVuZW15LmFscGhhID0gMC41O1xuICB9XG4gIGNyZWF0ZUJnKCkge1xuICAgIHRoaXMuYmdTa3kgPSBuZXcgQmFja2dyb3VuZCgnc2t5JywgdGhpcy53aWR0aCk7XG4gICAgdGhpcy5iZ01vdW50YWluID0gbmV3IEJhY2tncm91bmQoJ21vdW50YWluJywgdGhpcy53aWR0aCk7XG4gICAgdGhpcy5iZ0dyb3VuZCA9IG5ldyBCYWNrZ3JvdW5kKCdncm91bmQnLCB0aGlzLndpZHRoKTtcbiAgICB0aGlzLmJnU2t5LnkgPSB0aGlzLmJnTW91bnRhaW4ueSA9IHRoaXMuYmdHcm91bmQueSA9IHRoaXMuaGVpZ2h0O1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5iZ1NreSwgdGhpcy5iZ01vdW50YWluLCB0aGlzLmJnR3JvdW5kKTtcbiAgfVxuICBjcmVhdGVTcGlrZXMoKSB7XG4gICAgdGhpcy5zcGlrZXMgPSBbbmV3IFNwaWtlKCksIG5ldyBTcGlrZSgpXTtcbiAgICB0aGlzLnNwaWtlc1swXS54ID0gLXRoaXMuc3Bpa2VzWzBdLmJvdW5kcy53aWR0aCAvIDI7XG4gICAgdGhpcy5zcGlrZXNbMV0ueCA9IHRoaXMud2lkdGggLyAyO1xuICAgIHRoaXMuc3Bpa2VzLmZvckVhY2goc3Bpa2UgPT4gdGhpcy5yZXNldFNwaWtlKHNwaWtlKSk7XG4gICAgdGhpcy5hZGRDaGlsZCguLi50aGlzLnNwaWtlcyk7XG4gIH1cbiAgY3JlYXRlSGVybyhwb3MsIG5hbWUpIHtcbiAgICBjb25zdCBoZXJvID0gbmV3IEhlcm8oZGF0YU1hbmFnZXIuaGVyb1R5cGUpO1xuICAgIGhlcm8ueCA9IHRoaXMud2lkdGggLyAyIC0gMTgwICogcG9zO1xuICAgIGhlcm8ueSA9IDE5MCAtIDUwICogcG9zO1xuXG4gICAgY29uc3QgaGVyb05hbWUgPSBuZXcgY3JlYXRlanMuVGV4dChuYW1lLCAnMjVweCBHdWVyaWxsYScsICcjMDAwJyk7XG4gICAgaGVyb05hbWUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgaGVyb05hbWUueSA9IGhlcm8ueSAtIDEwMDtcbiAgICBoZXJvTmFtZS54ID0gaGVyby54O1xuICAgIHRoaXMuYWRkQ2hpbGQoaGVybywgaGVyb05hbWUpO1xuXG4gICAgY3JlYXRlanMuVHdlZW4uZ2V0KGhlcm9OYW1lKS53YWl0KDI0MDApLnRvKHsgYWxwaGE6IDAgfSwgODAwKVxuICAgICAgLmNhbGwoKCkgPT4gdGhpcy5yZW1vdmVDaGlsZChoZXJvTmFtZSkpO1xuXG4gICAgcmV0dXJuIGhlcm87XG4gIH1cbiAgY3JlYXRlSHVkKCkge1xuICAgIHRoaXMuaHVkRGlzdGFuY2UgPSBuZXcgY3JlYXRlanMuVGV4dCgnMCDQvCcsICcyNXB4IEd1ZXJpbGxhJywgJyMwMDAnKTtcbiAgICB0aGlzLmh1ZERpc3RhbmNlLnggPSAyMDtcbiAgICB0aGlzLmh1ZERpc3RhbmNlLnkgPSAxNTtcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuaHVkRGlzdGFuY2UpO1xuICB9XG4gIHJlc2V0U3Bpa2Uoc3Bpa2UpIHtcbiAgICBzcGlrZS54ICs9IHRoaXMud2lkdGggKyBzcGlrZS5ib3VuZHMud2lkdGg7XG5cbiAgICBpZiAoZGF0YU1hbmFnZXIuc3Bpa2VzW3RoaXMuc3Bpa2VJbmRleF0pIHtcbiAgICAgIHNwaWtlLnNjYWxlWSA9IGRhdGFNYW5hZ2VyLnNwaWtlc1t0aGlzLnNwaWtlSW5kZXhdO1xuICAgICAgdGhpcy5zcGlrZUluZGV4ICs9IDE7XG5cbiAgICAgIGlmIChzcGlrZS5zY2FsZVkgPiAwKSB7XG4gICAgICAgIHNwaWtlLnkgPSB0aGlzLmhlaWdodCAtIEdST1VORF9IRUlHSFQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzcGlrZS55ID0gMDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3Bpa2Uuc2NhbGVZID0gKygwLjcgKyBNYXRoLnJhbmRvbSgpICogMC41KS50b0ZpeGVkKDIpO1xuICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPiAwLjUpIHtcbiAgICAgICAgc3Bpa2UueSA9IHRoaXMuaGVpZ2h0IC0gR1JPVU5EX0hFSUdIVDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNwaWtlLnkgPSAwO1xuICAgICAgICBzcGlrZS5zY2FsZVkgPSAtc3Bpa2Uuc2NhbGVZO1xuICAgICAgfVxuICAgICAgZGF0YU1hbmFnZXIuc3Bpa2VzLnB1c2goc3Bpa2Uuc2NhbGVZKTtcbiAgICB9XG4gIH1cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5oYW5kbGVBY3Rpb24oKSk7XG4gICAgdGhpcy5vbktleURvd24gPSBlID0+IHtcbiAgICAgIHRoaXMuaGFuZGxlQWN0aW9uKCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd24pO1xuICB9XG4gIGhhbmRsZUFjdGlvbigpIHtcbiAgICBpZiAoIXRoaXMuc3RhcnRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmhlcm8uZmxhcCgpO1xuICAgIGRhdGFNYW5hZ2VyLmFjdGlvbnNbdGhpcy5zdGVwXSA9IDE7XG4gIH1cbiAgbW92ZVdvcmxkKCkge1xuICAgIHRoaXMubW92ZVNwaWtlcyh0aGlzLnNwZWVkKTtcbiAgICB0aGlzLmJnU2t5Lm1vdmUodGhpcy5zcGVlZCAqIDAuMSk7XG4gICAgdGhpcy5iZ01vdW50YWluLm1vdmUodGhpcy5zcGVlZCAqIDAuMyk7XG4gICAgdGhpcy5iZ0dyb3VuZC5tb3ZlKHRoaXMuc3BlZWQpO1xuXG4gICAgdGhpcy5kaXN0YW5jZSArPSB0aGlzLnNwZWVkO1xuICAgIGRhdGFNYW5hZ2VyLnNjb3JlID0gTWF0aC5mbG9vcih0aGlzLmRpc3RhbmNlIC8gMjUpO1xuICAgIHRoaXMuaHVkRGlzdGFuY2UudGV4dCA9IGAke2RhdGFNYW5hZ2VyLnNjb3JlfSDQvGA7XG4gIH1cbiAgbW92ZVNwaWtlcygpIHtcbiAgICB0aGlzLnNwaWtlcy5mb3JFYWNoKHNwaWtlID0+IHtcbiAgICAgIHNwaWtlLnggLT0gdGhpcy5zcGVlZDtcbiAgICAgIGlmIChzcGlrZS54IDwgLXNwaWtlLmJvdW5kcy53aWR0aCAvIDIpIHtcbiAgICAgICAgdGhpcy5yZXNldFNwaWtlKHNwaWtlKTtcbiAgICAgICAgdGhpcy5zcGVlZCArPSAwLjA0O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIG1vdmVIZXJvKGhlcm8pIHtcbiAgICBoZXJvLm1vdmUoKTtcbiAgICBpZiAoaGVyby55IDwgMCkge1xuICAgICAgaGVyby52WSA9IDA7XG4gICAgICBoZXJvLnkgPSAwO1xuICAgIH0gZWxzZSBpZiAoaGVyby55ID4gdGhpcy5oZWlnaHQgKyBoZXJvLmJvdW5kcy5oZWlnaHQgLyAyKSB7XG4gICAgICBpZiAoaGVybyA9PT0gdGhpcy5oZXJvKSB7XG4gICAgICAgIHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnRW5kU2NyZWVuJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhTWFuYWdlci53aW4gPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaGVyby55ID4gdGhpcy5oZWlnaHQgLSAoR1JPVU5EX0hFSUdIVCArIGhlcm8uYm91bmRzLmhlaWdodCAvIDIpKSB7XG4gICAgICBoZXJvLmRpZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zcGlrZXMuc29tZShzcGlrZSA9PiBuZGdtci5jaGVja1BpeGVsQ29sbGlzaW9uKGhlcm8sIHNwaWtlKSkpIHtcbiAgICAgIGhlcm8uZGllKCk7XG4gICAgfVxuICB9XG4gIHRpY2soKSB7XG4gICAgaWYgKCF0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5tb3ZlV29ybGQoKTtcbiAgICB0aGlzLm1vdmVIZXJvKHRoaXMuaGVybyk7XG4gICAgdGhpcy5tb3ZlSGVybyh0aGlzLmVuZW15KTtcblxuICAgIHRoaXMuc3RlcCArPSAxO1xuICAgIGlmIChkYXRhTWFuYWdlci5lbmVteUFjdGlvbnNbdGhpcy5zdGVwXSkge1xuICAgICAgdGhpcy5lbmVteS5mbGFwKCk7XG4gICAgfVxuICB9XG4gIGRlc3Ryb3koKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bik7XG4gIH1cbn1cbiIsImltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuaW1wb3J0IGRhdGFNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2RhdGFNYW5hZ2VyJztcbmltcG9ydCBzZXJ2ZXJNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NlcnZlck1hbmFnZXInO1xuaW1wb3J0IEd1aSBmcm9tICcuLi9kaXNwbGF5L0d1aSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhdGluZ1NjcmVlbiBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcblxuICAgIHRoaXMuYmcgPSBuZXcgY3JlYXRlanMuQml0bWFwKGFzc2V0c01hbmFnZXIuZ2V0UmVzdWx0KCdzdGFydCcpKTtcbiAgICB0aGlzLmd1aSA9IG5ldyBHdWkod2lkdGgpO1xuXG4gICAgdGhpcy50aXRsZSA9IG5ldyBjcmVhdGVqcy5UZXh0KCfQoNC10LnRgtC40L3QsycsICczNXB4IEd1ZXJpbGxhJywgJyMwMDAnKTtcbiAgICB0aGlzLnRpdGxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRoaXMudGl0bGUueCA9IHRoaXMud2lkdGggLyAyO1xuICAgIHRoaXMudGl0bGUueSA9IDM1O1xuXG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmJnLCB0aGlzLmd1aSwgdGhpcy50aXRsZSk7XG5cbiAgICBzZXJ2ZXJNYW5hZ2VyLmdldCgncmF0aW5nVGFibGUnLCAxKVxuICAgICAgLy8gdG9kbzogcmVtb3ZlIGxhdGVyLCBub3cgaXQgYWRkIHJlY29yZHMgZm9yIG9sZCB1c2Vyc1xuICAgICAgLnRoZW4ocmVjYWxjUmF0aW5nVGFibGUpXG4gICAgICAudGhlbihyID0+IHRoaXMuc2hvd1JhdGluZyhyKSlcbiAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRleHQgPSBuZXcgY3JlYXRlanMuVGV4dCgn0KDQtdC50YLQuNC90LMg0LLRgNC10LzQtdC90L3QviDQvdC10LTQvtGB0YLRg9C/0LXQvSA6KCcsICcyNXB4IEd1ZXJpbGxhJywgJyMwMDAnKTtcbiAgICAgICAgdGV4dC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgdGV4dC54ID0gdGhpcy53aWR0aCAvIDI7XG4gICAgICAgIHRleHQueSA9IDE1MDtcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0ZXh0KTtcbiAgICAgIH0pO1xuICB9XG4gIHNob3dSYXRpbmcocmF0aW5nVGFibGUpIHtcbiAgICBsZXQgd2lubmVyID0gZmFsc2U7XG5cbiAgICByYXRpbmdUYWJsZS5mb3JFYWNoKChlbCwgaSkgPT4ge1xuICAgICAgY29uc3QgdGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KGAke2kgKyAxfSAke2VsLm5hbWV9ICR7ZWwuc2NvcmV9INC8YCwgJzI1cHggR3VlcmlsbGEnLCAnIzAwMCcpO1xuICAgICAgdGV4dC55ID0gMTIwICsgaSAqIDQwO1xuICAgICAgdGV4dC54ID0gMTIwO1xuICAgICAgdGhpcy5hZGRDaGlsZCh0ZXh0KTtcblxuICAgICAgaWYgKGVsLmlkID09PSBkYXRhTWFuYWdlci51c2VyLmlkKSB7XG4gICAgICAgIHdpbm5lciA9IHRydWU7XG4gICAgICAgIHRleHQuY29sb3IgPSAnIzdFQ0UyRSc7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoIXdpbm5lcikge1xuICAgICAgY29uc3QgdGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KGAtICR7ZGF0YU1hbmFnZXIudXNlci5uYW1lfSAke2RhdGFNYW5hZ2VyLm1heFNjb3JlfSDQvGAsICcyNXB4IEd1ZXJpbGxhJywgJyM3RUNFMkUnKTtcbiAgICAgIHRleHQueSA9IDEyMCArIHJhdGluZ1RhYmxlLmxlbmd0aCAqIDQwO1xuICAgICAgdGV4dC54ID0gMTIwO1xuICAgICAgdGhpcy5hZGRDaGlsZCh0ZXh0KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVjYWxjUmF0aW5nVGFibGUocmF0aW5nVGFibGUpIHtcbiAgaWYgKHJhdGluZ1RhYmxlW3JhdGluZ1RhYmxlLmxlbmd0aCAtIDFdLnNjb3JlIDwgZGF0YU1hbmFnZXIubWF4U2NvcmUpIHtcbiAgICBjb25zdCB1c2VyUmF0aW5nID0gcmF0aW5nVGFibGUuZmluZChlbCA9PiBlbC5pZCA9PT0gZGF0YU1hbmFnZXIudXNlci5pZCk7XG5cbiAgICBpZiAodXNlclJhdGluZykge1xuICAgICAgdXNlclJhdGluZy5zY29yZSA9IGRhdGFNYW5hZ2VyLm1heFNjb3JlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBuZXdSYXRpbmcgPSB7XG4gICAgICAgIGlkOiBkYXRhTWFuYWdlci51c2VyLmlkLFxuICAgICAgICBuYW1lOiBkYXRhTWFuYWdlci51c2VyLm5hbWUsXG4gICAgICAgIHNjb3JlOiBkYXRhTWFuYWdlci5tYXhTY29yZSxcbiAgICAgIH07XG4gICAgICBpZiAocmF0aW5nVGFibGUubGVuZ3RoIDwgMTApIHtcbiAgICAgICAgcmF0aW5nVGFibGUucHVzaChuZXdSYXRpbmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmF0aW5nVGFibGVbcmF0aW5nVGFibGUubGVuZ3RoIC0gMV0gPSBuZXdSYXRpbmc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmF0aW5nVGFibGUuc29ydCgoYSwgYikgPT4gYi5zY29yZSAtIGEuc2NvcmUpO1xuICAgIHNlcnZlck1hbmFnZXIuc2V0KCdyYXRpbmdUYWJsZScsIHJhdGluZ1RhYmxlLCAxKTtcbiAgfVxuICByZXR1cm4gcmF0aW5nVGFibGU7XG59XG4iLCJpbXBvcnQgc2VydmVyTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zZXJ2ZXJNYW5hZ2VyJztcbmltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuaW1wb3J0IHNjcmVlbnNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NjcmVlbnNNYW5hZ2VyJztcbmltcG9ydCBkYXRhTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9kYXRhTWFuYWdlcic7XG5pbXBvcnQgR3VpIGZyb20gJy4uL2Rpc3BsYXkvR3VpJztcbmltcG9ydCBIZXJvIGZyb20gJy4uL2Rpc3BsYXkvSGVybyc7XG5pbXBvcnQgQnRuIGZyb20gJy4uL2Rpc3BsYXkvQnRuJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhcnRTY3JlZW4gZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcblxuICAgIHRoaXMuYmcgPSBuZXcgY3JlYXRlanMuQml0bWFwKGFzc2V0c01hbmFnZXIuZ2V0UmVzdWx0KCdzdGFydCcpKTtcbiAgICB0aGlzLmd1aSA9IG5ldyBHdWkod2lkdGgpO1xuXG4gICAgdGhpcy5zdGFydEJ0biA9IG5ldyBCdG4oJ9CY0LPRgNCw0YLRjCcpO1xuICAgIHRoaXMuc3RhcnRCdG4ueCA9IHdpZHRoIC8gMjtcbiAgICB0aGlzLnN0YXJ0QnRuLnkgPSAzMjA7XG5cbiAgICB0aGlzLnB2cEJ0biA9IG5ldyBCdG4oJ1BWUCcpO1xuICAgIHRoaXMucHZwQnRuLnggPSB3aWR0aCAvIDI7XG4gICAgdGhpcy5wdnBCdG4ueSA9IDQxMDtcblxuICAgIHRoaXMuaW52aXRlQnRuID0gbmV3IEJ0bign0J/QvtC30LLQsNGC0Ywg0LHRgNC+JywgJ29yYW5nZScpO1xuICAgIHRoaXMuaW52aXRlQnRuLnggPSB3aWR0aCAvIDI7XG4gICAgdGhpcy5pbnZpdGVCdG4ueSA9IDUwMDtcblxuICAgIHRoaXMuaGVybyA9IG5ldyBIZXJvKCdtb25zdGVyJyk7XG4gICAgdGhpcy5oZXJvLnggPSB3aWR0aCAvIDI7XG4gICAgdGhpcy5oZXJvLnkgPSAxOTA7XG5cbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuYmcsIHRoaXMuZ3VpLCB0aGlzLmhlcm8sIHRoaXMuc3RhcnRCdG4sIHRoaXMucHZwQnRuLCB0aGlzLmludml0ZUJ0bik7XG5cbiAgICBpZiAoZGF0YU1hbmFnZXIubWF4U2NvcmUpIHtcbiAgICAgIHRoaXMuc2NvcmUgPSBuZXcgY3JlYXRlanMuVGV4dChg0KDQtdC60L7RgNC0OiAke2RhdGFNYW5hZ2VyLm1heFNjb3JlfSDQvGAsICcyNXB4IEd1ZXJpbGxhJywgJyMwMDAnKTtcbiAgICAgIHRoaXMuc2NvcmUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICB0aGlzLnNjb3JlLnggPSB0aGlzLndpZHRoIC8gMjtcbiAgICAgIHRoaXMuc2NvcmUueSA9IDQwO1xuICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLnNjb3JlKTtcbiAgICB9XG5cbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgfVxuICAvLyBjcmVhdGVIZXJvZXMoKSB7XG4gIC8vICAgdGhpcy5oZXJvZXMgPSBbXG4gIC8vICAgICBuZXcgSGVybygnYmlyZCcpLFxuICAvLyAgICAgbmV3IEhlcm8oJ21vbnN0ZXInKSxcbiAgLy8gICAgIG5ldyBIZXJvKCdjaGlja2VuJyksXG4gIC8vICAgXTtcbiAgLy8gICB0aGlzLmhlcm9lcy5mb3JFYWNoKChoZXJvLCBpKSA9PiB7XG4gIC8vICAgICBoZXJvLnkgPSB0aGlzLmhlaWdodCAvIDI7XG4gIC8vICAgICBoZXJvLnggPSAoaSArIDEpICogdGhpcy53aWR0aCAvICh0aGlzLmhlcm9lcy5sZW5ndGggKyAxKTtcbiAgLy8gICAgIGhlcm8uY3Vyc29yID0gJ3BvaW50ZXInO1xuICAvLyAgICAgaGVyby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuc2VsZWN0SGVybyhoZXJvKSk7XG4gIC8vICAgICBoZXJvLmNhY2hlKDAsIDAsIGhlcm8uYm91bmRzLndpZHRoLCBoZXJvLmJvdW5kcy5oZWlnaHQpO1xuICAvLyAgIH0pO1xuICAvLyAgIHRoaXMuaGVyb0ZpbHRlciA9IG5ldyBjcmVhdGVqcy5Db2xvckZpbHRlcigwLjYsIDAuNiwgMC42KTtcbiAgLy8gICB0aGlzLnJlc2V0SGVyb2VzKCk7XG4gIC8vICAgdGhpcy5hZGRDaGlsZCguLi50aGlzLmhlcm9lcyk7XG4gIC8vIH1cbiAgLy8gcmVzZXRIZXJvZXMoKSB7XG4gIC8vICAgdGhpcy5oZXJvZXMuZm9yRWFjaChoZXJvID0+IHtcbiAgLy8gICAgIGhlcm8uZmlsdGVycyA9IFt0aGlzLmhlcm9GaWx0ZXJdO1xuICAvLyAgICAgaGVyby51cGRhdGVDYWNoZSgpO1xuICAvLyAgICAgaGVyby5zY2FsZVggPSAwLjg1O1xuICAvLyAgICAgaGVyby5zY2FsZVkgPSAwLjg1O1xuICAvLyAgIH0pO1xuICAvLyB9XG4gIC8vIHNlbGVjdEhlcm8oaGVybykge1xuICAvLyAgIHRoaXMucmVzZXRIZXJvZXMoKTtcblxuICAvLyAgIGhlcm8uZmlsdGVycyA9IFtdO1xuICAvLyAgIGhlcm8udXBkYXRlQ2FjaGUoKTtcbiAgLy8gICBoZXJvLnNjYWxlWCA9IDE7XG4gIC8vICAgaGVyby5zY2FsZVkgPSAxO1xuICAvLyAgIGhlcm8uZmxhcCgpO1xuXG4gIC8vICAgaWYgKCF0aGlzLnN0YXJ0QnRuLmVuYWJsZWQpIHtcbiAgLy8gICAgIHRoaXMuc3RhcnRCdG4uZW5hYmxlKCk7XG4gIC8vICAgfVxuXG4gIC8vICAgZGF0YU1hbmFnZXIuaGVyb1R5cGUgPSBoZXJvLnR5cGU7XG4gIC8vIH1cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLnN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT5cbiAgICAgIHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnTWFpblNjcmVlbicpKTtcbiAgICB0aGlzLnB2cEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+XG4gICAgICBzY3JlZW5zTWFuYWdlci5jaGFuZ2UoJ1BWUFNjcmVlbicpKTtcbiAgICB0aGlzLmludml0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+XG4gICAgICBzZXJ2ZXJNYW5hZ2VyLmludml0ZSgpKTtcblxuICAgIHRoaXMub25LZXlEb3duID0gZSA9PiB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAzMikge1xuICAgICAgICBzY3JlZW5zTWFuYWdlci5jaGFuZ2UoJ01haW5TY3JlZW4nKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlEb3duKTtcbiAgfVxuICBkZXN0cm95KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd24pO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChtaW4sIG1heCkge1xuXHRpZiAobWF4ID09PSB1bmRlZmluZWQpIHtcblx0XHRtYXggPSBtaW47XG5cdFx0bWluID0gMDtcblx0fVxuXG5cdGlmICh0eXBlb2YgbWluICE9PSAnbnVtYmVyJyB8fCB0eXBlb2YgbWF4ICE9PSAnbnVtYmVyJykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGFsbCBhcmd1bWVudHMgdG8gYmUgbnVtYmVycycpO1xuXHR9XG5cblx0cmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbik7XG59O1xuIl19
