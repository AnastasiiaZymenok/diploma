import { types, Instance, flow } from "mobx-state-tree"
import { CompanyAnnouncement } from "./CompanyAnnouncement"

export const CompanyAnnouncementStoreModel = types
  .model("CompanyAnnouncementStore")
  .props({
    announcements: types.array(types.frozen<CompanyAnnouncement>()),
    isLoading: types.optional(types.boolean, false),
    error: types.maybe(types.string),
  })
  .actions((store) => {
    const setAnnouncements = (announcements: CompanyAnnouncement[]) => {
      store.announcements.replace(announcements)
    }

    const addAnnouncement = (announcement: CompanyAnnouncement) => {
      store.announcements.push(announcement)
    }

    const removeAnnouncement = (id: string) => {
      const index = store.announcements.findIndex((a) => a.id === id)
      if (index !== -1) {
        store.announcements.splice(index, 1)
      }
    }

    const setLoading = (loading: boolean) => {
      store.isLoading = loading
    }

    const setError = (error: string | undefined) => {
      store.error = error
    }

    const fetchAnnouncements = flow(function* () {
      try {
        setLoading(true)
        setError(undefined)
        // TODO: Implement API call here
        // const response = yield api.getAnnouncements()
        // setAnnouncements(response.data)
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to fetch announcements")
      } finally {
        setLoading(false)
      }
    })

    return {
      setAnnouncements,
      addAnnouncement,
      removeAnnouncement,
      setLoading,
      setError,
      fetchAnnouncements,
    }
  })

export interface CompanyAnnouncementStore extends Instance<typeof CompanyAnnouncementStoreModel> {}
