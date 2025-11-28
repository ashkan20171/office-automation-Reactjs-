import { useTranslation } from "react-i18next";
import "../../styles/pages/login.css";


export default function Login() {
  const { t } = useTranslation();

  return (
    <div className="login-container">
      <div className="login-card">

        <h2 className="login-title">{t("app_name")}</h2>

        <form className="login-form">
          <label>{t("email")}</label>
          <input type="email" />

          <label>{t("password")}</label>
          <input type="password" />

          <button type="submit" className="login-btn">
            {t("login")}
          </button>
        </form>
      </div>
    </div>
  );
}
