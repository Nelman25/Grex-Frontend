import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAssignee } from "../../api/taskApi";

export const useUnassignTaskMemberMutation = (task_id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user_id: number) => deleteAssignee(task_id, user_id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["assignees", { task_id }] }),
  });
};
