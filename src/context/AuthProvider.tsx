import { useState, useLayoutEffect, type PropsWithChildren } from "react";
import { AuthContext } from "./auth-context";
import api from "@/lib/axios";
import type { IUserCredentials } from "@/types";
import { Navigate } from "react-router";

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
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("access_token")
  );
  const [user, setUser] = useState<IUser | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

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
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem(
        "access_token",
        JSON.stringify(response.data.access_token)
      );
    } catch (error) {
      throw new Error(
        `Login failed, please check your credentials. \nError: ${
          (error as Error).message
        }`
      );
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    <Navigate to="/auth/signin" />;
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken, user, setUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
