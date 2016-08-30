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
      frames: { width: 100, height: 78 },
      animations: {
        fly: [0],
        flap: [1, 3, 'fly'],
        dead: [4]
      }
    });

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Hero).call(this, ss));

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

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Loader).call(this));

    createjs.Sound.alternateExtensions = ['mp3'];
    _this.installPlugin(createjs.Sound);
    _this.loadManifest([{ id: 'char', src: 'img/monster-sprite.png' }, { id: 'spike', src: 'img/spike.png' }, { id: 'back', src: 'sound/background.ogg' }, { id: 'flap', src: 'sound/flap.ogg' }, { id: 'loose', src: 'sound/loose.ogg' }]);
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

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ShadowOverlay).call(this));

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

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Spike).call(this, queue.getResult('spike')));

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

var speed = 300;
var bgPos = {
  sky: 0,
  mountain: 0,
  ground: 0
};
var distance = 0;

var paused = true;
var finished = true;

function startGame() {
  var _stage;

  canvas = document.querySelector('#game-stage');
  stage = new createjs.Stage(canvas);

  canvas.classList.remove('loading');

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
  if (paused) {
    paused = false;
    stage.removeChild(shadowOverlay);
  } else {
    pauseGame('Press esc to unpause');
  }
}

function moveWorld(time) {
  if (hero.dead) {
    hero.x += speed * time * 0.5;
  } else {
    moveSpikes(time);
    moveBg(time);
    distance += speed * time;
    hudDistance.text = Math.floor(distance / 25) + ' m';
  }
}

function moveSpikes(time) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = spikes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var spike = _step.value;

      spike.x -= speed * time;
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
        if (finished) {
          restartGame();
        } else {
          hero.flap();
        }
        break;
      case 27:
        if (!finished) {
          togglePause();
        }
        break;
    }
  });
  window.addEventListener('touchstart', function () {
    if (finished) {
      restartGame();
    } else {
      hero.flap();
    }
  });
}

