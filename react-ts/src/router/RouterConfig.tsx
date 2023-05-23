import { createRoutesFromElements, Route } from "react-router-dom";
import { NotFoundPage } from "../pages/NotFoundPage";
import { AuthPage } from "../pages/AuthPage";
import { MainPage } from "../pages/MainPage";
import { Layout } from "../pages/Layout";
import { WelcomePage } from "../pages/WelcomePage";
import { ProtectedRoute } from "./ProtectedRoute";
import { AuthLayout } from "./AuthLayout";

export const routerObj = createRoutesFromElements(
  <>
    <Route element={<AuthLayout />}>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route element={<ProtectedRoute needAuth={false} />}>
          <Route path="/main" element={<MainPage />} />
        </Route>
        <Route element={<ProtectedRoute needAuth={true} />}>
          <Route path="/auth" element={<AuthPage />} />
        </Route>
      </Route>
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </>
);
