import ProjectDetails from "./ProjectDetails";
import WorkspaceMembers from "./WorkspaceMembers";
import addPeople from "@/assets/bi_person-add.svg";
import InviteWorkspaceMemberModal from "./InviteWorkspaceMemberModal";

export default function WorkspaceHeader() {
  return (
    <header className="w-full grid grid-cols-1 p-4">
      <div className="flex justify-between">
        <ProjectDetails />
        <div className="flex space-x-4 items-center">
          <WorkspaceMembers />
          <InviteWorkspaceMemberModal>
            <div className="bg-brand-primary hover:bg-brand-light flex space-x-2 px-4 py-1 rounded items-center">
              <img src={addPeople} alt="invite icon" />
              <span className="text-dark-muted">Add people</span>
            </div>
          </InviteWorkspaceMemberModal>
        </div>
      </div>
    </header>
  );
}
