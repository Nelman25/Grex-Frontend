import { useWorkspaceAssignees } from "@/features/tasks/hooks/queries/useFetchWorkspaceAssignees";
import type { Task } from "@/types/task";
import { aggregateAssignees } from "@/utils";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  tasks: Task[];
}

export default function WorkspaceAssigneeChart({ tasks }: Props) {
  const { assignees, isLoading } = useWorkspaceAssignees(tasks);

  if (isLoading) return <p>Loading chart...</p>;

  const summary = aggregateAssignees(assignees);

  const data = {
    labels: summary.map((u) => u.name),
    datasets: [
      {
        label: "Tasks Assigned",
        data: summary.map((u) => u.count),
        backgroundColor: [
          "#B7CA47",
          "#F3A712",
          "#3A86FF",
          "#C5D279",
          "#118AB2",
          "#C47317",
          "#FF006E",
          "#E4572E",
          "#669BBC",
          "#8338EC",
          "#FB5607",
          "#06D6A0",
        ],
        borderColor: "#",
        borderWidth: 2,
        borderRadius: 5
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Task Distribution by Member" },
    },
    scales: {
      x: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };

  return (
    <div className="w-[600px] h-[400px]">
      <Bar data={data} options={options} />
    </div>
  );
}
