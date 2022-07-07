import { getIngredients, postOrders } from '../api'
export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const CONSTRUCTOR_DELETE = 'CONSTRUCTOR_DELETE';
export const CONSTRUCTOR_MOVE = 'CONSTRUCTOR_MOVE';
export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';





export function getItems() {
  return function (dispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST
    });
    getIngredients().then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ITEMS_SUCCESS,
          items: res.data
        });
      } else {
        dispatch({
          type: GET_ITEMS_FAILED
        });
      }
    })
      .catch((err) => {
        dispatch({
          type: GET_ITEMS_FAILED,
          payload: err,
        });
      });;
  };
}
export const orderBurger = (orderData) => (dispatch) => {
  dispatch({
    type: CREATE_ORDER_REQUEST,
  });
  postOrders(orderData).then((res) => {
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: res,
    });
  })
    .catch((err) => {
      dispatch({
        type: CREATE_ORDER_FAILED,
        payload: err,
      });
    });
};