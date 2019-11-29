//实现组件自动以.js文件的文件名去注册组件
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import camelCase from 'lodash/camelCase'
Vue.use(VueAxios, axios)
const requireComponent = require.context(
  // 其组件目录的相对路径
  '../js/axios-api',
  // 是否查询其子目录里的vue文件
  true,/\.js/
)
const axiosApi={};
requireComponent.keys().forEach(fileName => {    
  // 获取组件配置
  const axiosConfig = requireComponent(fileName)
let i=fileName.lastIndexOf("/");
// 获取组件的 小驼峰 命名
const componentName =camelCase(
      // 剥去文件名开头的 `./` 和结尾的扩展名
      fileName.slice(i+1,-3).replace(/^\.\/(.*)\.\w+$/, '$1')
    )
axiosApi[componentName]=axiosConfig.default || axiosConfig
})

Vue.prototype.$axiosApi=axiosApi