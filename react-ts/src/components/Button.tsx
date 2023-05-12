import { ButtonProps } from "../interfaces/componentsInterfaces";
import './style.scss';

export const Button = ({ buttonText, buttonAction }: ButtonProps) => {
  return (
    <button
      className={
        "border active:shadow-inner py-2 px-4 rounded hover:bg-slate-100"
      }
      onClick={buttonAction}
    >
      {buttonText}
    </button>
  );
};
