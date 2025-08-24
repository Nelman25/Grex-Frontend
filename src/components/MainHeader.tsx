import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { PiPlus } from "react-icons/pi";
import { useLocation } from "react-router";
import { SidebarTrigger } from "./ui/sidebar";
import { unslugify } from "@/utils";
import { Button } from "./ui/button";
import { CiSettings } from "react-icons/ci";
import { FaBell } from "react-icons/fa";
import { NewProjectModal } from "../features/workspace/components/NewProjectModal";

export default function MainHeader() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <header className="w-full px-8 py-4 z-20 sticky top-0 right-0 border-b border-b-dark-muted bg-dark-bg flex items-center justify-between">
      <SidebarTrigger className="absolute top-5 left-0" />
      <Breadcrumb>
        <BreadcrumbList>
          {pathnames.map((path, index) => {
            const lastIndex = pathnames.length - 1;
            const isLast = lastIndex === index;

            return (
              <>
                <BreadcrumbItem
                  key={path}
                  className={`${isLast && "font-semibold text-dark-text"}`}
                >
                  {unslugify(path)}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex space-x-4 items-center">
        <NewProjectModal>
          <Button className="flex space-x-2 items-center font-inter bg-brand-primary hover:bg-brand-light">
            <PiPlus />
            <span>New Project</span>
          </Button>
        </NewProjectModal>
        <FaBell />
        <CiSettings />
      </div>
    </header>
  );
}
