import api from "@/lib/axios";
import { fetchAndValidate } from "@/utils/api";
import { subtaskEnvelopeSchema, type Subtask } from "../schemas/subtask.schema";

export const getSubtasks = async (task_id: number): Promise<Subtask[]> => {
  const { data } = await fetchAndValidate(`/task/${task_id}/subtask`, subtaskEnvelopeSchema);
  return data;
};

export const createSubtask = async (task_id: number, description: string): Promise<void> => {
  await api.post(`/task/${task_id}/subtask`, { description, is_done: false });
};

export const editSubtask = async (task_id: number, subtask_id: number, payload: { is_done: boolean }) => {
  await api.put(`/task/${task_id}/subtask/${subtask_id}`, payload);
};

export const deleteSubtask = async (task_id: number, subtask_id: number) => {
  await api.delete(`/task/${task_id}/subtask/${subtask_id}`);
};
