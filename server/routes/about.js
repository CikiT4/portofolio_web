const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM about LIMIT 1');
    if (rows.length === 0) return res.status(404).json({ error: 'not_found', message: 'About not found' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'server_error', message: error.message });
  }
});

router.put('/', auth, async (req, res) => {
  const { name, role, bio, email, phone, instagram, location, photo_url } = req.body;
  try {
    const [existingRows] = await db.execute('SELECT id FROM about LIMIT 1');
    if (existingRows.length > 0) {
      await db.execute(
        'UPDATE about SET name=?, role=?, bio=?, email=?, phone=?, instagram=?, location=?, photo_url=? WHERE id=?',
        [name, role, bio, email, phone, instagram, location, photo_url, existingRows[0].id]
      );
    } else {
      await db.execute(
        'INSERT INTO about (name, role, bio, email, phone, instagram, location, photo_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [name, role, bio, email, phone, instagram, location, photo_url]
      );
    }
    const [result] = await db.execute('SELECT * FROM about LIMIT 1');
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: 'server_error', message: error.message });
  }
});

module.exports = router;
