const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const GoalSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, "User ID is required"],
    ref: "User", 
  },
  goalTitle: {
    type: String,
    required: [true, "Goal title is required"],
    trim: true,
  },
  goalWeight: {
    type: Number,
    required: [true, "Goal weight is required"],
  },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
    default: "Not Started", 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deadline: {
    type: Date,
    required: [true, "Deadline is required"],
  },
});

const Goal = model('Goal', GoalSchema);
module.exports = Goal;
