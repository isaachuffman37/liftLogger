const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');
const { ensureAuth } = require('../middleware/auth')

router.use('/api-docs', ensureAuth, swaggerUi.serve);
router.get('/api-docs', ensureAuth, swaggerUi.setup(swaggerDocument));

module.exports = router;
