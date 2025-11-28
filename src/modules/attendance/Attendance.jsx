import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import "../../styles/pages/attendance.css";

export default function Attendance() {
  const { t } = useTranslation();

  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [status, setStatus] = useState("not_checked_in");

  const [liveTime, setLiveTime] = useState("");
  const [today, setToday] = useState("");
  

  // Load saved data
  useEffect(() => {
    const savedIn = localStorage.getItem("attendance_checkin");
    const savedOut = localStorage.getItem("attendance_checkout");

    if (savedIn) {
      setCheckInTime(savedIn);
      setStatus("checked_in");
    }

    if (savedOut) {
      setCheckOutTime(savedOut);
      setStatus("checked_out");
    }
  }, []);

  // Live Clock + Date
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setLiveTime(now.toLocaleTimeString());
      setToday(now.toLocaleDateString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCheckIn = () => {
    const time = new Date().toLocaleTimeString();
    setCheckInTime(time);
    localStorage.setItem("attendance_checkin", time);
    setStatus("checked_in");
    // Save in history
const todayDate = new Date().toISOString().split("T")[0];
const currentHistory = JSON.parse(localStorage.getItem("attendance_history") || "{}");
currentHistory[todayDate] = { ...currentHistory[todayDate], in: time };
localStorage.setItem("attendance_history", JSON.stringify(currentHistory));
  };

  const handleCheckOut = () => {
    const time = new Date().toLocaleTimeString();
    setCheckOutTime(time);
    localStorage.setItem("attendance_checkout", time);
    setStatus("checked_out");
    const todayDate = new Date().toISOString().split("T")[0];
const currentHistory = JSON.parse(localStorage.getItem("attendance_history") || "{}");
currentHistory[todayDate] = { ...currentHistory[todayDate], out: time };
localStorage.setItem("attendance_history", JSON.stringify(currentHistory));

  };

  return (
    <div className="attendance-container">

      <h2 className="attendance-title">{t("attendance")}</h2>

      {/* Live time block */}
      <div className="attendance-info">
        <div className="info-item">
          <p>{t("current_time")}</p>
          <span>{liveTime}</span>
        </div>

        <div className="info-item">
          <p>{t("today_date")}</p>
          <span>{today}</span>
        </div>
      </div>

      <div className="attendance-card">

        {/* Status Box */}
        <div className="attendance-status-box">
          {status === "not_checked_in" && (
            <p className="status">{t("not_checked_in")}</p>
          )}
          {status === "checked_in" && (
            <p className="status checked">{t("checked_in_at")} {checkInTime}</p>
          )}
          {status === "checked_out" && (
            <p className="status checked">{t("checked_out_at")} {checkOutTime}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="attendance-buttons">
          <button className="btn checkin" onClick={handleCheckIn} disabled={status !== "not_checked_in"}>
            {t("check_in")}
          </button>

          <button className="btn checkout" onClick={handleCheckOut} disabled={status !== "checked_in"}>
            {t("check_out")}
          </button>
        </div>
      </div>
    </div>
  );
}
