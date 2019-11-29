import Vue from 'vue'
export default{
   status: function () {
        return Vue.prototype.$vue.$store.getters.getStatus
   },
   serachList : function () {
         return Vue.prototype.$vue.$store.getters.getserachList
   }
}