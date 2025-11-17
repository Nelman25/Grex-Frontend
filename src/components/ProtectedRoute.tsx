import { useAuth } from "@/features/auth/hooks/auth-context";
import { type PropsWithChildren } from "react";
import { Navigate } from "react-router";
import PageLoader from "./PageLoader";

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const { user, isLoading } = useAuth();

  if (!user) return <Navigate to="/auth/signin" replace />;
  if (isLoading) return <PageLoader />;

  return children;
}
