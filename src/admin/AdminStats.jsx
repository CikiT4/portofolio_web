import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../hooks/useApi';

const ICONS = ['Camera', 'Users', 'Clock', 'Calendar', 'TrendingUp', 'Star'];
const ICON_EMOJI = { Camera: '📸', Users: '👥', Clock: '⏰', Calendar: '📅', TrendingUp: '📈', Star: '⭐' };
const EMPTY = { label: '', value: 0, suffix: '+', icon: 'TrendingUp', sort_order: 0 };

export default function AdminStats() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);

  const load = () => api.get('/stats').then(r => setItems(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const startEdit = (item) => { setEditing(item.id || 'new'); setForm({ ...EMPTY, ...item }); };
  const cancelEdit = () => { setEditing(null); setForm(EMPTY); };

  const handleSave = async () => {
    if (!form.label || form.value === undefined) { toast.error('label and value required'); return; }
    setLoading(true);
    try {
      if (editing === 'new') { await api.post('/stats', form); toast.success('Stat created'); }
      else { await api.put(`/stats/${editing}`, form); toast.success('Stat updated'); }
      cancelEdit(); load();
    } catch (e) { toast.error(e.response?.data?.message || 'Save failed'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this stat?')) return;
    try { await api.delete(`/stats/${id}`); toast.success('Deleted'); load(); }
    catch { toast.error('Delete failed'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button onClick={() => { setEditing('new'); setForm(EMPTY); }} className="admin-btn-primary flex items-center gap-2">
          <Plus size={14} /> Add Stat
        </button>
      </div>

      {editing !== null && (
        <div className="bg-ink-800/60 border border-gold/20 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display text-lg text-ink-100">{editing === 'new' ? 'New Stat' : 'Edit Stat'}</h3>
            <button onClick={cancelEdit} className="text-ink-500 hover:text-gold"><X size={18} /></button>
          </div>
          <div>
            <label className="block font-mono text-xs tracking-widest text-ink-500 uppercase mb-2">Icon</label>
            <div className="flex flex-wrap gap-2">
              {ICONS.map(ic => (
                <button key={ic} type="button" onClick={() => setForm(p => ({ ...p, icon: ic }))}
                  className={`px-3 py-2 rounded-lg border text-sm transition-all ${form.icon === ic ? 'border-gold bg-gold/10 text-gold' : 'border-ink-700 text-ink-400 hover:border-ink-500'}`}>
                  {ICON_EMOJI[ic]} {ic}
                </button>
              ))}
            </div>
          </div>
          {[
            { field: 'label', label: 'Label *', type: 'text' },
            { field: 'value', label: 'Value *', type: 'number' },
            { field: 'suffix', label: 'Suffix (e.g. +)', type: 'text' },
            { field: 'sort_order', label: 'Sort Order', type: 'number' },
          ].map(({ field, label, type }) => (
            <div key={field}>
              <label className="block font-mono text-xs tracking-widest text-ink-500 uppercase mb-2">{label}</label>
              <input type={type} value={form[field] ?? ''} onChange={e => setForm(p => ({ ...p, [field]: type === 'number' ? Number(e.target.value) : e.target.value }))} className="admin-input" />
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} disabled={loading} className="admin-btn-primary flex items-center gap-2">
              <Save size={14} />{loading ? 'Saving...' : 'Save'}
            </button>
            <button onClick={cancelEdit} className="admin-btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(item => (
          <div key={item.id} className="bg-ink-800/40 border border-ink-700/50 rounded-xl p-4 hover:border-ink-600 transition-all">
            <div className="text-2xl mb-2">{ICON_EMOJI[item.icon] || '📊'}</div>
            <p className="font-display text-2xl text-gold">{item.value}{item.suffix}</p>
            <p className="font-mono text-xs text-ink-500 mb-3">{item.label}</p>
            <div className="flex gap-2">
              <button onClick={() => startEdit(item)} className="admin-btn-secondary flex items-center gap-1 text-xs"><Pencil size={10} /></button>
              <button onClick={() => handleDelete(item.id)} className="admin-btn-danger flex items-center gap-1 text-xs"><Trash2 size={10} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
