import Vue from 'vue';
export default {
  url: function () {
    let _url = "";
    if (process.env.NODE_ENV === 'production') {
      // _url=localStorage.getItem('url')+'/api/invoke'
      _url = Vue.prototype.$vue.$store.getters.getUrl
    } else {
      _url = '/api/invoke'
    }
    return _url
  },
  ticket: function () {
    return Vue.prototype.$vue.$store.getters.getTicket
  },
  refreshTicket: function (newticket) {
    Vue.prototype.$vue.$store.dispatch('changeUserInfo', {
      attr: 'ticket',
      val: newticket
    });
    if (window.cordova) {
      Vue.prototype.$vue.$hybridApi.refreshUserInfo({
        key: "Ticket",
        value: newticket,
        success: obj => {
          console.log("平台ticket修改成功")
        }
      })
    }
  },
  //计件工资用户信息
  refreshWorkerInfo:function(obj){
    Vue.prototype.$vue.$store.dispatch('changeInfo',{
      attr:'StaffCode',
      val:obj.StaffCode,
    });
    Vue.prototype.$vue.$store.dispatch('changeInfo',{
      attr:'StaffName',
      val:obj.StaffName,
    });
    Vue.prototype.$vue.$store.dispatch('changeInfo',{
      attr:'WorkShiftDate',
      val:obj.WorkShiftDate,
    });
    Vue.prototype.$vue.$store.dispatch('changeInfo',{
      attr:'ProducProcessCode',
      val:obj.ProducProcessCode,
    });
    Vue.prototype.$vue.$store.dispatch('changeInfo',{
      attr:'ProcessName',
      val:obj.ProcessName,
    });
    Vue.prototype.$vue.$store.dispatch('changeInfo',{
      attr:'WorkShiftId',
      val:obj.WorkShiftId,
    });
    Vue.prototype.$vue.$store.dispatch('changeInfo',{
      attr:'WorkShiftName',
      val:obj.WorkShiftName,
    });
    Vue.prototype.$vue.$store.dispatch('changeInfo',{
      attr:'MachineCode',
      val:obj.MachineCode,
    });
  },
  WorkerInfo:function(){
    return { 
      StaffCode: Vue.prototype.$vue.$store.getters.getStaffCode,
      StaffName: Vue.prototype.$vue.$store.getters.getStaffName,
      WorkShiftDate: Vue.prototype.$vue.$store.getters.getWorkShiftDate,
      ProducProcessCode: Vue.prototype.$vue.$store.getters.getProducProcessCode,
      ProcessName: Vue.prototype.$vue.$store.getters.getProcessName,
      WorkShiftId: Vue.prototype.$vue.$store.getters.getWorkShiftId,
      WorkShiftName: Vue.prototype.$vue.$store.getters.getWorkShiftName,
      MachineCode: Vue.prototype.$vue.$store.getters.getMachineCode,
    }
  },
  orgid: function () {
    return Vue.prototype.$vue.$store.getters.getOrgId
  },
  warehouseid: function () {
    return Vue.prototype.$vue.$store.getters.getWareId
  },
  taskdata: function () {
    return Vue.prototype.$vue.$store.getters.getTaskDatas
  },
  scancount: function () {
    return Vue.prototype.$vue.$store.getters.getScanCount
  },
  getlpncode: function () {
    return Vue.prototype.$vue.$store.getters.getLpnCode
  },
  sdmomlpncode: function () {
    return Vue.prototype.$vue.$store.getters.getSdmomLpcode
  },
  sdmomitem: function () {
    return Vue.prototype.$vue.$store.getters.getSdmomItem
  },
  userid: function () {
    return Vue.prototype.$vue.$store.getters.getOrgId
  },
}
