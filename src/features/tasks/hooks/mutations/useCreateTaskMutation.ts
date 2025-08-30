import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../../api/taskApi";
import type { NewTask } from "@/types/task";

export const useCreateTaskMutation = (workspace_id: number) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, NewTask>({
    mutationFn: (task) => createTask(task, workspace_id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    onError: (error) => console.error("Failed to create task: ", error.message),
  });
};
