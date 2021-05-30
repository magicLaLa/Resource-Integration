const Constants = require('../../shared/constants');

class Socket {
  constructor(game, io) {
    this.game = game;
    this.io = io;
  }

  listen(socket) {
    // 成功链接 socket 服务
    console.log('Player connected: Socket ID:' + socket.id);

    // 加入游戏
    socket.on(Constants.MSG_TYPES.JOIN_GAME, this.game.joinGame.bind(this.game, socket));
    // 断开游戏
    socket.on('disconnect', this.game.disconnect.bind(this.game, socket));
    // 移动
    socket.on(Constants.MSG_TYPES.INPUT, this.game.handleInput.bind(this.game, socket));
  }
}

module.exports = Socket;