import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "../../api/taskApi";

export const useDeleteCategoryMutation = (workspace_id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (categoryId: number) =>
      deleteCategory(workspace_id, categoryId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["categories", { workspace_id }],
      }),
  });
};
