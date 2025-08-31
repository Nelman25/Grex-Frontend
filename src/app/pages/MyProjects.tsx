import { useAuth } from "@/context/auth-context";

export default function MyProjects() {
  const { user } = useAuth();

  console.log(user);
  return (
    <div>
      <h1>This is the My Projects page</h1>
      <p>
        {user?.first_name} {user?.last_name}
      </p>
    </div>
  );
}
