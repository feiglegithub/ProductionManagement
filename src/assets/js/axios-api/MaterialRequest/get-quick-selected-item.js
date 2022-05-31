import Vue from 'vue'
import Storage from '../../storage'

export default function () {
    return Vue.axios.post(Storage.url(), {
        "ApiType": "MateriaRequisitionApiController",
        "Parameters": [
        ],
        "Method": "GetQuickSelectedItem",
        "Context": {
            "Ticket": Storage.ticket(),
            "InvOrgId": Storage.orgid()
        }
    });
}