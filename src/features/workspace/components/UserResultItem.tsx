import UserAvatar from "@/components/UserAvatar";
import type { User } from "@/types/user";

export default function UserResultItem({ user }: { user: User }) {
  // TODO: Request for adding member to the workspace when clicked invite button
  const fullname = user.first_name + " " + user.last_name;

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
      <button className="bg-brand-primary px-4 py-1 rounded text-dark-muted hover:bg-brand-light">
        Invite
      </button>
    </div>
  );
}
