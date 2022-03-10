import { Card, CardHeader } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { merge } from "lodash";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { BaseOptionChart } from "../../../components/charts";
import { fNumber } from "../../../utils/formatNumber";

const CHART_HEIGHT = 205;
const LEGEND_HEIGHT = 50;

const ChartWrapperStyle = styled("div")(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  "& .apexcharts-canvas svg": { height: CHART_HEIGHT },
  "& .apexcharts-canvas svg,.apexcharts-canvas foreignObject": {
    overflow: "visible",
  },
  "& .apexcharts-legend": {
    height: LEGEND_HEIGHT,
    alignContent: "center",
    position: "relative !important",
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

export default function AppCurrentVisits({ infoChart }) {
  const [chartData, setChartData] = useState([]);
  const [thisTitle, setThisTitle] = useState("");
  const theme = useTheme();

  const initData = () => {
    if (infoChart) {
      setChartData([infoChart.positiveResults, infoChart.negativeResults]);
      setThisTitle(infoChart.description);
    } else {
      setChartData([0, 0]);
    }
  };

  useEffect(() => {
    initData();
  }, [infoChart]);

  const chartOptions = merge(BaseOptionChart(), {
    colors: [theme.palette.primary.main, theme.palette.error.main],
    labels: ["Completado", "No completado"],
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: "center" },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } },
    },
  });

  return (
    <Card>
      <CardHeader title={thisTitle} subheader="Resultado por estado" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart
          type="pie"
          series={chartData}
          options={chartOptions}
          height={150}
        />
      </ChartWrapperStyle>
    </Card>
  );
}
