// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import App from './App'
import axios from 'axios'
import './assets/iconfont/iconfont.css'
import './assets/plugins/hybrid-api.js'
import './assets/js/flexible'
import './assets/plugins/vux-plugins.js'
import './assets/plugins/iconfont.js'
import '@/assets/plugins/sie-components.js'
import './assets/plugins/axios-api.js'
// import './assets/js/vconsole.min.js'
import './assets/js/compatibleFind.js'
import store from './vuex'

// import KeyboardBus from "@/assets/js/keyboard-bus.js"

FastClick.attach(document.body)
Vue.config.productionTip = false
// Vue.prototype.$keyboard=KeyboardBus;
/* eslint-disable no-new */

function newVue(){ 
  const VueObject=new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app-box')
Vue.prototype.$vue=VueObject;
// router.afterEach(()=>{  
//   //跳页面就将键盘隐藏，还有注销事件
//   Vue.prototype.$keyboard.$emit("hide");  
//   Vue.prototype.$keyboard.$off('enter'); 
//   Vue.prototype.$keyboard.$off('input'); 
// })
if(window.cordova){
  Vue.prototype.$hybridApi.configHeader({show:false});//配置去掉v平台的首页
  Vue.prototype.$hybridApi.layout('212A48');
}
}
if (process.env.NODE_ENV === 'development') {
  // run dev时执行
  newVue()
}else{//run build
  document.addEventListener('deviceready',function(){
    newVue()})
}
