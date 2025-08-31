import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api/userApi";
import type { User } from "@/types/user";
import { useDebounce } from "@/hooks/useDebounce";

export const useUserSearch = (name: string) => {
  const debouncedQuery = useDebounce(name, 500);

  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: () => getUsers(debouncedQuery),
    enabled: debouncedQuery.trim().length > 0,
    staleTime: 1000 * 60,
  });
};

export const useInviteUser = () => {};
