export interface TextMessage {
  text: string;
}

export interface AttachmentMessage {
  file_name: string;
  file_url: string;
  file_type: "file" | "image";
  file_size: number;
}

export interface OutgoingChatMessage {
  type: "text" | "attachment";
  content: TextMessage | AttachmentMessage;
  reply_to: number | null;
}

export interface IncomingChatMessage extends OutgoingChatMessage {
  message_id: number;
  workspace_id: number;
  sender_id: number;
  avatar: string | null;
  nickname: string;
  sent_at: string;
}

// change message_id to temp_id
export interface PendingChatMessage extends Omit<IncomingChatMessage, "message_id"> {
  temp_id: string;
}

export interface MessageHistoryItem extends IncomingChatMessage {
  is_pinned: boolean;
}

export type ChatMessage = IncomingChatMessage | MessageHistoryItem;

export interface PinnedMessage extends MessageHistoryItem {
  pinned_at: Date;
  pinned_by: string;
}

export interface GrexPayload {
  role: string;
  nickname: string;
  query: string;
  workspace_id: number;
  message_id: number;
}
