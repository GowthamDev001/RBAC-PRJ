import { pool } from "./db"

export const connectDb = async () => {
  try {
    await pool.query("SELECT NOW()")
    console.log("PostgreSQL Connected")
  } catch (error) {
    console.error("Database connection failed:", error)
  }
}