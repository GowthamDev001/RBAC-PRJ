import { apiClient } from "../config/apiClient"
import { API_PATHS } from "../config/apiConfig"
import { CreateCategoryPayload, UpdateCategoryPayload } from "@/types/category"

export const getCategoriesApi = async () => {
  const response = await apiClient.get(API_PATHS.CATEGORY.GET_ALL)
  return response.data
}

export const createCategoryApi = async (data: CreateCategoryPayload) => {
  const response = await apiClient.post(API_PATHS.CATEGORY.CREATE, data)
  return response.data
}

export const updateCategoryApi = async (data: UpdateCategoryPayload) => {
  const response = await apiClient.put(
    `${API_PATHS.CATEGORY.UPDATE}/${data.id}`,
    data
  )
  return response.data
}

export const deleteCategoryApi = async (id: string) => {
  const response = await apiClient.delete(
    `${API_PATHS.CATEGORY.DELETE}/${id}`
  )
  return response.data
}