const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.get('/', (req, res) => {
  res.json(db.prepare('SELECT * FROM education ORDER BY sort_order ASC').all());
});

router.post('/', auth, (req, res) => {
  const { institution, degree, field, start_date, end_date, description, sort_order } = req.body;
  if (!institution || !degree || !start_date) return res.status(400).json({ error: 'invalid_request', message: 'institution, degree, start_date are required' });
  const info = db.prepare('INSERT INTO education (institution, degree, field, start_date, end_date, description, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .run(institution, degree, field || null, start_date, end_date || null, description || null, sort_order || 0);
  res.status(201).json(db.prepare('SELECT * FROM education WHERE id=?').get(info.lastInsertRowid));
});

router.put('/:id', auth, (req, res) => {
  const { institution, degree, field, start_date, end_date, description, sort_order } = req.body;
  const existing = db.prepare('SELECT id FROM education WHERE id=?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'not_found', message: 'Education not found' });
  db.prepare('UPDATE education SET institution=?, degree=?, field=?, start_date=?, end_date=?, description=?, sort_order=? WHERE id=?')
    .run(institution, degree, field || null, start_date, end_date || null, description || null, sort_order || 0, req.params.id);
  res.json(db.prepare('SELECT * FROM education WHERE id=?').get(req.params.id));
});

router.delete('/:id', auth, (req, res) => {
  const existing = db.prepare('SELECT id FROM education WHERE id=?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'not_found', message: 'Education not found' });
  db.prepare('DELETE FROM education WHERE id=?').run(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;
