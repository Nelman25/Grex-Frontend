import { useParams } from "react-router";
import TaskPieChart from "./TaskPieChart";
import TaskPriorityChart from "./TaskPriorityChart";
import { useFetchTasksQuery } from "@/features/tasks/hooks/queries/useFetchTasksQuery";
import TaskAssigneeDistributionChart from "./TaskAssigneeDistributionChart";
import ChartCard from "./ChartCard";
import { useFetchWorkspaceRecentActivitiesQuery } from "../hooks/queries/useFetchWorkspaceRecentActivitiesQuery";

export default function WorkspaceOverview() {
  const { workspace_id } = useParams();
  const workspaceId = Number(workspace_id);
  const { data: tasks = [] } = useFetchTasksQuery(workspaceId);
  const { data: recentActivities = [] } = useFetchWorkspaceRecentActivitiesQuery(workspaceId);

  const renderRecentActivities = () => {
    return recentActivities.map((recent_activity) => (
      <div className="flex space-x-3 items-center text-lg">
        <div className="size-8 bg-brand-primary rounded-full border flex items-center justify-center text-light-text">JV</div>
        <p className="text-dark-text">{recent_activity.content}</p>
      </div>
    ));
  };

  return (
    <div className="flex-1 max-w-7xl grid grid-cols-1 sm:grid-cols-2 gap-4">
      <ChartCard title="Priority Breakdown" subtitle="Get a holistic view of how work is being prioritized">
        <TaskPieChart tasks={tasks} />
      </ChartCard>

      <ChartCard title="Recent Activities" subtitle="Stay up to date with what's happening across the project">
        <div className="flex flex-col space-y-4 pt-4">{renderRecentActivities()}</div>
      </ChartCard>

      <ChartCard title="Priority Breakdown" subtitle="Get a holistic view of how work is being prioritized">
        <TaskPriorityChart tasks={tasks} />
      </ChartCard>

      <ChartCard title="Priority Breakdown" subtitle="Get a holistic view of how work is being prioritized">
        <TaskAssigneeDistributionChart tasks={tasks} />
      </ChartCard>
    </div>
  );
}
