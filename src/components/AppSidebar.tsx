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
import { SIDEBAR_ITEMS } from "@/constants";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import {
  IoIosHelpCircleOutline,
  IoIosInformationCircleOutline,
} from "react-icons/io";
import profile from "@/assets/sample_profile.svg";

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar" className="border-r border-r-dark-muted">
      <SidebarHeader>
        <div className="w-full flex space-x-3 rounded">
          <img src={profile} alt="profile picture" />
          <div>
            <h3 className="font-medium text-dark-text">Nelman V. Ninjaboy</h3>
            <h4 className="text-sm text-dark-subtle">
              nelmanninjaboy@gmail.com
            </h4>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_ITEMS.map((item) => (
                <>
                  {item.collapsible ? (
                    <Collapsible defaultOpen className="group/collapsible">
                      <SidebarMenuItem key={item.title}>
                        <CollapsibleTrigger>
                          <SidebarMenuButton>
                            <div className="flex items-center space-x-2">
                              <item.icon />
                              <span>{item.title}</span>
                            </div>
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <SidebarMenuSub>
                            <SidebarMenuButton>
                              <SidebarMenuSubItem className="">
                                Grex - Collaboration Platform
                              </SidebarMenuSubItem>
                            </SidebarMenuButton>
                            <SidebarMenuButton>
                              <SidebarMenuSubItem>
                                Operating System Final Project
                              </SidebarMenuSubItem>
                            </SidebarMenuButton>
                            <SidebarMenuButton>
                              <SidebarMenuSubItem>
                                Machine Learning Final Paper
                              </SidebarMenuSubItem>
                            </SidebarMenuButton>
                            <SidebarMenuButton>
                              <SidebarMenuSubItem>
                                Automata Theory Final Paper
                              </SidebarMenuSubItem>
                            </SidebarMenuButton>
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <button>
                          <item.icon />
                          <span>{item.title}</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col space-y-4">
          <button className="flex space-x-3">
            <IoIosInformationCircleOutline className="size-6" />
            <span>About</span>
          </button>
          <button className="flex items-center space-x-3">
            <IoIosHelpCircleOutline className="size-6" />
            <span>Help & Support</span>
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
