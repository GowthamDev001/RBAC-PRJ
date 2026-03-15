import { Request, Response } from "express"
import * as articleService from "../services/articleService"

export const createArticle = async (req: any, res: Response) => {

  try {

    const { title, content, status } = req.body
    const author_id = req.user.id

    const article = await articleService.createArticleService(
      title,
      content,
      status || "draft",
      author_id
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

    const { title, content, status } = req.body

    const article = await articleService.updateArticleService(
      req.params.id as string,
      title,
      content,
      status
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