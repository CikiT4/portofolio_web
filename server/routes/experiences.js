const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

const parseJSON = (str, fallback) => { try { return JSON.parse(str); } catch { return fallback; } };

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM experiences ORDER BY sort_order ASC, id DESC');
    res.json(rows.map(r => ({ ...r, tags: parseJSON(r.tags, []) })));
  } catch (error) {
    res.status(500).json({ error: 'server_error', message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM experiences WHERE id=?', [req.params.id]);
    const row = rows[0];
    if (!row) return res.status(404).json({ error: 'not_found', message: 'Experience not found' });
    res.json({ ...row, tags: parseJSON(row.tags, []) });
  } catch (error) {
    res.status(500).json({ error: 'server_error', message: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  const { title, company, start_date, end_date, description, tags, sort_order } = req.body;
  if (!title || !company || !start_date || !description)
    return res.status(400).json({ error: 'invalid_request', message: 'title, company, start_date, description are required' });
  
  try {
    const [result] = await db.execute(
      'INSERT INTO experiences (title, company, start_date, end_date, description, tags, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, company, start_date, end_date || null, description, JSON.stringify(tags || []), sort_order || 0]
    );
    const [newRows] = await db.execute('SELECT * FROM experiences WHERE id=?', [result.insertId]);
    const newRow = newRows[0];
    res.status(201).json({ ...newRow, tags: parseJSON(newRow.tags, []) });
  } catch (error) {
    res.status(500).json({ error: 'server_error', message: error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  const { title, company, start_date, end_date, description, tags, sort_order } = req.body;
  try {
    const [existingRows] = await db.execute('SELECT id FROM experiences WHERE id=?', [req.params.id]);
    if (existingRows.length === 0) return res.status(404).json({ error: 'not_found', message: 'Experience not found' });
    
    await db.execute(
      'UPDATE experiences SET title=?, company=?, start_date=?, end_date=?, description=?, tags=?, sort_order=? WHERE id=?',
      [title, company, start_date, end_date || null, description, JSON.stringify(tags || []), sort_order || 0, req.params.id]
    );
    const [updatedRows] = await db.execute('SELECT * FROM experiences WHERE id=?', [req.params.id]);
    const row = updatedRows[0];
    res.json({ ...row, tags: parseJSON(row.tags, []) });
  } catch (error) {
    res.status(500).json({ error: 'server_error', message: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const [existingRows] = await db.execute('SELECT id FROM experiences WHERE id=?', [req.params.id]);
    if (existingRows.length === 0) return res.status(404).json({ error: 'not_found', message: 'Experience not found' });
    
    await db.execute('DELETE FROM experiences WHERE id=?', [req.params.id]);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'server_error', message: error.message });
  }
});

module.exports = router;
