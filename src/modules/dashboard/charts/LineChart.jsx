import "../../styles/charts/linechart.css";

export default function LineChart({ data }) {
  const max = Math.max(...data);

  return (
    <div className="linechart-container">

      <svg viewBox="0 0 300 120" className="linechart-svg">

        {/* Polyline */}
        <polyline
          fill="none"
          stroke="var(--primary-color)"
          strokeWidth="3"
          points={data
            .map((val, i) => {
              const x = (i / (data.length - 1)) * 300;
              const y = 120 - (val / max) * 100;
              return `${x},${y}`;
            })
            .join(" ")}
        />

        {/* Circles */}
        {data.map((val, i) => {
          const x = (i / (data.length - 1)) * 300;
          const y = 120 - (val / max) * 100;
          return <circle key={i} cx={x} cy={y} r="4" className="chart-dot" />;
        })}
      </svg>

    </div>
  );
}
