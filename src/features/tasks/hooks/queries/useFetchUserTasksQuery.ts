import { useQuery } from "@tanstack/react-query";
import { getUserTasks } from "../../api/taskApi";

export const useFetchUserTasksQuery = (user_id: number | undefined) => {
  if (!user_id) throw new Error("Invalid user id");

  return useQuery({
    queryKey: ["tasks", { user_id }],
    queryFn: () => getUserTasks(user_id),
    enabled: !!user_id,
  });
};
