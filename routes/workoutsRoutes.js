const router = require("express").Router();
const workoutsController = require("../controllers/workoutsControlller");

// Route to create a new workout
router.post("/workouts", workoutsController.createWorkout);
router.get("/workouts/user/:userId", workoutsController.getWorkoutsByUserId);
router.delete("/workouts/:id", workoutsController.deleteWorkoutById);
router.put("/workouts/:id", workoutsController.updateWorkoutById);

module.exports = router;