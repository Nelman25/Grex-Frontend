import type { ChatMessage } from "@/types/chat";
import { create } from "zustand";

type ChatReplyState = {
  replyingTo: ChatMessage | null;
  setReplyingTo: (message: ChatMessage | null) => void;
  clearReply: () => void;
};

export const useChatReplyStore = create<ChatReplyState>((set) => ({
  replyingTo: null,
  setReplyingTo: (message) => set({ replyingTo: message }),
  clearReply: () => set({ replyingTo: null }),
}));
