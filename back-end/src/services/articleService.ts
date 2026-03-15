import * as articleModel from "../models/articleModel"

export const createArticleService = async (
  title: string,
  content: string,
  status: string,
  author_id: string
) => {

  return await articleModel.createArticle(
    title,
    content,
    author_id,
    status
  )

}


export const getArticlesService = async () => {

  return await articleModel.getArticles()

}



export const getArticleByIdService = async (id: string) => {

  return await articleModel.getArticleById(id)

}



export const updateArticleService = async (
  id: string,
  title: string,
  content: string,
  status: string
) => {

  return await articleModel.updateArticle(
    id,
    title,
    content,
    status
  )

}


export const deleteArticleService = async (id: string) => {

  return await articleModel.deleteArticle(id)

}