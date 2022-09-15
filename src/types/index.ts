import { v4 as uuidv4 } from 'uuid';
export type TOrderStoreState = {
    num: number;
    status?: string,
    error?: string,
}

export type TOrder = {
    ingredients?: Array<string>;
    _id: string;
    status: string;
    number?: number;
    createdAt?: string;
    updatedAt?: string;
    name?: string;
}

export type TIngredient = {
    __v: string;
    _id: string;
    id: TIngredient;
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    type: string;
}
export type TIngredientShort = {
    id: string;
    image?: string;
    name?: string;
    price?: number;

}
export type TRes = Response & {
    data?: Array<TIngredient>;
    success: boolean;
    accessToken?: string;
    refreshToken?: string;
    user: {name:string; email: string};
}
export type TEmailOnly = {
    email: string;
}

export type TEmail = TEmailOnly &{
    password: string;
}

export type TName = TEmail &{

    name: string
}
export type TPassword = {
    password: string;
    token: string;
}

export interface IDictionary<T> {
    [Key: string]: T;
}
export type TConstructorItem =
    {
        item: TIngredient;
        uuid: string;
    }
export type TWSActions = {
    wsInit: string;
    wsClose: string;
    onOpen: string;
    onClose: string;
    onError: string;
    onMessage: string;
}