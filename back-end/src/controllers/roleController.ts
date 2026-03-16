import { Request, Response } from "express"
import * as roleService from "../services/roleService"
import { sendSuccess, sendError } from "../utils/apiResponse"

export const createRole = async (req: Request, res: Response) => {
  try {

    const {
      role_name,
      can_view,
      can_create,
      can_update,
      can_delete
    } = req.body

    if (!role_name) {
      return sendError(res, "Role name is required", 400)
    }

    const role = await roleService.createRoleService(
      role_name,
      can_view,
      can_create,
      can_update,
      can_delete
    )

    return sendSuccess(
      res,
      "Role created successfully",
      role,
      201
    )

  } catch (error: any) {

    return sendError(res, error.message)

  }
}

export const getRoles = async (req: Request, res: Response) => {
  try {

    const roles = await roleService.getRolesService()

    return sendSuccess(
      res,
      "Roles fetched successfully",
      roles
    )

  } catch (error: any) {

    return sendError(res, error.message)

  }
}

export const updateRole = async (req: Request, res: Response) => {
  try {

    const { id } = req.params

    const {
      role_name,
      can_view,
      can_create,
      can_update,
      can_delete
    } = req.body

    const role = await roleService.updateRoleService(
      id as string,
      role_name,
      can_view,
      can_create,
      can_update,
      can_delete
    )

    return sendSuccess(
      res,
      "Role updated successfully",
      role
    )

  } catch (error: any) {

    return sendError(res, error.message)

  }
}

export const deleteRole = async (req: Request, res: Response) => {
  try {

    const { id } = req.params

    const role = await roleService.deleteRoleService(id as string)

    return sendSuccess(
      res,
      "Role deleted successfully",
      role
    )

  } catch (error: any) {

    return sendError(res, error.message)

  }
}