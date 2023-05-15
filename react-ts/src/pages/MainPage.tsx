import { useState } from "react";
import doc from "../assets/doc.png";
import { useQuery, gql } from "@apollo/client";
import start from "../assets/start.png";

export const MainPage = () => {
  const DEFAULT_DATA = gql`
    query MyQuery {
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
    }
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
    const { loading, error, data } = useQuery(GET_DATA);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error </p>;
        return JSON.stringify(data);
  }

  const sendData = () => {
    const value = document.getElementById("addData")?.value;
    setAddData(value);
  };

  return (
    <div className="pages main-page">
      <div onClick={openDocumentation} className="documentation">
        <img src={doc} className="documentation__button" />
        {isOpenDocumentation ? <div>Documentation</div> : ""}
      </div>
      <div className="redactor">
        <input id="addData" placeholder="Code"></input>
        <input placeholder="Variables"></input>
        <img
          src={start}
          className="documentation__button__start"
          onClick={sendData}
        />
      </div>
      <input placeholder="received code" value={getDate()}></input>
    </div>
  );
};
