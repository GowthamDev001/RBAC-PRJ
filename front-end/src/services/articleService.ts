import { apiClient } from "./apiClient"
import { API_PATHS } from "./apiConfig"
import {
  CreateArticlePayload,
  UpdateArticlePayload
} from "@/types/article"

export const getArticlesApi = async () => {
  const response = await apiClient.get(API_PATHS.ARTICLE.GET_ALL)
  return response.data
}

export const getArticleByIdApi = async (id: string) => {
  const response = await apiClient.get(`${API_PATHS.ARTICLE.GET_BY_ID}/${id}`)
  return response.data
}

export const createArticleApi = async (data: CreateArticlePayload) => {
  const response = await apiClient.post(API_PATHS.ARTICLE.CREATE, data)
  return response.data
}

export const updateArticleApi = async (data: UpdateArticlePayload) => {
  const response = await apiClient.put(
    `${API_PATHS.ARTICLE.UPDATE}/${data.id}`,
    data
  )
  return response.data
}

export const deleteArticleApi = async (id: string) => {
  const response = await apiClient.delete(
    `${API_PATHS.ARTICLE.DELETE}/${id}`
  )
  return response.data
}