import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeMemberLeader } from "../../api/workspaceApi";

export const usePromoteToLeaderMutation = (workspace_id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: number) => makeMemberLeader(workspace_id, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspace", { workspace_id }] });
    },
  });
};
