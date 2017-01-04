const dataManager = {
  gameType: null,
  gameMode: null,
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
    sex: null,
  },
  enemy: null,
  fields: {
    normal: [[0, 99], [100, 199]],
    upsideDown: [[200, 224], [225, 249]],
    backward: [[250, 274], [275, 299]],
    fast: [[300, 324], [325, 349]],
    slow: [[350, 374], [375, 399]],
  },
  set(key, value) {
    this[key] = value;
  },
};

export default dataManager;
