const Item = require('./item');

/**
 * 道具类
 */
class Prop extends Item {
  constructor(data = {}) {
    super(data);
  }
}

module.exports = Prop;