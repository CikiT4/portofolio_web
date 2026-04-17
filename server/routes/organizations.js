const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

const parseJSON = (str, fallback) => { try { return JSON.parse(str); } catch { return fallback; } };

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM organizations ORDER BY sort_order ASC').all();
  res.json(rows.map(r => ({ ...r, bullets: parseJSON(r.bullets, []) })));
});

router.post('/', auth, (req, res) => {
  const { name, role, start_date, end_date, description, bullets, sort_order } = req.body;
  if (!name || !role) return res.status(400).json({ error: 'invalid_request', message: 'name and role are required' });
  const info = db.prepare('INSERT INTO organizations (name, role, start_date, end_date, description, bullets, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .run(name, role, start_date || null, end_date || null, description || null, JSON.stringify(bullets || []), sort_order || 0);
  const row = db.prepare('SELECT * FROM organizations WHERE id=?').get(info.lastInsertRowid);
  res.status(201).json({ ...row, bullets: parseJSON(row.bullets, []) });
});

router.put('/:id', auth, (req, res) => {
  const { name, role, start_date, end_date, description, bullets, sort_order } = req.body;
  const existing = db.prepare('SELECT id FROM organizations WHERE id=?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'not_found', message: 'Organization not found' });
  db.prepare('UPDATE organizations SET name=?, role=?, start_date=?, end_date=?, description=?, bullets=?, sort_order=? WHERE id=?')
    .run(name, role, start_date || null, end_date || null, description || null, JSON.stringify(bullets || []), sort_order || 0, req.params.id);
  const row = db.prepare('SELECT * FROM organizations WHERE id=?').get(req.params.id);
  res.json({ ...row, bullets: parseJSON(row.bullets, []) });
});

router.delete('/:id', auth, (req, res) => {
  const existing = db.prepare('SELECT id FROM organizations WHERE id=?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'not_found', message: 'Organization not found' });
  db.prepare('DELETE FROM organizations WHERE id=?').run(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;
