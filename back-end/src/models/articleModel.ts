import { pool } from "../config/db"
import { TABLES } from "../config/dbTables"

export const createArticle = async (
  title: string,
  content: string,
  author_id: string,
  category_id: string,
  status: string
) => {

  const result = await pool.query(
    `
  INSERT INTO ackrock.articles
  (title, content, status, category_id, author_id)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *
  `,
    [title, content, status, category_id, author_id]
  )

  return result.rows[0]
}

export const getArticles = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;

  const dataQuery = `
    SELECT *
    FROM ${TABLES.ARTICLES}
    WHERE is_deleted = false
    ORDER BY id DESC
    LIMIT $1 OFFSET $2
  `;

  const countQuery = `
    SELECT COUNT(*) 
    FROM ${TABLES.ARTICLES}
    WHERE is_deleted = false
  `;

  const [dataResult, countResult] = await Promise.all([
    pool.query(dataQuery, [limit, offset]),
    pool.query(countQuery),
  ]);

  const total = Number(countResult.rows[0].count);

  return {
    data: dataResult.rows,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const updateArticle = async (
  id: string,
  title: string,
  content: string,
  category_id: string,
  status: string
) => {

  const result = await pool.query(
    `UPDATE ${TABLES.ARTICLES}
     SET title = $1,
         content = $2,
         category_id = $3,
         status = $4,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $5
     RETURNING *`,
    [title, content, category_id, status, id]
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