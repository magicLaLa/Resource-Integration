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
<!-- 第17天 (2019.05.03) -->