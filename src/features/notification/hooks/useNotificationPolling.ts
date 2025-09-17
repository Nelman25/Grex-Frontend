import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import type { Notification } from "@/types/notification";
import { pollNotifications } from "../api/notificationApi";

export const useNotificationPolling = (user_id?: number) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user_id) return;

    const handleNewNotifications = (notifs: Notification[]) => {
      queryClient.setQueryData<Notification[]>(["notifications", { user_id }], (old) => {
        const existingIds = new Set(old?.map((n) => n.notification_id));
        const newNotifs = notifs.filter((n) => !existingIds.has(n.notification_id));
        return [...newNotifs, ...(old || [])];
      });
    };

    pollNotifications(user_id, handleNewNotifications);
  }, [user_id, queryClient]);
};
