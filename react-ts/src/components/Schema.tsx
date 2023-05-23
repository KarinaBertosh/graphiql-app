import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { SCHEMA } from "../apollo/schema";
import doc from "../assets/doc.png";

export const Schema = () => {
  const { loading, error, data } = useQuery(gql`
    ${SCHEMA}
  `);

  const [ifSchema, setIfSchema] = useState(false);
  const [isOpenDocumentation, setIsOpenDocumentation] = useState(false);
  const [schema, setSchema] = useState("");

  const openDocumentation = () => {
    setIsOpenDocumentation(!isOpenDocumentation);
  };

  const getSchema = () => {
    if (loading) {
      setIfSchema(false);
      return "Loading ...";
    }
    if (error) {
      setIfSchema(false);
      return `Error: ${JSON.stringify(error.message)}`;
    }
    setIfSchema(true);
    return JSON.stringify(data);
  };
  useEffect(() => setSchema(getSchema()));
  return (
    <div onClick={openDocumentation} className="documentation">
      <img src={doc} className="documentation__button" />
      {isOpenDocumentation && ifSchema && (
        <div placeholder="received code">{schema}</div>
      )}
    </div>
  );
};
