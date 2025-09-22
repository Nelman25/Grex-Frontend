import { useQuery } from "@tanstack/react-query";
import { getRepliedMessage } from "../../api/chatApi";

export const useFetchRepliedMessageQuery = (workspace_id: number, message_id: number | null) => {
  return useQuery({
    queryKey: ["replied-message", { workspace_id, message_id }],
    queryFn: () => getRepliedMessage(workspace_id, message_id),
    enabled: !!message_id,
  });
};
