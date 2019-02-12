(function () {
  /**
 * 截取指定字节的字符串
 * @param str 要截取的字符穿
 * @param len 要截取的长度，根据字节计算
 * @param suffix 截取前len个后，其余的字符的替换字符，一般用“…”
 * @returns {*}
 */
function cutString(str, len, suffix) {
  if (!str) return "";
  if (len <= 0) return "";
  if (!suffix) suffix = "";
  var templen = 0;
  for (var i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 255) {
      templen += 2;
    } else {
      templen++
    }
    if (templen == len) {
      return str.substring(0, i + 1) + suffix;
    } else if (templen > len) {
      return str.substring(0, i) + suffix;
    }
  }
  return str;
}
console.log('截取指定字节的字符串', cutString('adjasjdkhfjafhk', 8, 10));


/**
 * 判断微信浏览器
 * @returns {Boolean}
 */
function isWeiXin() {
  // var ua = window.navigator.userAgent.toLowerCase();
  // console.log(ua);
  return /MicroMessenger/i.test(window.navigator.userAgent)
}
console.log('判断微信浏览器', isWeiXin());

/**
 * 获取当前时间格式
 */
function getTimeFormat() {
  var date = new Date();
  var month, day, hour, min;
  parseInt(date.getMonth()) + 1 < 10 ? month = '0' + (parseInt(date.getMonth()) + 1) : month = parseInt(date.getMonth()) + 1;
  date.getDate() < 10 ? day = '0' + date.getDate() : day = date.getDate();
  date.getHours() < 10 ? hour = '0' + date.getHours() : hour = date.getHours();
  date.getMinutes() < 10 ? min = '0' + date.getMinutes() : min = date.getMinutes();
  return [month, day].join('-') + '  ' + hour + ':' + min
}

console.log(getTimeFormat())

/**
 * 浅拷贝
 * 值为基本类型会互不影响，与之相反的则会影响
 */
var arr = [1, 2, 3]
var n_arr = arr.slice()
n_arr[0] = 9
console.log(n_arr)
console.log(arr)

/** 
 * 深拷贝
 * 这种方法简单粗暴，不能拷贝函数
*/
var arr = ['old', 1, true, ['old1', 'old2'], {old: 1}]
var m_arr = JSON.parse(JSON.stringify(arr))
m_arr[3][1] = 4
console.log(m_arr)
console.log(arr)

})()