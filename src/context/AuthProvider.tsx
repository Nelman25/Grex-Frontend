import { useState, useLayoutEffect, type PropsWithChildren } from "react";
import { AuthContext } from "./auth-context";
import api from "@/lib/axios";
import type { IUserCredentials } from "@/types";

export interface IUser {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  profile_picture: string;
  status: string;
  user_id: number;
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      config.headers.Authorization =
        !config._retry && token
          ? `Bearer ${token}`
          : config.headers.Authorization;
      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error?.response?.status === 401) {
          try {
            const response = await api.post("/auth/refresh", {
              email: user?.email,
            });

            setToken(response.data.token);

            originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
            originalRequest._retry = true;

            return api(originalRequest);
          } catch {
            setToken(null);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, [token, user?.email]);

  const login = async (credentials: IUserCredentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      setToken(response.data.access_token);
      setUser(response.data.user);
    } catch (error) {
      console.error(error); // TODO: Better error handling
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
