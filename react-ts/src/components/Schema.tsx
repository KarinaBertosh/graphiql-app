import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { GraphQLSchema, buildClientSchema } from "graphql";
import { SCHEMA } from "../apollo/schema";
import doc from "../assets/doc.png";
import { TypeItem } from "./TypeItem";

export const Schema = () => {
  const { loading, error, data } = useQuery(gql`
    ${SCHEMA}
  `);

  const [ifSchema, setIfSchema] = useState(false);
  const [isOpenDocumentation, setIsOpenDocumentation] = useState(false);
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);

  const openDocumentation = () => {
    setIsOpenDocumentation(!isOpenDocumentation);
  };

  const getSchema = () => {
    if (loading) {
      setIfSchema(false);
      return null;
    }
    if (error) {
      setIfSchema(false);
      return null;
    }
    setIfSchema(true);
    return buildClientSchema(data);
  };

  useEffect(() => setSchema(getSchema()), [loading]);

  return (
    <div className="documentation">
      <img
        src={doc}
        className="documentation__button"
        onClick={openDocumentation}
      />
      {isOpenDocumentation && ifSchema && schema && (
        <TypeItem schema={schema} />
      )}
    </div>
  );
};
