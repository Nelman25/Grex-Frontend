import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pinMessage } from "../../api/chatApi";
import { toast } from "sonner";

export const usePinMessageMutation = (workspace_id: number) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { message_id: number; pinned_by: number }>({
    mutationFn: ({ message_id, pinned_by }) => pinMessage(workspace_id, message_id, pinned_by),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pinned_messages", { workspace_id }] });
    },
    onError: (error) => toast.error(`Failed to create task: ${error.message}`),
  });
};
