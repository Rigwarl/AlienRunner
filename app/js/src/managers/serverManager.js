const serverManager = {
  init() {
    return new Promise((resolve, reject) => VK.init(
      () => resolve(),
      e => reject('vk init error', e),
    '5.60'));
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
    return new Promise(resolve => VK.api('storage.get', { key, global }, resolve))
      .then(r => {
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
    VK.api('storage.set', { key, value: JSON.stringify(value), global });
  },
  share(score) {
    VK.api('wall.post', {
      message: `Я пролетел ${score} м в игре Flappy Monster!
                A сколько сможешь ты?`,
      attachments: 'photo-135563388_456239017, https://vk.com/app5782118',
      services: 'twitter',
    });
  },
  invite() {
    VK.callMethod('showInviteBox');
  },
};

export default serverManager;
