import * as roleModel from "../models/roleModel"

export const createRoleService = async (
  role_name: string,
  can_view: boolean,
  can_create: boolean,
  can_update: boolean,
  can_delete: boolean
) => {

  const existingRole = await roleModel.getRoleByName(role_name)

  if (existingRole) {
    throw new Error("Role already exists")
  }

  return await roleModel.createRole(
    role_name,
    can_view,
    can_create,
    can_update,
    can_delete
  )
}


export const getRolesService = async () => {

  return await roleModel.getRoles()

}


export const updateRoleService = async (
  id: string,
  role_name: string,
  can_view: boolean,
  can_create: boolean,
  can_update: boolean,
  can_delete: boolean
) => {

  return await roleModel.updateRole(
    id,
    role_name,
    can_view,
    can_create,
    can_update,
    can_delete
  )
}


export const deleteRoleService = async (id: string) => {

  return await roleModel.deleteRole(id)

}