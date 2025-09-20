import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUserProfile } from "@/api/profileApi";
import type { EditUser } from "@/types/user";

type Arg = {
  user_id: number;
  payload: EditUser;
};

export const useEditUserProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ user_id, payload }: Arg) => editUserProfile(user_id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user-profile"] }),
  });
};
