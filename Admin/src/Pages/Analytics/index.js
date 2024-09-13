import "./Analytics.css";
import AnalyticInDay from "../../Components/Analytics/AnalyticInDay";
import AnalyticsRevenue from "../../Components/Analytics/AnalyticRevenue";
import AnalyticItems from "../../Components/Analytics/AnalyticItems";
import Chart from "chart.js/auto";

function Analytics() {
  return (
    <div>
      <AnalyticInDay />
      <AnalyticsRevenue />
      <AnalyticItems />
    </div>
  );
}

export default Analytics;
