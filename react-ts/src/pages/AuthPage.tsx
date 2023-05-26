import React, { useContext, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";
import { UserLoginData } from "../interfaces/databaseInterfaces";
import { AuthForm } from "../components/AuthForm";
import { Button } from "../components/Button";
import { ILoginFormValues } from "../interfaces/componentsInterfaces";
import { useTranslation } from "react-i18next";

export const AuthPage = () => {
  const [authData, setAuthData] = useState<UserLoginData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const { loginUser, registerUser, ifLoginExist, setIfLoginExist } =
    useContext(AuthContext);
  const { t } = useTranslation();

  const handleChange = ({
    target: { value, id },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setAuthData({
      ...authData,
      [id]: value,
    });
  };

  const submitHandler: SubmitHandler<ILoginFormValues> = () => {
    setError("");
    if (authData.email && authData.password) {
      const res = ifLoginExist ? loginUser(authData) : registerUser(authData);
      setError(res);
    }
  };

  return (
    <div className="auth">
      <div className="auth__form">
        <div className="form__title">
          {!ifLoginExist && (
            <>
              <h3>{t("already_registered")}</h3>
              <Button
                buttonText={t("login")}
                buttonAction={() => setIfLoginExist(true)}
              />
            </>
          )}
          {ifLoginExist && (
            <>
              <h3>{t("not_registered")}</h3>
              <Button
                buttonText={t("register")}
                buttonAction={() => setIfLoginExist(false)}
              />
            </>
          )}
        </div>
        <AuthForm
          submitHandler={submitHandler}
          handleChange={handleChange}
          authData={authData}
          error={error}
        />
      </div>
    </div>
  );
};
