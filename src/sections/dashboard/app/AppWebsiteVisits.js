import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
import { Card, CardHeader, Box } from "@mui/material";
import { BaseOptionChart } from "../../../components/charts";
import { useEffect, useState } from "react";

export default function AppWebsiteVisits({ infoChart }) {
  const [thisInfoChart, setThisInfoChart] = useState({ levelRecords: [] });

  const chartInitOptions = merge(BaseOptionChart(), {
    stroke: { width: [2] },
    plotOptions: { bar: { columnWidth: "11%", borderRadius: 4 } },
    fill: { type: ["solid"] },
    labels: [],
    xaxis: { type: "datetime" },
    yaxis: {
      min: 0,
      max: 1.5,
      forceNiceScale: false,
      tickAmount: 3,
      labels: {
        formatter: function (val) {
          let label = "";
          if (val === 1) label = "✔";
          if (val === 0) label = "✖";
          return label;
        },
        style: { fontSize: "20px" },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== "undefined") {
            return `${y === 1 ? "Completado" : "No completado"}`;
          }
          return y;
        },
      },
    },
  });

  const [chartData, setChartData] = useState({
    name: "Avance del niño",
    type: "line",
    data: [],
  });

  const [chartOptions, setChartOptions] = useState(chartInitOptions);
  const [thisTitle, setThisTitle] = useState("");

  const initInfoChart = () => {
    setThisInfoChart(infoChart);
  };

  const initData = () => {
    const data = [];
    const labels = [];
    if (thisInfoChart) {
      thisInfoChart.levelRecords.forEach((element) => {
        data.push(element.successful === true ? 1 : 0);
        labels.push(element.date);
      });
      setChartData({ chartData, data: data });
      setChartOptions({ chartOptions, labels: labels });
      setThisTitle(thisInfoChart.description);
    }
  };

  useEffect(() => {
    initInfoChart();
    initData();
    // eslint-disable-next-line
  }, [infoChart, thisInfoChart]);

  return (
    <Card>
      <CardHeader title={thisTitle} subheader="Resultados por fecha" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart
          type="line"
          series={[chartData]}
          options={chartOptions}
          height={200}
        />
      </Box>
    </Card>
  );
}
