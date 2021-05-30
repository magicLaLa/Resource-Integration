const express = require('express');
const socketio = require('socket.io');
const webpack = require('webpack');
const webpackDevMiddleware  = require('webpack-dev-middleware');

const webpackDevConfig = require('../../webpack.dev');

const app = express();
const Socket = require('./core/socket');
const Game = require('./core/game');

app.use(express.static('public'));

if (process.env.NODE_ENV === 'development') {
  // 开发模式
  // 这里使用 'webpack-dev-middleware 的中间件，作用是代码改动就使用 webpack.dev 的配置打包文件
  const compiler = webpack(webpackDevConfig);
  app.use(webpackDevMiddleware(compiler));
} else {
  app.use(express.static('dist'));
}

// 启动服务
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log('Server is running on port' + port);
});

// 实例游戏类
const game = new Game;

// 监听 socket 服务
const io = socketio(server);
// 将游戏以及 io 传入创建的 socket 类来统一管理
const socket = new Socket(game, io);

// 监听链接进入游戏回调
io.on('connect', item => {
  socket.listen(item);
});