import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSubtask } from "../../api/subtaskApi";
import type { NewSubtask } from "@/types/task";

export const useCreateSubtaskMutation = (task_id: number) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, NewSubtask>({
    mutationFn: ({ description }) => createSubtask(task_id, description),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["subtasks", { task_id }] }),
    onError: (error) =>
      console.error("Failed to create subtask: ", error.message),
  });
};
  