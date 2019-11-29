// 在app页面引入组件，保证键盘不会被子组件的z-index覆盖，然后在vue.prototype里注册bus.js，在路由守卫里让跳页面时就隐藏并注销事件，
// 在页面的输入框添加两个属性siekeyboard="vmodel" :siekeyboardval="vmodel" 将当前的值传给组件 
// 在created 或者mounted 里注册input事件绑定 v-model的值同步 跟enter事件this.$keyboard.$on("input" ,$on("enter"
//如果页面有keep-alive的，要在active时重新注册键盘事件
import Skeyboard from './Skeyboard.vue';
export default {
  install: function (Vue) {
    Vue.component('s-keyboard',Skeyboard)
  }
}
