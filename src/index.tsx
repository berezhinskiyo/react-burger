
import React from "react";
import ReactDOM from "react-dom/client";
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './services/store/index';
import thunkMiddleware from 'redux-thunk'
import { applyMiddleware, compose } from 'redux'
import { BrowserRouter } from "react-router-dom";




import { socketMiddleware } from './services/middleware/socketMiddleware';

import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_GET_MESSAGE_LOCAL,
} from './services/action-types';

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
const wsUrlLocal = 'wss://norma.nomoreparties.space/orders/all';

const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};


const wsActionsLocal = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE_LOCAL
};


const enhancer =  compose(applyMiddleware(thunkMiddleware,socketMiddleware(wsUrl,wsActions),socketMiddleware(wsUrlLocal,wsActionsLocal))) ;

const store = configureStore({
  reducer: rootReducer,
  enhancers: [enhancer],
}) ;  

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
       <App />
       </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
