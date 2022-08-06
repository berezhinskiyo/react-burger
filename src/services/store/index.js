import { combineReducers } from 'redux';
import orderReducer from './orderSlice';
import ingredientsReducer from './ingredientsSlice';
import constructorReducer from './constructorSlice';
import loginReducer from './loginSlice';


export const rootReducer = combineReducers({
  order: orderReducer,
  burgerIngredients: ingredientsReducer,
  burgerСonstructor: constructorReducer,
  login: loginReducer

});