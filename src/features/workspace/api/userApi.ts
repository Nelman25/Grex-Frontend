import api from "@/lib/axios";
import type { User } from "@/types/user";

export const getUsers = async (name: string) => {
  const { data } = await api.get<User[]>("/users/search", { params: { name } });

  return data;
};

export const inviteUserToWorkspace = async (
  workspace_id: number,
  email: string
) => {
  await api.post(`workspace/${workspace_id}/members?email=${email}`);
};
