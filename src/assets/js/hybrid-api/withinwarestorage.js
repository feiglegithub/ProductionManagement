import Vux from 'vux'
export default{
  status:function () {
  	return Vue.prototype.$vue.$store.getters.getStatus
  }
}