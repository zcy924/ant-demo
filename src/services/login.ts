import request from '@/utils/request';

export interface LoginParamsType {
    code: string;
    redirect_uri: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
    return request('/get_user_info', {
        method: 'POST',
        data: params,
    });
}

export async function getFakeCaptcha(mobile: string) {
    return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function login(params: LoginParamsType) {
    return request('/get_user_info', {
        method: 'POST',
        data: params
    })
}
