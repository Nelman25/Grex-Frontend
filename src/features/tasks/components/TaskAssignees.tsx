import { Label } from "@radix-ui/react-label";
import { BiPlus } from "react-icons/bi";
import { IoPeopleSharp } from "react-icons/io5";
import { useFetchTaskAssigneesQuery } from "../hooks/queries/useFetchTaskAssigneesQuery";
import AssigneeItem from "./AssigneeItem";
import MembersCombobox from "./MembersCombobox";
import { useState } from "react";

export default function TaskAssignees({ id }: { id: number }) {
  const [open, setOpen] = useState(false);
  const { data: tasksAssignees } = useFetchTaskAssigneesQuery(id);

  if (!tasksAssignees) return <p>No assignees yet.</p>;

  return (
    <div className="flex space-x-2 items-center">
      <div className="flex min-w-28 items-center space-x-2 mb-2 text-sm">
        <IoPeopleSharp />
        <Label>Assignee/s</Label>
      </div>

      <div className="flex max-w-[400px] overflow-x-auto gap-2 no-scrollbar items-center">
        <MembersCombobox id={id} open={open} setOpen={setOpen}>
          <div className="p-1 rounded-full hover:bg-dark-surface bg-dark-muted flex justify-center items-center">
            <BiPlus />
          </div>
        </MembersCombobox>
        {tasksAssignees.map((assignee) => (
          <AssigneeItem key={assignee.user_id} assignee={assignee} id={id} />
        ))}
        {!tasksAssignees && <div className="text-sm">No assignees yet.</div>}
      </div>
    </div>
  );
}
