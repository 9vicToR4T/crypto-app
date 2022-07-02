import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "antd/dist/antd.css";
import store from "./app/store";
import { Provider } from "react-redux";

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
