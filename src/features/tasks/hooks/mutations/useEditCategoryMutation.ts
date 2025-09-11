import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCategory } from "../../api/taskApi";
import type { Category } from "@/types/task";

export const useEditCategoryMutation = (workspace_id: number) => {
  const queryClient = useQueryClient();

  return useMutation<Category, Error, { name: string; categoryId: number }>({
    mutationFn: ({ name, categoryId }) =>
      editCategory(workspace_id, categoryId, name),
    onSuccess: (_, { name, categoryId }) => {
      queryClient.invalidateQueries({ queryKey: ["tasks", { workspace_id }] });

      // manually update the category name in cache so the Kanban doesn’t reshuffle stuff after edit :))
      queryClient.setQueryData<Category[]>(
        ["categories", { workspace_id }],
        (cache) => {
          if (!cache) return cache;
          return cache.map((c) =>
            c.category_id === categoryId ? { ...c, name } : c
          );
        }
      );
    },
  });
};
