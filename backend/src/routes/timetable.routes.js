import {Router} from "express";
import { 
    setTimetable, 
    getTimetable,
    getAllTimetables
} from "../controllers/timetable.controller.js";

const router = Router();

router.post("/", setTimetable)
router.get("/",getAllTimetables)
router.get("/:studentId", getTimetable)

export default router
