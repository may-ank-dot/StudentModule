import { Timetable } from "../models/timetable.models.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"

const setTimetable = asyncHandler(async (req, res) => {
  const { studentId, week } = req.body;

  if (!studentId || !week) {
    throw new ApiError(400, "studentId and week data are required");
  }

  const updated = await Timetable.findOneAndUpdate(
    { student: studentId },
    { week },
    { new: true, upsert: true }
  );

  res
    .status(200)
    .json(
        new ApiResponse(200, updated, "Timetable saved")
    )
})
const getAllTimetables = asyncHandler(async (req, res) => {
  const timetables = await Timetable.find();
  res
    .status(200)
    .json(
      new ApiResponse(200, timetables)
    );
})

const getTimetable = asyncHandler(async (req, res) => {
  const { studentId } = req.params;

  const timetable = await Timetable.findOne({ student: studentId });

  if (!timetable) throw new ApiError(404, "No timetable found");

  res
    .status(200)
    .json(
        new ApiResponse(200, timetable)
    )
})

export {getAllTimetables, setTimetable, getTimetable}