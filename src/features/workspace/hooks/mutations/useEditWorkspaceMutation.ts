import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editWorkspace } from "../../api/workspaceApi";
import type { EditProject } from "@/types/project";

export const useEditWorkspaceMutation = (workspace_id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: EditProject) => editWorkspace(workspace_id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspace", { workspace_id }] });
    },
  });
};
