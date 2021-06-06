const { nanoid } = require("nanoid");
const Item = require("./item");
const Constants = require("../../shared/constants");

/**
 * 子弹类
 */
class Bullet extends Item {
  constructor(parentId, x, y, dir) {
    super({
      id: nanoid(),
      x,
      y,
      w: Constants.BULLET.RADUIS,
      h: Constants.BULLET.RADUIS,
    });

    this.rotate = 0;
    this.dir = dir;
    this.parentId = parentId;
    this.isOver = false;
  }

  update(dt) {
    // 使用三角函数将鼠标位置计算出对应的x/y值
    this.x += dt * Constants.BULLET.SPEED * Math.sin(this.dir);
    this.y += dt * Constants.BULLET.SPEED * Math.cos(this.dir);

    // 这里是为了让子弹有一个旋转功能，一秒转一圈
    this.rotate += dt * 360;

    // 离开地图就将isOver设置为true，在game.js中就会过滤
    if (this.x < 0 || this.x > Constants.MAP_SIZE || this.y < 0 || this.y > Constants.MAP_SIZE) {
      this.isOver = true;
    }
  }

  serializeForUpdate() {
    return {
      ...super.serializeForUpdate(),
      rotate: this.rotate,
    }
  }
}

module.exports = Bullet;
