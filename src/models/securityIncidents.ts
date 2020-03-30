import {Effect, Reducer} from "umi";
import {querySecurity} from "@/pages/SecurityIncidents/service";

export interface SecurityIncidentsModelState {
    securityIncidents: SecurityIncidentsModel
}
export interface SecurityIncident {

}
export interface SecurityIncidentsModel {
    securityList: []
}
export interface SecurityIncidentsType {
    namespace:'securityIncident';
    effects: {
        querySecurity: Effect
    }
    reducers:{
        saveSecurityIncidents: Reducer<SecurityIncidentsModelState>
    }
}
const SecurityIncidentsModel:SecurityIncidentsType = {
    namespace: 'securityIncident',
    effects: {
        *querySecurity({payload},{put,call}){
            const response = yield call(querySecurity, payload);
            console.log(response)
        }
    },
    reducers:{
        saveSecurityIncidents(state,{payload}){
            return {
                ...state,
                ...payload
            }
        }
    }

};
