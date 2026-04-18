const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM hero LIMIT 1');
    if (rows.length === 0) return res.status(404).json({ error: 'not_found', message: 'Hero not found' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'server_error', message: error.message });
  }
});

router.put('/', auth, async (req, res) => {
  const { title, subtitle, tagline, cta_text } = req.body;
  try {
    const [existingRows] = await db.execute('SELECT id FROM hero LIMIT 1');
    if (existingRows.length > 0) {
      await db.execute(
        'UPDATE hero SET title=?, subtitle=?, tagline=?, cta_text=? WHERE id=?',
        [title, subtitle, tagline, cta_text, existingRows[0].id]
      );
    } else {
      await db.execute(
        'INSERT INTO hero (title, subtitle, tagline, cta_text) VALUES (?, ?, ?, ?)',
        [title, subtitle, tagline, cta_text]
      );
    }
    const [updatedHero] = await db.execute('SELECT * FROM hero LIMIT 1');
    res.json(updatedHero[0]);
  } catch (error) {
    res.status(500).json({ error: 'server_error', message: error.message });
  }
});

module.exports = router;
