import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../hooks/useApi';

const EMPTY = { institution: '', degree: '', field: '', start_date: '', end_date: '', description: '', sort_order: 0 };

export default function AdminEducation() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);

  const load = () => api.get('/education').then(r => setItems(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const startEdit = (item) => { setEditing(item.id || 'new'); setForm({ ...EMPTY, ...item }); };
  const cancelEdit = () => { setEditing(null); setForm(EMPTY); };

  const handleSave = async () => {
    if (!form.institution || !form.degree || !form.start_date) { toast.error('institution, degree, start_date required'); return; }
    setLoading(true);
    try {
      if (editing === 'new') { await api.post('/education', form); toast.success('Education created'); }
      else { await api.put(`/education/${editing}`, form); toast.success('Education updated'); }
      cancelEdit(); load();
    } catch (e) { toast.error(e.response?.data?.message || 'Save failed'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this education entry?')) return;
    try { await api.delete(`/education/${id}`); toast.success('Deleted'); load(); }
    catch { toast.error('Delete failed'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button onClick={() => { setEditing('new'); setForm(EMPTY); }} className="admin-btn-primary flex items-center gap-2">
          <Plus size={14} /> Add Education
        </button>
      </div>

      {editing !== null && (
        <div className="bg-ink-800/60 border border-gold/20 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display text-lg text-ink-100">{editing === 'new' ? 'New Education' : 'Edit Education'}</h3>
            <button onClick={cancelEdit} className="text-ink-500 hover:text-gold"><X size={18} /></button>
          </div>
          {[
            { field: 'institution', label: 'Institution *' },
            { field: 'degree', label: 'Degree *' },
            { field: 'field', label: 'Field of Study' },
            { field: 'start_date', label: 'Start Date *', placeholder: 'e.g. 2022' },
            { field: 'end_date', label: 'End Date', placeholder: 'e.g. 2024 or Present' },
            { field: 'sort_order', label: 'Sort Order', type: 'number' },
          ].map(({ field, label, placeholder, type = 'text' }) => (
            <div key={field}>
              <label className="block font-mono text-xs tracking-widest text-ink-500 uppercase mb-2">{label}</label>
              <input type={type} value={form[field] || ''} onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))} placeholder={placeholder} className="admin-input" />
            </div>
          ))}
          <div>
            <label className="block font-mono text-xs tracking-widest text-ink-500 uppercase mb-2">Description</label>
            <textarea rows={3} value={form.description || ''} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} className="admin-input resize-none" />
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
            <div>
              <p className="font-display text-base text-ink-100">{item.institution}</p>
              <p className="font-mono text-xs text-gold/70">{item.degree}</p>
              {item.field && <p className="font-mono text-xs text-ink-500">{item.field}</p>}
              <p className="font-sans text-xs text-ink-600 mt-1">{item.start_date} — {item.end_date || 'Present'}</p>
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
