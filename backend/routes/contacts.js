const router = require('express').Router();
const ctrl = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

router.post('/', ctrl.submitContact);
router.get('/', protect, ctrl.getAllContacts);
router.put('/:id', protect, ctrl.updateContactStatus);
router.delete('/:id', protect, ctrl.deleteContact);

module.exports = router;
