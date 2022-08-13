
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



const enhancer = compose(applyMiddleware(thunkMiddleware));

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
