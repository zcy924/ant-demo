import request from "@/utils/request";

export async function queryAdviolations(params: any) {
    return request.get('/api/ad_violation', {params: params})
}

export async function addOrModAdviolation(params: any) {
    return request.post('/api/ad_violation', {data: params})
}
