const { Schema, model, Types } = require('mongoose');


const historySchema = new Schema({
  userId: {
    type: Types.ObjectId, 
    required: true,
    ref: "User",
  },
  workoutId: {
    type: Types.ObjectId,
    required: true,
    ref: "Workout",
  },
  date: {
    type: Date,
    default: new Date().toISOString(),
  },
  weights: {
    type: [{ 
      exerciseName: {
        type: String,
        required: true,
      }, 
      weight: {
        type: Number,
        required: true,
      }
    }], 
    default: [],
  },
});

const historyModel = model('WorkoutHistory', historySchema, 'workoutHistory');

module.exports = historyModel