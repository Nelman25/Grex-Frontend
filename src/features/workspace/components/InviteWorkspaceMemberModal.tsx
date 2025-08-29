import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState, type PropsWithChildren } from "react";
import UserResultList from "./UserResultList";
import type { User } from "@/types/user";
import { useDebounce } from "@/hooks/useDebounce";
import { MOCK_USERS } from "@/mocks/users";
import ShareWorkspaceLink from "./ShareWorkspaceLink";

type Props = PropsWithChildren & {};

export default function InviteWorkspaceMemberModal({ children }: Props) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<User[]>([]);

  const debouncedQuery = useDebounce(query, 500);
  const users = MOCK_USERS;

  useEffect(() => {
    if (debouncedQuery.trim() === "" || query.trim() === "") {
      return setResult([]);
    }

    const filtered = users.filter(
      (u) =>
        u.first_name.trim().toLowerCase().includes(debouncedQuery) ||
        u.last_name.trim().toLowerCase().includes(debouncedQuery) ||
        u.email.trim().toLowerCase().includes(debouncedQuery)
    );

    setResult(filtered);
  }, [users, debouncedQuery, query]);

  // TODO: Request for querying users to add to the workspace
  // name it users

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="p-6">
        <DialogHeader className="border-b border-b-dark-muted pb-4">
          <DialogTitle>Add People to Your Workspace</DialogTitle>
          <DialogDescription>
            Invite people to collaborate by searching for their name or email
            address.
          </DialogDescription>
        </DialogHeader>

        {/* Input for searching a user to add  */}
        <div className="grid gap-2">
          <Label>Enter name or email </Label>
          <Input
            className=""
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Container for showing the result for searching users to add */}
        {result && (
          <div className="border-b border-b-dark-muted pb-2">
            <UserResultList users={result} />
          </div>
        )}

        <ShareWorkspaceLink />
      </DialogContent>
    </Dialog>
  );
}
