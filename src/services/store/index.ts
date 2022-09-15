import { combineReducers, applyMiddleware, compose } from 'redux';
import orderReducer from './orderSlice';
import ingredientsReducer from './ingredientsSlice';
import constructorReducer from './constructorSlice';
import { wsReducer } from './wsReducer';
import { wsReducerLocal } from './wsReducerLocal';
import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import { socketMiddleware } from '../middleware/socketMiddleware';
import { TWSAction } from '../action-types';
import { TWSActions } from '../../types';

import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_GET_MESSAGE_LOCAL,
} from '../action-types';


export const rootReducer = combineReducers({
  order: orderReducer,
  burgerIngredients: ingredientsReducer,
  burgerСonstructor: constructorReducer,
  orders: wsReducer,
  ordersLocal: wsReducerLocal

});
const wsActions: TWSActions = {
  wsInit: WS_CONNECTION_START,
  wsClose: WS_CONNECTION_CLOSE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};


const wsActionsLocal: TWSActions = {
  wsInit: WS_CONNECTION_START,
  wsClose: WS_CONNECTION_CLOSE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE_LOCAL
};


export const enhancer = compose(applyMiddleware(thunkMiddleware, socketMiddleware(wsActions), socketMiddleware(wsActionsLocal)));

export const store = configureStore({
  reducer: rootReducer,
  enhancers: [enhancer],
});

export type RootState = ReturnType<typeof store.getState>;
type TApplicationActions = TWSAction;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>;

export type AppDispatch = typeof store.dispatch;//ThunkDispatch<RootState, uknown, TApplicationActions>;