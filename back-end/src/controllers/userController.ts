import { Request, Response } from "express"
import * as userService from "../services/userService"

export const createUser = async (req: Request, res: Response) => {

  try {

    const { name, email, password, role_id } = req.body

    const user = await userService.createUserService({
      name,
      email,
      password,
      role_id
    })

    res.json(user)

  } catch (error: any) {

    res.status(500).json({
      message: error.message
    })

  }
}

export const getUsers = async (req: Request, res: Response) => {

  const users = await userService.getUsersService()

  res.json(users)

}

export const getUserById = async (req: Request, res: Response) => {

  const user = await userService.getUserByIdService(
    String(req.params.id)
  )

  res.json(user)

}

export const updateUser = async (req: Request, res: Response) => {

  const { name, email } = req.body

  const user = await userService.updateUserService(
    String(req.params.id),
    name,
    email
  )

  res.json(user)

}

export const deleteUser = async (req: Request, res: Response) => {

  await userService.deleteUserService(
    String(req.params.id)
  )

  res.json({
    message: "User deleted"
  })

}