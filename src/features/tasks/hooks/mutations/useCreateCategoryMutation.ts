import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategory } from "../../api/taskApi";

export const useCreateCategoryMutation = (workspace_id: number) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (category) => addCategory(workspace_id, category),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["categories", { workspace_id }],
      }),
    onError: (error) =>
      console.error("Failed to create category: ", error.message),
  });
};
