const router = require('express').Router();
const user = require('./users');
const layout = require('./layout')

// const express = require('express')
// const app = express()
// const expressLayouts = require('express-ejs-layouts')

// router.get('', (req, res) => {
//   res.render('index')
// })

// router.get('/', (req, res) => {
//   res.render('index')
// })

router.use('/', layout)
// router.use('/', require('./swagger'));
// router.use('/', require('./workoutHistory'))
router.use('/users', user);
// router.use('/', require('./workoutsRoutes'));
// router.use('/', require('./goalsRoutes'));

module.exports = router;
