for (let i = 0; i < 50; i += 1) {
  setTimeout(() =>
    VK.api('storage.set', {
      global: 1,
      key: `pvp${i}`,
      value: "{\"user\":{\"id\":1326996,\"name\":\"Александр Соколов\",\"sex\":2},\"spikes\":[0.84,-0.74,1.09,0.72,1.07,-1.14,-0.84,1.05,1.14,0.84,-1.03,-0.82],\"actions\":{\"31\":1,\"46\":1,\"132\":1,\"174\":1,\"195\":1,\"208\":1,\"219\":1,\"230\":1,\"239\":1,\"250\":1,\"335\":1,\"349\":1,\"411\":1,\"423\":1,\"533\":1,\"544\":1,\"574\":1,\"620\":1,\"659\":1,\"683\":1,\"695\":1,\"705\":1,\"782\":1,\"794\":1,\"806\":1,\"874\":1,\"880\":1,\"890\":1,\"1004\":1,\"1014\":1,\"1023\":1,\"1036\":1}}",
    }), 1001 * i);
}

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
  share(score, sex = 2) {
    VK.api('wall.post', {
      message: `Я пролетел${sex !== 2 ? 'а' : ''} ${score} м в игре Flappy Monster!
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
