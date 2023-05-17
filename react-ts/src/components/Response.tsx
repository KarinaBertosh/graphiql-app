import { useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";

export const Response = ({ addData }: { addData: DocumentNode }) => {
  const { loading, error, data } = useQuery(addData);

  const getData = () => {
    try {
      if (loading) {
        return "Loading ...";
      }
      if (error) {
        return `Error: ${JSON.stringify(error.message)}`;
      }
      return JSON.stringify(data);
    } catch (errors) {
      console.error(errors);
      return JSON.stringify(errors);
    }
  };

  //   useEffect(() => {
  //     getData();
  //   }, [addData]);

  return <div placeholder="received code">{getData()}</div>;
};
