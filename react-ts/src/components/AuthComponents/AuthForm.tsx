import { useContext } from "react";
import { UserLoginData } from "../../interfaces/databaseInterfaces";
import { ErrorMessage } from "../ErrorMessage";
import { AuthContext } from "../../context/AuthProvider";

interface AuthFormProps {
  submitHandler: (event: React.FormEvent) => void;
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

  return (
    <form onSubmit={(e) => submitHandler(e)} className="p-5 my-5">
      <h3>
        {ifLoginExist && "Login with your email and password"}
        {!ifLoginExist && "Register new user"}
      </h3>
      <input
        type="email"
        id="email"
        className="border py-2 px-4 mb-2 w-full outline-0"
        placeholder="Enter login"
        value={authData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        id="password"
        className="border py-2 px-4 mb-2 w-full outline-0"
        placeholder="Enter password"
        onChange={handleChange}
      />
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
