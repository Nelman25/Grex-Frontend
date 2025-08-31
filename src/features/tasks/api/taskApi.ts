import api from "@/lib/axios";
import type {
  TaskAssignee,
  EditableTaskFields,
  NewTask,
  Task,
} from "@/types/task";

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

export const editTask = async (
  workspace_id: number,
  task_id: number,
  payload: EditableTaskFields
): Promise<Task> => {
  const updated = {
    ...payload,
    deadline: payload.deadline.toISOString().split("T")[0],
  };
  const { data } = await api.patch<Task>(
    `/tasks/${workspace_id}/${task_id}`,
    updated
  );

  return data;
};

export const deleteTask = async (workspace_id: number, task_id: number) => {
  await api.delete(`/tasks/${workspace_id}/${task_id}`);
};

export const addAssignee = async (task_id: number, user_id: number) => {
  await api.post(`/task/${task_id}/assignment/${user_id}`);
};

export const getAssignees = async (
  task_id: number
): Promise<TaskAssignee[]> => {
  const { data } = await api.get<TaskAssignee[]>(`/task/${task_id}/assignment`);
  return data;
};

export const deleteAssignee = async (task_id: number, user_id: number) => {
  await api.delete(`/task/${task_id}/assignment/${user_id}`);
};
