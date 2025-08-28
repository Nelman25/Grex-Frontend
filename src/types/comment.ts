export interface NewComment {
  content: string;
  sender_id: number;
}

export interface Comment extends NewComment {
  comment_id: number;
  task_id: number;
  created_at: Date;
  profile_picture: string;
  sender_name: string; 
}
