const { Workflow } = require('../models');

exports.getWorkflow = async (req, res) => {
  try {
    const steps = await Workflow.findAll({ order: [['step', 'ASC']] });
    res.json({ success: true, data: steps });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
