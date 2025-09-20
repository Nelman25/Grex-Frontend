import { useQuery } from "@tanstack/react-query";
import { getPinnedMessages } from "../../api/chatApi";
import type { PinnedMessage } from "@/types/chat";

export const useFetchPinnedMessagesQuery = (workspace_id: number) => {
  return useQuery<PinnedMessage[]>({
    queryKey: ["pinned-messages", { workspace_id }],
    queryFn: () => getPinnedMessages(workspace_id),
  });
};
