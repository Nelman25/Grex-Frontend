import { useQuery } from "@tanstack/react-query";
import { getSelectedWorkspace } from "../../api/workspaceApi";
import type { WorkspaceResponse } from "@/types/project";

export const useFetchWorkspaceQuery = (
  workspace_id: number,
  user_id: number | undefined
) => {
  if (!user_id) throw new Error("No authenticated user.");
  return useQuery<WorkspaceResponse, Error>({
    queryKey: ["workspace", { workspace_id }],
    queryFn: () => getSelectedWorkspace(workspace_id, user_id),
  });
};
