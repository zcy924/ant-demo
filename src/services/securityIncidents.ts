import request from "@/utils/request";
export interface ParamsType {
    current: number;
    pageSize: number;

    [key: string]: string | number;
}

export async function querySecurityIncidents(params: ParamsType) {
    return request.get('/api/security', {params:params})
}

export async function addSecurityIncident(params:any) {
    return request.post('/api/security', {data:params})
}

export async function modSecurityIncident(params:any) {
    return request.put('/api/security',{data:params})
}

export async function delSecurityIncident(id:string) {
    return request.delete(`/api/security/${id}`)
}

