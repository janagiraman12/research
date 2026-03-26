require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { sequelize, syncDatabase } = require('./models');

const app = express();

// Middleware — allow all origins in development
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/admin',        require('./routes/admin'));
app.use('/api/services',     require('./routes/services'));
app.use('/api/pricing',      require('./routes/pricing'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/contacts',     require('./routes/contacts'));
app.use('/api/workflow',     require('./routes/workflow'));

// Health check
app.get('/api/health', (req, res) =>
  res.json({ status: 'ok', message: 'ResearchAssist Pro API (MySQL) is running' })
);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ success: false, message: err.message || 'Internal Server Error' });
});

// Start: connect DB then listen
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connected');
    await syncDatabase();
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    console.error('👉 Check your .env file: DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD');
    process.exit(1);
  }
})();
