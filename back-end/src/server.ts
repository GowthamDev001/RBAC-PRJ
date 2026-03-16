import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDb } from "./config/connectDb"
import authRoutes from "./routes/authRoutes"
import articleRoutes from "./routes/articleRoutes"
import roleRoutes from "./routes/roleRoutes"
import categoryRoutes from "./routes/categoryRoutes"
import reviewRoutes from "./routes/reviewRoutes"
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
app.use("/api/roles", roleRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/reviews", reviewRoutes)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})