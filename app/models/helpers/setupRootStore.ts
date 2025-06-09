/**
 * This file is where we do "rehydration" of your RootStore from AsyncStorage.
 * This lets you persist your state between app launches.
 *
 * Navigation state persistence is handled in navigationUtilities.tsx.
 *
 * Note that Fast Refresh doesn't play well with this file, so if you edit this,
 * do a full refresh of your app instead.
 *
 * @refresh reset
 */
import {
  Instance,
  SnapshotIn,
  SnapshotOut,
  applySnapshot,
  getSnapshot,
  IDisposer,
  onSnapshot,
} from "mobx-state-tree"
import { RootStore, RootStoreModel } from "../RootStore"
import * as storage from "@/utils/storage"

/**
 * The key we'll be saving our state as within async storage.
 */
const ROOT_STATE_STORAGE_KEY = "root"

/**
 * Setup the root state.
 */
export async function setupRootStore() {
  let rootStore: RootStore
  let data: any

  try {
    // load data from storage
    data = (await storage.load(ROOT_STATE_STORAGE_KEY)) || {}
    rootStore = RootStoreModel.create(data)
  } catch (e) {
    // if there's any problem loading, then let's at least fallback to an empty state
    // instead of crashing.
    rootStore = RootStoreModel.create({})
  }

  // track changes & save to storage
  if (__DEV__) {
    const disposer = onSnapshot(rootStore, (snapshot) => {
      storage.save(ROOT_STATE_STORAGE_KEY, snapshot)
    })
    return { rootStore, disposer }
  } else {
    const disposer = onSnapshot(rootStore, (snapshot) => {
      storage.save(ROOT_STATE_STORAGE_KEY, snapshot)
    })
    return { rootStore, disposer }
  }
}
