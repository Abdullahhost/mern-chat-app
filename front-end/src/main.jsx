import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./settings/store/index.js";
import { SocketContextProvider } from "./context/socketContext.jsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <SocketContextProvider>
        <Toaster />
        <App />
      </SocketContextProvider>
    </React.StrictMode>
    ,
  </Provider>
);
