import { useQuery } from "@tanstack/react-query";
import { getComments } from "@/features/tasks/api/commentApi";
import type { Comment } from "@/types/comment";

export const useFetchTaskCommentsQuery = (task_id: number) => {
  return useQuery<Comment[], Error>({
    queryKey: ["comments", { task_id }],
    queryFn: () => getComments(task_id),
  });
};
