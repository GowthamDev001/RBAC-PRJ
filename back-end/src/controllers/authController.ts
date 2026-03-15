import { Request, Response } from "express"
import { loginService, registerService } from "../services/authService"

export const login = async (req: Request, res: Response) => {

  try {

    const { email, password } = req.body

    const data = await loginService(email, password)

    res.json(data)

  } catch (error: any) {

    res.status(400).json({
      message: error.message
    })

  }

}


export const register = async (req: Request, res: Response) => {

  try {

    const { name, email, password, isAdmin } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      })
    }

    const data = await registerService(
      name,
      email,
      password,
      isAdmin
    )

    res.status(201).json(data)

  } catch (error: any) {

    res.status(400).json({
      message: error.message
    })

  }

}