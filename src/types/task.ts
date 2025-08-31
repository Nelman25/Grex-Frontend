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
  priority_level: TaskPriority;
};

export type EditTaskPayload = EditableTaskFields & { task_id: number };

export type TaskGroups = {
  pending: Task[];
  done: Task[];
  overdue: Task[];
};

export interface NewSubtask {
  // task_id: number;
  description: string;
  // is_done: boolean;
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
