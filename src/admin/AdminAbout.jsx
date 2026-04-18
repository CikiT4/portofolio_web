import React, { useEffect, useState, useRef } from 'react';
import { Save, Upload } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../hooks/useApi';

export default function AdminAbout() {
  const [form, setForm] = useState({ name: '', role: '', bio: '', email: '', phone: '', instagram: '', location: '', photo_url: '' });
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

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

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    try {
      toast.loading('Uploading...', { id: 'upload' });
      const res = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setForm(p => ({ ...p, photo_url: res.data.url }));
      toast.success('Uploaded successfully, remember to save', { id: 'upload' });
    } catch {
      toast.error('Upload failed', { id: 'upload' });
    }
  };

  const FIELDS = [
    { field: 'name', label: 'Full Name' },
    { field: 'role', label: 'Role / Title' },
    { field: 'email', label: 'Email' },
    { field: 'phone', label: 'Phone' },
    { field: 'instagram', label: 'Instagram handle' },
    { field: 'location', label: 'Location' },
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
          <label className="block font-mono text-xs tracking-widest text-ink-500 uppercase mb-2">Profile Picture</label>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {form.photo_url && (
              <img src={form.photo_url} alt="Preview" className="w-20 h-20 rounded-xl object-cover bg-ink-900 border border-ink-700" />
            )}

            <div className="flex-1 w-full space-y-2">
              <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
              <button type="button" onClick={() => fileInputRef.current?.click()} className="flex items-center justify-center gap-2 admin-btn-secondary w-full sm:w-auto">
                <Upload size={14} /> Upload New Photo
              </button>
              <input type="text" placeholder="Or paste image URL" value={form.photo_url || ''} onChange={e => setForm(p => ({ ...p, photo_url: e.target.value }))} className="admin-input text-xs py-2" />
            </div>
          </div>
        </div>

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
