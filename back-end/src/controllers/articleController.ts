import { Request, Response } from "express"
import * as articleService from "../services/articleService"
import { sendSuccess, sendError } from "../utils/apiResponse"

export const createArticle = async (req: any, res: Response) => {
  try {

    const { title, content, status, category_id } = req.body
    const author_id = req.user.id

    const categoryId = Array.isArray(category_id)
      ? category_id[0]
      : category_id

    const article = await articleService.createArticleService(
      title,
      content,
      status || "draft",
      author_id,
      categoryId
    )

    return sendSuccess(
      res,
      "Article created successfully",
      article
    )

  } catch (error: any) {

    return sendError(res, error.message)

  }
}

export const getArticles = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;

    const articles = await articleService.getArticlesService(page, limit);

    return sendSuccess(res, "Articles fetched successfully", articles);

  } catch (error: any) {
    return sendError(res, error.message);
  }
};

export const getArticleById = async (req: Request, res: Response) => {

  try {

    const article = await articleService.getArticleByIdService(
      req.params.id as string
    )

    return sendSuccess(
      res,
      "Article fetched successfully",
      article
    )

  } catch (error: any) {

    return sendError(res, error.message)

  }

}

export const updateArticle = async (req: Request, res: Response) => {

  try {

    const { title, content, status, category_id } = req.body

    const article = await articleService.updateArticleService(
      req.params.id as string,
      title,
      content,
      status,
      category_id
    )

    return sendSuccess(
      res,
      "Article updated successfully",
      article
    )

  } catch (error: any) {

    return sendError(res, error.message)

  }

}

export const deleteArticle = async (req: Request, res: Response) => {

  try {

    await articleService.deleteArticleService(
      req.params.id as string
    )

    return sendSuccess(
      res,
      "Article deleted successfully",
      null
    )

  } catch (error: any) {

    return sendError(res, error.message)

  }

}