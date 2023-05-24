import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { GraphQLSchema, buildClientSchema } from "graphql";
import { SCHEMA } from "../apollo/schema";
import { TypeItem } from "./TypeItem";

export const Schema = ({
  isOpenDocumentation,
}: {
  isOpenDocumentation: boolean;
}) => {
  const { loading, error, data } = useQuery(gql`
    ${SCHEMA}
  `);

  const [ifSchema, setIfSchema] = useState(false);

  const [schema, setSchema] = useState<GraphQLSchema | null>(null);

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
    <>
      {ifSchema && schema && (
        <TypeItem schema={schema} isOpenDocumentation={isOpenDocumentation} />
      )}
    </>
  );
};
