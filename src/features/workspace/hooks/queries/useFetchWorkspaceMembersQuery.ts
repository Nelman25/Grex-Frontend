import { useQuery } from "@tanstack/react-query";
import type { WorkspaceMember } from "@/types/member";
import { getWorkspaceMembers } from "../../api/workspaceApi";

export const useFetchWorkspaceMembersQuery = (workspace_id: number) => {
  return useQuery<WorkspaceMember[], Error>({
    queryKey: ["members", { workspace_id }],
    queryFn: () => getWorkspaceMembers(workspace_id),
  });
};
