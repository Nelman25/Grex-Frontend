export interface Notification {
  notification_id: number;
  user_id: number;
  recipient_id: number;
  content: string;
  is_read: boolean;
  delivered_at: string;
  workspace_name: string;
}
