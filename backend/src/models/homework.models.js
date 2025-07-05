import mongoose from "mongoose"

const homeworkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  dueDate: {
    type: Date,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  assignedClass: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  }
}, { timestamps: true });

export const Homework = mongoose.model("Homework", homeworkSchema)
