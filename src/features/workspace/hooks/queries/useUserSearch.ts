import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api/userApi";
import type { SearchUser } from "../../schemas/user.schema";

export const useUserSearch = (name: string) => {
  return useQuery<SearchUser[], Error>({
    queryKey: ["users", { name }],
    queryFn: () => getUsers(name),
    enabled: name.trim().length > 0,
    staleTime: 1000 * 60,
  });
};
