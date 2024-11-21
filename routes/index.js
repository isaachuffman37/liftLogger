const router = require('express').Router();
const user = require('./users');

router.use('/', require('./swagger'));
router.use('/users', user);

module.exports = router;
