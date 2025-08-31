import { useQuery } from "@tanstack/react-query";
import { getSubtasks } from "../../api/subtaskApi";
import type { Subtask } from "@/types/task";

export const useFetchSubtasksQuery = (task_id: number) => {
  return useQuery<Subtask[], Error>({
    queryKey: ["subtasks", { task_id }],
    queryFn: () => getSubtasks(task_id),
  });
};
