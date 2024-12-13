const router = require("express").Router();
const workoutsController = require("../controllers/workoutsControlller");

// Route to create a new workout
router.post("/workouts", workoutsController.createWorkout);
router.get("/workouts/user", workoutsController.getWorkoutsByUserId);
router.get("/workouts/:id", workoutsController.getWorkoutsById)
router.delete("/workouts/:id", workoutsController.deleteWorkoutById);
router.put("/workouts/:id", workoutsController.updateWorkoutById);
router.get("/workouts/exercises/:exerciseId", workoutsController.getExerciseById)

// Workout creation view
router.get("/userWorkouts/create", workoutsController.deliverWorkoutView)
// router.post("/userWorkouts/create", workoutsController.createWorkout)

// Workout update view
router.get("/userWorkouts", workoutsController.getWorkoutsView)
router.post("/userWorkouts", workoutsController.createWorkoutFromForm)
router.get("/userWorkouts/updateExercise/:exerciseId", workoutsController.deliverWorkoutUpdateView)
router.post("/userWorkouts/updateExercise", workoutsController.updateWorkoutFromForm)

router.get("/userWorkouts/removeExercise/:exerciseId", workoutsController.deleteExerciseView)
router.post("/userWorkouts/removeExercise", workoutsController.deleteExerciseFromForm)

router.get("/userWorkouts/delete/:workoutId", workoutsController.deleteWorkoutView)
router.post("/userWorkouts/delete", workoutsController.deleteWorkoutFromForm)

module.exports = router;