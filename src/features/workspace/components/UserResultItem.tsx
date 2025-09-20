import UserAvatar from "@/components/UserAvatar";
import type { User } from "@/types/user";
import { useInviteUserMutation } from "../hooks/mutations/useInviteUserMutation";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context";
import { getFullName } from "@/utils";

type Props = {
  user: User;
  isMember: boolean;
};

export default function UserResultItem({ user, isMember }: Props) {
  const { workspace_id } = useParams();
  const { user: userLoggedIn } = useAuth();
  const {
    mutate: inviteUser,
    isPending,
    isSuccess,
  } = useInviteUserMutation(Number(workspace_id), user.email, userLoggedIn?.user_id);

  const handleInviteUser = () => {
    inviteUser();
    toast.success(`Invitation sent to ${user.first_name} ${user.last_name}`);
  };

  return (
    <div className="flex items-center justify-between px-4 hover:bg-dark-subtle/20 mb-4 transition rounded">
      <UserInfo user={user} />
      <InviteButton isPending={isPending} isMember={isMember} isSuccess={isSuccess} onInvite={handleInviteUser} />
    </div>
  );
}

interface UserInfoProps {
  user: User;
}

function UserInfo({ user }: UserInfoProps) {
  const fullName = getFullName(user);

  return (
    <div className="flex gap-4 items-center">
      <UserAvatar name={fullName} photoUrl={user.profile_picture ?? undefined} className="size-9 self-center" />
      <div>
        <h3 className="text-dark-text font-medium">{fullName}</h3>
        <span className="text-sm text-dark-subtle">{user.email}</span>
      </div>
    </div>
  );
}

interface InviteButtonProps {
  isPending: boolean;
  isSuccess: boolean;
  isMember: boolean;
  onInvite: () => void;
}

function InviteButton({ isPending, isSuccess, isMember, onInvite }: InviteButtonProps) {
  const getButtonState = () => {
    if (isMember) return { text: "Member", disabled: true };
    if (isSuccess) return { text: "Invited", disabled: true };
    if (isPending) return { text: "Sending invite...", disabled: true };
    return { text: "Invite", disabled: false };
  };

  const buttonState = getButtonState();

  return (
    <Button
      onClick={onInvite}
      className={`bg-brand-primary px-4 py-1 rounded text-dark-muted hover:bg-brand-light flex space-x-2 ${
        isSuccess && "bg-success"
      }`}
      disabled={buttonState.disabled}
    >
      {isPending && <Loader2Icon className="animate-spin" />}
      <span>{buttonState.text}</span>
    </Button>
  );
}
