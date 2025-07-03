import {Router} from "express"
import { 
    addResult,
    getResults 
} from "../controllers/result.controller.js"

const router = Router()

router.post("/", addResult)
router.get("/:studentId", getResults)

export default router
