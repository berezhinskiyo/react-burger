import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  TWSAction
} from '../action-types';
import {TWSInitialState} from '../../utils/data'
 
const initialState : TWSInitialState = {
  wsConnected: false,
  orders: [],
  totalToday: 0,
  total: 0
};

export const wsReducer = (state : TWSInitialState = initialState, action : TWSAction) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        totalToday: action.payload.totalToday,
        total: action.payload.total,
      };


    default:
      return state;
  }
};