export function isValidUserName (str) {
  const validMap = ['admin', 'editor']
  return validMap.indexOf(str.trim()) >= 0
}

/**
 * 检验合法url
 */
export function validDateUrl (url) {
  const urlReg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlReg.test(url)
}

/**
 * 是否是小写字母
*/
export function validTeLowerCase (str) {
  const letterReg = /^[a-z]+$/
  return letterReg.test(str)
}

/**
 * 是否是大写字母
*/
export function validTeUpperCase (str) {
  const letterReg = /^[A-Z]+$/
  return letterReg.test(str)
}

/**
 * 大小写字母
*/
export function validatAlphabets (str) {
  const letterReg = /^[A-Za-z]+$/
  return letterReg.test(str)
}
