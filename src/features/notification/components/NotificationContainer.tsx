import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { PropsWithChildren } from "react";
import { useFetchNotificationsQuery } from "../hooks/useFetchNotificationsQuery";
import { useAuth } from "@/features/auth/hooks/auth-context";
import { Label } from "@/components/ui/label";
import NotificationItem from "./NotificationItem";
import { useNotificationPolling } from "../hooks/useNotificationPolling";
import emptyNotification from "@/assets/empty_notification.svg";

type Props = PropsWithChildren & {};

export default function NotificationContainer({ children }: Props) {
  const { user } = useAuth();
  const { data: notifications = [] } = useFetchNotificationsQuery(user?.user_id);
  useNotificationPolling(user?.user_id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="p-4 ">
        <Label className="text-dark-text text-lg">Notifications</Label>
        <DropdownMenuGroup className="max-h-96 overflow-y-auto w-[400px]">
          {notifications.map((notif) => (
            <DropdownMenuItem key={`${notif.delivered_at}-${notif.notification_id}`} className="p-0">
              <NotificationItem notification={notif} />
            </DropdownMenuItem>
          ))}
          {notifications.length === 0 && (
            <div className="flex flex-col justify-center items-center w-full py-12">
              <img src={emptyNotification} className="object-contain" />
              <div className="flex flex-col items-center mt-4">
                <h3 className="text-dark-text font-semibold">No Notification</h3>
                <p className="block max-w-72 text-sm text-dark-subtle text-center">
                  Nothing to see here — we'll let you know when something happens.
                </p>
              </div>
            </div>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
