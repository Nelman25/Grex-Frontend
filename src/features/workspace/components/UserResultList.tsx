import type { User } from "@/types/user";
import UserResultItem from "./UserResultItem";

type Props = {
  users: User[];
};

export default function UserResultList({ users }: Props) {
  return (
    <div className="w-full max-h-[300px] overflow-y-scroll">
      {users.map((user) => (
        <UserResultItem key={user.email} user={user} />
      ))}
    </div>
  );
}
