import { combineReducers } from 'redux';
import {
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  ADD_INGREDIENT,
  CONSTRUCTOR_DELETE,
  CONSTRUCTOR_MOVE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_FAILED,
  CREATE_ORDER_SUCCESS
} from '../actions/index';
import { bun, sauce, main } from '../../utils/data';

const initialState = {
  ingredients: [],
  buns: [],
  sauces: [],
  mains: [],
  constructorBun: null,
  constructorOthers: [],
  orderRequest: true,
  orderFailed: false,
  order: 0,
  ingredient: null,
  itemsRequest: true,
  itemsFailed: false,
  counter: new Map()
}




export const burgerIngredientsReducer = (state = initialState, action) => {

  switch (action.type) {
    case CREATE_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      };
    }
    case CREATE_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false,
        order: 0
      };
    }
    case CREATE_ORDER_SUCCESS: {

      return {
        ...state,
        orderFailed: false,
        order: action.payload.order.number,
        orderRequest: false
      };
    }

    case CONSTRUCTOR_DELETE: {

      return {
        ...state,
        constructorOthers: state.constructorOthers.filter((item, index) => index !== action.index),
      };
    }
    case CONSTRUCTOR_MOVE: {

      var element = state.constructorOthers[action.dragIndex];
      var arr = state.constructorOthers.filter((item, index) => index !== action.dragIndex);
      arr.splice(action.hoverIndex, 0, element);

      return {
        ...state,
        constructorOthers: arr
      };
    }
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true
      };
    }
    case GET_ITEMS_SUCCESS: {

      return {
        ...state,
        itemsFailed: false,
        buns: action.items.filter(item => item.type === bun),
        sauces: action.items.filter(item => item.type === sauce),
        mains: action.items.filter(item => item.type === main),
        itemsRequest: false
      };
    }
    case GET_ITEMS_FAILED: {
      return { ...state, itemsFailed: true, itemsRequest: false };
    }
    case ADD_INGREDIENT: {
      if (action.ingredient.type === bun) {
        if (state.constructorBun) state.counter.set(state.constructorBun._id, 0);
        state.counter.set(action.ingredient._id, 2);

        return {
          ...state,
          constructorBun: action.ingredient,
        };
      } else {
        if (!state.constructorOthers.find((item) => item._id === action.ingredient._id)) {
          state.counter.set(action.ingredient._id, 1);
        } else {
          state.counter.set(action.ingredient._id, state.counter.get(action.ingredient._id) + 1);
        }
        return {
          ...state,
          constructorOthers: [...state.constructorOthers, action.ingredient],
          counter: state.counter
        }
      }

    }
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  ingredients: burgerIngredientsReducer,
});