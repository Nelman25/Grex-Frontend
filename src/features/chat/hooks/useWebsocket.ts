import { useEffect, useRef, useCallback } from "react";
import { useChatStore } from "@/stores/useChatStore";
import type { OutgoingChatMessage, IncomingChatMessage } from "@/types/chat";

interface UseWebsocketProps {
  workspaceId: number;
  userId: number;
}

export const useWebsocket = ({ workspaceId, userId }: UseWebsocketProps) => {
  const ws = useRef<WebSocket | null>(null);
  const addMessage = useChatStore((state) => state.addMessage);
  const setConnectionStatus = useChatStore(
    (state) => state.setConnectionStatus
  );

  const reconnectAttempts = useRef(0);
const maxReconnectAttempts = 5;

  const connect = useCallback(() => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      console.log("Websocket already open, skipping new connection");
      return;
    }

    try {
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const wsUrl = `${protocol}//localhost:8000/workspace/${workspaceId}/${userId}`;

      ws.current = new WebSocket(wsUrl);

      ws.current.onopen = () => {
        console.log("Websocket connected!");
        setConnectionStatus(true);
        reconnectAttempts.current = 0;
      };

      ws.current.onmessage = (event) => {
        try {
          const message: IncomingChatMessage = JSON.parse(event.data);
          console.log(message);
          addMessage(message);
        } catch (error) {
          console.error("Error parsing websocket message.", error);
        }
      };

      ws.current.onclose = () => {
        console.log("Websocket disconnected.");
        setConnectionStatus(false);

        if (reconnectAttempts.current < maxReconnectAttempts) {
          const delay = Math.pow(2, reconnectAttempts.current) * 1000;
          reconnectAttempts.current += 1;
          setTimeout(() => connect(), delay);
        }
      };

      ws.current.onerror = (error) => {
        console.error("Websocket error: ", error);
      };
    } catch (error) {
      console.error("Failed to establish websocket connection.", error);
    }
  }, [addMessage, setConnectionStatus, userId, workspaceId]);

  const sendMessage = useCallback((message: OutgoingChatMessage) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
      return true;
    } else {
      console.error("Websocket is not connected.");
      return false;
    }
  }, []);

  const disconnect = useCallback(() => {
    if (ws.current) {
      ws.current.close();
      ws.current = null;
    }
  }, []);

  useEffect(() => {
    connect();

    return () => disconnect();
  }, [connect, disconnect]);

  return { sendMessage, disconnect };
};
