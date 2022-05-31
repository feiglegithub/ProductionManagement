import Vue from 'vue'
import Storage from '../../storage'

export default function (inventoryCode, key, quickName, page) {
    return Vue.axios.post(Storage.url(), {
        "ApiType": "MateriaRequisitionApiController",
        "Parameters": [
            {
                "Value": inventoryCode
            },
            {
                "Value": key
            },
            {
                "Value": quickName
            },
            {
                "Value": 100
            },
            {
                "Value": page
            },
        ],
        "Method": "GetItems",
        "Context": {
            "Ticket": Storage.ticket(),
            "InvOrgId": Storage.orgid()
        }
    })
}