export default {
    state: {
      aKeepalive: [],
    },
    getters:{
        keepAlive(state){
          return state.aKeepalive
      }
    },
    mutations: {
      addKeepAlive(state, val) {
        state.aKeepalive.push(val)         
          },
        removeKeepAlive(state, val){
        state.aKeepalive.forEach((item,i)=>{
            if(item==val){
                state.aKeepalive.splice(i,1)
            }
        })
        }
    },
  
    actions: {
        addKeepAlive(context, val) {
        context.commit('addKeepAlive', val)
      },
      removeKeepAlive(context,val){
        context.commit('removeKeepAlive', val)
      }
    }
  
  
  }
  