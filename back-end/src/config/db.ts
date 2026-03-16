import { Pool } from "pg"
import dotenv from "dotenv"

dotenv.config()

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "Apeiro@24",
  port: 5432
})