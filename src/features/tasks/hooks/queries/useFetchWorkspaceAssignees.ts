import { useQueries } from "@tanstack/react-query";
import { getAssignees } from "../../api/taskApi";
import type { Task, TaskAssignee } from "@/types/task";

export const useWorkspaceAssignees = (tasks: Task[]) => {
  const results = useQueries({
    queries: tasks.map((task) => ({
      queryKey: ["assignees", { task_id: task.task_id }],
      queryFn: () => getAssignees(task.task_id),
    })),
  });

  const assignees: TaskAssignee[] = results.map((r) => r.data ?? []).flat();

  const isLoading = results.some((r) => r.isLoading);
  const isError = results.some((r) => r.isError);

  return { assignees, isLoading, isError };
};
