import { GraphQLSchema } from "graphql";
import { TypeItem } from "./TypeItem";

export const SchemaTree = ({ schema }: { schema: GraphQLSchema }) => {
  const typeMap = schema.getTypeMap();
  console.log(typeMap);
  return (
    <TypeItem
      currType={typeMap["Query"].name}
      typeMap={typeMap}
      description={String(typeMap["Query"].description)}
    />
  );
};
