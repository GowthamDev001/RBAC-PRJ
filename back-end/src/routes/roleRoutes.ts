import express from "express"
import * as roleController from "../controllers/roleController"

const router = express.Router()

router.post("/", roleController.createRole)
router.get("/", roleController.getRoles)
router.put("/:id", roleController.updateRole)
router.delete("/:id", roleController.deleteRole)

export default router