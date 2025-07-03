import mongoose from "mongoose"

const subjectSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    subjectName: {
      type: String,
      required: true,
    },
    description: String,
    syllabusCompleted: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    attachments: [String], // array of file URLs
  },
  { timestamps: true }
)

export const Subject = mongoose.model("Subject", subjectSchema)
