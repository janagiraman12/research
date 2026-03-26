const router = require('express').Router();
const ctrl = require('../controllers/workflowController');

router.get('/', ctrl.getWorkflow);

module.exports = router;
