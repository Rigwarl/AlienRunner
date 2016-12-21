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
  getUser() {
    return new Promise((resolve, reject) => {
      VK.api('users.get', { fields: 'sex' }, r => {
        if (r.error) {
          reject(r.error);
          return;
        }
        resolve(r.response[0]);
      });
    });
  },
  get(key, global = 0) {
    return new Promise((resolve, reject) => {
      switch (this.server) {
        case 'local':
          resolve({ response: '' });
          break;
        case 'vk':
          VK.api('storage.get', { key, global }, resolve);
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
  set(key, value, global = 0) {
    if (this.server === 'vk') {
      VK.api('storage.set', { key, value: JSON.stringify(value), global });
    }
  },
  share(score) {
    if (this.server === 'vk') {
      VK.api('wall.post', {
        message: `Я пролетел ${score} м в игре Flappy Monster!
                  A сколько сможешь ты?`,
        attachments: 'photo-135563388_456239017, https://vk.com/app5782118',
        services: 'twitter',

      });
    }
  },
  invite() {
    if (this.server === 'vk') {
      VK.callMethod('showInviteBox');
    }
  },
  loadRating() {
    return Promise.resolve(
      Array.from({ length: 6 }, (el, i) => ({
        id: i,
        name: `игрок${i}`,
        score: Math.floor(Math.random() * 300),
      }))
    );
  },
  isSocial() {
    return this.server === 'vk';
  },
};

export default serverManager;
