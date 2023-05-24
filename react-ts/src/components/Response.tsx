import { useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";

export const Response = ({ addData }: { addData: DocumentNode }) => {
  const { loading, error, data } = useQuery(addData);

  const replaceText = (key: any, value: any) => {
    if (key === "__typename") {
      return undefined;
    } else {
      return value;
    }
  };

  const getData = () => {
    try {
      if (loading) {
        return "Loading ...";
      }
      if (error) {
        return (
          <div style={{ whiteSpace: "normal" }}>
            Error: {JSON.stringify(error.message)}
          </div>
        );
      }
      return JSON.stringify(data, replaceText, "\t");
    } catch (errors) {
      return JSON.stringify(errors);
    }
  };

  return (
    <div className="response"
      placeholder="received code"
      style={{ whiteSpace: "pre" }}
    >{getData()}</div>
  );
};
