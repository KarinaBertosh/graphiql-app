import { ButtonProps } from "../interfaces/componentsInterfaces";
import "./style.scss";

export const Button = ({ buttonText, buttonAction }: ButtonProps) => {
  return <button onClick={buttonAction}>{buttonText}</button>;
};
