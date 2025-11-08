import { z } from "zod";

export const taskSchema = z.object({
  title: z.string(),
  subject: z.string(),
  description: z.string(),
  deadline: z.string(),
  status: z.enum(["pending", "done", "overdue"]),
  priority_level: z.enum(["low", "medium", "high"]),
  created_by: z.number(),
  start_date: z.string(),
  category: z.string(),
  task_id: z.number(),
  created_at: z.string(),
  marked_done_at: z.string().nullable(),
  workspace_id: z.number(),
});

export const tasksSchema = z.array(taskSchema);
export type Task = z.infer<typeof taskSchema>;
