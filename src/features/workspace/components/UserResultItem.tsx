import UserAvatar from "@/components/UserAvatar";
import type { User } from "@/types/user";
import { useInviteUserMutation } from "../hooks/mutations/useInviteUserMutation";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

export default function UserResultItem({ user }: { user: User }) {
  // TODO: Request for adding member to the workspace when clicked invite button
  const fullname = user.first_name + " " + user.last_name;
  const { workspace_id } = useParams();
  const { mutate, error, isPending, isSuccess } = useInviteUserMutation(
    Number(workspace_id),
    user.email
  );

  if (error) toast(error.message);

  return (
    <div className="flex items-center justify-between px-4 hover:bg-dark-subtle/20 mb-4 transition rounded">
      <div className="flex gap-4 items-center">
        <UserAvatar
          name={fullname}
          photoUrl={user.profile_picture ?? undefined}
          className="size-9 self-center"
        />
        <div className="">
          <h3 className="text-dark-text font-medium">{fullname}</h3>
          <span className="text-sm text-dark-subtle">{user.email}</span>
        </div>
      </div>
      <Button
        onClick={() => mutate()}
        className={`bg-brand-primary px-4 py-1 rounded text-dark-muted hover:bg-brand-light flex space-x-2 ${
          isSuccess && "bg-success"
        }`}
        disabled={isPending}
      >
        {!isPending && !isSuccess && "Invite"}
        {isPending && (
          <>
            <Loader2Icon className="animate-spin" />
            <span>Sending invite...</span>
          </>
        )}
        {isSuccess && "Invited"}
      </Button>
    </div>
  );
}
