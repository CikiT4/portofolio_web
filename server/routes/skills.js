const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.get('/', (req, res) => {
  res.json(db.prepare('SELECT * FROM skills ORDER BY sort_order ASC, level DESC').all());
});

router.post('/', auth, (req, res) => {
  const { name, level, category, sort_order } = req.body;
  if (!name || level === undefined) return res.status(400).json({ error: 'invalid_request', message: 'name and level are required' });
  if (level < 0 || level > 100) return res.status(400).json({ error: 'invalid_request', message: 'level must be 0-100' });
  const info = db.prepare('INSERT INTO skills (name, level, category, sort_order) VALUES (?, ?, ?, ?)')
    .run(name, level, category || 'general', sort_order || 0);
  res.status(201).json(db.prepare('SELECT * FROM skills WHERE id=?').get(info.lastInsertRowid));
});

router.put('/:id', auth, (req, res) => {
  const { name, level, category, sort_order } = req.body;
  const existing = db.prepare('SELECT id FROM skills WHERE id=?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'not_found', message: 'Skill not found' });
  db.prepare('UPDATE skills SET name=?, level=?, category=?, sort_order=? WHERE id=?')
    .run(name, level, category || 'general', sort_order || 0, req.params.id);
  res.json(db.prepare('SELECT * FROM skills WHERE id=?').get(req.params.id));
});

router.delete('/:id', auth, (req, res) => {
  const existing = db.prepare('SELECT id FROM skills WHERE id=?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'not_found', message: 'Skill not found' });
  db.prepare('DELETE FROM skills WHERE id=?').run(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;
