import api from "@/lib/axios";
import type { Notification } from "@/types/notification";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const pollNotifications = async (user_id: number, onNew: (notifs: Notification[]) => void) => {
  try {
    const { data } = await api.get<Notification[]>("/notification-recipients/stream", {
      params: { user_id },
      timeout: 35000,
    });

    if (data.length > 0) toast(`You have ${data.length} new notification${data.length > 1 ? "s" : ""}`);

    onNew(data);

    pollNotifications(user_id, onNew);
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log("Polling error:", err.message);
    }
    setTimeout(() => pollNotifications(user_id, onNew), 3000);
  }
};

export const getNotifications = async (user_id: number) => {
  const { data } = await api.get<Notification[]>("/notification-recipients", { params: { user_id } });
  return data;
};
