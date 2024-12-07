const router = require('express').Router();
const user = require('./users');
const layout = require('./layout')
const login = require('./login');

router.use(require("./static"))
router.use('/', layout)
router.use('/', login)
router.use('/', require('./swagger'));
router.use('/', require('./workoutHistory'))
router.use('/users', user);
router.use('/', require('./workoutsRoutes'));
router.use('/', require('./goalsRoutes'));
router.use('/', require('./auth'));

module.exports = router;
