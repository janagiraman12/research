const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Contact = sequelize.define('Contact', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(150), allowNull: false },
  email: { type: DataTypes.STRING(200), allowNull: false },
  phone: { type: DataTypes.STRING(30), defaultValue: '' },
  subject: { type: DataTypes.STRING(200), defaultValue: 'General Inquiry' },
  message: { type: DataTypes.TEXT, allowNull: false },
  status: {
    type: DataTypes.ENUM('new', 'read', 'replied'),
    defaultValue: 'new',
  },
}, { tableName: 'contacts' });

module.exports = Contact;
