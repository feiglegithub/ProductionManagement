/**
 * 封边采集PDA端[不校验源托状态]-提交
    OldPlateUpiCode     前板upi编码
    DepartmentCode  部门编码
    ResourceManageId    资源id
    CurrentProcessId    当前工序id
    NewPlateCode        新板code
    WorkGroupNumber     班组序号
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
export default function (OldPlateUpiCode,DepartmentCode,ResourceManageId,CurrentProcessId,NewPlateCode,WorkGroupNumber,P_UnitWorkTime) {
    return Vue.axios.post(Storage.url(), {
      "ApiType": "FBChangePlateController",
      "Parameters": [
        {
          "Value": OldPlateUpiCode
        },
        {
          "Value": DepartmentCode
        },
        {
          "Value": ResourceManageId
        },
        {
          "Value": CurrentProcessId
        },
        {
          "Value": NewPlateCode
        },
        {
          "Value": WorkGroupNumber
        },
        {
          "Value": P_UnitWorkTime
        }
      ],
      "Method": "DoSubmitFBChangeOnIgnoreSourcePlateCode_PDA",
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