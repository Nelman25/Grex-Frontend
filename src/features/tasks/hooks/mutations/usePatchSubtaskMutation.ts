import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editSubtask } from "../../api/subtaskApi";

export const usePatchSubtaskMutation = (
  task_id: number,
  subtask_id: number
) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { is_done: boolean }>({
    mutationFn: (payload) => editSubtask(task_id, subtask_id, payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["subtasks", { task_id }] }),
  });
};
