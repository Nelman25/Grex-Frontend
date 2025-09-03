import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import NewTaskModal from "@/features/tasks/components/NewTaskModal";
import { BsSortDownAlt } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import { GoPlus } from "react-icons/go";

export default function MyProjects() {
  const { user } = useAuth();

  console.log(user);
  return (
    <div>
      <h1>This is the My Projects page</h1>
      <p>
        {user?.first_name} {user?.last_name}
      </p>
      <div className="flex space-x-2">
          <NewTaskModal>
            <Button className="text-sm bg-brand-primary hover:bg-brand-dark">
              <GoPlus />
              <span>Add New Task</span>
            </Button>
          </NewTaskModal>

          <Button className="bg-dark-muted hover:bg-dark-surface text-dark-text border border-dark-muted">
            <CiFilter />
            <span>Filter</span>
          </Button>
          <Button className="bg-dark-muted hover:bg-dark-surface text-dark-text border border-dark-muted">
            <BsSortDownAlt />
            <span>Sort by</span>
          </Button>
        </div>
    </div>
  );
}
