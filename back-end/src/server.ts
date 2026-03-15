import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDb } from "./config/connectDb"
import authRoutes from "./routes/authRoutes"
import articleRoutes from "./routes/articleRoutes"
import { createTables } from "./database/createTables"

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Connect database
connectDb()
createTables()

// Test route
app.get("/", (req, res) => {
  res.send("RBAC API Running")
})

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/articles", articleRoutes)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})