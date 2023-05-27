import { useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const Response = ({
  addData,
  variablesStr,
}: {
  addData: DocumentNode;
  variablesStr: string;
}) => {
  const [variables, setVariables] = useState({});
  const { t } = useTranslation();

  useEffect(() => {
    try {
      const varia = JSON.parse(variablesStr);
      setVariables(varia);
    } catch (errors) {
      setVariables({});
    }
  }, [variablesStr]);

  const { loading, error, data } = useQuery(addData, {
    variables: variables,
  });

  const replaceText = (key: string, value: string) => {

    if (key === "__typename") {
      return undefined;
    } else {
      return value;
    }
  };

  const getData = () => {
    try {
      if (loading) {
        return t("loading");
      }
      if (error) {
        return (
          <div style={{ whiteSpace: "normal" }}>
            {t("error")} {JSON.stringify(error.message)}
          </div>
        );
      }
      return JSON.stringify(data, replaceText, "\t");
    } catch (errors) {
      return JSON.stringify(errors);
    }
  };

  return (
    <div
      className="response"
      placeholder="received code"
      style={{ whiteSpace: "pre" }}
    >
      {getData()}
    </div>
  );
};
