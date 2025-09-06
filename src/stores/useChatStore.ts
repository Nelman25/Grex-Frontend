import { create } from "zustand";
import type {
  IncomingChatMessage,
  PendingChatMessage,
  ChatMessage,
} from "@/types/chat";

interface ChatStore {
  messages: ChatMessage[];
  isConnected: boolean;
  setMessages: (messages: ChatMessage[]) => void;
  addMessage: (message: PendingChatMessage | IncomingChatMessage) => void;
  setConnectionStatus: (status: boolean) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  isConnected: false,
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setConnectionStatus: (status) => set({ isConnected: status }),
}));
