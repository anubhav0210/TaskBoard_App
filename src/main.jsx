
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import 'antd/dist/reset.css';
import './index.css'
import './styles/neumorphism.css'

// We wrap App with BrowserRouter to enable routing
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
