const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM services ORDER BY sort_order ASC, id ASC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'server_error', message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM services WHERE id=?', [req.params.id]);
    const row = rows[0];
    if (!row) return res.status(404).json({ error: 'not_found', message: 'Service not found' });
    res.json(row);
  } catch (error) {
    res.status(500).json({ error: 'server_error', message: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  const { name, description, icon, details, sort_order } = req.body;
  if (!name || !description) return res.status(400).json({ error: 'invalid_request', message: 'name and description are required' });
  
  try {
    const [result] = await db.execute(
      'INSERT INTO services (name, description, icon, details, sort_order) VALUES (?, ?, ?, ?, ?)',
      [name, description, icon || 'Star', details || null, sort_order || 0]
    );
    const [newRows] = await db.execute('SELECT * FROM services WHERE id=?', [result.insertId]);
    res.status(201).json(newRows[0]);
  } catch (error) {
    res.status(500).json({ error: 'server_error', message: error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  const { name, description, icon, details, sort_order } = req.body;
  try {
    const [existingRows] = await db.execute('SELECT id FROM services WHERE id=?', [req.params.id]);
    if (existingRows.length === 0) return res.status(404).json({ error: 'not_found', message: 'Service not found' });
    
    await db.execute(
      'UPDATE services SET name=?, description=?, icon=?, details=?, sort_order=? WHERE id=?',
      [name, description, icon || 'Star', details || null, sort_order || 0, req.params.id]
    );
    const [updatedRows] = await db.execute('SELECT * FROM services WHERE id=?', [req.params.id]);
    res.json(updatedRows[0]);
  } catch (error) {
    res.status(500).json({ error: 'server_error', message: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const [existingRows] = await db.execute('SELECT id FROM services WHERE id=?', [req.params.id]);
    if (existingRows.length === 0) return res.status(404).json({ error: 'not_found', message: 'Service not found' });
    
    await db.execute('DELETE FROM services WHERE id=?', [req.params.id]);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'server_error', message: error.message });
  }
});

module.exports = router;
