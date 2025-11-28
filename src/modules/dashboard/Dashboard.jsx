import "../../styles/pages/dashboard.css";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import LineChart from "./charts/LineChart";
import BarChart from "./charts/BarChart";
import DonutChart from "./charts/DonutChart";
import LatestActivity from "./components/LatestActivity";
import TodayAttendance from "./components/TodayAttendance";


export default function Dashboard() {
  const { t } = useTranslation();

  const [todayAttendance, setTodayAttendance] = useState(null);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [unreadLetters, setUnreadLetters] = useState(0);
  const [todayActivity, setTodayActivity] = useState(0);
  const [activities, setActivities] = useState([]);
  const defaultWidgets = [
  "kpi-attendance",
  "kpi-tasks",
  "kpi-letters",
  "kpi-activity",
  "chart-line",
  "chart-bar",
  "chart-donut",
  "latest-activity",
  "today-attendance"
];

const [widgets, setWidgets] = useState([]);

  setActivities([
  { type: "login", text: t("checked_in"), time: "08:34" },
  { type: "letter", text: t("new_letter_received"), time: "09:10" },
  { type: "task", text: t("task_completed"), time: "10:22" },
  { type: "logout", text: t("checked_out"), time: "16:41" }
]);

const dragItem = useRef();
const dragOverItem = useRef();

const handleDragStart = (id) => {
  dragItem.current = id;
};

const handleDragEnter = (id) => {
  dragOverItem.current = id;
};

const handleDrop = () => {
  const items = [...widgets];

  const dragIndex = items.indexOf(dragItem.current);
  const dropIndex = items.indexOf(dragOverItem.current);

  const temp = items[dragIndex];
  items[dragIndex] = items[dropIndex];
  items[dropIndex] = temp;

  setWidgets(items);
  localStorage.setItem("dashboard_layout", JSON.stringify(items));

  dragItem.current = null;
  dragOverItem.current = null;
};
const renderWidget = (id) => {
  switch (id) {
    case "kpi-attendance":
      return <div className="dashboard-card"><TodayAttendance data={todayAttendance} /></div>;

    case "kpi-tasks":
      return <div className="dashboard-card kpi-card">
        <p className="kpi-title">{t("pending_tasks")}</p>
        <h3 className="kpi-value">{pendingTasks}</h3>
      </div>;

    case "kpi-letters":
      return <div className="dashboard-card kpi-card">
        <p className="kpi-title">{t("unread_letters")}</p>
        <h3 className="kpi-value">{unreadLetters}</h3>
      </div>;

    case "kpi-activity":
      return <div className="dashboard-card kpi-card">
        <p className="kpi-title">{t("today_activity")}</p>
        <h3 className="kpi-value">{todayActivity}</h3>
      </div>;

    case "chart-line":
      return <div className="dashboard-card">
        <h3>{t("activity_week")}</h3>
        <LineChart data={[5, 3, 8, 4, 6, 10, 7]} />
      </div>;

    case "chart-bar":
      return <div className="dashboard-card">
        <h3>{t("letters_this_week")}</h3>
        <BarChart data={[2, 5, 4, 7, 3, 6, 8]} />
      </div>;

    case "chart-donut":
      return <div className="dashboard-card">
        <h3>{t("tasks_completion")}</h3>
        <DonutChart percent={72} />
      </div>;

    case "latest-activity":
      return <div className="dashboard-card">
        <LatestActivity activities={activities} />
      </div>;

    case "today-attendance":
      return <div className="dashboard-card">
        <TodayAttendance data={todayAttendance} />
      </div>;

    default:
      return null;
  }
};

 useEffect(() => {
  const savedLayout = localStorage.getItem("dashboard_layout");

  if (savedLayout) {
    setWidgets(JSON.parse(savedLayout));
  } else {
    setWidgets(defaultWidgets);
  }


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

<div className="dashboard-card">
  <TodayAttendance data={todayAttendance} />
</div>

<div className="dashboard-grid">
  {widgets.map((id) => (
    <div
      key={id}
      className="draggable-widget"
      draggable
      onDragStart={() => handleDragStart(id)}
      onDragEnter={() => handleDragEnter(id)}
      onDragEnd={handleDrop}
    >
      {renderWidget(id)}
    </div>
  ))}
</div>
<button
  className="reset-layout-btn"
  onClick={() => {
    localStorage.removeItem("dashboard_layout");
    setWidgets(defaultWidgets);
  }}
>
  {t("reset_layout")}
</button>

      </div>

    </div>
  );
}
