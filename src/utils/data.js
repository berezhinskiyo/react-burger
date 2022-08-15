export const bun = 'bun';
export const sauce = 'sauce';
export const main = 'main';
export const convertIdsToImages = (ingredients, orderIngredients) => {

    const res = orderIngredients.map((id) => {
        const ing = ingredients.find((i) => i._id === id);
        return { id: id, image: ing?.image, price: ing?.price, name: ing?.name };
    });
    return res;
}
export const calcTotal = (ingredients) => {
    return ingredients.reduce((sum, a) => sum + a.price, 0);
}

export const uniqueIngredients = (ingredients) => {
    return ingredients.filter((v, i, arr) => arr.findIndex((item) => item.id === v.id) === i);

}
export const getReady = (ingredients) => {
    return ingredients.filter((item) => item.status === 'done');
}
export const getUnReady = (ingredients) => {
    return ingredients.filter((item) => item.status != 'done');
}


