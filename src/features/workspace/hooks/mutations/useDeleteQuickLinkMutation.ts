import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteQuickLink } from "../../api/workspaceApi";

export const useDeleteQuickLinkMutation = (workspace_id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (link_id: number) => deleteQuickLink(link_id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["quick-links", { workspace_id }] }),
  });
};
