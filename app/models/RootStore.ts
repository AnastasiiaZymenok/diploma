import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { AuthStoreModel } from "./AuthStore"
import { NewsStoreModel } from "./NewsStore"
import { CompanyStoreModel } from "./CompanyStore"
import { CompanyAnnouncementStoreModel } from "./CompanyAnnouncementStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  authStore: types.optional(AuthStoreModel, {}),
  newsStore: types.optional(NewsStoreModel, {}),
  companyStore: types.optional(CompanyStoreModel, {}),
  companyAnnouncementStore: types.optional(CompanyAnnouncementStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshotOut extends SnapshotOut<typeof RootStoreModel> {}
export interface RootStoreSnapshotIn extends SnapshotIn<typeof RootStoreModel> {}
