import { useQuery } from "@tanstack/react-query";
import { type WorkspaceMember } from "../../schemas/workspace.schema";
import { getWorkspaceMembers } from "../../api/workspaceApi";

export const useFetchWorkspaceMembersQuery = (workspace_id: number) => {
  return useQuery<WorkspaceMember[], Error>({
    queryKey: ["members", { workspace_id }],
    queryFn: () => getWorkspaceMembers(workspace_id),
    enabled: !!workspace_id,
  });
};
