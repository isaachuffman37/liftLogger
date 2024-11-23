const router = require('express').Router();
const user = require('./users');

router.use('/', require('./swagger'));
router.use('/users', user);
router.use('/', require('./workoutsRoutes'));
router.use('/', require('./goalsRoutes'));

module.exports = router;
