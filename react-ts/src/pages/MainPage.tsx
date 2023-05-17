import { useState } from "react";
import { gql } from "@apollo/client";
import doc from "../assets/doc.png";
import start from "../assets/start.png";
import { Response } from "../components/Response";

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

  const [request, setRequest] = useState(gql`
    ${defaultValue}
  `);
  const [addData, setAddData] = useState(defaultValue);
  const [isOpenDocumentation, setIsOpenDocumentation] = useState(false);
  const [ifRequest, setIfRequest] = useState(false);
  const [error, setError] = useState("");

  const openDocumentation = () => {
    setIsOpenDocumentation(!isOpenDocumentation);
  };

  const getData = () => {
    try {
      const requestGql = gql`
        ${addData}
      `;
      setError("");
      setIfRequest(true);
      setRequest(requestGql);
      return;
    } catch (errors) {
      setError(JSON.stringify(errors));
    }
  };

  return (
    <main className="pages main-page">
      <div onClick={openDocumentation} className="documentation">
        <img src={doc} className="documentation__button" />
        {isOpenDocumentation ? <div>Documentation</div> : ""}
      </div>
      <div className="redactor">
        <textarea
          id="addData"
          placeholder="Code"
          value={addData}
          onChange={(e) => setAddData(e.target.value)}
        ></textarea>
        <textarea placeholder="Variables"></textarea>
        <img
          src={start}
          className="documentation__button__start"
          onClick={getData}
        />
      </div>
      {ifRequest && !error && <Response addData={request} />}
      {error && <div>{error}</div>}
    </main>
  );
};
