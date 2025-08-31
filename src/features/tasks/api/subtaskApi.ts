import api from "@/lib/axios";
import type { Subtask, PatchSubtask } from "@/types/task";

export const createSubtask = async (
  task_id: number,
  description: string
): Promise<void> => {
  await api.post(`/task/${task_id}/subtask`, { description, is_done: false });
};

export const getSubtasks = async (task_id: number): Promise<Subtask[]> => {
  const { data } = await api.get<{ status: string; data: Subtask[] }>(
    `/task/${task_id}/subtask`
  );
  return data.data;
};

export const editSubtask = async (
  task_id: number,
  subtask_id: number,
  payload: PatchSubtask
) => {
  await api.patch(`/task/${task_id}/subtask/${subtask_id}`, payload);
};
