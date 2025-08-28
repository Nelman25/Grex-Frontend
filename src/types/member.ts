export interface WorkspaceMember {
  user_id: number;
  role: "leader" | "member";
  nickname: string;
  joined_at: string; // ISO datetime
  first_name: string;
  last_name: string;
  email: string;
  profile_picture: string | null;
  status: string | null;
}
