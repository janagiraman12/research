const router = require('express').Router();
const ctrl = require('../controllers/testimonialController');
const { protect } = require('../middleware/auth');

router.get('/', ctrl.getAllTestimonials);
router.get('/admin', protect, ctrl.getAllTestimonialsAdmin);
router.post('/', protect, ctrl.createTestimonial);
router.put('/:id', protect, ctrl.updateTestimonial);
router.delete('/:id', protect, ctrl.deleteTestimonial);

module.exports = router;
