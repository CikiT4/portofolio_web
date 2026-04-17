const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.get('/', (req, res) => {
  const hero = db.prepare('SELECT * FROM hero LIMIT 1').get();
  if (!hero) return res.status(404).json({ error: 'not_found', message: 'Hero not found' });
  res.json(hero);
});

router.put('/', auth, (req, res) => {
  const { title, subtitle, tagline, cta_text } = req.body;
  const existing = db.prepare('SELECT id FROM hero LIMIT 1').get();
  if (existing) {
    db.prepare('UPDATE hero SET title=?, subtitle=?, tagline=?, cta_text=?, updated_at=datetime("now") WHERE id=?')
      .run(title, subtitle, tagline, cta_text, existing.id);
  } else {
    db.prepare('INSERT INTO hero (title, subtitle, tagline, cta_text) VALUES (?, ?, ?, ?)').run(title, subtitle, tagline, cta_text);
  }
  res.json(db.prepare('SELECT * FROM hero LIMIT 1').get());
});

module.exports = router;
