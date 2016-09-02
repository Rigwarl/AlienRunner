(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hero = function (_createjs$Sprite) {
  _inherits(Hero, _createjs$Sprite);

  function Hero(queue) {
    _classCallCheck(this, Hero);

    var ss = new createjs.SpriteSheet({
      images: [queue.getResult('char')],
      frames: { width: 100, height: 78, spacing: 4 },
      animations: {
        fly: 0,
        flap: [1, 3, 'fly'],
        dead: [4]
      }
    });

    var _this = _possibleConstructorReturn(this, (Hero.__proto__ || Object.getPrototypeOf(Hero)).call(this, ss));

    _this.bounds = _this.getBounds();
    _this.regX = _this.bounds.width / 2;
    _this.regY = _this.bounds.height / 2;
    _this.a = 550;
    return _this;
  }

  _createClass(Hero, [{
    key: 'reset',
    value: function reset() {
      this.dead = false;
      this.rotation = 0;
      this.vY = 0;
      this.gotoAndStop('fly');
    }
  }, {
    key: 'flap',
    value: function flap() {
      if (this.dead) {
        return;
      }
      this.vY = Math.max(this.vY - 375, -375);
      this.gotoAndPlay('flap');
      createjs.Sound.play('flap');
    }
  }, {
    key: 'move',
    value: function move(time) {
      this.y += (this.a * time * 0.5 + this.vY) * time;
      this.vY += this.a * time;
    }
  }, {
    key: 'die',
    value: function die() {
      if (this.dead) {
        return;
      }
      this.dead = true;
      this.rotation = 20;
      this.gotoAndStop('dead');
      createjs.Sound.play('loose');
    }
  }]);

  return Hero;
}(createjs.Sprite);

exports.default = Hero;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Loader = function (_createjs$LoadQueue) {
  _inherits(Loader, _createjs$LoadQueue);

  function Loader() {
    _classCallCheck(this, Loader);

    var _this = _possibleConstructorReturn(this, (Loader.__proto__ || Object.getPrototypeOf(Loader)).call(this));

    createjs.Sound.alternateExtensions = ['mp3'];
    _this.installPlugin(createjs.Sound);
    _this.loadManifest([{ id: 'char', src: 'img/monster-sprite.png' }, { id: 'spike', src: 'img/spike.png' }, { id: 'sky', src: 'img/bg/sky.png' }, { id: 'mountain', src: 'img/bg/mountain.png' }, { id: 'ground', src: 'img/bg/ground.png' }, { id: 'back', src: 'sound/background.ogg' }, { id: 'flap', src: 'sound/flap.ogg' }, { id: 'loose', src: 'sound/loose.ogg' }]);
    return _this;
  }

  return Loader;
}(createjs.LoadQueue);

exports.default = Loader;

},{}],3:[function(require,module,exports){
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
    _this.shadow.graphics.beginFill('rgba(0,0,0,0.6)').drawRect(0, 0, width, height);

    _this.shadowText = new createjs.Text('', '25px Arial', '#fff');
    _this.shadowText.y = height / 2;
    _this.shadowText.x = width / 2;
    _this.shadowText.textAlign = 'center';
    _this.shadowText.textBaseline = 'middle';

    _this.addChild(_this.shadow, _this.shadowText);
    return _this;
  }

  _createClass(ShadowOverlay, [{
    key: 'setText',
    value: function setText(text) {
      this.shadowText.text = text;
    }
  }]);

  return ShadowOverlay;
}(createjs.Container);

