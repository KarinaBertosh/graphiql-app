import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Button } from "./Button";
import { AuthContext } from "../context/AuthProvider";
import { LanguageSelect } from "./LanguageSelect";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const { setIfLoginExist, user, logoutUser } = useContext(AuthContext);
  const router = useNavigate();
  const { t } = useTranslation();

  return (
    <header className="header">
      <nav>
        <Button
          buttonText={t("welcome")}
          buttonAction={() => {
            router("/");
          }}
        />
        <Button
          buttonText={t("main")}
          buttonAction={() => {
            router("/main");
          }}
        />
      </nav>
      <LanguageSelect />

      {!user && (
        <div>
          <Button
            buttonText={t("sign_in")}
            buttonAction={() => {
              router("/auth");
              setIfLoginExist(true);
            }}
          />
          <Button
            buttonText={t("sign_up")}
            buttonAction={() => {
              router("/auth");
              setIfLoginExist(false);
            }}
          />
        </div>
      )}
      {user && (
        <Button
          buttonText={t("log_out")}
          buttonAction={() => {
            logoutUser();
          }}
        />
      )}
    </header>
  );
};
