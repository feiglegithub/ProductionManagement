/**
 * 字符串过滤函数，将字符串前后的空格去除
 * @param {String} value
 * @returns {String}
 */
export default function(value){
  return value.replace(/(^\s*)|(\s*$)/g, "");
}