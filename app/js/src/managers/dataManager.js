const dataManager = {
  score: 0,
  maxScore: null,
  heroType: 'monster',
  user: {
    id: null,
    name: null,
    sex: null,
  },
  pvpRecord: {
    user: null,
    spikes: [],
    actions: {},
  },
  set(key, value) {
    this[key] = value;
  },
};

export default dataManager;
