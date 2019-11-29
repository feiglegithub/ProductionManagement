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
