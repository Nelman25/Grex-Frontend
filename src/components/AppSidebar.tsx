import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SIDEBAR_ITEMS } from "@/constants";
import { useAuth } from "@/context/auth-context";
import { useFetchAllWorkspacesQuery } from "@/features/workspace/hooks/queries/useFetchAllWorkspacesQuery";
import { GoPlus } from "react-icons/go";
import { IoIosHelpCircleOutline, IoIosInformationCircleOutline } from "react-icons/io";
import { Navigate, useLocation, useNavigate, useParams } from "react-router";
import slugify from "slugify";
import UserAvatar from "./UserAvatar";
import { NewProjectModal } from "@/features/workspace/components/NewProjectModal";
import { UserDropdown } from "./UserDropdown";
import { useFetchUserProfileQuery } from "@/hooks/queries/useFetchUserProfileQuery";

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = location.pathname.split("/")[1];
  const { workspace_name: activeProject } = useParams();
  const { user } = useAuth();
  const { data: userProfile } = useFetchUserProfileQuery(user?.user_id);

  const { data: projects } = useFetchAllWorkspacesQuery(user?.user_id);

  if (!user) return <Navigate to="/auth/signin" />;

  const handleSelectTab = (item: string) => {
    navigate(`/${slugify(item, { lower: true })}`);
  };

  const handleSelectActiveProject = (projectId: number, projectName: string) => {
    navigate(`/my-projects/${projectId}/${slugify(projectName, { lower: true })}`);
  };

  const getActiveClass = (tab: string) => {
    return activeTab === slugify(tab, { lower: true }) ? "text-brand-primary" : "text-white";
  };

  const getActiveProjectClass = (projectName: string) => {
    return activeProject === slugify(projectName, { lower: true }) ? "text-brand-primary" : "text-white";
  };

  return (
    <Sidebar variant="sidebar" className="border-r border-r-dark-muted font-inter">
      <SidebarHeader className="border-b border-b-dark-muted">
        <UserDropdown>
          <div className="w-full flex space-x-3 rounded">
            <UserAvatar
              name={userProfile?.first_name + " " + userProfile?.last_name}
              photoUrl={userProfile?.profile_picture ?? undefined}
              className="size-10"
            />
            <div>
              <h3 className="font-medium text-sm text-dark-text truncate max-w-[20ch]">
                {user?.first_name ?? "Jonel"} {user?.last_name ?? "Villaver"}
              </h3>
              <h4 className="text-sm text-dark-subtle truncate max-w-[20ch]">{user?.email}</h4>
            </div>
          </div>
        </UserDropdown>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm">Main Menu</SidebarGroupLabel>
          <SidebarGroupContent className="border-b border-b-dark-muted pb-4">
            <SidebarMenu>
              {SIDEBAR_ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton onClick={() => handleSelectTab(item.title)}>
                    <item.icon className={getActiveClass(item.title)} />
                    <span className={getActiveClass(item.title)}>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupLabel className="text-sm mt-2 flex justify-between items-center">
            <span>Your Projects</span>
            <NewProjectModal>
              <button>
                <GoPlus />
              </button>
            </NewProjectModal>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects?.map((project) => (
                <SidebarMenuItem key={project.workspace_id}>
                  <SidebarMenuButton onClick={() => handleSelectActiveProject(project.workspace_id, project.name)}>
                    <UserAvatar name={project.name} photoUrl={project.workspace_profile_url ?? ""} className="size-6" />
                    <span className={getActiveProjectClass(project.name)}>{project.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-3">
            <IoIosInformationCircleOutline className="size-6" />
            <span>About</span>
          </div>
          <div className="flex items-center space-x-3">
            <IoIosHelpCircleOutline className="size-6" />
            <span>Help & Support</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
