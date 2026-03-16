import { pool } from "../config/db"
import { TABLES } from "../config/dbTables"


export const createRole = async (
  role_name: string,
  can_view: boolean,
  can_create: boolean,
  can_update: boolean,
  can_delete: boolean
) => {

  const result = await pool.query(
    `
    INSERT INTO ${TABLES.ROLES}
    (
      role_name,
      can_view,
      can_create,
      can_update,
      can_delete
    )
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *
    `,
    [role_name, can_view, can_create, can_update, can_delete]
  )

  return result.rows[0]
}


export const getRoleByName = async (roleName: string) => {

  const result = await pool.query(
    `
    SELECT id, role_name
    FROM ${TABLES.ROLES}
    WHERE role_name = $1
    AND is_deleted = false
    LIMIT 1
    `,
    [roleName]
  )

  return result.rows[0]
}


export const getRoles = async () => {

  const result = await pool.query(
    `
    SELECT
      id,
      role_name,
      can_view,
      can_create,
      can_update,
      can_delete,
      created_at
    FROM ${TABLES.ROLES}
    WHERE is_deleted = false
    ORDER BY created_at ASC
    `
  )

  return result.rows
}


export const updateRole = async (
  id: string,
  role_name: string,
  can_view: boolean,
  can_create: boolean,
  can_update: boolean,
  can_delete: boolean
) => {

  const result = await pool.query(
    `
    UPDATE ${TABLES.ROLES}
    SET
      role_name = $1,
      can_view = $2,
      can_create = $3,
      can_update = $4,
      can_delete = $5,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $6
    RETURNING *
    `,
    [role_name, can_view, can_create, can_update, can_delete, id]
  )

  return result.rows[0]
}


export const deleteRole = async (id: string) => {

  const result = await pool.query(
    `
    UPDATE ${TABLES.ROLES}
    SET
      is_deleted = true,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING id
    `,
    [id]
  )

  return result.rows[0]
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
      can_delete,
      created_at
    FROM ${TABLES.ROLES}
    WHERE id = $1
    AND is_deleted = false
    LIMIT 1
    `,
    [id]
  )

  return result.rows[0]
}
