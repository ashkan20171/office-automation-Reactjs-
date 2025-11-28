import "../../styles/components/today-attendance.css";
import { useTranslation } from "react-i18next";

export default function TodayAttendance({ data }) {
  const { t } = useTranslation();

  const getStatus = () => {
    if (!data) return "absent";
    if (data.in && !data.out) return "incomplete";
    if (data.in && data.out) return "present";
    return "absent";
  };

  const getDuration = () => {
    if (!data?.in || !data?.out) return t("not_complete");

    const [hin, min, sin] = data.in.split(":").map(Number);
    const [hout, mout, sout] = data.out.split(":").map(Number);

    const start = hin * 3600 + min * 60 + sin;
    const end = hout * 3600 + mout * 60 + sout;

    let diff = end - start;
    if (diff < 0) diff = 0;

    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);

    return `${h}h ${m}m`;
  };

  const status = getStatus();

  return (
    <div className={`ta-card ${status}`}>

      <h3 className="ta-title">{t("today_attendance")}</h3>

      <div className="ta-row">
        <span>{t("check_in")}:</span>
        <strong>{data?.in || "-"}</strong>
      </div>

      <div className="ta-row">
        <span>{t("check_out")}:</span>
        <strong>{data?.out || "-"}</strong>
      </div>

      <div className="ta-row">
        <span>{t("duration")}:</span>
        <strong>{getDuration()}</strong>
      </div>

      <div className={`ta-status-box ${status}`}>
        {status === "present" && t("present")}
        {status === "incomplete" && t("incomplete")}
        {status === "absent" && t("absent")}
      </div>

    </div>
  );
}
