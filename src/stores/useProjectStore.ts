import { create } from "zustand";
import type { Project } from "@/types/project";
import { MOCK_PROJECTS } from "@/mocks/projects";

// I made this store for testing purposes only while the backend api for this is not yet ready
type ProjectStore = {
  projects: Project[];
  addProject: (project: Project) => void;
};

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: MOCK_PROJECTS,
  addProject: (project) => set({ projects: get().projects.concat(project) }),
}));
