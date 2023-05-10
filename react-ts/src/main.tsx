import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import firebase from "firebase/compat/app";
import { firebaseConfig } from "./firebaseConfig/farebaseConfig";
import "./main.scss";
import "./addTailwind.css";

import { routerObj } from "./router/RouterConfig";

firebase.initializeApp(firebaseConfig);
const router = createBrowserRouter(routerObj);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
