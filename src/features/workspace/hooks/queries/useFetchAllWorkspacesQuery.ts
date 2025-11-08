import { useQuery } from "@tanstack/react-query";
import { getWorkspaces } from "../../api/workspaceApi";
import { type UserWorkspaces } from "../../schemas/workspace.schema";

export const useFetchAllWorkspacesQuery = (user_id: number | undefined) => {
  if (!user_id) throw new Error("Invalid user id");

  return useQuery<UserWorkspaces, Error>({
    queryKey: ["workspaces", { user_id }],
    queryFn: () => getWorkspaces(user_id),
  });
};
