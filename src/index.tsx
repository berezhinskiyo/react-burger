
import React from "react";
import ReactDOM from "react-dom/client";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './services/store/index';
import thunkMiddleware from 'redux-thunk'
import { applyMiddleware, compose } from 'redux'



const enhancer = compose(applyMiddleware(thunkMiddleware));

const store = configureStore({
  reducer: rootReducer,
  enhancers: [enhancer],
}) ;  

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
