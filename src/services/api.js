import { getCookie, setCookie, deleteCookie } from '../utils/cookie';
const URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => res.ok ? res.json() : Promise.reject(res);


export const getIngredients = () => {
    return fetch(`${URL}/ingredients`)
        .then(checkResponse);
}

export const postOrders = (ingredients) => {

    return fetch(`${URL}/orders`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ ingredients: ingredients })
    })
        .then(checkResponse);

}


const refreshToken = () => {

    return fetch(`${URL}/auth/token`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ token: localStorage.getItem("refreshToken") })
    })
        .then(checkResponse);

}
export const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);

    } catch (err) {
        if (err.message === 'jwt expired' || err.status === 403) {
            const refreshData = await refreshToken();
            if (!refreshData.success) {
                Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            setCookie("accessToken", refreshData.accessToken);
            options.headers.Authorization = refreshData.accessToken;
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

export const passwordResetRequest = (email) => {

    return fetch(`${URL}/password-reset`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ email: email })
    })
        .then(checkResponse);

}

export const resetRequest = ({ password, token }) => {

    return fetch(`${URL}/password-reset/reset`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ password: password, token: token })
    })
        .then(checkResponse);

}


export const registerRequest = (email, password, name) => {

    return fetch(`${URL}/auth/register`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ email: email, password: password, name: name })
    })
        .then(checkResponse);

}



export const token = () => {

    return fetch(`${URL}/auth/token`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ token: localStorage.getItem("refreshToken") })
    })
        .then(checkResponse);

}

export const logoutRequest = () => {

    return fetch(`${URL}/auth/logout`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ token: localStorage.getItem("refreshToken") })
    })
        .then(checkResponse)
        .then(res => {
            if (res.success) {
                localStorage.setItem("refreshToken", null);
                deleteCookie("accessToken");
            } return res;
        });

}




export const loginRequest = ({ email, password }) => {

    return fetch(`${URL}/auth/login`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ email: email, password: password })
    })
        .then(checkResponse);

}


export const getUserRequest = async () =>
    await fetchWithRefresh(`${URL}/auth/user`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: getCookie('accessToken')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    });