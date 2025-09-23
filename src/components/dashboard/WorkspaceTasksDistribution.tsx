import type { UserTask } from "@/types/task";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  tasks: UserTask[];
}

export default function WorkspaceTasksDistribution({ tasks }: Props) {
  const getWorkspaceTaskSummary = (tasks: UserTask[]) => {
    const workspaceCounts: Record<string, number> = {};

    tasks.forEach((task) => {
      workspaceCounts[task.workspace_name] = (workspaceCounts[task.workspace_name] || 0) + 1;
    });

    return {
      labels: Object.keys(workspaceCounts),
      counts: Object.values(workspaceCounts),
    };
  };

  const truncateLabel = (label: string, maxLength: number): string => {
    return label.length > maxLength ? label.slice(0, maxLength) + "…" : label;
  };

  const { labels, counts } = getWorkspaceTaskSummary(tasks);

  const data = {
    labels: labels.map((name) => truncateLabel(name, 20)),
    datasets: [
      {
        label: "Tasks Assigned",
        data: counts,
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
        borderColor: "#1a1a1a",
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(48, 48, 48, 0.95)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        cornerRadius: 6,
        displayColors: true,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: "#666666",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "#303030",
          lineWidth: 1,
          drawBorder: false,
        },
        title: {
          display: true,
          text: "Number of Tasks",
          color: "#666666",
          font: {
            size: 12,
            weight: "500",
          },
        },
      },
      y: {
        ticks: {
          color: "#666666",
          font: {
            size: 12,
            weight: "500",
          },
        },
        grid: {
          color: "#303030",
          lineWidth: 1,
          drawBorder: false,
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
    interaction: {
      intersect: false,
      mode: "nearest" as const,
    },
    elements: {
      bar: {
        backgroundColor: "rgba(183, 202, 71, 0.8)",
        borderColor: "rgba(48, 48, 48, 0.8)",
        borderWidth: 1,
      },
    },
  };

  return (
    <div className="w-full p-6">
      <div className="h-80">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
