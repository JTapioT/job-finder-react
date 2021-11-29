import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {Provider} from "react-redux";
import configureStore, {persistor} from "./store/index.js"
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
<Provider store={configureStore}>
  <PersistGate persistor={persistor}>
  <App />
  </PersistGate>
</Provider>
,document.getElementById('root')
);
