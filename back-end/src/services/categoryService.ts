import * as categoryModel from "../models/categoryModel"

export const createCategoryService = async (
  name: string,
  description: string
) => {

  return await categoryModel.createCategory(
    name,
    description
  )
}

export const getCategoriesService = async () => {

  return await categoryModel.getCategories()

}

export const getCategoryByIdService = async (id: string) => {

  return await categoryModel.getCategoryById(id)

}

export const updateCategoryService = async (
  id: string,
  name: string,
  description: string
) => {

  return await categoryModel.updateCategory(
    id,
    name,
    description
  )

}

export const deleteCategoryService = async (id: string) => {

  return await categoryModel.deleteCategory(id)

}