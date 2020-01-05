import Vue from 'vue';
import Vuex from 'vuex';
import Mutations from './mutations'
import Getters from './getters'
import Login from './modules/login';
import UserInfo from './modules/user-info';
import taskIncomingInspected from './modules/task-incoming-inspected';
import keepAlive from './modules/keepalive';
import exception from './modules/exception';
import filter from './modules/filter';
import defectSelected from './modules/defect-selected';
import WorkerInfo from './modules/worker-info';
Vue.use(Vuex)
const store = new Vuex.Store({
  // strict:true,
  state: {
    //  isLogin:false,   
  },
  getters: Getters,
  mutations: Mutations,
  modules: {
    login: Login,
    userInfo: UserInfo,
    taskIncomingInspected,
    keepAlive,
    exception,
    filter,
    defectSelected,
    workerInfo:WorkerInfo,
  }
})
export default store
