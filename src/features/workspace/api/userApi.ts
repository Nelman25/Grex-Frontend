import api from "@/lib/axios";
import { mockUsers } from "@/mocks/users";
import type { User } from "@/types/user";

export const getUsers = async (name: string) => {
  const { data } = await api.get<User[]>("/users/search", { params: { name } });

  return data;
};

export const inviteUserToWorkspace = async (workspace_id: number, email: string, added_by: number) => {
  await api.post(`workspace/${workspace_id}/members?email=${email}&added_by=${added_by}`);
};

export const seedUsers = async (): Promise<void> => {
  for (const user of mockUsers) {
    try {
      await api.post("/auth/sign-up", user);
      console.log(`✅ User "${user.first_name} ${user.last_name}" seeded`);
    } catch (error) {
      console.error(error);
    }
  }
};
