import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { findUserByEmail } from "../models/userModel"
import { decryptPayload } from "../utils/decryptHelper"
import { comparePassword } from "../utils/passwordHelper"
import { createUserService } from "./userService"
import { getRoleById, getRoleByName } from "../models/roleModel"

export const loginService = async (
  email: string,
  encryptedPassword: string
) => {

  const user = await findUserByEmail(email)

  if (!user) {
    throw new Error("User not found")
  }

  const password = decryptPayload(encryptedPassword)

  const isMatch = await comparePassword(password, user.password)

  if (!isMatch) {
    throw new Error("Invalid password")
  }

  const role = await getRoleById(user.role_id)

  const token = jwt.sign(
    {
      id: user.id,
      role: {
        id: role.id,
        name: role.role_name,
        can_view: role.can_view,
        can_create: role.can_create,
        can_update: role.can_update,
        can_delete: role.can_delete
      }
    },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "1d" }
  )

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: {
        id: role.id,
        name: role.role_name,
        can_view: role.can_view,
        can_create: role.can_create,
        can_update: role.can_update,
        can_delete: role.can_delete
      }
    },
    token
  }
}


export const registerService = async (
  name: string,
  email: string,
  encryptedPassword: string,
  isAdmin: boolean
) => {



  // decrypt frontend password
  const password = decryptPayload(encryptedPassword)


  // hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // decide role
  const roleName = isAdmin ? "Admin" : "Staff"

  // get role from DB
  const role = await getRoleByName(roleName)


  const user = await createUserService({
    name,
    email,
    password: hashedPassword,
    role_id: role.id
  })



  return {
    message: "User registered successfully",
    user
  }

}