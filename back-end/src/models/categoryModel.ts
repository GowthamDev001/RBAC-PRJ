import { pool } from "../config/db"

export const createCategory = async (
  name: string,
  description: string
) => {

  const result = await pool.query(
    `INSERT INTO ackrock.categories
     (name,description)
     VALUES ($1,$2)
     RETURNING *`,
    [name, description]
  )

  return result.rows[0]

}

export const getCategories = async () => {

  const result = await pool.query(
    `SELECT * FROM ackrock.categories
     ORDER BY created_at DESC`
  )

  return result.rows

}

export const getCategoryById = async (id: string) => {

  const result = await pool.query(
    `SELECT * FROM ackrock.categories
     WHERE id=$1`,
    [id]
  )

  return result.rows[0]

}

export const updateCategory = async (
  id: string,
  name: string,
  description: string
) => {

  const result = await pool.query(
    `UPDATE ackrock.categories
     SET name=$1,
         description=$2
     WHERE id=$3
     RETURNING *`,
    [name, description, id]
  )

  return result.rows[0]

}

export const deleteCategory = async (id: string) => {

  const result = await pool.query(
    `DELETE FROM ackrock.categories
     WHERE id=$1
     RETURNING *`,
    [id]
  )

  return result.rows[0]

}