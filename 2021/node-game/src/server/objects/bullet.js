const Item = require('./bullet');

/**
 * 子弹类
 */
class Bullet extends Item {
  constructor(data = {}) {
    super(data);
  }
}

module.exports = Bullet;