### 1.用递归算法实现，数组长度为5且元素的随机数在2-32间不重复的值
```js
// 解1
function buildArray(arr, len, min, max) {
  let rand = ~~(Math.random() * (max - min + 1)) + min;
  if (!arr.includes(rand)) arr.push(rand);
  return arr.length === len ? arr : buildArray(arr, len, min, max);
}
// 解2
function buildArrayV2(arrSet, len, min, max) {
  let rand = ~~(Math.random() * (max - min + 1)) + min;
  arrSet.add(rand);
  return arr.size === len ? [...arrSet] : buildArray(arrSet, len, min, max);
}
```
### 2.写一个方法去掉字符串中的空格(传入不同的类型分别能去掉前、后、前后、中间的空格)
```js
const fn = {
  left(str) {
    return str.replace(/^\s*/g, '');
  },
  right(str) {
    return str.replace(/\s*$/g, '');
  },
  leftAndRight(str) {
    return str.replace(/(^\s*)|(\s*$)/g, '');
  },
  all(str) {
    return str.replace(/\s*/g, '');
  },
  center(str) {
    while (str.match(/\w\s+\w/)) {
      str = str.replace(/(\w)(\s+)(\w)/, `$1$3`)
    }
    return str;
  },
}
function trim(str, postion) {
  return fn[postion](str);
}
```
### 3.去除字符串中最后一个指定的字符
```js
// 解1:
functin delLast(str, del) {
  if (!str || !tel) return false;
  const idx = str.lastIndexOf(del);
  return str.substring(0, idx) + str.substring(idx+1, str.length);
}
// 解2:
function delLast(str,target) {
  let reg =new RegExp(`${target}(?=([^${target}]*)$)`)
  return str.replace(reg,'')
}
```
### 4.把下划线命名转成大驼峰命名
```js
// 解1；
function strToCamel(str){
  return str.replace(/(^|_)(\w)/g,(m,$1,$2)=>$2.toUpperCase());
} // 'a_c_def' -> ACDef
// 解2:
function toCamel(str) {
  return str.replace(/(\w)(_)(\w)/g, (match, $1, $2, $3) => `${$1}${$3.toUpperCase()}`)
}
console.log(toCamel('a_bc_def')) // aBcDef
// 解3:
function changeStr(str){
  if(str.split('_').length==1)return;
  str.split('_').reduce((a,b)=>{
    return a+b.substr(0,1).toUpperCase() + b.substr(1)
  })
}
```
### 5.把字符串大小写切换的方法
```js
function caseConvert(str){
  return str.replace(/([a-z]*)([A-Z]*)/g, (m, s1, s2)=>{
    return `${s1.toUpperCase()}${s2.toLowerCase()}`
  })
}
caseConvert('AsA33322A2aa') //aSa33322a2AA
```
### 6.去除制表符和换行符的方法
```js
/**
 * \f  匹配换页字符。
 * \n  匹配换行字符。
 * \r  匹配回车符字符。
 * \t  匹配制表字符。
 * \v  匹配垂直制表符。
 */
function removeEmpty(str) {
  return str.replace(/[\f\n\r\t\v]/g, '');
}
```
### 7.统计某一字符或字符串在另一个字符串中出现的次数
```js
// 解1：
function strCount(str, targe) {
  let count = 0;
  if (!target) return count;
  while(str.match(target)) {
    str = str.replace(target, '');
    count++
  }
  return count;
}
// 解2：
const childInNums = parent.split(child).length - 1;
```
### 8.一个加密字符串的方法
```js
// 解1：
function encode (str) {
	return btoa(encodeURIComponent(str));
}
function decode (str) {
	return decodeURIComponent(atob(str));
}
/**
 * 解2:
 * 利用 base64, 浏览器环境自带 btoa / atob 方法
 * Node.js 需要引入相关库
*/
const str = "abcdefg";
console.log(btoa(str));
console.log(atob(btoa(str)));
// 解3 凯撒密码：
const encodeCaesar = ({str = "", padding = 3}) => {
  if (!str) return str;
  return str.split('').map(s => String.fromCharCode(s.charCodeAt() + padding)).join('');
}const decodeCaesar = ({str = "", padding = 3}) => {
  if (!str) return str;
  return str.split('').map(s => String.fromCharCode(s.charCodeAt() - padding)).join('');
}
```
### 9.一个判断数据类型的方法
```js
function type(obj) {
  return Object.prototype.toString.call(obj).replace(/[object\s|\]/g, '');
}
```
### 10.一个获取当前url查询字符串中的参数的方法
```js
// 解1：
let params = (new URL('https://example.com/?name=Jonathan&age=18')).searchParams;
let name = params.get("name"); // "Jonathan"
// 解2:
function urlParam(){
  const param = {};
  location.search.replace(/([^&=?]+)=([^&]+)/g,(m,$1,$2)=> param[$1] = $2);
  return param;
}
```
### 11.数组去重的方法（支持多维数组）
```js
// 解1:
function flat(arr, target = []) {
  arr.forEach((tiem) => {
    if (Array.isArray(item)) {
      flat(item, target)
    } else {
      target.push(item);
    }
  })
}
// 解2:
function uniqueArr(arr) {
  return [...new Set(arr.flat(Infinity))];
}
```
### 12.返回到顶部的方法有哪些
```js
// 解1：利用 #，在 url 后增加 # 不会让页面刷新，并且可以回到顶部,当这个方法执行多次即有多个 # 时，页面不会有响应
window.location.href += '#';
// 解2：
document.documentElement.scrollTop = 0;
```

