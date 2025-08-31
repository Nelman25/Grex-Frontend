import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkspaceHeader from "./WorkspaceHeader";
import { TbLayoutKanbanFilled } from "react-icons/tb";
import { CiBoxList, CiCalendar } from "react-icons/ci";
import { TabsContent } from "@radix-ui/react-tabs";
import KanbanContainer from "@/features/tasks/components/kanban/KanbanContainer";
import { useFetchWorkspaceQuery } from "../hooks/queries/useFetchWorkspaceQuery";
import { useAuth } from "@/context/auth-context";
import { useParams } from "react-router";
import PageLoader from "@/components/PageLoader";

export default function WorkspaceContainer() {
  const { user } = useAuth();
  const { workspace_id } = useParams();
  const {
    data: project,
    isPending,
    error,
  } = useFetchWorkspaceQuery(Number(workspace_id), user?.user_id);

  if (isPending) return <PageLoader />;
  if (error) return <div className="text-error">{error.message}</div>; // temporary
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
