import "../../styles/pages/dashboard.css";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <div className="dashboard-container">

      <h2 className="dashboard-title">{t("dashboard")}</h2>

      <div className="dashboard-grid">

        <div className="dashboard-card placeholder">
          {t("loading_widget")}
        </div>

        <div className="dashboard-card placeholder">
          {t("loading_widget")}
        </div>

        <div className="dashboard-card placeholder">
          {t("loading_widget")}
        </div>

        <div className="dashboard-card placeholder">
          {t("loading_widget")}
        </div>

      </div>

    </div>
  );
}
