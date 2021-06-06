import { emitControl } from './networking';

const KeyDownCodeMap = {
  37: {
    action: 'move-left',
    data: false
  },
  39: {
    action: 'move-right',
    data: true
  },
  38: {
    action: 'move-top',
    data: false
  },
  40: {
    action: 'move-bottom',
    data: true
  },
};

const KeyUpCodeMap = {
  37: {
    action: 'move-left',
    data: 0
  },
  39: {
    action: 'move-right',
    data: 0
  },
  38: {
    action: 'move-top',
    data: 0
  },
  40:{
    action: 'move-bottom',
    data: 0
  },
};

function onKeydown(ev) {
  const code = ev.keyCode;
  emitControl(KeyDownCodeMap[code]);
}

function onKeyup(ev) {
  const code = ev.keyCode;
  emitControl(KeyUpCodeMap[code]);
}


function getMouseDir(ev){
  const dir = Math.atan2(ev.clientX - window.innerWidth / 2, ev.clientY - window.innerHeight / 2);
  return dir;
}

function onMousemove(ev){
  if(ev.button === 0){
    emitControl({
      action: 'dir',
      data: getMouseDir(ev)
    })
  }
}

function onMousedown(ev){
  if(ev.button === 0){
    emitControl({
      action: 'bullet',
      data: true
    })
  }
}

function onMouseup(ev){
  if(ev.button === 0){
    emitControl({
      action: 'bullet',
      data: false
    })
  }
}

export function startCapturingInput(){
  window.addEventListener('keydown', onKeydown);
  window.addEventListener('keyup', onKeyup);
  window.addEventListener('mousedown', onMousedown)
  window.addEventListener('mousemove', onMousemove)
  window.addEventListener('mouseup', onMouseup)
}

export function stopCapturingInput(){
  window.removeEventListener('keydown', onKeydown);
  window.removeEventListener('keyup', onKeyup);
  window.removeEventListener('mousedown', onMousedown)
  window.addEventListener('mousemove', onMousemove)
  window.removeEventListener('mouseup', onMouseup)
}