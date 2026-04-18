const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM faqs ORDER BY sort_order ASC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'server_error', message: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  const { question, answer, sort_order } = req.body;
  if (!question || !answer) return res.status(400).json({ error: 'invalid_request', message: 'question and answer are required' });
  
  try {
    const [result] = await db.execute(
      'INSERT INTO faqs (question, answer, sort_order) VALUES (?, ?, ?)',
      [question, answer, sort_order || 0]
    );
    const [newRows] = await db.execute('SELECT * FROM faqs WHERE id=?', [result.insertId]);
    res.status(201).json(newRows[0]);
  } catch (error) {
    res.status(500).json({ error: 'server_error', message: error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  const { question, answer, sort_order } = req.body;
  try {
    const [existingRows] = await db.execute('SELECT id FROM faqs WHERE id=?', [req.params.id]);
    if (existingRows.length === 0) return res.status(404).json({ error: 'not_found', message: 'FAQ not found' });
    
    await db.execute(
      'UPDATE faqs SET question=?, answer=?, sort_order=? WHERE id=?',
      [question, answer, sort_order || 0, req.params.id]
    );
    const [updatedRows] = await db.execute('SELECT * FROM faqs WHERE id=?', [req.params.id]);
    res.json(updatedRows[0]);
  } catch (error) {
    res.status(500).json({ error: 'server_error', message: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const [existingRows] = await db.execute('SELECT id FROM faqs WHERE id=?', [req.params.id]);
    if (existingRows.length === 0) return res.status(404).json({ error: 'not_found', message: 'FAQ not found' });
    
    await db.execute('DELETE FROM faqs WHERE id=?', [req.params.id]);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'server_error', message: error.message });
  }
});

module.exports = router;
