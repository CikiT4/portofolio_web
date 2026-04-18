const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM skills ORDER BY sort_order ASC, level DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'server_error', message: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  const { name, level, category, sort_order } = req.body;
  if (!name || level === undefined) return res.status(400).json({ error: 'invalid_request', message: 'name and level are required' });
  if (level < 0 || level > 100) return res.status(400).json({ error: 'invalid_request', message: 'level must be 0-100' });
  
  try {
    const [result] = await db.execute(
      'INSERT INTO skills (name, level, category, sort_order) VALUES (?, ?, ?, ?)',
      [name, level, category || 'general', sort_order || 0]
    );
    const [newRows] = await db.execute('SELECT * FROM skills WHERE id=?', [result.insertId]);
    res.status(201).json(newRows[0]);
  } catch (error) {
    res.status(500).json({ error: 'server_error', message: error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  const { name, level, category, sort_order } = req.body;
  try {
    const [existingRows] = await db.execute('SELECT id FROM skills WHERE id=?', [req.params.id]);
    if (existingRows.length === 0) return res.status(404).json({ error: 'not_found', message: 'Skill not found' });
    
    await db.execute(
      'UPDATE skills SET name=?, level=?, category=?, sort_order=? WHERE id=?',
      [name, level, category || 'general', sort_order || 0, req.params.id]
    );
    const [updatedRows] = await db.execute('SELECT * FROM skills WHERE id=?', [req.params.id]);
    res.json(updatedRows[0]);
  } catch (error) {
    res.status(500).json({ error: 'server_error', message: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const [existingRows] = await db.execute('SELECT id FROM skills WHERE id=?', [req.params.id]);
    if (existingRows.length === 0) return res.status(404).json({ error: 'not_found', message: 'Skill not found' });
    
    await db.execute('DELETE FROM skills WHERE id=?', [req.params.id]);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'server_error', message: error.message });
  }
});

module.exports = router;
