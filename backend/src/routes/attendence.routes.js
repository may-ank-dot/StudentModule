import {Router} from "express";
import {
  markAttendance,
  getAttendanceByStudent,
  getMonthlySummary,
} from "../controllers/attendence.controller.js"

const router = Router()

router.post("/", markAttendance)
router.get("/:studentId", getAttendanceByStudent)
router.get("/:studentId/summary", getMonthlySummary)

export default router
