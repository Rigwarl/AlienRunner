const serverManager = {
  init(server) {
    this.server = server;

    // todo use localstorage if not vk env

    return new Promise((resolve, reject) => {
      switch (server) {
        case 'local':
          resolve();
          break;
        case 'vk':
          VK.init(
            () => resolve(),
            e => reject('vk init error', e),
          '5.60');
          break;
        default:
          reject('wrong server name');
          break;
      }
    });
  },
  get(key) {
    return new Promise((resolve, reject) => {
      switch (this.server) {
        case 'local':
          resolve({ response: '' });
          break;
        case 'vk':
          VK.api('storage.get', { key }, resolve);
          break;
        default:
          reject('wrong server name');
          break;
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
  share(score) {
    if (this.server === 'vk') {
      VK.api('wall.post', {
        message: `Я пролетел ${score}м в игре Flappy Monster!
                  A сколько сможешь ты?`,
        attachments: 'photo-135563388_456239017',

      });
    }
  },
};

export default serverManager;
