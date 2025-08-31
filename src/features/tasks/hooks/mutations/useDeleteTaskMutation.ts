import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../../api/taskApi";
import type { Task } from "@/types/task";

export const useDeleteTaskMutation = (workspace_id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task_id: number) => deleteTask(workspace_id, task_id),
    onSuccess: (_, task_id) => {
      queryClient.setQueryData<Task[]>(["tasks", { workspace_id }], (cache) => {
        if (!cache) return cache;
        return cache.filter((t) => t.task_id !== task_id);
      });
    },
  });
};
