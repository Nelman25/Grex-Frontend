import api from "@/lib/axios";
import { mockTasks } from "@/mocks/tasks";
import type { TaskAssignee, EditableTaskFields, NewTask, Task, Category, UserTask } from "@/types/task";
import { formatDateForAPI } from "@/utils";

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
  const { data } = await api.get<Task[]>(`/tasks/${workspace_id}`);
  return data;
};

export const getUserTasks = async (user_id: number): Promise<UserTask[]> => {
  const { data } = await api.get<UserTask[]>(`/users/${user_id}/tasks`);
  return data;
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

export const deleteTask = async (workspace_id: number, task_id: number) => {
  await api.delete(`/tasks/${workspace_id}/${task_id}`);
};

export const addAssignee = async (task_id: number, user_id: number) => {
  await api.post(`/task/${task_id}/assignment/${user_id}`);
};

export const getAssignees = async (task_id: number): Promise<TaskAssignee[]> => {
  const { data } = await api.get<TaskAssignee[]>(`/task/${task_id}/assignment`);
  return data;
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
