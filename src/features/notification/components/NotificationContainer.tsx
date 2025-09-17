import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { PropsWithChildren } from "react";
import { useFetchNotificationsQuery } from "../hooks/useFetchNotificationsQuery";
import { useAuth } from "@/context/auth-context";
import { Label } from "@/components/ui/label";
import NotificationItem from "./NotificationItem";

type Props = PropsWithChildren & {};
export default function NotificationContainer({ children }: Props) {
  const { user } = useAuth();
  const { data: notifications = [] } = useFetchNotificationsQuery(user?.user_id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="p-4 ">
        <Label className="text-dark-text text-lg">Notifications</Label>
        <DropdownMenuGroup className="max-h-96 overflow-y-auto w-[400px]">
          {notifications.map((notif) => (
            <DropdownMenuItem>
              <NotificationItem notification={notif} />
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
