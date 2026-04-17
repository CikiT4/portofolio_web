const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.get('/', (req, res) => {
  res.json(db.prepare('SELECT * FROM services ORDER BY sort_order ASC, id ASC').all());
});

router.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM services WHERE id=?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'not_found', message: 'Service not found' });
  res.json(row);
});

router.post('/', auth, (req, res) => {
  const { name, description, icon, details, sort_order } = req.body;
  if (!name || !description) return res.status(400).json({ error: 'invalid_request', message: 'name and description are required' });
  const info = db.prepare('INSERT INTO services (name, description, icon, details, sort_order) VALUES (?, ?, ?, ?, ?)')
    .run(name, description, icon || 'Star', details || null, sort_order || 0);
  res.status(201).json(db.prepare('SELECT * FROM services WHERE id=?').get(info.lastInsertRowid));
});

router.put('/:id', auth, (req, res) => {
  const { name, description, icon, details, sort_order } = req.body;
  const existing = db.prepare('SELECT id FROM services WHERE id=?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'not_found', message: 'Service not found' });
  db.prepare('UPDATE services SET name=?, description=?, icon=?, details=?, sort_order=? WHERE id=?')
    .run(name, description, icon || 'Star', details || null, sort_order || 0, req.params.id);
  res.json(db.prepare('SELECT * FROM services WHERE id=?').get(req.params.id));
});

router.delete('/:id', auth, (req, res) => {
  const existing = db.prepare('SELECT id FROM services WHERE id=?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'not_found', message: 'Service not found' });
  db.prepare('DELETE FROM services WHERE id=?').run(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;
