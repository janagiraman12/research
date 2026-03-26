const { Pricing } = require('../models');

exports.getAllPricing = async (req, res) => {
  try {
    const pricing = await Pricing.findAll({ where: { isActive: true }, order: [['createdAt', 'ASC']] });
    res.json({ success: true, data: pricing });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAllPricingAdmin = async (req, res) => {
  try {
    const pricing = await Pricing.findAll({ order: [['createdAt', 'ASC']] });
    res.json({ success: true, data: pricing });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createPricing = async (req, res) => {
  try {
    const pricing = await Pricing.create(req.body);
    res.status(201).json({ success: true, data: pricing });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.updatePricing = async (req, res) => {
  try {
    const pricing = await Pricing.findByPk(req.params.id);
    if (!pricing) return res.status(404).json({ success: false, message: 'Pricing not found' });
    await pricing.update(req.body);
    res.json({ success: true, data: pricing });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deletePricing = async (req, res) => {
  try {
    const pricing = await Pricing.findByPk(req.params.id);
    if (!pricing) return res.status(404).json({ success: false, message: 'Pricing not found' });
    await pricing.destroy();
    res.json({ success: true, message: 'Pricing deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
