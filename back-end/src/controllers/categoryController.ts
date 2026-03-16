import { Request, Response } from "express"
import * as categoryService from "../services/categoryService"

export const createCategory = async (req: Request, res: Response) => {
  try {

    const { name, description } = req.body

    const category = await categoryService.createCategoryService(
      name,
      description
    )

    res.json(category)

  } catch (error: any) {

    res.status(500).json({
      message: error.message
    })

  }
}

export const getCategories = async (req: Request, res: Response) => {

  try {

    const categories = await categoryService.getCategoriesService()

    res.json(categories)

  } catch (error: any) {

    res.status(500).json({
      message: error.message
    })

  }
}

export const getCategoryById = async (req: Request, res: Response) => {

  try {

    const category = await categoryService.getCategoryByIdService(
      req.params.id as string
    )

    res.json(category)

  } catch (error: any) {

    res.status(500).json({
      message: error.message
    })

  }
}

export const updateCategory = async (req: Request, res: Response) => {

  try {

    const { name, description } = req.body

    const category = await categoryService.updateCategoryService(
      req.params.id as string, 
      name,
      description
    )

    res.json(category)

  } catch (error: any) {

    res.status(500).json({
      message: error.message
    })

  }
}

export const deleteCategory = async (req: Request, res: Response) => {

  try {

    await categoryService.deleteCategoryService(req.params.id as string)

    res.json({
      message: "Category deleted successfully"
    })

  } catch (error: any) {

    res.status(500).json({
      message: error.message
    })

  }
}