import addPeople from "@/assets/bi_person-add.svg";
import PageLoader from "@/components/PageLoader";
import UserAvatars from "@/components/UserAvatars";
import { useParams } from "react-router";
import { toast } from "sonner";
import { useFetchWorkspaceQuery } from "../hooks/queries/useFetchWorkspaceQuery";
import InviteWorkspaceMemberModal from "./InviteWorkspaceMemberModal";
import ProjectDetails from "./ProjectDetails";
import { useFetchWorkspaceMembersQuery } from "../hooks/queries/useFetchWorkspaceMembersQuery";

export default function WorkspaceHeader() {
  const { workspace_id } = useParams();
  const { data: project, isPending, error } = useFetchWorkspaceQuery(Number(workspace_id));
  const { data: members } = useFetchWorkspaceMembersQuery(Number(workspace_id));
  const membersAvatarAndName = members?.map((member) => ({
    avatar: member.profile_picture,
    name: member.first_name + " " + member.last_name,
  }));

  if (isPending) return <PageLoader />;
  if (!project) return; // TODO: better fallback
  if (error) toast(error.message);

  return (
    <header className="w-full grid grid-cols-1 p-4">
      <div className="flex justify-between">
        <ProjectDetails project={project} />
        <div className="flex space-x-4 items-center">
          <UserAvatars users={membersAvatarAndName ?? []} />
          <InviteWorkspaceMemberModal>
            <div className="bg-brand-primary hover:bg-brand-light flex space-x-2 px-4 py-1 rounded items-center">
              <img src={addPeople} alt="invite icon" />
              <span className="text-dark-muted">Add people</span>
            </div>
          </InviteWorkspaceMemberModal>
        </div>
      </div>
    </header>
  );
}
