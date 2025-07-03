import mongoose from "mongoose"

const slotSchema = new mongoose.Schema({
  period: String,         
  subject: String,
  teacher: String,
})

const daySchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    required: true,
  },
  slots: [slotSchema],
});

const timetableSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    week: [daySchema],
  },
  { timestamps: true }
)

export const Timetable = mongoose.model("Timetable", timetableSchema)
