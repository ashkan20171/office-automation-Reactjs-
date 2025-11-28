import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../../styles/pages/attendance-summary.css";

export default function AttendanceSummary() {
  const { t } = useTranslation();

  const [summary, setSummary] = useState({});
  const [today, setToday] = useState("");

  useEffect(() => {
    const todayDate = new Date().toISOString().split("T")[0];
    setToday(todayDate);

    const saved = localStorage.getItem("attendance_history");
    if (saved) {
      setSummary(JSON.parse(saved));
    }
  }, []);

  const getDuration = (dayData) => {
    if (!dayData?.in || !dayData?.out) return t("not_complete");

    const [hin, min, sin] = dayData.in.split(":").map(Number);
    const [hout, mout, sout] = dayData.out.split(":").map(Number);

    const start = hin * 3600 + min * 60 + sin;
    const end = hout * 3600 + mout * 60 + sout;

    let diff = end - start;
    if (diff < 0) diff = 0;

    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);

    return `${h}h ${m}m`;
  };

  return (
    <div className="summary-container">

      <h2 className="summary-title">{t("attendance_summary")}</h2>

      <div className="summary-today">
        <h3>{t("today")}</h3>

        {summary[today] ? (
          <div className="summary-box">
            <p>{t("check_in")}: <strong>{summary[today].in || "-"}</strong></p>
            <p>{t("check_out")}: <strong>{summary[today].out || "-"}</strong></p>
            <p>{t("duration")}: <strong>{getDuration(summary[today])}</strong></p>
          </div>
        ) : (
          <p className="no-data">{t("no_data_today")}</p>
        )}
      </div>

      <h3 className="recent-title">{t("last_7_days")}</h3>

      <div className="recent-list">
        {Object.entries(summary)
          .sort((a, b) => (a[0] < b[0] ? 1 : -1))
          .slice(0, 7)
          .map(([date, data]) => (
            <div key={date} className="day-item">
              <span className="day-date">{date}</span>
              <span className="day-status">
                {data.in ? t("present") : t("absent")}
              </span>
              <span className="day-duration">{getDuration(data)}</span>
            </div>
          ))}
      </div>

    </div>
  );
}
