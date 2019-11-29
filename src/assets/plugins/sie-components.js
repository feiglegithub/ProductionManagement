//实现组件自动以.vue文件的文件名去注册组件
import Vue from 'vue'
//解决plugin方式的注册
const requireJs = require.context(
  // 其组件目录的相对路径
  '../../components',
  // 是否查询其子目录里的vue文件
  true,/\.js/
)
requireJs.keys().forEach(fileName => { 
  let i=fileName.lastIndexOf("/index.js");
 
  if(i>-1){//说明有index.js
    Vue.use(requireJs(fileName).default||requireJs(fileName).default)
  }
})