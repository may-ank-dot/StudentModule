import { Student } from "../models/student.models.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"

const createStudent = asyncHandler(async (req, res) => {
    const {
        name, roll, studentClass, section, gender, dob,
        parentType, parentName, parentNumber, parentEmail,
        currentAddress, permanentAddress
    } = req.body;

    if (!name || !roll || !studentClass || !section || !gender || !dob || !parentType || !parentName || !parentNumber || !parentEmail || !currentAddress || !permanentAddress) {
        throw new ApiError(400, "All fields are required");
    }

    const existing = await Student.findOne({ roll });
    if (existing) {
        throw new ApiError(409, "Student with this roll number already exists");
    }

    const student = await Student.create({
        name, roll, studentClass, section, gender, dob,
        parentType, parentName, parentNumber, parentEmail,
        currentAddress, permanentAddress
    })

    res
        .status(201)
        .json(
            new ApiResponse(201, student, "Student created successfully")
        )
})

const getAllStudents = asyncHandler(async (req, res) => {
    const students = await Student.find();
    res
        .status(200)
        .json(
            new ApiResponse(200, students)
        )
})

const getStudentById = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id)
    if (!student) throw new ApiError(404, "Student not found")
    res
        .status(200)
        .json(
            new ApiResponse(200, student)
        )
})

const updateStudent = asyncHandler(async (req, res) => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })

    if (!student) throw new ApiError(404, "Student not found")
    res
        .status(200)
        .json(
            new ApiResponse(200, student, "Student updated successfully")
        )
})

const deleteStudent = asyncHandler(async (req, res) => {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) throw new ApiError(404, "Student not found");
    res
       .status(200)
       .json(
            new ApiResponse(200, student, "Student deleted successfully")
        )
})

export {
    deleteStudent, 
    createStudent, 
    updateStudent, 
    getAllStudents, 
    getStudentById
}