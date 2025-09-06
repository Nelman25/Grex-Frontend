import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessageList from "./ChatMessageList";

export default function ChatContainer() {
  return (
    <div className="bg-dark-surface border border-dark-muted rounded-sm relative shadow h-full flex flex-col flex-1 w-full">
      <ChatHeader />
      <ChatMessageList />
      <ChatInput />
    </div>
  );
}
