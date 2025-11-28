import { useTranslation } from "react-i18next";
import "../../styles/components/latest-activity.css";

export default function LatestActivity({ activities }) {
  const { t } = useTranslation();

  return (
    <div className="activity-container">
      <h3 className="activity-title">{t("latest_activity")}</h3>

      {activities.length === 0 && (
        <p className="activity-empty">{t("no_activity")}</p>
      )}

      <div className="activity-list">
        {activities.map((item, index) => (
          <div key={index} className="activity-item">
            <div className={`activity-icon ${item.type}`}></div>

            <div className="activity-content">
              <p className="activity-text">{item.text}</p>
              <p className="activity-time">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
