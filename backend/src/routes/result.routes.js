import {Router} from "express"
import { 
    addResult,
    getResults,
    getAllResults
} from "../controllers/result.controller.js"

const router = Router()

router.post("/", addResult)
router.get("/",getAllResults)
router.get("/:studentId", getResults)

export default router
