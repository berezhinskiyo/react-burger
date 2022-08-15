

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

export const uniqueIngredientsWithCount = (ingredients) => {
    const res = ingredients.filter((v, i, arr) => arr.findIndex((item) => item.id === v.id) === i);
    return res.map(i => {
        const count = ingredients.filter(i1 => i1.id === i.id).length;
        return { item: i, count: count }
    });
}
export const getReady = (ingredients) => {
    return ingredients.filter((item) => item.status === 'done');
}
export const getUnReady = (ingredients) => {
    return ingredients.filter((item) => item.status !== 'done');
}
export const getStateName = (status) => {
    return status !== 'done' ? 'Готово»' : 'В работе';
}


export const convertDate = (date) => {
    const now = new Date();
    const trueDate = new Date(date);
    let day = '';
    const difference = Math.abs(now - trueDate);
    const days = Math.round(difference / (1000 * 3600 * 24))

    if (days === 0) day = "Сегодня";
    else if (days === 1) day = "Вчера";
    else if (days >= 2 && days <= 4) day = `${days} дня назад`;
    else day = `${days} дня назад`;

    return `${day}, ${trueDate.getHours()}:${trueDate.getMinutes()} i-GMT${trueDate.getTimezoneOffset() < 0 ? '+' : '-'}${Math.abs(trueDate.getTimezoneOffset()) / 60}`;
}

