import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editTask } from "../../api/taskApi";
import type { EditableTaskFields, Task } from "@/types/task";

export const usePatchTaskMutation = (workspace_id: number, task_id: number) => {
  const queryCient = useQueryClient();

  return useMutation<Task, Error, EditableTaskFields>({
    mutationFn: (payload) => editTask(workspace_id, task_id, payload),
    onSuccess: (updatedTask) => {
      queryCient.setQueryData<Task[]>(["tasks", { workspace_id }], (old) => {
        if (!old) return old;

        return old.map((t) => (t.task_id === task_id ? updatedTask : t));
      });
    },
  });
};
