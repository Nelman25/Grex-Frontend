import { useQuery } from "@tanstack/react-query";
import { getWorkspaceQuickLinks } from "../../api/workspaceApi";

export const useFetchQuickLinksQuery = (workspace_id: number) => {
  return useQuery({
    queryKey: ["quick-links", { workspace_id }],
    queryFn: () => getWorkspaceQuickLinks(workspace_id),
  });
};
