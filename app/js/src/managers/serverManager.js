const serverManager = {
  init(server) {
    this.server = server;

    // todo use localstorage if not vk env

    return new Promise((resolve, reject) => {
      if (server === 'vk') {
        VK.init(
          () => resolve(),
          () => reject(),
        '5.60');
      }
    });
  },
  get(key) {
    return new Promise(resolve => {
      if (this.server === 'vk') {
        VK.api('storage.get', { key }, r => resolve(r.response));
      }
    }).then(JSON.parse);
  },
  set(key, value) {
    if (this.server === 'vk') {
      VK.api('storage.set', { key, value });
    }
  },
};

export default serverManager;
