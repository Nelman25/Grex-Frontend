import { useMutation, useQueryClient } from "@tanstack/react-query";
import { kickMember } from "../../api/workspaceApi";

export const useKickMemberMutation = (workspace_id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user_id: number) => kickMember(workspace_id, user_id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["workspace", workspace_id] }),

    // NOTE: dis is not gud, request separate endpoint only for fetching members of the workspace.
    // when the said endpoint is available, change the queryKey to ["workspaceMembers", workspace_id]
  });
};
