import { useContext, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserLoginData } from "../interfaces/databaseInterfaces";
import { ErrorMessage } from "./ErrorMessage";
import { AuthContext } from "../context/AuthProvider";
import { ILoginFormValues } from "../interfaces/componentsInterfaces";

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
  const { ifLoginExist } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ILoginFormValues>({
    reValidateMode: "onSubmit",
  });

  useEffect(() => {
    reset();
  }, [ifLoginExist]);

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="p-5 my-5">
      <h3>
        {ifLoginExist && "Login with your email and password"}
        {!ifLoginExist && "Register new user"}
      </h3>
      <input
        type="email"
        id="login"
        className="border py-2 px-4 mb-2 w-full outline-0"
        placeholder="Enter login"
        {...register("login", {
          required: "required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Entered value does not match email format",
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
        className="border py-2 px-4 mb-2 w-full outline-0"
        placeholder="Enter password"
        {...register("password", {
          required: "required",
          minLength: {
            value: 8,
            message: "min length is 8",
          },
          maxLength: {
            value: 12,
            message: "max length is 12",
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
          className="border py-2 px-4 mb-2 w-full outline-0"
          placeholder="Repeat your password"
          {...register("passwordRepeat", {
            required: "required",
            validate: (val) => {
              if (watch("password") != val) {
                return "Your passwords do no match";
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

      <button
        className="py-2 px-4 border active:shadow-inner py-2 px-4 rounded hover:bg-slate-100"
        type="submit"
      >
        {ifLoginExist && "Login"}
        {!ifLoginExist && "Register"}
      </button>
    </form>
  );
};
