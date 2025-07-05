import {Router} from "express";
import { createHomework, getAllHomework } from "../controllers/homework.controller.js";

const router = Router();

router.post("/", createHomework);
router.get("/", getAllHomework);

export default router;
