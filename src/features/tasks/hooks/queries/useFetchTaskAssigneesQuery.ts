import { useQuery } from "@tanstack/react-query";
import { getAssignees } from "../../api/taskApi";
import { type TaskAssignee } from "../../schemas/task.schema";

export const useFetchTaskAssigneesQuery = (task_id: number) => {
  return useQuery<TaskAssignee[]>({
    queryKey: ["assignees", { task_id }],
    queryFn: () => getAssignees(task_id),
  });
};
