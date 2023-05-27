import { useEffect, useState, Suspense } from "react";
import { gql } from "@apollo/client";
import { GraphQLSchema, buildClientSchema, IntrospectionQuery } from "graphql";
import { SCHEMA } from "../apollo/schema";
import { TypeItem } from "./TypeItem";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

export const Schema = ({
  isOpenDocumentation,
}: {
  isOpenDocumentation: boolean;
}) => {
  const { error, data } = useSuspenseQuery(gql`
    ${SCHEMA}
  `);
  const [ifSchema, setIfSchema] = useState(false);
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);

  const getSchema = () => {
    if (error) {
      setIfSchema(false);
      return null;
    }
    setIfSchema(true);
    return buildClientSchema(data as IntrospectionQuery);
  };

  useEffect(() => setSchema(getSchema()), [data]);

  return (
    <>
      {ifSchema && schema && (
        <Suspense fallback="...loading">
          <TypeItem schema={schema} isOpenDocumentation={isOpenDocumentation} />
        </Suspense>
      )}
    </>
  );
};
