import React, { useEffect, useState } from 'react';
import { 
  Zap, Eye, MessageSquare, Briefcase, 
  ExternalLink, ArrowRight, ShieldCheck, Database
} from 'lucide-react';
import api from '../hooks/useApi';

export default function AdminOverview() {
  const [stats, setStats] = useState({
    experiences: 0,
    services: 0,
    messages: 0,
  });

  useEffect(() => {
    // Fetch some basic counts for the overview
    Promise.all([
      api.get('/experiences').then(r => r.data.length).catch(() => 0),
      api.get('/services').then(r => r.data.length).catch(() => 0),
      api.get('/contact').then(r => r.data.length).catch(() => 0),
    ]).then(([exp, svc, msg]) => {
      setStats({ experiences: exp, services: svc, messages: msg });
    });
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-ink-800 to-ink-900 border border-ink-700 rounded-2xl p-8">
        <div className="relative z-10 max-w-2xl">
          <h2 className="font-display text-2xl text-ink-100 mb-2">Welcome Back, Admin</h2>
          <p className="font-sans text-sm text-ink-500 leading-relaxed">
            Your portfolio is live and connected to MySQL. From here, you can manage your work history, 
            skills, and organization details directly. All changes reflect instantly on your public site.
          </p>
          <div className="flex gap-4 mt-6">
            <a 
              href="/" 
              target="_blank" 
              className="admin-btn-primary flex items-center gap-2"
            >
              View Live Site <ExternalLink size={14} />
            </a>
          </div>
        </div>
        
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-80 h-80 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Work Experiences', value: stats.experiences, icon: Briefcase, color: 'text-gold' },
          { label: 'Active Services', value: stats.services, icon: Zap, color: 'text-blue-400' },
          { label: 'Unread Messages', value: stats.messages, icon: MessageSquare, color: 'text-green-400' },
        ].map((item, idx) => (
          <div key={idx} className="bg-ink-900 border border-ink-800 rounded-xl p-6 hover:border-gold/20 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg bg-ink-800 flex items-center justify-center ${item.color}`}>
                <item.icon size={20} />
              </div>
              <span className="font-mono text-2xl text-ink-100">{item.value}</span>
            </div>
            <p className="font-sans text-sm text-ink-500">{item.label}</p>
          </div>
        ))}
      </div>

      {/* System Status */}
      <div className="bg-ink-900 border border-ink-800 rounded-xl p-6">
        <h3 className="font-display text-base text-ink-200 mb-6 flex items-center gap-2">
          <ShieldCheck size={18} className="text-gold" /> System Status
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-ink-800/40 rounded-lg border border-ink-700/30">
            <div className="flex items-center gap-3">
              <Database size={16} className="text-gold" />
              <div>
                <p className="font-sans text-sm text-ink-100">Database Connection</p>
                <p className="font-mono text-[10px] text-ink-600 uppercase">MySQL · Active</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono text-xs text-green-500">Connected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
