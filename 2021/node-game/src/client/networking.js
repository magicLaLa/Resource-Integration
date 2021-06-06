import io from 'socket.io-client';
import Constants from '../shared/constants';
import  { processGameUpdate } from './state';

// 判断是否是 https，如果是需要使用 wss 协议
const socketProtocal = window.location.protocol.includes('https') ? 'wss' : 'ws';
// 进行链接并且不重新链接，这样可以制作一个断开链接的功能
const socket = io(`${socketProtocal}://${window.location.host}`, { reconnection: false });

const connectPromise = new Promise((resolve, reject) => {
  socket.on('connect', () => {
    console.log('Connect to server');
    resolve();
  });
});

export const connect = onGameOver => {
  connectPromise.then(() => {
    // 游戏更新
    socket.on(Constants.MSG_TYPES.UPDATE, processGameUpdate);
    socket.on(Constants.MSG_TYPES.GAME_OVER, onGameOver)
    socket.on('disconnect', () => {
      $('.disconnect').classList.remove('hidden')
      console.log('Disconnected from server.')
    })
  });
}

export const play = userName => {
  socket.emit(Constants.MSG_TYPES.JOIN_GAME, userName);
}

export const emitControl = data => {
  socket.emit(Constants.MSG_TYPES.INPUT, data);
}