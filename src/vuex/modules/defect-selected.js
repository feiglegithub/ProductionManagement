import { STATUS_CODES } from "http";

export default {
  state: {
    currentDefectType:'',//当前点选的缺陷大项
    currentDefectDetail:'',//当前点选的缺陷小项
    currentDefect:[],//大项小项的集合
  },
  getters:{
    getCurrentDefectType(state){
      return state.currentDefectType;
    },
    getCurrentDefectDetail(state){
      return state.currentDefectDetail;
    },
    getCurrentDefect(state){
      return state.currentDefect;
    },
    
  },
  mutations: {
    setDefectSelected(state,{attr,val}){
      state[attr]=val;
    }
  },
  actions: {
    setDefectSelected(context,{attr,val}){
      context.commit('setDefectSelected',{attr,val});
    }
  }
}
