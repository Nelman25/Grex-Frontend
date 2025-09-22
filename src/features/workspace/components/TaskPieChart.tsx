import type { Task } from "@/types/task";
import { getTaskSummary } from "@/utils";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  tasks: Task[];
};

export default function TaskPieChart({ tasks }: Props) {
  const tasksData = getTaskSummary(tasks);

  const data = {
    labels: ["Done", "In-Progress", "Overdue"],
    datasets: [
      {
        label: "Tasks",
        data: tasksData,
        backgroundColor: ["rgba(34, 197, 94, 0.7)", "rgba(59, 130, 246, 0.7)", "rgba(239, 68, 68, 0.7)"],
        borderColor: ["rgba(34, 197, 94, 1)", "rgba(59, 130, 246, 1)", "rgba(239, 68, 68, 1)"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="flex-1 flex justify-center items-center">
      <Doughnut data={data} className="max-h-[400px]" />
    </div>
  );
}
