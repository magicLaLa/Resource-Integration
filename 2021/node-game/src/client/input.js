import { emitControl } from './networking';

const KeyDownCodeMap = {
  65: {
    action: 'move-left',
    data: false
  },
  68: {
    action: 'move-right',
    data: true
  },
  87: {
    action: 'move-top',
    data: false
  },
  83: {
    action: 'move-bottom',
    data: true
  },
};

const KeyUpCodeMap = {
  65: {
    action: 'move-left',
    data: 0
  },
  68: {
    action: 'move-right',
    data: 0
  },
  87: {
    action: 'move-top',
    data: 0
  },
  83:{
    action: 'move-bottom',
    data: 0
  },
};

function onKeydown(ev) {
  const code = ev.keyCode;
  console.log('code', code)
  emitControl(KeyDownCodeMap[code]);
}

function onKeyup(ev) {
  const code = ev.keyCode;
  emitControl(KeyUpCodeMap[code]);
}

export function startCapturingInput(){
  window.addEventListener('keydown', onKeydown);
  window.addEventListener('keyup', onKeyup);
}

export function stopCapturingInput(){
  window.removeEventListener('keydown', onKeydown);
  window.removeEventListener('keyup', onKeyup);
}