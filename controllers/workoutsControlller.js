const Workout = require("../models/Workouts");
const mongoose = require('mongoose');


async function createWorkout(req, res, next) {
    console.log('THIS IS THE REQUEST BODY',req.body)
  try {
    const workout = new Workout(req.body);
    const savedWorkout = await workout.save();
    res.status(201).json(savedWorkout);
  } catch (error) {
    console.error("Error creating workout:", error);
    res.status(400).json({ error: error.message });
  }
}

// Function to get all workouts for a specific user
async function getWorkoutsByUserId(req, res) {
    const userId = req.params.userId;
  
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
  
    try {
      const workouts = await Workout.find({ userId }); // Query workouts by userId
      if (workouts.length === 0) {
        return res.status(404).json({ message: "No workouts found for this user" });
      }
  
      // res.status(200).json(workouts); // Send workouts in response
      res.render('workouts', {workoutsData: workouts})
      
    } catch (error) {
      console.error("Error fetching workouts:", error);
      res.status(500).json({ error: "Internal server error" });
    }
}

async function deleteWorkoutById(req, res) {
    const { id } = req.params;
  
    if (!id) {
      return res.status(400).json({ error: "Workout ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid Workout ID" });
    }
  
    try {
      const deletedWorkout = await Workout.findByIdAndDelete(id);
  
      if (!deletedWorkout) {
        return res.status(404).json({ message: "Workout not found" });
      }
  
      res.status(200).json({ message: "Workout deleted successfully", workout: deletedWorkout });
    } catch (error) {
      console.error("Error deleting workout:", error);
      res.status(500).json({ error: "Internal server error" });
    }
}

async function updateWorkoutById(req, res) {
    const { id } = req.params; 
    const updateData = req.body; 
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Workout ID format" });
    }
  
    try {
      const updatedWorkout = await Workout.findByIdAndUpdate(id, updateData, {
        new: true, 
        runValidators: true, // Validate the updateData against the schema
      });
  
      if (!updatedWorkout) {
        return res.status(404).json({ message: "Workout not found" });
      }
  
      res.status(200).json({ message: "Workout updated successfully", workout: updatedWorkout });
    } catch (error) {
      console.error("Error updating workout:", error);
      res.status(500).json({ error: "Internal server error" });
    }
}

const workoutController = {
    deleteWorkoutById,
    createWorkout,
    getWorkoutsByUserId,
    updateWorkoutById
};

module.exports = workoutController