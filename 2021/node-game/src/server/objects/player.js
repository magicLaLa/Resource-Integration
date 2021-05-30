const Item = require('./item');
const Constants = require('../../shared/constants');

// 玩家对象
class Player extends Item {
  constructor(data = {}) {
    super(data);

    this.userName = data.userName;
    this.hp = Constants.PLAYER.MAX_HP;
    this.speed = Constants.PLAYER.SPEED;
    // 击败分值
    this.score = 0;
    // 拥有 buffs
    this.buffs = [];
  }

  update(dt) {}

  serializeForUpdate() {
    return {
      ...(super.serializeForUpdate()),
      userName: this.userName,
      hp: this.hp,
      buffs: this.buffs.map(item => item.type),
    }
  }
}

module.exports = Player;