import React from "react";
import ReactDOM from "react-dom/client";
import firebase from "firebase/compat/app";
import { firebaseConfig } from "./firebaseConfig/farebaseConfig";
import App from "./App.tsx";
import "./index.css";

firebase.initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
