import { Subject } from "../models/subject.models.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { ApiError } from "../utils/apiError.js"


const addSubject = asyncHandler(async (req, res) => {
  const { studentId, subjectName, description, syllabusCompleted } = req.body

  const attachments = req.files?.map(file => `/temp/${file.originalname}`) || []

  const subject = await Subject.create({
    student: studentId,
    subjectName,
    description,
    syllabusCompleted,
    attachments,
  })

  res
    .status(201)
    .json(new ApiResponse(201, subject, "Subject added"))
})

const getAllSubjects = asyncHandler(async (req, res) => {
  const subjects = await Subject.find()
  res
    .status(200)
    .json(
      new ApiResponse(200, subjects)
    );
})

const getSubjects = asyncHandler(async (req, res) => {
  const { studentId } = req.params

  const subjects = await Subject.find({ student: studentId })

  res
    .status(200)
    .json(
        new ApiResponse(200, subjects)
    )
})

export {addSubject, getSubjects, getAllSubjects}