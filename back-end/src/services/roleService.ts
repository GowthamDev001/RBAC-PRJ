import * as roleModel from "../models/roleModel"

export const createRoleService = async (role_name: string) => {
  return await roleModel.createRole(role_name)
}

export const getRolesService = async () => {
  return await roleModel.getRoles()
}

export const updateRoleService = async (
  id: number,
  role_name: string
) => {
  return await roleModel.updateRole(id, role_name)
}

export const deleteRoleService = async (id: number) => {
  return await roleModel.deleteRole(id)
}