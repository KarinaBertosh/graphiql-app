import "./style.scss";
import rsslogo from "../assets/rs_school_js.svg";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="footer">
      <div className="github">
        <a href="https://github.com/Elina-nep">{t("Elina")}</a>
        <a href="https://github.com/makhitr">{t("Marina")}</a>
        <a href="https://github.com/KarinaBertosh">{t("Karina")}</a>
      </div>
      <div className="footer__logo-container">
        <a className="footer__rsslogo" href="https://rs.school/react/">
          <img src={rsslogo} alt="rss logo" />
        </a>
        <p>2023</p>
      </div>
    </div>
  );
};
