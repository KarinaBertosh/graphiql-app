import { useState } from "react";
import doc from "../assets/doc.png";
import start from "../assets/start.png";

export const MainPage = () => {
  const [isOpenDocumentation, setIsOpenDocumentation] = useState(false);
  const openDocumentation = () => {
    setIsOpenDocumentation(!isOpenDocumentation);
  };

  return (
    <div className="pages main-page">
      <div onClick={openDocumentation} className="documentation">
        <img src={doc} className="documentation__button" />
        {isOpenDocumentation ? <div>Documentation</div> : ""}
      </div>
      <div className="redactor">
        <textarea placeholder="Code"></textarea>
        <textarea placeholder="Variables"></textarea>
        <img src={start} className="documentation__button__start" />
      </div>
      <textarea placeholder="received code"></textarea>
    </div>
  );
};
