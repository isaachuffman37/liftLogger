const router = require('express').Router();
const { createHistory, getAllHistory, getHistory, updateHistory, deleteHistory, addWeight, getWeight, getAllWeights, updateWeight, deleteWeight } = require('../controllers/workoutHistoryController');

router.post('/history', createHistory);
router.get('/history', getAllHistory);
router.get('/history/:id', getHistory);
router.put('/history/:id', updateHistory);
router.delete('/history/:id', deleteHistory);

// Some additional routes for adding sub weights to the workout history document
router.post('/history/:id/weight', addWeight);
router.get('/history/:id/weight/', getAllWeights);
router.get('/history/:id/weight/:subid', getWeight);
router.put('/history/:id/weight/:subid', updateWeight);
router.delete('/history/:id/weight/:subid', deleteWeight);

module.exports = router;
