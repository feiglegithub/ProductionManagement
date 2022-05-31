import Vue from 'vue'
import Storage from '../../storage'

export default function (materiaRequisitionData) {
    return Vue.axios.post(Storage.url(),{
        "ApiType": "MateriaRequisitionApiController",
        "Parameters": [
            {
                "Value": materiaRequisitionData
            },
        ],
        "Method": "GenerateMateriaRquisition",
        "Context": {
            "Ticket": Storage.ticket(),
            "InvOrgId": Storage.orgid()
        }
    })
}