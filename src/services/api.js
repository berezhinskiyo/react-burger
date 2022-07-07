const URL = 'https://norma.nomoreparties.space/api';

export const getIngredients = (setData) => {
    return fetch(`${URL}/ingredients`)
        .then((response) =>  response.ok ? response.json() : Promise.reject(response))
        .then((response) => setData(response.data))
        .catch((err) => console.log(err));
}

export const postOrders = (ingredients) => {

    return fetch(`${URL}/orders`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ ingredients: ingredients })
    })
        .then((response) => response.ok ? response.json() : Promise.reject(response));

}