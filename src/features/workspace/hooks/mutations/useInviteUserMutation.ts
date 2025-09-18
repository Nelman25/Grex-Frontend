import { useMutation } from "@tanstack/react-query";
import { inviteUserToWorkspace } from "../../api/userApi";
import { toast } from "sonner";

export const useInviteUserMutation = (workspace_id: number, email: string, added_by: number | undefined) => {
  return useMutation({
    mutationFn: () => {
      if (!added_by) {
        toast.error("added_by cannot be undefined.");
        throw new Error("added_by cannot be undefined.");
      }
      return inviteUserToWorkspace(workspace_id, email, added_by);
    },
    onError: (error) => console.log("Failed to invite user: ", error.message),
  });
};
