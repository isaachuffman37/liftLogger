const router = require('express').Router();

router.use('/', require('./swagger'));
router.use('/', require('./workoutHistory'))

module.exports = router;
