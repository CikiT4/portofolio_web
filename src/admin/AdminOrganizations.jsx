import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../hooks/useApi';

const EMPTY = { name: '', role: '', start_date: '', end_date: '', description: '', bullets: '', sort_order: 0 };

export default function AdminOrganizations() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);

  const load = () => api.get('/organizations').then(r => setItems(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const startEdit = (item) => {
    setEditing(item.id || 'new');
    setForm({ ...EMPTY, ...item, bullets: Array.isArray(item.bullets) ? item.bullets.join('\n') : '' });
  };
  const cancelEdit = () => { setEditing(null); setForm(EMPTY); };

  const handleSave = async () => {
    if (!form.name || !form.role) { toast.error('name and role required'); return; }
    setLoading(true);
    try {
      const payload = { ...form, bullets: form.bullets.split('\n').map(b => b.trim()).filter(Boolean) };
      if (editing === 'new') { await api.post('/organizations', payload); toast.success('Organization created'); }
      else { await api.put(`/organizations/${editing}`, payload); toast.success('Organization updated'); }
      cancelEdit(); load();
    } catch (e) { toast.error(e.response?.data?.message || 'Save failed'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this organization?')) return;
    try { await api.delete(`/organizations/${id}`); toast.success('Deleted'); load(); }
    catch { toast.error('Delete failed'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button onClick={() => { setEditing('new'); setForm(EMPTY); }} className="admin-btn-primary flex items-center gap-2">
          <Plus size={14} /> Add Organization
        </button>
      </div>

      {editing !== null && (
        <div className="bg-ink-800/60 border border-gold/20 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display text-lg text-ink-100">{editing === 'new' ? 'New Organization' : 'Edit Organization'}</h3>
            <button onClick={cancelEdit} className="text-ink-500 hover:text-gold"><X size={18} /></button>
          </div>
          {[
            { field: 'name', label: 'Organization Name *' },
            { field: 'role', label: 'Role *' },
            { field: 'start_date', label: 'Start Date' },
            { field: 'end_date', label: 'End Date' },
            { field: 'sort_order', label: 'Sort Order', type: 'number' },
          ].map(({ field, label, type = 'text' }) => (
            <div key={field}>
              <label className="block font-mono text-xs tracking-widest text-ink-500 uppercase mb-2">{label}</label>
              <input type={type} value={form[field] || ''} onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))} className="admin-input" />
            </div>
          ))}
          <div>
            <label className="block font-mono text-xs tracking-widest text-ink-500 uppercase mb-2">Description</label>
            <textarea rows={3} value={form.description || ''} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} className="admin-input resize-none" />
          </div>
          <div>
            <label className="block font-mono text-xs tracking-widest text-ink-500 uppercase mb-2">Bullet Points (one per line)</label>
            <textarea rows={4} value={form.bullets || ''} onChange={e => setForm(p => ({ ...p, bullets: e.target.value }))} className="admin-input resize-none" placeholder="Bullet point 1&#10;Bullet point 2&#10;..." />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} disabled={loading} className="admin-btn-primary flex items-center gap-2">
              <Save size={14} />{loading ? 'Saving...' : 'Save'}
            </button>
            <button onClick={cancelEdit} className="admin-btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {items.map(item => (
          <div key={item.id} className="bg-ink-800/40 border border-ink-700/50 rounded-xl p-5 hover:border-ink-600 transition-all">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <p className="font-display text-sm text-ink-100 leading-tight">{item.name}</p>
                <p className="font-mono text-xs text-gold/70">{item.role}</p>
                <p className="font-sans text-xs text-ink-600 mt-1">{item.start_date}{item.end_date ? ` — ${item.end_date}` : ''}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => startEdit(item)} className="admin-btn-secondary flex items-center gap-1"><Pencil size={10} /></button>
                <button onClick={() => handleDelete(item.id)} className="admin-btn-danger flex items-center gap-1"><Trash2 size={10} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
