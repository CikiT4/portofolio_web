const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');
const { contactLimiter } = require('../middleware/rateLimit');

// Public: submit message
router.post('/', contactLimiter, (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ error: 'invalid_request', message: 'name, email, and message are required' });
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email))
    return res.status(400).json({ error: 'invalid_request', message: 'Invalid email address' });
  const info = db.prepare('INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)')
    .run(name.trim(), email.trim(), subject?.trim() || null, message.trim());
  res.status(201).json({ id: info.lastInsertRowid, message: 'Message sent successfully! I will get back to you soon.' });
});

// Admin: list all messages
router.get('/', auth, (req, res) => {
  const msgs = db.prepare('SELECT * FROM contact_messages ORDER BY created_at DESC').all();
  res.json(msgs);
});

// Admin: mark as read
router.patch('/:id/read', auth, (req, res) => {
  const existing = db.prepare('SELECT id FROM contact_messages WHERE id=?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'not_found', message: 'Message not found' });
  db.prepare('UPDATE contact_messages SET is_read=1 WHERE id=?').run(req.params.id);
  res.json({ message: 'Marked as read' });
});

// Admin: delete message
router.delete('/:id', auth, (req, res) => {
  const existing = db.prepare('SELECT id FROM contact_messages WHERE id=?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'not_found', message: 'Message not found' });
  db.prepare('DELETE FROM contact_messages WHERE id=?').run(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;
