const Item = require('./item');

/**
 * 子弹类
 */
class Bullet extends Item {
  constructor(data = {}) {
    super(data);
  }
}

module.exports = Bullet;