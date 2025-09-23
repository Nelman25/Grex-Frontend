import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DailyCompletionData {
  day: string;
  completed: number;
}

interface Props {
  data?: DailyCompletionData[];
  height?: number;
  showGrid?: boolean;
}

const defaultData: DailyCompletionData[] = [
  { day: "Mon", completed: 2 },
  { day: "Tue", completed: 1 },
  { day: "Wed", completed: 3 },
  { day: "Thu", completed: 0 },
  { day: "Fri", completed: 0 },
  { day: "Sat", completed: 0 },
  { day: "Sun", completed: 0 },
];

export default function WeeklyProgressChart({ data = defaultData, height = 300, showGrid = true }: Props) {
  // Chart configuration
  const chartData: ChartData<"bar"> = {
    labels: data.map((item) => item.day),
    datasets: [
      {
        label: "Tasks Completed",
        data: data.map((item) => item.completed),
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)", // Mon - Blue
          "rgba(59, 130, 246, 0.8)", // Tue - Blue
          "rgba(59, 130, 246, 0.8)", // Wed - Blue
          "rgba(156, 163, 175, 0.6)", // Thu - Gray
          "rgba(156, 163, 175, 0.6)", // Fri - Gray
          "rgba(156, 163, 175, 0.6)", // Sat - Gray
          "rgba(156, 163, 175, 0.6)", // Sun - Gray
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(59, 130, 246, 1)",
          "rgba(59, 130, 246, 1)",
          "rgba(156, 163, 175, 1)",
          "rgba(156, 163, 175, 1)",
          "rgba(156, 163, 175, 1)",
          "rgba(156, 163, 175, 1)",
        ],
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgba(59, 130, 246, 0.5)",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function (context) {
            const value = context.parsed.y;
            return `${value} task${value !== 1 ? "s" : ""} completed`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: showGrid,
          color: "#303030",
        },
        ticks: {
          color: "#6B7280",
          font: {
            size: 12,
            weight: "bold",
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: showGrid,
          color: "#303030",
        },
        ticks: {
          color: "#6B7280",
          font: {
            size: 12,
          },
          stepSize: 1,
          precision: 0,
          callback: function (value) {
            return Number(value) === value && value % 1 === 0 ? value : null;
          },
        },
        max: Math.max(...data.map((item) => item.completed)) + 1,
      },
    },
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  return (
    <div className="rounded-lg p-6">
      <div style={{ height: `${height}px` }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
