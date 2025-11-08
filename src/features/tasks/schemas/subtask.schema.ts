import { z } from "zod";

export const subtaskSchema = z.object({
  description: z.string().min(1, "Description is required"),
  subtask_id: z.number(),
  task_id: z.number(),
  is_done: z.boolean(),
  created_at: z.string(),
});

export const subtasksSchema = z.array(subtaskSchema);

export const subtaskEnvelopeSchema = z.object({
  message: z.string().optional(),
  data: subtasksSchema,
});

export type SubtasksEnvelope = z.infer<typeof subtaskEnvelopeSchema>;
export type Subtask = z.infer<typeof subtaskSchema>;
