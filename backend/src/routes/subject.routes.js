import {Router} from "express";
import { addSubject, getSubjects, getAllSubjects } from "../controllers/subject.controller.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = Router()

router.post("/", upload.array("attachments", 5), addSubject)
router.get("/",getAllSubjects)
router.get("/:studentId", getSubjects)

export default router
