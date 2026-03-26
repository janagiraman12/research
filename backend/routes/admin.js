// routes/admin.js
const adminRouter = require('express').Router();
const adminCtrl = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
adminRouter.post('/login', adminCtrl.login);
adminRouter.get('/me', protect, adminCtrl.getMe);
adminRouter.get('/dashboard', protect, adminCtrl.getDashboardStats);
module.exports = adminRouter;
