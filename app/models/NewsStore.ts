import { types, Instance, flow } from "mobx-state-tree"
import { newsService, NewsArticle } from "@/services/newsService"

export const NewsStoreModel = types
  .model("NewsStore")
  .props({
    articles: types.array(types.frozen<NewsArticle>()),
    isLoading: types.optional(types.boolean, false),
    error: types.maybe(types.string),
  })
  .actions((store) => ({
    fetchNews: flow(function* () {
      store.isLoading = true
      store.error = undefined

      try {
        const response = yield newsService.getITNews()
        store.articles = response.articles.filter((article: NewsArticle) => article.urlToImage)
      } catch (error) {
        store.error = "Failed to fetch news"
        console.error(error)
      } finally {
        store.isLoading = false
      }
    }),
  }))

export interface NewsStore extends Instance<typeof NewsStoreModel> {}
