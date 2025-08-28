import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkspaceHeader from "./WorkspaceHeader";
import { TbLayoutKanbanFilled } from "react-icons/tb";
import { CiBoxList, CiCalendar } from "react-icons/ci";
import { TabsContent } from "@radix-ui/react-tabs";
import KanbanContainer from "@/features/tasks/components/kanban/KanbanContainer";
// import { useParams } from "react-router";
import { MOCK_SPECIFIC_WORKSPACE } from "@/mocks/projects";

export default function WorkspaceContainer() {
  // TODO: Actual data fetching for the selected project
  // endpoint -> /workspace/${workspace_id}/${user_id}
  // query keys = ["workspace", { workspace_id }]

  // const { workspace_id } = useParams();
  const project = MOCK_SPECIFIC_WORKSPACE;
  // const projects = useProjectStore((state) => state.projects);
  // const project = projects.find((p) => p.workspace_id === Number(workspace_id));

  if (!project) return; // TODO: Better fallback

  return (
    <div className="bg-dark-surface border border-dark-muted rounded-sm m-8">
      <WorkspaceHeader />

      <div className="px-7">
        <Tabs className="" defaultValue="Kanban">
          <TabsList className="border border-dark-muted">
            <TabsTrigger value="Kanban">
              <TbLayoutKanbanFilled />
              <span>Kanban</span>
            </TabsTrigger>
            <TabsTrigger value="Calendar">
              <CiCalendar />
              <span>Calendar</span>
            </TabsTrigger>
            <TabsTrigger value="List">
              <CiBoxList />
              <span>List</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Kanban">
            <KanbanContainer />
          </TabsContent>
          <TabsContent value="Calendar">Calendar</TabsContent>
          <TabsContent value="List">List</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
