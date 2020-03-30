import request from "@/utils/request";

export async function queryAdviolations(params: any) {
    return request.get('/ads_account/records', {params: params})
}

export async function addAdviolation(params: any) {
    return request.post('/ads_account/record', {data: params})
}

export async function modAdviolation(params: any) {
    return request.put('/ads_account/record', {data: params})
}
