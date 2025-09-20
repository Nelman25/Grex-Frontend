import type { User } from "@/types/user";
import UserResultItem from "./UserResultItem";
import { useFetchWorkspaceMembersQuery } from "../hooks/queries/useFetchWorkspaceMembersQuery";
import { useParams } from "react-router";

type Props = {
  users: User[];
};

export default function UserResultList({ users }: Props) {
  const { workspace_id } = useParams();
  const { data: members = [] } = useFetchWorkspaceMembersQuery(Number(workspace_id));

  const isMember = (member: User) => {
    return members.some((m) => m.user_id === member.user_id);
  };

  return (
    <div className="w-full max-h-[300px] overflow-y-scroll">
      {users.map((user) => (
        <UserResultItem key={user.email} user={user} isMember={isMember(user)} />
      ))}
    </div>
  );
}
