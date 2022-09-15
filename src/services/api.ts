import { getCookie, setCookie, deleteCookie } from '../utils/cookie';
import { TRes, TEmailOnly, TEmail, TName, TPassword } from '../types';
const URL = 'https://norma.nomoreparties.space/api';
export const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
export const wsUrlLocal = 'wss://norma.nomoreparties.space/orders';



const checkResponse = <T>(res: Response): Promise<T> => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredients = (): Promise<TRes> => {
    return fetch(`${URL}/ingredients`)
        .then(res => checkResponse<TRes>(res));
}

export const postOrders = (ingredients: Array<string>): Promise<TRes> => {

    const requestHeaders: HeadersInit = new Headers();
    const _token = getCookie('accessToken')
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set('Authorization', _token === undefined ? '' : _token);
    return fetch(`${URL}/orders`, {
        headers: requestHeaders,
        method: "POST",
        body: JSON.stringify({ ingredients: ingredients })
    })
        .then(res => checkResponse<TRes>(res));

}


const refreshToken = (): Promise<TRes> => {

    return fetch(`${URL}/auth/token`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ token: localStorage.getItem("refreshToken") })
    })
        .then(res => checkResponse<TRes>(res));

}

export const fetchWithRefresh = async (url: string, options: RequestInit): Promise<TRes> => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);

    } catch (err: any) {

        if (err.message === 'jwt expired' || err.status === 403) {
            const refreshData = await refreshToken();
            if (!refreshData.success) {
                Promise.reject(refreshData);
            }
            if (refreshData.refreshToken)
                localStorage.setItem("refreshToken", refreshData.refreshToken);
            if (refreshData.accessToken)
                setCookie("accessToken", refreshData.accessToken);

            const requestHeaders: HeadersInit = new Headers(options.headers);
            requestHeaders.set('Authorization', refreshData.accessToken === undefined ? '' : refreshData.accessToken);
            options.headers = requestHeaders;
            const res = await fetch(url,
                {
                    ...options,
                    headers: {
                        ...options.headers,
                        Authorization: refreshData.accessToken
                    }

                });
            return checkResponse(res);
        } else {
            return Promise.reject(err);
        }


    }
}

export const passwordResetRequest = ({ email }: TEmailOnly): Promise<TRes> => {

    return fetch(`${URL}/password-reset`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ email: email })
    })
        .then(res => checkResponse<TRes>(res));

}

export const resetRequest = ({ password, token }: TPassword): Promise<TRes> => {

    return fetch(`${URL}/password-reset/reset`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ password: password, token: token })
    })
        .then(res => checkResponse<TRes>(res));

}

export const registerRequest = ({ email, password, name }: TName): Promise<TRes> => {

    return fetch(`${URL}/auth/register`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ email: email, password: password, name: name })
    })
        .then(res => checkResponse<TRes>(res));

}



export const token = (): Promise<Response> => {

    return fetch(`${URL}/auth/token`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ token: localStorage.getItem("refreshToken") })
    })
        .then(res => checkResponse<Response>(res));

}

export const logoutRequest = (): Promise<TRes> => {

    return fetch(`${URL}/auth/logout`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ token: localStorage.getItem("refreshToken") })
    })
        .then(res => checkResponse<TRes>(res))
        .then(res => {
            if (res.success) {
                localStorage.setItem("refreshToken", '');
                deleteCookie("accessToken");
            } return res;
        });

}



export const loginRequest = ({ email, password }: TEmail): Promise<TRes> => {

    return fetch(`${URL}/auth/login`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ email: email, password: password })
    })
        .then(res => checkResponse<TRes>(res));

}


export const getUserRequest = async (): Promise<TRes> => {
    const requestHeaders: HeadersInit = new Headers();
    const _token = getCookie('accessToken')
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set('Authorization', _token === undefined ? '' : _token);
    return await fetchWithRefresh(`${URL}/auth/user`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: requestHeaders,
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    })
};