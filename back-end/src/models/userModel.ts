import { pool } from "../config/db"
import { TABLES } from "../config/dbTables"

export const findUserByEmail = async (email: string) => {

  const result = await pool.query(
    `SELECT *
     FROM ${TABLES.USERS}
     WHERE email=$1 AND is_deleted=false`,
    [email]
  )

  return result.rows[0]
}

export const createUser = async (
  name: string,
  email: string,
  password: string,
  role_id: string
) => {

  const result = await pool.query(
    `INSERT INTO ${TABLES.USERS}
     (name,email,password,role_id)
     VALUES($1,$2,$3,$4)
     RETURNING *`,
    [name, email, password, role_id]
  )

  return result.rows[0]
}

export const getUsers = async () => {

  const result = await pool.query(
    `SELECT *
     FROM ${TABLES.USERS}
     WHERE is_deleted=false`
  )

  return result.rows
}

export const getUserById = async (id: string) => {

  const result = await pool.query(
    `SELECT *
     FROM ${TABLES.USERS}
     WHERE id=$1 AND is_deleted=false`,
    [id]
  )

  return result.rows[0]
}

export const updateUser = async (
  id: string,
  name: string,
  email: string
) => {

  const result = await pool.query(
    `UPDATE ${TABLES.USERS}
     SET name=$1,
         email=$2,
         updated_at=CURRENT_TIMESTAMP
     WHERE id=$3
     RETURNING *`,
    [name, email, id]
  )

  return result.rows[0]
}

export const deleteUser = async (id: string) => {

  const result = await pool.query(
    `UPDATE ${TABLES.USERS}
     SET is_deleted=true
     WHERE id=$1
     RETURNING *`,
    [id]
  )

  return result.rows[0]
}