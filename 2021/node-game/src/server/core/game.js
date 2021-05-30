const Player = require('../objects/player');
const Constants = require('../../shared/constants');

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
    const dt = (now - this.lastUpdateTime) / 1000;
    this.lastUpdateTime = dt;

    // 每次游戏更新告诉玩家对象，你要更新了
    Object.keys(this.players).map(playerID => {
      const player = this.players[playerID]
      player.update(dt)
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

  handleInput(socket, item) {
    console.log('item', item)
    const player = this.players[socket.id];
    if (player) {
      let data = item.action.split('-');
      let type = data[0];
      let value = data[1];
      switch(type) {
        case 'move':
          // 这里是为了防止前端发送1000/-1000这种数字，会导致玩家移动飞快
          player.move[value] = typeof item.data === 'boolean' ? item.data ? 1 : -1 : 0;
          break;
      }
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
    });
  }

  // 玩家断开链接
  disconnect(socket) {
    delete this.sockets[socket.id];
    delete this.players[socket.id];
  }
}

module.exports = Game;