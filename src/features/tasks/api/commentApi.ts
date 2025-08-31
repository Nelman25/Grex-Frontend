import api from "@/lib/axios";
import type { Comment, NewComment } from "@/types/comment";

export const addComment = async (task_id: number, comment: NewComment) => {
  await api.post(`/task/${task_id}/comments`, {
    ...comment,
    created_at: new Date(),
  });
};

export const getComments = async (task_id: number): Promise<Comment[]> => {
  const { data } = await api.get<Comment[]>(`/task/${task_id}/comments/`);

  return data;
};
