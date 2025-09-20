import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api/userApi";
import type { User } from "@/types/user";

export const useUserSearch = (name: string) => {
  return useQuery<User[], Error>({
    queryKey: ["users", { name }],
    queryFn: () => getUsers(name),
    enabled: name.trim().length > 0,
    staleTime: 1000 * 60,
  });
};
