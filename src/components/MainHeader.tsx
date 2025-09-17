import { useAuth } from "@/context/auth-context";
import InviteWorkspaceMemberModal from "@/features/workspace/components/InviteWorkspaceMemberModal";
import WorkspaceMenu from "@/features/workspace/components/WorkspaceMenu";
import { useFetchWorkspaceQuery } from "@/features/workspace/hooks/queries/useFetchWorkspaceQuery";
import { formatDate } from "@/utils/index";
import { Bell, ExternalLink, Plus } from "lucide-react";
import { VscKebabVertical } from "react-icons/vsc";
import { useParams } from "react-router";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";
import UserAvatars from "./UserAvatars";
import NotificationContainer from "@/features/notification/components/NotificationContainer";

export default function MainHeader() {
  const { user } = useAuth();
  const { workspace_id } = useParams();
  const { data: project } = useFetchWorkspaceQuery(Number(workspace_id), user?.user_id);

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
          <h1 className="text-xl font-semibold text-dark-text">{project.name}</h1>

          <div className="flex space-x-4">
            <p className="text-sm">
              <span className="text-dark-subtle">Timeline: </span>
              <span>
                {formatDate(new Date(project.start_date))} - {formatDate(new Date(project.due_date))}
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
            <div className="size-[32px] rounded-full bg-dark-surface border flex items-center justify-center hover:bg-dark-muted transition-colors">
              <Plus className="size-4" />
            </div>
          </InviteWorkspaceMemberModal>

          <NotificationContainer>
            <div className="size-8 flex items-center justify-center rounded  bg-dark-surface hover:bg-dark-muted border">
              <Bell className="size-4 text-dark-text/60" />
            </div>
          </NotificationContainer>

          <div className="w-[1px] h-[60%] bg-dark-muted" />

          <Button className="bg-dark-surface hover:bg-dark-muted border flex items-center px-3 ">
            <ExternalLink className="size-4 text-dark-text/60" />
            <span className="text-dark-text">Share</span>
          </Button>

          <WorkspaceMenu>
            <div
              role="button"
              className="rounded-sm size-9 bg-dark-surface hover:bg-dark-muted border flex items-center justify-center transition-colors"
            >
              <VscKebabVertical className="text-dark-text/60" />
            </div>
          </WorkspaceMenu>
        </div>
      </div>
    </header>
  );
}
