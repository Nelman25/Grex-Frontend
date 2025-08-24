export type TaskPriority = "low" | "medium" | "high";

export interface NewTask {
  title: string;
  subject: string;
  description: string;
  deadline: Date;
  status: "pending" | "done" | "overdue";
  priority_level: TaskPriority;
  created_by: number;
}

export interface Task extends NewTask {
  task_id: number;
  created_at: Date;
  marked_done_at: Date | null;
}
