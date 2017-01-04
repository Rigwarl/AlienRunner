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
    reverseVer: [[200, 224], [225, 249]],
    reverseHor: [[250, 274], [275, 299]],
  },
  set(key, value) {
    this[key] = value;
  },
};

export default dataManager;
