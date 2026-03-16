import { apiClient } from "../config/apiClient"
import { API_PATHS } from "../config/apiConfig"
import { LoginPayload, RegisterPayload } from "@/types/auth"

export const loginApi = async (data: LoginPayload) => {
  const response = await apiClient.post(API_PATHS.AUTH.LOGIN, data)
  return response.data
}

export const registerApi = async (data: RegisterPayload) => {
  const response = await apiClient.post(API_PATHS.AUTH.REGISTER, data)
  return response.data
}