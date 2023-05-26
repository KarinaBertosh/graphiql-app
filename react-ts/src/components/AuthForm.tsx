import { useContext, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserLoginData } from "../interfaces/databaseInterfaces";
import { ErrorMessage } from "./ErrorMessage";
import { AuthContext } from "../context/AuthProvider";
import { ILoginFormValues } from "../interfaces/componentsInterfaces";
import { useTranslation } from "react-i18next";
import i18n from "../localization/i18next";

interface AuthFormProps {
  submitHandler: SubmitHandler<ILoginFormValues>;
  handleChange: ({
    target: { value, id },
  }: React.ChangeEvent<HTMLInputElement>) => void;
  authData: UserLoginData;
  error: string;
}

export const AuthForm = ({
  submitHandler,
  handleChange,
  authData,
  error,
}: AuthFormProps) => {
  const { t } = useTranslation();
  const { ifLoginExist } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = useForm<ILoginFormValues>({
    reValidateMode: "onSubmit",
  });

  useEffect(() => {
    reset();
  }, [ifLoginExist]);

  useEffect(() => {
    (errors.login || errors.password) && trigger();
  }, [i18n.language]);

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="form">
      <p>
        {ifLoginExist && t("form.login")}
        {!ifLoginExist && t("form.register")}
      </p>
      <input
        type="email"
        id="email"
        className="form__input"
        placeholder={t("form.login_placeholder")!}
        {...register("login", {
          required: t("form.email_required") as string,
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: t("form.email_error"),
          },
        })}
        aria-invalid={errors.login ? "true" : "false"}
        value={authData.email}
        onChange={handleChange}
      />
      {errors.login && <ErrorMessage error={String(errors.login.message)} />}
      <input
        type="password"
        id="password"
        className="form__input"
        placeholder={t("form.password_placeholder")!}
        {...register("password", {
          required: t("form.password_required") as string,
          pattern: {
            value: /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            message: t("form.password_error"),
          },
        })}
        aria-invalid={errors.password ? "true" : "false"}
        onChange={handleChange}
      />
      {errors.password && (
        <ErrorMessage error={String(errors.password.message)} />
      )}
      {!ifLoginExist && (
        <input
          type="password"
          id="passwordRepeat"
          className="form__input"
          placeholder={t("form.password_repeat_placeholder")!}
          {...register("passwordRepeat", {
            required: t("form.password_required") as string,
            validate: (val) => {
              if (watch("password") != val) {
                return t("form.password_repeat_error")!;
              }
            },
          })}
          aria-invalid={errors.passwordRepeat ? "true" : "false"}
          onChange={handleChange}
        />
      )}
      {errors.passwordRepeat && (
        <ErrorMessage error={String(errors.passwordRepeat.message)} />
      )}
      {error && <ErrorMessage error={error} />}

      <button type="submit">
        {ifLoginExist && "Login"}
        {!ifLoginExist && "Register"}
      </button>
    </form>
  );
};
