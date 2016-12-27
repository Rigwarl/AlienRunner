const dataManager = {
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
    sex: null,
  },
  enemy: null,
  fields: {
    normal: [[0, 49], [100, 149]],
  },
  set(key, value) {
    this[key] = value;
  },
};

export default dataManager;
