import type { EditableTaskFields } from "@/types/task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editTask } from "../../api/taskApi";
import type { Task } from "../../schemas/task.schema";

export const usePatchTaskMutation = (workspace_id: number) => {
  const queryCient = useQueryClient();

  return useMutation<Task, Error, { id: number; payload: EditableTaskFields }>({
    mutationFn: ({ id, payload }) => editTask(workspace_id, id, payload),
    onSuccess: () => queryCient.invalidateQueries({ queryKey: ["tasks", { workspace_id }] }),
  });
};
