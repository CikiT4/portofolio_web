require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve frontend in production
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/hero', require('./routes/hero'));
app.use('/api/about', require('./routes/about'));
app.use('/api/experiences', require('./routes/experiences'));
app.use('/api/services', require('./routes/services'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/education', require('./routes/education'));
app.use('/api/organizations', require('./routes/organizations'));
app.use('/api/faqs', require('./routes/faqs'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/upload', require('./routes/upload'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// Catch-all route for React Router (must be after API routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// 404
app.use((req, res) => res.status(404).json({ error: 'not_found', message: 'Endpoint not found' }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: 'server_error', message: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Hayden Portfolio API running on http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health\n`);
});
