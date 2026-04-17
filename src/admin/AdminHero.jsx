import React, { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../hooks/useApi';

export default function AdminHero() {
  const [form, setForm] = useState({ title: '', subtitle: '', tagline: '', cta_text: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/hero').then(r => setForm(r.data)).catch(() => {});
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.put('/hero', form);
      toast.success('Hero updated successfully');
    } catch { toast.error('Failed to update hero'); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-ink-800/40 border border-ink-700/50 rounded-2xl p-6 space-y-4">
        {[
          { field: 'title', label: 'Name / Title', placeholder: 'Hayden Novariyo Wira Alfisyahr' },
          { field: 'subtitle', label: 'Subtitle', placeholder: 'Event Organizer · Content Creator · CS Student' },
          { field: 'tagline', label: 'Tagline (italic quote)', placeholder: 'Turning moments into memories...' },
          { field: 'cta_text', label: 'CTA Button Text', placeholder: 'Explore My Work' },
        ].map(({ field, label, placeholder }) => (
          <div key={field}>
            <label className="block font-mono text-xs tracking-widest text-ink-500 uppercase mb-2">{label}</label>
            <input
              type="text"
              value={form[field] || ''}
              onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
              placeholder={placeholder}
              className="admin-input"
            />
          </div>
        ))}
      </div>
      <button onClick={handleSave} disabled={loading} className="admin-btn-primary flex items-center gap-2">
        <Save size={14} />{loading ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
}
