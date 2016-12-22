const soundManager = {
  init(enable) {
    this.enabled = enable;
    this.bg = createjs.Sound.play('back', { loop: -1, volume: 0.3 });
    this.bg.paused = !this.enabled;
    // sometimes negative value occurs and throw error
    this.bg.position = 0;
  },
  toggle() {
    this.enabled = !this.enabled;
    this.bg.paused = !this.enabled;
  },
  isEnabled() {
    return this.enabled;
  },
  play(sound) {
    if (this.enabled) {
      createjs.Sound.play(sound);
    }
  },
};

export default soundManager;
