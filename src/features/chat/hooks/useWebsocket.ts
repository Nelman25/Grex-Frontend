import { useChatStore } from "@/stores/useChatStore";
import type { IncomingChatMessage, OutgoingChatMessage } from "@/types/chat";
import { handleIncomingMessage } from "@/utils";
import { useCallback, useEffect } from "react";

// THIS IS FOR HANDLING THE SINGLETON PATTERN PROPERLY
class WebSocketManager {
  private ws: WebSocket | null = null;
  private connectionCount = 0;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private currentWorkspaceId: number | null = null;
  private currentUserId: number | null = null;
  private setConnectionStatus: ((status: boolean) => void) | null = null;

  connect(workspaceId: number, userId: number, setConnectionStatusFn: (status: boolean) => void) {
    // STORE THE CONNECTION STATUS SETTER
    this.setConnectionStatus = setConnectionStatusFn;

    // IF WE ALREADY HAVE A CONNECTION FOR THE SAME WORKSPACE/USER, JUST INCREMENT COUNTER
    if (
      this.ws &&
      this.ws.readyState === WebSocket.OPEN &&
      this.currentWorkspaceId === workspaceId &&
      this.currentUserId === userId
    ) {
      this.connectionCount++;
      setConnectionStatusFn(true);
      return;
    }

    // CLOSE EXISTING CONNECTION IF WORKSPACE/USER CHANGED
    if (this.ws && (this.currentWorkspaceId !== workspaceId || this.currentUserId !== userId)) {
      this.ws.close();
      this.ws = null;
    }

    this.currentWorkspaceId = workspaceId;
    this.currentUserId = userId;

    try {
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const token = localStorage.getItem("access_token");
      const wsUrl = `${protocol}//localhost:8000/workspace/${workspaceId}/${userId}?token=${token}`;

      this.ws = new WebSocket(wsUrl);
      this.connectionCount = 1;

      this.ws.onopen = () => {
        console.log("WebSocket connected!");
        setConnectionStatusFn(true);
        this.reconnectAttempts = 0;
      };

      this.ws.onmessage = (event) => {
        try {
          const message: IncomingChatMessage = JSON.parse(event.data);
          useChatStore.getState().addMessage(message);

          const user = localStorage.getItem("user");
          // get user role, imma use string for now since I don't know where to get this from, will fix later

          // this should also check if the role is not falsy, add nalang later
          if (user) {
            handleIncomingMessage(message, userId, "member");
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      this.ws.onclose = () => {
        console.log("WebSocket disconnected.");
        setConnectionStatusFn(false);

        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          const delay = Math.pow(2, this.reconnectAttempts) * 1000;
          this.reconnectAttempts++;
          setTimeout(() => {
            this.connect(workspaceId, userId, setConnectionStatusFn);
          }, delay);
        } else {
          this.cleanup();
        }
      };

      this.ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    } catch (error) {
      console.error("Failed to establish WebSocket connection:", error);
    }
  }

  disconnect() {
    this.connectionCount--;

    if (this.connectionCount <= 0) {
      this.cleanup();
    }
  }

  private cleanup() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.connectionCount = 0;
    // this.listeners.clear();
    this.currentWorkspaceId = null;
    this.currentUserId = null;
    if (this.setConnectionStatus) {
      this.setConnectionStatus(false);
    }
  }

  sendMessage(message: OutgoingChatMessage): boolean {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
      return true;
    } else {
      console.error("WebSocket is not connected.");
      return false;
    }
  }
}

// singleton instacne
const wsManager = new WebSocketManager();

interface UseWebsocketProps {
  workspaceId: number;
  userId: number;
}

export const useWebsocket = ({ workspaceId, userId }: UseWebsocketProps) => {
  const addMessage = useChatStore((state) => state.addMessage);
  const setConnectionStatus = useChatStore((state) => state.setConnectionStatus);

  useEffect(() => {
    wsManager.connect(workspaceId, userId, setConnectionStatus);

    return () => {
      wsManager.disconnect();
    };
  }, [workspaceId, userId, addMessage, setConnectionStatus]);

  const sendMessage = useCallback((message: OutgoingChatMessage) => {
    return wsManager.sendMessage(message);
  }, []);

  return { sendMessage };
};
