import { useState } from "react";
import { gql } from "@apollo/client";
import start from "../assets/start.png";
import { Response } from "../components/Response";
import { Schema } from "../components/Schema";
import { Modal } from "../components/Modal";
import doc from "../assets/doc.png";
import { Button } from "../components/Button";

export const MainPage = () => {
  const defaultValue = `query MyQuery($id: ID!) {
    character(id: $id) {
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
  	characters {
      info {
        count
      }
    }
  }`;

  const defaultVar = `{
    "id": 1
  }`;

  const [request, setRequest] = useState(gql`
    ${defaultValue}
  `);
  const [addData, setAddData] = useState(defaultValue);
  const [addVar, setAddVar] = useState(defaultVar);
  const [variablesStr, setVariablesStr] = useState(defaultVar);
  const [ifRequest, setIfRequest] = useState(false);
  const [error, setError] = useState("");
  const [errorSyntax, setErrorSyntax] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenDocumentation, setIsOpenDocumentation] = useState(false);
  const [isOpenVariables, setIsOpenVariables] = useState(true);

  const getData = () => {
    try {
      const requestGql = gql`
        ${addData}
      `;
      setError("");
      setIfRequest(true);
      setRequest(requestGql);
      setVariablesStr(addVar);
      return;
    } catch (errors) {
      setErrorSyntax(JSON.stringify(errors));
      setIsOpenModal(!isOpenModal);
    }
  };

  const setActive = () => {
    setErrorSyntax("");
    setIsOpenModal(!isOpenModal);
  };

  return (
    <main className="pages main-page">
      <div className="documentation">
        <img
          src={doc}
          className="documentation__button"
          onClick={() => setIsOpenDocumentation(!isOpenDocumentation)}
        />
      </div>
      <div className="request-part flex-grow">
        <Schema isOpenDocumentation={isOpenDocumentation} />
        <div className="redactor flex-grow">
          <textarea
            id="addData"
            placeholder="Code"
            value={addData}
            onChange={(e) => setAddData(e.target.value)}
          ></textarea>
          <Button
            buttonText={"Variables"}
            buttonAction={() => {
              setIsOpenVariables(!isOpenVariables);
            }}
          ></Button>

          {isOpenVariables && (
            <textarea
              id="addVar"
              placeholder="Variables"
              value={addVar}
              onChange={(e) => setAddVar(e.target.value)}
            ></textarea>
          )}
          <img
            src={start}
            className="documentation__button__start"
            onClick={getData}
          />
        </div>
        <div className="flex-grow">
          {ifRequest && !error && (
            <Response addData={request} variablesStr={variablesStr} />
          )}
          {error && <div className="response">{error}</div>}
        </div>
      </div>
      {errorSyntax && (
        <Modal error={errorSyntax} active={isOpenModal} setActive={setActive} />
      )}
    </main>
  );
};
