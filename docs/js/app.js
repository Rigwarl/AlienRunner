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
      _this.pvpText = new createjs.Text('', '25px Guerilla', '#000');
      _this.pvpText.textAlign = 'center';
      _this.pvpText.x = width / 2;
      _this.pvpText.y = 230;
      _this.addChild(_this.pvpText);

      if (_dataManager2.default.win) {
        _this.pvpText.text += _dataManager2.default.enemy.name + ' был' + (_dataManager2.default.enemy.sex !== 2 ? 'а' : '') + ' повержен' + (_dataManager2.default.enemy.sex !== 2 ? 'а' : '');
      } else {
        _this.pvpText.text += _dataManager2.default.enemy.name + ' поверг' + (_dataManager2.default.enemy.sex !== 2 ? 'ла' : '') + ' Вас';
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
      message = 'Я пролетел' + (_dataManager2.default.user.sex !== 2 ? 'а' : '') + ' ' + _dataManager2.default.score + ' м в игре Flappy Monster!';
      if (_dataManager2.default.score === _dataManager2.default.maxScore) {
        message += '\nЭто мой новый рекорд! ';
      }
      message += '\nА сколько сможешь ты?';
      break;
    case 'pvp':
      if (_dataManager2.default.win) {
        message += _dataManager2.default.enemy.name + ' был' + (_dataManager2.default.enemy.sex !== 2 ? 'а' : '') + ' повержен' + (_dataManager2.default.enemy.sex !== 2 ? 'а' : '') + ' мной в игре Flappy Monster!';
      } else {
        message += _dataManager2.default.enemy.name + ' поверг' + (_dataManager2.default.enemy.sex !== 2 ? 'ла' : '') + ' меня в игре Flappy Monster,\n                   ну ничего, еще увидимся...';
      }
      if (_dataManager2.default.score === _dataManager2.default.maxScore) {
        message += '\nМой новый рекорд ' + _dataManager2.default.score + ' м!';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvc3JjL2FwcC5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9CYWNrZ3JvdW5kLmpzIiwiYXBwL2pzL3NyYy9kaXNwbGF5L0J0bi5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9HdWkuanMiLCJhcHAvanMvc3JjL2Rpc3BsYXkvSGVyby5qcyIsImFwcC9qcy9zcmMvZGlzcGxheS9JY29uQnRuLmpzIiwiYXBwL2pzL3NyYy9kaXNwbGF5L1NoYWRvd092ZXJsYXkuanMiLCJhcHAvanMvc3JjL2Rpc3BsYXkvU3Bpa2UuanMiLCJhcHAvanMvc3JjL21hbmFnZXJzL2Fzc2V0c01hbmFnZXIuanMiLCJhcHAvanMvc3JjL21hbmFnZXJzL2RhdGFNYW5hZ2VyLmpzIiwiYXBwL2pzL3NyYy9tYW5hZ2Vycy9zY3JlZW5zTWFuYWdlci5qcyIsImFwcC9qcy9zcmMvbWFuYWdlcnMvc2VydmVyTWFuYWdlci5qcyIsImFwcC9qcy9zcmMvbWFuYWdlcnMvc291bmRNYW5hZ2VyLmpzIiwiYXBwL2pzL3NyYy9zY3JlZW5zL0VuZFNjcmVlbi5qcyIsImFwcC9qcy9zcmMvc2NyZWVucy9NYWluU2NyZWVuLmpzIiwiYXBwL2pzL3NyYy9zY3JlZW5zL1BWUFNjcmVlbi5qcyIsImFwcC9qcy9zcmMvc2NyZWVucy9SYXRpbmdTY3JlZW4uanMiLCJhcHAvanMvc3JjL3NjcmVlbnMvU3RhcnRTY3JlZW4uanMiLCJub2RlX21vZHVsZXMvcmFuZG9tLWludC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsUUFBUSxHQUFSLENBQVksQ0FDVix3QkFBYyxJQUFkLEVBRFUsRUFFVix3QkFBYyxJQUFkLEVBRlUsQ0FBWixFQUlHLElBSkgsQ0FJUTtBQUFBLFNBQU0sUUFBUSxHQUFSLENBQVksQ0FDdEIsd0JBQWMs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Ozs7aUNBQ2E7QUFDWCxXQUFLLFFBQUwsQ0FBYyxnQkFBZCxDQUErQixPQUEvQixFQUF3QztBQUFBLGVBQ3RDLHlCQUFlLE1BQWYsQ0FBc0IsWUFBdEIsQ0FEc0M7QUFBQSxPQUF4QztBQUVBLFdBQUssTUFBTCxDQUFZLGdCQUFaLENBQTZCLE9BQTdCLEVBQXNDO0FBQUEsZUFDcEMseUJBQWUsTUFBZixDQUFzQixXQUF0QixDQURvQztBQUFBLE9BQXRDO0FBRUEsV0FBSyxTQUFMLENBQWUsZ0JBQWYsQ0FBZ0MsT0FBaEMsRUFBeUM7QUFBQSxlQUN2Qyx3QkFBYyxNQUFkLEVBRHVDO0FBQUEsT0FBekM7O0FBR0EsV0FBSyxTQUFMLEdBQWlCLGFBQUs7QUFDcEIsWUFBSSxFQUFFLE9BQUYsS0FBYyxFQUFsQixFQUFzQjtBQUNwQixtQ0FBZSxNQUFmLENBQXNCLFlBQXRCO0FBQ0EsWUFBRSxjQUFGO0FBQ0Q7QUFDRixPQUxEOztBQU9BLGFBQU8sZ0JBQVAsQ0FBd0IsU0FBeEIsRUFBbUMsS0FBSyxTQUF4QztBQUNEOzs7OEJBQ1M7QUFDUixhQUFPLG1CQUFQLENBQTJCLFNBQTNCLEVBQXNDLEtBQUssU0FBM0M7QUFDRDs7OztFQWpHc0MsU0FBUyxTOztrQkFBN0IsVzs7O0FDUnJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHNjcmVlbnNNYW5hZ2VyIGZyb20gJy4vbWFuYWdlcnMvc2NyZWVuc01hbmFnZXInO1xuaW1wb3J0IGFzc2V0c01hbmFnZXIgZnJvbSAnLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcbmltcG9ydCBzZXJ2ZXJNYW5hZ2VyIGZyb20gJy4vbWFuYWdlcnMvc2VydmVyTWFuYWdlcic7XG5pbXBvcnQgc291bmRNYW5hZ2VyIGZyb20gJy4vbWFuYWdlcnMvc291bmRNYW5hZ2VyJztcbmltcG9ydCBkYXRhTWFuYWdlciBmcm9tICcuL21hbmFnZXJzL2RhdGFNYW5hZ2VyJztcblxuUHJvbWlzZS5hbGwoW1xuICBhc3NldHNNYW5hZ2VyLmluaXQoKSxcbiAgc2VydmVyTWFuYWdlci5pbml0KCksXG5dKVxuICAudGhlbigoKSA9PiBQcm9taXNlLmFsbChbXG4gICAgc2VydmVyTWFuYWdlci5nZXRVc2VyKCkudGhlbih1c2VyID0+IGRhdGFNYW5hZ2VyLnNldCgndXNlcicsIHtcbiAgICAgIGlkOiB1c2VyLmlkLFxuICAgICAgbmFtZTogYCR7dXNlci5maXJzdF9uYW1lfSAke3VzZXIubGFzdF9uYW1lfWAsXG4gICAgICBzZXg6IHVzZXIuc2V4LFxuICAgIH0pKSxcbiAgICBzZXJ2ZXJNYW5hZ2VyLmdldCgnbWF4U2NvcmUnKS50aGVuKHIgPT4gZGF0YU1hbmFnZXIuc2V0KCdtYXhTY29yZScsICtyKSksXG4gICAgc2VydmVyTWFuYWdlci5nZXQoJ3NvdW5kJykudGhlbihyID0+IHNvdW5kTWFuYWdlci5pbml0KHIgPT09ICcnID8gdHJ1ZSA6ICEhcikpLFxuICBdKSlcbiAgLnRoZW4oKCkgPT4gc2NyZWVuc01hbmFnZXIuY2hhbmdlKCdTdGFydFNjcmVlbicpKVxuICAuY2F0Y2goZSA9PiBjb25zb2xlLmVycm9yKCdpbml0IGVycm9yLCByZWxvYWQgcGFnZScsIGUpKTtcblxuY29uc3Qgc3RhZ2UgPSBuZXcgY3JlYXRlanMuU3RhZ2UoJ2dhbWUtc3RhZ2UnKTtcbnNjcmVlbnNNYW5hZ2VyLmluaXQoc3RhZ2UpO1xuXG5pZiAoY3JlYXRlanMuVG91Y2guaXNTdXBwb3J0ZWQoKSkge1xuICBjcmVhdGVqcy5Ub3VjaC5lbmFibGUoc3RhZ2UsIHRydWUpO1xufSBlbHNlIHtcbiAgc3RhZ2UuZW5hYmxlTW91c2VPdmVyKDIwKTtcbn1cblxuaWYgKHdpbmRvdyAhPT0gd2luZG93LnBhcmVudCkge1xuICAvLyBjcmVhdGVqcyBzdGFnZSBjbGljayBkb3NudCB0cmlnZ2VyIHdpbmRvdy5mb2N1c1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB3aW5kb3cuZm9jdXMoKSk7XG59XG4iLCJpbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFja2dyb3VuZCBleHRlbmRzIGNyZWF0ZWpzLlNoYXBlIHtcbiAgY29uc3RydWN0b3IobmFtZSwgY2FudmFzV2lkdGgpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5pbWcgPSBhc3NldHNNYW5hZ2VyLmdldFJlc3VsdChuYW1lKTtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuaW1nLndpZHRoICsgY2FudmFzV2lkdGg7XG5cbiAgICB0aGlzLmdyYXBoaWNzLmJlZ2luQml0bWFwRmlsbCh0aGlzLmltZywgJ3JlcGVhdC14JykuZHJhd1JlY3QoMCwgMCwgd2lkdGgsIHRoaXMuaW1nLmhlaWdodCk7XG4gICAgdGhpcy5yZWdZID0gdGhpcy5pbWcuaGVpZ2h0O1xuICAgIHRoaXMuY2FjaGUoMCwgMCwgd2lkdGgsIHRoaXMuaW1nLmhlaWdodCk7XG4gIH1cbiAgbW92ZShwYXRoKSB7XG4gICAgdGhpcy54IC09IHBhdGg7XG4gICAgdGhpcy54ICU9IHRoaXMuaW1nLndpZHRoO1xuICB9XG59XG4iLCJpbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcbmltcG9ydCBzb3VuZE1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc291bmRNYW5hZ2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnRuIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3IobGFiZWwsIGNvbG9yID0gJ2dyZWVuJywgdHlwZSA9ICdidG4nKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcblxuICAgIHRoaXMuY3JlYXRlQmcodHlwZSk7XG4gICAgdGhpcy5jcmVhdGVMYWJlbChsYWJlbCk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gc291bmRNYW5hZ2VyLnBsYXkoJ2ZsYXAnKSk7XG4gIH1cbiAgY3JlYXRlQmcodHlwZSkge1xuICAgIHRoaXMuYmcgPSBuZXcgY3JlYXRlanMuU3ByaXRlKGFzc2V0c01hbmFnZXIuZ2V0U3ByaXRlU2hlZXQodHlwZSkpO1xuICAgIHRoaXMuYmcucmVnWCA9IHRoaXMuYmcuZ2V0Qm91bmRzKCkud2lkdGggLyAyO1xuICAgIHRoaXMuYmcucmVnWSA9IHRoaXMuYmcuZ2V0Qm91bmRzKCkuaGVpZ2h0IC8gMjtcbiAgICB0aGlzLmhlbHBlciA9IG5ldyBjcmVhdGVqcy5CdXR0b25IZWxwZXIodGhpcy5iZywgYCR7dGhpcy5jb2xvcn1PdXRgLCBgJHt0aGlzLmNvbG9yfU92ZXJgLCBgJHt0aGlzLmNvbG9yfURvd25gKTtcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuYmcpO1xuICB9XG4gIGNyZWF0ZUxhYmVsKGxhYmVsKSB7XG4gICAgdGhpcy5sYWJlbCA9IG5ldyBjcmVhdGVqcy5UZXh0KGxhYmVsLCAnMzBweCBHdWVyaWxsYScsICcjZmZmJyk7XG4gICAgdGhpcy5sYWJlbC5zaGFkb3cgPSBuZXcgY3JlYXRlanMuU2hhZG93KCcjMDAwJywgMCwgMSwgNSk7XG4gICAgdGhpcy5sYWJlbC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICB0aGlzLmxhYmVsLnRleHRCYXNlbGluZSA9ICdtaWRkbGUnO1xuICAgIHRoaXMubGFiZWwubW91c2VFbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy5sYWJlbC55ID0gLTM7XG5cbiAgICAvLyB0b2RvIGNhY2hlXG4gICAgLy8gbm93IGl0IGNhY2hlIGJlZm9yZSBmb250IGxvYWQgKFxuICAgIC8vIGNvbnN0IGggPSB0aGlzLmxhYmVsLmdldE1lYXN1cmVkSGVpZ2h0KCkgKyA2OyAvLyBhZGQgNiBjb3Mgb2Ygc2hhZG93XG4gICAgLy8gY29uc3QgdyA9IHRoaXMubGFiZWwuZ2V0TWVhc3VyZWRXaWR0aCgpICsgNjtcbiAgICAvLyB0aGlzLmxhYmVsLmNhY2hlKC13IC8gMiwgLWggLyAyLCB3LCBoKTtcblxuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5sYWJlbCk7XG4gIH1cbiAgZGlzYWJsZSgpIHtcbiAgICB0aGlzLmJnLmdvdG9BbmRTdG9wKCdkaXNhYmxlJyk7XG4gICAgdGhpcy5tb3VzZUVuYWJsZWQgPSBmYWxzZTtcbiAgfVxuICBlbmFibGUoKSB7XG4gICAgdGhpcy5iZy5nb3RvQW5kU3RvcChgJHt0aGlzLmNvbG9yfU91dGApO1xuICAgIHRoaXMubW91c2VFbmFibGVkID0gdHJ1ZTtcbiAgfVxufVxuIiwiaW1wb3J0IHNjcmVlbk1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc2NyZWVuc01hbmFnZXInO1xuaW1wb3J0IHNvdW5kTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zb3VuZE1hbmFnZXInO1xuaW1wb3J0IHNlcnZlck1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc2VydmVyTWFuYWdlcic7XG5pbXBvcnQgSWNvbkJ0biBmcm9tICcuL0ljb25CdG4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHdWkgZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuICBjb25zdHJ1Y3Rvcih3aWR0aCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG5cbiAgICB0aGlzLm1lbnVCdG4gPSBuZXcgSWNvbkJ0bignbWVudScpO1xuICAgIHRoaXMubWVudUJ0bi54ID0gdGhpcy5tZW51QnRuLmdldEJvdW5kcygpLndpZHRoIC8gMiArIDIwO1xuICAgIHRoaXMubWVudUJ0bi55ID0gdGhpcy5tZW51QnRuLmdldEJvdW5kcygpLmhlaWdodCAvIDIgKyAyMDtcblxuICAgIHRoaXMucmF0aW5nQnRuID0gbmV3IEljb25CdG4oJ3JhdGluZycpO1xuICAgIHRoaXMucmF0aW5nQnRuLnggPSB0aGlzLnJhdGluZ0J0bi5nZXRCb3VuZHMoKS53aWR0aCAqIDMgLyAyICsgNDA7XG4gICAgdGhpcy5yYXRpbmdCdG4ueSA9IHRoaXMucmF0aW5nQnRuLmdldEJvdW5kcygpLmhlaWdodCAvIDIgKyAyMDtcblxuICAgIHRoaXMuc291bmRCdG4gPSBuZXcgSWNvbkJ0bihzb3VuZE1hbmFnZXIuaXNFbmFibGVkKCkgPyAnc291bmQnIDogJ3NvdW5kT2ZmJyk7XG4gICAgdGhpcy5zb3VuZEJ0bi54ID0gdGhpcy53aWR0aCAtIHRoaXMuc291bmRCdG4uZ2V0Qm91bmRzKCkud2lkdGggLyAyIC0gMjA7XG4gICAgdGhpcy5zb3VuZEJ0bi55ID0gdGhpcy5zb3VuZEJ0bi5nZXRCb3VuZHMoKS5oZWlnaHQgLyAyICsgMjA7XG5cbiAgICAvLyB0b2RvOiBmaXggc3ByaXRlc2hlZXQgbGF0ZXJcbiAgICB0aGlzLnJhdGluZ0J0bi5sYWJlbC54ID0gdGhpcy5zb3VuZEJ0bi5sYWJlbC54ID0gMTtcblxuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5tZW51QnRuLCB0aGlzLnJhdGluZ0J0biwgdGhpcy5zb3VuZEJ0bik7XG5cbiAgICB0aGlzLnNvdW5kQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgc291bmRNYW5hZ2VyLnRvZ2dsZSgpO1xuICAgICAgdGhpcy5zb3VuZEJ0bi5jaGFuZ2VMYWJlbChzb3VuZE1hbmFnZXIuaXNFbmFibGVkKCkgPyAnc291bmQnIDogJ3NvdW5kT2ZmJyk7XG4gICAgICBzZXJ2ZXJNYW5hZ2VyLnNldCgnc291bmQnLCBzb3VuZE1hbmFnZXIuaXNFbmFibGVkKCkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5tZW51QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gc2NyZWVuTWFuYWdlci5jaGFuZ2UoJ1N0YXJ0U2NyZWVuJykpO1xuICAgIHRoaXMucmF0aW5nQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gc2NyZWVuTWFuYWdlci5jaGFuZ2UoJ1JhdGluZ1NjcmVlbicpKTtcbiAgfVxufVxuIiwiaW1wb3J0IGFzc2V0c01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvYXNzZXRzTWFuYWdlcic7XG5pbXBvcnQgc291bmRNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NvdW5kTWFuYWdlcic7XG5cbmNvbnN0IENPTkZJRyA9IHtcbiAgRzogMC4xNixcbiAgQTogNyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlcm8gZXh0ZW5kcyBjcmVhdGVqcy5TcHJpdGUge1xuICBjb25zdHJ1Y3Rvcih0eXBlKSB7XG4gICAgc3VwZXIoYXNzZXRzTWFuYWdlci5nZXRTcHJpdGVTaGVldCh0eXBlKSk7XG5cbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMuYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKTtcbiAgICB0aGlzLnJlZ1ggPSB0aGlzLmJvdW5kcy53aWR0aCAvIDI7XG4gICAgdGhpcy5yZWdZID0gdGhpcy5ib3VuZHMuaGVpZ2h0IC8gMjtcblxuICAgIHRoaXMuZGVhZCA9IGZhbHNlO1xuICAgIHRoaXMudlkgPSAwO1xuICB9XG4gIGZsYXAoKSB7XG4gICAgaWYgKHRoaXMuZGVhZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnZZID0gTWF0aC5tYXgodGhpcy52WSAtIENPTkZJRy5BLCAtQ09ORklHLkEpO1xuICAgIHRoaXMuZ290b0FuZFBsYXkoJ2ZsYXAnKTtcbiAgICBzb3VuZE1hbmFnZXIucGxheSgnZmxhcCcpO1xuICB9XG4gIG1vdmUoKSB7XG4gICAgdGhpcy52WSArPSBDT05GSUcuRztcbiAgICB0aGlzLnkgKz0gdGhpcy52WTtcbiAgfVxuICBkaWUoKSB7XG4gICAgaWYgKHRoaXMuZGVhZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmRlYWQgPSB0cnVlO1xuICAgIHRoaXMucm90YXRpb24gPSAzMDtcbiAgICB0aGlzLmdvdG9BbmRTdG9wKCdkZWFkJyk7XG4gICAgc291bmRNYW5hZ2VyLnBsYXkoJ2xvb3NlJyk7XG4gIH1cbn1cbiIsImltcG9ydCBhc3NldHNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2Fzc2V0c01hbmFnZXInO1xuaW1wb3J0IEJ0biBmcm9tICcuL0J0bic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEljb25CdG4gZXh0ZW5kcyBCdG4ge1xuICBjb25zdHJ1Y3RvcihsYWJlbCwgY29sb3IgPSAnb3JhbmdlJykge1xuICAgIHN1cGVyKGxhYmVsLCBjb2xvciwgJ2ljb25CdG4nKTtcbiAgfVxuICBjcmVhdGVMYWJlbChsYWJlbCkge1xuICAgIHRoaXMubGFiZWwgPSBuZXcgY3JlYXRlanMuU3ByaXRlKGFzc2V0c01hbmFnZXIuZ2V0U3ByaXRlU2hlZXQoJ2ljb24nKSwgbGFiZWwpO1xuICAgIHRoaXMubGFiZWwucmVnWCA9IHRoaXMubGFiZWwuZ2V0Qm91bmRzKCkud2lkdGggLyAyO1xuICAgIHRoaXMubGFiZWwucmVnWSA9IHRoaXMubGFiZWwuZ2V0Qm91bmRzKCkuaGVpZ2h0IC8gMjtcbiAgICB0aGlzLmxhYmVsLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5sYWJlbCk7XG4gIH1cbiAgY2hhbmdlTGFiZWwobGFiZWwpIHtcbiAgICB0aGlzLmxhYmVsLmdvdG9BbmRTdG9wKGxhYmVsKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hhZG93T3ZlcmxheSBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5zaGFkb3cgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcbiAgICB0aGlzLnNoYWRvdy5ncmFwaGljcy5iZWdpbkZpbGwoJ3JnYmEoMCwgMCwgMCwgMC42KScpLmRyYXdSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgdGhpcy5zaGFkb3dUZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoJycsICcyNXB4IEd1ZXJpbGxhJywgJyNmZmYnKTtcbiAgICB0aGlzLnNoYWRvd1RleHQueSA9IGhlaWdodCAvIDI7XG4gICAgdGhpcy5zaGFkb3dUZXh0LnggPSB3aWR0aCAvIDI7XG4gICAgdGhpcy5zaGFkb3dUZXh0LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRoaXMuc2hhZG93VGV4dC50ZXh0QmFzZWxpbmUgPSAnbWlkZGxlJztcblxuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5zaGFkb3csIHRoaXMuc2hhZG93VGV4dCk7XG4gICAgLy8gdG9kb1xuICAgIC8vIHRoaXMuY2FjaGUoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gIH1cbiAgc2V0VGV4dCh0ZXh0KSB7XG4gICAgdGhpcy5zaGFkb3dUZXh0LnRleHQgPSB0ZXh0O1xuICAgIC8vIHRoaXMudXBkYXRlQ2FjaGUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IGFzc2V0c01hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvYXNzZXRzTWFuYWdlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwaWtlIGV4dGVuZHMgY3JlYXRlanMuQml0bWFwIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoYXNzZXRzTWFuYWdlci5nZXRSZXN1bHQoJ3NwaWtlJykpO1xuXG4gICAgdGhpcy5ib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpO1xuICAgIHRoaXMucmVnWCA9IHRoaXMuYm91bmRzLndpZHRoIC8gMjtcbiAgICB0aGlzLnJlZ1kgPSB0aGlzLmJvdW5kcy5oZWlnaHQ7XG4gIH1cbn1cbiIsImNvbnN0IG1hbmlmZXN0ID0gW1xuICB7IGlkOiAnbW9uc3RlcicsIHNyYzogJ2ltZy9tb25zdGVyLXNwcml0ZS5wbmcnIH0sXG4gIC8vIHsgaWQ6ICdiaXJkJywgc3JjOiAnaW1nL2JpcmQtc3ByaXRlLnBuZycgfSxcbiAgLy8geyBpZDogJ2NoaWNrZW4nLCBzcmM6ICdpbWcvY2hpY2tlbi1zcHJpdGUucG5nJyB9LFxuICB7IGlkOiAnc3Bpa2UnLCBzcmM6ICdpbWcvc3Bpa2UucG5nJyB9LFxuICB7IGlkOiAnc2t5Jywgc3JjOiAnaW1nL2JnL3NreS5wbmcnIH0sXG4gIHsgaWQ6ICdzdGFydCcsIHNyYzogJ2ltZy9iZy9zdGFydC5wbmcnIH0sXG4gIHsgaWQ6ICdtb3VudGFpbicsIHNyYzogJ2ltZy9iZy9tb3VudGFpbi5wbmcnIH0sXG4gIHsgaWQ6ICdncm91bmQnLCBzcmM6ICdpbWcvYmcvZ3JvdW5kLnBuZycgfSxcbiAgeyBpZDogJ2J0bicsIHNyYzogJ2ltZy9idG4tc3ByaXRlLnBuZycgfSxcbiAgeyBpZDogJ2ljb24tYnRuJywgc3JjOiAnaW1nL2ljb24tYnRuLXNwcml0ZS5wbmcnIH0sXG4gIHsgaWQ6ICdpY29uJywgc3JjOiAnaW1nL2ljb24tc3ByaXRlLnBuZycgfSxcbiAgeyBpZDogJ2JhY2snLCBzcmM6ICdzb3VuZC9iYWNrZ3JvdW5kLm9nZycgfSxcbiAgeyBpZDogJ2ZsYXAnLCBzcmM6ICdzb3VuZC9mbGFwLm9nZycgfSxcbiAgeyBpZDogJ2xvb3NlJywgc3JjOiAnc291bmQvbG9vc2Uub2dnJyB9LFxuXTtcblxuY29uc3QgZ2V0SGVyb1Nwcml0ZVNoZWV0RGF0YSA9IG5hbWUgPT4gKHtcbiAgaW1hZ2VzOiBbbmFtZV0sXG4gIGZyYW1lczogeyB3aWR0aDogMTAwLCBoZWlnaHQ6IDc4IH0sXG4gIGFuaW1hdGlvbnM6IHtcbiAgICBmbHk6IDAsXG4gICAgZmxhcDogWzEsIDMsICdmbHknXSxcbiAgICBkZWFkOiA0LFxuICB9LFxufSk7XG5cbmNvbnN0IHNwcml0ZVNoZWV0c0RhdGEgPSB7XG4gIGJpcmQ6IGdldEhlcm9TcHJpdGVTaGVldERhdGEoJ2JpcmQnKSxcbiAgbW9uc3RlcjogZ2V0SGVyb1Nwcml0ZVNoZWV0RGF0YSgnbW9uc3RlcicpLFxuICBjaGlja2VuOiBnZXRIZXJvU3ByaXRlU2hlZXREYXRhKCdjaGlja2VuJyksXG4gIGJ0bjoge1xuICAgIGltYWdlczogWydidG4nXSxcbiAgICBmcmFtZXM6IHsgd2lkdGg6IDIxMCwgaGVpZ2h0OiA2OSwgc3BhY2luZzogMiB9LFxuICAgIGFuaW1hdGlvbnM6IHtcbiAgICAgIGdyZWVuT3V0OiAwLFxuICAgICAgZ3JlZW5PdmVyOiAyLFxuICAgICAgZ3JlZW5Eb3duOiA0LFxuICAgICAgb3JhbmdlT3V0OiA2LFxuICAgICAgb3JhbmdlT3ZlcjogOCxcbiAgICAgIG9yYW5nZURvd246IDEsXG4gICAgICByZWRPdXQ6IDMsXG4gICAgICByZWRPdmVyOiA1LFxuICAgICAgcmVkRG93bjogNyxcbiAgICAgIGRpc2FibGU6IDksXG4gICAgfSxcbiAgfSxcbiAgaWNvbkJ0bjoge1xuICAgIGltYWdlczogWydpY29uLWJ0biddLFxuICAgIGZyYW1lczogeyB3aWR0aDogNjksIGhlaWdodDogNzEsIHNwYWNpbmc6IDIgfSxcbiAgICBhbmltYXRpb25zOiB7XG4gICAgICBncmVlbk91dDogMCxcbiAgICAgIGdyZWVuT3ZlcjogMSxcbiAgICAgIGdyZWVuRG93bjogMixcbiAgICAgIG9yYW5nZU91dDogMyxcbiAgICAgIG9yYW5nZU92ZXI6IDQsXG4gICAgICBvcmFuZ2VEb3duOiA1LFxuICAgICAgcmVkT3V0OiA4LFxuICAgICAgcmVkT3ZlcjogNyxcbiAgICAgIHJlZERvd246IDYsXG4gICAgICBkaXNhYmxlOiA5LFxuICAgIH0sXG4gIH0sXG4gIGljb246IHtcbiAgICBpbWFnZXM6IFsnaWNvbiddLFxuICAgIGZyYW1lczogeyB3aWR0aDogNDAsIGhlaWdodDogNDAgfSxcbiAgICBhbmltYXRpb25zOiB7XG4gICAgICBzb3VuZDogMCxcbiAgICAgIHNvdW5kT2ZmOiAxLFxuICAgICAgcmF0aW5nOiAyLFxuICAgICAgbWVudTogMyxcbiAgICB9LFxuICB9LFxufTtcblxuY29uc3Qgc3ByaXRlU2hlZXRzID0ge307XG5cbmNvbnN0IGFzc2V0c01hbmFnZXIgPSB7XG4gIGluaXQoKSB7XG4gICAgY3JlYXRlanMuU291bmQuYWx0ZXJuYXRlRXh0ZW5zaW9ucyA9IFsnbXAzJ107XG4gICAgdGhpcy5xdWV1ZSA9IG5ldyBjcmVhdGVqcy5Mb2FkUXVldWUoKTtcbiAgICB0aGlzLnF1ZXVlLmluc3RhbGxQbHVnaW4oY3JlYXRlanMuU291bmQpO1xuICAgIHRoaXMucXVldWUubG9hZE1hbmlmZXN0KG1hbmlmZXN0KTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLnF1ZXVlLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbXBsZXRlJywgKCkgPT4gcmVzb2x2ZSgpKTtcbiAgICAgIHRoaXMucXVldWUuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoKSA9PiByZWplY3QoKSk7XG4gICAgfSk7XG4gIH0sXG4gIGdldFJlc3VsdChuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMucXVldWUuZ2V0UmVzdWx0KG5hbWUpO1xuICB9LFxuICBnZXRTcHJpdGVTaGVldChuYW1lKSB7XG4gICAgaWYgKCFzcHJpdGVTaGVldHNbbmFtZV0pIHtcbiAgICAgIGNvbnN0IGRhdGEgPSBzcHJpdGVTaGVldHNEYXRhW25hbWVdO1xuXG4gICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHNwcml0ZVNoZWV0IG5hbWUnKTtcbiAgICAgIH1cblxuICAgICAgZGF0YS5pbWFnZXMgPSBkYXRhLmltYWdlcy5tYXAoaW1nID0+IHRoaXMuZ2V0UmVzdWx0KGltZykpO1xuICAgICAgc3ByaXRlU2hlZXRzW25hbWVdID0gbmV3IGNyZWF0ZWpzLlNwcml0ZVNoZWV0KGRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiBzcHJpdGVTaGVldHNbbmFtZV07XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBhc3NldHNNYW5hZ2VyO1xuIiwiY29uc3QgZGF0YU1hbmFnZXIgPSB7XG4gIGdhbWVUeXBlOiBudWxsLFxuICBzY29yZTogbnVsbCxcbiAgbWF4U2NvcmU6IG51bGwsXG4gIGhlcm9UeXBlOiAnbW9uc3RlcicsXG4gIHBvczogbnVsbCxcbiAgd2luOiBudWxsLFxuICBzcGlrZXM6IG51bGwsXG4gIGFjdGlvbnM6IG51bGwsXG4gIHVzZXI6IHtcbiAgICBpZDogbnVsbCxcbiAgICBuYW1lOiBudWxsLFxuICAgIHNleDogbnVsbCxcbiAgfSxcbiAgZW5lbXk6IG51bGwsXG4gIGZpZWxkczoge1xuICAgIG5vcm1hbDogW1swLCA5OV0sIFsxMDAsIDE5OV1dLFxuICB9LFxuICBzZXQoa2V5LCB2YWx1ZSkge1xuICAgIHRoaXNba2V5XSA9IHZhbHVlO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGF0YU1hbmFnZXI7XG4iLCJpbXBvcnQgU3RhcnRTY3JlZW4gZnJvbSAnLi4vc2NyZWVucy9TdGFydFNjcmVlbic7XG5pbXBvcnQgTWFpblNjcmVlbiBmcm9tICcuLi9zY3JlZW5zL01haW5TY3JlZW4nO1xuaW1wb3J0IFBWUFNjcmVlbiBmcm9tICcuLi9zY3JlZW5zL1BWUFNjcmVlbic7XG5pbXBvcnQgRW5kU2NyZWVuIGZyb20gJy4uL3NjcmVlbnMvRW5kU2NyZWVuJztcbmltcG9ydCBSYXRpbmdTY3JlZW4gZnJvbSAnLi4vc2NyZWVucy9SYXRpbmdTY3JlZW4nO1xuXG5jb25zdCBzY3JlZW5NYW5hZ2VyID0ge1xuICBpbml0KHN0YWdlKSB7XG4gICAgdGhpcy5zdGFnZSA9IHN0YWdlO1xuICAgIHRoaXMuY3VycmVudFNjcmVlbiA9IG51bGw7XG4gICAgdGhpcy5zY3JlZW5zID0ge1xuICAgICAgU3RhcnRTY3JlZW4sXG4gICAgICBNYWluU2NyZWVuLFxuICAgICAgUFZQU2NyZWVuLFxuICAgICAgRW5kU2NyZWVuLFxuICAgICAgUmF0aW5nU2NyZWVuLFxuICAgIH07XG5cbiAgICBjcmVhdGVqcy5UaWNrZXIudGltaW5nTW9kZSA9IGNyZWF0ZWpzLlRpY2tlci5SQUY7XG4gICAgY3JlYXRlanMuVGlja2VyLmFkZEV2ZW50TGlzdGVuZXIoJ3RpY2snLCBlID0+IHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRTY3JlZW4gJiYgdGhpcy5jdXJyZW50U2NyZWVuLnRpY2spIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U2NyZWVuLnRpY2soZSk7XG4gICAgICB9XG4gICAgICB0aGlzLnN0YWdlLnVwZGF0ZShlKTtcbiAgICB9KTtcbiAgfSxcbiAgY2hhbmdlKG5hbWUpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50U2NyZWVuKSB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50U2NyZWVuLmRlc3Ryb3kpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U2NyZWVuLmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3RhZ2UucmVtb3ZlQ2hpbGQodGhpcy5jdXJyZW50U2NyZWVuKTtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50U2NyZWVuID0gbmV3IHRoaXMuc2NyZWVuc1tuYW1lXSh0aGlzLnN0YWdlLmNhbnZhcy53aWR0aCwgdGhpcy5zdGFnZS5jYW52YXMuaGVpZ2h0KTtcbiAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuY3VycmVudFNjcmVlbik7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBzY3JlZW5NYW5hZ2VyO1xuIiwiY29uc3Qgc2VydmVyTWFuYWdlciA9IHtcbiAgaW5pdCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gVksuaW5pdChcbiAgICAgICgpID0+IHJlc29sdmUoKSxcbiAgICAgIGUgPT4gcmVqZWN0KCd2ayBpbml0IGVycm9yJywgZSksXG4gICAgJzUuNjAnKSk7XG4gIH0sXG4gIGdldFVzZXIoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIFZLLmFwaSgndXNlcnMuZ2V0JywgeyBmaWVsZHM6ICdzZXgnIH0sIHIgPT4ge1xuICAgICAgICBpZiAoci5lcnJvcikge1xuICAgICAgICAgIHJlamVjdChyLmVycm9yKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZShyLnJlc3BvbnNlWzBdKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuICBnZXQoa2V5LCBnbG9iYWwgPSAwKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gVksuYXBpKCdzdG9yYWdlLmdldCcsIHsga2V5LCBnbG9iYWwgfSwgcmVzb2x2ZSkpXG4gICAgICAudGhlbihyID0+IHtcbiAgICAgICAgaWYgKHIuZXJyb3IpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Ioci5lcnJvcik7XG4gICAgICAgIH0gZWxzZSBpZiAoci5yZXNwb25zZSA9PT0gJycpIHtcbiAgICAgICAgICAvLyBjYW50IEpTT04ucGFyc2UgZW1wdHkgc3RyaW5nIGJ1dCBuZWVkIHRvIGdldCBkZWZhdWx0IHZhbHVlXG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHIucmVzcG9uc2UpO1xuICAgICAgfSk7XG4gIH0sXG4gIHNldChrZXksIHZhbHVlLCBnbG9iYWwgPSAwKSB7XG4gICAgVksuYXBpKCdzdG9yYWdlLnNldCcsIHsga2V5LCB2YWx1ZTogSlNPTi5zdHJpbmdpZnkodmFsdWUpLCBnbG9iYWwgfSk7XG4gIH0sXG4gIHNoYXJlKG1lc3NhZ2UsIHBob3RvKSB7XG4gICAgY29uc3QgcGhvdG9zID0ge1xuICAgICAgc2luZ2xlOiAncGhvdG8tMTM1NTYzMzg4XzQ1NjIzOTAxNycsXG4gICAgICBwdnA6ICdwaG90by0xMzU1NjMzODhfNDU2MjM5MDI2JyxcbiAgICB9O1xuICAgIFZLLmFwaSgnd2FsbC5wb3N0Jywge1xuICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgIGF0dGFjaG1lbnRzOiBgJHtwaG90b3NbcGhvdG9dfSwgaHR0cHM6Ly92ay5jb20vYXBwNTc4MjExOGAsXG4gICAgICBzZXJ2aWNlczogJ3R3aXR0ZXInLFxuICAgIH0pO1xuICB9LFxuICBpbnZpdGUoKSB7XG4gICAgVksuY2FsbE1ldGhvZCgnc2hvd0ludml0ZUJveCcpO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgc2VydmVyTWFuYWdlcjtcbiIsImNvbnN0IHNvdW5kTWFuYWdlciA9IHtcbiAgaW5pdChlbmFibGUpIHtcbiAgICB0aGlzLmVuYWJsZWQgPSBlbmFibGU7XG4gICAgdGhpcy5iZyA9IGNyZWF0ZWpzLlNvdW5kLnBsYXkoJ2JhY2snLCB7IGxvb3A6IC0xLCB2b2x1bWU6IDAuMyB9KTtcbiAgICB0aGlzLmJnLnBhdXNlZCA9ICF0aGlzLmVuYWJsZWQ7XG4gICAgLy8gc29tZXRpbWVzIG5lZ2F0aXZlIHZhbHVlIG9jY3VycyBhbmQgdGhyb3cgZXJyb3JcbiAgICB0aGlzLmJnLnBvc2l0aW9uID0gMDtcbiAgfSxcbiAgdG9nZ2xlKCkge1xuICAgIHRoaXMuZW5hYmxlZCA9ICF0aGlzLmVuYWJsZWQ7XG4gICAgdGhpcy5iZy5wYXVzZWQgPSAhdGhpcy5lbmFibGVkO1xuICB9LFxuICBpc0VuYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZW5hYmxlZDtcbiAgfSxcbiAgcGxheShzb3VuZCkge1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgIGNyZWF0ZWpzLlNvdW5kLnBsYXkoc291bmQpO1xuICAgIH1cbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNvdW5kTWFuYWdlcjtcbiIsImltcG9ydCByYW5kb21JbnQgZnJvbSAncmFuZG9tLWludCc7XG5pbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcbmltcG9ydCBzY3JlZW5zTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zY3JlZW5zTWFuYWdlcic7XG5pbXBvcnQgc2VydmVyTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zZXJ2ZXJNYW5hZ2VyJztcbmltcG9ydCBkYXRhTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9kYXRhTWFuYWdlcic7XG5pbXBvcnQgR3VpIGZyb20gJy4uL2Rpc3BsYXkvR3VpJztcbmltcG9ydCBCdG4gZnJvbSAnLi4vZGlzcGxheS9CdG4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbmRTY3JlZW4gZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuICBjb25zdHJ1Y3Rvcih3aWR0aCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmJnID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChhc3NldHNNYW5hZ2VyLmdldFJlc3VsdCgnc3RhcnQnKSk7XG4gICAgdGhpcy5ndWkgPSBuZXcgR3VpKHdpZHRoKTtcblxuICAgIHRoaXMubWF4U2NvcmUgPSBuZXcgY3JlYXRlanMuVGV4dChg0KDQtdC60L7RgNC0OiAke2RhdGFNYW5hZ2VyLm1heFNjb3JlfSDQvGAsICcyNXB4IEd1ZXJpbGxhJywgJyMwMDAnKTtcbiAgICB0aGlzLm1heFNjb3JlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRoaXMubWF4U2NvcmUueCA9IHdpZHRoIC8gMjtcbiAgICB0aGlzLm1heFNjb3JlLnkgPSA0MDtcblxuICAgIHRoaXMuc2NvcmUgPSBuZXcgY3JlYXRlanMuVGV4dChg0KDQtdC30YPQu9GM0YLQsNGCOiAke2RhdGFNYW5hZ2VyLnNjb3JlfSDQvGAsICc0MHB4IEd1ZXJpbGxhJywgJyMwMDAnKTtcbiAgICB0aGlzLnNjb3JlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRoaXMuc2NvcmUueCA9IHdpZHRoIC8gMjtcbiAgICB0aGlzLnNjb3JlLnkgPSAxNTA7XG5cbiAgICB0aGlzLnJlcGxheUJ0biA9IG5ldyBCdG4oJ9CV0YnQtSDRgNCw0LcnKTtcbiAgICB0aGlzLnJlcGxheUJ0bi54ID0gd2lkdGggLyAyO1xuICAgIHRoaXMucmVwbGF5QnRuLnkgPSAzNTA7XG5cbiAgICB0aGlzLnNoYXJlQnRuID0gbmV3IEJ0bign0J/QvtC00LXQu9C40YLRjNGB0Y8nLCAnb3JhbmdlJyk7XG4gICAgdGhpcy5zaGFyZUJ0bi54ID0gd2lkdGggLyAyO1xuICAgIHRoaXMuc2hhcmVCdG4ueSA9IDQ0MDtcblxuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5iZywgdGhpcy5ndWksIHRoaXMubWF4U2NvcmUsIHRoaXMuc2NvcmUsIHRoaXMucmVwbGF5QnRuLCB0aGlzLnNoYXJlQnRuKTtcblxuICAgIGlmIChkYXRhTWFuYWdlci5zY29yZSA+IGRhdGFNYW5hZ2VyLm1heFNjb3JlKSB7XG4gICAgICB0aGlzLm1heFNjb3JlLnRleHQgPSBg0J/RgNC+0YjQu9GL0Lkg0YDQtdC60L7RgNC0OiAke2RhdGFNYW5hZ2VyLm1heFNjb3JlfSDQvGA7XG4gICAgICBkYXRhTWFuYWdlci5tYXhTY29yZSA9IGRhdGFNYW5hZ2VyLnNjb3JlO1xuICAgICAgc2VydmVyTWFuYWdlci5zZXQoJ21heFNjb3JlJywgZGF0YU1hbmFnZXIubWF4U2NvcmUpO1xuICAgICAgdGhpcy5zY29yZS50ZXh0ID0gYNCd0L7QstGL0Lkg0YDQtdC60L7RgNC0OiAke2RhdGFNYW5hZ2VyLm1heFNjb3JlfSDQvCFgO1xuXG4gICAgICBzZXJ2ZXJNYW5hZ2VyLmdldCgncmF0aW5nVGFibGUnLCAxKS50aGVuKHJlY2FsY1JhdGluZ1RhYmxlKTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YU1hbmFnZXIuZ2FtZVR5cGUgPT09ICdwdnAnKSB7XG4gICAgICB0aGlzLnB2cFRleHQgPSBuZXcgY3JlYXRlanMuVGV4dCgnJywgJzI1cHggR3VlcmlsbGEnLCAnIzAwMCcpO1xuICAgICAgdGhpcy5wdnBUZXh0LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgdGhpcy5wdnBUZXh0LnggPSB3aWR0aCAvIDI7XG4gICAgICB0aGlzLnB2cFRleHQueSA9IDIzMDtcbiAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5wdnBUZXh0KTtcblxuICAgICAgaWYgKGRhdGFNYW5hZ2VyLndpbikge1xuICAgICAgICB0aGlzLnB2cFRleHQudGV4dCArPSBgJHtkYXRhTWFuYWdlci5lbmVteS5uYW1lfSDQsdGL0Lske2RhdGFNYW5hZ2VyLmVuZW15LnNleCAhPT0gMiA/ICfQsCcgOiAnJ30g0L/QvtCy0LXRgNC20LXQvSR7ZGF0YU1hbmFnZXIuZW5lbXkuc2V4ICE9PSAyID8gJ9CwJyA6ICcnfWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnB2cFRleHQudGV4dCArPSBgJHtkYXRhTWFuYWdlci5lbmVteS5uYW1lfSDQv9C+0LLQtdGA0LMke2RhdGFNYW5hZ2VyLmVuZW15LnNleCAhPT0gMiA/ICfQu9CwJyA6ICcnfSDQktCw0YFgO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHJhbmdlID0gZGF0YU1hbmFnZXIuZmllbGRzLm5vcm1hbFtkYXRhTWFuYWdlci5wb3NdO1xuICAgIGNvbnN0IGZpZWxkID0gYHB2cCR7cmFuZG9tSW50KHJhbmdlWzBdLCByYW5nZVsxXSl9YDtcbiAgICBjb25zdCByZWNvcmQgPSB7XG4gICAgICB1c2VyOiBkYXRhTWFuYWdlci51c2VyLFxuICAgICAgc3Bpa2VzOiBkYXRhTWFuYWdlci5zcGlrZXMsXG4gICAgICBhY3Rpb25zOiBkYXRhTWFuYWdlci5hY3Rpb25zLFxuICAgIH07XG5cbiAgICBzZXJ2ZXJNYW5hZ2VyLmdldChmaWVsZCwgMSkudGhlbihyID0+IHtcbiAgICAgIGNvbnNvbGUud2FybihmaWVsZCk7XG4gICAgICBjb25zb2xlLndhcm4ocmVjb3JkKTtcbiAgICAgIGNvbnNvbGUud2FybihyKTtcbiAgICAgIGNvbnNvbGUud2FybihyLnNwaWtlcy5sZW5ndGggKiAwLjUgPCByZWNvcmQuc3Bpa2VzLmxlbmd0aCk7XG4gICAgICBpZiAoci5zcGlrZXMubGVuZ3RoICogMC41IDwgcmVjb3JkLnNwaWtlcy5sZW5ndGggJiZcbiAgICAgICAgICBKU09OLnN0cmluZ2lmeShyZWNvcmQpLmxlbmd0aCA8IDQwOTYpIHtcbiAgICAgICAgc2VydmVyTWFuYWdlci5zZXQoZmllbGQsIHJlY29yZCwgMSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgfVxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMucmVwbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVwbGF5KTtcbiAgICB0aGlzLnNoYXJlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hhcmUpO1xuXG4gICAgdGhpcy5vbktleURvd24gPSBlID0+IHtcbiAgICAgIGlmIChlLmtleUNvZGUgPT09IDMyKSB7XG4gICAgICAgIHJlcGxheSgpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlEb3duKTtcbiAgfVxuICBkZXN0cm95KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd24pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlcGxheSgpIHtcbiAgc3dpdGNoIChkYXRhTWFuYWdlci5nYW1lVHlwZSkge1xuICAgIGNhc2UgJ3NpbmdsZSc6XG4gICAgICBzY3JlZW5zTWFuYWdlci5jaGFuZ2UoJ01haW5TY3JlZW4nKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3B2cCc6XG4gICAgICBzY3JlZW5zTWFuYWdlci5jaGFuZ2UoJ1BWUFNjcmVlbicpO1xuICAgICAgYnJlYWs7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2hhcmUgKCkge1xuICBsZXQgbWVzc2FnZSA9ICcnO1xuICBzd2l0Y2ggKGRhdGFNYW5hZ2VyLmdhbWVUeXBlKSB7XG4gICAgY2FzZSAnc2luZ2xlJzpcbiAgICAgIG1lc3NhZ2UgPSBg0K8g0L/RgNC+0LvQtdGC0LXQuyR7ZGF0YU1hbmFnZXIudXNlci5zZXggIT09IDIgPyAn0LAnIDogJyd9ICR7ZGF0YU1hbmFnZXIuc2NvcmV9INC8INCyINC40LPRgNC1IEZsYXBweSBNb25zdGVyIWA7XG4gICAgICBpZiAoZGF0YU1hbmFnZXIuc2NvcmUgPT09IGRhdGFNYW5hZ2VyLm1heFNjb3JlKSB7XG4gICAgICAgIG1lc3NhZ2UgKz0gJ1xcbtCt0YLQviDQvNC+0Lkg0L3QvtCy0YvQuSDRgNC10LrQvtGA0LQhICc7XG4gICAgICB9XG4gICAgICBtZXNzYWdlICs9ICdcXG7QkCDRgdC60L7Qu9GM0LrQviDRgdC80L7QttC10YjRjCDRgtGLPyc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdwdnAnOlxuICAgICAgaWYgKGRhdGFNYW5hZ2VyLndpbikge1xuICAgICAgICBtZXNzYWdlICs9IGAke2RhdGFNYW5hZ2VyLmVuZW15Lm5hbWV9INCx0YvQuyR7ZGF0YU1hbmFnZXIuZW5lbXkuc2V4ICE9PSAyID8gJ9CwJyA6ICcnfSDQv9C+0LLQtdGA0LbQtdC9JHtkYXRhTWFuYWdlci5lbmVteS5zZXggIT09IDIgPyAn0LAnIDogJyd9INC80L3QvtC5INCyINC40LPRgNC1IEZsYXBweSBNb25zdGVyIWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtZXNzYWdlICs9IGAke2RhdGFNYW5hZ2VyLmVuZW15Lm5hbWV9INC/0L7QstC10YDQsyR7ZGF0YU1hbmFnZXIuZW5lbXkuc2V4ICE9PSAyID8gJ9C70LAnIDogJyd9INC80LXQvdGPINCyINC40LPRgNC1IEZsYXBweSBNb25zdGVyLFxuICAgICAgICAgICAgICAgICAgINC90YMg0L3QuNGH0LXQs9C+LCDQtdGJ0LUg0YPQstC40LTQuNC80YHRjy4uLmA7XG4gICAgICB9XG4gICAgICBpZiAoZGF0YU1hbmFnZXIuc2NvcmUgPT09IGRhdGFNYW5hZ2VyLm1heFNjb3JlKSB7XG4gICAgICAgIG1lc3NhZ2UgKz0gYFxcbtCc0L7QuSDQvdC+0LLRi9C5INGA0LXQutC+0YDQtCAke2RhdGFNYW5hZ2VyLnNjb3JlfSDQvCFgO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gIH1cbiAgc2VydmVyTWFuYWdlci5zaGFyZShtZXNzYWdlLCBkYXRhTWFuYWdlci5nYW1lVHlwZSk7XG59XG5cbmZ1bmN0aW9uIHJlY2FsY1JhdGluZ1RhYmxlKHJhdGluZ1RhYmxlKSB7XG4gIGlmIChyYXRpbmdUYWJsZVtyYXRpbmdUYWJsZS5sZW5ndGggLSAxXS5zY29yZSA+PSBkYXRhTWFuYWdlci5tYXhTY29yZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHVzZXJSYXRpbmcgPSByYXRpbmdUYWJsZS5maW5kKGVsID0+IGVsLmlkID09PSBkYXRhTWFuYWdlci51c2VyLmlkKTtcblxuICBpZiAodXNlclJhdGluZykge1xuICAgIHVzZXJSYXRpbmcuc2NvcmUgPSBkYXRhTWFuYWdlci5tYXhTY29yZTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBuZXdSYXRpbmcgPSB7XG4gICAgICBpZDogZGF0YU1hbmFnZXIudXNlci5pZCxcbiAgICAgIG5hbWU6IGRhdGFNYW5hZ2VyLnVzZXIubmFtZSxcbiAgICAgIHNjb3JlOiBkYXRhTWFuYWdlci5tYXhTY29yZSxcbiAgICB9O1xuICAgIGlmIChyYXRpbmdUYWJsZS5sZW5ndGggPCAxMCkge1xuICAgICAgcmF0aW5nVGFibGUucHVzaChuZXdSYXRpbmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByYXRpbmdUYWJsZVtyYXRpbmdUYWJsZS5sZW5ndGggLSAxXSA9IG5ld1JhdGluZztcbiAgICB9XG4gIH1cblxuICByYXRpbmdUYWJsZS5zb3J0KChhLCBiKSA9PiBiLnNjb3JlIC0gYS5zY29yZSk7XG4gIHNlcnZlck1hbmFnZXIuc2V0KCdyYXRpbmdUYWJsZScsIHJhdGluZ1RhYmxlLCAxKTtcbn1cbiIsImltcG9ydCBzY3JlZW5zTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zY3JlZW5zTWFuYWdlcic7XG5pbXBvcnQgZGF0YU1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvZGF0YU1hbmFnZXInO1xuaW1wb3J0IEJhY2tncm91bmQgZnJvbSAnLi4vZGlzcGxheS9CYWNrZ3JvdW5kJztcbmltcG9ydCBIZXJvIGZyb20gJy4uL2Rpc3BsYXkvSGVybyc7XG5pbXBvcnQgU3Bpa2UgZnJvbSAnLi4vZGlzcGxheS9TcGlrZSc7XG5pbXBvcnQgU2hhZG93T3ZlcmxheSBmcm9tICcuLi9kaXNwbGF5L1NoYWRvd092ZXJsYXknO1xuXG5jb25zdCBHUk9VTkRfSEVJR0hUID0gODA7XG5jb25zdCBTVEFSVF9TUEVFRCA9IDU7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5TY3JlZW4gZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcblxuICAgIHRoaXMuc3BlZWQgPSBTVEFSVF9TUEVFRDtcbiAgICB0aGlzLnN0ZXAgPSAwO1xuICAgIHRoaXMuZGlzdGFuY2UgPSAwO1xuICAgIHRoaXMuc2hhZG93T3ZlcmxheSA9IG5ldyBTaGFkb3dPdmVybGF5KHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcblxuICAgIGRhdGFNYW5hZ2VyLmdhbWVUeXBlID0gJ3NpbmdsZSc7XG4gICAgZGF0YU1hbmFnZXIuYWN0aW9ucyA9IHt9O1xuICAgIGRhdGFNYW5hZ2VyLnNwaWtlcyA9IFtdO1xuICAgIGRhdGFNYW5hZ2VyLnBvcyA9IDA7XG5cbiAgICB0aGlzLmNyZWF0ZUJnKCk7XG4gICAgdGhpcy5jcmVhdGVTcGlrZXMoKTtcbiAgICB0aGlzLmNyZWF0ZUhlcm8oKTtcbiAgICB0aGlzLmNyZWF0ZUh1ZCgpO1xuXG4gICAgdGhpcy5wYXVzZSgn0J/RgNC+0LHQtdC7IC0g0LLQt9C80LDRhSDQutGA0YvQu9GM0Y/QvNC4LCBlc2MgLSDQv9Cw0YPQt9CwJyk7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gIH1cbiAgY3JlYXRlQmcoKSB7XG4gICAgdGhpcy5iZ1NreSA9IG5ldyBCYWNrZ3JvdW5kKCdza3knLCB0aGlzLndpZHRoKTtcbiAgICB0aGlzLmJnTW91bnRhaW4gPSBuZXcgQmFja2dyb3VuZCgnbW91bnRhaW4nLCB0aGlzLndpZHRoKTtcbiAgICB0aGlzLmJnR3JvdW5kID0gbmV3IEJhY2tncm91bmQoJ2dyb3VuZCcsIHRoaXMud2lkdGgpO1xuICAgIHRoaXMuYmdTa3kueSA9IHRoaXMuYmdNb3VudGFpbi55ID0gdGhpcy5iZ0dyb3VuZC55ID0gdGhpcy5oZWlnaHQ7XG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmJnU2t5LCB0aGlzLmJnTW91bnRhaW4sIHRoaXMuYmdHcm91bmQpO1xuICB9XG4gIGNyZWF0ZVNwaWtlcygpIHtcbiAgICB0aGlzLnNwaWtlcyA9IFtuZXcgU3Bpa2UoKSwgbmV3IFNwaWtlKCldO1xuICAgIHRoaXMuc3Bpa2VzWzBdLnggPSAtdGhpcy5zcGlrZXNbMF0uYm91bmRzLndpZHRoIC8gMjtcbiAgICB0aGlzLnNwaWtlc1sxXS54ID0gdGhpcy53aWR0aCAvIDI7XG4gICAgdGhpcy5zcGlrZXMuZm9yRWFjaChzcGlrZSA9PiB0aGlzLnJlc2V0U3Bpa2Uoc3Bpa2UpKTtcbiAgICB0aGlzLmFkZENoaWxkKC4uLnRoaXMuc3Bpa2VzKTtcbiAgfVxuICBjcmVhdGVIZXJvKCkge1xuICAgIHRoaXMuaGVybyA9IG5ldyBIZXJvKGRhdGFNYW5hZ2VyLmhlcm9UeXBlKTtcbiAgICB0aGlzLmhlcm8ueCA9IHRoaXMud2lkdGggLyAyO1xuICAgIHRoaXMuaGVyby55ID0gMTkwO1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5oZXJvKTtcbiAgfVxuICBjcmVhdGVIdWQoKSB7XG4gICAgdGhpcy5odWREaXN0YW5jZSA9IG5ldyBjcmVhdGVqcy5UZXh0KCcwINC8JywgJzI1cHggR3VlcmlsbGEnLCAnIzAwMCcpO1xuICAgIHRoaXMuaHVkRGlzdGFuY2UueCA9IDIwO1xuICAgIHRoaXMuaHVkRGlzdGFuY2UueSA9IDE1O1xuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5odWREaXN0YW5jZSk7XG4gIH1cbiAgcmVzZXRTcGlrZShzcGlrZSkge1xuICAgIHNwaWtlLnNjYWxlWSA9ICsoMC43ICsgTWF0aC5yYW5kb20oKSAqIDAuNDUpLnRvRml4ZWQoMik7XG4gICAgc3Bpa2UueCArPSB0aGlzLndpZHRoICsgc3Bpa2UuYm91bmRzLndpZHRoO1xuICAgIGlmIChNYXRoLnJhbmRvbSgpID4gMC41KSB7XG4gICAgICBzcGlrZS55ID0gdGhpcy5oZWlnaHQgLSBHUk9VTkRfSEVJR0hUO1xuICAgIH0gZWxzZSB7XG4gICAgICBzcGlrZS55ID0gMDtcbiAgICAgIHNwaWtlLnNjYWxlWSA9IC1zcGlrZS5zY2FsZVk7XG4gICAgfVxuICAgIGRhdGFNYW5hZ2VyLnNwaWtlcy5wdXNoKHNwaWtlLnNjYWxlWSk7XG4gIH1cbiAgcGF1c2UodGV4dCkge1xuICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcbiAgICB0aGlzLnNoYWRvd092ZXJsYXkuc2V0VGV4dCh0ZXh0KTtcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuc2hhZG93T3ZlcmxheSk7XG4gIH1cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5oYW5kbGVBY3Rpb24oKSk7XG4gICAgdGhpcy5vbktleURvd24gPSBlID0+IHtcbiAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgMzI6XG4gICAgICAgICAgdGhpcy5oYW5kbGVBY3Rpb24oKTtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjc6XG4gICAgICAgICAgdGhpcy50b2dnbGVQYXVzZSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlEb3duKTtcbiAgfVxuICBoYW5kbGVBY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMucGF1c2VkKSB7XG4gICAgICB0aGlzLnRvZ2dsZVBhdXNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGVyby5mbGFwKCk7XG4gICAgICBkYXRhTWFuYWdlci5hY3Rpb25zW3RoaXMuc3RlcF0gPSAxO1xuICAgIH1cbiAgfVxuICB0b2dnbGVQYXVzZSgpIHtcbiAgICBpZiAodGhpcy5wYXVzZWQpIHtcbiAgICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XG4gICAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuc2hhZG93T3ZlcmxheSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGF1c2UoJ9Cd0LDQttC80LjRgtC1INC/0YDQvtCx0LXQuyDQuNC70LggZXNjJyk7XG4gICAgfVxuICB9XG4gIG1vdmVXb3JsZCgpIHtcbiAgICBpZiAodGhpcy5oZXJvLmRlYWQpIHtcbiAgICAgIHRoaXMuaGVyby54ICs9IHRoaXMuc3BlZWQgKiAwLjU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW92ZVNwaWtlcyh0aGlzLnNwZWVkKTtcbiAgICAgIHRoaXMuYmdTa3kubW92ZSh0aGlzLnNwZWVkICogMC4xKTtcbiAgICAgIHRoaXMuYmdNb3VudGFpbi5tb3ZlKHRoaXMuc3BlZWQgKiAwLjMpO1xuICAgICAgdGhpcy5iZ0dyb3VuZC5tb3ZlKHRoaXMuc3BlZWQpO1xuXG4gICAgICB0aGlzLmRpc3RhbmNlICs9IHRoaXMuc3BlZWQ7XG4gICAgICBkYXRhTWFuYWdlci5zY29yZSA9IE1hdGguZmxvb3IodGhpcy5kaXN0YW5jZSAvIDI1KTtcbiAgICAgIHRoaXMuaHVkRGlzdGFuY2UudGV4dCA9IGAke2RhdGFNYW5hZ2VyLnNjb3JlfSDQvGA7XG4gICAgfVxuICB9XG4gIG1vdmVTcGlrZXMoKSB7XG4gICAgdGhpcy5zcGlrZXMuZm9yRWFjaChzcGlrZSA9PiB7XG4gICAgICBzcGlrZS54IC09IHRoaXMuc3BlZWQ7XG4gICAgICBpZiAoc3Bpa2UueCA8IC1zcGlrZS5ib3VuZHMud2lkdGggLyAyKSB7XG4gICAgICAgIHRoaXMucmVzZXRTcGlrZShzcGlrZSk7XG4gICAgICAgIHRoaXMuc3BlZWQgKz0gMC4wNDtcbiAgICAgIH1cbiAgICAgIGlmIChuZGdtci5jaGVja1BpeGVsQ29sbGlzaW9uKHRoaXMuaGVybywgc3Bpa2UpKSB7XG4gICAgICAgIHRoaXMuaGVyby5kaWUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBtb3ZlSGVybygpIHtcbiAgICB0aGlzLmhlcm8ubW92ZSgpO1xuICAgIGlmICh0aGlzLmhlcm8ueSA8IDApIHtcbiAgICAgIHRoaXMuaGVyby52WSA9IDA7XG4gICAgICB0aGlzLmhlcm8ueSA9IDA7XG4gICAgfSBlbHNlIGlmICh0aGlzLmhlcm8ueSA+IHRoaXMuaGVpZ2h0ICsgdGhpcy5oZXJvLmJvdW5kcy5oZWlnaHQgLyAyKSB7XG4gICAgICBzY3JlZW5zTWFuYWdlci5jaGFuZ2UoJ0VuZFNjcmVlbicpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5oZXJvLnkgPiB0aGlzLmhlaWdodCAtIChHUk9VTkRfSEVJR0hUICsgdGhpcy5oZXJvLmJvdW5kcy5oZWlnaHQgLyAyKSkge1xuICAgICAgdGhpcy5oZXJvLmRpZSgpO1xuICAgIH1cbiAgfVxuICB0aWNrKCkge1xuICAgIGlmICh0aGlzLnBhdXNlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm1vdmVXb3JsZCgpO1xuICAgIHRoaXMubW92ZUhlcm8oKTtcbiAgICB0aGlzLnN0ZXAgKz0gMTtcbiAgfVxuICBkZXN0cm95KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd24pO1xuICB9XG59XG4iLCJpbXBvcnQgcmFuZG9tSW50IGZyb20gJ3JhbmRvbS1pbnQnO1xuaW1wb3J0IHNjcmVlbnNNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NjcmVlbnNNYW5hZ2VyJztcbmltcG9ydCBzZXJ2ZXJNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL3NlcnZlck1hbmFnZXInO1xuaW1wb3J0IGRhdGFNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXJzL2RhdGFNYW5hZ2VyJztcbmltcG9ydCBCYWNrZ3JvdW5kIGZyb20gJy4uL2Rpc3BsYXkvQmFja2dyb3VuZCc7XG5pbXBvcnQgSGVybyBmcm9tICcuLi9kaXNwbGF5L0hlcm8nO1xuaW1wb3J0IFNwaWtlIGZyb20gJy4uL2Rpc3BsYXkvU3Bpa2UnO1xuaW1wb3J0IEJ0biBmcm9tICcuLi9kaXNwbGF5L0J0bic7XG5cbmNvbnN0IEdST1VORF9IRUlHSFQgPSA4MDtcbmNvbnN0IFNUQVJUX1NQRUVEID0gNTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpblNjcmVlbiBleHRlbmRzIGNyZWF0ZWpzLkNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgdGhpcy5zcGVlZCA9IFNUQVJUX1NQRUVEO1xuICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5jcmVhdGVCZygpO1xuXG4gICAgY29uc3Qgd2F0aW5nVGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KCfQmNC00LXRgiDQv9C+0LTQsdC+0YAg0YHQvtC/0LXRgNC90LjQutCwJywgJzM1cHggR3VlcmlsbGEnLCAnIzAwMCcpO1xuICAgIHdhdGluZ1RleHQudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgd2F0aW5nVGV4dC54ID0gd2lkdGggLyAyO1xuICAgIHdhdGluZ1RleHQueSA9IDE3MDtcblxuICAgIGNvbnN0IGNhbmNlbEJ0biA9IG5ldyBCdG4oJ9Ce0YLQvNC10L3QsCcsICdvcmFuZ2UnKTtcbiAgICBjYW5jZWxCdG4ueCA9IHdpZHRoIC8gMjtcbiAgICBjYW5jZWxCdG4ueSA9IDM0MDtcbiAgICBjYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBzY3JlZW5zTWFuYWdlci5jaGFuZ2UoJ1N0YXJ0U2NyZWVuJykpO1xuXG4gICAgdGhpcy5hZGRDaGlsZCh3YXRpbmdUZXh0LCBjYW5jZWxCdG4pO1xuXG4gICAgZGF0YU1hbmFnZXIucG9zID0gcmFuZG9tSW50KDEpO1xuICAgIGNvbnN0IGVuZW15UmFuZ2UgPSBkYXRhTWFuYWdlci5maWVsZHMubm9ybWFsWzEgLSBkYXRhTWFuYWdlci5wb3NdO1xuICAgIGNvbnN0IGVuZW15RmllbGQgPSBgcHZwJHtyYW5kb21JbnQoZW5lbXlSYW5nZVswXSwgZW5lbXlSYW5nZVsxXSl9YDtcbiAgICBjb25zb2xlLndhcm4oZW5lbXlGaWVsZCk7XG5cbiAgICBQcm9taXNlLmFsbChbXG4gICAgICBzZXJ2ZXJNYW5hZ2VyLmdldChlbmVteUZpZWxkLCAxKS50aGVuKHIgPT4gdGhpcy5pbml0RGF0YShyKSksXG4gICAgICBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgTWF0aC5yYW5kb20oKSAqIDIwMDAgKyA1MDApKSxcbiAgICBdKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgdGhpcy5yZW1vdmVDaGlsZCh3YXRpbmdUZXh0LCBjYW5jZWxCdG4pO1xuICAgIH0pLmNhdGNoKGUgPT4ge1xuICAgICAgd2F0aW5nVGV4dC50ZXh0ID0gJ1BWUCDQstGA0LXQvNC10L3QvdC+INC90LXQtNC+0YHRgtGD0L/QvdC+IDooJztcbiAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgfVxuICBpbml0RGF0YShyZWNvcmQpIHtcbiAgICBkYXRhTWFuYWdlci5nYW1lVHlwZSA9ICdwdnAnO1xuICAgIGRhdGFNYW5hZ2VyLndpbiA9IGZhbHNlO1xuICAgIGRhdGFNYW5hZ2VyLmFjdGlvbnMgPSB7fTtcbiAgICBkYXRhTWFuYWdlci5zcGlrZXMgPSBbXTtcbiAgICBkYXRhTWFuYWdlci5lbmVteSA9IHJlY29yZC51c2VyO1xuICAgIHRoaXMuZW5lbXlTcGlrZXMgPSByZWNvcmQuc3Bpa2VzO1xuICAgIHRoaXMuZW5lbXlBY3Rpb25zID0gcmVjb3JkLmFjdGlvbnM7XG4gICAgaWYgKGRhdGFNYW5hZ2VyLnVzZXIuaWQgPT09IHJlY29yZC51c2VyLmlkKSB7XG4gICAgICBkYXRhTWFuYWdlci5lbmVteS5uYW1lID0gJ9Cf0YDQuNC30YDQsNGH0L3Ri9C5INC/0YLQuNGGJztcbiAgICB9XG4gIH1cbiAgaW5pdCgpIHtcbiAgICB0aGlzLnNwaWtlSW5kZXggPSAwO1xuICAgIHRoaXMuc3RlcCA9IDA7XG4gICAgdGhpcy5kaXN0YW5jZSA9IDA7XG5cbiAgICB0aGlzLmNyZWF0ZVNwaWtlcygpO1xuICAgIHRoaXMuY3JlYXRlSHVkKCk7XG5cbiAgICBjb25zdCBjb3VudGVyID0gbmV3IGNyZWF0ZWpzLlRleHQoMywgJzEyNXB4IEd1ZXJpbGxhJywgJyMwMDAnKTtcbiAgICBjb3VudGVyLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIGNvdW50ZXIueCA9IHRoaXMud2lkdGggLyAyO1xuICAgIGNvdW50ZXIueSA9IDMxMDtcblxuICAgIHRoaXMuYWRkQ2hpbGQoY291bnRlcik7XG5cbiAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGNvdW50ZXIudGV4dCAtPSAxO1xuICAgICAgaWYgKGNvdW50ZXIudGV4dCA8IDApIHtcbiAgICAgICAgdGhpcy5yZW1vdmVDaGlsZChjb3VudGVyKTtcbiAgICAgICAgdGhpcy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICB9XG4gICAgfSwgMTAwMCk7XG5cbiAgICB0aGlzLmhlcm8gPSB0aGlzLmNyZWF0ZUhlcm8oZGF0YU1hbmFnZXIucG9zLCBkYXRhTWFuYWdlci51c2VyLm5hbWUpO1xuICAgIHRoaXMuZW5lbXkgPSB0aGlzLmNyZWF0ZUhlcm8oMSAtIGRhdGFNYW5hZ2VyLnBvcywgZGF0YU1hbmFnZXIuZW5lbXkubmFtZSk7XG4gICAgdGhpcy5lbmVteS5hbHBoYSA9IDAuNTtcbiAgfVxuICBjcmVhdGVCZygpIHtcbiAgICB0aGlzLmJnU2t5ID0gbmV3IEJhY2tncm91bmQoJ3NreScsIHRoaXMud2lkdGgpO1xuICAgIHRoaXMuYmdNb3VudGFpbiA9IG5ldyBCYWNrZ3JvdW5kKCdtb3VudGFpbicsIHRoaXMud2lkdGgpO1xuICAgIHRoaXMuYmdHcm91bmQgPSBuZXcgQmFja2dyb3VuZCgnZ3JvdW5kJywgdGhpcy53aWR0aCk7XG4gICAgdGhpcy5iZ1NreS55ID0gdGhpcy5iZ01vdW50YWluLnkgPSB0aGlzLmJnR3JvdW5kLnkgPSB0aGlzLmhlaWdodDtcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMuYmdTa3ksIHRoaXMuYmdNb3VudGFpbiwgdGhpcy5iZ0dyb3VuZCk7XG4gIH1cbiAgY3JlYXRlU3Bpa2VzKCkge1xuICAgIHRoaXMuc3Bpa2VzID0gW25ldyBTcGlrZSgpLCBuZXcgU3Bpa2UoKV07XG4gICAgdGhpcy5zcGlrZXNbMF0ueCA9IC10aGlzLnNwaWtlc1swXS5ib3VuZHMud2lkdGggLyAyO1xuICAgIHRoaXMuc3Bpa2VzWzFdLnggPSB0aGlzLndpZHRoIC8gMjtcbiAgICB0aGlzLnNwaWtlcy5mb3JFYWNoKHNwaWtlID0+IHRoaXMucmVzZXRTcGlrZShzcGlrZSkpO1xuICAgIHRoaXMuYWRkQ2hpbGQoLi4udGhpcy5zcGlrZXMpO1xuICB9XG4gIGNyZWF0ZUhlcm8ocG9zLCBuYW1lKSB7XG4gICAgY29uc3QgaGVybyA9IG5ldyBIZXJvKGRhdGFNYW5hZ2VyLmhlcm9UeXBlKTtcbiAgICBoZXJvLnggPSB0aGlzLndpZHRoIC8gMiAtIDE4MCAqIHBvcztcbiAgICBoZXJvLnkgPSAxOTAgLSA1MCAqIHBvcztcblxuICAgIGNvbnN0IGhlcm9OYW1lID0gbmV3IGNyZWF0ZWpzLlRleHQobmFtZSwgJzI1cHggR3VlcmlsbGEnLCAnIzAwMCcpO1xuICAgIGhlcm9OYW1lLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIGhlcm9OYW1lLnkgPSBoZXJvLnkgLSAxMDA7XG4gICAgaGVyb05hbWUueCA9IGhlcm8ueDtcbiAgICB0aGlzLmFkZENoaWxkKGhlcm8sIGhlcm9OYW1lKTtcblxuICAgIGNyZWF0ZWpzLlR3ZWVuLmdldChoZXJvTmFtZSkud2FpdCgyNDAwKS50byh7IGFscGhhOiAwIH0sIDgwMClcbiAgICAgIC5jYWxsKCgpID0+IHRoaXMucmVtb3ZlQ2hpbGQoaGVyb05hbWUpKTtcblxuICAgIHJldHVybiBoZXJvO1xuICB9XG4gIGNyZWF0ZUh1ZCgpIHtcbiAgICB0aGlzLmh1ZERpc3RhbmNlID0gbmV3IGNyZWF0ZWpzLlRleHQoJzAg0LwnLCAnMjVweCBHdWVyaWxsYScsICcjMDAwJyk7XG4gICAgdGhpcy5odWREaXN0YW5jZS54ID0gMjA7XG4gICAgdGhpcy5odWREaXN0YW5jZS55ID0gMTU7XG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmh1ZERpc3RhbmNlKTtcbiAgfVxuICByZXNldFNwaWtlKHNwaWtlKSB7XG4gICAgc3Bpa2UueCArPSB0aGlzLndpZHRoICsgc3Bpa2UuYm91bmRzLndpZHRoO1xuXG4gICAgaWYgKHRoaXMuZW5lbXlTcGlrZXNbdGhpcy5zcGlrZUluZGV4XSkge1xuICAgICAgc3Bpa2Uuc2NhbGVZID0gdGhpcy5lbmVteVNwaWtlc1t0aGlzLnNwaWtlSW5kZXhdO1xuICAgICAgdGhpcy5zcGlrZUluZGV4ICs9IDE7XG5cbiAgICAgIGlmIChzcGlrZS5zY2FsZVkgPiAwKSB7XG4gICAgICAgIHNwaWtlLnkgPSB0aGlzLmhlaWdodCAtIEdST1VORF9IRUlHSFQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzcGlrZS55ID0gMDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3Bpa2Uuc2NhbGVZID0gKygwLjcgKyBNYXRoLnJhbmRvbSgpICogMC40NSkudG9GaXhlZCgyKTtcbiAgICAgIGlmIChNYXRoLnJhbmRvbSgpID4gMC41KSB7XG4gICAgICAgIHNwaWtlLnkgPSB0aGlzLmhlaWdodCAtIEdST1VORF9IRUlHSFQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzcGlrZS55ID0gMDtcbiAgICAgICAgc3Bpa2Uuc2NhbGVZID0gLXNwaWtlLnNjYWxlWTtcbiAgICAgIH1cbiAgICB9XG4gICAgZGF0YU1hbmFnZXIuc3Bpa2VzLnB1c2goc3Bpa2Uuc2NhbGVZKTtcbiAgfVxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmhhbmRsZUFjdGlvbigpKTtcbiAgICB0aGlzLm9uS2V5RG93biA9IGUgPT4ge1xuICAgICAgdGhpcy5oYW5kbGVBY3Rpb24oKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bik7XG4gIH1cbiAgaGFuZGxlQWN0aW9uKCkge1xuICAgIGlmICghdGhpcy5zdGFydGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuaGVyby5mbGFwKCk7XG4gICAgZGF0YU1hbmFnZXIuYWN0aW9uc1t0aGlzLnN0ZXBdID0gMTtcbiAgfVxuICBtb3ZlV29ybGQoKSB7XG4gICAgdGhpcy5tb3ZlU3Bpa2VzKHRoaXMuc3BlZWQpO1xuICAgIHRoaXMuYmdTa3kubW92ZSh0aGlzLnNwZWVkICogMC4xKTtcbiAgICB0aGlzLmJnTW91bnRhaW4ubW92ZSh0aGlzLnNwZWVkICogMC4zKTtcbiAgICB0aGlzLmJnR3JvdW5kLm1vdmUodGhpcy5zcGVlZCk7XG5cbiAgICB0aGlzLmRpc3RhbmNlICs9IHRoaXMuc3BlZWQ7XG4gICAgZGF0YU1hbmFnZXIuc2NvcmUgPSBNYXRoLmZsb29yKHRoaXMuZGlzdGFuY2UgLyAyNSk7XG4gICAgdGhpcy5odWREaXN0YW5jZS50ZXh0ID0gYCR7ZGF0YU1hbmFnZXIuc2NvcmV9INC8YDtcbiAgfVxuICBtb3ZlU3Bpa2VzKCkge1xuICAgIHRoaXMuc3Bpa2VzLmZvckVhY2goc3Bpa2UgPT4ge1xuICAgICAgc3Bpa2UueCAtPSB0aGlzLnNwZWVkO1xuICAgICAgaWYgKHNwaWtlLnggPCAtc3Bpa2UuYm91bmRzLndpZHRoIC8gMikge1xuICAgICAgICB0aGlzLnJlc2V0U3Bpa2Uoc3Bpa2UpO1xuICAgICAgICB0aGlzLnNwZWVkICs9IDAuMDQ7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgbW92ZUhlcm8oaGVybykge1xuICAgIGhlcm8ubW92ZSgpO1xuICAgIGlmIChoZXJvLnkgPCAwKSB7XG4gICAgICBoZXJvLnZZID0gMDtcbiAgICAgIGhlcm8ueSA9IDA7XG4gICAgfSBlbHNlIGlmIChoZXJvLnkgPiB0aGlzLmhlaWdodCArIGhlcm8uYm91bmRzLmhlaWdodCAvIDIpIHtcbiAgICAgIGlmIChoZXJvID09PSB0aGlzLmhlcm8pIHtcbiAgICAgICAgc2NyZWVuc01hbmFnZXIuY2hhbmdlKCdFbmRTY3JlZW4nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGFNYW5hZ2VyLndpbiA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChoZXJvLnkgPiB0aGlzLmhlaWdodCAtIChHUk9VTkRfSEVJR0hUICsgaGVyby5ib3VuZHMuaGVpZ2h0IC8gMikpIHtcbiAgICAgIGhlcm8uZGllKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNwaWtlcy5zb21lKHNwaWtlID0+IG5kZ21yLmNoZWNrUGl4ZWxDb2xsaXNpb24oaGVybywgc3Bpa2UpKSkge1xuICAgICAgaGVyby5kaWUoKTtcbiAgICB9XG4gIH1cbiAgdGljaygpIHtcbiAgICBpZiAoIXRoaXMuc3RhcnRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm1vdmVXb3JsZCgpO1xuICAgIHRoaXMubW92ZUhlcm8odGhpcy5oZXJvKTtcbiAgICB0aGlzLm1vdmVIZXJvKHRoaXMuZW5lbXkpO1xuXG4gICAgdGhpcy5zdGVwICs9IDE7XG4gICAgaWYgKHRoaXMuZW5lbXlBY3Rpb25zW3RoaXMuc3RlcF0pIHtcbiAgICAgIHRoaXMuZW5lbXkuZmxhcCgpO1xuICAgIH1cbiAgfVxuICBkZXN0cm95KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd24pO1xuICB9XG59XG4iLCJpbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcbmltcG9ydCBkYXRhTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9kYXRhTWFuYWdlcic7XG5pbXBvcnQgc2VydmVyTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zZXJ2ZXJNYW5hZ2VyJztcbmltcG9ydCBHdWkgZnJvbSAnLi4vZGlzcGxheS9HdWknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYXRpbmdTY3JlZW4gZXh0ZW5kcyBjcmVhdGVqcy5Db250YWluZXIge1xuICBjb25zdHJ1Y3Rvcih3aWR0aCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG5cbiAgICB0aGlzLmJnID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChhc3NldHNNYW5hZ2VyLmdldFJlc3VsdCgnc3RhcnQnKSk7XG4gICAgdGhpcy5ndWkgPSBuZXcgR3VpKHdpZHRoKTtcblxuICAgIHRoaXMudGl0bGUgPSBuZXcgY3JlYXRlanMuVGV4dCgn0KDQtdC50YLQuNC90LMnLCAnMzVweCBHdWVyaWxsYScsICcjMDAwJyk7XG4gICAgdGhpcy50aXRsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICB0aGlzLnRpdGxlLnggPSB0aGlzLndpZHRoIC8gMjtcbiAgICB0aGlzLnRpdGxlLnkgPSAzNTtcblxuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5iZywgdGhpcy5ndWksIHRoaXMudGl0bGUpO1xuXG4gICAgc2VydmVyTWFuYWdlci5nZXQoJ3JhdGluZ1RhYmxlJywgMSlcbiAgICAgIC8vIHRvZG86IHJlbW92ZSBsYXRlciwgbm93IGl0IGFkZCByZWNvcmRzIGZvciBvbGQgdXNlcnNcbiAgICAgIC50aGVuKHJlY2FsY1JhdGluZ1RhYmxlKVxuICAgICAgLnRoZW4ociA9PiB0aGlzLnNob3dSYXRpbmcocikpXG4gICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICBjb25zdCB0ZXh0ID0gbmV3IGNyZWF0ZWpzLlRleHQoJ9Cg0LXQudGC0LjQvdCzINCy0YDQtdC80LXQvdC90L4g0L3QtdC00L7RgdGC0YPQv9C10L0gOignLCAnMjVweCBHdWVyaWxsYScsICcjMDAwJyk7XG4gICAgICAgIHRleHQudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgIHRleHQueCA9IHRoaXMud2lkdGggLyAyO1xuICAgICAgICB0ZXh0LnkgPSAxNTA7XG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGV4dCk7XG4gICAgICB9KTtcbiAgfVxuICBzaG93UmF0aW5nKHJhdGluZ1RhYmxlKSB7XG4gICAgbGV0IHdpbm5lciA9IGZhbHNlO1xuXG4gICAgcmF0aW5nVGFibGUuZm9yRWFjaCgoZWwsIGkpID0+IHtcbiAgICAgIGNvbnN0IHRleHQgPSBuZXcgY3JlYXRlanMuVGV4dChgJHtpICsgMX0gJHtlbC5uYW1lfSAke2VsLnNjb3JlfSDQvGAsICcyNXB4IEd1ZXJpbGxhJywgJyMwMDAnKTtcbiAgICAgIHRleHQueSA9IDEyMCArIGkgKiA0MDtcbiAgICAgIHRleHQueCA9IDEyMDtcbiAgICAgIHRoaXMuYWRkQ2hpbGQodGV4dCk7XG5cbiAgICAgIGlmIChlbC5pZCA9PT0gZGF0YU1hbmFnZXIudXNlci5pZCkge1xuICAgICAgICB3aW5uZXIgPSB0cnVlO1xuICAgICAgICB0ZXh0LmNvbG9yID0gJyM3RUNFMkUnO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKCF3aW5uZXIpIHtcbiAgICAgIGNvbnN0IHRleHQgPSBuZXcgY3JlYXRlanMuVGV4dChgLSAke2RhdGFNYW5hZ2VyLnVzZXIubmFtZX0gJHtkYXRhTWFuYWdlci5tYXhTY29yZX0g0LxgLCAnMjVweCBHdWVyaWxsYScsICcjN0VDRTJFJyk7XG4gICAgICB0ZXh0LnkgPSAxMjAgKyByYXRpbmdUYWJsZS5sZW5ndGggKiA0MDtcbiAgICAgIHRleHQueCA9IDEyMDtcbiAgICAgIHRoaXMuYWRkQ2hpbGQodGV4dCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlY2FsY1JhdGluZ1RhYmxlKHJhdGluZ1RhYmxlKSB7XG4gIGlmIChyYXRpbmdUYWJsZVtyYXRpbmdUYWJsZS5sZW5ndGggLSAxXS5zY29yZSA8IGRhdGFNYW5hZ2VyLm1heFNjb3JlKSB7XG4gICAgY29uc3QgdXNlclJhdGluZyA9IHJhdGluZ1RhYmxlLmZpbmQoZWwgPT4gZWwuaWQgPT09IGRhdGFNYW5hZ2VyLnVzZXIuaWQpO1xuXG4gICAgaWYgKHVzZXJSYXRpbmcpIHtcbiAgICAgIHVzZXJSYXRpbmcuc2NvcmUgPSBkYXRhTWFuYWdlci5tYXhTY29yZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbmV3UmF0aW5nID0ge1xuICAgICAgICBpZDogZGF0YU1hbmFnZXIudXNlci5pZCxcbiAgICAgICAgbmFtZTogZGF0YU1hbmFnZXIudXNlci5uYW1lLFxuICAgICAgICBzY29yZTogZGF0YU1hbmFnZXIubWF4U2NvcmUsXG4gICAgICB9O1xuICAgICAgaWYgKHJhdGluZ1RhYmxlLmxlbmd0aCA8IDEwKSB7XG4gICAgICAgIHJhdGluZ1RhYmxlLnB1c2gobmV3UmF0aW5nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJhdGluZ1RhYmxlW3JhdGluZ1RhYmxlLmxlbmd0aCAtIDFdID0gbmV3UmF0aW5nO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJhdGluZ1RhYmxlLnNvcnQoKGEsIGIpID0+IGIuc2NvcmUgLSBhLnNjb3JlKTtcbiAgICBzZXJ2ZXJNYW5hZ2VyLnNldCgncmF0aW5nVGFibGUnLCByYXRpbmdUYWJsZSwgMSk7XG4gIH1cbiAgcmV0dXJuIHJhdGluZ1RhYmxlO1xufVxuIiwiaW1wb3J0IHNlcnZlck1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvc2VydmVyTWFuYWdlcic7XG5pbXBvcnQgYXNzZXRzTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9hc3NldHNNYW5hZ2VyJztcbmltcG9ydCBzY3JlZW5zTWFuYWdlciBmcm9tICcuLi9tYW5hZ2Vycy9zY3JlZW5zTWFuYWdlcic7XG5pbXBvcnQgZGF0YU1hbmFnZXIgZnJvbSAnLi4vbWFuYWdlcnMvZGF0YU1hbmFnZXInO1xuaW1wb3J0IEd1aSBmcm9tICcuLi9kaXNwbGF5L0d1aSc7XG5pbXBvcnQgSGVybyBmcm9tICcuLi9kaXNwbGF5L0hlcm8nO1xuaW1wb3J0IEJ0biBmcm9tICcuLi9kaXNwbGF5L0J0bic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXJ0U2NyZWVuIGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICB0aGlzLmJnID0gbmV3IGNyZWF0ZWpzLkJpdG1hcChhc3NldHNNYW5hZ2VyLmdldFJlc3VsdCgnc3RhcnQnKSk7XG4gICAgdGhpcy5ndWkgPSBuZXcgR3VpKHdpZHRoKTtcblxuICAgIHRoaXMuc3RhcnRCdG4gPSBuZXcgQnRuKCfQmNCz0YDQsNGC0YwnKTtcbiAgICB0aGlzLnN0YXJ0QnRuLnggPSB3aWR0aCAvIDI7XG4gICAgdGhpcy5zdGFydEJ0bi55ID0gMzIwO1xuXG4gICAgdGhpcy5wdnBCdG4gPSBuZXcgQnRuKCdQVlAnKTtcbiAgICB0aGlzLnB2cEJ0bi54ID0gd2lkdGggLyAyO1xuICAgIHRoaXMucHZwQnRuLnkgPSA0MTA7XG5cbiAgICB0aGlzLmludml0ZUJ0biA9IG5ldyBCdG4oJ9Cf0L7Qt9Cy0LDRgtGMINCx0YDQvicsICdvcmFuZ2UnKTtcbiAgICB0aGlzLmludml0ZUJ0bi54ID0gd2lkdGggLyAyO1xuICAgIHRoaXMuaW52aXRlQnRuLnkgPSA1MDA7XG5cbiAgICB0aGlzLmhlcm8gPSBuZXcgSGVybygnbW9uc3RlcicpO1xuICAgIHRoaXMuaGVyby54ID0gd2lkdGggLyAyO1xuICAgIHRoaXMuaGVyby55ID0gMTkwO1xuXG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmJnLCB0aGlzLmd1aSwgdGhpcy5oZXJvLCB0aGlzLnN0YXJ0QnRuLCB0aGlzLnB2cEJ0biwgdGhpcy5pbnZpdGVCdG4pO1xuXG4gICAgaWYgKGRhdGFNYW5hZ2VyLm1heFNjb3JlKSB7XG4gICAgICB0aGlzLnNjb3JlID0gbmV3IGNyZWF0ZWpzLlRleHQoYNCg0LXQutC+0YDQtDogJHtkYXRhTWFuYWdlci5tYXhTY29yZX0g0LxgLCAnMjVweCBHdWVyaWxsYScsICcjMDAwJyk7XG4gICAgICB0aGlzLnNjb3JlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgdGhpcy5zY29yZS54ID0gdGhpcy53aWR0aCAvIDI7XG4gICAgICB0aGlzLnNjb3JlLnkgPSA0MDtcbiAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5zY29yZSk7XG4gICAgfVxuXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gIH1cbiAgLy8gY3JlYXRlSGVyb2VzKCkge1xuICAvLyAgIHRoaXMuaGVyb2VzID0gW1xuICAvLyAgICAgbmV3IEhlcm8oJ2JpcmQnKSxcbiAgLy8gICAgIG5ldyBIZXJvKCdtb25zdGVyJyksXG4gIC8vICAgICBuZXcgSGVybygnY2hpY2tlbicpLFxuICAvLyAgIF07XG4gIC8vICAgdGhpcy5oZXJvZXMuZm9yRWFjaCgoaGVybywgaSkgPT4ge1xuICAvLyAgICAgaGVyby55ID0gdGhpcy5oZWlnaHQgLyAyO1xuICAvLyAgICAgaGVyby54ID0gKGkgKyAxKSAqIHRoaXMud2lkdGggLyAodGhpcy5oZXJvZXMubGVuZ3RoICsgMSk7XG4gIC8vICAgICBoZXJvLmN1cnNvciA9ICdwb2ludGVyJztcbiAgLy8gICAgIGhlcm8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnNlbGVjdEhlcm8oaGVybykpO1xuICAvLyAgICAgaGVyby5jYWNoZSgwLCAwLCBoZXJvLmJvdW5kcy53aWR0aCwgaGVyby5ib3VuZHMuaGVpZ2h0KTtcbiAgLy8gICB9KTtcbiAgLy8gICB0aGlzLmhlcm9GaWx0ZXIgPSBuZXcgY3JlYXRlanMuQ29sb3JGaWx0ZXIoMC42LCAwLjYsIDAuNik7XG4gIC8vICAgdGhpcy5yZXNldEhlcm9lcygpO1xuICAvLyAgIHRoaXMuYWRkQ2hpbGQoLi4udGhpcy5oZXJvZXMpO1xuICAvLyB9XG4gIC8vIHJlc2V0SGVyb2VzKCkge1xuICAvLyAgIHRoaXMuaGVyb2VzLmZvckVhY2goaGVybyA9PiB7XG4gIC8vICAgICBoZXJvLmZpbHRlcnMgPSBbdGhpcy5oZXJvRmlsdGVyXTtcbiAgLy8gICAgIGhlcm8udXBkYXRlQ2FjaGUoKTtcbiAgLy8gICAgIGhlcm8uc2NhbGVYID0gMC44NTtcbiAgLy8gICAgIGhlcm8uc2NhbGVZID0gMC44NTtcbiAgLy8gICB9KTtcbiAgLy8gfVxuICAvLyBzZWxlY3RIZXJvKGhlcm8pIHtcbiAgLy8gICB0aGlzLnJlc2V0SGVyb2VzKCk7XG5cbiAgLy8gICBoZXJvLmZpbHRlcnMgPSBbXTtcbiAgLy8gICBoZXJvLnVwZGF0ZUNhY2hlKCk7XG4gIC8vICAgaGVyby5zY2FsZVggPSAxO1xuICAvLyAgIGhlcm8uc2NhbGVZID0gMTtcbiAgLy8gICBoZXJvLmZsYXAoKTtcblxuICAvLyAgIGlmICghdGhpcy5zdGFydEJ0bi5lbmFibGVkKSB7XG4gIC8vICAgICB0aGlzLnN0YXJ0QnRuLmVuYWJsZSgpO1xuICAvLyAgIH1cblxuICAvLyAgIGRhdGFNYW5hZ2VyLmhlcm9UeXBlID0gaGVyby50eXBlO1xuICAvLyB9XG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy5zdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+XG4gICAgICBzY3JlZW5zTWFuYWdlci5jaGFuZ2UoJ01haW5TY3JlZW4nKSk7XG4gICAgdGhpcy5wdnBCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PlxuICAgICAgc2NyZWVuc01hbmFnZXIuY2hhbmdlKCdQVlBTY3JlZW4nKSk7XG4gICAgdGhpcy5pbnZpdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PlxuICAgICAgc2VydmVyTWFuYWdlci5pbnZpdGUoKSk7XG5cbiAgICB0aGlzLm9uS2V5RG93biA9IGUgPT4ge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMzIpIHtcbiAgICAgICAgc2NyZWVuc01hbmFnZXIuY2hhbmdlKCdNYWluU2NyZWVuJyk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bik7XG4gIH1cbiAgZGVzdHJveSgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlEb3duKTtcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobWluLCBtYXgpIHtcblx0aWYgKG1heCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0bWF4ID0gbWluO1xuXHRcdG1pbiA9IDA7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1pbiAhPT0gJ251bWJlcicgfHwgdHlwZW9mIG1heCAhPT0gJ251bWJlcicpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhbGwgYXJndW1lbnRzIHRvIGJlIG51bWJlcnMnKTtcblx0fVxuXG5cdHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pO1xufTtcbiJdfQ==
