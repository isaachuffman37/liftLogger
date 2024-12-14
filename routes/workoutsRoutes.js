const router = require("express").Router();
const workoutsController = require("../controllers/workoutsControlller");
const { ensureAuth } = require('../middleware/auth')

// Route to create a new workout

router.post("/workouts", ensureAuth, workoutsController.createWorkout);
router.get("/workouts/user", ensureAuth, workoutsController.getWorkoutsByUserId);
router.get("/workouts/:id", ensureAuth, workoutsController.getWorkoutsById)
router.delete("/workouts/:id", ensureAuth, workoutsController.deleteWorkoutById);
router.put("/workouts/:id", ensureAuth, workoutsController.updateWorkoutById);
router.get("/workouts/exercises/:exerciseId", ensureAuth, workoutsController.getExerciseById)


// Workout creation view
router.get("/userWorkouts/create", ensureAuth, workoutsController.deliverWorkoutView)
// router.post("/userWorkouts/create", workoutsController.createWorkout)

// Workout update view
router.get("/userWorkouts", ensureAuth, workoutsController.getWorkoutsView)
router.post("/userWorkouts", ensureAuth, workoutsController.createWorkoutFromForm)
router.get("/userWorkouts/updateExercise/:exerciseId", ensureAuth, workoutsController.deliverWorkoutUpdateView)
router.post("/userWorkouts/updateExercise", ensureAuth, workoutsController.updateWorkoutFromForm)

router.get("/userWorkouts/removeExercise/:exerciseId", ensureAuth, workoutsController.deleteExerciseView)
router.post("/userWorkouts/removeExercise", ensureAuth, workoutsController.deleteExerciseFromForm)

router.get("/userWorkouts/delete/:workoutId", ensureAuth, workoutsController.deleteWorkoutView)
router.post("/userWorkouts/delete", ensureAuth, workoutsController.deleteWorkoutFromForm)

module.exports = router;