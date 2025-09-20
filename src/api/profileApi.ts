import api from "@/lib/axios";
import type { EditUser, User } from "@/types/user";

export const getUserProfile = async (user_id: number): Promise<User> => {
  const { data } = await api.get<User>(`/user/${user_id}/profile`);
  return data;
};

export const editUserProfile = async (user_id: number, payload: EditUser): Promise<void> => {
  await api.patch(`/user/${user_id}/profile`, payload);
};
