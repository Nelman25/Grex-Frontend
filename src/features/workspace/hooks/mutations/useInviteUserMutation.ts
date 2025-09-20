import { useMutation, useQueryClient } from "@tanstack/react-query";
import { inviteUserToWorkspace } from "../../api/userApi";
import { toast } from "sonner";

export const useInviteUserMutation = (workspace_id: number, email: string, added_by: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      if (!added_by) {
        toast.error("added_by cannot be undefined.");
        throw new Error("added_by cannot be undefined.");
      }
      return inviteUserToWorkspace(workspace_id, email, added_by);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["members", { workspace_id }] }),
    onError: (error) => console.log("Failed to invite user: ", error.message),
  });
};
