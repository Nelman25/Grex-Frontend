import { useQuery } from "@tanstack/react-query";
import { getWorkspaceRecentActivities } from "../../api/workspaceApi";

export const useFetchWorkspaceRecentActivitiesQuery = (workspace_id: number) => {
  return useQuery({
    queryKey: ["recent-activities", { workspace_id }],
    queryFn: () => getWorkspaceRecentActivities(workspace_id),
  });
};
