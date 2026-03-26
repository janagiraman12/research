const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Workflow = sequelize.define('Workflow', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  step: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING(150), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  icon: { type: DataTypes.STRING(100), defaultValue: 'CheckCircle' },
}, { tableName: 'workflow' });

module.exports = Workflow;
