import PageLoader from "@/components/PageLoader";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthProvider";
import WorkspaceContainer from "@/features/workspace/components/WorkspaceContainer";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Landing = lazy(() => import("./pages/Landing"));
const Signup = lazy(() => import("@/features/auth/pages/Signup"));
const Signin = lazy(() => import("@/features/auth/pages/Signin"));
const AppLayout = lazy(() => import("../components/AppLayout"));
const MyTasks = lazy(() => import("./pages/MyTasks"));
const MyProjects = lazy(() => import("./pages/MyProjects"));
const MyCalendar = lazy(() => import("./pages/MyCalendar"));

const withSuspense = (node: React.ReactElement) => (
  <Suspense fallback={<PageLoader />}>{node}</Suspense>
);

export default function App() {
  const router = createBrowserRouter([
    { index: true, element: withSuspense(<Landing />) },
    {
      path: "/auth",
      children: [
        { path: "signup", element: withSuspense(<Signup />) },
        { path: "signin", element: withSuspense(<Signin />) },
      ],
    },
    {
      path: "/",
      element: withSuspense(<AppLayout />),
      children: [
        { path: "dashboard", element: withSuspense(<Dashboard />) },
        { path: "my-tasks", element: withSuspense(<MyTasks />) },
        { path: "calendar", element: withSuspense(<MyCalendar />) },
        { path: "messages", element: withSuspense(<div>messages</div>) },
        {
          path: "my-projects",
          children: [
            { index: true, element: withSuspense(<MyProjects />) },
            {
              path: ":workspace_id/:workspace_name",
              element: withSuspense(<WorkspaceContainer />),
            },
          ],
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}
