import { Request, Response } from "express"
import * as categoryService from "../services/categoryService"
import { sendSuccess, sendError } from "../utils/apiResponse"

export const createCategory = async (req: Request, res: Response) => {
  try {

    const { name, description } = req.body

    const category = await categoryService.createCategoryService(
      name,
      description
    )

    return sendSuccess(
      res,
      "Category created successfully",
      category
    )

  } catch (error: any) {

    return sendError(res, error.message)

  }
}

export const getCategories = async (req: Request, res: Response) => {
  try {

    const categories = await categoryService.getCategoriesService()

    return sendSuccess(
      res,
      "Categories fetched successfully",
      categories
    )

  } catch (error: any) {

    return sendError(res, error.message)

  }
}

export const getCategoryById = async (req: Request, res: Response) => {
  try {

    const category = await categoryService.getCategoryByIdService(
      req.params.id as string
    )

    return sendSuccess(
      res,
      "Category fetched successfully",
      category
    )

  } catch (error: any) {

    return sendError(res, error.message)

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

    return sendSuccess(
      res,
      "Category updated successfully",
      category
    )

  } catch (error: any) {

    return sendError(res, error.message)

  }
}

export const deleteCategory = async (req: Request, res: Response) => {
  try {

    await categoryService.deleteCategoryService(
      req.params.id as string
    )

    return sendSuccess(
      res,
      "Category deleted successfully",
      null
    )

  } catch (error: any) {

    return sendError(res, error.message)

  }
}