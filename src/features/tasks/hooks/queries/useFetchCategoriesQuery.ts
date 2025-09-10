import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../api/taskApi";
import type { Category } from "@/types/task";

export const useFetchCategoryQuery = (workspace_id: number) => {
  return useQuery<Category[], Error>({
    queryKey: ["categories", { workspace_id }],
    queryFn: () => getCategories(Number(workspace_id))
  });
};
