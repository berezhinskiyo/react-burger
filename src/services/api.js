const URL = 'https://norma.nomoreparties.space/api';


const checkResponse = (res) => res.ok ? res.json() : Promise.reject(res);


export const getIngredients = () => {
    return fetch(`${URL}/ingredients`)
        .then(checkResponse);
}

export const postOrders = (ingredients) => {
    console.log(ingredients);
    return fetch(`${URL}/orders`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ ingredients: ingredients })
    })
        .then(checkResponse);

}