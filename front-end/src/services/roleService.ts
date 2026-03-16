import { apiClient } from "../config/apiClient"
import { API_PATHS } from "../config/apiConfig"

export const getRolesApi = async () => {

  const res = await apiClient.get(API_PATHS.ROLE.GET_ALL)

  return res.data
}

export const createRoleApi = async (data: any) => {

  const res = await apiClient.post(API_PATHS.ROLE.CREATE, data)

  return res.data
}

export const updateRoleApi = async (data: any) => {

  const res = await apiClient.put(
    `${API_PATHS.ROLE.UPDATE}/${data.id}`,
    data
  )

  return res.data
}

export const deleteRoleApi = async (id: string) => {

  const res = await apiClient.delete(
    `${API_PATHS.ROLE.DELETE}/${id}`
  )

  return res.data
}