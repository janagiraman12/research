const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Testimonial = sequelize.define('Testimonial', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(150), allowNull: false },
  designation: { type: DataTypes.STRING(150), defaultValue: 'Researcher' },
  institution: { type: DataTypes.STRING(200), defaultValue: '' },
  feedback: { type: DataTypes.TEXT, allowNull: false },
  rating: { type: DataTypes.TINYINT, defaultValue: 5 },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'testimonials' });

module.exports = Testimonial;
