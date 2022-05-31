import Vue from 'vue'
import Storage from '../../storage'

export default function (key) {
    return Vue.axios.post(Storage.url(), {
        "ApiType": "MateriaRequisitionApiController",
        "Parameters": [
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
        "Method": "GetBomDepartments",
        "Context": {
            "Ticket": Storage.ticket(),
            "InvOrgId": Storage.orgid()
        }
    })
}