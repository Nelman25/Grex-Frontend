import type { MessageHistoryItem } from "@/types/chat";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { fetchMessages } from "../../api/chatApi";

export const useFetchMessagesQuery = (workspaceId: number) => {
  return useInfiniteQuery<
    MessageHistoryItem[],
    Error,
    InfiniteData<MessageHistoryItem[]>,
    readonly unknown[],
    number | undefined
  >({
    queryKey: ["messages", workspaceId],
    queryFn: fetchMessages,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      // if we got less than 30, means no more messages
      if (lastPage.length < 30) return undefined;
      return lastPage[lastPage.length - 1].message_id;
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage.length > 0 ? firstPage[0].message_id : undefined;
    },
  });
};
