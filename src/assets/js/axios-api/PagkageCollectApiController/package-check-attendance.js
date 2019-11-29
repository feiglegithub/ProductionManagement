/**
 * 查找考勤情况
 * pa 包装条码
 * scanedDatas 已扫描数据
 * @return  obj={"Success": true,
                 "Message": null,
                  "Result": [],
                 "Context": {
                    "Ticket": "str"票据信息
                }
                }
 *  @example $axiosApi.getAsnType().then(obj=>{})
 */
import Vue from 'vue';
import Storage from '../../storage.js'
export default function (workshopId,processId,resourceId) {
    return Vue.axios.post(Storage.url(), {
        "ApiType": "PagkageCollectApiController",
        "Parameters": [
          {
            "Value": workshopId
          },
          {
            "Value": processId
          },
          {
            "Value": resourceId
          }
        ],
        "Method": "PackageCheckAttendance",
        "Context": {
            "Ticket": Storage.ticket(),
            "InvOrgId": Storage.orgid()
        }
      }
      
    ).then(res => {
        console.log(res);
        if (res.data.Success) {
            Storage.refreshTicket(res.data.Context.Ticket)
        };
        let obj = res.data
        return obj
    }).catch(err => {
        if (Vue.$vux.loading.isVisible()) {
            Vue.$vux.loading.hide()
        }; //如果当前有显示loading就先隐藏 
        Vue.$vux.toast.show({
            // text: err.toString(),
            text: "连接服务器失败",
            width: '5rem',
            time: 2000,
            position: 'middle',
            type: "text"
        })
    })
}