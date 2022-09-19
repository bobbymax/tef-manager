/* eslint-disable comma-dangle */
/* eslint-disable quotes */
import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import { ContextProvider } from "./contexts/ContextProvider";
import { store } from "./app/store";

ReactDOM.render(
  <Provider store={store}>
    <ContextProvider>
      <Router>
        <App />
      </Router>
    </ContextProvider>
  </Provider>,
  document.getElementById("root")
);
