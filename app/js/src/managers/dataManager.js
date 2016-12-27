const dataManager = {
  score: null,
  maxScore: null,
  heroType: 'monster',
  user: {
    id: null,
    name: null,
    sex: null,
  },
  set(key, value) {
    this[key] = value;
  },
};

export default dataManager;
