import PageLoader from "@/components/PageLoader";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatContainer from "@/features/chat/components/ChatContainer";
import KanbanContainer from "@/features/tasks/components/kanban/KanbanContainer";
import TaskList from "@/features/tasks/components/list/TaskList";
import { TabsContent } from "@radix-ui/react-tabs";
import { CiBoxList, CiCalendar } from "react-icons/ci";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { LuMessagesSquare } from "react-icons/lu";
import { TbLayoutKanbanFilled } from "react-icons/tb";
import { useParams } from "react-router";
import { useFetchWorkspaceQuery } from "../hooks/queries/useFetchWorkspaceQuery";
import CalendarContainer from "./CalendarContainer";
import WorkspaceOverview from "./WorkspaceOverview";

export default function WorkspaceContainer() {
  const { workspace_id } = useParams();
  const { data: project, isPending, error } = useFetchWorkspaceQuery(Number(workspace_id));

  if (isPending) return <PageLoader />;
  if (error) return <div className="text-error">{error.message}</div>; // temporary
  if (!project) return; // TODO: Better fallback

  return (
    <div className="rounded-sm m-4 min-h-[850px] flex flex-col">
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
          <TabsContent className="h-full" value="Overview">
            <WorkspaceOverview />
          </TabsContent>
          <TabsContent className="h-full" value="Kanban">
            <KanbanContainer />
          </TabsContent>
          <TabsContent className="h-full" value="List">
            <TaskList />
          </TabsContent>
          <TabsContent className="h-full" value="Calendar">
            <CalendarContainer />
          </TabsContent>
          <TabsContent value="Messages" className="flex-1 h-full">
            <ChatContainer />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
