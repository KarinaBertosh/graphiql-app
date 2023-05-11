import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export const Header = () => {
  const router = useNavigate();
  
  return (
    <div className="header">
      <Button buttonText={"Sing In"} buttonAction={() => router("/auth")} />
      <Button buttonText={"Sing Up"} buttonAction={() => router("/auth")} />
    </div>
  );
};
