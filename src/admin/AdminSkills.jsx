import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../hooks/useApi';

const EMPTY = { name: '', level: 80, category: 'soft', sort_order: 0 };
const CATS = ['soft', 'technical', 'language', 'general'];

export default function AdminSkills() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);

  const load = () => api.get('/skills').then(r => setItems(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const startEdit = (item) => { setEditing(item.id || 'new'); setForm({ ...EMPTY, ...item }); };
  const cancelEdit = () => { setEditing(null); setForm(EMPTY); };

  const handleSave = async () => {
    if (!form.name || form.level === undefined) { toast.error('name and level required'); return; }
    setLoading(true);
    try {
      if (editing === 'new') { await api.post('/skills', form); toast.success('Skill created'); }
      else { await api.put(`/skills/${editing}`, form); toast.success('Skill updated'); }
      cancelEdit(); load();
    } catch (e) { toast.error(e.response?.data?.message || 'Save failed'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill?')) return;
    try { await api.delete(`/skills/${id}`); toast.success('Deleted'); load(); }
    catch { toast.error('Delete failed'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button onClick={() => { setEditing('new'); setForm(EMPTY); }} className="admin-btn-primary flex items-center gap-2">
          <Plus size={14} /> Add Skill
        </button>
      </div>

      {editing !== null && (
        <div className="bg-ink-800/60 border border-gold/20 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display text-lg text-ink-100">{editing === 'new' ? 'New Skill' : 'Edit Skill'}</h3>
            <button onClick={cancelEdit} className="text-ink-500 hover:text-gold"><X size={18} /></button>
          </div>
          <div>
            <label className="block font-mono text-xs tracking-widest text-ink-500 uppercase mb-2">Skill Name *</label>
            <input type="text" value={form.name || ''} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="admin-input" />
          </div>
          <div>
            <label className="block font-mono text-xs tracking-widest text-ink-500 uppercase mb-2">Level (0–100): {form.level}%</label>
            <input type="range" min="0" max="100" value={form.level || 0} onChange={e => setForm(p => ({ ...p, level: Number(e.target.value) }))}
              className="w-full accent-gold" />
          </div>
          <div>
            <label className="block font-mono text-xs tracking-widest text-ink-500 uppercase mb-2">Category</label>
            <div className="flex flex-wrap gap-2">
              {CATS.map(c => (
                <button key={c} type="button" onClick={() => setForm(p => ({ ...p, category: c }))}
                  className={`px-3 py-1.5 rounded-lg border text-xs transition-all ${form.category === c ? 'border-gold bg-gold/10 text-gold' : 'border-ink-700 text-ink-400 hover:border-ink-500'}`}>
                  {c}
                </button>
              ))}
            </div>
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
          <div key={item.id} className="bg-ink-800/40 border border-ink-700/50 rounded-xl px-5 py-4 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <span className="font-sans text-sm text-ink-100">{item.name}</span>
                <span className="font-mono text-xs text-gold">{item.level}%</span>
              </div>
              <div className="h-1 bg-ink-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-gold-dark to-gold-light rounded-full" style={{ width: `${item.level}%` }} />
              </div>
              <span className="font-mono text-xs text-ink-600 capitalize mt-1 inline-block">{item.category}</span>
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
