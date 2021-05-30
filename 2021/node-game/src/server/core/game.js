const Player = require('../objects/player');
const Constants = require('../../shared/constants');
const constants = require('../../shared/constants');

class Game {
  constructor() {
    // 保存玩家的 socket 包
    this.sockets = {};
    // 保存玩家的游戏对象信息
    this.players = {};
    // 子弹
    this.bullets = [];
    // 最后一次执行时间
    this.lastUpdateTime = Date.now();
    // 是否发送给前端数据，每两帧发送一次数据
    this.shouldSendUpadte = false;
    // 游戏更新
    setInterval(this.update.bind(this), 1000 / 60);
  }

  update() {
    const now = Date.now();
    // 现在的时间减去上次执行完毕的时间得到中间间隔的时间
    const dt = (now - this.lastUpdateTime) / 1000;
    this.lastUpdateTime = dt;

    // 更新玩家人物
    Object.keys(this.players).map(playerId => {
      const player = this.players[playerId];
      player.update(dt);
    });

    if (this.shouldSendUpadte) {
      Object.keys(this.sockets).map(socketID => {
        const socket = this.sockets[socketID];
        const player = this.players[socketID];
        // 处理游戏中的对象数据发送给前端
        socket.emit(Constants.MSG_TYPES.UPDATE, this.createUpdate(player));
      });
      this.shouldSendUpadte = false;
    } else {
      this.shouldSendUpadte = true;
    }
  }

  createUpdate(player) {
    // 其他玩家
    const otherPlayer = Object.values(this.players).filter(p => p !== player);
    return {
      t: Date.now(),
      // 自己
      me: player.serializeForUpdate(),
      others: otherPlayer,
      // 子弹
      bullets: this.bullets.map(bullet => bullet.serializeForUpdate()),
    }
  }

  // 玩家加入游戏
  joinGame(socket, userName) {
    this.sockets[socket.id] = socket;

    // 玩家位置随机生成
    const x = (Math.random() * 0.5 + 0.25) * Constants.MAP_SIZE;
    const y = (Math.random() * 0.5 + 0.25) * Constants.MAP_SIZE;
    this.players[socket.id] = new Player({
      id: socket.id,
      userName,
      x,
      y,
      w: 20,
      h: 40,
    });
  }

  // 玩家断开链接
  disconnect(socket) {
    delete this.sockets[socket.id];
    delete this.players[socket.id];
  }
}

module.exports = Game;