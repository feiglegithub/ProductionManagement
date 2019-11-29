export default {
  state: {
    incomingBill: {
      ByPropertyItemList:[{
      ASNNo: "",
      byPropoty: {},
      byCount: {},
      isNeed: {},
      State: true}]
    }
  },
  getters:{
    getincoming(state){
        return state.incomingBill
    }
  },
  mutations: {
    changeIncomingBill(state, val) {
      state.incomingBill= val
    }
  },

  actions: {
    changeIncomingBill(context, val) {
      context.commit('changeIncomingBill', val)
    }
  }


}
