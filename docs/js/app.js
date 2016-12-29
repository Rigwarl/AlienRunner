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
    normal: [[0, 99], [100, 199]]
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
      spike.scaleY = +(0.7 + Math.random() * 0.45).toFixed(2);
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
    var enemyRange = _dataManager2.default.fields.normal[1 - _dataManager2.default.pos];
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
        spike.scaleY = +(0.7 + Math.random() * 0.45).toFixed(2);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvc3JjL2FwcC5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9CYWNrZ3JvdW5kLmpzIiwiYXBwL2pzL3NyYy9kaXNwbGF5L0J0bi5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9HdWkuanMiLCJhcHAvanMvc3JjL2Rpc3BsYXkvSGVyby5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9JY29uQnRuLmpzIiwiYXBwL2pzL3NyYy9kaXNwbGF5L1NoYWRvd092ZXJsYXkuanMiLCJhcHAvanMvc3JjL2Rpc3BsYXkvU3Bpa2UuanMiLCJhcHAvanMvc3JjL21hbmFnZXJzL2Fzc2V0c01hbmFnZXIuanMiLCJhcHAvanMvc3JjL21hbmFnZXJzL2RhdGFNYW5hZ2VyLmpzIiwiYXBwL2pzL3NyYy9tYW5hZ2Vycy9zY3JlZW5zTWFuYWdlci5qcyIsImFwcC9qcy9zcmMvbWFuYWdlcnMvc2VydmVyTWFuYWdlci5qcyIsImFwcC9qcy9zcmMvbWFuYWdlcnMvc291bmRNYW5hZ2VyLmpzIiwiYXBwL2pzL3NyYy9zY3JlZW5zL0VuZFNjcmVlbi5qcyIsImFwcC9qcy9zcmMvc2NyZWVucy9NYWluU2NyZWVuLmpzIiwiYXBwL2pzL3NyYy9zY3JlZW5zL1BWUFNjcmVlbi5qcyIsImFwcC9qcy9zcmMvc2NyZWVucy9SYXRpbmdTY3JlZW4uanMiLCJhcHAvanMvc3JjL3NjcmVlbnMvU3RhcnRTY3JlZW4uanMiLCJub2RlX21vZHVsZXMvcmFuZG9tLWludC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsUUFBUSxHQUFSLENBQVksQ0FDVix3QkFBYyxJQUFkLEVBRFUsRUFFVix3QkFBYyxJQUFkLEVBRlUsQ0FBWixFQUlHLElBSkgsQ0FJUTtBQUFBLFNBQU0sUUFBUSxHQUFSLENBQVksQ0FDdEIsd0JBQWMs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Q3lCO0FBb0MxQjtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7OztpQ0FDYTtBQUNYLFdBQUssUUFBTCxDQUFjLGdCQUFkLENBQStCLE9BQS9CLEVBQXdDO0FBQUEsZUFDdEMseUJBQWUsTUFBZixDQUFzQixZQUF0QixDQURzQztBQUFBLE9BQXhDO0FBRUEsV0FBSyxNQUFMLENBQVksZ0JBQVosQ0FBNkIsT0FBN0IsRUFBc0M7QUFBQSxlQUNwQyx5QkFBZSxNQUFmLENBQXNCLFdBQXRCLENBRG9DO0FBQUEsT0FBdEM7QUFFQSxXQUFLLFNBQUwsQ0FBZSxnQkFBZixDQUFnQyxPQUFoQyxFQUF5QztBQUFBLGVBQ3ZDLHdCQUFjLE1BQWQsRUFEdUM7QUFBQSxPQUF6Qzs7QUFHQSxXQUFLLFNBQUwsR0FBaUIsYUFBSztBQUNwQixZQUFJLEVBQUUsT0FBRixLQUFjLEVBQWxCLEVBQXNCO0FBQ3BCLG1DQUFlLE1BQWYsQ0FBc0IsWUFBdEI7QUFDQSxZQUFFLGNBQUY7QUFDRDtBQUNGLE9BTEQ7O0FBT0EsYUFBTyxnQkFBUCxDQUF3QixTQUF4QixFQUFtQyxLQUFLLFNBQXhDO0FBQ0Q7Ozs4QkFDUztBQUNSLGFBQU8sbUJBQVAsQ0FBMkIsU0FBM0IsRUFBc0MsS0FBSyxTQUEzQztBQUNEOzs7O0VBakdzQyxTQUFTLFM7O2tCQUE3QixXOzs7QUNSckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgc2NyZWVuc01hbmFnZXIgZnJvbSAnLi9tYW5hZ2Vycy9zY3JlZW5zTWFuYWdlcic7XG5pbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuaW1wb3J0IHNlcnZlck1hbmFnZXIgZnJvbSAnLi9tYW5hZ2Vycy9zZXJ2ZXJNYW5hZ2VyJztcbmltcG9ydCBzb3VuZE1hbmFnZXIgZnJvbSAnLi9tYW5hZ2Vycy9zb3VuZE1hbmFnZXInO1xuaW1wb3J0IGRhdGFNYW5hZ2VyIGZyb20gJy4vbWFuYWdlcnMvZGF0YU1hbmFnZXInO1xuXG5Qcm9taXNlLmFsbChbXG4gIGFzc2V0c01hbmFnZXIuaW5pdCgpLFxuICBzZXJ2ZXJNYW5hZ2VyLmluaXQoKSxcbl0pXG4gIC50aGVuKCgpID0+IFByb21pc2UuYWxsKFtcbiAgICBzZXJ2ZXJNYW5hZ2VyLmdldFVzZXIoKS50aGVuKHVzZXIgPT4gZGF0YU1hbmFnZXIuc2V0KCd1c2VyJywge1xuICAgICAgaWQ6IHVzZXIuaWQsXG4gICAgICBuYW1lOiBgJHt1c2VyLmZpcnN0X25hbWV9ICR7dXNlci5sYXN0X25hbWV9YCxcbiAgICAgIHNleDogdXNlci5zZXgsXG4gICAgfSkpLFxuICAgIHNlcnZlck1hbmFnZXIuZ2V0KCdtYXhTY29yZScpLnRoZW4ociA9PiBkYXRhTWFuYWdlci5zZXQoJ21heFNjb3JlJywgK3IpKSxcbiAgICBzZXJ2ZXJNYW5hZ2VyLmdldCgnc291bmQnKS50aGVuKHIgPT4gc291bmRNYW5hZ2VyLmluaXQociA9PT0gJycgPyB0cnVlIDogISFyKSksXG4gIF0pKVxuICAudGhlbigoKSA9PiBzY3JlZW5zTWFuYWdlci5jaGFuZ2UoJ1N0YXJ0U2NyZWVuJykpXG4gIC5jYXRjaChlID0+IGNvbnNvbGUuZXJyb3IoJ2luaXQgZXJyb3IsIHJlbG9hZCBwYWdlJywgZSkpO1xuXG5jb25zdCBzdGFnZSA9IG5ldyBjcmVhdGVqcy5TdGFnZSgnZ2FtZS1zdGFnZScpO1xuc2NyZWVuc01hbmFnZXIuaW5pdChzdGFnZSk7XG5cbmlmIChjcmVhdGVqcy5Ub3VjaC5pc1N1cHBvcnRlZCgpKSB7XG4gIGNyZWF0ZWpzLlRvdWNoLmVuYWJsZShzdGFnZSwgdHJ1ZSk7XG59IGVsc2Uge1xuICBzdGFnZS5lbmFibGVNb3VzZU92ZXIoMjApO1xufVxuXG5pZiAod2luZG93ICE9PSB3aW5kb3cucGFyZW50KSB7XG4gIC8vIGNyZWF0ZWpzIHN0YWdlIGNsaWNrIGRvc250IHRyaWdnZXIgd2luZG93LmZvY3VzXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHdpbmRvdy5mb2N1cygpKTtcbn1cbiIsImltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYWNrZ3JvdW5kIGV4dGVuZHMgY3JlYXRlanMuU2hhcGUge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBjYW52YXNXaWR0aCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmltZyA9IGFzc2V0c01hbmFnZXIuZ2V0UmVzdWx0KG5hbWUpO1xuICAgIGNvbnN0IHdpZHRoID0gdGhpcy5pbWcud2lkdGggKyBjYW52YXNXaWR0aDtcblxuICAgIHRoaXMuZ3JhcGhpY3MuYmVnaW5CaXRtYXBGaWxsKHRoaXMuaW1nLCAncmVwZWF0LXgnKS5kcmF3UmVjdCgwLCAwLCB3aWR0aCwgdGhpcy5pbWcuaGVpZ2h0KTtcbiAgICB0aGlzLnJlZ1kgPSB0aGlzLmltZy5oZWlnaHQ7XG4gICAgdGhpcy5jYWNoZSgwLCAwLCB3aWR0aCwgdGhpcy5pbWcuaGVpZ2h0KTtcbiAgfVxuICBtb3ZlKHBhdGgpIHtcbiAgICB0aGlzLnggLT0gcGF0aDtcbiAgICB0aGlzLnggJT0gdGhpcy5pbWcud2lkdGg7XG4gIH1cbn1cbiIsImltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuaW1wb3J0IHNvdW5kTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zb3VuZE1hbmFnZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdG4gZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuICBjb25zdHJ1Y3RvcihsYWJlbCwgY29sb3IgPSAnZ3JlZW4nLCB0eXBlID0gJ2J0bicpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuXG4gICAgdGhpcy5jcmVhdGVCZyh0eXBlKTtcbiAgICB0aGlzLmNyZWF0ZUxhYmVsKGxhYmVsKTtcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzb3VuZE1hbmFnZXIucGxheSgnZmxhcCcpKTtcbiAgfVxuICBjcmVhdGVCZyh0eXBlKSB7XG4gICAgdGhpcy5iZyA9IG5ldyBjcmVhdGVqcy5TcHJpdGUoYXNzZXRzTWFuYWdlci5nZXRTcHJpdGVTaGVldCh0eXBlKSk7XG4gICAgdGhpcy5iZy5yZWdYID0gdGhpcy5iZy5nZXRCb3VuZHMoKS53aWR0aCAvIDI7XG4gICAgdGhpcy5iZy5yZWdZID0gdGhpcy5iZy5nZXRCb3VuZHMoKS5oZWlnaHQgLyAyO1xuICAgIHRoaXMuaGVscGVyID0gbmV3IGNyZWF0ZWpzLkJ1dHRvbkhlbHBlcih0aGlzLmJnLCBgJHt0aGlzLmNvbG9yfU91dGAsIGAke3RoaXMuY29sb3J9T3ZlcmAsIGAke3RoaXMuY29sb3J9RG93bmApO1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5iZyk7XG4gIH1cbiAgY3JlYXRlTGFiZWwobGFiZWwpIHtcbiAgICB0aGlzLmxhYmVsID0gbmV3IGNyZWF0ZWpzLlRleHQobGFiZWwsICczMHB4IEd1ZXJpbGxhJywgJyNmZmYnKTtcbiAgICB0aGlzLmxhYmVsLnNoYWRvdyA9IG5ldyBjcmVhdGVqcy5TaGFkb3coJyMwMDAnLCAwLCAxLCA1KTtcbiAgICB0aGlzLmxhYmVsLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRoaXMubGFiZWwudGV4dEJhc2VsaW5lID0gJ21pZGRsZSc7XG4gICAgdGhpcy5sYWJlbC5tb3VzZUVuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLmxhYmVsLnkgPSAtMztcblxuICAgIC8vIHRvZG8gY2FjaGVcbiAgICAvLyBub3cgaXQgY2FjaGUgYmVmb3JlIGZvbnQgbG9hZCAoXG4gICAgLy8gY29uc3QgaCA9IHRoaXMubGFiZWwuZ2V0TWVhc3VyZWRIZWlnaHQoKSArIDY7IC8vIGFkZCA2IGNvcyBvZiBzaGFkb3dcbiAgICAvLyBjb25zdCB3ID0gdGhpcy5sYWJlbC5nZXRNZWFzdXJlZFdpZHRoKCkgKyA2O1xuICAgIC8vIHRoaXMubGFiZWwuY2FjaGUoLXcgLyAyLCAtaCAvIDIsIHcsIGgpO1xuXG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmxhYmVsKTtcbiAgfVxuICBkaXNhYmxlKCkge1xuICAgIHRoaXMuYmcuZ290b0FuZFN0b3AoJ2Rpc2FibGUnKTtcbiAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xuICB9XG4gIGVuYWJsZSgpIHtcbiAgICB0aGlzLmJnLmdvdG9BbmRTdG9wKGAke3RoaXMuY29sb3J9T3V0YCk7XG4gICAgdGhpcy5tb3VzZUVuYWJsZWQgPSB0cnVlO1xuICB9XG59XG4iLCJpbXBvcnQgc2NyZWVuTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zY3JlZW5zTWFuYWdlcic7XG5pbXBvcnQgc291bmRNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NvdW5kTWFuYWdlcic7XG5pbXBvcnQgc2VydmVyTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zZXJ2ZXJNYW5hZ2VyJztcbmltcG9ydCBJY29uQnRuIGZyb20gJy4vSWNvbkJ0bic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEd1aSBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcblxuICAgIHRoaXMubWVudUJ0biA9IG5ldyBJY29uQnRuKCdtZW51Jyk7XG4gICAgdGhpcy5tZW51QnRuLnggPSB0aGlzLm1lbnVCdG4uZ2V0Qm91bmRzKCkud2lkdGggLyAyICsgMjA7XG4gICAgdGhpcy5tZW51QnRuLnkgPSB0aGlzLm1lbnVCdG4uZ2V0Qm91bmRzKCkuaGVpZ2h0IC8gMiArIDIwO1xuXG4gICAgdGhpcy5yYXRpbmdCdG4gPSBuZXcgSWNvbkJ0bigncmF0aW5nJyk7XG4gICAgdGhpcy5yYXRpbmdCdG4ueCA9IHRoaXMucmF0aW5nQnRuLmdldEJvdW5kcygpLndpZHRoICogMyAvIDIgKyA0MDtcbiAgICB0aGlzLnJhdGluZ0J0bi55ID0gdGhpcy5yYXRpbmdCdG4uZ2V0Qm91bmRzKCkuaGVpZ2h0IC8gMiArIDIwO1xuXG4gICAgdGhpcy5zb3VuZEJ0biA9IG5ldyBJY29uQnRuKHNvdW5kTWFuYWdlci5pc0VuYWJsZWQoKSA/ICdzb3VuZCcgOiAnc291bmRPZmYnKTtcbiAgICB0aGlzLnNvdW5kQnRuLnggPSB0aGlzLndpZHRoIC0gdGhpcy5zb3VuZEJ0bi5nZXRCb3VuZHMoKS53aWR0aCAvIDIgLSAyMDtcbiAgICB0aGlzLnNvdW5kQnRuLnkgPSB0aGlzLnNvdW5kQnRuLmdldEJvdW5kcygpLmhlaWdodCAvIDIgKyAyMDtcblxuICAgIC8vIHRvZG86IGZpeCBzcHJpdGVzaGVldCBsYXRlclxuICAgIHRoaXMucmF0aW5nQnRuLmxhYmVsLnggPSB0aGlzLnNvdW5kQnRuLmxhYmVsLnggPSAxO1xuXG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLm1lbnVCdG4sIHRoaXMucmF0aW5nQnRuLCB0aGlzLnNvdW5kQnRuKTtcblxuICAgIHRoaXMuc291bmRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBzb3VuZE1hbmFnZXIudG9nZ2xlKCk7XG4gICAgICB0aGlzLnNvdW5kQnRuLmNoYW5nZUxhYmVsKHNvdW5kTWFuYWdlci5pc0VuYWJsZWQoKSA/ICdzb3VuZCcgOiAnc291bmRPZmYnKTtcbiAgICAgIHNlcnZlck1hbmFnZXIuc2V0KCdzb3VuZCcsIHNvdW5kTWFuYWdlci5pc0VuYWJsZWQoKSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm1lbnVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzY3JlZW5NYW5hZ2VyLmNoYW5nZSgnU3RhcnRTY3JlZW4nKSk7XG4gICAgdGhpcy5yYXRpbmdCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzY3JlZW5NYW5hZ2VyLmNoYW5nZSgnUmF0aW5nU2NyZWVuJykpO1xuICB9XG59XG4iLCJpbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcbmltcG9ydCBzb3VuZE1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc291bmRNYW5hZ2VyJztcblxuY29uc3QgQ09ORklHID0ge1xuICBHOiAwLjE2LFxuICBBOiA3LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVybyBleHRlbmRzIGNyZWF0ZWpzLlNwcml0ZSB7XG4gIGNvbnN0cnVjdG9yKHR5cGUpIHtcbiAgICBzdXBlcihhc3NldHNNYW5hZ2VyLmdldFNwcml0ZVNoZWV0KHR5cGUpKTtcblxuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5ib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpO1xuICAgIHRoaXMucmVnWCA9IHRoaXMuYm91bmRzLndpZHRoIC8gMjtcbiAgICB0aGlzLnJlZ1kgPSB0aGlzLmJvdW5kcy5oZWlnaHQgLyAyO1xuXG4gICAgdGhpcy5kZWFkID0gZmFsc2U7XG4gICAgdGhpcy52WSA9IDA7XG4gIH1cbiAgZmxhcCgpIHtcbiAgICBpZiAodGhpcy5kZWFkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudlkgPSBNYXRoLm1heCh0aGlzLnZZIC0gQ09ORklHLkEsIC1DT05GSUcuQSk7XG4gICAgdGhpcy5nb3RvQW5kUGxheSgnZmxhcCcpO1xuICAgIHNvdW5kTWFuYWdlci5wbGF5KCdmbGFwJyk7XG4gIH1cbiAgbW92ZSgpIHtcbiAgICB0aGlzLnZZICs9IENPTkZJRy5HO1xuICAgIHRoaXMueSArPSB0aGlzLnZZO1xuICB9XG4gIGRpZSgpIHtcbiAgICBpZiAodGhpcy5kZWFkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZGVhZCA9IHRydWU7XG4gICAgdGhpcy5yb3RhdGlvbiA9IDMwO1xuICAgIHRoaXMuZ290b0FuZFN0b3AoJ2RlYWQnKTtcbiAgICBzb3VuZE1hbmFnZXIucGxheSgnbG9vc2UnKTtcbiAgfVxufVxuIiwiaW1wb3J0IGFzc2V0c01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvYXNzZXRzTWFuYWdlcic7XG5pbXBvcnQgQnRuIGZyb20gJy4vQnRuJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSWNvbkJ0biBleHRlbmRzIEJ0biB7XG4gIGNvbnN0cnVjdG9yKGxhYmVsLCBjb2xvciA9ICdvcmFuZ2UnKSB7XG4gICAgc3VwZXIobGFiZWwsIGNvbG9yLCAnaWNvbkJ0bicpO1xuICB9XG4gIGNyZWF0ZUxhYmVsKGxhYmVsKSB7XG4gICAgdGhpcy5sYWJlbCA9IG5ldyBjcmVhdGVqcy5TcHJpdGUoYXNzZXRzTWFuYWdlci5nZXRTcHJpdGVTaGVldCgnaWNvbicpLCBsYWJlbCk7XG4gICAgdGhpcy5sYWJlbC5yZWdYID0gdGhpcy5sYWJlbC5nZXRCb3VuZHMoKS53aWR0aCAvIDI7XG4gICAgdGhpcy5sYWJlbC5yZWdZID0gdGhpcy5sYWJlbC5nZXRCb3VuZHMoKS5oZWlnaHQgLyAyO1xuICAgIHRoaXMubGFiZWwubW91c2VFbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmxhYmVsKTtcbiAgfVxuICBjaGFuZ2VMYWJlbChsYWJlbCkge1xuICAgIHRoaXMubGFiZWwuZ290b0FuZFN0b3AobGFiZWwpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTaGFkb3dPdmVybGF5IGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnNoYWRvdyA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICAgIHRoaXMuc2hhZG93LmdyYXBoaWNzLmJlZ2luRmlsbCgncmdiYSgwLCAwLCAwLCAwLjYpJykuZHJhd1JlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICB0aGlzLnNoYWRvd1RleHQgPSBuZXcgY3JlYXRlanMuVGV4dCgnJywgJzI1cHggR3VlcmlsbGEnLCAnI2ZmZicpO1xuICAgIHRoaXMuc2hhZG93VGV4dC55ID0gaGVpZ2h0IC8gMjtcbiAgICB0aGlzLnNoYWRvd1RleHQueCA9IHdpZHRoIC8gMjtcbiAgICB0aGlzLnNoYWRvd1RleHQudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgdGhpcy5zaGFkb3dUZXh0LnRleHRCYXNlbGluZSA9ICdtaWRkbGUnO1xuXG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLnNoYWRvdywgdGhpcy5zaGFkb3dUZXh0KTtcbiAgICAvLyB0b2RvXG4gICAgLy8gdGhpcy5jYWNoZSgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgfVxuICBzZXRUZXh0KHRleHQpIHtcbiAgICB0aGlzLnNoYWRvd1RleHQudGV4dCA9IHRleHQ7XG4gICAgLy8gdGhpcy51cGRhdGVDYWNoZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3Bpa2UgZXh0ZW5kcyBjcmVhdGVqcy5CaXRtYXAge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihhc3NldHNNYW5hZ2VyLmdldFJlc3VsdCgnc3Bpa2UnKSk7XG5cbiAgICB0aGlzLmJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCk7XG4gICAgdGhpcy5yZWdYID0gdGhpcy5ib3VuZHMud2lkdGggLyAyO1xuICAgIHRoaXMucmVnWSA9IHRoaXMuYm91bmRzLmhlaWdodDtcbiAgfVxufVxuIiwiY29uc3QgbWFuaWZlc3QgPSBbXG4gIHsgaWQ6ICdtb25zdGVyJywgc3JjOiAnaW1nL21vbnN0ZXItc3ByaXRlLnBuZycgfSxcbiAgLy8geyBpZDogJ2JpcmQnLCBzcmM6ICdpbWcvYmlyZC1zcHJpdGUucG5nJyB9LFxuICAvLyB7IGlkOiAnY2hpY2tlbicsIHNyYzogJ2ltZy9jaGlja2VuLXNwcml0ZS5wbmcnIH0sXG4gIHsgaWQ6ICdzcGlrZScsIHNyYzogJ2ltZy9zcGlrZS5wbmcnIH0sXG4gIHsgaWQ6ICdza3knLCBzcmM6ICdpbWcvYmcvc2t5LnBuZycgfSxcbiAgeyBpZDogJ3N0YXJ0Jywgc3JjOiAnaW1nL2JnL3N0YXJ0LnBuZycgfSxcbiAgeyBpZDogJ21vdW50YWluJywgc3JjOiAnaW1nL2JnL21vdW50YWluLnBuZycgfSxcbiAgeyBpZDogJ2dyb3VuZCcsIHNyYzogJ2ltZy9iZy9ncm91bmQucG5nJyB9LFxuICB7IGlkOiAnYnRuJywgc3JjOiAnaW1nL2J0bi1zcHJpdGUucG5nJyB9LFxuICB7IGlkOiAnaWNvbi1idG4nLCBzcmM6ICdpbWcvaWNvbi1idG4tc3ByaXRlLnBuZycgfSxcbiAgeyBpZDogJ2ljb24nLCBzcmM6ICdpbWcvaWNvbi1zcHJpdGUucG5nJyB9LFxuICB7IGlkOiAnYmFjaycsIHNyYzogJ3NvdW5kL2JhY2tncm91bmQub2dnJyB9LFxuICB7IGlkOiAnZmxhcCcsIHNyYzogJ3NvdW5kL2ZsYXAub2dnJyB9LFxuICB7IGlkOiAnbG9vc2UnLCBzcmM6ICdzb3VuZC9sb29zZS5vZ2cnIH0sXG5dO1xuXG5jb25zdCBnZXRIZXJvU3ByaXRlU2hlZXREYXRhID0gbmFtZSA9PiAoe1xuICBpbWFnZXM6IFtuYW1lXSxcbiAgZnJhbWVzOiB7IHdpZHRoOiAxMDAsIGhlaWdodDogNzggfSxcbiAgYW5pbWF0aW9uczoge1xuICAgIGZseTogMCxcbiAgICBmbGFwOiBbMSwgMywgJ2ZseSddLFxuICAgIGRlYWQ6IDQsXG4gIH0sXG59KTtcblxuY29uc3Qgc3ByaXRlU2hlZXRzRGF0YSA9IHtcbiAgYmlyZDogZ2V0SGVyb1Nwcml0ZVNoZWV0RGF0YSgnYmlyZCcpLFxuICBtb25zdGVyOiBnZXRIZXJvU3ByaXRlU2hlZXREYXRhKCdtb25zdGVyJyksXG4gIGNoaWNrZW46IGdldEhlcm9TcHJpdGVTaGVldERhdGEoJ2NoaWNrZW4nKSxcbiAgYnRuOiB7XG4gICAgaW1hZ2VzOiBbJ2J0biddLFxuICAgIGZyYW1lczogeyB3aWR0aDogMjEwLCBoZWlnaHQ6IDY5LCBzcGFjaW5nOiAyIH0sXG4gICAgYW5pbWF0aW9uczoge1xuICAgICAgZ3JlZW5PdXQ6IDAsXG4gICAgICBncmVlbk92ZXI6IDIsXG4gICAgICBncmVlbkRvd246IDQsXG4gICAgICBvcmFuZ2VPdXQ6IDYsXG4gICAgICBvcmFuZ2VPdmVyOiA4LFxuICAgICAgb3JhbmdlRG93bjogMSxcbiAgICAgIHJlZE91dDogMyxcbiAgICAgIHJlZE92ZXI6IDUsXG4gICAgICByZWREb3duOiA3LFxuICAgICAgZGlzYWJsZTogOSxcbiAgICB9LFxuICB9LFxuICBpY29uQnRuOiB7XG4gICAgaW1hZ2VzOiBbJ2ljb24tYnRuJ10sXG4gICAgZnJhbWVzOiB7IHdpZHRoOiA2OSwgaGVpZ2h0OiA3MSwgc3BhY2luZzogMiB9LFxuICAgIGFuaW1hdGlvbnM6IHtcbiAgICAgIGdyZWVuT3V0OiAwLFxuICAgICAgZ3JlZW5PdmVyOiAxLFxuICAgICAgZ3JlZW5Eb3duOiAyLFxuICAgICAgb3JhbmdlT3V0OiAzLFxuICAgICAgb3JhbmdlT3ZlcjogNCxcbiAgICAgIG9yYW5nZURvd246IDUsXG4gICAgICByZWRPdXQ6IDgsXG4gICAgICByZWRPdmVyOiA3LFxuICAgICAgcmVkRG93bjogNixcbiAgICAgIGRpc2FibGU6IDksXG4gICAgfSxcbiAgfSxcbiAgaWNvbjoge1xuICAgIGltYWdlczogWydpY29uJ10sXG4gICAgZnJhbWVzOiB7IHdpZHRoOiA0MCwgaGVpZ2h0OiA0MCB9LFxuICAgIGFuaW1hdGlvbnM6IHtcbiAgICAgIHNvdW5kOiAwLFxuICAgICAgc291bmRPZmY6IDEsXG4gICAgICByYXRpbmc6IDIsXG4gICAgICBtZW51OiAzLFxuICAgIH0sXG4gIH0sXG59O1xuXG5jb25zdCBzcHJpdGVTaGVldHMgPSB7fTtcblxuY29uc3QgYXNzZXRzTWFuYWdlciA9IHtcbiAgaW5pdCgpIHtcbiAgICBjcmVhdGVqcy5Tb3VuZC5hbHRlcm5hdGVFeHRlbnNpb25zID0gWydtcDMnXTtcbiAgICB0aGlzLnF1ZXVlID0gbmV3IGNyZWF0ZWpzLkxvYWRRdWV1ZSgpO1xuICAgIHRoaXMucXVldWUuaW5zdGFsbFBsdWdpbihjcmVhdGVqcy5Tb3VuZCk7XG4gICAgdGhpcy5xdWV1ZS5sb2FkTWFuaWZlc3QobWFuaWZlc3QpO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMucXVldWUuYWRkRXZlbnRMaXN0ZW5lcignY29tcGxldGUnLCAoKSA9PiByZXNvbHZlKCkpO1xuICAgICAgdGhpcy5xdWV1ZS5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsICgpID0+IHJlamVjdCgpKTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0UmVzdWx0KG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5xdWV1ZS5nZXRSZXN1bHQobmFtZSk7XG4gIH0sXG4gIGdldFNwcml0ZVNoZWV0KG5hbWUpIHtcbiAgICBpZiAoIXNwcml0ZVNoZWV0c1tuYW1lXSkge1xuICAgICAgY29uc3QgZGF0YSA9IHNwcml0ZVNoZWV0c0RhdGFbbmFtZV07XG5cbiAgICAgIGlmICghZGF0YSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgc3ByaXRlU2hlZXQgbmFtZScpO1xuICAgICAgfVxuXG4gICAgICBkYXRhLmltYWdlcyA9IGRhdGEuaW1hZ2VzLm1hcChpbWcgPT4gdGhpcy5nZXRSZXN1bHQoaW1nKSk7XG4gICAgICBzcHJpdGVTaGVldHNbbmFtZV0gPSBuZXcgY3JlYXRlanMuU3ByaXRlU2hlZXQoZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNwcml0ZVNoZWV0c1tuYW1lXTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFzc2V0c01hbmFnZXI7XG4iLCJjb25zdCBkYXRhTWFuYWdlciA9IHtcbiAgZ2FtZVR5cGU6IG51bGwsXG4gIHNjb3JlOiBudWxsLFxuICBtYXhTY29yZTogbnVsbCxcbiAgaGVyb1R5cGU6ICdtb25zdGVyJyxcbiAgcG9zOiBudWxsLFxuICB3aW46IG51bGwsXG4gIHNwaWtlczogbnVsbCxcbiAgYWN0aW9uczogbnVsbCxcbiAgZW5lbXlBY3Rpb25zOiBudWxsLFxuICB1c2VyOiB7XG4gICAgaWQ6IG51bGwsXG4gICAgbmFtZTogbnVsbCxcbiAgICBzZXg6IG51bGwsXG4gIH0sXG4gIGVuZW15OiBudWxsLFxuICBmaWVsZHM6IHtcbiAgICBub3JtYWw6IFtbMCwgOTldLCBbMTAwLCAxOTldXSxcbiAgfSxcbiAgc2V0KGtleSwgdmFsdWUpIHtcbiAgICB0aGlzW2tleV0gPSB2YWx1ZTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRhdGFNYW5hZ2VyO1xuIiwiaW1wb3J0IFN0YXJ0U2NyZWVuIGZyb20gJy4uL3NjcmVlbnMvU3RhcnRTY3JlZW4nO1xuaW1wb3J0IE1haW5TY3JlZW4gZnJvbSAnLi4vc2NyZWVucy9NYWluU2NyZWVuJztcbmltcG9ydCBQVlBTY3JlZW4gZnJvbSAnLi4vc2NyZWVucy9QVlBTY3JlZW4nO1xuaW1wb3J0IEVuZFNjcmVlbiBmcm9tICcuLi9zY3JlZW5zL0VuZFNjcmVlbic7XG5pbXBvcnQgUmF0aW5nU2NyZWVuIGZyb20gJy4uL3NjcmVlbnMvUmF0aW5nU2NyZWVuJztcblxuY29uc3Qgc2NyZWVuTWFuYWdlciA9IHtcbiAgaW5pdChzdGFnZSkge1xuICAgIHRoaXMuc3RhZ2UgPSBzdGFnZTtcbiAgICB0aGlzLmN1cnJlbnRTY3JlZW4gPSBudWxsO1xuICAgIHRoaXMuc2NyZWVucyA9IHtcbiAgICAgIFN0YXJ0U2NyZWVuLFxuICAgICAgTWFpblNjcmVlbixcbiAgICAgIFBWUFNjcmVlbixcbiAgICAgIEVuZFNjcmVlbixcbiAgICAgIFJhdGluZ1NjcmVlbixcbiAgICB9O1xuXG4gICAgY3JlYXRlanMuVGlja2VyLnRpbWluZ01vZGUgPSBjcmVhdGVqcy5UaWNrZXIuUkFGO1xuICAgIGNyZWF0ZWpzLlRpY2tlci5hZGRFdmVudExpc3RlbmVyKCd0aWNrJywgZSA9PiB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50U2NyZWVuICYmIHRoaXMuY3VycmVudFNjcmVlbi50aWNrKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFNjcmVlbi50aWNrKGUpO1xuICAgICAgfVxuICAgICAgdGhpcy5zdGFnZS51cGRhdGUoZSk7XG4gICAgfSk7XG4gIH0sXG4gIGNoYW5nZShuYW1lKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudFNjcmVlbikge1xuICAgICAgaWYgKHRoaXMuY3VycmVudFNjcmVlbi5kZXN0cm95KSB7XG4gICAgICAgIHRoaXMuY3VycmVudFNjcmVlbi5kZXN0cm95KCk7XG4gICAgICB9XG4gICAgICB0aGlzLnN0YWdlLnJlbW92ZUNoaWxkKHRoaXMuY3VycmVudFNjcmVlbik7XG4gICAgfVxuICAgIHRoaXMuY3VycmVudFNjcmVlbiA9IG5ldyB0aGlzLnNjcmVlbnNbbmFtZV0odGhpcy5zdGFnZS5jYW52YXMud2lkdGgsIHRoaXMuc3RhZ2UuY2FudmFzLmhlaWdodCk7XG4gICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmN1cnJlbnRTY3JlZW4pO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgc2NyZWVuTWFuYWdlcjtcbiIsImNvbnN0IHNlcnZlck1hbmFnZXIgPSB7XG4gIGluaXQoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IFZLLmluaXQoXG4gICAgICAoKSA9PiByZXNvbHZlKCksXG4gICAgICBlID0+IHJlamVjdCgndmsgaW5pdCBlcnJvcicsIGUpLFxuICAgICc1LjYwJykpO1xuICB9LFxuICBnZXRVc2VyKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBWSy5hcGkoJ3VzZXJzLmdldCcsIHsgZmllbGRzOiAnc2V4JyB9LCByID0+IHtcbiAgICAgICAgaWYgKHIuZXJyb3IpIHtcbiAgICAgICAgICByZWplY3Qoci5lcnJvcik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUoci5yZXNwb25zZVswXSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0KGtleSwgZ2xvYmFsID0gMCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IFZLLmFwaSgnc3RvcmFnZS5nZXQnLCB7IGtleSwgZ2xvYmFsIH0sIHJlc29sdmUpKVxuICAgICAgLnRoZW4ociA9PiB7XG4gICAgICAgIGlmIChyLmVycm9yKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHIuZXJyb3IpO1xuICAgICAgICB9IGVsc2UgaWYgKHIucmVzcG9uc2UgPT09ICcnKSB7XG4gICAgICAgICAgLy8gY2FudCBKU09OLnBhcnNlIGVtcHR5IHN0cmluZyBidXQgbmVlZCB0byBnZXQgZGVmYXVsdCB2YWx1ZVxuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShyLnJlc3BvbnNlKTtcbiAgICAgIH0pO1xuICB9LFxuICBzZXQoa2V5LCB2YWx1ZSwgZ2xvYmFsID0gMCkge1xuICAgIFZLLmFwaSgnc3RvcmFnZS5zZXQnLCB7IGtleSwgdmFsdWU6IEpTT04uc3RyaW5naWZ5KHZhbHVlKSwgZ2xvYmFsIH0pO1xuICB9LFxuICBzaGFyZShzY29yZSwgc2V4ID0gMikge1xuICAgIFZLLmFwaSgnd2FsbC5wb3N0Jywge1xuICAgICAgbWVzc2FnZTogYNCvINC/0YDQvtC70LXRgtC10Lske3NleCAhPT0gMiA/ICfQsCcgOiAnJ30gJHtzY29yZX0g0Lwg0LIg0LjQs9GA0LUgRmxhcHB5IE1vbnN0ZXIhXG4gICAgICAgICAgICAgICAgQSDRgdC60L7Qu9GM0LrQviDRgdC80L7QttC10YjRjCDRgtGLP2AsXG4gICAgICBhdHRhY2htZW50czogJ3Bob3RvLTEzNTU2MzM4OF80NTYyMzkwMTcsIGh0dHBzOi8vdmsuY29tL2FwcDU3ODIxMTgnLFxuICAgICAgc2VydmljZXM6ICd0d2l0dGVyJyxcbiAgICB9KTtcbiAgfSxcbiAgaW52aXRlKCkge1xuICAgIFZLLmNhbGxNZXRob2QoJ3Nob3dJbnZpdGVCb3gnKTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNlcnZlck1hbmFnZXI7XG4iLCJjb25zdCBzb3VuZE1hbmFnZXIgPSB7XG4gIGluaXQoZW5hYmxlKSB7XG4gICAgdGhpcy5lbmFibGVkID0gZW5hYmxlO1xuICAgIHRoaXMuYmcgPSBjcmVhdGVqcy5Tb3VuZC5wbGF5KCdiYWNrJywgeyBsb29wOiAtMSwgdm9sdW1lOiAwLjMgfSk7XG4gICAgdGhpcy5iZy5wYXVzZWQgPSAhdGhpcy5lbmFibGVkO1xuICAgIC8vIHNvbWV0aW1lcyBuZWdhdGl2ZSB2YWx1ZSBvY2N1cnMgYW5kIHRocm93IGVycm9yXG4gICAgdGhpcy5iZy5wb3NpdGlvbiA9IDA7XG4gIH0sXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzLmVuYWJsZWQgPSAhdGhpcy5lbmFibGVkO1xuICAgIHRoaXMuYmcucGF1c2VkID0gIXRoaXMuZW5hYmxlZDtcbiAgfSxcbiAgaXNFbmFibGVkKCkge1xuICAgIHJldHVybiB0aGlzLmVuYWJsZWQ7XG4gIH0sXG4gIHBsYXkoc291bmQpIHtcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7XG4gICAgICBjcmVhdGVqcy5Tb3VuZC5wbGF5KHNvdW5kKTtcbiAgICB9XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBzb3VuZE1hbmFnZXI7XG4iLCJpbXBvcnQgcmFuZG9tSW50IGZyb20gJ3JhbmRvbS1pbnQnO1xuaW1wb3J0IGFzc2V0c01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvYXNzZXRzTWFuYWdlcic7XG5pbXBvcnQgc2NyZWVuc01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc2NyZWVuc01hbmFnZXInO1xuaW1wb3J0IHNlcnZlck1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc2VydmVyTWFuYWdlcic7XG5pbXBvcnQgZGF0YU1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvZGF0YU1hbmFnZXInO1xuaW1wb3J0IEd1aSBmcm9tICcuLi9kaXNwbGF5L0d1aSc7XG5pbXBvcnQgQnRuIGZyb20gJy4uL2Rpc3BsYXkvQnRuJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW5kU2NyZWVuIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3Iod2lkdGgpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5iZyA9IG5ldyBjcmVhdGVqcy5CaXRtYXAoYXNzZXRzTWFuYWdlci5nZXRSZXN1bHQoJ3N0YXJ0JykpO1xuICAgIHRoaXMuZ3VpID0gbmV3IEd1aSh3aWR0aCk7XG5cbiAgICB0aGlzLm1heFNjb3JlID0gbmV3IGNyZWF0ZWpzLlRleHQoYNCg0LXQutC+0YDQtDogJHtkYXRhTWFuYWdlci5tYXhTY29yZX0g0LxgLCAnMjVweCBHdWVyaWxsYScsICcjMDAwJyk7XG4gICAgdGhpcy5tYXhTY29yZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICB0aGlzLm1heFNjb3JlLnggPSB3aWR0aCAvIDI7XG4gICAgdGhpcy5tYXhTY29yZS55ID0gNDA7XG5cbiAgICB0aGlzLnNjb3JlID0gbmV3IGNyZWF0ZWpzLlRleHQoYNCg0LXQt9GD0LvRjNGC0LDRgjogJHtkYXRhTWFuYWdlci5zY29yZX0g0LxgLCAnNDBweCBHdWVyaWxsYScsICcjMDAwJyk7XG4gICAgdGhpcy5zY29yZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICB0aGlzLnNjb3JlLnggPSB3aWR0aCAvIDI7XG4gICAgdGhpcy5zY29yZS55ID0gMTUwO1xuXG4gICAgdGhpcy5yZXBsYXlCdG4gPSBuZXcgQnRuKCfQldGJ0LUg0YDQsNC3Jyk7XG4gICAgdGhpcy5yZXBsYXlCdG4ueCA9IHdpZHRoIC8gMjtcbiAgICB0aGlzLnJlcGxheUJ0bi55ID0gMzUwO1xuXG4gICAgdGhpcy5zaGFyZUJ0biA9IG5ldyBCdG4oJ9Cf0L7QtNC10LvQuNGC0YzRgdGPJywgJ29yYW5nZScpO1xuICAgIHRoaXMuc2hhcmVCdG4ueCA9IHdpZHRoIC8gMjtcbiAgICB0aGlzLnNoYXJlQnRuLnkgPSA0NDA7XG5cbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuYmcsIHRoaXMuZ3VpLCB0aGlzLm1heFNjb3JlLCB0aGlzLnNjb3JlLCB0aGlzLnJlcGxheUJ0biwgdGhpcy5zaGFyZUJ0bik7XG5cbiAgICBpZiAoZGF0YU1hbmFnZXIuc2NvcmUgPiBkYXRhTWFuYWdlci5tYXhTY29yZSkge1xuICAgICAgdGhpcy5tYXhTY29yZS50ZXh0ID0gYNCf0YDQvtGI0LvRi9C5INGA0LXQutC+0YDQtDogJHtkYXRhTWFuYWdlci5tYXhTY29yZX0g0LxgO1xuICAgICAgZGF0YU1hbmFnZXIubWF4U2NvcmUgPSBkYXRhTWFuYWdlci5zY29yZTtcbiAgICAgIHNlcnZlck1hbmFnZXIuc2V0KCdtYXhTY29yZScsIGRhdGFNYW5hZ2VyLm1heFNjb3JlKTtcbiAgICAgIHRoaXMuc2NvcmUudGV4dCA9IGDQndC+0LLRi9C5INGA0LXQutC+0YDQtDogJHtkYXRhTWFuYWdlci5tYXhTY29yZX0g0LwhYDtcblxuICAgICAgc2VydmVyTWFuYWdlci5nZXQoJ3JhdGluZ1RhYmxlJywgMSkudGhlbihyZWNhbGNSYXRpbmdUYWJsZSk7XG4gICAgfVxuXG4gICAgaWYgKGRhdGFNYW5hZ2VyLmdhbWVUeXBlID09PSAncHZwJykge1xuICAgICAgY29uc3QgZW5lbXkgPSBkYXRhTWFuYWdlci5lbmVteTtcbiAgICAgIHRoaXMucHZwVGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KCcnLCAnMjVweCBHdWVyaWxsYScsICcjMDAwJyk7XG4gICAgICB0aGlzLnB2cFRleHQudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICB0aGlzLnB2cFRleHQueCA9IHdpZHRoIC8gMjtcbiAgICAgIHRoaXMucHZwVGV4dC55ID0gMjMwO1xuICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLnB2cFRleHQpO1xuXG4gICAgICBpZiAoZGF0YU1hbmFnZXIud2luKSB7XG4gICAgICAgIHRoaXMucHZwVGV4dC50ZXh0ICs9IGAke2VuZW15Lm5hbWV9INCx0YvQuyR7ZW5lbXkuc2V4ICE9PSAyID8gJ9CwJyA6ICcnfSDQv9C+0LLQtdGA0LbQtdC9JHtlbmVteS5zZXggIT09IDIgPyAn0LAnIDogJyd9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucHZwVGV4dC50ZXh0ICs9IGAke2VuZW15Lm5hbWV9INC/0L7QstC10YDQsyR7ZW5lbXkuc2V4ICE9PSAyID8gJ9C70LAnIDogJyd9INCS0LDRgWA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcmFuZ2UgPSBkYXRhTWFuYWdlci5maWVsZHMubm9ybWFsW2RhdGFNYW5hZ2VyLnBvc107XG4gICAgY29uc3QgZmllbGQgPSBgcHZwJHtyYW5kb21JbnQocmFuZ2VbMF0sIHJhbmdlWzFdKX1gO1xuICAgIGNvbnN0IHJlY29yZCA9IHtcbiAgICAgIHVzZXI6IGRhdGFNYW5hZ2VyLnVzZXIsXG4gICAgICBzcGlrZXM6IGRhdGFNYW5hZ2VyLnNwaWtlcyxcbiAgICAgIGFjdGlvbnM6IGRhdGFNYW5hZ2VyLmFjdGlvbnMsXG4gICAgfTtcblxuICAgIHNlcnZlck1hbmFnZXIuZ2V0KGZpZWxkLCAxKS50aGVuKHIgPT4ge1xuICAgICAgY29uc29sZS53YXJuKGZpZWxkKTtcbiAgICAgIGNvbnNvbGUud2FybihyZWNvcmQpO1xuICAgICAgY29uc29sZS53YXJuKHIpO1xuICAgICAgY29uc29sZS53YXJuKHIuc3Bpa2VzLmxlbmd0aCAqIDAuNSA8IHJlY29yZC5zcGlrZXMubGVuZ3RoKTtcbiAgICAgIGlmIChyLnNwaWtlcy5sZW5ndGggKiAwLjUgPCByZWNvcmQuc3Bpa2VzLmxlbmd0aCAmJlxuICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHJlY29yZCkubGVuZ3RoIDwgNDA5Nikge1xuICAgICAgICBzZXJ2ZXJNYW5hZ2VyLnNldChmaWVsZCwgcmVjb3JkLCAxKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICB9XG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy5yZXBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZXBsYXkpO1xuICAgIHRoaXMuc2hhcmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzZXJ2ZXJNYW5hZ2VyLnNoYXJlKGRhdGFNYW5hZ2VyLnNjb3JlLCBkYXRhTWFuYWdlci51c2VyLnNleCkpO1xuXG4gICAgdGhpcy5vbktleURvd24gPSBlID0+IHtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDMyKSB7XG4gICAgICAgIHJlcGxheSgpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlEb3duKTtcbiAgfVxuICBkZXN0cm95KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd24pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlcGxheSgpIHtcbiAgc3dpdGNoIChkYXRhTWFuYWdlci5nYW1lVHlwZSkge1xuICAgIGNhc2UgJ3NpbmdsZSc6XG4gICAgICBzY3JlZW5zTWFuYWdlci5jaGFuZ2UoJ01haW5TY3JlZW4nKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3B2cCc6XG4gICAgICBzY3JlZW5zTWFuYWdlci5jaGFuZ2UoJ1BWUFNjcmVlbicpO1xuICAgICAgYnJlYWs7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVjYWxjUmF0aW5nVGFibGUocmF0aW5nVGFibGUpIHtcbiAgaWYgKHJhdGluZ1RhYmxlW3JhdGluZ1RhYmxlLmxlbmd0aCAtIDFdLnNjb3JlID49IGRhdGFNYW5hZ2VyLm1heFNjb3JlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgdXNlclJhdGluZyA9IHJhdGluZ1RhYmxlLmZpbmQoZWwgPT4gZWwuaWQgPT09IGRhdGFNYW5hZ2VyLnVzZXIuaWQpO1xuXG4gIGlmICh1c2VyUmF0aW5nKSB7XG4gICAgdXNlclJhdGluZy5zY29yZSA9IGRhdGFNYW5hZ2VyLm1heFNjb3JlO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IG5ld1JhdGluZyA9IHtcbiAgICAgIGlkOiBkYXRhTWFuYWdlci51c2VyLmlkLFxuICAgICAgbmFtZTogZGF0YU1hbmFnZXIudXNlci5uYW1lLFxuICAgICAgc2NvcmU6IGRhdGFNYW5hZ2VyLm1heFNjb3JlLFxuICAgIH07XG4gICAgaWYgKHJhdGluZ1RhYmxlLmxlbmd0aCA8IDEwKSB7XG4gICAgICByYXRpbmdUYWJsZS5wdXNoKG5ld1JhdGluZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJhdGluZ1RhYmxlW3JhdGluZ1RhYmxlLmxlbmd0aCAtIDFdID0gbmV3UmF0aW5nO1xuICAgIH1cbiAgfVxuXG4gIHJhdGluZ1RhYmxlLnNvcnQoKGEsIGIpID0+IGIuc2NvcmUgLSBhLnNjb3JlKTtcbiAgc2VydmVyTWFuYWdlci5zZXQoJ3JhdGluZ1RhYmxlJywgcmF0aW5nVGFibGUsIDEpO1xufVxuIiwiaW1wb3J0IHNjcmVlbnNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NjcmVlbnNNYW5hZ2VyJztcbmltcG9ydCBkYXRhTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9kYXRhTWFuYWdlcic7XG5pbXBvcnQgQmFja2dyb3VuZCBmcm9tICcuLi9kaXNwbGF5L0JhY2tncm91bmQnO1xuaW1wb3J0IEhlcm8gZnJvbSAnLi4vZGlzcGxheS9IZXJvJztcbmltcG9ydCBTcGlrZSBmcm9tICcuLi9kaXNwbGF5L1NwaWtlJztcbmltcG9ydCBTaGFkb3dPdmVybGF5IGZyb20gJy4uL2Rpc3BsYXkvU2hhZG93T3ZlcmxheSc7XG5cbmNvbnN0IEdST1VORF9IRUlHSFQgPSA4MDtcbmNvbnN0IFNUQVJUX1NQRUVEID0gNTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpblNjcmVlbiBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgdGhpcy5zcGVlZCA9IFNUQVJUX1NQRUVEO1xuICAgIHRoaXMuc3RlcCA9IDA7XG4gICAgdGhpcy5kaXN0YW5jZSA9IDA7XG4gICAgdGhpcy5zaGFkb3dPdmVybGF5ID0gbmV3IFNoYWRvd092ZXJsYXkodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuXG4gICAgZGF0YU1hbmFnZXIuZ2FtZVR5cGUgPSAnc2luZ2xlJztcbiAgICBkYXRhTWFuYWdlci5hY3Rpb25zID0ge307XG4gICAgZGF0YU1hbmFnZXIuc3Bpa2VzID0gW107XG4gICAgZGF0YU1hbmFnZXIucG9zID0gMDtcblxuICAgIHRoaXMuY3JlYXRlQmcoKTtcbiAgICB0aGlzLmNyZWF0ZVNwaWtlcygpO1xuICAgIHRoaXMuY3JlYXRlSGVybygpO1xuICAgIHRoaXMuY3JlYXRlSHVkKCk7XG5cbiAgICB0aGlzLnBhdXNlKCfQn9GA0L7QsdC10LsgLSDQstC30LzQsNGFINC60YDRi9C70YzRj9C80LgsIGVzYyAtINC/0LDRg9C30LAnKTtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgfVxuICBjcmVhdGVCZygpIHtcbiAgICB0aGlzLmJnU2t5ID0gbmV3IEJhY2tncm91bmQoJ3NreScsIHRoaXMud2lkdGgpO1xuICAgIHRoaXMuYmdNb3VudGFpbiA9IG5ldyBCYWNrZ3JvdW5kKCdtb3VudGFpbicsIHRoaXMud2lkdGgpO1xuICAgIHRoaXMuYmdHcm91bmQgPSBuZXcgQmFja2dyb3VuZCgnZ3JvdW5kJywgdGhpcy53aWR0aCk7XG4gICAgdGhpcy5iZ1NreS55ID0gdGhpcy5iZ01vdW50YWluLnkgPSB0aGlzLmJnR3JvdW5kLnkgPSB0aGlzLmhlaWdodDtcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuYmdTa3ksIHRoaXMuYmdNb3VudGFpbiwgdGhpcy5iZ0dyb3VuZCk7XG4gIH1cbiAgY3JlYXRlU3Bpa2VzKCkge1xuICAgIHRoaXMuc3Bpa2VzID0gW25ldyBTcGlrZSgpLCBuZXcgU3Bpa2UoKV07XG4gICAgdGhpcy5zcGlrZXNbMF0ueCA9IC10aGlzLnNwaWtlc1swXS5ib3VuZHMud2lkdGggLyAyO1xuICAgIHRoaXMuc3Bpa2VzWzFdLnggPSB0aGlzLndpZHRoIC8gMjtcbiAgICB0aGlzLnNwaWtlcy5mb3JFYWNoKHNwaWtlID0+IHRoaXMucmVzZXRTcGlrZShzcGlrZSkpO1xuICAgIHRoaXMuYWRkQ2hpbGQoLi4udGhpcy5zcGlrZXMpO1xuICB9XG4gIGNyZWF0ZUhlcm8oKSB7XG4gICAgdGhpcy5oZXJvID0gbmV3IEhlcm8oZGF0YU1hbmFnZXIuaGVyb1R5cGUpO1xuICAgIHRoaXMuaGVyby54ID0gdGhpcy53aWR0aCAvIDI7XG4gICAgdGhpcy5oZXJvLnkgPSAxOTA7XG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmhlcm8pO1xuICB9XG4gIGNyZWF0ZUh1ZCgpIHtcbiAgICB0aGlzLmh1ZERpc3RhbmNlID0gbmV3IGNyZWF0ZWpzLlRleHQoJzAg0LwnLCAnMjVweCBHdWVyaWxsYScsICcjMDAwJyk7XG4gICAgdGhpcy5odWREaXN0YW5jZS54ID0gMjA7XG4gICAgdGhpcy5odWREaXN0YW5jZS55ID0gMTU7XG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmh1ZERpc3RhbmNlKTtcbiAgfVxuICByZXNldFNwaWtlKHNwaWtlKSB7XG4gICAgc3Bpa2Uuc2NhbGVZID0gKygwLjcgKyBNYXRoLnJhbmRvbSgpICogMC40NSkudG9GaXhlZCgyKTtcbiAgICBzcGlrZS54ICs9IHRoaXMud2lkdGggKyBzcGlrZS5ib3VuZHMud2lkdGg7XG4gICAgaWYgKE1hdGgucmFuZG9tKCkgPiAwLjUpIHtcbiAgICAgIHNwaWtlLnkgPSB0aGlzLmhlaWdodCAtIEdST1VORF9IRUlHSFQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNwaWtlLnkgPSAwO1xuICAgICAgc3Bpa2Uuc2NhbGVZID0gLXNwaWtlLnNjYWxlWTtcbiAgICB9XG4gICAgZGF0YU1hbmFnZXIuc3Bpa2VzLnB1c2goc3Bpa2Uuc2NhbGVZKTtcbiAgfVxuICBwYXVzZSh0ZXh0KSB7XG4gICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuICAgIHRoaXMuc2hhZG93T3ZlcmxheS5zZXRUZXh0KHRleHQpO1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5zaGFkb3dPdmVybGF5KTtcbiAgfVxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmhhbmRsZUFjdGlvbigpKTtcbiAgICB0aGlzLm9uS2V5RG93biA9IGUgPT4ge1xuICAgICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSAzMjpcbiAgICAgICAgICB0aGlzLmhhbmRsZUFjdGlvbigpO1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyNzpcbiAgICAgICAgICB0aGlzLnRvZ2dsZVBhdXNlKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd24pO1xuICB9XG4gIGhhbmRsZUFjdGlvbigpIHtcbiAgICBpZiAodGhpcy5wYXVzZWQpIHtcbiAgICAgIHRoaXMudG9nZ2xlUGF1c2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oZXJvLmZsYXAoKTtcbiAgICAgIGRhdGFNYW5hZ2VyLmFjdGlvbnNbdGhpcy5zdGVwXSA9IDE7XG4gICAgfVxuICB9XG4gIHRvZ2dsZVBhdXNlKCkge1xuICAgIGlmICh0aGlzLnBhdXNlZCkge1xuICAgICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5zaGFkb3dPdmVybGF5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYXVzZSgn0J3QsNC20LzQuNGC0LUg0L/RgNC+0LHQtdC7INC40LvQuCBlc2MnKTtcbiAgICB9XG4gIH1cbiAgbW92ZVdvcmxkKCkge1xuICAgIGlmICh0aGlzLmhlcm8uZGVhZCkge1xuICAgICAgdGhpcy5oZXJvLnggKz0gdGhpcy5zcGVlZCAqIDAuNTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb3ZlU3Bpa2VzKHRoaXMuc3BlZWQpO1xuICAgICAgdGhpcy5iZ1NreS5tb3ZlKHRoaXMuc3BlZWQgKiAwLjEpO1xuICAgICAgdGhpcy5iZ01vdW50YWluLm1vdmUodGhpcy5zcGVlZCAqIDAuMyk7XG4gICAgICB0aGlzLmJnR3JvdW5kLm1vdmUodGhpcy5zcGVlZCk7XG5cbiAgICAgIHRoaXMuZGlzdGFuY2UgKz0gdGhpcy5zcGVlZDtcbiAgICAgIGRhdGFNYW5hZ2VyLnNjb3JlID0gTWF0aC5mbG9vcih0aGlzLmRpc3RhbmNlIC8gMjUpO1xuICAgICAgdGhpcy5odWREaXN0YW5jZS50ZXh0ID0gYCR7ZGF0YU1hbmFnZXIuc2NvcmV9INC8YDtcbiAgICB9XG4gIH1cbiAgbW92ZVNwaWtlcygpIHtcbiAgICB0aGlzLnNwaWtlcy5mb3JFYWNoKHNwaWtlID0+IHtcbiAgICAgIHNwaWtlLnggLT0gdGhpcy5zcGVlZDtcbiAgICAgIGlmIChzcGlrZS54IDwgLXNwaWtlLmJvdW5kcy53aWR0aCAvIDIpIHtcbiAgICAgICAgdGhpcy5yZXNldFNwaWtlKHNwaWtlKTtcbiAgICAgICAgdGhpcy5zcGVlZCArPSAwLjA0O1xuICAgICAgfVxuICAgICAgaWYgKG5kZ21yLmNoZWNrUGl4ZWxDb2xsaXNpb24odGhpcy5oZXJvLCBzcGlrZSkpIHtcbiAgICAgICAgdGhpcy5oZXJvLmRpZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIG1vdmVIZXJvKCkge1xuICAgIHRoaXMuaGVyby5tb3ZlKCk7XG4gICAgaWYgKHRoaXMuaGVyby55IDwgMCkge1xuICAgICAgdGhpcy5oZXJvLnZZID0gMDtcbiAgICAgIHRoaXMuaGVyby55ID0gMDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaGVyby55ID4gdGhpcy5oZWlnaHQgKyB0aGlzLmhlcm8uYm91bmRzLmhlaWdodCAvIDIpIHtcbiAgICAgIHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnRW5kU2NyZWVuJyk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmhlcm8ueSA+IHRoaXMuaGVpZ2h0IC0gKEdST1VORF9IRUlHSFQgKyB0aGlzLmhlcm8uYm91bmRzLmhlaWdodCAvIDIpKSB7XG4gICAgICB0aGlzLmhlcm8uZGllKCk7XG4gICAgfVxuICB9XG4gIHRpY2soKSB7XG4gICAgaWYgKHRoaXMucGF1c2VkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMubW92ZVdvcmxkKCk7XG4gICAgdGhpcy5tb3ZlSGVybygpO1xuICAgIHRoaXMuc3RlcCArPSAxO1xuICB9XG4gIGRlc3Ryb3koKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bik7XG4gIH1cbn1cbiIsImltcG9ydCByYW5kb21JbnQgZnJvbSAncmFuZG9tLWludCc7XG5pbXBvcnQgc2NyZWVuc01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc2NyZWVuc01hbmFnZXInO1xuaW1wb3J0IHNlcnZlck1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc2VydmVyTWFuYWdlcic7XG5pbXBvcnQgZGF0YU1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvZGF0YU1hbmFnZXInO1xuaW1wb3J0IEJhY2tncm91bmQgZnJvbSAnLi4vZGlzcGxheS9CYWNrZ3JvdW5kJztcbmltcG9ydCBIZXJvIGZyb20gJy4uL2Rpc3BsYXkvSGVybyc7XG5pbXBvcnQgU3Bpa2UgZnJvbSAnLi4vZGlzcGxheS9TcGlrZSc7XG5pbXBvcnQgQnRuIGZyb20gJy4uL2Rpc3BsYXkvQnRuJztcblxuY29uc3QgR1JPVU5EX0hFSUdIVCA9IDgwO1xuY29uc3QgU1RBUlRfU1BFRUQgPSA1O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluU2NyZWVuIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICB0aGlzLnNwZWVkID0gU1RBUlRfU1BFRUQ7XG4gICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG5cbiAgICB0aGlzLmNyZWF0ZUJnKCk7XG5cbiAgICBjb25zdCB3YXRpbmdUZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoJ9CY0LTQtdGCINC/0L7QtNCx0L7RgCDRgdC+0L/QtdGA0L3QuNC60LAnLCAnMzVweCBHdWVyaWxsYScsICcjMDAwJyk7XG4gICAgd2F0aW5nVGV4dC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICB3YXRpbmdUZXh0LnggPSB3aWR0aCAvIDI7XG4gICAgd2F0aW5nVGV4dC55ID0gMTcwO1xuXG4gICAgY29uc3QgY2FuY2VsQnRuID0gbmV3IEJ0bign0J7RgtC80LXQvdCwJywgJ29yYW5nZScpO1xuICAgIGNhbmNlbEJ0bi54ID0gd2lkdGggLyAyO1xuICAgIGNhbmNlbEJ0bi55ID0gMzQwO1xuICAgIGNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNjcmVlbnNNYW5hZ2VyLmNoYW5nZSgnU3RhcnRTY3JlZW4nKSk7XG5cbiAgICB0aGlzLmFkZENoaWxkKHdhdGluZ1RleHQsIGNhbmNlbEJ0bik7XG5cbiAgICBkYXRhTWFuYWdlci5wb3MgPSByYW5kb21JbnQoMSk7XG4gICAgY29uc3QgZW5lbXlSYW5nZSA9IGRhdGFNYW5hZ2VyLmZpZWxkcy5ub3JtYWxbMSAtIGRhdGFNYW5hZ2VyLnBvc107XG4gICAgY29uc3QgZW5lbXlGaWVsZCA9IGBwdnAke3JhbmRvbUludChlbmVteVJhbmdlWzBdLCBlbmVteVJhbmdlWzFdKX1gO1xuICAgIGNvbnNvbGUud2FybihlbmVteUZpZWxkKTtcblxuICAgIFByb21pc2UuYWxsKFtcbiAgICAgIHNlcnZlck1hbmFnZXIuZ2V0KGVuZW15RmllbGQsIDEpLnRoZW4ociA9PiB0aGlzLmluaXREYXRhKHIpKSxcbiAgICAgIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBNYXRoLnJhbmRvbSgpICogMjAwMCArIDUwMCkpLFxuICAgIF0pLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5pbml0KCk7XG4gICAgICB0aGlzLnJlbW92ZUNoaWxkKHdhdGluZ1RleHQsIGNhbmNlbEJ0bik7XG4gICAgfSkuY2F0Y2goZSA9PiB7XG4gICAgICB3YXRpbmdUZXh0LnRleHQgPSAnUFZQINCy0YDQtdC80LXQvdC90L4g0L3QtdC00L7RgdGC0YPQv9C90L4gOignO1xuICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICB9KTtcblxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICB9XG4gIGluaXREYXRhKHJlY29yZCkge1xuICAgIGRhdGFNYW5hZ2VyLmdhbWVUeXBlID0gJ3B2cCc7XG4gICAgZGF0YU1hbmFnZXIud2luID0gZmFsc2U7XG4gICAgZGF0YU1hbmFnZXIuYWN0aW9ucyA9IHt9O1xuICAgIGRhdGFNYW5hZ2VyLnNwaWtlcyA9IHJlY29yZC5zcGlrZXM7XG4gICAgZGF0YU1hbmFnZXIuZW5lbXlBY3Rpb25zID0gcmVjb3JkLmFjdGlvbnM7XG4gICAgZGF0YU1hbmFnZXIuZW5lbXkgPSByZWNvcmQudXNlcjtcbiAgICBpZiAoZGF0YU1hbmFnZXIudXNlci5pZCA9PT0gcmVjb3JkLnVzZXIuaWQpIHtcbiAgICAgIGRhdGFNYW5hZ2VyLmVuZW15Lm5hbWUgPSAn0J/RgNC40LfRgNCw0YfQvdGL0Lkg0L/RgtC40YYnO1xuICAgIH1cbiAgfVxuICBpbml0KCkge1xuICAgIHRoaXMuc3Bpa2VJbmRleCA9IDA7XG4gICAgdGhpcy5zdGVwID0gMDtcbiAgICB0aGlzLmRpc3RhbmNlID0gMDtcblxuICAgIHRoaXMuY3JlYXRlU3Bpa2VzKCk7XG4gICAgdGhpcy5jcmVhdGVIdWQoKTtcblxuICAgIGNvbnN0IGNvdW50ZXIgPSBuZXcgY3JlYXRlanMuVGV4dCgzLCAnMTI1cHggR3VlcmlsbGEnLCAnIzAwMCcpO1xuICAgIGNvdW50ZXIudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgY291bnRlci54ID0gdGhpcy53aWR0aCAvIDI7XG4gICAgY291bnRlci55ID0gMzEwO1xuXG4gICAgdGhpcy5hZGRDaGlsZChjb3VudGVyKTtcblxuICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgY291bnRlci50ZXh0IC09IDE7XG4gICAgICBpZiAoY291bnRlci50ZXh0IDwgMCkge1xuICAgICAgICB0aGlzLnJlbW92ZUNoaWxkKGNvdW50ZXIpO1xuICAgICAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgIH1cbiAgICB9LCAxMDAwKTtcblxuICAgIHRoaXMuaGVybyA9IHRoaXMuY3JlYXRlSGVybyhkYXRhTWFuYWdlci5wb3MsIGRhdGFNYW5hZ2VyLnVzZXIubmFtZSk7XG4gICAgdGhpcy5lbmVteSA9IHRoaXMuY3JlYXRlSGVybygxIC0gZGF0YU1hbmFnZXIucG9zLCBkYXRhTWFuYWdlci5lbmVteS5uYW1lKTtcbiAgICB0aGlzLmVuZW15LmFscGhhID0gMC41O1xuICB9XG4gIGNyZWF0ZUJnKCkge1xuICAgIHRoaXMuYmdTa3kgPSBuZXcgQmFja2dyb3VuZCgnc2t5JywgdGhpcy53aWR0aCk7XG4gICAgdGhpcy5iZ01vdW50YWluID0gbmV3IEJhY2tncm91bmQoJ21vdW50YWluJywgdGhpcy53aWR0aCk7XG4gICAgdGhpcy5iZ0dyb3VuZCA9IG5ldyBCYWNrZ3JvdW5kKCdncm91bmQnLCB0aGlzLndpZHRoKTtcbiAgICB0aGlzLmJnU2t5LnkgPSB0aGlzLmJnTW91bnRhaW4ueSA9IHRoaXMuYmdHcm91bmQueSA9IHRoaXMuaGVpZ2h0O1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5iZ1NreSwgdGhpcy5iZ01vdW50YWluLCB0aGlzLmJnR3JvdW5kKTtcbiAgfVxuICBjcmVhdGVTcGlrZXMoKSB7XG4gICAgdGhpcy5zcGlrZXMgPSBbbmV3IFNwaWtlKCksIG5ldyBTcGlrZSgpXTtcbiAgICB0aGlzLnNwaWtlc1swXS54ID0gLXRoaXMuc3Bpa2VzWzBdLmJvdW5kcy53aWR0aCAvIDI7XG4gICAgdGhpcy5zcGlrZXNbMV0ueCA9IHRoaXMud2lkdGggLyAyO1xuICAgIHRoaXMuc3Bpa2VzLmZvckVhY2goc3Bpa2UgPT4gdGhpcy5yZXNldFNwaWtlKHNwaWtlKSk7XG4gICAgdGhpcy5hZGRDaGlsZCguLi50aGlzLnNwaWtlcyk7XG4gIH1cbiAgY3JlYXRlSGVybyhwb3MsIG5hbWUpIHtcbiAgICBjb25zdCBoZXJvID0gbmV3IEhlcm8oZGF0YU1hbmFnZXIuaGVyb1R5cGUpO1xuICAgIGhlcm8ueCA9IHRoaXMud2lkdGggLyAyIC0gMTgwICogcG9zO1xuICAgIGhlcm8ueSA9IDE5MCAtIDUwICogcG9zO1xuXG4gICAgY29uc3QgaGVyb05hbWUgPSBuZXcgY3JlYXRlanMuVGV4dChuYW1lLCAnMjVweCBHdWVyaWxsYScsICcjMDAwJyk7XG4gICAgaGVyb05hbWUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgaGVyb05hbWUueSA9IGhlcm8ueSAtIDEwMDtcbiAgICBoZXJvTmFtZS54ID0gaGVyby54O1xuICAgIHRoaXMuYWRkQ2hpbGQoaGVybywgaGVyb05hbWUpO1xuXG4gICAgY3JlYXRlanMuVHdlZW4uZ2V0KGhlcm9OYW1lKS53YWl0KDI0MDApLnRvKHsgYWxwaGE6IDAgfSwgODAwKVxuICAgICAgLmNhbGwoKCkgPT4gdGhpcy5yZW1vdmVDaGlsZChoZXJvTmFtZSkpO1xuXG4gICAgcmV0dXJuIGhlcm87XG4gIH1cbiAgY3JlYXRlSHVkKCkge1xuICAgIHRoaXMuaHVkRGlzdGFuY2UgPSBuZXcgY3JlYXRlanMuVGV4dCgnMCDQvCcsICcyNXB4IEd1ZXJpbGxhJywgJyMwMDAnKTtcbiAgICB0aGlzLmh1ZERpc3RhbmNlLnggPSAyMDtcbiAgICB0aGlzLmh1ZERpc3RhbmNlLnkgPSAxNTtcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuaHVkRGlzdGFuY2UpO1xuICB9XG4gIHJlc2V0U3Bpa2Uoc3Bpa2UpIHtcbiAgICBzcGlrZS54ICs9IHRoaXMud2lkdGggKyBzcGlrZS5ib3VuZHMud2lkdGg7XG5cbiAgICBpZiAoZGF0YU1hbmFnZXIuc3Bpa2VzW3RoaXMuc3Bpa2VJbmRleF0pIHtcbiAgICAgIHNwaWtlLnNjYWxlWSA9IGRhdGFNYW5hZ2VyLnNwaWtlc1t0aGlzLnNwaWtlSW5kZXhdO1xuICAgICAgdGhpcy5zcGlrZUluZGV4ICs9IDE7XG5cbiAgICAgIGlmIChzcGlrZS5zY2FsZVkgPiAwKSB7XG4gICAgICAgIHNwaWtlLnkgPSB0aGlzLmhlaWdodCAtIEdST1VORF9IRUlHSFQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzcGlrZS55ID0gMDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3Bpa2Uuc2NhbGVZID0gKygwLjcgKyBNYXRoLnJhbmRvbSgpICogMC40NSkudG9GaXhlZCgyKTtcbiAgICAgIGlmIChNYXRoLnJhbmRvbSgpID4gMC41KSB7XG4gICAgICAgIHNwaWtlLnkgPSB0aGlzLmhlaWdodCAtIEdST1VORF9IRUlHSFQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzcGlrZS55ID0gMDtcbiAgICAgICAgc3Bpa2Uuc2NhbGVZID0gLXNwaWtlLnNjYWxlWTtcbiAgICAgIH1cbiAgICAgIGRhdGFNYW5hZ2VyLnNwaWtlcy5wdXNoKHNwaWtlLnNjYWxlWSk7XG4gICAgfVxuICB9XG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuaGFuZGxlQWN0aW9uKCkpO1xuICAgIHRoaXMub25LZXlEb3duID0gZSA9PiB7XG4gICAgICB0aGlzLmhhbmRsZUFjdGlvbigpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlEb3duKTtcbiAgfVxuICBoYW5kbGVBY3Rpb24oKSB7XG4gICAgaWYgKCF0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5oZXJvLmZsYXAoKTtcbiAgICBkYXRhTWFuYWdlci5hY3Rpb25zW3RoaXMuc3RlcF0gPSAxO1xuICB9XG4gIG1vdmVXb3JsZCgpIHtcbiAgICB0aGlzLm1vdmVTcGlrZXModGhpcy5zcGVlZCk7XG4gICAgdGhpcy5iZ1NreS5tb3ZlKHRoaXMuc3BlZWQgKiAwLjEpO1xuICAgIHRoaXMuYmdNb3VudGFpbi5tb3ZlKHRoaXMuc3BlZWQgKiAwLjMpO1xuICAgIHRoaXMuYmdHcm91bmQubW92ZSh0aGlzLnNwZWVkKTtcblxuICAgIHRoaXMuZGlzdGFuY2UgKz0gdGhpcy5zcGVlZDtcbiAgICBkYXRhTWFuYWdlci5zY29yZSA9IE1hdGguZmxvb3IodGhpcy5kaXN0YW5jZSAvIDI1KTtcbiAgICB0aGlzLmh1ZERpc3RhbmNlLnRleHQgPSBgJHtkYXRhTWFuYWdlci5zY29yZX0g0LxgO1xuICB9XG4gIG1vdmVTcGlrZXMoKSB7XG4gICAgdGhpcy5zcGlrZXMuZm9yRWFjaChzcGlrZSA9PiB7XG4gICAgICBzcGlrZS54IC09IHRoaXMuc3BlZWQ7XG4gICAgICBpZiAoc3Bpa2UueCA8IC1zcGlrZS5ib3VuZHMud2lkdGggLyAyKSB7XG4gICAgICAgIHRoaXMucmVzZXRTcGlrZShzcGlrZSk7XG4gICAgICAgIHRoaXMuc3BlZWQgKz0gMC4wNDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBtb3ZlSGVybyhoZXJvKSB7XG4gICAgaGVyby5tb3ZlKCk7XG4gICAgaWYgKGhlcm8ueSA8IDApIHtcbiAgICAgIGhlcm8udlkgPSAwO1xuICAgICAgaGVyby55ID0gMDtcbiAgICB9IGVsc2UgaWYgKGhlcm8ueSA+IHRoaXMuaGVpZ2h0ICsgaGVyby5ib3VuZHMuaGVpZ2h0IC8gMikge1xuICAgICAgaWYgKGhlcm8gPT09IHRoaXMuaGVybykge1xuICAgICAgICBzY3JlZW5zTWFuYWdlci5jaGFuZ2UoJ0VuZFNjcmVlbicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF0YU1hbmFnZXIud2luID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGhlcm8ueSA+IHRoaXMuaGVpZ2h0IC0gKEdST1VORF9IRUlHSFQgKyBoZXJvLmJvdW5kcy5oZWlnaHQgLyAyKSkge1xuICAgICAgaGVyby5kaWUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc3Bpa2VzLnNvbWUoc3Bpa2UgPT4gbmRnbXIuY2hlY2tQaXhlbENvbGxpc2lvbihoZXJvLCBzcGlrZSkpKSB7XG4gICAgICBoZXJvLmRpZSgpO1xuICAgIH1cbiAgfVxuICB0aWNrKCkge1xuICAgIGlmICghdGhpcy5zdGFydGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMubW92ZVdvcmxkKCk7XG4gICAgdGhpcy5tb3ZlSGVybyh0aGlzLmhlcm8pO1xuICAgIHRoaXMubW92ZUhlcm8odGhpcy5lbmVteSk7XG5cbiAgICB0aGlzLnN0ZXAgKz0gMTtcbiAgICBpZiAoZGF0YU1hbmFnZXIuZW5lbXlBY3Rpb25zW3RoaXMuc3RlcF0pIHtcbiAgICAgIHRoaXMuZW5lbXkuZmxhcCgpO1xuICAgIH1cbiAgfVxuICBkZXN0cm95KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd24pO1xuICB9XG59XG4iLCJpbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcbmltcG9ydCBkYXRhTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9kYXRhTWFuYWdlcic7XG5pbXBvcnQgc2VydmVyTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zZXJ2ZXJNYW5hZ2VyJztcbmltcG9ydCBHdWkgZnJvbSAnLi4vZGlzcGxheS9HdWknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYXRpbmdTY3JlZW4gZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuICBjb25zdHJ1Y3Rvcih3aWR0aCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG5cbiAgICB0aGlzLmJnID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChhc3NldHNNYW5hZ2VyLmdldFJlc3VsdCgnc3RhcnQnKSk7XG4gICAgdGhpcy5ndWkgPSBuZXcgR3VpKHdpZHRoKTtcblxuICAgIHRoaXMudGl0bGUgPSBuZXcgY3JlYXRlanMuVGV4dCgn0KDQtdC50YLQuNC90LMnLCAnMzVweCBHdWVyaWxsYScsICcjMDAwJyk7XG4gICAgdGhpcy50aXRsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICB0aGlzLnRpdGxlLnggPSB0aGlzLndpZHRoIC8gMjtcbiAgICB0aGlzLnRpdGxlLnkgPSAzNTtcblxuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5iZywgdGhpcy5ndWksIHRoaXMudGl0bGUpO1xuXG4gICAgc2VydmVyTWFuYWdlci5nZXQoJ3JhdGluZ1RhYmxlJywgMSlcbiAgICAgIC8vIHRvZG86IHJlbW92ZSBsYXRlciwgbm93IGl0IGFkZCByZWNvcmRzIGZvciBvbGQgdXNlcnNcbiAgICAgIC50aGVuKHJlY2FsY1JhdGluZ1RhYmxlKVxuICAgICAgLnRoZW4ociA9PiB0aGlzLnNob3dSYXRpbmcocikpXG4gICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICBjb25zdCB0ZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoJ9Cg0LXQudGC0LjQvdCzINCy0YDQtdC80LXQvdC90L4g0L3QtdC00L7RgdGC0YPQv9C10L0gOignLCAnMjVweCBHdWVyaWxsYScsICcjMDAwJyk7XG4gICAgICAgIHRleHQudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgIHRleHQueCA9IHRoaXMud2lkdGggLyAyO1xuICAgICAgICB0ZXh0LnkgPSAxNTA7XG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGV4dCk7XG4gICAgICB9KTtcbiAgfVxuICBzaG93UmF0aW5nKHJhdGluZ1RhYmxlKSB7XG4gICAgbGV0IHdpbm5lciA9IGZhbHNlO1xuXG4gICAgcmF0aW5nVGFibGUuZm9yRWFjaCgoZWwsIGkpID0+IHtcbiAgICAgIGNvbnN0IHRleHQgPSBuZXcgY3JlYXRlanMuVGV4dChgJHtpICsgMX0gJHtlbC5uYW1lfSAke2VsLnNjb3JlfSDQvGAsICcyNXB4IEd1ZXJpbGxhJywgJyMwMDAnKTtcbiAgICAgIHRleHQueSA9IDEyMCArIGkgKiA0MDtcbiAgICAgIHRleHQueCA9IDEyMDtcbiAgICAgIHRoaXMuYWRkQ2hpbGQodGV4dCk7XG5cbiAgICAgIGlmIChlbC5pZCA9PT0gZGF0YU1hbmFnZXIudXNlci5pZCkge1xuICAgICAgICB3aW5uZXIgPSB0cnVlO1xuICAgICAgICB0ZXh0LmNvbG9yID0gJyM3RUNFMkUnO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKCF3aW5uZXIpIHtcbiAgICAgIGNvbnN0IHRleHQgPSBuZXcgY3JlYXRlanMuVGV4dChgLSAke2RhdGFNYW5hZ2VyLnVzZXIubmFtZX0gJHtkYXRhTWFuYWdlci5tYXhTY29yZX0g0LxgLCAnMjVweCBHdWVyaWxsYScsICcjN0VDRTJFJyk7XG4gICAgICB0ZXh0LnkgPSAxMjAgKyByYXRpbmdUYWJsZS5sZW5ndGggKiA0MDtcbiAgICAgIHRleHQueCA9IDEyMDtcbiAgICAgIHRoaXMuYWRkQ2hpbGQodGV4dCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlY2FsY1JhdGluZ1RhYmxlKHJhdGluZ1RhYmxlKSB7XG4gIGlmIChyYXRpbmdUYWJsZVtyYXRpbmdUYWJsZS5sZW5ndGggLSAxXS5zY29yZSA8IGRhdGFNYW5hZ2VyLm1heFNjb3JlKSB7XG4gICAgY29uc3QgdXNlclJhdGluZyA9IHJhdGluZ1RhYmxlLmZpbmQoZWwgPT4gZWwuaWQgPT09IGRhdGFNYW5hZ2VyLnVzZXIuaWQpO1xuXG4gICAgaWYgKHVzZXJSYXRpbmcpIHtcbiAgICAgIHVzZXJSYXRpbmcuc2NvcmUgPSBkYXRhTWFuYWdlci5tYXhTY29yZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbmV3UmF0aW5nID0ge1xuICAgICAgICBpZDogZGF0YU1hbmFnZXIudXNlci5pZCxcbiAgICAgICAgbmFtZTogZGF0YU1hbmFnZXIudXNlci5uYW1lLFxuICAgICAgICBzY29yZTogZGF0YU1hbmFnZXIubWF4U2NvcmUsXG4gICAgICB9O1xuICAgICAgaWYgKHJhdGluZ1RhYmxlLmxlbmd0aCA8IDEwKSB7XG4gICAgICAgIHJhdGluZ1RhYmxlLnB1c2gobmV3UmF0aW5nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJhdGluZ1RhYmxlW3JhdGluZ1RhYmxlLmxlbmd0aCAtIDFdID0gbmV3UmF0aW5nO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJhdGluZ1RhYmxlLnNvcnQoKGEsIGIpID0+IGIuc2NvcmUgLSBhLnNjb3JlKTtcbiAgICBzZXJ2ZXJNYW5hZ2VyLnNldCgncmF0aW5nVGFibGUnLCByYXRpbmdUYWJsZSwgMSk7XG4gIH1cbiAgcmV0dXJuIHJhdGluZ1RhYmxlO1xufVxuIiwiaW1wb3J0IHNlcnZlck1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc2VydmVyTWFuYWdlcic7XG5pbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcbmltcG9ydCBzY3JlZW5zTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zY3JlZW5zTWFuYWdlcic7XG5pbXBvcnQgZGF0YU1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvZGF0YU1hbmFnZXInO1xuaW1wb3J0IEd1aSBmcm9tICcuLi9kaXNwbGF5L0d1aSc7XG5pbXBvcnQgSGVybyBmcm9tICcuLi9kaXNwbGF5L0hlcm8nO1xuaW1wb3J0IEJ0biBmcm9tICcuLi9kaXNwbGF5L0J0bic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXJ0U2NyZWVuIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICB0aGlzLmJnID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChhc3NldHNNYW5hZ2VyLmdldFJlc3VsdCgnc3RhcnQnKSk7XG4gICAgdGhpcy5ndWkgPSBuZXcgR3VpKHdpZHRoKTtcblxuICAgIHRoaXMuc3RhcnRCdG4gPSBuZXcgQnRuKCfQmNCz0YDQsNGC0YwnKTtcbiAgICB0aGlzLnN0YXJ0QnRuLnggPSB3aWR0aCAvIDI7XG4gICAgdGhpcy5zdGFydEJ0bi55ID0gMzIwO1xuXG4gICAgdGhpcy5wdnBCdG4gPSBuZXcgQnRuKCdQVlAnKTtcbiAgICB0aGlzLnB2cEJ0bi54ID0gd2lkdGggLyAyO1xuICAgIHRoaXMucHZwQnRuLnkgPSA0MTA7XG5cbiAgICB0aGlzLmludml0ZUJ0biA9IG5ldyBCdG4oJ9Cf0L7Qt9Cy0LDRgtGMINCx0YDQvicsICdvcmFuZ2UnKTtcbiAgICB0aGlzLmludml0ZUJ0bi54ID0gd2lkdGggLyAyO1xuICAgIHRoaXMuaW52aXRlQnRuLnkgPSA1MDA7XG5cbiAgICB0aGlzLmhlcm8gPSBuZXcgSGVybygnbW9uc3RlcicpO1xuICAgIHRoaXMuaGVyby54ID0gd2lkdGggLyAyO1xuICAgIHRoaXMuaGVyby55ID0gMTkwO1xuXG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmJnLCB0aGlzLmd1aSwgdGhpcy5oZXJvLCB0aGlzLnN0YXJ0QnRuLCB0aGlzLnB2cEJ0biwgdGhpcy5pbnZpdGVCdG4pO1xuXG4gICAgaWYgKGRhdGFNYW5hZ2VyLm1heFNjb3JlKSB7XG4gICAgICB0aGlzLnNjb3JlID0gbmV3IGNyZWF0ZWpzLlRleHQoYNCg0LXQutC+0YDQtDogJHtkYXRhTWFuYWdlci5tYXhTY29yZX0g0LxgLCAnMjVweCBHdWVyaWxsYScsICcjMDAwJyk7XG4gICAgICB0aGlzLnNjb3JlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgdGhpcy5zY29yZS54ID0gdGhpcy53aWR0aCAvIDI7XG4gICAgICB0aGlzLnNjb3JlLnkgPSA0MDtcbiAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5zY29yZSk7XG4gICAgfVxuXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gIH1cbiAgLy8gY3JlYXRlSGVyb2VzKCkge1xuICAvLyAgIHRoaXMuaGVyb2VzID0gW1xuICAvLyAgICAgbmV3IEhlcm8oJ2JpcmQnKSxcbiAgLy8gICAgIG5ldyBIZXJvKCdtb25zdGVyJyksXG4gIC8vICAgICBuZXcgSGVybygnY2hpY2tlbicpLFxuICAvLyAgIF07XG4gIC8vICAgdGhpcy5oZXJvZXMuZm9yRWFjaCgoaGVybywgaSkgPT4ge1xuICAvLyAgICAgaGVyby55ID0gdGhpcy5oZWlnaHQgLyAyO1xuICAvLyAgICAgaGVyby54ID0gKGkgKyAxKSAqIHRoaXMud2lkdGggLyAodGhpcy5oZXJvZXMubGVuZ3RoICsgMSk7XG4gIC8vICAgICBoZXJvLmN1cnNvciA9ICdwb2ludGVyJztcbiAgLy8gICAgIGhlcm8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnNlbGVjdEhlcm8oaGVybykpO1xuICAvLyAgICAgaGVyby5jYWNoZSgwLCAwLCBoZXJvLmJvdW5kcy53aWR0aCwgaGVyby5ib3VuZHMuaGVpZ2h0KTtcbiAgLy8gICB9KTtcbiAgLy8gICB0aGlzLmhlcm9GaWx0ZXIgPSBuZXcgY3JlYXRlanMuQ29sb3JGaWx0ZXIoMC42LCAwLjYsIDAuNik7XG4gIC8vICAgdGhpcy5yZXNldEhlcm9lcygpO1xuICAvLyAgIHRoaXMuYWRkQ2hpbGQoLi4udGhpcy5oZXJvZXMpO1xuICAvLyB9XG4gIC8vIHJlc2V0SGVyb2VzKCkge1xuICAvLyAgIHRoaXMuaGVyb2VzLmZvckVhY2goaGVybyA9PiB7XG4gIC8vICAgICBoZXJvLmZpbHRlcnMgPSBbdGhpcy5oZXJvRmlsdGVyXTtcbiAgLy8gICAgIGhlcm8udXBkYXRlQ2FjaGUoKTtcbiAgLy8gICAgIGhlcm8uc2NhbGVYID0gMC44NTtcbiAgLy8gICAgIGhlcm8uc2NhbGVZID0gMC44NTtcbiAgLy8gICB9KTtcbiAgLy8gfVxuICAvLyBzZWxlY3RIZXJvKGhlcm8pIHtcbiAgLy8gICB0aGlzLnJlc2V0SGVyb2VzKCk7XG5cbiAgLy8gICBoZXJvLmZpbHRlcnMgPSBbXTtcbiAgLy8gICBoZXJvLnVwZGF0ZUNhY2hlKCk7XG4gIC8vICAgaGVyby5zY2FsZVggPSAxO1xuICAvLyAgIGhlcm8uc2NhbGVZID0gMTtcbiAgLy8gICBoZXJvLmZsYXAoKTtcblxuICAvLyAgIGlmICghdGhpcy5zdGFydEJ0bi5lbmFibGVkKSB7XG4gIC8vICAgICB0aGlzLnN0YXJ0QnRuLmVuYWJsZSgpO1xuICAvLyAgIH1cblxuICAvLyAgIGRhdGFNYW5hZ2VyLmhlcm9UeXBlID0gaGVyby50eXBlO1xuICAvLyB9XG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy5zdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+XG4gICAgICBzY3JlZW5zTWFuYWdlci5jaGFuZ2UoJ01haW5TY3JlZW4nKSk7XG4gICAgdGhpcy5wdnBCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PlxuICAgICAgc2NyZWVuc01hbmFnZXIuY2hhbmdlKCdQVlBTY3JlZW4nKSk7XG4gICAgdGhpcy5pbnZpdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PlxuICAgICAgc2VydmVyTWFuYWdlci5pbnZpdGUoKSk7XG5cbiAgICB0aGlzLm9uS2V5RG93biA9IGUgPT4ge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMzIpIHtcbiAgICAgICAgc2NyZWVuc01hbmFnZXIuY2hhbmdlKCdNYWluU2NyZWVuJyk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bik7XG4gIH1cbiAgZGVzdHJveSgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlEb3duKTtcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobWluLCBtYXgpIHtcblx0aWYgKG1heCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0bWF4ID0gbWluO1xuXHRcdG1pbiA9IDA7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1pbiAhPT0gJ251bWJlcicgfHwgdHlwZW9mIG1heCAhPT0gJ251bWJlcicpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhbGwgYXJndW1lbnRzIHRvIGJlIG51bWJlcnMnKTtcblx0fVxuXG5cdHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pO1xufTtcbiJdfQ==
