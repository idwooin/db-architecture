const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('../../docs/swaggerDef');

const router = express.Router();

router.use('/', swaggerUi.serve,swaggerUi.setup(swaggerDefinition, {
    explorer: true,
  }));
router.get(
  '/',
  swaggerUi.setup(swaggerDefinition, {
    explorer: true,
  })
);

module.exports = router;