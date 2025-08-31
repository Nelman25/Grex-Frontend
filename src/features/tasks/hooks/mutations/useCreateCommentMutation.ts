import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "../../api/commentApi";
import type { NewComment } from "@/types/comment";

export const useCreateCommentMutation = (task_id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comment: NewComment) => addComment(task_id, comment),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["comments", { task_id }] }),
  });
};
