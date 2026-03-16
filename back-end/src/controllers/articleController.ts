import { Request, Response } from "express"
import * as articleService from "../services/articleService"

export const createArticle = async (req: any, res: Response) => {
  try {

    const { title, content, status, category_id } = req.body
    const author_id = req.user.id

    // take first value from array
    const categoryId = Array.isArray(category_id) ? category_id[0] : category_id

    const article = await articleService.createArticleService(
      title,
      content,
      status || "draft",
      author_id,
      categoryId
    )

    res.json(article)

  } catch (error: any) {

    res.status(500).json({
      message: error.message
    })

  }
}

export const getArticles = async (req: Request, res: Response) => {

  try {

    const articles = await articleService.getArticlesService()

    res.json(articles)

  } catch (error: any) {

    res.status(500).json({
      message: error.message
    })

  }

}


export const getArticleById = async (req: Request, res: Response) => {

  try {

    const article = await articleService.getArticleByIdService(
      req.params.id as string
    )

    res.json(article)

  } catch (error: any) {

    res.status(500).json({
      message: error.message
    })

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

    res.json(article)

  } catch (error: any) {

    res.status(500).json({
      message: error.message
    })

  }

}


export const deleteArticle = async (req: Request, res: Response) => {

  try {

    await articleService.deleteArticleService(
      req.params.id as string,
    )

    res.json({
      message: "Article deleted successfully"
    })

  } catch (error: any) {

    res.status(500).json({
      message: error.message
    })

  }

}