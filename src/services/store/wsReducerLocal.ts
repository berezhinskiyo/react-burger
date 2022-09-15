import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
  WS_GET_MESSAGE_LOCAL,
  TWSAction,
  
} from '../action-types';
import {TWSInitialStateLocal} from '../../utils/data'
import { TOrder } from '../../types';


const initialState:TWSInitialStateLocal = {
  wsConnected: false,
  orders: [],
  ordersLocal: [],
  totalToday: 0,
  total: 0
};

export const wsReducerLocal = (state : TWSInitialStateLocal = initialState, action:TWSAction) => {
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

    case WS_GET_MESSAGE_LOCAL:
      return {
        ...state,
        ordersLocal: action.payload.orders,
        totalToday: action.payload.totalToday,
        total: action.payload.total,
      };


    default:
      return state;
  }
};