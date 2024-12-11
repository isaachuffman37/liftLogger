const router = require('express').Router();
const goalsController = require('../controllers/goalsController');

// Goal view logic
router.get('/userGoals', goalsController.userGoalsView);
router.post('/userGoals', goalsController.userGoalsView);
router.get("/userGoals/create", goalsController.createGoalsView);
router.post("/userGoals/create", goalsController.createGoalFromForm)
router.get("/userGoals/update/:goalId", goalsController.updateGoalView);
router.post("/userGoals/update", goalsController.updateGoalFromForm)
router.get("/userGoals/remove/:goalId", goalsController.deleteGoalView)
router.post("/userGoals/remove", goalsController.deleteGoalFromForm)

router.post('/goals', goalsController.createGoal);
router.get("/goals", goalsController.getGoals)
router.get('/goals/:id', goalsController.getGoalById);
router.put('/goals/:id', goalsController.updateGoal);
router.delete('/goals/:id', goalsController.deleteGoal);

module.exports = router;