import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../hooks/useApi';

const EMPTY = { title: '', company: '', start_date: '', end_date: '', description: '', tags: '', sort_order: 0 };

export default function AdminExperiences() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null); // null | 'new' | item
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);

  const load = () => api.get('/experiences').then(r => setItems(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const startEdit = (item) => {
    setEditing(item.id || 'new');
    setForm({ ...item, tags: Array.isArray(item.tags) ? item.tags.join(', ') : '' });
  };

  const cancelEdit = () => { setEditing(null); setForm(EMPTY); };

  const handleSave = async () => {
    if (!form.title || !form.company || !form.start_date || !form.description) {
      toast.error('title, company, start_date, description are required'); return;
    }
    setLoading(true);
    try {
      const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) };
      if (editing === 'new') { await api.post('/experiences', payload); toast.success('Experience created'); }
      else { await api.put(`/experiences/${editing}`, payload); toast.success('Experience updated'); }
      cancelEdit(); load();
    } catch (e) { toast.error(e.response?.data?.message || 'Save failed'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this experience?')) return;
    try { await api.delete(`/experiences/${id}`); toast.success('Deleted'); load(); }
    catch { toast.error('Delete failed'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button onClick={() => { setEditing('new'); setForm(EMPTY); }} className="admin-btn-primary flex items-center gap-2">
          <Plus size={14} /> Add Experience
        </button>
      </div>

      {/* Form */}
      {editing !== null && (
        <div className="bg-ink-800/60 border border-gold/20 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display text-lg text-ink-100">{editing === 'new' ? 'New Experience' : 'Edit Experience'}</h3>
            <button onClick={cancelEdit} className="text-ink-500 hover:text-gold"><X size={18} /></button>
          </div>
          {[
            { field: 'title', label: 'Title *', type: 'text' },
            { field: 'company', label: 'Company *', type: 'text' },
            { field: 'start_date', label: 'Start Date *', type: 'text', placeholder: 'e.g. January 2024' },
            { field: 'end_date', label: 'End Date', type: 'text', placeholder: 'e.g. Present' },
            { field: 'tags', label: 'Tags (comma-separated)', type: 'text', placeholder: 'event, documentation' },
            { field: 'sort_order', label: 'Sort Order', type: 'number' },
          ].map(({ field, label, type, placeholder }) => (
            <div key={field}>
              <label className="block font-mono text-xs tracking-widest text-ink-500 uppercase mb-2">{label}</label>
              <input type={type} value={form[field] || ''} onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))} placeholder={placeholder} className="admin-input" />
            </div>
          ))}
          <div>
            <label className="block font-mono text-xs tracking-widest text-ink-500 uppercase mb-2">Description *</label>
            <textarea rows={4} value={form.description || ''} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} className="admin-input resize-none" />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} disabled={loading} className="admin-btn-primary flex items-center gap-2">
              <Save size={14} />{loading ? 'Saving...' : 'Save'}
            </button>
            <button onClick={cancelEdit} className="admin-btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="bg-ink-800/40 border border-ink-700/50 rounded-xl p-5 flex items-start justify-between gap-4 hover:border-ink-600 transition-all">
            <div className="flex-1 min-w-0">
              <p className="font-display text-base text-ink-100">{item.title}</p>
              <p className="font-mono text-xs text-gold/70">{item.company}</p>
              <p className="font-sans text-xs text-ink-500 mt-1">{item.start_date} — {item.end_date || 'Present'}</p>
              <p className="font-sans text-xs text-ink-500 mt-2 line-clamp-2">{item.description}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => startEdit(item)} className="admin-btn-secondary flex items-center gap-1"><Pencil size={12} /> Edit</button>
              <button onClick={() => handleDelete(item.id)} className="admin-btn-danger flex items-center gap-1"><Trash2 size={12} /> Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="font-sans text-sm text-ink-600 text-center py-8">No experiences yet. Add one above.</p>}
      </div>
    </div>
  );
}
