import { useQuery } from "@tanstack/react-query";
import { getSelectedWorkspace } from "../../api/workspaceApi";
import type { Workspace } from "../../schemas/workspace.schema";

export const useFetchWorkspaceQuery = (workspace_id: number) => {
  return useQuery<Workspace, Error>({
    queryKey: ["workspace", { workspace_id }],
    queryFn: () => getSelectedWorkspace(workspace_id),
    enabled: !!workspace_id,
  });
};
