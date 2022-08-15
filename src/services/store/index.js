import { combineReducers } from 'redux';
import orderReducer from './orderSlice';
import ingredientsReducer from './ingredientsSlice';
import constructorReducer from './constructorSlice';
import { wsReducer } from './wsReducer';


export const rootReducer = combineReducers({
  order: orderReducer,
  burgerIngredients: ingredientsReducer,
  burgerСonstructor: constructorReducer,
  orders: wsReducer

});