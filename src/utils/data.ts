import { TIngredient, TIngredientShort, TOrder, IDictionary } from '../types';


export const bun = 'bun';
export const sauce = 'sauce';
export const main = 'main';



export const convertIdsToImages = (ingredients: Array<TIngredient>, orderIngredients: Array<string>): Array<TIngredientShort> => {

    return orderIngredients.map((id) => {
        const ing = ingredients.find((i) => i._id === id);
        return { id: id, image: ing?.image, price: ing?.price, name: ing?.name };
    });

}
export const calcTotal = (ingredients: Array<TIngredientShort>): number => {
    return ingredients.reduce((sum: number, a: TIngredientShort) => sum + (a.price === undefined ? 0 : a.price), 0);
}

export const uniqueIngredients = (ingredients: Array<TIngredientShort>): Array<TIngredientShort> => {
    return ingredients.filter((v, i, arr) => arr.findIndex((item) => item.id === v.id) === i);

}
export type TIngredientCount = {
    item: TIngredientShort;
    count: number;
}
export const uniqueIngredientsWithCount = (ingredients: Array<TIngredientShort>): Array<TIngredientCount> => {
    const res = ingredients.filter((v, i, arr) => arr.findIndex((item) => item.id === v.id) === i);
    return res.map(i => {
        const count = ingredients.filter(i1 => i1.id === i.id).length;
        return { item: i, count: count }
    });
}

export const getReady = (orders: Array<TOrder>): Array<TOrder> => {
    return orders.filter((item) => item.status === 'done');
}
export const getUnReady = (orders: Array<TOrder>): Array<TOrder> => {
    return orders.filter((item) => item.status !== 'done');
}
export const getStateName = (status: string): string => {
    return status !== 'done' ? 'Готово»' : 'В работе';
}


export const convertDate = (date?: string): string => {
    const now = new Date();
    const trueDate = date === undefined ? new Date() : new Date(date);
    let day = '';
    const difference: number = Math.abs(now.valueOf() - trueDate.valueOf());
    const days = Math.round(difference / (1000 * 3600 * 24))

    if (days === 0) day = "Сегодня";
    else if (days === 1) day = "Вчера";
    else if (days >= 2 && days <= 4) day = `${days} дня назад`;
    else day = `${days} дня назад`;

    return `${day}, ${trueDate.getHours()}:${trueDate.getMinutes()} i-GMT${trueDate.getTimezoneOffset() < 0 ? '+' : '-'}${Math.abs(trueDate.getTimezoneOffset()) / 60}`;
}

export type TConstructorCount = {
    item: TIngredient;
    count: number;
}

export const getIngredients = (counter: IDictionary<number>) => {
    const result = [];
    for (const [key, value] of Object.entries(counter)) {
        for (let i = 0; i < value; i++)
            result.push(key)
    }
    return result;
}
export type TWSInitialState = {
    wsConnected: boolean;
    orders: Array<TOrder>;
    totalToday: number;
    total: number;
}

export type TWSInitialStateLocal = TWSInitialState & { ordersLocal: Array<TOrder> };

