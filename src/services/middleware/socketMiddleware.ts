import { TWSActions } from '../../types';
import { Middleware, MiddlewareAPI } from 'redux'
import { AppDispatch, RootState } from '../store'




export const socketMiddleware = (wsActions: TWSActions): Middleware => {


  return (store: MiddlewareAPI<AppDispatch, RootState>) => {

    let socket: WebSocket | null = null;
    return (next) => (action) => {

      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsClose, onOpen, onClose, onError, onMessage } = wsActions;


      if (type === wsInit && payload) {
        socket = new WebSocket(`${payload}`);
      } else if (type === wsClose) {
        socket!.close(1000, 'regular close')
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };


      }

      next(action);
    };
  };
};