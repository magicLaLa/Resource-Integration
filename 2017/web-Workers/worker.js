onmessage = arr => {
  console.log('开始')
  var arr = []
  for (let i = 0; i < 1000000; i++) {
    arr.push(Math.random())
  }
  let st = new Date()
  arr.sort()
  let et = new Date()
  console.log('排序完成,耗时:' + (et - st))

  postMessage(arr)
}