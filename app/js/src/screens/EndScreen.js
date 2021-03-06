import randomInt from 'random-int';
import assetsManager from '../managers/assetsManager';
import screensManager from '../managers/screensManager';
import serverManager from '../managers/serverManager';
import dataManager from '../managers/dataManager';
import Gui from '../display/Gui';
import Btn from '../display/Btn';

export default class EndScreen extends createjs.Container {
  constructor(width) {
    super();

    this.bg = new createjs.Bitmap(assetsManager.getResult('start'));
    this.gui = new Gui(width);

    this.maxScore = new createjs.Text(`Рекорд: ${dataManager.maxScore} м`, '25px Guerilla', '#000');
    this.maxScore.textAlign = 'center';
    this.maxScore.x = width / 2;
    this.maxScore.y = 40;

    this.score = new createjs.Text(`Результат: ${dataManager.score} м`, '40px Guerilla', '#000');
    this.score.textAlign = 'center';
    this.score.x = width / 2;
    this.score.y = 150;

    this.replayBtn = new Btn('Еще раз');
    this.replayBtn.x = width / 2;
    this.replayBtn.y = 350;

    this.shareBtn = new Btn('Поделиться', 'orange');
    this.shareBtn.x = width / 2;
    this.shareBtn.y = 440;

    this.addChild(this.bg, this.gui, this.maxScore, this.score, this.replayBtn, this.shareBtn);

    if (dataManager.score > dataManager.maxScore) {
      this.maxScore.text = `Прошлый рекорд: ${dataManager.maxScore} м`;
      dataManager.maxScore = dataManager.score;
      serverManager.set('maxScore', dataManager.maxScore);
      this.score.text = `Новый рекорд: ${dataManager.maxScore} м!`;

      serverManager.get('ratingTable', 1).then(recalcRatingTable);
    }

    if (dataManager.gameType === 'pvp') {
      this.pvpText = new createjs.Text('', '25px Guerilla', '#000');
      this.pvpText.textAlign = 'center';
      this.pvpText.x = width / 2;
      this.pvpText.y = 230;
      this.addChild(this.pvpText);

      if (dataManager.win) {
        this.pvpText.text += `${dataManager.enemy.name} был${dataManager.enemy.sex !== 2 ? 'а' : ''} повержен${dataManager.enemy.sex !== 2 ? 'а' : ''}`;
      } else {
        this.pvpText.text += `${dataManager.enemy.name} поверг${dataManager.enemy.sex !== 2 ? 'ла' : ''} Вас`;
      }
    }

    const range = dataManager.fields[dataManager.gameMode][dataManager.pos];
    const field = `pvp${randomInt(range[0], range[1])}`;
    const record = {
      user: dataManager.user,
      spikes: dataManager.spikes,
      actions: dataManager.actions,
    };

    serverManager.get(field, 1).then(r => {
      console.warn(field);
      console.warn(record);
      console.warn(r);

      if ((!r || r.spikes.length * 0.5 < record.spikes.length) &&
          JSON.stringify(record).length < 4096) {
        console.warn(true);
        serverManager.set(field, record, 1);
      }
    });

    this.bindEvents();
  }
  bindEvents() {
    this.replayBtn.addEventListener('click', replay);
    this.shareBtn.addEventListener('click', share);

    this.onKeyDown = e => {
      if (e.keyCode === 32) {
        replay();
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', this.onKeyDown);
  }
  destroy() {
    window.removeEventListener('keydown', this.onKeyDown);
  }
}

function replay() {
  switch (dataManager.gameType) {
    case 'single':
      screensManager.change('MainScreen');
      break;
    case 'pvp':
      screensManager.change('PVPScreen');
      break;
  }
}

function share () {
  let message = '';
  switch (dataManager.gameType) {
    case 'single':
      message = `Я пролетел${dataManager.user.sex !== 2 ? 'а' : ''} ${dataManager.score} м в игре Flappy Monster!`;
      if (dataManager.score === dataManager.maxScore) {
        message += '\nЭто мой новый рекорд! ';
      }
      message += '\nА сколько сможешь ты?';
      break;
    case 'pvp':
      if (dataManager.win) {
        message += `${dataManager.enemy.name} был${dataManager.enemy.sex !== 2 ? 'а' : ''} повержен${dataManager.enemy.sex !== 2 ? 'а' : ''} мной в игре Flappy Monster!`;
      } else {
        message += `${dataManager.enemy.name} поверг${dataManager.enemy.sex !== 2 ? 'ла' : ''} меня в игре Flappy Monster,
                   ну ничего, еще увидимся...`;
      }
      if (dataManager.score === dataManager.maxScore) {
        message += `\nМой новый рекорд ${dataManager.score} м!`;
      }
      break;
  }
  serverManager.share(message, dataManager.gameType);
}

function recalcRatingTable(ratingTable) {
  if (ratingTable[ratingTable.length - 1].score >= dataManager.maxScore) {
    return;
  }

  const userRating = ratingTable.find(el => el.id === dataManager.user.id);

  if (userRating) {
    userRating.score = dataManager.maxScore;
  } else {
    const newRating = {
      id: dataManager.user.id,
      name: dataManager.user.name,
      score: dataManager.maxScore,
    };
    if (ratingTable.length < 10) {
      ratingTable.push(newRating);
    } else {
      ratingTable[ratingTable.length - 1] = newRating;
    }
  }

  ratingTable.sort((a, b) => b.score - a.score);
  serverManager.set('ratingTable', ratingTable, 1);
}
