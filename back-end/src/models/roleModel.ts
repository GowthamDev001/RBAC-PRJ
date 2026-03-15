import { pool } from "../config/db"
import { TABLES } from "../config/dbTables"

export const getRoleByName = async (roleName: string) => {


  const result = await pool.query(
    `SELECT id
     FROM ${TABLES.ROLES}
     WHERE role_name=$1`,
    [roleName]
  )



  return result.rows[0]
}

export const getRoles = async () => {

  const result = await pool.query(
    `SELECT *
     FROM ${TABLES.ROLES}
     WHERE is_deleted=false
     ORDER BY id ASC`
  )

  return result.rows
}


export const getRoleById = async (id: number) => {

  const result = await pool.query(
    `SELECT role_name
     FROM ${TABLES.ROLES}
     WHERE id=$1 AND is_deleted=false`,
    [id]
  )

  return result.rows[0]
}