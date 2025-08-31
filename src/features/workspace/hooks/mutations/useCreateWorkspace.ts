import type { NewProject, Project } from "@/types/project";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWorkspace } from "../../api/workspaceApi";

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation<Project, Error, NewProject>({
    mutationFn: (workspace) => createWorkspace(workspace),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["workspaces"] }),
    onError: (error) =>
      console.error("Failed to create workspace: ", error.message),
  });
};
