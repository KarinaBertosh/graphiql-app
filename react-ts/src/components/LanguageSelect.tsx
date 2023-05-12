import { Button } from "./Button";
import { locales } from "../localization/locales";
import i18n from "../localization/i18next";
import "./LanguageSelect.scss";

export const LanguageSelect = () => {
  return (
    <ul className="lgselect-list">
      {Object.keys(locales).map((locale) => (
        <li key={locale}>
          <Button
            buttonText={locales[locale as keyof typeof locales].title}
            buttonAction={() => i18n.changeLanguage(locale)}
          />
        </li>
      ))}
    </ul>
  );
};
