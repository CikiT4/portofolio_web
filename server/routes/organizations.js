const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

const parseJSON = (str, fallback) => { try { return JSON.parse(str); } catch { return fallback; } };

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM organizations ORDER BY sort_order ASC');
    res.json(rows.map(r => ({ ...r, bullets: parseJSON(r.bullets, []) })));
  } catch (error) {
    res.status(500).json({ error: 'server_error', message: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  const { name, role, start_date, end_date, description, bullets, sort_order } = req.body;
  if (!name || !role) return res.status(400).json({ error: 'invalid_request', message: 'name and role are required' });
  
  try {
    const [result] = await db.execute(
      'INSERT INTO organizations (name, role, start_date, end_date, description, bullets, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, role, start_date || null, end_date || null, description || null, JSON.stringify(bullets || []), sort_order || 0]
    );
    const [newRows] = await db.execute('SELECT * FROM organizations WHERE id=?', [result.insertId]);
    const row = newRows[0];
    res.status(201).json({ ...row, bullets: parseJSON(row.bullets, []) });
  } catch (error) {
    res.status(500).json({ error: 'server_error', message: error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  const { name, role, start_date, end_date, description, bullets, sort_order } = req.body;
  try {
    const [existingRows] = await db.execute('SELECT id FROM organizations WHERE id=?', [req.params.id]);
    if (existingRows.length === 0) return res.status(404).json({ error: 'not_found', message: 'Organization not found' });
    
    await db.execute(
      'UPDATE organizations SET name=?, role=?, start_date=?, end_date=?, description=?, bullets=?, sort_order=? WHERE id=?',
      [name, role, start_date || null, end_date || null, description || null, JSON.stringify(bullets || []), sort_order || 0, req.params.id]
    );
    const [updatedRows] = await db.execute('SELECT * FROM organizations WHERE id=?', [req.params.id]);
    const row = updatedRows[0];
    res.json({ ...row, bullets: parseJSON(row.bullets, []) });
  } catch (error) {
    res.status(500).json({ error: 'server_error', message: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const [existingRows] = await db.execute('SELECT id FROM organizations WHERE id=?', [req.params.id]);
    if (existingRows.length === 0) return res.status(404).json({ error: 'not_found', message: 'Organization not found' });
    
    await db.execute('DELETE FROM organizations WHERE id=?', [req.params.id]);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'server_error', message: error.message });
  }
});

module.exports = router;
