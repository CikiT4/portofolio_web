import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../hooks/useApi';

const ICONS = ['Camera', 'Calendar', 'Wifi', 'PenTool', 'Star', 'Users', 'TrendingUp'];
const ICON_EMOJI = { Camera: '📸', Calendar: '📅', Wifi: '📡', PenTool: '✍️', Star: '⭐', Users: '👥', TrendingUp: '📈' };
const EMPTY = { name: '', description: '', icon: 'Star', details: '', sort_order: 0 };

export default function AdminServices() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);

  const load = () => api.get('/services').then(r => setItems(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const startEdit = (item) => { setEditing(item.id || 'new'); setForm({ ...EMPTY, ...item }); };
  const cancelEdit = () => { setEditing(null); setForm(EMPTY); };

  const handleSave = async () => {
    if (!form.name || !form.description) { toast.error('name and description required'); return; }
    setLoading(true);
    try {
      if (editing === 'new') { await api.post('/services', form); toast.success('Service created'); }
      else { await api.put(`/services/${editing}`, form); toast.success('Service updated'); }
      cancelEdit(); load();
    } catch (e) { toast.error(e.response?.data?.message || 'Save failed'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this service?')) return;
    try { await api.delete(`/services/${id}`); toast.success('Deleted'); load(); }
    catch { toast.error('Delete failed'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button onClick={() => { setEditing('new'); setForm(EMPTY); }} className="admin-btn-primary flex items-center gap-2">
          <Plus size={14} /> Add Service
        </button>
      </div>

      {editing !== null && (
        <div className="bg-ink-800/60 border border-gold/20 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display text-lg text-ink-100">{editing === 'new' ? 'New Service' : 'Edit Service'}</h3>
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
            { field: 'name', label: 'Name *', type: 'text' },
            { field: 'sort_order', label: 'Sort Order', type: 'number' },
          ].map(({ field, label, type }) => (
            <div key={field}>
              <label className="block font-mono text-xs tracking-widest text-ink-500 uppercase mb-2">{label}</label>
              <input type={type} value={form[field] || ''} onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))} className="admin-input" />
            </div>
          ))}
          <div>
            <label className="block font-mono text-xs tracking-widest text-ink-500 uppercase mb-2">Description *</label>
            <textarea rows={3} value={form.description || ''} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} className="admin-input resize-none" />
          </div>
          <div>
            <label className="block font-mono text-xs tracking-widest text-ink-500 uppercase mb-2">Details (one bullet per line)</label>
            <textarea rows={5} value={form.details || ''} onChange={e => setForm(p => ({ ...p, details: e.target.value }))} className="admin-input resize-none" placeholder="Full-day coverage&#10;High-resolution files&#10;..." />
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
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <span className="text-2xl mr-2">{ICON_EMOJI[item.icon] || '⭐'}</span>
                <span className="font-display text-base text-ink-100">{item.name}</span>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => startEdit(item)} className="admin-btn-secondary flex items-center gap-1"><Pencil size={12} /></button>
                <button onClick={() => handleDelete(item.id)} className="admin-btn-danger flex items-center gap-1"><Trash2 size={12} /></button>
              </div>
            </div>
            <p className="font-sans text-xs text-ink-500 line-clamp-2">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
