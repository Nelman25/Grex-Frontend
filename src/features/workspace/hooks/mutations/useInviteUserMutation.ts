import { useMutation } from "@tanstack/react-query";
import { inviteUserToWorkspace } from "../../api/userApi";

export const useInviteUserMutation = (workspace_id: number, email: string) => {
  return useMutation({
    mutationFn: () => inviteUserToWorkspace(workspace_id, email),
    onError: (error) => console.log("Failed to invite user: ", error.message),
  });
};
