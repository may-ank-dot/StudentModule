import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    roll: {
      type: Number,
      required: true,
      index: true,
      unique: true,
    },
    studentClass: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    parentType: {
      type: String,
      enum: ["Father", "Mother", "Local Guardian"],
      required: true,
    },
    parentName: {
      type: String,
      required: true,
    },
    parentNumber: {
      type: String,
      required: true,
    },
    parentEmail: {
      type: String,
      required: true,
    },
    currentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Student = mongoose.model("Student", studentSchema);
