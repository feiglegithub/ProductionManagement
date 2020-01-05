export default {
    state:{
       StaffCode:null,
       StaffName:null,
       WorkShiftDate:null,
       ProducProcessCode:null,
       ProcessName:null,
       WorkShiftId:null,
       WorkShiftName:null,
       MachineCode:null,
    },
    mutations:{
        changeInfo(state,{attr,val}){
            state[attr]=val
        }
    },
    getters:{
     getStaffCode(state){
            return state.StaffCode;
        },
     getStaffName(state){
         return state.StaffName;
     },
     getWorkShiftDate(state){
         return state.WorkShiftDate;
     },
     getProducProcessCode(state){
        return state.ProducProcessCode;
     },
     getProcessName(state){
        return state.ProcessName;
     },
     getWorkShiftId(state){
        return state.WorkShiftId;
     },
     getWorkShiftName(state){
        return state.WorkShiftName;
     },
     getMachineCode(state){
        return state.MachineCode;
     },
    },
    actions:{
     changeInfo(context,{attr,val}){
         context.commit('changeInfo',{attr,val})
     }
    }
    
     
 }
 