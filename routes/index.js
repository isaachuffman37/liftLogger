const router = require('express').Router();

router.use('/', require('./swagger'));
router.use('/', require('./workoutsRoutes'));

module.exports = router;
