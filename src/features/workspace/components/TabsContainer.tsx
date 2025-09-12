import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatContainer from "@/features/chat/components/ChatContainer";
import KanbanContainer from "@/features/tasks/components/kanban/KanbanContainer";
import { CiBoxList, CiCalendar } from "react-icons/ci";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { LuMessagesSquare } from "react-icons/lu";
import { TbLayoutKanbanFilled } from "react-icons/tb";
import CalendarContainer from "./CalendarContainer";

export default function TabsContainer() {
  return (
    <div>
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
