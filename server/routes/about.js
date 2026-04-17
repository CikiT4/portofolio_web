const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.get('/', (req, res) => {
  const about = db.prepare('SELECT * FROM about LIMIT 1').get();
  if (!about) return res.status(404).json({ error: 'not_found', message: 'About not found' });
  res.json(about);
});

router.put('/', auth, (req, res) => {
  const { name, role, bio, email, phone, instagram, location, photo_url } = req.body;
  const existing = db.prepare('SELECT id FROM about LIMIT 1').get();
  if (existing) {
    db.prepare('UPDATE about SET name=?, role=?, bio=?, email=?, phone=?, instagram=?, location=?, photo_url=?, updated_at=datetime("now") WHERE id=?')
      .run(name, role, bio, email, phone, instagram, location, photo_url, existing.id);
  } else {
    db.prepare('INSERT INTO about (name, role, bio, email, phone, instagram, location, photo_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)').run(name, role, bio, email, phone, instagram, location, photo_url);
  }
  res.json(db.prepare('SELECT * FROM about LIMIT 1').get());
});

module.exports = router;
