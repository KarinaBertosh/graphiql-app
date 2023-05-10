import { ButtonProps } from "../interfaces/componentsInterfaces";

export const Button = ({ buttonText, buttonAction }: ButtonProps) => {
  return <button onClick={buttonAction}>{buttonText}</button>;
};
