import axios from "axios"

const API_KEY = "95717d41e4e340f1ae0bd677ab2a142d"
const BASE_URL = "https://newsapi.org/v2"

export interface NewsArticle {
  source: {
    id: string | null
    name: string
  }
  author: string | null
  title: string
  description: string | null
  url: string
  urlToImage: string | null
  publishedAt: string
  content: string | null
}

export interface NewsResponse {
  status: string
  totalResults: number
  articles: NewsArticle[]
}

export const newsService = {
  async getITNews(): Promise<NewsResponse> {
    try {
      const response = await axios.get(`${BASE_URL}/everything`, {
        params: {
          q: "business",
          sortBy: "publishedAt",
          language: "en",
          apiKey: API_KEY,
        },
      })
      return response.data
    } catch (error) {
      console.error("Error fetching news:", error)
      throw error
    }
  },
}
