const Item = require("./item");
const Constants = require("../../shared/constants");

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
    this.move = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    };
  }

  update(dt) {
    // 这里的dt是每次游戏更新的时间，乘于dt将会60帧也就是一秒移动speed的值
    this.x += (this.move.left + this.move.right) * this.speed * dt;
    this.y += (this.move.top + this.move.bottom) * this.speed * dt;

    // 在地图最大尺寸和自身位置比较时，不能大于地图最大尺寸
    // 在地图开始0位置和自身位置比较时，不能小于0
    // this.x = Math.max(0, Math.min(Constants.MAP_SIZE, this.x));
    // this.y = Math.max(0, Math.min(Constants.MAP_SIZE, this.y));
  }

  serializeForUpdate() {
    return {
      ...super.serializeForUpdate(),
      userName: this.userName,
      hp: this.hp,
      buffs: this.buffs.map((item) => item.type),
    };
  }
}

module.exports = Player;
