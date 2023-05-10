import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { UserLoginData } from "../interfaces/databaseInterfaces";
import { AuthForm } from "../components/AuthComponents/AuthForm";
import { Button } from "../components/Button";

export const AuthPage = () => {
  const [authData, setAuthData] = useState<UserLoginData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const { loginUser, registerUser, ifLoginExist, setIfLoginExist } =
    useContext(AuthContext);

  const handleChange = ({
    target: { value, id },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setAuthData({
      ...authData,
      [id]: value,
    });
  };

  const submitHandler = (event: React.FormEvent) => {
    setError("");
    event.preventDefault();
    if (authData.email && authData.password) {
      const res = ifLoginExist ? loginUser(authData) : registerUser(authData);
      setError(res);
    }
  };

  return (
    <div className={"w-full grow"}>
      <div
        className={
          "w-[500px] p-5 rounded bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border"
        }
      >
        <div className="text-center">
          {!ifLoginExist && (
            <>
              <h3>Already registered?</h3>
              <Button
                buttonText={"Login"}
                buttonAction={() => setIfLoginExist(true)}
              />
            </>
          )}
          {ifLoginExist && (
            <>
              <h3>Not registered?</h3>
              <Button
                buttonText={"Register"}
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