exports.default = ShadowOverlay;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Spike = function (_createjs$Bitmap) {
  _inherits(Spike, _createjs$Bitmap);

  function Spike(queue) {
    _classCallCheck(this, Spike);

    var _this = _possibleConstructorReturn(this, (Spike.__proto__ || Object.getPrototypeOf(Spike)).call(this, queue.getResult('spike')));

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

},{}],5:[function(require,module,exports){
'use strict';

var _Loader = require('./Loader');

var _Loader2 = _interopRequireDefault(_Loader);

var _Hero = require('./Hero');

var _Hero2 = _interopRequireDefault(_Hero);

var _Spike = require('./Spike');

var _Spike2 = _interopRequireDefault(_Spike);

var _ShadowOverlay = require('./ShadowOverlay');

var _ShadowOverlay2 = _interopRequireDefault(_ShadowOverlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var queue = new _Loader2.default();
queue.addEventListener('complete', startGame);

var canvas = void 0;
var stage = void 0;
var shadowOverlay = void 0;
var hero = void 0;
var spikes = void 0;
var hudDistance = void 0;

var bg = {
  sky: null,
  mountain: null,
  ground: null,
  skyImg: null,
  mountainImg: null,
  groundImg: null
};

var speed = 300;
var distance = 0;

var paused = true;
var finished = true;

function startGame() {
  var _stage;

  canvas = document.querySelector('#game-stage');
  stage = new createjs.Stage(canvas);

  canvas.classList.remove('loading');

  createBgLayer('sky');
  createBgLayer('mountain');
  createBgLayer('ground');

  hero = new _Hero2.default(queue);
  spikes = [new _Spike2.default(queue), new _Spike2.default(queue)];
  hudDistance = new createjs.Text('', '25px Arial', '#000');
  hudDistance.x = hudDistance.y = 15;
  shadowOverlay = new _ShadowOverlay2.default(canvas.width, canvas.height);

  (_stage = stage).addChild.apply(_stage, _toConsumableArray(spikes).concat([hero, hudDistance]));

  resetGame();
  pauseGame('Press space to flap, esc to pause');
  bindEvents();

  createjs.Sound.play('back', { loop: -1, volume: 0.35 });
  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.addEventListener('tick', tick);
}

function createBgLayer(name) {
  var img = queue.getResult(name);
  var num = Math.ceil(canvas.width / img.width);
  var width = num * img.width + Math.min(canvas.width, img.width);

  bg[name] = new createjs.Shape();
  bg[name].graphics.beginBitmapFill(img, 'repeat-x').drawRect(0, 0, width, img.height);
  bg[name].y = canvas.height;
  bg[name].regY = img.height;
  bg[name].cache(0, 0, width, img.height);

  bg[name + 'Img'] = img;
  stage.addChild(bg[name]);
}

function moveBgLayer(name, path) {
  bg[name].x -= path;
  bg[name].x %= bg[name + 'Img'].width;
}

function resetGame() {
  hero.reset();
  hero.x = canvas.width / 2;
  hero.y = 200;

  spikes.forEach(function (spike, i) {
    resetSpike(spike);
    spike.x += (canvas.width + spike.bounds.width) * i * 0.5;
  });

  distance = 0;
  hudDistance.text = '0 m';
}

function resetSpike(spike) {
  spike.reset();
  spike.x = canvas.width + spike.bounds.width / 2;
  if (Math.random() > 0.5) {
    spike.y = canvas.height - 81;
    spike.rotation = 0;
  } else {
    spike.y = 0;
    spike.rotation = 180;
  }
}

function moveHero(time) {
  hero.move(time);
  if (hero.y < 0) {
    hero.vY = 0;
    hero.y = 0;
  } else if (hero.y > canvas.height + hero.bounds.height / 2) {
    finished = true;
    pauseGame('Press space to restart');
  } else if (hero.y > 485) {
    hero.die();
  }
}

function pauseGame(text) {
  paused = true;
  shadowOverlay.setText(text);
  stage.addChild(shadowOverlay);
  stage.update();
}

function togglePause() {
  if (finished) {
    return;
  }
  if (paused) {
    paused = false;
    stage.removeChild(shadowOverlay);
  } else {
    pauseGame('Press esc to unpause');
  }
}

function moveWorld(time) {
  var path = speed * time;
  if (hero.dead) {
    hero.x += path * 0.5;
  } else {
    moveSpikes(path);
    moveBgLayer('sky', path * 0.1);
    moveBgLayer('mountain', path * 0.3);
    moveBgLayer('ground', path);
    distance += path;
    hudDistance.text = Math.floor(distance / 25) + ' m';
  }
}

function moveSpikes(path) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = spikes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var spike = _step.value;

      spike.x -= path;
      if (spike.x < -spike.bounds.width / 2) {
        resetSpike(spike);
      }
      if (ndgmr.checkPixelCollision(hero, spike)) {
        hero.die();
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

function restartGame() {
  paused = false;
  finished = false;
  resetGame();
  stage.removeChild(shadowOverlay);
}

function bindEvents() {
  window.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
      case 32:
        handleAction();
        break;
      case 27:
        togglePause();
        break;
    }
  });
  window.addEventListener('touchstart', handleAction);
}

function handleAction() {
  if (finished) {
    restartGame();
  } else {
    hero.flap();
  }
}

function tick(e) {
  if (paused) {
    return;
  }
  var sec = e.delta * 0.001;
  moveWorld(sec);
  moveHero(sec);
  stage.update();
}

},{"./Hero":1,"./Loader":2,"./ShadowOverlay":3,"./Spike":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvc3JjL0hlcm8uanMiLCJhcHAvanMvc3JjL0xvYWRlci5qcyIsImFwcC9qcy9zcmMvU2hhZG93T3ZlcmxheS5qcyIsImFwcC9qcy9zcmMvU3Bpa2UuanMiLCJhcHAvanMvc3JjL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0lDQXFCLEk7OztBQUNuQixnQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQ2pCLFFBQU0sS0FBSyxJQUFJLFNBQVMsV0FBYixDQUF5QjtBQUNsQyxjQUFRLENBQUMsTUFBTSxTQUFOLENBQWdCLE1BQWhCLENBQUQsQ0FEMEI7QUFFbEMsY0FBUSxFQUFFLE9BQU8sR0FBVCxFQUFjLFFBQVEsRUFBdEIsRUFBMEIsU0FBUyxDQUFuQyxFQUYwQjtBQUdsQyxrQkFBWTtBQUNWLGFBQUssQ0FESztBQUVWLGNBQU0sQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLEtBQVAsQ0FGSTtBQUdWLGNBQU0sQ0FBQyxDQUFEO0FBSEk7QUFIc0IsS0FBekIsQ0FBWDs7QUFEaUIsNEdBVVgsRUFWVzs7QUFXakIsVUFBSyxNQUFMLEdBQWMsTUFBSyxTQUFMLEVBQWQ7QUFDQSxVQUFLLElBQUwsR0FBWSxNQUFLLE1BQUwsQ0FBWSxLQUFaLEdBQW9CLENBQWhDO0FBQ0EsVUFBSyxJQUFMLEdBQVksTUFBSyxNQUFMLENBQVksTUFBWixHQUFxQixDQUFqQztBQUNBLFVBQUssQ0FBTCxHQUFTLEdBQVQ7QUFkaUI7QUFlbEI7Ozs7NEJBQ087QUFDTixXQUFLLElBQUwsR0FBWSxLQUFaO0FBQ0EsV0FBSyxRQUFMLEdBQWdCLENBQWhCO0FBQ0EsV0FBSyxFQUFMLEdBQVUsQ0FBVjtBQUNBLFdBQUssV0FBTCxDQUFpQixLQUFqQjtBQUNEOzs7MkJBQ007QUFDTCxVQUFJLEtBQUssSUFBVCxFQUFlO0FBQ2I7QUFDRDtBQUNELFdBQUssRUFBTCxH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InNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVybyBleHRlbmRzIGNyZWF0ZWpzLlNwcml0ZSB7XG4gIGNvbnN0cnVjdG9yKHF1ZXVlKSB7XG4gICAgY29uc3Qgc3MgPSBuZXcgY3JlYXRlanMuU3ByaXRlU2hlZXQoe1xuICAgICAgaW1hZ2VzOiBbcXVldWUuZ2V0UmVzdWx0KCdjaGFyJyldLFxuICAgICAgZnJhbWVzOiB7IHdpZHRoOiAxMDAsIGhlaWdodDogNzgsIHNwYWNpbmc6IDQgfSxcbiAgICAgIGFuaW1hdGlvbnM6IHtcbiAgICAgICAgZmx5OiAwLFxuICAgICAgICBmbGFwOiBbMSwgMywgJ2ZseSddLFxuICAgICAgICBkZWFkOiBbNF0sXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHN1cGVyKHNzKTtcbiAgICB0aGlzLmJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCk7XG4gICAgdGhpcy5yZWdYID0gdGhpcy5ib3VuZHMud2lkdGggLyAyO1xuICAgIHRoaXMucmVnWSA9IHRoaXMuYm91bmRzLmhlaWdodCAvIDI7XG4gICAgdGhpcy5hID0gNTUwO1xuICB9XG4gIHJlc2V0KCkge1xuICAgIHRoaXMuZGVhZCA9IGZhbHNlO1xuICAgIHRoaXMucm90YXRpb24gPSAwO1xuICAgIHRoaXMudlkgPSAwO1xuICAgIHRoaXMuZ290b0FuZFN0b3AoJ2ZseScpO1xuICB9XG4gIGZsYXAoKSB7XG4gICAgaWYgKHRoaXMuZGVhZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnZZID0gTWF0aC5tYXgodGhpcy52WSAtIDM3NSwgLTM3NSk7XG4gICAgdGhpcy5nb3RvQW5kUGxheSgnZmxhcCcpO1xuICAgIGNyZWF0ZWpzLlNvdW5kLnBsYXkoJ2ZsYXAnKTtcbiAgfVxuICBtb3ZlKHRpbWUpIHtcbiAgICB0aGlzLnkgKz0gKCh0aGlzLmEgKiB0aW1lICogMC41KSArIHRoaXMudlkpICogdGltZTtcbiAgICB0aGlzLnZZICs9IHRoaXMuYSAqIHRpbWU7XG4gIH1cbiAgZGllKCkge1xuICAgIGlmICh0aGlzLmRlYWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5kZWFkID0gdHJ1ZTtcbiAgICB0aGlzLnJvdGF0aW9uID0gMjA7XG4gICAgdGhpcy5nb3RvQW5kU3RvcCgnZGVhZCcpO1xuICAgIGNyZWF0ZWpzLlNvdW5kLnBsYXkoJ2xvb3NlJyk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYWRlciBleHRlbmRzIGNyZWF0ZWpzLkxvYWRRdWV1ZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgY3JlYXRlanMuU291bmQuYWx0ZXJuYXRlRXh0ZW5zaW9ucyA9IFsnbXAzJ107XG4gICAgdGhpcy5pbnN0YWxsUGx1Z2luKGNyZWF0ZWpzLlNvdW5kKTtcbiAgICB0aGlzLmxvYWRNYW5pZmVzdChbXG4gICAgICB7IGlkOiAnY2hhcicsIHNyYzogJ2ltZy9tb25zdGVyLXNwcml0ZS5wbmcnIH0sXG4gICAgICB7IGlkOiAnc3Bpa2UnLCBzcmM6ICdpbWcvc3Bpa2UucG5nJyB9LFxuICAgICAgeyBpZDogJ3NreScsIHNyYzogJ2ltZy9iZy9za3kucG5nJyB9LFxuICAgICAgeyBpZDogJ21vdW50YWluJywgc3JjOiAnaW1nL2JnL21vdW50YWluLnBuZycgfSxcbiAgICAgIHsgaWQ6ICdncm91bmQnLCBzcmM6ICdpbWcvYmcvZ3JvdW5kLnBuZycgfSxcbiAgICAgIHsgaWQ6ICdiYWNrJywgc3JjOiAnc291bmQvYmFja2dyb3VuZC5vZ2cnIH0sXG4gICAgICB7IGlkOiAnZmxhcCcsIHNyYzogJ3NvdW5kL2ZsYXAub2dnJyB9LFxuICAgICAgeyBpZDogJ2xvb3NlJywgc3JjOiAnc291bmQvbG9vc2Uub2dnJyB9LFxuICAgIF0pO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTaGFkb3dPdmVybGF5IGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnNoYWRvdyA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICAgIHRoaXMuc2hhZG93LmdyYXBoaWNzLmJlZ2luRmlsbCgncmdiYSgwLDAsMCwwLjYpJykuZHJhd1JlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICB0aGlzLnNoYWRvd1RleHQgPSBuZXcgY3JlYXRlanMuVGV4dCgnJywgJzI1cHggQXJpYWwnLCAnI2ZmZicpO1xuICAgIHRoaXMuc2hhZG93VGV4dC55ID0gaGVpZ2h0IC8gMjtcbiAgICB0aGlzLnNoYWRvd1RleHQueCA9IHdpZHRoIC8gMjtcbiAgICB0aGlzLnNoYWRvd1RleHQudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgdGhpcy5zaGFkb3dUZXh0LnRleHRCYXNlbGluZSA9ICdtaWRkbGUnO1xuXG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLnNoYWRvdywgdGhpcy5zaGFkb3dUZXh0KTtcbiAgfVxuICBzZXRUZXh0KHRleHQpIHtcbiAgICB0aGlzLnNoYWRvd1RleHQudGV4dCA9IHRleHQ7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwaWtlIGV4dGVuZHMgY3JlYXRlanMuQml0bWFwIHtcbiAgY29uc3RydWN0b3IocXVldWUpIHtcbiAgICBzdXBlcihxdWV1ZS5nZXRSZXN1bHQoJ3NwaWtlJykpO1xuXG4gICAgdGhpcy5ib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpO1xuICAgIHRoaXMucmVnWCA9IHRoaXMuYm91bmRzLndpZHRoIC8gMjtcbiAgICB0aGlzLnJlZ1kgPSB0aGlzLmJvdW5kcy5oZWlnaHQ7XG4gIH1cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5zY2FsZVkgPSAwLjcgKyAoTWF0aC5yYW5kb20oKSAqIDAuNSk7XG4gIH1cbn1cbiIsImltcG9ydCBMb2FkZXIgZnJvbSAnLi9Mb2FkZXInO1xuaW1wb3J0IEhlcm8gZnJvbSAnLi9IZXJvJztcbmltcG9ydCBTcGlrZSBmcm9tICcuL1NwaWtlJztcbmltcG9ydCBTaGFkb3dPdmVybGF5IGZyb20gJy4vU2hhZG93T3ZlcmxheSc7XG5cbmNvbnN0IHF1ZXVlID0gbmV3IExvYWRlcigpO1xucXVldWUuYWRkRXZlbnRMaXN0ZW5lcignY29tcGxldGUnLCBzdGFydEdhbWUpO1xuXG5sZXQgY2FudmFzO1xubGV0IHN0YWdlO1xubGV0IHNoYWRvd092ZXJsYXk7XG5sZXQgaGVybztcbmxldCBzcGlrZXM7XG5sZXQgaHVkRGlzdGFuY2U7XG5cbmNvbnN0IGJnID0ge1xuICBza3k6IG51bGwsXG4gIG1vdW50YWluOiBudWxsLFxuICBncm91bmQ6IG51bGwsXG4gIHNreUltZzogbnVsbCxcbiAgbW91bnRhaW5JbWc6IG51bGwsXG4gIGdyb3VuZEltZzogbnVsbCxcbn07XG5cbmNvbnN0IHNwZWVkID0gMzAwO1xubGV0IGRpc3RhbmNlID0gMDtcblxubGV0IHBhdXNlZCA9IHRydWU7XG5sZXQgZmluaXNoZWQgPSB0cnVlO1xuXG5mdW5jdGlvbiBzdGFydEdhbWUoKSB7XG4gIGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lLXN0YWdlJyk7XG4gIHN0YWdlID0gbmV3IGNyZWF0ZWpzLlN0YWdlKGNhbnZhcyk7XG5cbiAgY2FudmFzLmNsYXNzTGlzdC5yZW1vdmUoJ2xvYWRpbmcnKTtcblxuICBjcmVhdGVCZ0xheWVyKCdza3knKTtcbiAgY3JlYXRlQmdMYXllcignbW91bnRhaW4nKTtcbiAgY3JlYXRlQmdMYXllcignZ3JvdW5kJyk7XG5cbiAgaGVybyA9IG5ldyBIZXJvKHF1ZXVlKTtcbiAgc3Bpa2VzID0gW25ldyBTcGlrZShxdWV1ZSksIG5ldyBTcGlrZShxdWV1ZSldO1xuICBodWREaXN0YW5jZSA9IG5ldyBjcmVhdGVqcy5UZXh0KCcnLCAnMjVweCBBcmlhbCcsICcjMDAwJyk7XG4gIGh1ZERpc3RhbmNlLnggPSBodWREaXN0YW5jZS55ID0gMTU7XG4gIHNoYWRvd092ZXJsYXkgPSBuZXcgU2hhZG93T3ZlcmxheShjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG4gIHN0YWdlLmFkZENoaWxkKC4uLnNwaWtlcywgaGVybywgaHVkRGlzdGFuY2UpO1xuXG4gIHJlc2V0R2FtZSgpO1xuICBwYXVzZUdhbWUoJ1ByZXNzIHNwYWNlIHRvIGZsYXAsIGVzYyB0byBwYXVzZScpO1xuICBiaW5kRXZlbnRzKCk7XG5cbiAgY3JlYXRlanMuU291bmQucGxheSgnYmFjaycsIHsgbG9vcDogLTEsIHZvbHVtZTogMC4zNSB9KTtcbiAgY3JlYXRlanMuVGlja2VyLnRpbWluZ01vZGUgPSBjcmVhdGVqcy5UaWNrZXIuUkFGO1xuICBjcmVhdGVqcy5UaWNrZXIuYWRkRXZlbnRMaXN0ZW5lcigndGljaycsIHRpY2spO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVCZ0xheWVyKG5hbWUpIHtcbiAgY29uc3QgaW1nID0gcXVldWUuZ2V0UmVzdWx0KG5hbWUpO1xuICBjb25zdCBudW0gPSBNYXRoLmNlaWwoY2FudmFzLndpZHRoIC8gaW1nLndpZHRoKTtcbiAgY29uc3Qgd2lkdGggPSAobnVtICogaW1nLndpZHRoKSArIE1hdGgubWluKGNhbnZhcy53aWR0aCwgaW1nLndpZHRoKTtcblxuICBiZ1tuYW1lXSA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICBiZ1tuYW1lXS5ncmFwaGljcy5iZWdpbkJpdG1hcEZpbGwoaW1nLCAncmVwZWF0LXgnKS5kcmF3UmVjdCgwLCAwLCB3aWR0aCwgaW1nLmhlaWdodCk7XG4gIGJnW25hbWVdLnkgPSBjYW52YXMuaGVpZ2h0O1xuICBiZ1tuYW1lXS5yZWdZID0gaW1nLmhlaWdodDtcbiAgYmdbbmFtZV0uY2FjaGUoMCwgMCwgd2lkdGgsIGltZy5oZWlnaHQpO1xuXG4gIGJnW2Ake25hbWV9SW1nYF0gPSBpbWc7XG4gIHN0YWdlLmFkZENoaWxkKGJnW25hbWVdKTtcbn1cblxuZnVuY3Rpb24gbW92ZUJnTGF5ZXIobmFtZSwgcGF0aCkge1xuICBiZ1tuYW1lXS54IC09IHBhdGg7XG4gIGJnW25hbWVdLnggJT0gYmdbYCR7bmFtZX1JbWdgXS53aWR0aDtcbn1cblxuZnVuY3Rpb24gcmVzZXRHYW1lKCkge1xuICBoZXJvLnJlc2V0KCk7XG4gIGhlcm8ueCA9IGNhbnZhcy53aWR0aCAvIDI7XG4gIGhlcm8ueSA9IDIwMDtcblxuICBzcGlrZXMuZm9yRWFjaCgoc3Bpa2UsIGkpID0+IHtcbiAgICByZXNldFNwaWtlKHNwaWtlKTtcbiAgICBzcGlrZS54ICs9IChjYW52YXMud2lkdGggKyBzcGlrZS5ib3VuZHMud2lkdGgpICogaSAqIDAuNTtcbiAgfSk7XG5cbiAgZGlzdGFuY2UgPSAwO1xuICBodWREaXN0YW5jZS50ZXh0ID0gJzAgbSc7XG59XG5cbmZ1bmN0aW9uIHJlc2V0U3Bpa2Uoc3Bpa2UpIHtcbiAgc3Bpa2UucmVzZXQoKTtcbiAgc3Bpa2UueCA9IGNhbnZhcy53aWR0aCArIChzcGlrZS5ib3VuZHMud2lkdGggLyAyKTtcbiAgaWYgKE1hdGgucmFuZG9tKCkgPiAwLjUpIHtcbiAgICBzcGlrZS55ID0gY2FudmFzLmhlaWdodCAtIDgxO1xuICAgIHNwaWtlLnJvdGF0aW9uID0gMDtcbiAgfSBlbHNlIHtcbiAgICBzcGlrZS55ID0gMDtcbiAgICBzcGlrZS5yb3RhdGlvbiA9IDE4MDtcbiAgfVxufVxuXG5mdW5jdGlvbiBtb3ZlSGVybyh0aW1lKSB7XG4gIGhlcm8ubW92ZSh0aW1lKTtcbiAgaWYgKGhlcm8ueSA8IDApIHtcbiAgICBoZXJvLnZZID0gMDtcbiAgICBoZXJvLnkgPSAwO1xuICB9IGVsc2UgaWYgKGhlcm8ueSA+IGNhbnZhcy5oZWlnaHQgKyAoaGVyby5ib3VuZHMuaGVpZ2h0IC8gMikpIHtcbiAgICBmaW5pc2hlZCA9IHRydWU7XG4gICAgcGF1c2VHYW1lKCdQcmVzcyBzcGFjZSB0byByZXN0YXJ0Jyk7XG4gIH0gZWxzZSBpZiAoaGVyby55ID4gNDg1KSB7XG4gICAgaGVyby5kaWUoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXVzZUdhbWUodGV4dCkge1xuICBwYXVzZWQgPSB0cnVlO1xuICBzaGFkb3dPdmVybGF5LnNldFRleHQodGV4dCk7XG4gIHN0YWdlLmFkZENoaWxkKHNoYWRvd092ZXJsYXkpO1xuICBzdGFnZS51cGRhdGUoKTtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlUGF1c2UoKSB7XG4gIGlmIChmaW5pc2hlZCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAocGF1c2VkKSB7XG4gICAgcGF1c2VkID0gZmFsc2U7XG4gICAgc3RhZ2UucmVtb3ZlQ2hpbGQoc2hhZG93T3ZlcmxheSk7XG4gIH0gZWxzZSB7XG4gICAgcGF1c2VHYW1lKCdQcmVzcyBlc2MgdG8gdW5wYXVzZScpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1vdmVXb3JsZCh0aW1lKSB7XG4gIGNvbnN0IHBhdGggPSBzcGVlZCAqIHRpbWU7XG4gIGlmIChoZXJvLmRlYWQpIHtcbiAgICBoZXJvLnggKz0gcGF0aCAqIDAuNTtcbiAgfSBlbHNlIHtcbiAgICBtb3ZlU3Bpa2VzKHBhdGgpO1xuICAgIG1vdmVCZ0xheWVyKCdza3knLCBwYXRoICogMC4xKTtcbiAgICBtb3ZlQmdMYXllcignbW91bnRhaW4nLCBwYXRoICogMC4zKTtcbiAgICBtb3ZlQmdMYXllcignZ3JvdW5kJywgcGF0aCk7XG4gICAgZGlzdGFuY2UgKz0gcGF0aDtcbiAgICBodWREaXN0YW5jZS50ZXh0ID0gYCR7TWF0aC5mbG9vcihkaXN0YW5jZSAvIDI1KX0gbWA7XG4gIH1cbn1cblxuZnVuY3Rpb24gbW92ZVNwaWtlcyhwYXRoKSB7XG4gIGZvciAoY29uc3Qgc3Bpa2Ugb2Ygc3Bpa2VzKSB7XG4gICAgc3Bpa2UueCAtPSBwYXRoO1xuICAgIGlmIChzcGlrZS54IDwgLXNwaWtlLmJvdW5kcy53aWR0aCAvIDIpIHtcbiAgICAgIHJlc2V0U3Bpa2Uoc3Bpa2UpO1xuICAgIH1cbiAgICBpZiAobmRnbXIuY2hlY2tQaXhlbENvbGxpc2lvbihoZXJvLCBzcGlrZSkpIHtcbiAgICAgIGhlcm8uZGllKCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlc3RhcnRHYW1lKCkge1xuICBwYXVzZWQgPSBmYWxzZTtcbiAgZmluaXNoZWQgPSBmYWxzZTtcbiAgcmVzZXRHYW1lKCk7XG4gIHN0YWdlLnJlbW92ZUNoaWxkKHNoYWRvd092ZXJsYXkpO1xufVxuXG5mdW5jdGlvbiBiaW5kRXZlbnRzKCkge1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGUgPT4ge1xuICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICBjYXNlIDMyOlxuICAgICAgICBoYW5kbGVBY3Rpb24oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI3OlxuICAgICAgICB0b2dnbGVQYXVzZSgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0pO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGhhbmRsZUFjdGlvbik7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUFjdGlvbigpIHtcbiAgaWYgKGZpbmlzaGVkKSB7XG4gICAgcmVzdGFydEdhbWUoKTtcbiAgfSBlbHNlIHtcbiAgICBoZXJvLmZsYXAoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB0aWNrKGUpIHtcbiAgaWYgKHBhdXNlZCkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBzZWMgPSBlLmRlbHRhICogMC4wMDE7XG4gIG1vdmVXb3JsZChzZWMpO1xuICBtb3ZlSGVybyhzZWMpO1xuICBzdGFnZS51cGRhdGUoKTtcbn1cbiJdfQ==
