import {Router} from "express";
import { 
    setTimetable, 
    getTimetable 
} from "../controllers/timetable.controller.js";

const router = Router();

router.post("/", setTimetable)
router.get("/:studentId", getTimetable)

export default router
