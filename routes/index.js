const router = require('express').Router();

router.use('/', require('./swagger'));
router.use('/', require('./workoutsRoutes'));
router.use('/', require('./goalsRoutes'));

module.exports = router;
