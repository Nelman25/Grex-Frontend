import PageLoader from "@/components/PageLoader";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/auth-context";
import ChatContainer from "@/features/chat/components/ChatContainer";
import KanbanContainer from "@/features/tasks/components/kanban/KanbanContainer";
import { TabsContent } from "@radix-ui/react-tabs";
import { CiBoxList, CiCalendar } from "react-icons/ci";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { LuMessagesSquare } from "react-icons/lu";
import { TbLayoutKanbanFilled } from "react-icons/tb";
import { useParams } from "react-router";
import { useFetchWorkspaceQuery } from "../hooks/queries/useFetchWorkspaceQuery";
import CalendarContainer from "./CalendarContainer";

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
    <div className=" rounded-sm p-4 max-h-screen h-full w-full overflow-y-clip">
      <div className=" h-full">
        <Tabs className="h-full" defaultValue="Kanban">
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
          <TabsContent className="h-full" value="Kanban">
            <KanbanContainer />
          </TabsContent>
          <TabsContent className="h-full" value="Calendar">
            <CalendarContainer />
          </TabsContent>
          <TabsContent className="h-full" value="Messages">
            <ChatContainer />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
