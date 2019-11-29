//实现组件自动以.js文件的文件名去注册组件
import Vue from 'vue'
import camelCase from 'lodash/camelCase'
const requireJS = require.context(
  // 其组件目录的相对路径
  '../js/hybrid-api',
  // 是否查询其子目录里的vue文件
  true,/\.js/
)
const hybridApi={};
requireJS.keys().forEach(fileName => {    
  // 获取组件配置
  const hybridConfig = requireJS(fileName)
let i=fileName.lastIndexOf("/");
// 获取组件的 小驼峰 命名
const componentName =camelCase(
      // 剥去文件名开头的 `./` 和结尾的扩展名
      fileName.slice(i+1,-3).replace(/^\.\/(.*)\.\w+$/, '$1')
    )
    hybridApi[componentName]=hybridConfig.default || hybridConfig
})

Vue.prototype.$hybridApi=hybridApi