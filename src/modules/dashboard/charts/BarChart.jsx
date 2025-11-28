import "../../styles/charts/barchart.css";

export default function BarChart({ data }) {
  const max = Math.max(...data);

  return (
    <div className="barchart-container">

      {data.map((val, i) => (
        <div className="bar-item" key={i}>
          <div
            className="bar"
            style={{ height: `${(val / max) * 100}%` }}
          ></div>
        </div>
      ))}

    </div>
  );
}
