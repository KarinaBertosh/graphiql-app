import { useState } from "react";
import doc from "../assets/doc.png";
import { useQuery, gql } from "@apollo/client";
import start from "../assets/start.png";

export const MainPage = () => {
  const defaultValue = `query MyQuery {
    character(id: "2") {
      origin {
        id
      }
      location {
        id
      }
      episode {
        id
      }
    }
  }`;
  const DEFAULT_DATA = gql`
    ${defaultValue}
  `;

  const [addData, setAddData] = useState(DEFAULT_DATA);
  const [isOpenDocumentation, setIsOpenDocumentation] = useState(false);
  const openDocumentation = () => {
    setIsOpenDocumentation(!isOpenDocumentation);
  };

  const GET_DATA = gql`
    ${addData}
  `;

  function getDate() {
    try {
      const { loading, error, data } = useQuery(GET_DATA);
      if (loading) return `Loading ...`;
      if (error) return `Error: ${JSON.stringify(error.message)}`;
      return data;
    } catch (errors) {
      console.error(errors);
    }
  }

  const sendData = () => {
    const value = document.getElementById("addData")!.value;
    console.log("value", value);
    setAddData(value);
  };

  return (
    <div className="pages main-page">
      <div onClick={openDocumentation} className="documentation">
        <img src={doc} className="documentation__button" />
        {isOpenDocumentation ? <div>Documentation</div> : ""}
      </div>
      <div className="redactor">
        <textarea
          id="addData"
          placeholder="Code"
          defaultValue={defaultValue}
        ></textarea>
        <textarea placeholder="Variables"></textarea>
        <img
          src={start}
          className="documentation__button__start"
          onClick={sendData}
        />
      </div>
      <textarea
        placeholder="received code"
        value={JSON.stringify(getDate())}
      ></textarea>
    </div>
  );
};
