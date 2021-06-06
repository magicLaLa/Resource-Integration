const Item = require("./item");
const Bullet = require('./bullet');
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
    // 开火
    this.fire = false;
    this.fireMouseDir = 0;
    this.fireTime = 0;
  }

  takeBulletDamage(){
    this.hp -= 1;
  }

  update(dt) {
    // 这里的dt是每次游戏更新的时间，乘于dt将会60帧也就是一秒移动speed的值
    this.x += (this.move.left + this.move.right) * this.speed * dt;
    this.y += (this.move.top + this.move.bottom) * this.speed * dt;

    // 每帧都减少开火延迟
    this.fireTime -= dt;
    if (this.fire) {
      // 如果没有延迟就返回 bullet 对象
      if (this.fireTime <= 0) {
        this.fireTime = Constants.PLAYER.FIRE;
        // 创建一个bullet对象，将自身的id传递过去，后面做碰撞的时候，就自己发射的子弹就不会打到自己
        return new Bullet(this.id, this.x, this.y, this.fireMouseDir);
      }
    }

    // 在地图最大尺寸和自身位置比较时，不能大于地图最大尺寸
    // 在地图开始0位置和自身位置比较时，不能小于0
    this.x = Math.max(0, Math.min(Constants.MAP_SIZE, this.x));
    this.y = Math.max(0, Math.min(Constants.MAP_SIZE, this.y));
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
