const sequelize = require('../config/database');

const Admin = require('./Admin');
const Service = require('./Service');
const Pricing = require('./Pricing');
const Testimonial = require('./Testimonial');
const Contact = require('./Contact');
const Workflow = require('./Workflow');

// Sync all models (creates tables if they don't exist)
const syncDatabase = async () => {
  await sequelize.sync({ alter: true });
  console.log('✅ MySQL tables synced');
};

module.exports = { sequelize, syncDatabase, Admin, Service, Pricing, Testimonial, Contact, Workflow };
