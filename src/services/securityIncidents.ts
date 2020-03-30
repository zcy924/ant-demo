import request from "@/utils/request";
export interface ParamsType {
    current: number;
    pageSize: number;

    [key: string]: string | number;
}

export async function querySecurityIncidents(params: ParamsType) {
    return request.get('/security_incident', {params:params})
}

export async function addSecurityIncident(params:any) {
    return request.post('/security_incident', {data:params})
}

export async function modSecurityIncident(params:any) {
    return request.put('/security_incident',{data:params})
}

export async function delSecurityIncident(id:string) {
    return request.delete(`/security_incident/${id}`)
}

