import { z } from "zod";

const textMessageSchema = z.object({
  text: z.string().min(1),
});

const attachmentMessageSchema = z.object({
  file_name: z.string().min(1),
  file_url: z.url(),
  file_type: z.enum(["file", "image"]),
  file_size: z.number().min(1),
});

export const outgoingChatMessageSchema = z.object({
  type: z.enum(["text", "attachment"]),
  content: z.union([textMessageSchema, attachmentMessageSchema]),
  reply_to: z.number().nullable(),
});

export const incomingChatMessageSchema = outgoingChatMessageSchema.extend({
  message_id: z.number(),
  workspace_id: z.number(),
  sender_id: z.number(),
  avatar: z.string().nullable(),
  nickname: z.string(),
  sent_at: z.string(),
});

export type OutgoingChatMessage = z.infer<typeof outgoingChatMessageSchema>;
export type IncomingChatMessage = z.infer<typeof incomingChatMessageSchema>;
