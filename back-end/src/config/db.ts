import { Pool } from "pg"
import dotenv from "dotenv"

dotenv.config()

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ackrock",
  password: "dev001",
  port: 5432
})