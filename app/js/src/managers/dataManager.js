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
    spikes: [],
    actions: {},
  },
  set(key, value) {
    this[key] = value;
  },
};

export default dataManager;
