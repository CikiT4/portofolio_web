import React, { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../hooks/useApi';

export default function AdminAbout() {
  const [form, setForm] = useState({ name: '', role: '', bio: '', email: '', phone: '', instagram: '', location: '', photo_url: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/about').then(r => setForm(r.data)).catch(() => {});
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.put('/about', form);
      toast.success('About updated successfully');
    } catch { toast.error('Failed to update about'); }
    finally { setLoading(false); }
  };

  const FIELDS = [
    { field: 'name', label: 'Full Name' },
    { field: 'role', label: 'Role / Title' },
    { field: 'email', label: 'Email' },
    { field: 'phone', label: 'Phone' },
    { field: 'instagram', label: 'Instagram handle' },
    { field: 'location', label: 'Location' },
    { field: 'photo_url', label: 'Photo URL (optional)' },
  ];

  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-ink-800/40 border border-ink-700/50 rounded-2xl p-6 space-y-4">
        {FIELDS.map(({ field, label }) => (
          <div key={field}>
            <label className="block font-mono text-xs tracking-widest text-ink-500 uppercase mb-2">{label}</label>
            <input type="text" value={form[field] || ''} onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))} className="admin-input" />
          </div>
        ))}
        <div>
          <label className="block font-mono text-xs tracking-widest text-ink-500 uppercase mb-2">Bio</label>
          <textarea rows={5} value={form.bio || ''} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} className="admin-input resize-none" />
        </div>
      </div>
      <button onClick={handleSave} disabled={loading} className="admin-btn-primary flex items-center gap-2">
        <Save size={14} />{loading ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
}
