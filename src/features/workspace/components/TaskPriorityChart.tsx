import type { Task } from "@/features/tasks/schemas/task.schema";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  tasks: Task[];
}

export default function TaskPriorityChart({ tasks }: Props) {
  const low = tasks.filter((t) => t.priority_level === "low").length;
  const medium = tasks.filter((t) => t.priority_level === "medium").length;
  const high = tasks.filter((t) => t.priority_level === "high").length;

  const data = {
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        label: "Number of Tasks",
        data: [low, medium, high],
        backgroundColor: ["rgba(34, 197, 94, 0.7)", "rgba(234, 179, 8, 0.7)", "rgba(239, 68, 68, 0.7)"],
        borderColor: ["rgba(34, 197, 94, 1)", "rgba(234, 179, 8, 1)", "rgba(239, 68, 68, 1)"],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Task Priorities",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div className="">
      <Bar data={data} options={options} />
    </div>
  );
}
