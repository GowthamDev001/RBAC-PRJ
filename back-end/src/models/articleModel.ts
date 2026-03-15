import { pool } from "../config/db"
import { TABLES } from "../config/dbTables"

export const createArticle = async (
  title: string,
  content: string,
  author_id: string,
  status: string
) => {

  const result = await pool.query(
    `INSERT INTO ${TABLES.ARTICLES}
     (title,content,author_id,status)
     VALUES($1,$2,$3,$4)
     RETURNING *`,
    [title, content, author_id, status]
  )

  return result.rows[0]
}

export const getArticles = async () => {

  const result = await pool.query(
    `SELECT *
     FROM ${TABLES.ARTICLES}
     WHERE is_deleted=false
     ORDER BY id DESC`
  )

  return result.rows
}

export const updateArticle = async (
  id: string,
  title: string,
  content: string,
  status: string
) => {


  const result = await pool.query(
    `UPDATE ${TABLES.ARTICLES}
     SET title = $1,
         content = $2,
         status = $3,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $4
     RETURNING *`,
    [title, content, status, id]
  )

  return result.rows[0]

}
export const deleteArticle = async (id: string) => {

  const result = await pool.query(
    `UPDATE ${TABLES.ARTICLES}
     SET is_deleted=true,
         updated_at=CURRENT_TIMESTAMP
     WHERE id=$1
     RETURNING *`,
    [id]
  )

  return result.rows[0]
}

export const getArticleById = async (id: string) => {

  const result = await pool.query(
    `SELECT * FROM ackrock.articles WHERE id = $1`,
    [id]
  )

  return result.rows[0]

}