import { useChatStore } from "@/stores/useChatStore";
import type { IncomingChatMessage, OutgoingChatMessage } from "@/types/chat";
import { handleIncomingMessage } from "@/utils";
import { useCallback, useEffect } from "react";

// THIS IS FOR HANDLING THE SINGLETON PATTERN PROPERLY
class WebSocketManager {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private currentWorkspaceId: number | null = null;
  private currentUserId: number | null = null;
  private setConnectionStatus: ((status: boolean) => void) | null = null;

  connect(workspaceId: number, userId: number) {
    console.log("Attempting to connect WebSocket...");

    if (
      this.ws &&
      this.ws.readyState === WebSocket.OPEN &&
      this.currentWorkspaceId === workspaceId &&
      this.currentUserId === userId
    ) {
      console.log("_____WebSocket already connected._____");
      return;
    }

    // CLOSE EXISTING CONNECTION IF WORKSPACE/USER CHANGED
    if (this.ws && (this.currentWorkspaceId !== workspaceId || this.currentUserId !== userId)) {
      console.log("Closing existing WebSocket connection for different workspace/user.");
      console.log("Previous workspace:", this.currentWorkspaceId, "New workspace:", workspaceId);
      console.log("Previous user:", this.currentUserId, "New user:", userId);

      this.disconnect();
      return;
    }

    this.currentWorkspaceId = workspaceId;
    this.currentUserId = userId;

    console.log("Connecting to WebSocket for workspace:", workspaceId, "as user:", userId);

    try {
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const token = localStorage.getItem("access_token");
      const wsUrl = `${protocol}//localhost:8000/workspace/${workspaceId}/${userId}?token=${token}`;

      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log("WebSocket connected!");
        console.log("Connected to workspace:", workspaceId, "as user:", userId);
        this.reconnectAttempts = 0;
      };

      this.ws.onmessage = (event) => {
        try {
          if (!this.currentWorkspaceId || !this.currentUserId) {
            throw new Error("Workspace ID or User ID is not set.");
          }

          const message: IncomingChatMessage = JSON.parse(event.data);
          useChatStore.getState().addMessage(this.currentWorkspaceId, message);

          if (
            message.sender_id === this.currentUserId &&
            message.workspace_id === this.currentWorkspaceId &&
            message.type === "text"
          ) {
            handleIncomingMessage(message);
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      this.ws.onclose = () => {
        console.log("WebSocket disconnected.");

        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          const delay = Math.pow(2, this.reconnectAttempts) * 1000;
          this.reconnectAttempts++;
          setTimeout(() => {
            this.connect(workspaceId, userId);
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
    this.cleanup();
  }

  private cleanup() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
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
  useEffect(() => {
    wsManager.connect(workspaceId, userId);

    return () => {
      wsManager.disconnect();
    };
  }, [workspaceId, userId]);

  const sendMessage = useCallback((message: OutgoingChatMessage) => {
    return wsManager.sendMessage(message);
  }, []);

  return { sendMessage };
};
