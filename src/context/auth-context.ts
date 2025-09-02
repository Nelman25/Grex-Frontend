import { createContext, useContext } from "react";
import type { IUser } from "./AuthProvider";
import type { IUserCredentials } from "@/types";

interface AuthContextType {
  token: string | null;
  user: IUser | null;
  setToken: (value: React.SetStateAction<string | null>) => void;
  setUser: (value: React.SetStateAction<IUser | null>) => void;
  login: (credentials: IUserCredentials) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return authContext;
};
