import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import exportStore from "./redux/store";
import { setupAxios } from "./axios/axios";

const { store } = exportStore;
const root = ReactDOM.createRoot(document.getElementById('root'));
setupAxios(store);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