### 验证身份证号的方法
*https://github.com/haizlin/fe-interview/issues/68*
```js
// 分析：身份证号码的组成：地址码6位+年份码4位+月份码2位+日期码2位+顺序码3位+校验码1位
const reg = /^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|(10|20|30|31))\d{3}[0-9Xx]$/;
```

### 验证是否为中文
```js
// 使用的Unicode 编码 4e00 和 9fa5 分别表示第一个汉字和最后一个汉字的编码
const reg = /^[\u4e00-\u9fa5]+$/;
```

### 实现一个new方法
```js
/**
 * 1. 建一个新对象
 * 2. 把新对象的原型指向构造函数的prototype
 * 3. 把构造函数里的this指向新对象
 * 4. 返回这个新对象
*/
// 1.
function newNew(){
  const newObj = {}
  // 1. 创建一个新对象
  const Con = [].shift.call(arguments)
  // 得到构造函数
  newObj.__proto__ = Con.prototype;
  // 2. 把新对象的原型指向构造函数的prototype
  const res = Con.apply(newObj, arguments)
  // 3. 把构造函数里的this指向新对象
  return typeof res === 'object' ? res : newObj;
  // 4. 返回新对象
}
// 2.
function _new(C, ...arg) {
  const obj = Object.created(C.prototype);
  const obj2 = C.apply(obj, ,arg);
  return obj instanceof Object ? obj2 : obj;
}
```

### 如何快速让一个数组乱序，写出来
```js
array.sort((a, b) => Math.random() > 0.5 ? 1 : -1);
```

### bind、call、apply的区别？并手写实现一个bind
```js
// call和apply都是为了解决改变this的指向。作用都是相同的，只是传参的方式不同。除了第一个参数外，call可以接收一个参数列表，apply只接受一个参数数组。 bind绑定完之后返回一个新的函数，不执行。
Function.prototype.myCall = function (content = window) {
  content.fn = this;
  const args = [..arguments].sclice(1);
  const result = content.fn(..args);
  delete content.fn;
  return result;
}
Function.prototype.myApply = function(content = window) {
  content.fn = this;
  let result;
  if (arguments[1]) {
    result = content.fn(...arguments[1]);
  } else {
    result = content.fn();
  }
  delete content.fn;
  return result;

}
Function.prototype.myBind = function(content) {
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }
  const _this = this;
  const args = [...arguments].slice(1);
  return function F() {
    if (this instanceof F) {
      return new _this(..args, ...arguments);
    }
    return _this.apply(content, args.concat(...arguments));
  }
}
```

### 将数组分块为指定大小的较小数组
```js
// 1
const chunk = (arr, size) => Array.from({
  length: Math.ceil(arr.length / size)
}, (v, i) => arr.slice(i*size, i*size+size));
console.log(chunk([1,2,3,4,5,6], 3)) // [[1, 2, 3], [4, 5, 6]]
// 可以通过 flat 扁平数组获得原始数组
chunk([1,2,3,4,5,6], 3).flat();
// 2
const listChunk = (list, szie = 1, cacheList = []) => {
  const tmp = [...list];
  if (size < 0) return cacheList;
  while(tmp.length) {
    cacheList.push(tmp.splice(0, size));
  }
  return cacheList;
}
```

### 获取数组交集
```js
const intersection = (list, ...args) => list.filter(item => args.every(list => list.includes(item)));
intersection([2, 1], [2, 3]) // [2]
intersection([1, 2], [3, 4]) // []
```

### 获取数组的最大值、最小值的方法
```js
// 1
Math.min(...array);
Math.max(...array);
// 2
arr.reduce((pre, cur) => pre = pre > cur ? prev : cur);
// 3
Math.max.apply(Array, arr)
```

### 判断字符串是否为回文字符串
```js
// 获取有效的字符串，我们利用正则去匹配字母和数字，因为忽略大小写，所以我们转成小写
// 然后利用 split('') 把字符串分割成数组，再用数组的 reverse() 去反转，再用 join(‘’) 去拼接
// 最后进行比较
function isPlalindrome(str) {
  if (str.length === 1) return true;
  const str2 = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  const strReverse = str2.split('').reverse().join();
  return str === strReverse;
}
// 双指针
function isPalindrome(str) {
  let lp = 0;
  let rp = str.length - 1;
  while(lp <= rp) {
    if (str[lp++] !== str[rp--]) return false;
  }
  return true;
}
```

### 深度克隆对象
```js
function objClone(obj) {
  let buf;
  if (obj instanceof Array) {
    buf = [];
    let len = obj.length;
    while(len--) {
      buf[len] = objClone(obj[i]);
    }
    return buf;
  } else if (obj instanceof Object) {
    buf = {};
    for (const k in obj) {
      buf[k] = obj[k]
    }
    return buf;
  }
  return obj;
}
```
<!-- 26 -->