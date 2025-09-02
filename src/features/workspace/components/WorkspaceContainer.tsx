import PageLoader from "@/components/PageLoader";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/auth-context";
import KanbanContainer from "@/features/tasks/components/kanban/KanbanContainer";
import { TabsContent } from "@radix-ui/react-tabs";
import { CiBoxList, CiCalendar } from "react-icons/ci";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { LuMessagesSquare } from "react-icons/lu";
import { TbLayoutKanbanFilled } from "react-icons/tb";
import { useParams } from "react-router";
import { useFetchWorkspaceQuery } from "../hooks/queries/useFetchWorkspaceQuery";
import CalendarContainer from "./CalendarContainer";
import WorkspaceHeader from "./WorkspaceHeader";

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
            <TabsTrigger value="Overview">
              <HiOutlineClipboardDocumentList />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="Kanban">
              <TbLayoutKanbanFilled />
              <span>Kanban</span>
            </TabsTrigger>
            <TabsTrigger value="List">
              <CiBoxList />
              <span>List</span>
            </TabsTrigger>
            <TabsTrigger value="Calendar">
              <CiCalendar />
              <span>Calendar</span>
            </TabsTrigger>
            <TabsTrigger value="Messages">
              <LuMessagesSquare />
              <span>Messages</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Kanban">
            <KanbanContainer />
          </TabsContent>
          <TabsContent value="Calendar">
            <CalendarContainer />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
