const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const ExerciseSchema = new Schema({
  exerciseName: {
    type: String,
    required: [true, "Exercise name is required"],
    trim: true,
  },
  reps: {
    type: Number,
    required: [true, "Reps count is required"],
    min: [1, "Reps must be at least 1"],
  },
  sets: {
    type: Number,
    required: [true, "Sets count is required"],
    min: [1, "Sets must be at least 1"],
  },
});


const WorkoutSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User ID is required"],
      ref: "User", 
    },
    workoutName: {
      type: String,
      required: [true, "Workout name is required"],
      trim: true,
    },
    exercises: {
      type: [ExerciseSchema], 
      validate: {
        validator: function (value) {
          return value.length > 0;
        },
        message: "At least one exercise is required",
      },
    },
    createdAt: {
      type: Date,
      default: Date.now, 
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, 
  }
);

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
