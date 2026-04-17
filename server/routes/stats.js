const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.get('/', (req, res) => {
  res.json(db.prepare('SELECT * FROM stats ORDER BY sort_order ASC').all());
});

router.post('/', auth, (req, res) => {
  const { label, value, suffix, icon, sort_order } = req.body;
  if (!label || value === undefined) return res.status(400).json({ error: 'invalid_request', message: 'label and value are required' });
  const info = db.prepare('INSERT INTO stats (label, value, suffix, icon, sort_order) VALUES (?, ?, ?, ?, ?)')
    .run(label, value, suffix || '+', icon || 'TrendingUp', sort_order || 0);
  res.status(201).json(db.prepare('SELECT * FROM stats WHERE id=?').get(info.lastInsertRowid));
});

router.put('/:id', auth, (req, res) => {
  const { label, value, suffix, icon, sort_order } = req.body;
  const existing = db.prepare('SELECT id FROM stats WHERE id=?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'not_found', message: 'Stat not found' });
  db.prepare('UPDATE stats SET label=?, value=?, suffix=?, icon=?, sort_order=? WHERE id=?')
    .run(label, value, suffix || '+', icon || 'TrendingUp', sort_order || 0, req.params.id);
  res.json(db.prepare('SELECT * FROM stats WHERE id=?').get(req.params.id));
});

router.delete('/:id', auth, (req, res) => {
  const existing = db.prepare('SELECT id FROM stats WHERE id=?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'not_found', message: 'Stat not found' });
  db.prepare('DELETE FROM stats WHERE id=?').run(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;
