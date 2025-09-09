import type {
  IncomingChatMessage,
  MessageHistoryItem,
  PendingChatMessage,
  ChatMessage,
} from "@/types/chat";
import { create } from "zustand";

interface ChatStore {
  messages: ChatMessage[];
  isConnected: boolean;
  setConnectionStatus: (status: boolean) => void;
  setMessages: (messages: MessageHistoryItem[]) => void;
  addMessage: (message: IncomingChatMessage | PendingChatMessage) => void;
  clearMessages: () => void;
  addMessageIfNotExists: (
    message: IncomingChatMessage | PendingChatMessage
  ) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  isConnected: false,
  setConnectionStatus: (status) => set({ isConnected: status }),
  setMessages: (messages: MessageHistoryItem[]) => {
    set({ messages: messages as ChatMessage[] });
  },

  addMessage: (message: IncomingChatMessage | PendingChatMessage) => {
    set((state) => {
      // Check if message already exists to prevent duplicates
      const messageId =
        "message_id" in message
          ? message.message_id
          : "temp_id" in message
          ? message.temp_id
          : null;

      if (messageId) {
        const exists = state.messages.some(
          (m) =>
            ("message_id" in m
              ? m.message_id
              : "temp_id" in m
              ? m.temp_id
              : null) === messageId
        );

        if (exists) {
          return state; 
        }
      }

      return {
        messages: [...state.messages, message],
      };
    });
  },

  addMessageIfNotExists: (
    message: IncomingChatMessage | PendingChatMessage
  ) => {
    const { messages } = get();
    const messageId =
      "message_id" in message
        ? message.message_id
        : "temp_id" in message
        ? message.temp_id
        : null;

    if (messageId) {
      const exists = messages.some(
        (m) =>
          ("message_id" in m
            ? m.message_id
            : "temp_id" in m
            ? m.temp_id
            : null) === messageId
      );

      if (!exists) {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      }
    } else {
      // If no ID, add it anyway (fallback)
      set((state) => ({
        messages: [...state.messages, message],
      }));
    }
  },

  clearMessages: () => {
    set({ messages: [] });
  },
}));
