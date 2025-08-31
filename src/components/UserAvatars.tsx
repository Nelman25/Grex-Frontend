import UserAvatar from "./UserAvatar";

type Props = {
  users: { name: string; avatar: string | null }[];
};

// TODO: improve this component by adding hover card to each avatar

export default function UserAvatars({ users }: Props) {
  const length = users.length;

  return (
    <div className="relative flex items-center">
      {users.slice(0, 5).map((user, index) => (
        <UserAvatar
          key={`${index}-${user.name}`}
          name={user.name}
          photoUrl={user.avatar || ""}
          className="border-2 border-dark-muted -ml-2 first:ml-0"
        />
      ))}
      {length > 5 && (
        <p className="text-sm ml-2 text-dark-subtle">+ {length - 5} more</p>
      )}
    </div>
  );
}
