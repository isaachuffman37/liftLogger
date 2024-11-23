const router = require('express').Router();
const goalsController = require('../controllers/goalsController');

router.post('/goals', goalsController.createGoal);
router.get('/goals', goalsController.getGoals);
router.get('/goals/:id', goalsController.getGoalById);
router.put('/goals/:id', goalsController.updateGoal);
router.delete('/goals/:id', goalsController.deleteGoal);

module.exports = router;