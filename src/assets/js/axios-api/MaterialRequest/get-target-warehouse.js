import Vue from 'vue'
import Storage from '../../storage'

export default function (departmentId, key) {
    return Vue.axios.post(Storage.url(),{
        "ApiType": "MateriaRequisitionApiController",
        "Parameters": [
            {
                "Value": departmentId
            },
            {
                "Value": key
            },
            {
                "Value": ''
            },
            {
                "Value": ''
            },
        ],
        "Method": "GetTargetWarehouse",
        "Context": {
            "Ticket": Storage.ticket(),
            "InvOrgId": Storage.orgid()
        }
    })
}