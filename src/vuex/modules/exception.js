import { STATUS_CODES } from "http";

export default {
  state: {
    description:'',//异常描述
    date:'',//发现异常的时间
    contactPerson:[],//关联人员
    contactAsnNo:{},//关联单据
    image:[],
    unHandleExceptionList:[]//异常审核列表
  },
  getters:{
    getDescription(state){
      return state.description;
    },
    getDate(state){
      return state.date;
    },
    getContactPerson(state){
      return state.contactPerson;
    },
    getContactAsnNo(state){
      return state.contactAsnNo;
    },
    getImage(state){
      return state.image;
    },
    getUnHandleExceptionList(state){
      return state.unHandleExceptionList;
    }
  },
  mutations: {
    setExceptionValue(state,{attr,val}){
      // state[attr]=JSON.parse(JSON.stringify(val));
      state[attr]=val;
    },
    pushUnHandleExceptionList(state,obj){
      state.unHandleExceptionList.push(obj);
    },
    updateUnHandleExceptionList(state,{index,obj}){
      console.log('vuex',index,obj);
      state.unHandleExceptionList.splice(index,1,obj);
      console.log('state',state.unHandleExceptionList);
    }
  },
  actions: {
    setExceptionValue(context,{attr,val}){
      context.commit('setExceptionValue',{attr,val});
    },
    pushUnHandleExceptionList(context,obj){
      context.commit('pushUnHandleExceptionList',obj);
    },
    updateUnHandleExceptionList(context,{index,obj}){
      context.commit('updateUnHandleExceptionList',{index,obj});
    }
  }
}
