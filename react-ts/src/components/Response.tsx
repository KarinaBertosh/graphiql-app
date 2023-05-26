import { useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
import { useTranslation } from "react-i18next";

export const Response = ({ addData }: { addData: DocumentNode }) => {
  const { loading, error, data } = useQuery(addData);
  const { t } = useTranslation();

  const replaceText = (key: string | object, value: string | object) => {
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
