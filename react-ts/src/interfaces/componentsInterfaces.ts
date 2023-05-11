export interface ButtonProps {
  buttonText: string;
  buttonAction: () => void;
}

export interface ILoginFormValues {
  login: string | undefined;
  password: string | undefined;
  passwordRepeat: string | undefined;
}
