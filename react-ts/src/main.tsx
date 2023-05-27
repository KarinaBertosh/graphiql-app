import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { ApolloProvider, SuspenseCache } from "@apollo/client";
import client from "./apollo/client";
import firebase from "firebase/compat/app";
import { firebaseConfig } from "./firebaseConfig/farebaseConfig";
import "./localization/i18next";
import { routerObj } from "./router/RouterConfig";

import "./main.scss";

const suspenseCache = new SuspenseCache();

firebase.initializeApp(firebaseConfig);

const router = createHashRouter(routerObj);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client} suspenseCache={suspenseCache}>
      <Suspense fallback="...loading">
        <RouterProvider router={router} />
      </Suspense>
    </ApolloProvider>
  </React.StrictMode>
);
