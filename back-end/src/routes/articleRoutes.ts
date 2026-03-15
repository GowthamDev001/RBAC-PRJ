import express, {} from "express"
import * as articleController from "../controllers/articleController"
import { authMiddleware } from "../middleware/authMiddleware"

const router = express.Router()

router.post("/", authMiddleware, articleController.createArticle)
router.get("/", authMiddleware, articleController.getArticles)
router.get("/:id", authMiddleware, articleController.getArticleById)
router.put("/:id", authMiddleware, articleController.updateArticle)
router.delete("/:id", authMiddleware, articleController.deleteArticle)

export default router