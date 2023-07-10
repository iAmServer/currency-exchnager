import { useQuery } from "@tanstack/react-query";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { getChart } from "../api";
import { backdatedMonth } from "../utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
    },
  },
};

interface Props {
  base: string;
  symbol: string;
}

const ChartData: React.FC<Props> = ({ base, symbol }) => {
  const { data: records } = useQuery({
    queryKey: ["getChart", base!, symbol!],
    queryFn: () => getChart(base!, symbol!),
  });

  const data = useMemo(
    () => ({
      labels: records
        ? records.map((record) => record.date)
        : backdatedMonth(12),
      datasets: [
        {
          fill: true,
          label: "",
          data: records ? records.map((record) => record.rate) : [],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    }),
    [records]
  );

  return <Line options={options} data={data} />;
};

export default ChartData;
