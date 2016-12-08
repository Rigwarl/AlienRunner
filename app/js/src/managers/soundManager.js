const soundManager = {
  init(enabled) {
    this.enabled = enabled;
    this.bg = createjs.Sound.play('back', { loop: -1, volume: 0.3 });
    this.bg.paused = !this.enabled;
  },
  toggle() {
    this.enabled = !this.enabled;
    this.bg.paused = !this.enabled;
  },
  isEnabled() {
    return this.enabled;
  },
};

export default soundManager;
