import { QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router";
import { queryClient } from "@/lib/queryClient";
import Landing from "./pages/Landing";
import Signin from "@/features/auth/pages/Signin";
import Signup from "@/features/auth/pages/Signup";
import { AuthProvider } from "@/context/AuthProvider";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const router = createBrowserRouter([
    {
      index: true,
      element: <Landing />,
    },
    {
      path: "/auth",
      children: [
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "signin",
          element: <Signin />,
        },
      ],
    },
    { path: "/dashboard", element: <Dashboard /> },
  ]);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
}
