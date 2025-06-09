import { Instance, types } from "mobx-state-tree"

export const ProjectStage = {
  PLANNING: "планування",
  DEVELOPMENT: "розробка",
  BETA_TEST: "бета-тест",
  ALPHA_TEST: "альфа-тест",
  PRODUCTION: "продакшн",
} as const

export type ProjectStageType = (typeof ProjectStage)[keyof typeof ProjectStage]

export const ProjectModel = types
  .model("Project", {
    id: types.identifier,
    name: types.string,
    status: types.string,
    description: types.string,
    stage: types.enumeration<ProjectStageType>(Object.values(ProjectStage)),
    customerCompany: types.string,
    executorCompany: types.string,
    functions: types.array(types.string),
    expectedResult: types.string,
    createdAt: types.Date,
    updatedAt: types.Date,
  })
  .actions((self) => ({
    updateStage(newStage: ProjectStageType) {
      self.stage = newStage
      self.updatedAt = new Date()
    },
    updateStatus(newStatus: string) {
      self.status = newStatus
      self.updatedAt = new Date()
    },
    addFunction(func: string) {
      self.functions.push(func)
      self.updatedAt = new Date()
    },
    removeFunction(func: string) {
      const index = self.functions.indexOf(func)
      if (index > -1) {
        self.functions.splice(index, 1)
        self.updatedAt = new Date()
      }
    },
  }))

export interface Project extends Instance<typeof ProjectModel> {}

export const createProject = (
  data: Omit<Project, "id" | "createdAt" | "updatedAt"> & { functions: string[] },
) => {
  return ProjectModel.create({
    ...data,
    id: Math.random().toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
  })
}
