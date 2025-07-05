import {Router} from "express";
import {
  markAttendance,
  getAttendanceByStudent,
  getMonthlySummary,
  getAllAttendance
} from "../controllers/attendence.controller.js"

const router = Router()

router.post("/", markAttendance)
router.get("/", getAllAttendance)
router.get("/:studentId", getAttendanceByStudent)
router.get("/:studentId/summary", getMonthlySummary)

export default router
