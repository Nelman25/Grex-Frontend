import type { ChatMessage, IncomingChatMessage, MessageHistoryItem } from "@/types/chat";
import { create } from "zustand";

interface ChatStore {
  messagesByWorkspace: Map<number, WorkspaceMessages>;
  currentWorkspaceId: number | null;
  isConnected: boolean;

  setConnectionStatus: (status: boolean) => void;
  initializeMessages: (workspaceId: number, messages: MessageHistoryItem[]) => void;
  appendMessageHistory: (workspaceId: number, messages: MessageHistoryItem[]) => void;
  addMessage: (workspaceId: number, message: IncomingChatMessage) => void;
  getMessages: (workspaceId: number) => ChatMessage[];
}

interface WorkspaceMessages {
  messages: ChatMessage[];
  hasInitialized: boolean;
  oldestMessageId?: number;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messagesByWorkspace: new Map(),
  currentWorkspaceId: null,
  isConnected: false,

  setConnectionStatus: (status) => set({ isConnected: status }),

  initializeMessages: (workspaceId, messages) => {
    set((state) => {
      const messagesByWorkspaceCopy = new Map(state.messagesByWorkspace);
      messagesByWorkspaceCopy.set(workspaceId, {
        messages,
        hasInitialized: true,
        oldestMessageId: messages[0]?.message_id,
      });

      return { messagesByWorkspace: messagesByWorkspaceCopy };
    });
  },

  appendMessageHistory: (workspaceId, messages) => {
    set((state) => {
      const messagesByWorkspaceCopy = new Map(state.messagesByWorkspace);
      const existing = messagesByWorkspaceCopy.get(workspaceId);

      if (!existing) {
        messagesByWorkspaceCopy.set(workspaceId, {
          messages,
          hasInitialized: true,
          oldestMessageId: messages[0]?.message_id,
        });
      } else {
        const existingIds = new Set(existing.messages.map((m) => m.message_id));
        const uniques = messages.filter((m) => !existingIds.has(m.message_id));
        const sortedNewMessages = uniques.sort((a, b) => a.message_id - b.message_id);

        messagesByWorkspaceCopy.set(workspaceId, {
          ...existing,
          messages: [...sortedNewMessages, ...existing.messages],
          oldestMessageId: Math.max(...uniques.map((m) => m.message_id)) ?? existing.oldestMessageId,
        });
      }

      return { messagesByWorkspace: messagesByWorkspaceCopy };
    });
  },

  addMessage: (workspaceId: number, message: IncomingChatMessage) => {
    set((state) => {
      const messagesByWorkspaceCopy = new Map(state.messagesByWorkspace);
      const existing = messagesByWorkspaceCopy.get(workspaceId);

      if (!existing) {
        messagesByWorkspaceCopy.set(workspaceId, {
          messages: [message],
          hasInitialized: false,
        });
      } else {
        messagesByWorkspaceCopy.set(workspaceId, {
          ...existing,
          messages: existing.messages.concat(message),
        });
      }

      return { messagesByWorkspace: messagesByWorkspaceCopy };
    });
  },

  getMessages: (workspaceId: number) => {
    return get().messagesByWorkspace.get(workspaceId)?.messages ?? [];
  },
}));
