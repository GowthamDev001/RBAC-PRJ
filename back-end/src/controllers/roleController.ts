import { Request, Response } from "express"
import * as roleService from "../services/roleService"

export const createRole = async (req: Request, res: Response) => {

  const role = await roleService.createRoleService(
    req.body.role_name
  )

  res.json(role)

}

export const getRoles = async (req: Request, res: Response) => {

  const roles = await roleService.getRolesService()

  res.json(roles)

}

export const updateRole = async (req: Request, res: Response) => {

  const role = await roleService.updateRoleService(
    Number(req.params.id),
    req.body.role_name
  )

  res.json(role)

}

export const deleteRole = async (req: Request, res: Response) => {

  await roleService.deleteRoleService(
    Number(req.params.id)
  )

  res.json({
    message: "Role deleted"
  })

}