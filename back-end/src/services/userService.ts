import * as userModel from "../models/userModel"

interface CreateUserDTO {
  name: string
  email: string
  password: string
  role_id: string 
}

export const createUserService = async (data: CreateUserDTO) => {

  const { name, email, password, role_id } = data

  const user = await userModel.createUser(
    name,
    email,
    password,
    role_id
  )

  return user
}

export const getUsersService = async () => {
  return await userModel.getUsers()
}

export const getUserByIdService = async (id: string) => {
  return await userModel.getUserById(id)
}

export const updateUserService = async (
  id: string,
  name: string,
  email: string
) => {
  return await userModel.updateUser(id, name, email)
}

export const deleteUserService = async (id: string) => {
  return await userModel.deleteUser(id)
}