import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import firebase from "firebase/compat/app";
import { firebaseConfig } from "./firebaseConfig/farebaseConfig";
import "./localization/i18next";
import { routerObj } from "./router/RouterConfig";
import { ApolloProvider, SuspenseCache } from "@apollo/client";
import client from "./apollo/client";
import "./main.scss";

const suspenseCache = new SuspenseCache();

firebase.initializeApp(firebaseConfig);
const router = createBrowserRouter(routerObj, {
  basename: "/graphiql-app/",
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client} suspenseCache={suspenseCache}>
      <Suspense fallback="...loading">
        <RouterProvider router={router} />
      </Suspense>
    </ApolloProvider>
  </React.StrictMode>
);
