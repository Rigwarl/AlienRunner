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
        VK.api('storage.get', { key }, resolve);
      }
    }).then(r => {
      if (r.error) {
        throw new Error(r.error);
      } else if (r.response === '') {
        // cant JSON.parse empty string but need to get default value
        return '';
      }
      return JSON.parse(r.response);
    });
  },
  set(key, value) {
    if (this.server === 'vk') {
      VK.api('storage.set', { key, value });
    }
  },
};

export default serverManager;
