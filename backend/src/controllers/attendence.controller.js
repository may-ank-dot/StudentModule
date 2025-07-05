import {Attendance} from "../models/attendence.models.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"

const markAttendance = asyncHandler(async (req, res) => {
  const { studentId, date, status } = req.body;

  if (!studentId || !date || !status) {
    throw new ApiError(400, "studentId, date and status are required");
  }

  const attendance = await Attendance.findOneAndUpdate(
    { student: studentId, date },
    { status },
    { upsert: true, new: true }
  )

  res
    .status(200)
    .json(
        new ApiResponse(200, attendance, "Attendance recorded")
    )
})

const getAllAttendance = asyncHandler(async (req, res) => {
  const records = await Attendance.find();
  res
    .status(200)
    .json(
      new ApiResponse(200, records)
    );
});


const getAttendanceByStudent = asyncHandler(async (req, res) => {
  const { studentId } = req.params

  const attendanceRecords = await Attendance.find({ student: studentId }).sort({ date: -1 })

  res
    .status(200)
    .json(
        new ApiResponse(200, attendanceRecords)
    )
})

const getMonthlySummary = asyncHandler(async (req, res) => {
  const { studentId } = req.params
  const { month, year } = req.query

  const fromDate = new Date(`${year}-${month}-01`)
  const toDate = new Date(fromDate)
  toDate.setMonth(fromDate.getMonth() + 1)

  const summary = await Attendance.aggregate([
    {
      $match: {
        student: new mongoose.Types.ObjectId(studentId),
        date: { $gte: fromDate, $lt: toDate },
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ])

  res
    .status(200)
    .json(
        new ApiResponse(200, summary)
    )
})

export {
    getAllAttendance,
    getAttendanceByStudent,
    getMonthlySummary,
    markAttendance
}