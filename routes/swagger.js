const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');
const { ensureAuth } = require('../middleware/auth')

router.use('/api-doc', swaggerUi.serve);
router.get('/api-doc', ensureAuth, swaggerUi.setup(swaggerDocument));

module.exports = router;
