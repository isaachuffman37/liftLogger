const Workout = require("../models/Workouts");
const mongoose = require('mongoose');
const utils = require("../utilities");

async function createWorkout(req, res, next) {
  // res.app.locals.exerciseData = req.body.exercises

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
    const userId = req.params.userId
    
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
  
    try {
      const workouts = await Workout.find({ userId }); // Query workouts by userId
      if (workouts.length === 0) {
        return res.status(404).json({ message: "No workouts found for this user" });
      }
  
      res.status(200).json(workouts); // Send workouts in response
      
    } catch (error) {
      console.error("Error fetching workouts:", error);
      res.status(500).json({ error: "Internal server error" });
    }
}

async function getWorkoutsById(req, res) {
  try {
    const { id } = req.params
    const workoutData = await Workout.findById(id)

    if (workoutData) {
      res.status(200).json(workoutData)
    } else {
      return res.status(404).json({ message: "No workouts found under this id." })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getExerciseById(req, res) {
  try {
    const exerciseId = mongoose.Types.ObjectId.createFromHexString(req.params.exerciseId)
    const exercises = await Workout.aggregate([
      { $unwind: "$exercises" },
      { $match: { "exercises._id": exerciseId } },
      { $replaceRoot: {
        newRoot: "$exercises"
      } }
    ])

    if (exercises) {
      res.status(200).json(exercises[0])
    } else {
      res.status(404).json({ message: "No exercises found under this id."})
    }
  } catch (error) {
    console.error(error)
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

async function deliverWorkoutView(req, res, next) {
  const userId = req.user.id
  // const workouts = utils.buildWorkoutFieldsets(req.app.locals.exerciseData)
  
  res.render("addWorkout", {
    title: "Create workout",
    user_id: userId,
    // workouts: workouts,
  })
}

async function deliverWorkoutUpdateView(req, res) {
  try {
    const userId = req.user.id
    const exerciseId = mongoose.Types.ObjectId.createFromHexString(req.params.exerciseId)
    const exercises = await Workout.aggregate([
      { $unwind: "$exercises" },
      { $match: { "exercises._id": exerciseId } },
      { $replaceRoot: {
        newRoot: "$exercises"
      } }
    ])
    
    res.render("updateExercise", {
      title: "Update Exercise",
      exercise: exercises[0],
      exerciseId: exerciseId,
      userId: userId
    })
  } catch (error) {
    console.error(error)
    req.flash("notice", error.message)
    res.redirect("/userWorkouts/")
  }
}

async function updateWorkoutFromForm(req, res) {
  try {
    const { exerciseName, reps, sets, exerciseId, userId } = req.body
    const exerciseObjectId = mongoose.Types.ObjectId.createFromHexString(exerciseId)
    const userWorkouts = await Workout.find({ userId: userId, "exercises._id": exerciseId })
    const workout = userWorkouts[0]

    for (let i = 0; i < workout.exercises.length; i++) {
      const exercise = workout.exercises[i]
      if (exercise._id.toString() == exerciseId) {
        exercise.exerciseName = exerciseName
        exercise.reps = parseInt(reps)
        exercise.sets = parseInt(sets)
        
        workout.markModified("exercises")
        await workout.save()
      }
    }

    res.redirect("/userWorkouts")
  } catch (error) {
    console.error(error)
    req.flash("notice", error.message)
    res.redirect("/userWorkouts")
  }
}

async function deleteWorkoutView(req, res) {
  try {
    const { workoutId } = req.params
    const workout = await Workout.findById(workoutId)
    const workoutMarkup = utils.buildReadonlyWorkoutFieldsets(workout.exercises)

    if (workout) {
        res.render("removeWorkout", {
        title: `Remove ${ workout.workoutName }`,
        workoutMarkup: workoutMarkup,
        workoutName: workout.workoutName,
        workoutId: workoutId,
      })
    } else {
      res.redirect("/userWorkouts")
    }
  } catch (error) {
    console.error(error)
  }
}

async function deleteWorkoutFromForm(req, res) {
  try { 
    const { workoutId } = req.body
    Workout.findByIdAndDelete(workoutId).then(workout => {
      if (workout) {
        res.redirect("/userWorkouts")
      } else {
        res.redirect(`/userWorkouts/${ workoutId }`)
      }
    })
  } catch (error) {
    console.error(error)
    req.flash("notice", error.message)
    res.redirect("/userWorkouts")
  }
}

async function createWorkoutFromForm(req, res, next) {
  // res.app.locals.exerciseData = req.body.exercises

  try {
    const workout = new Workout(req.body);
    await workout.save();
    res.redirect("/userWorkouts")
    // res.status(201).json(savedWorkout);
  } catch (error) {
    console.error("Error creating workout:", error);
    req.flash("notice", error.message)
    res.redirect("/userWorkouts/create")
  }
}

// Function to get all workouts for the logged in user
async function getWorkoutsView(req, res) {
    const userId = req.user.id;
    
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
  
    try {
      const workouts = await Workout.find({ userId }); // Query workouts by userId

      res.render('workouts', {
        title: "Workouts",
        workoutsData: workouts, 
      })
      
    } catch (error) {
      console.error("Error fetching workouts:", error);
      res.status(500).json({ error: "Internal server error" });
    }
}

async function deleteExerciseView(req, res) {
  try {
    const exerciseId = mongoose.Types.ObjectId.createFromHexString(req.params.exerciseId)
    const exercises = await Workout.aggregate([
      { 
        $unwind: "$exercises" 
      },
      { 
        $match: { 
          "exercises._id": exerciseId 
        } 
      },
      { 
        $replaceRoot: {
          newRoot: "$exercises"
        } 
      }
    ])

    res.render("removeExercise", {
      title: `Remove Exercise ${ exercises[0].exerciseName }`,
      exercise: exercises[0],
      exerciseId: req.params.exerciseId,
      userId: req.user.id
    })
  } catch (error) {
    console.error(error)
  }
}

async function deleteExerciseFromForm(req, res) {
  try {
    const { exerciseId, userId } = req.body
    const exerciseObjectId = mongoose.Types.ObjectId.createFromHexString(exerciseId)

    const userWorkouts = await Workout.find({ userId: userId, "exercises._id": exerciseId })
    const workout = userWorkouts[0]

    for (let i = 0; i < workout.exercises.length; i++) {
      const exercise = workout.exercises[i]

      if (exercise._id.toString() === exerciseId && workout.exercises.length > 1) {
        workout.exercises.splice(i, 1)
        workout.markModified("exercises")
        workout.save().catch(err => {
          res.redirect("/userWorkouts")
          return
        })
      }
    }

    res.redirect("/userWorkouts")
  } catch (error) {
    console.error(error)
  }
}

const workoutController = {
  deliverWorkoutView,
  deliverWorkoutUpdateView,
  deleteWorkoutById,
  createWorkout,
  getWorkoutsByUserId,
  updateWorkoutById,
  updateWorkoutFromForm,
  getWorkoutsView,
  deleteWorkoutView,
  createWorkoutFromForm,
  deleteWorkoutFromForm,
  deleteExerciseFromForm,
  deleteExerciseView,
  getWorkoutsById,
  getExerciseById,
};

module.exports = workoutController