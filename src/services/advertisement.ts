import request from "@/utils/request";

export async function queryAdviolations(params: any) {
    return request.get('/api/ad_violation', {params: params})
}

export async function addAdviolation(params: any) {
    return request.post('/api/ad_violation', {data: params})
}

export async function modAdviolation(params: any) {
    return request.put('/api/ad_violation/xasdasda', {data: params})
}
