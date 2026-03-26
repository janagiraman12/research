const jwt = require('jsonwebtoken');
const { Admin, Service, Pricing, Testimonial, Contact } = require('../models');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Email and password are required' });

    const admin = await Admin.findOne({ where: { email } });
    if (!admin || !(await admin.comparePassword(password)))
      return res.status(401).json({ success: false, message: 'Invalid email or password' });

    const token = signToken(admin.id);
    res.json({
      success: true,
      token,
      admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getMe = async (req, res) => {
  res.json({ success: true, admin: req.admin });
};

exports.getDashboardStats = async (req, res) => {
  try {
    const [services, pricing, testimonials, contacts, newContacts] = await Promise.all([
      Service.count(),
      Pricing.count(),
      Testimonial.count(),
      Contact.count(),
      Contact.count({ where: { status: 'new' } }),
    ]);
    res.json({ success: true, data: { services, pricing, testimonials, contacts, newContacts } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
