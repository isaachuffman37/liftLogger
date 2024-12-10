const router = require('express').Router();
const historyController = require('../controllers/workoutHistoryController');

// Frontend routes and views
router.get("/userHistory", historyController.userHistoryView)
router.get("/userHistory/create", historyController.createHistoryView)
router.post("/userHistory/create", historyController.createHistoryFromForm)
router.get("/userHistory/update/:historyId/:weightId", historyController.updateHistoryView)
router.post("/userHistory/update", historyController.updateHistoryFromForm)

router.get("/userHistory/remove/:historyId", historyController.deleteHistoryView)
router.get("/userHistory/remove/:historyId/:weightId", historyController.deleteHistoryCardView)
router.post("/userHistory/remove/:historyId", historyController.deleteHistoryFromForm)
router.post("/userHistory/remove/:historyId/:weightId", historyController.deleteHistoryCardFromForm)

router.post('/history', historyController.createHistory);
router.get('/history', historyController.getAllHistory);
router.get('/history/:id', historyController.getHistory);
router.put('/history/:id', historyController.updateHistory);
router.delete('/history/:id', historyController.deleteHistory);

// Some additional routes for adding sub weights to the workout history document
router.post('/history/:id/weight', historyController.addWeight);
router.get('/history/:id/weight/', historyController.getAllWeights);
router.get('/history/:id/weight/:subid', historyController.getWeight);
router.put('/history/:id/weight/:subid', historyController.updateWeight);
router.delete('/history/:id/weight/:subid', historyController.deleteWeight);

module.exports = router;
