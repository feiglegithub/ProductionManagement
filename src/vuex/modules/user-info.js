export default {
   state:{
   userName:"",
   userCode:"",
   ticket:"",
   url:"",
 //    password:"", 
   userId:0,
   orgId:0,
   wareId:0,
   warehouse:"",
   authMenus:{},
   user:"",
   isbatchfeeding:"",
   choiceindex:0,
   },
   mutations:{
       changeUserInfo(state,{attr,val}){
           state[attr]=val
       }
   },
   getters:{
    getUserCode(state){
           return state
       },
    getTicket(state){
        return state.ticket
    },
    getOrgId(state){
        return state.orgId
    },
    getUserName(state){
        return state.userName
    },
    getUrl(state){
         return state.url
    },
    getUserId(state){
        return state.userId
    },
    getOrgId(state){
        return state.orgId
    },
    getWareId(state){
        return state.wareId
    },
    getWarehouse(state){
        return state.warehouse
    },
    getAuthMenus(state){
            return state.authMenus
        },
    getUser(state){
        return state.user
    },
    getIsBatchFeeding(state){
        return state.isbatchfeeding
    },
    getChoiceIndex(state){
        return state.choiceindex
    },
   },
   actions:{
    changeUserInfo(context,{attr,val}){
        context.commit('changeUserInfo',{attr,val})
    }
   }
   
    
}
