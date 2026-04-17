import React, { useEffect, useState } from 'react';
import { Trash2, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../hooks/useApi';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try { const { data } = await api.get('/contact'); setMessages(data); }
    catch { toast.error('Failed to load messages'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleMarkRead = async (id) => {
    try { await api.patch(`/contact/${id}/read`); load(); }
    catch { toast.error('Failed to mark as read'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    try { await api.delete(`/contact/${id}`); toast.success('Message deleted'); load(); }
    catch { toast.error('Failed to delete message'); }
  };

  const unread = messages.filter(m => !m.is_read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-display text-2xl text-ink-100">Inbox</span>
          {unread > 0 && (
            <span className="px-2.5 py-1 rounded-full bg-gold/15 border border-gold/30 font-mono text-xs text-gold">
              {unread} unread
            </span>
          )}
        </div>
        <button onClick={load} className="admin-btn-secondary flex items-center gap-2">
          <RefreshCw size={12} /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <span className="animate-spin inline-block w-6 h-6 border-2 border-ink-700 border-t-gold rounded-full" />
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-16 text-ink-600 font-sans text-sm">No messages yet.</div>
      ) : (
        <div className="space-y-3">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`border rounded-xl transition-all duration-200 ${
                msg.is_read ? 'bg-ink-800/30 border-ink-700/50' : 'bg-ink-800/60 border-gold/20'
              }`}
            >
              <div
                className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer"
                onClick={() => setExpanded(expanded === msg.id ? null : msg.id)}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {!msg.is_read && <div className="glow-dot shrink-0" />}
                  <div className="min-w-0">
                    <p className={`font-display text-sm ${msg.is_read ? 'text-ink-400' : 'text-ink-100'}`}>{msg.name}</p>
                    <p className="font-mono text-xs text-ink-600">{msg.email}</p>
                  </div>
                  {msg.subject && <span className="hidden sm:block font-sans text-xs text-ink-500 truncate">— {msg.subject}</span>}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-xs text-ink-700">{new Date(msg.created_at).toLocaleDateString()}</span>
                  {!msg.is_read && (
                    <button onClick={(e) => { e.stopPropagation(); handleMarkRead(msg.id); }}
                      title="Mark as read" className="admin-btn-secondary p-1.5">
                      <Eye size={12} />
                    </button>
                  )}
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(msg.id); }}
                    className="admin-btn-danger p-1.5">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>

              {expanded === msg.id && (
                <div className="px-5 pb-5 border-t border-ink-700">
                  <div className="pt-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div><span className="font-mono text-ink-600 uppercase">From</span><p className="font-sans text-ink-300 mt-1">{msg.name} &lt;{msg.email}&gt;</p></div>
                      <div><span className="font-mono text-ink-600 uppercase">Received</span><p className="font-sans text-ink-300 mt-1">{new Date(msg.created_at).toLocaleString()}</p></div>
                    </div>
                    {msg.subject && <div><span className="font-mono text-xs text-ink-600 uppercase">Subject</span><p className="font-sans text-sm text-ink-300 mt-1">{msg.subject}</p></div>}
                    <div>
                      <span className="font-mono text-xs text-ink-600 uppercase">Message</span>
                      <p className="font-sans text-sm text-ink-300 mt-2 leading-relaxed whitespace-pre-wrap bg-ink-900/50 rounded-lg p-4">{msg.message}</p>
                    </div>
                    <a href={`mailto:${msg.email}?subject=Re: ${msg.subject || 'Your message'}`}
                      className="inline-block admin-btn-primary text-sm py-2 px-4 mt-2">
                      Reply via Email →
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
