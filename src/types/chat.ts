export interface OutgoingChatMessage {
  type: "text" | "file" | "poll";
  content: string;
  reply_to: number | null;
}

export interface IncomingChatMessage extends OutgoingChatMessage {
  message_id: number;
  workspace_id: number;
  sender_id: number;
  avatar: string | null; // temp optional because of naming conflicts
  nickname: string;
  sent_at: string;
}

// change message_id to temp_id
export interface PendingChatMessage
  extends Omit<IncomingChatMessage, "message_id"> {
  temp_id: string;
}

// All these fields are temporarily set to null because we are focusing on text messages first, but these are
// part of the response shape that's why these are here
export interface MessageHistoryItem
  extends Omit<IncomingChatMessage, "avatar" | "type"> {
  // removing avatar and type here temporarily because of naming mismatch
  profile_picture: string | null;
  message_type: string;
  file_url?: string | null;
  file_type?: string | null;
  question?: string | null;
}

export type ChatMessage =
  | IncomingChatMessage
  | MessageHistoryItem
  | PendingChatMessage;
