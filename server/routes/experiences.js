const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

const parseJSON = (str, fallback) => { try { return JSON.parse(str); } catch { return fallback; } };

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM experiences ORDER BY sort_order ASC, id DESC').all();
  res.json(rows.map(r => ({ ...r, tags: parseJSON(r.tags, []) })));
});

router.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM experiences WHERE id=?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'not_found', message: 'Experience not found' });
  res.json({ ...row, tags: parseJSON(row.tags, []) });
});

router.post('/', auth, (req, res) => {
  const { title, company, start_date, end_date, description, tags, sort_order } = req.body;
  if (!title || !company || !start_date || !description)
    return res.status(400).json({ error: 'invalid_request', message: 'title, company, start_date, description are required' });
  const info = db.prepare('INSERT INTO experiences (title, company, start_date, end_date, description, tags, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .run(title, company, start_date, end_date || null, description, JSON.stringify(tags || []), sort_order || 0);
  res.status(201).json(db.prepare('SELECT * FROM experiences WHERE id=?').get(info.lastInsertRowid));
});

router.put('/:id', auth, (req, res) => {
  const { title, company, start_date, end_date, description, tags, sort_order } = req.body;
  const existing = db.prepare('SELECT id FROM experiences WHERE id=?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'not_found', message: 'Experience not found' });
  db.prepare('UPDATE experiences SET title=?, company=?, start_date=?, end_date=?, description=?, tags=?, sort_order=? WHERE id=?')
    .run(title, company, start_date, end_date || null, description, JSON.stringify(tags || []), sort_order || 0, req.params.id);
  const row = db.prepare('SELECT * FROM experiences WHERE id=?').get(req.params.id);
  res.json({ ...row, tags: parseJSON(row.tags, []) });
});

router.delete('/:id', auth, (req, res) => {
  const existing = db.prepare('SELECT id FROM experiences WHERE id=?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'not_found', message: 'Experience not found' });
  db.prepare('DELETE FROM experiences WHERE id=?').run(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;
