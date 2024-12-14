const router = require('express').Router();
const goalsController = require('../controllers/goalsController');
const { ensureAuth } = require('../middleware/auth')

// Goal view logic
router.get('/userGoals', ensureAuth, goalsController.userGoalsView);
router.post('/userGoals', ensureAuth, goalsController.userGoalsView);
router.get("/userGoals/create", ensureAuth, goalsController.createGoalsView);
router.post("/userGoals/create", ensureAuth, goalsController.createGoalFromForm)
router.get("/userGoals/update/:goalId", ensureAuth, goalsController.updateGoalView);
router.post("/userGoals/update", ensureAuth, goalsController.updateGoalFromForm)
router.get("/userGoals/remove/:goalId", ensureAuth, goalsController.deleteGoalView)
router.post("/userGoals/remove", ensureAuth, goalsController.deleteGoalFromForm)

router.post('/goals', ensureAuth, goalsController.createGoal);
router.get("/goals", ensureAuth, goalsController.getGoals)
router.get('/goals/:id', ensureAuth, goalsController.getGoalById);
router.put('/goals/:id', ensureAuth, goalsController.updateGoal);
router.delete('/goals/:id', ensureAuth, goalsController.deleteGoal);

module.exports = router;