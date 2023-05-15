import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import firebase from "firebase/compat/app";
import { firebaseConfig } from "./firebaseConfig/farebaseConfig";
import "./localization/i18next";
import "./main.scss";
import { routerObj } from "./router/RouterConfig";
import { ApolloProvider } from "@apollo/client";
import  client  from "./apollo/client";

firebase.initializeApp(firebaseConfig);
const router = createBrowserRouter(routerObj);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Suspense fallback="...loading">
        <RouterProvider router={router} />
      </Suspense>
    </ApolloProvider>
  </React.StrictMode>
);
