const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');
const { contactLimiter } = require('../middleware/rateLimit');

// Public: submit message
router.post('/', contactLimiter, async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ error: 'invalid_request', message: 'name, email, and message are required' });
  
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email))
    return res.status(400).json({ error: 'invalid_request', message: 'Invalid email address' });

  try {
    const [result] = await db.execute(
      'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name.trim(), email.trim(), subject?.trim() || null, message.trim()]
    );
    res.status(201).json({ id: result.insertId, message: 'Message sent successfully! I will get back to you soon.' });
  } catch (error) {
    res.status(500).json({ error: 'server_error', message: error.message });
  }
});

// Admin: list all messages
router.get('/', auth, async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM contact_messages ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'server_error', message: error.message });
  }
});

// Admin: mark as read
router.patch('/:id/read', auth, async (req, res) => {
  try {
    const [existingRows] = await db.execute('SELECT id FROM contact_messages WHERE id=?', [req.params.id]);
    if (existingRows.length === 0) return res.status(404).json({ error: 'not_found', message: 'Message not found' });
    
    await db.execute('UPDATE contact_messages SET is_read=1 WHERE id=?', [req.params.id]);
    res.json({ message: 'Marked as read' });
  } catch (error) {
    res.status(500).json({ error: 'server_error', message: error.message });
  }
});

// Admin: delete message
router.delete('/:id', auth, async (req, res) => {
  try {
    const [existingRows] = await db.execute('SELECT id FROM contact_messages WHERE id=?', [req.params.id]);
    if (existingRows.length === 0) return res.status(404).json({ error: 'not_found', message: 'Message not found' });
    
    await db.execute('DELETE FROM contact_messages WHERE id=?', [req.params.id]);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'server_error', message: error.message });
  }
});

module.exports = router;
