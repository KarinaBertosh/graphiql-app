import { useState } from "react";
import { gql } from "@apollo/client";
import start from "../assets/start.png";
import { Response } from "../components/Response";
import { Schema } from "../components/Schema";

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
  const [ifRequest, setIfRequest] = useState(false);
  const [error, setError] = useState("");

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
      <Schema />
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
