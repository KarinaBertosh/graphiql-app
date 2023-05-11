import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Button } from "./Button";
import { AuthContext } from "../context/AuthProvider";

export const Header = () => {
  const { isWelcomePage } = useContext(AuthContext);
  const { setIsWelcomePage } = useContext(AuthContext);
  const router = useNavigate();

  const goToAuthPAge = () => {
    router("/auth");
    setIsWelcomePage(!isWelcomePage);
  };

  const goToWelcomePAge = () => {
    router("/");
    setIsWelcomePage(!isWelcomePage);
  };

  return isWelcomePage ? (
    <div className="header">
      <Button buttonText={"Sing In"} buttonAction={goToAuthPAge} />
      <Button buttonText={"Sing Up"} buttonAction={goToAuthPAge} />
    </div>
  ) : (
    <div className="header">
      <Button buttonText={"Back to welcome page"} buttonAction={goToWelcomePAge} />
    </div>
  );
};
