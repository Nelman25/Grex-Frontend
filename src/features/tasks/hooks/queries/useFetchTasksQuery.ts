import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../../api/taskApi";
import type { Task } from "@/types/task";

export const useFetchTasksQuery = (workspace_id: number) => {
  return useQuery<Task[], Error>({
    queryKey: ["tasks", { workspace_id }],
    queryFn: () => getTasks(workspace_id),
  });
};
