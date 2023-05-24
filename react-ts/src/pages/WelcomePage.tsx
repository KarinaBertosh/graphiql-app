import graphql from "../assets/graphql.svg";
import "./style.scss";
import { useTranslation } from "react-i18next";

export const WelcomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="pages ">
      <div className="description">
        <img src={graphql} alt="graphql" className="description__img" />
        <div className="description__title">
          {t("welcome_page.description_title")}
          <br />
          <strong> {t("welcome_page.languages")} </strong>{" "}
          {t("welcome_page.languages_list")} <br />
          <strong>{t("welcome_page.appeared")}</strong> {t("welcome_page.date")}{" "}
          <br />
          <strong>{t("welcome_page.developer")} </strong>{" "}
          {t("welcome_page.FB")}
        </div>
      </div>
    </div>
  );
};
