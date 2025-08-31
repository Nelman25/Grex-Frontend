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
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { SIDEBAR_ITEMS } from "@/constants";
import {
  IoIosHelpCircleOutline,
  IoIosInformationCircleOutline,
} from "react-icons/io";
import profile from "@/assets/sample_profile.svg";
import { useAuth } from "@/context/auth-context";
import { Navigate, useLocation, useNavigate, useParams } from "react-router";
import slugify from "slugify";
import { useUserWorkspaces } from "@/features/workspace/hooks/queries/useUserWorkspaces";
import PageLoader from "./PageLoader";

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = location.pathname.split("/")[1];
  const { workspace_name: activeProject } = useParams();
  const { user } = useAuth();

  const { data: projects, isLoading } = useUserWorkspaces(user?.user_id);

  if (!user) return <Navigate to="/auth/signin" />;

  const handleSelectTab = (item: string) => {
    navigate(`/${slugify(item, { lower: true })}`);
  };

  const handleSelectActiveProject = (
    projectId: number,
    projectName: string
  ) => {
    navigate(
      `/my-projects/${projectId}/${slugify(projectName, { lower: true })}`
    );
  };

  const getActiveClass = (tab: string) => {
    return activeTab === slugify(tab, { lower: true })
      ? "text-brand-primary"
      : "text-white";
  };

  const getActiveProjectClass = (projectName: string) => {
    return activeProject === slugify(projectName, { lower: true })
      ? "text-brand-primary"
      : "text-white";
  };

  return (
    <Sidebar
      variant="sidebar"
      className="border-r border-r-dark-muted font-inter"
    >
      <SidebarHeader className="border-b border-b-dark-muted">
        <div className="w-full flex space-x-3 rounded">
          <img
            src={profile}
            className="size-13 rounded"
            alt="profile picture"
          />
          <div>
            <h3 className="font-medium text-dark-text">
              {user?.first_name ?? "Jonel"} {user?.last_name ?? "Villaver"}
            </h3>
            <h4 className="text-sm text-dark-subtle">
              {user?.email ?? "jonelvillaver@gmail.com"}
            </h4>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_ITEMS.map((item) =>
                item.collapsible ? (
                  <Collapsible
                    key={item.title}
                    defaultOpen
                    className="group/collapsible"
                  >
                    <CollapsibleTrigger
                      onClick={() => handleSelectTab(item.title)}
                      className="flex items-center space-x-3 px-2"
                    >
                      <item.icon className={getActiveClass(item.title)} />
                      <span className={getActiveClass(item.title)}>
                        {item.title}
                      </span>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {isLoading && <PageLoader />}
                        {projects &&
                          projects.map((project) => (
                            <SidebarMenuButton key={project.name}>
                              <SidebarMenuSubItem
                                onClick={() =>
                                  handleSelectActiveProject(
                                    project.workspace_id,
                                    project.name
                                  )
                                }
                                className={`truncate text-white ${getActiveProjectClass(
                                  project.name
                                )}`}
                              >
                                {project.name}
                              </SidebarMenuSubItem>
                            </SidebarMenuButton>
                          ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => handleSelectTab(item.title)}
                    >
                      <item.icon className={getActiveClass(item.title)} />
                      <span className={getActiveClass(item.title)}>
                        {item.title}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
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
