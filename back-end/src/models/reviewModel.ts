import { pool } from "../config/db"

export const createReview = async (
  article_id: string,
  author_id: string,
  rating: number,
  review: string
) => {

  const result = await pool.query(
    `INSERT INTO ackrock.article_reviews
     (article_id,author_id,rating,review)
     VALUES ($1,$2,$3,$4)
     RETURNING *`,
    [article_id, author_id, rating, review]
  )

  return result.rows[0]

}

export const getReviewsByArticle = async (articleId: string) => {

  const result = await pool.query(
    `SELECT r.*,u.name
     FROM ackrock.article_reviews r
     LEFT JOIN ackrock.users u
     ON u.id=r.author_id
     WHERE r.article_id=$1
     ORDER BY r.created_at DESC`,
    [articleId]
  )

  return result.rows

}

export const updateReview = async (
  id: string,
  rating: number,
  review: string
) => {

  const result = await pool.query(
    `UPDATE ackrock.article_reviews
     SET rating=$1,
         review=$2
     WHERE id=$3
     RETURNING *`,
    [rating, review, id]
  )

  return result.rows[0]

}

export const deleteReview = async (id: string) => {

  const result = await pool.query(
    `DELETE FROM ackrock.article_reviews
     WHERE id=$1
     RETURNING *`,
    [id]
  )

  return result.rows[0]

}