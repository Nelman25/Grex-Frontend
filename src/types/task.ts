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
  workspace_id: number; // DELETE THIS WHEN THE API IS READY. this is just to simulate the project selection.
}

export type TaskGroups = {
  pending: Task[];
  done: Task[];
  overdue: Task[];
};

export interface NewSubtask {
  task_id: number;
  description: string;
  is_done: boolean;
}

export interface Subtask extends NewSubtask {
  subtask_id: number;
  created_at: Date;
}
