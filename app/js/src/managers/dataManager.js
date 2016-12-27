const dataManager = {
  gameType: null,
  score: null,
  maxScore: null,
  heroType: 'monster',
  user: {
    id: null,
    name: null,
    sex: null,
  },
  pvp: {
    win: null,
    pos: null,
    enemy: null,
    spikes: null,
    actions: null,
  },
  set(key, value) {
    this[key] = value;
  },
};

export default dataManager;
