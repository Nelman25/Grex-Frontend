import addPeople from "@/assets/bi_person-add.svg";
import { useAuth } from "@/context/auth-context";
import InviteWorkspaceMemberModal from "@/features/workspace/components/InviteWorkspaceMemberModal";
import { useFetchWorkspaceQuery } from "@/features/workspace/hooks/queries/useFetchWorkspaceQuery";
import { formatDate } from "@/utils/index";
import { GoKebabHorizontal } from "react-icons/go";
import { useParams } from "react-router";
import { SidebarTrigger } from "./ui/sidebar";
import UserAvatars from "./UserAvatars";

export default function MainHeader() {
  const { user } = useAuth();
  const { workspace_id } = useParams();
  const { data: project } = useFetchWorkspaceQuery(
    Number(workspace_id),
    user?.user_id
  );

  const members = project?.members.map((member) => ({
    avatar: member.profile_picture,
    name: member.first_name + " " + member.last_name,
  }));

  if (!project) return;

  return (
    <header className="w-full px-8 py-4 z-20 sticky top-0 right-0  bg-dark-bg flex items-center justify-between">
      <SidebarTrigger className="absolute top-5 left-0" />

      <div className="flex w-full justify-between pl-4">
        <div className="flex flex-col space-y-1">
          <div className="flex space-x-2 items-center">
            <h1 className="text-xl font-semibold text-dark-text">
              {project.name}
            </h1>
            <button className="size-3 flex items-center justify-center rounded-full border border-dark-subtle cursor-pointer">
              <GoKebabHorizontal className="text-dark-subtle size-2" />
            </button>
          </div>

          <div className="flex space-x-4">
            <p className="text-sm">
              <span className="text-dark-subtle">Timeline: </span>
              <span>
                {formatDate(project.start_date)} -{" "}
                {formatDate(project.due_date)}
              </span>
            </p>
            <p className="text-sm">
              <span className="text-dark-subtle">Status: </span>
              <span className="text-info font-medium">In Progress</span>
            </p>
          </div>
        </div>

        <div className="flex space-x-4 items-center">
          <UserAvatars users={members ?? []} />
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
