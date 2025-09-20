import { useMutation, useQueryClient } from "@tanstack/react-query";
import { kickMember } from "../../api/workspaceApi";

export const useKickMemberMutation = (workspace_id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user_id: number) => kickMember(workspace_id, user_id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["members", { workspace_id }] }),
  });
};
