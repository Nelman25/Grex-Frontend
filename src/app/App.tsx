import { QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router";
import { queryClient } from "@/lib/queryClient";
import Landing from "./pages/Landing";

export default function App() {
  const router = createBrowserRouter([
    {
      index: true,
      element: <Landing />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
