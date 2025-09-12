import addPeople from "@/assets/bi_person-add.svg";
import PageLoader from "@/components/PageLoader";
import UserAvatars from "@/components/UserAvatars";
import { useAuth } from "@/context/auth-context";
import { useParams } from "react-router";
import { toast } from "sonner";
import { useFetchWorkspaceQuery } from "../hooks/queries/useFetchWorkspaceQuery";
import InviteWorkspaceMemberModal from "./InviteWorkspaceMemberModal";
import ProjectDetails from "./ProjectDetails";

export default function WorkspaceHeader() {
  const { user } = useAuth();
  const { workspace_id } = useParams();
  const {
    data: project,
    isPending,
    error,
  } = useFetchWorkspaceQuery(Number(workspace_id), user?.user_id);

  if (isPending) return <PageLoader />;
  if (!project) return; // TODO: better fallback
  if (error) toast(error.message);

  const members = project?.members.map((member) => ({
    avatar: member.profile_picture,
    name: member.first_name + " " + member.last_name,
  }));

  return (
    <header className="w-full grid grid-cols-1 p-4">
      <div className="flex justify-between">
        <ProjectDetails project={project} />
        <div className="flex space-x-4 items-center">
          <UserAvatars users={members} />
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
