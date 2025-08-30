import api from "@/lib/axios";
import type { NewTask, Task } from "@/types/task";

export const createTask = async (
  newTask: NewTask,
  workspace_id: number
): Promise<void> => {
  const payload = { ...newTask, created_at: new Date() };
  await api.post(`/tasks/${workspace_id}`, payload);
};

export const getTasks = async (workspace_id: number): Promise<Task[]> => {
  const { data } = await api.get<Task[]>(`/tasks/${workspace_id}`);
  return data;
};
