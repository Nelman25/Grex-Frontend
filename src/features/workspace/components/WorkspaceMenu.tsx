import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, type PropsWithChildren } from "react";
import WorkspaceInfoDialog from "./WorkspaceInfoDialog";

type Props = PropsWithChildren & {};

export default function WorkspaceMenu({ children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setOpen(true)}>About Workspace</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {open && <WorkspaceInfoDialog open={open} onOpenChange={setOpen} />}
    </>
  );
}
