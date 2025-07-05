import { Result } from "../models/result.models.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { ApiError } from "../utils/apiError.js"

const addResult = asyncHandler(async (req, res) => {
  const { studentId, subject, marksObtained, totalMarks, term, date } = req.body

  if (!studentId || !subject || !marksObtained || !totalMarks || !term) {
    throw new ApiError(400, "All fields are required")
  }

  const result = await Result.create({
    student: studentId,
    subject,
    marksObtained,
    totalMarks,
    term,
    date: date || new Date(),
  })

  res
    .status(201)
    .json(new ApiResponse(
        201, result, "Result added successfully")
    )
})

const getAllResults = asyncHandler(async (req, res) => {
  const result = await Result.find({})
  if(!result) 
    throw new ApiError(400, "no data found!")

  return res
    .status(200)
    .json(
      new ApiResponse(200, result)
    )
})

const getResults = asyncHandler(async (req, res) => {
  const { studentId } = req.params
  const { term, fromDate, toDate } = req.query

  let filter = { student: studentId }

  if (term) filter.term = term

  if (fromDate && toDate) {
    filter.date = {
      $gte: new Date(fromDate),
      $lte: new Date(toDate),
    };
  }

  const results = await Result.find(filter).sort({ date: -1 })

  res
    .status(200)
    .json(
        new ApiResponse(200, results)
    )
})

export {
    addResult,
    getAllResults,
    getResults
}