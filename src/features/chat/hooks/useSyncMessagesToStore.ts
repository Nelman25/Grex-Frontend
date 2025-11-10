import { useEffect } from "react";
import { useFetchMessagesQuery } from "./queries/useFetchMessagesQuery";
import { useChatStore } from "@/stores/useChatStore";

export const useSyncMessagesToStore = (workspaceId: number) => {
  const query = useFetchMessagesQuery(workspaceId);
  const appendMessageHistory = useChatStore((s) => s.appendMessageHistory);

  useEffect(() => {
    if (query.isSuccess && query.data?.pages) {
      const messages = [...query.data.pages].reverse().flat();
      appendMessageHistory(workspaceId, messages);
    }
  }, [query.isSuccess, query.data?.pages, workspaceId, appendMessageHistory]);

  return query;
};
