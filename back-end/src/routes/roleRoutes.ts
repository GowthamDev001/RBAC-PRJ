import express from "express"
import * as roleController from "../controllers/roleController"
import { authMiddleware } from "../middleware/authMiddleware"

const router = express.Router()

router.post("/", authMiddleware, roleController.createRole)
router.get("/", authMiddleware, roleController.getRoles)
router.put("/:id", authMiddleware, roleController.updateRole)
router.delete("/:id", authMiddleware, roleController.deleteRole)

export default router