import { Button } from "@/components/ui/button";
import ProjectDetails from "./ProjectDetails";
import WorkspaceMembers from "./WorkspaceMembers";
import addPeople from "@/assets/bi_person-add.svg";

export default function WorkspaceHeader() {
  return (
    <header className="w-full grid grid-cols-1 p-4">
      <div className="flex justify-between">
        <ProjectDetails />
        <div className="flex space-x-4 items-center">
          <WorkspaceMembers />
          <Button className="bg-brand-primary hover:bg-brand-light">
            <img src={addPeople} alt="invite icon" />
            <span>Invite</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
