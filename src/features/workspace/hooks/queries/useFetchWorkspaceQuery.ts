import { useQuery } from "@tanstack/react-query";
import { getSelectedWorkspace } from "../../api/workspaceApi";
import type { WorkspaceResponse } from "@/types/project";

export const useFetchWorkspaceQuery = (workspace_id: number) => {
  return useQuery<WorkspaceResponse, Error>({
    queryKey: ["workspace", { workspace_id }],
    queryFn: () => getSelectedWorkspace(workspace_id),
    enabled: !!workspace_id
  });
};
