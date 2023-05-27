import graphql from "../assets/graphql.svg";
import { useTranslation } from "react-i18next";
import "./style.scss";

export const WelcomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="pages welcome-page">
      <h1 className="title">Graphql App</h1>
      <div className="description">
        <img src={graphql} alt="graphql" className="description__img" />
        <div className="description__title">
          <p>
            {t("welcome_page.description_title")}
            <a href="https://rs.school/react/"> {t("welcome_page.course")}</a> 
            {t("welcome_page.description_title_2")}
          </p>
          <p>
            {t("welcome_page.details")}
            <a href="https://github.com/Elina-nep/graphiql-app">
              {" "}
              {t("welcome_page.github")}.
            </a>
          </p>
        </div>
      </div>

      <h3>{t("welcome_page.about_authors")}</h3>
      <div className="description author-description">
        <div className="author">
          <h4>
            <a href="https://github.com/Elina-nep">{t("Elina")}</a>
          </h4>
          <p>
            <i>
              {t("welcome_page.team_leader")}, {t("welcome_page.developer")}
            </i>
          </p>
          <p>{t("welcome_page.elina_implemented")}</p>
        </div>
        <div className="author">
          <h4>
            <a href="https://github.com/makhitr">{t("Marina")}</a>
          </h4>
          <p>
            <i>{t("welcome_page.developer")}</i>
          </p>
          <p>{t("welcome_page.marina_implemented")}</p>
        </div>
        <div className="author">
          <h4>
            <a href="https://github.com/KarinaBertosh">{t("Karina")}</a>
          </h4>
          <p>
            <i>
              {t("welcome_page.developer")}, {t("welcome_page.designer")}
            </i>
          </p>
          <p>{t("welcome_page.karina_implemented")}</p>
        </div>
      </div>
    </div>
  );
};
