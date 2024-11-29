const router = require('express').Router();
const user = require('./users');
const layout = require('./layout')

router.use('/', layout)
router.use('/', require('./swagger'));
router.use('/', require('./workoutHistory'))
router.use('/users', user);
router.use('/', require('./workoutsRoutes'));
router.use('/', require('./goalsRoutes'));

module.exports = router;
