let woker = new Worker('worker.js') // 创建一个新的worker,指定一个脚本的URI来执行worker线程
// 通过postMessage() 方法和onmessage事件处理函数生效
woker.onmessage = ({data: arr}) => {
  // worker.js 处理完成之后返回回来的
  console.log(arr)
}
woker.postMessage('start')