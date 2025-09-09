import api from "@/lib/axios";
import type { MessageHistoryItem } from "@/types/chat";
import type { QueryFunctionContext } from "@tanstack/react-query";

export const fetchMessages = async (
  ctx: QueryFunctionContext<readonly unknown[], unknown>
): Promise<MessageHistoryItem[]> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, workspace_id] = ctx.queryKey as [string, number];
  const last_id = ctx.pageParam as number | undefined;

  const params: { last_id?: number } = {};
  if (last_id !== undefined) {
    params.last_id = last_id;
  }

  const { data } = await api.get<MessageHistoryItem[]>(
    `/workspace/${workspace_id}/messages`,
    { params }
  );

  return data;
};
