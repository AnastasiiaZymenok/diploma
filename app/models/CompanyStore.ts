import { Instance, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const CompanyStoreModel = types
  .model("CompanyStore")
  .props({
    name: types.optional(types.string, "NovaAI Solutions"),
    email: types.optional(types.string, "novaai@gmail.com"),
    industry: types.optional(types.string, "Штучний інтелект"),
    description: types.optional(
      types.string,
      "NovaAI Solutions - компанія, що здійснює розробку та надання послуг в сфері штучного інтелекту. Ми створюємо інтелектуальні системи, які допомагають компаніям автоматизувати процеси, збільшувати ефективність та розширювати можливості.",
    ),
    profilePhoto: types.maybe(types.string),
    isLoading: types.optional(types.boolean, false),
    error: types.maybe(types.string),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    setCompanyInfo(data: { name: string; email: string; industry: string; description: string }) {
      store.name = data.name
      store.email = data.email
      store.industry = data.industry
      store.description = data.description
    },
    updateCompanyName(name: string) {
      store.name = name
    },
    updateCompanyEmail(email: string) {
      store.email = email
    },
    updateCompanyIndustry(industry: string) {
      store.industry = industry
    },
    updateCompanyDescription(description: string) {
      store.description = description
    },
    updateProfilePhoto(uri: string | undefined) {
      store.profilePhoto = uri
    },
  }))

export interface CompanyStore extends Instance<typeof CompanyStoreModel> {}
