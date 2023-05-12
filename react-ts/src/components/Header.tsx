import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Button } from "./Button";
import { AuthContext } from "../context/AuthProvider";
import { LanguageSelect } from "./LanguageSelect";
import { useTranslation } from "react-i18next";

export const Header = () => {
  
  const { isWelcomePage, setIsWelcomePage } = useContext(AuthContext);
  const router = useNavigate();
  const { t } = useTranslation();

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
      <Button buttonText={t("sign_in")} buttonAction={goToAuthPage} />
      
      <Button buttonText={t("sign_up")} buttonAction={goToAuthPage} />
      <LanguageSelect />
    </div>
  ) : (
    <div className="header">
      <Button buttonText={"Back to welcome page"} buttonAction={goToWelcomePage} />
      <LanguageSelect />
    </div>
  );
};
