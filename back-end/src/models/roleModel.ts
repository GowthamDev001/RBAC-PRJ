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


export const getRoleById = async (id: string) => {

  const result = await pool.query(
    `
    SELECT 
      id,
      role_name,
      can_view,
      can_create,
      can_update,
      can_delete
    FROM ackrock.roles
    WHERE id = $1
    `,
    [id]
  )

  return result.rows[0]
}