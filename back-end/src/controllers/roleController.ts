import { Request, Response } from "express"
import * as roleService from "../services/roleService"

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
      return res.status(400).json({ message: "Role name is required" })
    }

    const role = await roleService.createRoleService(
      role_name,
      can_view,
      can_create,
      can_update,
      can_delete
    )

    res.status(201).json(role)

  } catch (error: any) {

    res.status(500).json({
      message: "Create role failed",
      error: error.message
    })

  }
}


export const getRoles = async (req: Request, res: Response) => {

  try {

    const roles = await roleService.getRolesService()

    res.json(roles)

  } catch (error: any) {

    res.status(500).json({
      message: "Fetch roles failed",
      error: error.message
    })

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

    res.json(role)

  } catch (error: any) {

    res.status(500).json({
      message: "Update role failed",
      error: error.message
    })

  }
}


export const deleteRole = async (req: Request, res: Response) => {

  try {

    const { id } = req.params

    const role = await roleService.deleteRoleService(id as string,)

    res.json({
      message: "Role deleted successfully",
      role
    })

  } catch (error: any) {

    res.status(500).json({
      message: "Delete role failed",
      error: error.message
    })

  }
}