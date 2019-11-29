import { STATUS_CODES } from "http";

export default {
  state: {
    selectedSupplier:[],
    selectedMaterial:[],
    selectedOther:{
      // date:[],inspectionStatus:[],isUrgent:[]
    }
  },
  getters:{
    getSelectedSupplier(state){
      return state.selectedSupplier;
    },
    getSelectedMaterial(state){
      return state.selectedMaterial;
    },
    getSelectedOther(state){
      return state.selectedOther;
    }
  },
  mutations: {
    setFilter(state,{attr,val}){
      // state[attr]=JSON.parse(JSON.stringify(val));
      state[attr]=val;
    }
  },
  actions: {
    setFilter(context,{attr,val}){
      context.commit('setFilter',{attr,val});
    }
  }
}
