const router = require('express').Router();
const historyController = require('../controllers/workoutHistoryController');
const { ensureAuth } = require('../middleware/auth')

// Frontend routes and views
router.get("/userHistory", ensureAuth, historyController.userHistoryView)
router.get("/userHistory/create", ensureAuth, historyController.createHistoryView)
router.post("/userHistory/create", ensureAuth, historyController.createHistoryFromForm)
router.get("/userHistory/update/:historyId/:weightId", ensureAuth, historyController.updateHistoryView)
router.post("/userHistory/update", ensureAuth, historyController.updateHistoryFromForm)

router.get("/userHistory/remove/:historyId", ensureAuth, historyController.deleteHistoryView)
router.get("/userHistory/remove/:historyId/:weightId", ensureAuth, historyController.deleteHistoryCardView)
router.post("/userHistory/remove/:historyId", ensureAuth, historyController.deleteHistoryFromForm)
router.post("/userHistory/remove/:historyId/:weightId", ensureAuth, historyController.deleteHistoryCardFromForm)

router.post('/history', ensureAuth, historyController.createHistory);
router.get('/history', ensureAuth, historyController.getAllHistory);
router.get('/history/:id', ensureAuth, historyController.getHistory);
router.put('/history/:id', ensureAuth, historyController.updateHistory);
router.delete('/history/:id', ensureAuth, historyController.deleteHistory);

// Some additional routes for adding sub weights to the workout history document
router.post('/history/:id/weight', ensureAuth, historyController.addWeight);
router.get('/history/:id/weight/', ensureAuth, historyController.getAllWeights);
router.get('/history/:id/weight/:subid', ensureAuth, historyController.getWeight);
router.put('/history/:id/weight/:subid', ensureAuth, historyController.updateWeight);
router.delete('/history/:id/weight/:subid', ensureAuth, historyController.deleteWeight);

module.exports = router;
