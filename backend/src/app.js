import express from "express"
import cors from "cors"
import studentRoutes from "./routes/student.routes.js"
import attendanceRoutes from "./routes/attendence.routes.js"
import resultRoutes from "./routes/result.routes.js"
import subjectRoutes from "./routes/subject.routes.js"
import timetableRoutes from "./routes/timetable.routes.js"
import dotenv from "dotenv"
dotenv.config()

const app = express();

app.use(cors({
        origin:process.env.CORS_ORIGIN,
    })
)

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))

app.use("/api/students", studentRoutes)
app.use("/api/attendance", attendanceRoutes)
app.use("/api/results", resultRoutes)
app.use("/api/subjects", subjectRoutes)
app.use("/api/timetable", timetableRoutes)

export default app