import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export const ProtectedRoute = ({ needAuth }: { needAuth: boolean }) => {
  const { ifAuth } = useContext(AuthContext);
  if (needAuth) {
    return (
      <>
        {!ifAuth && <Outlet />}
        {ifAuth && <Navigate to="/" />}
      </>
    );
  }
  return (
    <>
      {!ifAuth && <Navigate to="/auth" />}
      {ifAuth && <Outlet />}
    </>
  );
};
