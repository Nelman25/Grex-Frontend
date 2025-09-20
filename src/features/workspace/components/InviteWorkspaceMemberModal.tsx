import PageLoader from "@/components/PageLoader";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDebounce } from "@/hooks/useDebounce";
import { useState, type PropsWithChildren } from "react";
import { useUserSearch } from "../hooks/queries/useUserSearch";
import ShareWorkspaceLink from "./ShareWorkspaceLink";
import UserResultList from "./UserResultList";

type Props = PropsWithChildren & {};

export default function InviteWorkspaceMemberModal({ children }: Props) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const { data: users = [], error, isLoading } = useUserSearch(debouncedQuery);

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="p-6">
        <DialogHeader className="border-b border-b-dark-muted pb-4">
          <DialogTitle>Add People to Your Workspace</DialogTitle>
          <DialogDescription>Invite people to collaborate by searching for their name or email address.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
          <Label>Enter name or email </Label>
          <Input value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>

        {isLoading && <PageLoader />}
        {error && <p className="text-sm text-error">{error.message}</p>}
        {users && (
          <div className="border-b border-b-dark-muted pb-2">
            <UserResultList users={users} />
          </div>
        )}

        <ShareWorkspaceLink />
      </DialogContent>
    </Dialog>
  );
}
