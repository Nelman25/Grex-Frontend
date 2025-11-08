export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "pending" | "done" | "overdue";

export interface NewTask {
  title: string;
  subject: string;
  description: string;
  deadline: Date;
  status: TaskStatus;
  priority_level: TaskPriority;
  created_by: number;
  start_date: Date;
  category: string;
}

export interface Task extends NewTask {
  task_id: number;
  created_at: Date;
  marked_done_at: Date | null;
  workspace_id: number;
}

export type EditableTaskFields = {
  title: string;
  subject: string;
  description: string;
  deadline: Date;
  start_date: Date;
  priority_level: TaskPriority;
  category?: string;
  status?: TaskStatus;
  marked_done_at?: Date | null;
};

export type EditTaskPayload = EditableTaskFields & { task_id: number };

export type TaskGroups = Record<string, Task[]>;

export interface NewSubtask {
  description: string;
}

export interface Subtask extends NewSubtask {
  subtask_id: number;
  task_id: number;
  is_done: boolean;
  created_at: Date;
}

export interface PutSubtask {
  is_done: boolean;
}

export interface TaskAssignee {
  task_id: number;
  user_id: number;
  avatar: string;
  name: string;
}

export interface Category {
  name: string;
  workspace_id: number;
  category_id: number;
  created_at: Date;
}

export interface UserTask {
  title: string;
  description: string;
  deadline: Date;
  start_date: Date;
  task_id: number;
  workspace_id: number;
  workspace_name: string;
  category: string;
  status: TaskStatus;
  priority_level: TaskPriority;
}
