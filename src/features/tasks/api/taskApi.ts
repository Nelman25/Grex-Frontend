import api from "@/lib/axios";
import { mockTasks } from "@/mocks/tasks";
import type { Category, EditableTaskFields, NewTask } from "@/types/task";
import { formatDateForAPI } from "@/utils";
import { fetchAndValidate } from "@/utils/api/fetchAndValidate";
import {
  type Task,
  type TaskAssignee,
  type UserTask,
  assigneesSchema,
  tasksSchema,
  userTasksSchema,
} from "../schemas/task.schema";

export const seedTasks = async (workspace_id: number): Promise<void> => {
  for (const task of mockTasks) {
    try {
      await createTask(task, workspace_id);
      console.log(`✅ Task "${task.title}" seeded`);
    } catch (error) {
      console.error(`❌ Failed to seed task "${task.title}"`, error);
    }
  }
};

export const createTask = async (newTask: NewTask, workspace_id: number): Promise<void> => {
  const payload = {
    ...newTask,
    start_date: newTask.start_date.toISOString().split("T")[0],
    deadline: newTask.deadline.toISOString(),
  };
  await api.post(`/tasks/${workspace_id}`, payload);
};

export const getTasks = async (workspace_id: number): Promise<Task[]> => {
  return fetchAndValidate(`/tasks/${workspace_id}`, tasksSchema);
};

export const getUserTasks = async (user_id: number): Promise<UserTask[]> => {
  return fetchAndValidate(`/users/${user_id}/tasks`, userTasksSchema);
};

export const getAssignees = async (task_id: number): Promise<TaskAssignee[]> => {
  return fetchAndValidate(`/task/${task_id}/assignment`, assigneesSchema);
};

export const editTask = async (
  workspace_id: number,
  task_id: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: Partial<EditableTaskFields> | Record<string, any>
): Promise<Task> => {
  const updated = {
    ...payload,
    deadline: formatDateForAPI(payload.deadline),
    start_date: formatDateForAPI(payload.start_date),
  };

  const { data } = await api.patch<Task>(`/tasks/${workspace_id}/${task_id}`, updated);
  return data;
};

export const markTaskAsDone = async (workspace_id: number, task_id: number) => {
  await api.patch(`/tasks/${workspace_id}/${task_id}`, { status: "done", marked_done_at: new Date() });
};

export const deleteTask = async (workspace_id: number, task_id: number) => {
  await api.delete(`/tasks/${workspace_id}/${task_id}`);
};

export const addAssignee = async (task_id: number, user_id: number) => {
  await api.post(`/task/${task_id}/assignment/${user_id}`);
};

export const deleteAssignee = async (task_id: number, user_id: number) => {
  await api.delete(`/task/${task_id}/assignment/${user_id}`);
};

export const getCategories = async (workspace_id: number): Promise<Category[]> => {
  const { data } = await api.get<Category[]>(`/workspace/${workspace_id}/categories`);
  return data;
};

export const addCategory = async (workspace_id: number, category: string): Promise<void> => {
  await api.post(`/workspace/${workspace_id}/categories`, { name: category });
};

export const editCategory = async (workspace_id: number, category_id: number, name: string): Promise<Category> => {
  const { data } = await api.put<Category>(`/workspace/${workspace_id}/categories/${category_id}`, {
    name,
  });

  return data;
};

export const deleteCategory = async (workspace_id: number, category_id: number): Promise<void> => {
  await api.delete(`/workspace/${workspace_id}/categories/${category_id}`);
};
