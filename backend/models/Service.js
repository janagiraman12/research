const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Service = sequelize.define('Service', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(200), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  category: {
    type: DataTypes.ENUM(
      'Manuscript Writing Support',
      'Journal Support',
      'Thesis/Dissertation',
      'Conference Support',
      'Technical Services'
    ),
    allowNull: false,
  },
  icon: { type: DataTypes.STRING(100), defaultValue: 'DocumentText' },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  order: { type: DataTypes.INTEGER, defaultValue: 0 },
}, { tableName: 'services' });

module.exports = Service;
