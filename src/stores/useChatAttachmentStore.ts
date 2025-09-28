import { create } from "zustand";
import type { AttachmentMessage } from "@/types/chat";

type ChatAttachmentStore = {
  attachment: AttachmentMessage | null;
  setAttachment: (attachment: AttachmentMessage) => void;
  removeAttachment: () => void;
};

export const useChatAttachmentStore = create<ChatAttachmentStore>((set) => ({
  attachment: null,
  setAttachment: (attachment: AttachmentMessage) => set({ attachment }),
  removeAttachment: () => set({ attachment: null }),
}));
