import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAssignee } from "../../api/taskApi";

export const useAssignTaskMemberMutation = (task_id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user_id: number) => addAssignee(task_id, user_id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["assignees", { task_id }] }),
  });
};
