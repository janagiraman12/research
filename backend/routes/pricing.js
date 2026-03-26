const router = require('express').Router();
const ctrl = require('../controllers/pricingController');
const { protect } = require('../middleware/auth');

router.get('/', ctrl.getAllPricing);
router.get('/admin', protect, ctrl.getAllPricingAdmin);
router.post('/', protect, ctrl.createPricing);
router.put('/:id', protect, ctrl.updatePricing);
router.delete('/:id', protect, ctrl.deletePricing);

module.exports = router;