function moveBg(time) {
  bgPos.sky -= time * speed * 0.1;
  bgPos.mountain -= time * speed * 0.3;
  bgPos.ground -= time * speed;

  canvas.style.backgroundPosition = bgPos.ground + 'px 100%,\n                                     ' + bgPos.mountain + 'px 100%,\n                                     ' + bgPos.sky + 'px 100%';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvc3JjL0hlcm8uanMiLCJhcHAvanMvc3JjL0xvYWRlci5qcyIsImFwcC9qcy9zcmMvU2hhZG93T3ZlcmxheS5qcyIsImFwcC9qcy9zcmMvU3Bpa2UuanMiLCJhcHAvanMvc3JjL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0lDQXFCLEk7OztBQUNuQixnQkFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQ2pCLFFBQU0sS0FBSyxJQUFJLFNBQVMsV0FBYixDQUF5QjtBQUNsQyxjQUFRLENBQUMsTUFBTSxTQUFOLENBQWdCLE1BQWhCLENBQUQsQ0FEMEI7QUFFbEMsY0FBUSxFQUFFLE9BQU8sR0FBVCxFQUFjLFFBQVEsRUFBdEIsRUFGMEI7QUFHbEMsa0JBQVk7QUFDVixhQUFLLENBQUMsQ0FBRCxDQURLO0FBRVYsY0FBTSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sS0FBUCxDQUZJO0FBR1YsY0FBTSxDQUFDLENBQUQ7QUFISTtBQUhzQixLQUF6QixDQUFYOztBQURpQix3RkFVWCxFQVZXOztBQVdqQixVQUFLLE1BQUwsR0FBYyxNQUFLLFNBQUwsRUFBZDtBQUNBLFVBQUssSUFBTCxHQUFZLE1BQUssTUFBTCxDQUFZLEtBQVosR0FBb0IsQ0FBaEM7QUFDQSxVQUFLLElBQUwsR0FBWSxNQUFLLE1BQUwsQ0FBWSxNQUFaLEdBQXFCLENBQWpDO0FBQ0EsVUFBSyxDQUFMLEdBQVMsR0FBVDtBQWRpQjtBQWVsQjs7Ozs0QkFDTztBQUNOLFdBQUssSUFBTCxHQUFZLEtBQVo7QUFDQSxXQUFLLFFBQUwsR0FBZ0IsQ0FBaEI7QUFDQSxXQUFLLEVBQUwsR0FBVSxDQUFWO0FBQ0EsV0FBSyxXQUFMLENBQWlCLEtBQWpCO0FBQ0Q7OzsyQkFDTTtBQUNMLFVBQUksS0FBSyxJQUFULEVBQWU7QUFDYjtBQUNEO0FBQ0QsV0FBSyxFQUFMLEdBQVUsS0FB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QVUsS0FBdEI7QUFDQSxZQUFVLEdBQVY7QUFDQSxXQUFTLEdBQVQ7QUFDQSxRQUFNLE1BQU47QUFDRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBIZXJvIGV4dGVuZHMgY3JlYXRlanMuU3ByaXRlIHtcbiAgY29uc3RydWN0b3IocXVldWUpIHtcbiAgICBjb25zdCBzcyA9IG5ldyBjcmVhdGVqcy5TcHJpdGVTaGVldCh7XG4gICAgICBpbWFnZXM6IFtxdWV1ZS5nZXRSZXN1bHQoJ2NoYXInKV0sXG4gICAgICBmcmFtZXM6IHsgd2lkdGg6IDEwMCwgaGVpZ2h0OiA3OCB9LFxuICAgICAgYW5pbWF0aW9uczoge1xuICAgICAgICBmbHk6IFswXSxcbiAgICAgICAgZmxhcDogWzEsIDMsICdmbHknXSxcbiAgICAgICAgZGVhZDogWzRdLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBzdXBlcihzcyk7XG4gICAgdGhpcy5ib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpO1xuICAgIHRoaXMucmVnWCA9IHRoaXMuYm91bmRzLndpZHRoIC8gMjtcbiAgICB0aGlzLnJlZ1kgPSB0aGlzLmJvdW5kcy5oZWlnaHQgLyAyO1xuICAgIHRoaXMuYSA9IDU1MDtcbiAgfVxuICByZXNldCgpIHtcbiAgICB0aGlzLmRlYWQgPSBmYWxzZTtcbiAgICB0aGlzLnJvdGF0aW9uID0gMDtcbiAgICB0aGlzLnZZID0gMDtcbiAgICB0aGlzLmdvdG9BbmRTdG9wKCdmbHknKTtcbiAgfVxuICBmbGFwKCkge1xuICAgIGlmICh0aGlzLmRlYWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy52WSA9IE1hdGgubWF4KHRoaXMudlkgLSAzNzUsIC0zNzUpO1xuICAgIHRoaXMuZ290b0FuZFBsYXkoJ2ZsYXAnKTtcbiAgICBjcmVhdGVqcy5Tb3VuZC5wbGF5KCdmbGFwJyk7XG4gIH1cbiAgbW92ZSh0aW1lKSB7XG4gICAgdGhpcy55ICs9ICgodGhpcy5hICogdGltZSAqIDAuNSkgKyB0aGlzLnZZKSAqIHRpbWU7XG4gICAgdGhpcy52WSArPSB0aGlzLmEgKiB0aW1lO1xuICB9XG4gIGRpZSgpIHtcbiAgICBpZiAodGhpcy5kZWFkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZGVhZCA9IHRydWU7XG4gICAgdGhpcy5yb3RhdGlvbiA9IDIwO1xuICAgIHRoaXMuZ290b0FuZFN0b3AoJ2RlYWQnKTtcbiAgICBjcmVhdGVqcy5Tb3VuZC5wbGF5KCdsb29zZScpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkZXIgZXh0ZW5kcyBjcmVhdGVqcy5Mb2FkUXVldWUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIGNyZWF0ZWpzLlNvdW5kLmFsdGVybmF0ZUV4dGVuc2lvbnMgPSBbJ21wMyddO1xuICAgIHRoaXMuaW5zdGFsbFBsdWdpbihjcmVhdGVqcy5Tb3VuZCk7XG4gICAgdGhpcy5sb2FkTWFuaWZlc3QoW1xuICAgICAgeyBpZDogJ2NoYXInLCBzcmM6ICdpbWcvbW9uc3Rlci1zcHJpdGUucG5nJyB9LFxuICAgICAgeyBpZDogJ3NwaWtlJywgc3JjOiAnaW1nL3NwaWtlLnBuZycgfSxcbiAgICAgIHsgaWQ6ICdiYWNrJywgc3JjOiAnc291bmQvYmFja2dyb3VuZC5vZ2cnIH0sXG4gICAgICB7IGlkOiAnZmxhcCcsIHNyYzogJ3NvdW5kL2ZsYXAub2dnJyB9LFxuICAgICAgeyBpZDogJ2xvb3NlJywgc3JjOiAnc291bmQvbG9vc2Uub2dnJyB9LFxuICAgIF0pO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTaGFkb3dPdmVybGF5IGV4dGVuZHMgY3JlYXRlanMuQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnNoYWRvdyA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xuICAgIHRoaXMuc2hhZG93LmdyYXBoaWNzLmJlZ2luRmlsbCgncmdiYSgwLDAsMCwwLjYpJykuZHJhd1JlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICB0aGlzLnNoYWRvd1RleHQgPSBuZXcgY3JlYXRlanMuVGV4dCgnJywgJzI1cHggQXJpYWwnLCAnI2ZmZicpO1xuICAgIHRoaXMuc2hhZG93VGV4dC55ID0gaGVpZ2h0IC8gMjtcbiAgICB0aGlzLnNoYWRvd1RleHQueCA9IHdpZHRoIC8gMjtcbiAgICB0aGlzLnNoYWRvd1RleHQudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgdGhpcy5zaGFkb3dUZXh0LnRleHRCYXNlbGluZSA9ICdtaWRkbGUnO1xuXG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLnNoYWRvdywgdGhpcy5zaGFkb3dUZXh0KTtcbiAgfVxuICBzZXRUZXh0KHRleHQpIHtcbiAgICB0aGlzLnNoYWRvd1RleHQudGV4dCA9IHRleHQ7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwaWtlIGV4dGVuZHMgY3JlYXRlanMuQml0bWFwIHtcbiAgY29uc3RydWN0b3IocXVldWUpIHtcbiAgICBzdXBlcihxdWV1ZS5nZXRSZXN1bHQoJ3NwaWtlJykpO1xuXG4gICAgdGhpcy5ib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpO1xuICAgIHRoaXMucmVnWCA9IHRoaXMuYm91bmRzLndpZHRoIC8gMjtcbiAgICB0aGlzLnJlZ1kgPSB0aGlzLmJvdW5kcy5oZWlnaHQ7XG4gIH1cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5zY2FsZVkgPSAwLjcgKyAoTWF0aC5yYW5kb20oKSAqIDAuNSk7XG4gIH1cbn1cbiIsImltcG9ydCBMb2FkZXIgZnJvbSAnLi9Mb2FkZXInO1xuaW1wb3J0IEhlcm8gZnJvbSAnLi9IZXJvJztcbmltcG9ydCBTcGlrZSBmcm9tICcuL1NwaWtlJztcbmltcG9ydCBTaGFkb3dPdmVybGF5IGZyb20gJy4vU2hhZG93T3ZlcmxheSc7XG5cbmNvbnN0IHF1ZXVlID0gbmV3IExvYWRlcigpO1xucXVldWUuYWRkRXZlbnRMaXN0ZW5lcignY29tcGxldGUnLCBzdGFydEdhbWUpO1xuXG5sZXQgY2FudmFzO1xubGV0IHN0YWdlO1xubGV0IHNoYWRvd092ZXJsYXk7XG5sZXQgaGVybztcbmxldCBzcGlrZXM7XG5sZXQgaHVkRGlzdGFuY2U7XG5cbmNvbnN0IHNwZWVkID0gMzAwO1xuY29uc3QgYmdQb3MgPSB7XG4gIHNreTogMCxcbiAgbW91bnRhaW46IDAsXG4gIGdyb3VuZDogMCxcbn07XG5sZXQgZGlzdGFuY2UgPSAwO1xuXG5sZXQgcGF1c2VkID0gdHJ1ZTtcbmxldCBmaW5pc2hlZCA9IHRydWU7XG5cbmZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcbiAgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dhbWUtc3RhZ2UnKTtcbiAgc3RhZ2UgPSBuZXcgY3JlYXRlanMuU3RhZ2UoY2FudmFzKTtcblxuICBjYW52YXMuY2xhc3NMaXN0LnJlbW92ZSgnbG9hZGluZycpO1xuXG4gIGhlcm8gPSBuZXcgSGVybyhxdWV1ZSk7XG4gIHNwaWtlcyA9IFtuZXcgU3Bpa2UocXVldWUpLCBuZXcgU3Bpa2UocXVldWUpXTtcbiAgaHVkRGlzdGFuY2UgPSBuZXcgY3JlYXRlanMuVGV4dCgnJywgJzI1cHggQXJpYWwnLCAnIzAwMCcpO1xuICBodWREaXN0YW5jZS54ID0gaHVkRGlzdGFuY2UueSA9IDE1O1xuICBzaGFkb3dPdmVybGF5ID0gbmV3IFNoYWRvd092ZXJsYXkoY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblxuICBzdGFnZS5hZGRDaGlsZCguLi5zcGlrZXMsIGhlcm8sIGh1ZERpc3RhbmNlKTtcblxuICByZXNldEdhbWUoKTtcbiAgcGF1c2VHYW1lKCdQcmVzcyBzcGFjZSB0byBmbGFwLCBlc2MgdG8gcGF1c2UnKTtcbiAgYmluZEV2ZW50cygpO1xuXG4gIGNyZWF0ZWpzLlNvdW5kLnBsYXkoJ2JhY2snLCB7IGxvb3A6IC0xLCB2b2x1bWU6IDAuMzUgfSk7XG4gIGNyZWF0ZWpzLlRpY2tlci50aW1pbmdNb2RlID0gY3JlYXRlanMuVGlja2VyLlJBRjtcbiAgY3JlYXRlanMuVGlja2VyLmFkZEV2ZW50TGlzdGVuZXIoJ3RpY2snLCB0aWNrKTtcbn1cblxuZnVuY3Rpb24gcmVzZXRHYW1lKCkge1xuICBoZXJvLnJlc2V0KCk7XG4gIGhlcm8ueCA9IGNhbnZhcy53aWR0aCAvIDI7XG4gIGhlcm8ueSA9IDIwMDtcblxuICBzcGlrZXMuZm9yRWFjaCgoc3Bpa2UsIGkpID0+IHtcbiAgICByZXNldFNwaWtlKHNwaWtlKTtcbiAgICBzcGlrZS54ICs9IChjYW52YXMud2lkdGggKyBzcGlrZS5ib3VuZHMud2lkdGgpICogaSAqIDAuNTtcbiAgfSk7XG5cbiAgZGlzdGFuY2UgPSAwO1xuICBodWREaXN0YW5jZS50ZXh0ID0gJzAgbSc7XG59XG5cbmZ1bmN0aW9uIHJlc2V0U3Bpa2Uoc3Bpa2UpIHtcbiAgc3Bpa2UucmVzZXQoKTtcbiAgc3Bpa2UueCA9IGNhbnZhcy53aWR0aCArIChzcGlrZS5ib3VuZHMud2lkdGggLyAyKTtcbiAgaWYgKE1hdGgucmFuZG9tKCkgPiAwLjUpIHtcbiAgICBzcGlrZS55ID0gY2FudmFzLmhlaWdodCAtIDgxO1xuICAgIHNwaWtlLnJvdGF0aW9uID0gMDtcbiAgfSBlbHNlIHtcbiAgICBzcGlrZS55ID0gMDtcbiAgICBzcGlrZS5yb3RhdGlvbiA9IDE4MDtcbiAgfVxufVxuXG5mdW5jdGlvbiBtb3ZlSGVybyh0aW1lKSB7XG4gIGhlcm8ubW92ZSh0aW1lKTtcbiAgaWYgKGhlcm8ueSA8IDApIHtcbiAgICBoZXJvLnZZID0gMDtcbiAgICBoZXJvLnkgPSAwO1xuICB9IGVsc2UgaWYgKGhlcm8ueSA+IGNhbnZhcy5oZWlnaHQgKyAoaGVyby5ib3VuZHMuaGVpZ2h0IC8gMikpIHtcbiAgICBmaW5pc2hlZCA9IHRydWU7XG4gICAgcGF1c2VHYW1lKCdQcmVzcyBzcGFjZSB0byByZXN0YXJ0Jyk7XG4gIH0gZWxzZSBpZiAoaGVyby55ID4gNDg1KSB7XG4gICAgaGVyby5kaWUoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXVzZUdhbWUodGV4dCkge1xuICBwYXVzZWQgPSB0cnVlO1xuICBzaGFkb3dPdmVybGF5LnNldFRleHQodGV4dCk7XG4gIHN0YWdlLmFkZENoaWxkKHNoYWRvd092ZXJsYXkpO1xuICBzdGFnZS51cGRhdGUoKTtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlUGF1c2UoKSB7XG4gIGlmIChwYXVzZWQpIHtcbiAgICBwYXVzZWQgPSBmYWxzZTtcbiAgICBzdGFnZS5yZW1vdmVDaGlsZChzaGFkb3dPdmVybGF5KTtcbiAgfSBlbHNlIHtcbiAgICBwYXVzZUdhbWUoJ1ByZXNzIGVzYyB0byB1bnBhdXNlJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbW92ZVdvcmxkKHRpbWUpIHtcbiAgaWYgKGhlcm8uZGVhZCkge1xuICAgIGhlcm8ueCArPSBzcGVlZCAqIHRpbWUgKiAwLjU7XG4gIH0gZWxzZSB7XG4gICAgbW92ZVNwaWtlcyh0aW1lKTtcbiAgICBtb3ZlQmcodGltZSk7XG4gICAgZGlzdGFuY2UgKz0gc3BlZWQgKiB0aW1lO1xuICAgIGh1ZERpc3RhbmNlLnRleHQgPSBgJHtNYXRoLmZsb29yKGRpc3RhbmNlIC8gMjUpfSBtYDtcbiAgfVxufVxuXG5mdW5jdGlvbiBtb3ZlU3Bpa2VzKHRpbWUpIHtcbiAgZm9yIChjb25zdCBzcGlrZSBvZiBzcGlrZXMpIHtcbiAgICBzcGlrZS54IC09IHNwZWVkICogdGltZTtcbiAgICBpZiAoc3Bpa2UueCA8IC1zcGlrZS5ib3VuZHMud2lkdGggLyAyKSB7XG4gICAgICByZXNldFNwaWtlKHNwaWtlKTtcbiAgICB9XG4gICAgaWYgKG5kZ21yLmNoZWNrUGl4ZWxDb2xsaXNpb24oaGVybywgc3Bpa2UpKSB7XG4gICAgICBoZXJvLmRpZSgpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiByZXN0YXJ0R2FtZSgpIHtcbiAgcGF1c2VkID0gZmFsc2U7XG4gIGZpbmlzaGVkID0gZmFsc2U7XG4gIHJlc2V0R2FtZSgpO1xuICBzdGFnZS5yZW1vdmVDaGlsZChzaGFkb3dPdmVybGF5KTtcbn1cblxuZnVuY3Rpb24gYmluZEV2ZW50cygpIHtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlID0+IHtcbiAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgY2FzZSAzMjpcbiAgICAgICAgaWYgKGZpbmlzaGVkKSB7XG4gICAgICAgICAgcmVzdGFydEdhbWUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBoZXJvLmZsYXAoKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjc6XG4gICAgICAgIGlmICghZmluaXNoZWQpIHtcbiAgICAgICAgICB0b2dnbGVQYXVzZSgpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgKCkgPT4ge1xuICAgIGlmIChmaW5pc2hlZCkge1xuICAgICAgcmVzdGFydEdhbWUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGVyby5mbGFwKCk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gbW92ZUJnKHRpbWUpIHtcbiAgYmdQb3Muc2t5IC09IHRpbWUgKiBzcGVlZCAqIDAuMTtcbiAgYmdQb3MubW91bnRhaW4gLT0gdGltZSAqIHNwZWVkICogMC4zO1xuICBiZ1Bvcy5ncm91bmQgLT0gdGltZSAqIHNwZWVkO1xuXG4gIGNhbnZhcy5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSBgJHtiZ1Bvcy5ncm91bmR9cHggMTAwJSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2JnUG9zLm1vdW50YWlufXB4IDEwMCUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtiZ1Bvcy5za3l9cHggMTAwJWA7XG59XG5cbmZ1bmN0aW9uIHRpY2soZSkge1xuICBpZiAocGF1c2VkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHNlYyA9IGUuZGVsdGEgKiAwLjAwMTtcbiAgbW92ZVdvcmxkKHNlYyk7XG4gIG1vdmVIZXJvKHNlYyk7XG4gIHN0YWdlLnVwZGF0ZSgpO1xufVxuIl19
