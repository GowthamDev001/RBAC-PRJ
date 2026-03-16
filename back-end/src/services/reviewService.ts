import * as reviewModel from "../models/reviewModel"

export const createReviewService = async (
  article_id: string,
  author_id: string,
  rating: number,
  review: string
) => {

  return await reviewModel.createReview(
    article_id,
    author_id,
    rating,
    review
  )

}

export const getReviewsByArticleService = async (articleId: string) => {

  return await reviewModel.getReviewsByArticle(articleId)

}

export const updateReviewService = async (
  id: string,
  rating: number,
  review: string
) => {

  return await reviewModel.updateReview(
    id,
    rating,
    review
  )

}

export const deleteReviewService = async (id: string) => {

  return await reviewModel.deleteReview(id)

}