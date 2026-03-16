import express from "express"
import * as reviewController from "../controllers/reviewController"
import { authMiddleware } from "../middleware/authMiddleware"

const router = express.Router()

router.post("/", authMiddleware, reviewController.createReview)
router.get("/article/:articleId", authMiddleware, reviewController.getReviewsByArticle)
router.put("/:id", authMiddleware, reviewController.updateReview)
router.delete("/:id", authMiddleware, reviewController.deleteReview)

export default router