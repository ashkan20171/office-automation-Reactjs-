import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLang = () => {
    const newLang = i18n.language === "en" ? "fa" : "en";
    i18n.changeLanguage(newLang);

    document.documentElement.setAttribute(
      "dir",
      newLang === "fa" ? "rtl" : "ltr"
    );
  };

  return (
    <button onClick={toggleLang}>
      {i18n.language === "en" ? "FA" : "EN"}
    </button>
  );
}
