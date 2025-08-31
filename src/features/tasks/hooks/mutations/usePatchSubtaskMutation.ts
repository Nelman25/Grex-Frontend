import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editSubtask } from "../../api/subtaskApi";
import type { PatchSubtask } from "@/types/task";

export const usePatchSubtaskMutation = (
  task_id: number,
  subtask_id: number
) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, PatchSubtask>({
    mutationFn: (payload) => editSubtask(task_id, subtask_id, payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["subtasks", { task_id }] }),
  });
};
