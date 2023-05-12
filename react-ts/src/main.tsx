import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import firebase from "firebase/compat/app";
import { firebaseConfig } from "./firebaseConfig/farebaseConfig";
import "./localization/i18next";
import "./main.scss";
import "./addTailwind.css";
import { routerObj } from "./router/RouterConfig";

firebase.initializeApp(firebaseConfig);
const router = createBrowserRouter(routerObj);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback="...loading">
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);
