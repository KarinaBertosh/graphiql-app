import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Button } from "./Button";
import { AuthContext } from "../context/AuthProvider";

export const Header = () => {
  const { isWelcomePage, setIsWelcomePage, setIfLoginExist } =
    useContext(AuthContext);
  const router = useNavigate();

  const goToAuthPage = () => {
    router("/auth");
    setIsWelcomePage(!isWelcomePage);
  };

  const goToWelcomePage = () => {
    router("/");
    setIsWelcomePage(!isWelcomePage);
  };

  return isWelcomePage ? (
    <div className="header">
      <Button
        buttonText={"Sing In"}
        buttonAction={() => {
          goToAuthPage();
          setIfLoginExist(true);
        }}
      />
      <Button
        buttonText={"Sing Up"}
        buttonAction={() => {
          goToAuthPage();
          setIfLoginExist(false);
        }}
      />
    </div>
  ) : (
    <div className="header">
      <Button
        buttonText={"Back to welcome page"}
        buttonAction={goToWelcomePage}
      />
    </div>
  );
};
