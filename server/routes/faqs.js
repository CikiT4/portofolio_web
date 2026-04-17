const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.get('/', (req, res) => {
  res.json(db.prepare('SELECT * FROM faqs ORDER BY sort_order ASC').all());
});

router.post('/', auth, (req, res) => {
  const { question, answer, sort_order } = req.body;
  if (!question || !answer) return res.status(400).json({ error: 'invalid_request', message: 'question and answer are required' });
  const info = db.prepare('INSERT INTO faqs (question, answer, sort_order) VALUES (?, ?, ?)')
    .run(question, answer, sort_order || 0);
  res.status(201).json(db.prepare('SELECT * FROM faqs WHERE id=?').get(info.lastInsertRowid));
});

router.put('/:id', auth, (req, res) => {
  const { question, answer, sort_order } = req.body;
  const existing = db.prepare('SELECT id FROM faqs WHERE id=?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'not_found', message: 'FAQ not found' });
  db.prepare('UPDATE faqs SET question=?, answer=?, sort_order=? WHERE id=?')
    .run(question, answer, sort_order || 0, req.params.id);
  res.json(db.prepare('SELECT * FROM faqs WHERE id=?').get(req.params.id));
});

router.delete('/:id', auth, (req, res) => {
  const existing = db.prepare('SELECT id FROM faqs WHERE id=?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'not_found', message: 'FAQ not found' });
  db.prepare('DELETE FROM faqs WHERE id=?').run(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;
