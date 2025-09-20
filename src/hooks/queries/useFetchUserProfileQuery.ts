import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/api/profileApi";

export const useFetchUserProfileQuery = (user_id: number | undefined) => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: () => getUserProfile(user_id!),
    enabled: !!user_id,
  });
};
