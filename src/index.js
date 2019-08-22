import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "redux-starter-kit";

import "./styles.css";
import "antd/dist/antd.css";
import App from "./App";
import rootReducer from "./store";

const store = configureStore({
  reducer: rootReducer
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  rootElement
);
