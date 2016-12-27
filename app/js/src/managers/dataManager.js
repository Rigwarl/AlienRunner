const dataManager = {
  gameType: null,
  score: null,
  maxScore: null,
  heroType: 'monster',
  pos: null,
  win: null,
  spikes: [],
  actions: {},
  user: {
    id: null,
    name: null,
    sex: null,
  },
  enemy: null,
  fields: {
    normal: [[0, 0], [100, 100]],
  },
  set(key, value) {
    this[key] = value;
  },
};

export default dataManager;
