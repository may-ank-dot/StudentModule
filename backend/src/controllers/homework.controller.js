import { Homework } from "../models/homework.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";

const createHomework = asyncHandler(async (req, res) => {
  const { title, description, dueDate, subject, assignedClass, section } = req.body;

  if (!title || !dueDate || !subject || !assignedClass || !section) {
    throw new ApiError(400, "All required fields must be filled");
  }

  const homework = await Homework.create({
    title, description, dueDate, subject, assignedClass, section
  });

  res.status(201).json(new ApiResponse(201, homework, "Homework assigned successfully"));
});

const getAllHomework = asyncHandler(async (req, res) => {
  const allHomework = await Homework.find().sort({ dueDate: 1 });
  res.status(200).json(new ApiResponse(200, allHomework));
});

export { createHomework, getAllHomework };
