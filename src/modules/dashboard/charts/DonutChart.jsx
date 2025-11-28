import "../../styles/charts/donutchart.css";

export default function DonutChart({ percent }) {
  const dash = (percent * 440) / 100;

  return (
    <div className="donut-container">
      <svg width="160" height="160">
        <circle className="donut-bg" cx="80" cy="80" r="70" />
        <circle
          className="donut-fill"
          cx="80"
          cy="80"
          r="70"
          style={{ strokeDasharray: `${dash} 440` }}
        />
      </svg>

      <div className="donut-text">
        {percent}%
      </div>
    </div>
  );
}
