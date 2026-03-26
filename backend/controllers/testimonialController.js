const { Testimonial } = require('../models');

exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({ where: { isActive: true }, order: [['createdAt', 'DESC']] });
    res.json({ success: true, data: testimonials });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAllTestimonialsAdmin = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ success: true, data: testimonials });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ success: true, data: testimonial });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const t = await Testimonial.findByPk(req.params.id);
    if (!t) return res.status(404).json({ success: false, message: 'Testimonial not found' });
    await t.update(req.body);
    res.json({ success: true, data: t });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const t = await Testimonial.findByPk(req.params.id);
    if (!t) return res.status(404).json({ success: false, message: 'Testimonial not found' });
    await t.destroy();
    res.json({ success: true, message: 'Testimonial deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
