import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../hooks/useApi';

const EMPTY = { question: '', answer: '', sort_order: 0 };

export default function AdminFaqs() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);

  const load = () => api.get('/faqs').then(r => setItems(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const startEdit = (item) => { setEditing(item.id || 'new'); setForm({ ...EMPTY, ...item }); };
  const cancelEdit = () => { setEditing(null); setForm(EMPTY); };

  const handleSave = async () => {
    if (!form.question || !form.answer) { toast.error('question and answer required'); return; }
    setLoading(true);
    try {
      if (editing === 'new') { await api.post('/faqs', form); toast.success('FAQ created'); }
      else { await api.put(`/faqs/${editing}`, form); toast.success('FAQ updated'); }
      cancelEdit(); load();
    } catch (e) { toast.error(e.response?.data?.message || 'Save failed'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this FAQ?')) return;
    try { await api.delete(`/faqs/${id}`); toast.success('Deleted'); load(); }
    catch { toast.error('Delete failed'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button onClick={() => { setEditing('new'); setForm(EMPTY); }} className="admin-btn-primary flex items-center gap-2">
          <Plus size={14} /> Add FAQ
        </button>
      </div>

      {editing !== null && (
        <div className="bg-ink-800/60 border border-gold/20 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display text-lg text-ink-100">{editing === 'new' ? 'New FAQ' : 'Edit FAQ'}</h3>
            <button onClick={cancelEdit} className="text-ink-500 hover:text-gold"><X size={18} /></button>
          </div>
          <div>
            <label className="block font-mono text-xs tracking-widest text-ink-500 uppercase mb-2">Question *</label>
            <input type="text" value={form.question || ''} onChange={e => setForm(p => ({ ...p, question: e.target.value }))} className="admin-input" />
          </div>
          <div>
            <label className="block font-mono text-xs tracking-widest text-ink-500 uppercase mb-2">Answer *</label>
            <textarea rows={4} value={form.answer || ''} onChange={e => setForm(p => ({ ...p, answer: e.target.value }))} className="admin-input resize-none" />
          </div>
          <div>
            <label className="block font-mono text-xs tracking-widest text-ink-500 uppercase mb-2">Sort Order</label>
            <input type="number" value={form.sort_order || 0} onChange={e => setForm(p => ({ ...p, sort_order: Number(e.target.value) }))} className="admin-input" />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} disabled={loading} className="admin-btn-primary flex items-center gap-2">
              <Save size={14} />{loading ? 'Saving...' : 'Save'}
            </button>
            <button onClick={cancelEdit} className="admin-btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="bg-ink-800/40 border border-ink-700/50 rounded-xl p-5 flex items-start justify-between gap-4 hover:border-ink-600 transition-all">
            <div className="flex-1 min-w-0">
              <p className="font-display text-sm text-ink-100 mb-2">Q: {item.question}</p>
              <p className="font-sans text-xs text-ink-500 line-clamp-2">A: {item.answer}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => startEdit(item)} className="admin-btn-secondary flex items-center gap-1"><Pencil size={12} /></button>
              <button onClick={() => handleDelete(item.id)} className="admin-btn-danger flex items-center gap-1"><Trash2 size={12} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
