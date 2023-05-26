import { useTranslation } from "react-i18next";

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return <div className="pages">{t("404_page")}</div>;
};
