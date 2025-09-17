import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../api/notificationApi";
import type { Notification } from "@/types/notification";

export const useFetchNotificationsQuery = (user_id?: number) => {
  return useQuery<Notification[], Error>({
    queryKey: ["notifications", { user_id }],
    queryFn: () => {
      if (!user_id) {
        throw new Error("User ID is required to fetch notifications");
      }
      return getNotifications(user_id);
    },
    enabled: !!user_id,
  });
};
