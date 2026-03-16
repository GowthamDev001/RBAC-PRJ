import { apiClient } from "../config/apiClient"
import { API_PATHS } from "../config/apiConfig"
import { CreateReviewPayload, UpdateReviewPayload } from "@/types/review"

export const getReviewsByArticleApi = async (articleId: string) => {
  const response = await apiClient.get(
    `${API_PATHS.REVIEW.GET_BY_ARTICLE}/${articleId}`
  )
  return response.data
}

export const createReviewApi = async (data: CreateReviewPayload) => {
  const response = await apiClient.post(
    API_PATHS.REVIEW.CREATE,
    data
  )
  return response.data
}

export const updateReviewApi = async (data: UpdateReviewPayload) => {
  const response = await apiClient.put(
    `${API_PATHS.REVIEW.UPDATE}/${data.id}`,
    data
  )
  return response.data
}

export const deleteReviewApi = async (id: string) => {
  const response = await apiClient.delete(
    `${API_PATHS.REVIEW.DELETE}/${id}`
  )
  return response.data
}