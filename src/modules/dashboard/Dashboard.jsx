import "../../styles/pages/dashboard.css";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import LineChart from "./charts/LineChart";
import BarChart from "./charts/BarChart";
import DonutChart from "./charts/DonutChart";
import LatestActivity from "./components/LatestActivity";


export default function Dashboard() {
  const { t } = useTranslation();

  const [todayAttendance, setTodayAttendance] = useState(null);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [unreadLetters, setUnreadLetters] = useState(0);
  const [todayActivity, setTodayActivity] = useState(0);
  const [activities, setActivities] = useState([]);

  setActivities([
  { type: "login", text: t("checked_in"), time: "08:34" },
  { type: "letter", text: t("new_letter_received"), time: "09:10" },
  { type: "task", text: t("task_completed"), time: "10:22" },
  { type: "logout", text: t("checked_out"), time: "16:41" }
]);


  useEffect(() => {
    // Load attendance
    const today = new Date().toISOString().split("T")[0];
    const history = JSON.parse(localStorage.getItem("attendance_history") || "{}");
    setTodayAttendance(history[today] || null);

    // Fake temporary data (later from backend)
    setPendingTasks(4);
    setUnreadLetters(2);
    setTodayActivity(7);

  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">{t("dashboard")}</h2>

      <div className="dashboard-grid">

        <div className="dashboard-card kpi-card">
          <p className="kpi-title">{t("attendance_today")}</p>
          <h3 className="kpi-value">
            {todayAttendance
              ? todayAttendance.in
                ? todayAttendance.out
                  ? t("checked_out")
                  : t("checked_in")
                : t("absent")
              : t("absent")}
          </h3>
        </div>

        <div className="dashboard-card">
  <h3>{t("activity_week")}</h3>
  <LineChart data={[5, 3, 8, 4, 6, 10, 7]} />
</div>

<div className="dashboard-card">
  <h3>{t("letters_this_week")}</h3>
  <BarChart data={[2, 5, 4, 7, 3, 6, 8]} />
</div>

<div className="dashboard-card">
  <h3>{t("tasks_completion")}</h3>
  <DonutChart percent={72} />
</div>

<div className="dashboard-card">
  <LatestActivity activities={activities} />
</div>

      </div>

    </div>
  );
}
