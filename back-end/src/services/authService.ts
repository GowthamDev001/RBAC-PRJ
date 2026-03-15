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

  // decrypt password
  const password = decryptPayload(encryptedPassword)

  const isMatch = await comparePassword(
    password,
    user.password
  )

  if (!isMatch) {
    throw new Error("Invalid password")
  }

  // 🔹 get role name
  const role = await getRoleById(user.role_id)

  // generate JWT
  const token = jwt.sign(
    {
      id: user.id,
      role_id: user.role_id,
      role_name: role.role_name
    },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "1d" }
  )

  return {
    user: {
      ...user,
      role_name: role.role_name
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