import { useQuery } from "@tanstack/react-query";
import { getWorkspaces } from "../../api/workspaceApi";
import type { UserWorkspacesResponse } from "@/types/project";

export const useUserWorkspaces = (user_id: number | undefined) => {
  if (!user_id) throw new Error("Invalid user id");

  return useQuery<UserWorkspacesResponse[], Error>({
    queryKey: ["workspaces"],
    queryFn: () => getWorkspaces(user_id),
  });
};
