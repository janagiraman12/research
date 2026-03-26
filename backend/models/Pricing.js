const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pricing = sequelize.define('Pricing', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  serviceName: { type: DataTypes.STRING(200), allowNull: false },
  tier: {
    type: DataTypes.ENUM('Basic', 'Professional', 'Premium'),
    allowNull: false,
  },
  price: { type: DataTypes.STRING(100), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  // Store features as JSON string in MySQL
  features: {
    type: DataTypes.TEXT,
    defaultValue: '[]',
    get() {
      const raw = this.getDataValue('features');
      try { return JSON.parse(raw); } catch { return []; }
    },
    set(val) {
      this.setDataValue('features', JSON.stringify(Array.isArray(val) ? val : []));
    },
  },
  isPopular: { type: DataTypes.BOOLEAN, defaultValue: false },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'pricing' });

module.exports = Pricing;
